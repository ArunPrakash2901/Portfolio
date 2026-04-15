import os
import json
import argparse
import requests
import google.generativeai as genai
from groq import Groq
from datetime import datetime, timezone

# ─── Configuration ───────────────────────────────────────────────────────────

STATE_FILE = "scripts/repo_state.json"
SCORES_FILE = "public/scores.json"

# Minimum score for a repo to appear in the "contributing projects" list for an
# axis. Set at 60 to filter out repos with only incidental relevance — a repo
# that happens to contain a stray SQL file shouldn't claim "Data Engineering".
CONTRIBUTION_THRESHOLD = 60

# Recency half-life in days. A repo pushed exactly this many days ago receives
# half weight in the weighted average. Prevents stale toy projects from
# dominating the competency map while still crediting recent, active work.
RECENCY_HALFLIFE_DAYS = 180

# File extensions worth sampling actual code from (beyond README + tree).
KEY_FILE_EXTENSIONS = (".py", ".sql", ".r", ".scala", ".java", ".ts", ".js")

# Skip files matching these substrings when sampling code — boilerplate, tests,
# and generated files add noise without signal.
SKIP_FILE_PATTERNS = (
    "__init__", "setup.py", "conftest", "test_", "_test.py",
    "migrations/", "node_modules/", ".min.", "dist/", "venv/",
)

# Filenames containing these keywords are boosted during sampling because they
# are far more likely to contain meaningful domain logic than generic helpers.
DOMAIN_KEYWORDS = (
    "model", "pipeline", "transform", "analyse", "analyze", "train",
    "predict", "feature", "etl", "ingest", "dag", "workflow", "serve",
    "preprocess", "evaluate", "score", "embed", "cluster", "regress",
)

# Maximum number of source files to sample per repo.
MAX_SAMPLED_FILES = 5

# Maximum total characters of sampled code sent to the LLM.
MAX_CODE_SAMPLE_CHARS = 8000

AXES = [
    "analytics_eda",
    "statistical_reasoning",
    "machine_learning",
    "data_engineering",
    "cloud_infrastructure",
    "visualisation_bi",
    "communication",
]

AXIS_DISPLAY_MAP = {
    "analytics_eda": "Analytics / EDA",
    "statistical_reasoning": "Stats Reason",
    "machine_learning": "Machine Learning",
    "data_engineering": "Data Eng",
    "cloud_infrastructure": "Cloud / Infra",
    "visualisation_bi": "Viz / BI",
    "communication": "Communication",
}

# ─── State Persistence ───────────────────────────────────────────────────────

def load_state():
    if not os.path.exists(STATE_FILE):
        return {"github_username": "YOUR_GITHUB_USERNAME", "repositories": {}}
    with open(STATE_FILE, "r") as f:
        return json.load(f)


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

# ─── GitHub Data Fetching ────────────────────────────────────────────────────

def fetch_public_repos(username):
    url = f"https://api.github.com/users/{username}/repos?type=owner&sort=pushed&per_page=100"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()


def get_repo_details(repo_full_name, default_branch):
    """Fetch README, file tree, and sampled source code from a GitHub repo."""
    # README
    readme_url = f"https://raw.githubusercontent.com/{repo_full_name}/{default_branch}/README.md"
    readme_response = requests.get(readme_url)
    readme = readme_response.text if readme_response.status_code == 200 else "No README available."

    # File tree
    tree_url = f"https://api.github.com/repos/{repo_full_name}/git/trees/{default_branch}?recursive=1"
    tree_response = requests.get(tree_url)
    all_paths = []
    if tree_response.status_code == 200:
        tree_data = tree_response.json()
        all_paths = [
            item["path"]
            for item in tree_data.get("tree", [])
            if item.get("type") == "blob"
        ]
    tree_structure = "\n".join(all_paths[:500]) if all_paths else "Tree unreadable."

    # Sample actual source files for deeper signal
    code_samples = _sample_source_files(repo_full_name, default_branch, all_paths)

    return readme, tree_structure, code_samples


def _file_relevance_score(path):
    """Score a file path for likely domain relevance.

    Lower score = higher priority. Files matching domain keywords get a large
    bonus (negative offset), and deeply nested files are penalised. This avoids
    the naive alphabetical trap where __init__.py and config files always win.
    """
    basename = os.path.basename(path).lower()
    depth = path.count("/")
    keyword_bonus = -10 if any(kw in basename for kw in DOMAIN_KEYWORDS) else 0
    return (keyword_bonus, depth, path)


def _sample_source_files(repo_full_name, default_branch, all_paths):
    """Fetch the contents of a handful of key source files for richer LLM context.

    Selection heuristic (in priority order):
      1. Files whose basename contains a domain keyword (model, pipeline, etc.)
      2. Files closer to the repo root (more likely entry points / core logic)
      3. Alphabetical tiebreaker

    Skips boilerplate, tests, and generated files.
    """
    candidates = [
        p for p in all_paths
        if p.lower().endswith(KEY_FILE_EXTENSIONS)
        and not any(skip in p for skip in SKIP_FILE_PATTERNS)
    ]
    candidates.sort(key=_file_relevance_score)
    selected = candidates[:MAX_SAMPLED_FILES]

    samples = []
    total_chars = 0
    for file_path in selected:
        if total_chars >= MAX_CODE_SAMPLE_CHARS:
            break
        raw_url = f"https://raw.githubusercontent.com/{repo_full_name}/{default_branch}/{file_path}"
        resp = requests.get(raw_url)
        if resp.status_code == 200:
            remaining = MAX_CODE_SAMPLE_CHARS - total_chars
            content = resp.text[:remaining]
            samples.append(f"── {file_path} ──\n{content}")
            total_chars += len(content)

    return "\n\n".join(samples) if samples else "No source files sampled."

# ─── Score Validation ────────────────────────────────────────────────────────

def validate_scores(raw_scores):
    """Sanitise LLM-returned scores: enforce all axes present, integers in [0, 100].

    Missing keys default to 0. Non-numeric values are clamped and logged.
    """
    validated = {}
    for axis in AXES:
        value = raw_scores.get(axis)
        try:
            value = int(value)
        except (TypeError, ValueError):
            print(f"  ⚠ Invalid score for '{axis}': {value!r} → defaulting to 0")
            value = 0
        validated[axis] = max(0, min(100, value))
    return validated

# ─── LLM Evaluation ─────────────────────────────────────────────────────────

def evaluate_repo_with_llm(readme, tree, code_samples):
    """Score a repo across competency axes.

    Returns a (validated_scores, model_name) tuple so the caller can record
    which model produced the scores — critical for debugging silent fallbacks.
    """
    prompt = f"""
Act as a Senior Technical Recruiter and Principal Engineer. Evaluate the
following GitHub repository based on its README, file tree, and sampled source
code.

Determine the competency score (0-100) for these exactly 7 axes:
analytics_eda, statistical_reasoning, machine_learning, data_engineering,
cloud_infrastructure, visualisation_bi, communication.

Scoring guidance:
- 0–20: No meaningful evidence of this competency.
- 21–50: Some evidence, but shallow or incidental.
- 51–75: Clear, intentional demonstration of this competency.
- 76–100: Deep, impressive work that would stand out in a hiring review.

Respond ONLY with a valid minified JSON object mapping these exact string keys
to integer values (0-100). No markdown fences, no explanation.

README:
{readme[:5000]}

FILE TREE:
{tree}

SAMPLED SOURCE CODE:
{code_samples}
"""

    # Primary: Gemini 1.5 Flash (free tier)
    try:
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY", ""))
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        content = response.text.replace("```json", "").replace("```", "").strip()
        raw_scores = json.loads(content)
        return validate_scores(raw_scores), "gemini-1.5-flash"
    except Exception as e:
        print(f"  Gemini failed: {e}. Falling back to Groq LLaMA 3...")

    # Fallback: Groq LLaMA 3 70B (free tier)
    try:
        client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192",
            response_format={"type": "json_object"},
        )
        content = chat_completion.choices[0].message.content
        raw_scores = json.loads(content)
        return validate_scores(raw_scores), "groq-llama3-70b"
    except Exception as e:
        print(f"  ⚠ Groq also failed: {e}. Recording zero scores.")
        return {axis: 0 for axis in AXES}, "fallback-zeros"

# ─── Aggregation ─────────────────────────────────────────────────────────────

def _recency_weight(pushed_at_iso):
    """Compute an exponential-decay weight based on how recently a repo was pushed.

    weight = 2^(-days_ago / RECENCY_HALFLIFE_DAYS)

    A repo pushed today gets weight ≈ 1.0. A repo pushed RECENCY_HALFLIFE_DAYS
    ago gets weight ≈ 0.5. This prevents stale work from silently dominating.
    """
    try:
        pushed_dt = datetime.fromisoformat(pushed_at_iso.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return 0.5  # Unknown date → half weight as a conservative default
    now = datetime.now(timezone.utc)
    days_ago = max((now - pushed_dt).days, 0)
    return 2 ** (-days_ago / RECENCY_HALFLIFE_DAYS)


def aggregate_scores(state):
    """Produce a recency-weighted competency summary across all scored repos.

    Instead of naively taking the max score (which lets one fluky LLM evaluation
    on a toy repo inflate a competency), this computes a weighted average where
    recent repos count more heavily.
    """
    repos = state.get("repositories", {})
    final_output = []

    for axis in AXES:
        weighted_sum = 0.0
        weight_total = 0.0
        contributors = []

        for repo_name, data in repos.items():
            score = int(data.get("scores", {}).get(axis, 0))
            weight = _recency_weight(data.get("pushed_at", ""))

            weighted_sum += score * weight
            weight_total += weight

            if score >= CONTRIBUTION_THRESHOLD:
                contributors.append({"repo": repo_name, "score": score})

        aggregate_score = round(weighted_sum / weight_total) if weight_total > 0 else 0
        # Sort contributors by score descending, keep top 3
        contributors.sort(key=lambda r: r["score"], reverse=True)
        top_projects = [c["repo"] for c in contributors[:3]]

        final_output.append({
            "competency": AXIS_DISPLAY_MAP[axis],
            "score": aggregate_score,
            "contributingProjects": top_projects,
        })

    os.makedirs(os.path.dirname(SCORES_FILE), exist_ok=True)
    with open(SCORES_FILE, "w") as f:
        json.dump(final_output, f, indent=2)

# ─── Main Pipeline ───────────────────────────────────────────────────────────

def _evaluate_single_repo(repo_api, state):
    """Fetch, score, and persist a single repo. Returns True if scores were updated."""
    repo_name = repo_api["name"]
    repo_full_name = repo_api["full_name"]
    pushed_at = repo_api["pushed_at"]
    default_branch = repo_api["default_branch"]

    print(f"△ Evaluating: {repo_name}")
    readme, tree, code_samples = get_repo_details(repo_full_name, default_branch)
    scores, model_used = evaluate_repo_with_llm(readme, tree, code_samples)
    print(f"  Scored by {model_used}")

    state["repositories"][repo_name] = {
        "pushed_at": pushed_at,
        "scored_by": model_used,
        "scored_at": datetime.now(timezone.utc).isoformat(),
        "scores": scores,
    }
    save_state(state)  # Save after each in case of failure mid-way
    return True


def main():
    parser = argparse.ArgumentParser(
        description="LLM-powered CDC scoring engine for GitHub portfolio repos.",
    )
    parser.add_argument(
        "--force-reeval",
        metavar="REPO",
        help=(
            "Force re-evaluation of a specific repo by name, ignoring the "
            "pushed_at cache. Useful after a Groq fallback to re-score "
            "through Gemini without blowing away the whole state."
        ),
    )
    args = parser.parse_args()

    state = load_state()
    username = state.get("github_username")

    if username == "YOUR_GITHUB_USERNAME" or not username:
        print("Please set your GitHub username in scripts/repo_state.json")
        return

    print(f"Fetching repos for {username}...")
    try:
        repos = fetch_public_repos(username)
    except Exception as e:
        print(f"Failed fetching repos: {e}")
        return

    # ── Force re-eval mode ────────────────────────────────────────────────
    if args.force_reeval:
        target = args.force_reeval
        repo_api = next((r for r in repos if r["name"] == target), None)
        if not repo_api:
            print(f"Repo '{target}' not found in {username}'s public repos.")
            return
        prev = state["repositories"].get(target, {})
        prev_model = prev.get("scored_by", "n/a")
        print(f"  Previous scorer: {prev_model} — forcing re-evaluation...")
        _evaluate_single_repo(repo_api, state)
        aggregate_scores(state)
        print("Pipeline complete (forced re-eval).")
        return

    # ── Normal CDC delta mode ─────────────────────────────────────────────
    delta_processed = False

    for repo in repos:
        repo_name = repo["name"]
        cached_repo = state["repositories"].get(repo_name)

        if not cached_repo or cached_repo["pushed_at"] != repo["pushed_at"]:
            _evaluate_single_repo(repo, state)
            delta_processed = True

    if delta_processed:
        print("Aggregation triggered...")
    else:
        print("No deltas detected. Enforcing re-aggregation.")

    aggregate_scores(state)
    print("Pipeline complete.")


if __name__ == "__main__":
    main()
