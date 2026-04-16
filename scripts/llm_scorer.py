import os
import json
import argparse
import requests
from google import genai
from groq import Groq
from datetime import datetime, timezone

# ─── Configuration ───────────────────────────────────────────────────────────

STATE_FILE = "scripts/repo_state.json"
SCORES_FILE = "public/scores.json"
TARGET_REPOS = ["Mortality_prediction_ICU_data", "Estimation_GSP", "Melbourne-oil-Scacity-outlook"]

# Minimum score for a repo to appear in the "contributing projects" list for an
# axis. Set at 60 to filter out repos with only incidental relevance — a repo
# that happens to contain a stray SQL file shouldn't claim "Data Engineering".
CONTRIBUTION_THRESHOLD = 60

# Recency half-life in days. A repo pushed exactly this many days ago receives
# half weight in the weighted average. Prevents stale toy projects from
# dominating the competency map while still crediting recent, active work.
RECENCY_HALFLIFE_DAYS = 180

# ── UPGRADE 1: Exhaustive file extension mapping ──────────────────────────────
# Organised by domain so it's easy to extend. The sampler iterates all of these;
# the keyword heuristic then ranks which files surface first.
KEY_FILE_EXTENSIONS = (
    # Data / ML
    ".py", ".ipynb", ".r", ".rmd", ".qmd", ".jl", ".scala", ".m",
    # DB / Data Engineering
    ".sql", ".prql", ".json", ".csv", ".parquet", ".tsv",
    # Systems / Low-level
    ".c", ".cpp", ".h", ".rs", ".go", ".asm",
    # Web / App
    ".js", ".ts", ".jsx", ".tsx", ".html", ".css", ".php", ".rb",
    ".java", ".cs", ".swift", ".kt",
    # Cloud / Config / IaC
    ".yaml", ".yml", ".tf", ".dockerfile", ".toml", ".sh", ".bat", ".ini",
    # Docs (plain text only — no binary extractors)
    ".md", ".txt", ".rst",
)

# Skip files matching these substrings — boilerplate, tests, and generated
# artifacts add noise without signal.
SKIP_FILE_PATTERNS = (
    "__init__", "setup.py", "conftest", "test_", "_test.py",
    "migrations/", "node_modules/", ".min.", "dist/", "venv/",
    "package-lock.json", "yarn.lock", ".lock",
)

# ── UPGRADE 2: Expanded domain keyword taxonomy ───────────────────────────────
# Used both for path-level heuristics (fast) and content-level density scoring
# (one lightweight HEAD-then-fetch pass per candidate file).
#
# Organised into weighted tiers:
#   TIER_1 (weight 3) — high-signal ML/data engineering terms
#   TIER_2 (weight 2) — cloud / DevOps / systems terms
#   TIER_3 (weight 1) — general web / API terms (useful but lower specificity)
DOMAIN_KEYWORD_WEIGHTS = {
    # Tier 1 — ML & Data Engineering (weight 3)
    "model": 3, "pipeline": 3, "tensor": 3, "neural": 3, "epoch": 3,
    "gradient": 3, "hyperparameter": 3, "transformer": 3, "embedding": 3,
    "fine-tuning": 3, "train": 3, "predict": 3, "feature": 3, "etl": 3,
    "ingest": 3, "dag": 3, "workflow": 3, "preprocess": 3, "evaluate": 3,
    "cluster": 3, "regress": 3, "embed": 3, "score": 3, "analyse": 3,
    "analyze": 3, "warehouse": 3, "spark": 3, "airflow": 3, "dbt": 3,
    "kafka": 3, "schema": 3,
    # Tier 2 — Cloud / DevOps / Systems (weight 2)
    "aws": 2, "azure": 2, "gcp": 2, "docker": 2, "kubernetes": 2,
    "terraform": 2, "serverless": 2, "microservices": 2, "ci/cd": 2,
    "multithreading": 2, "encryption": 2, "mutex": 2, "concurrency": 2,
    "deployment": 2, "container": 2, "vpc": 2, "ec2": 2, "s3": 2,
    # Tier 3 — Web / API (weight 1)
    "websocket": 1, "graphql": 1, "rest": 1, "middleware": 1,
    "serve": 1, "endpoint": 1,
}

# Flat tuple of all keywords for fast path-level matching (no weights needed).
DOMAIN_KEYWORDS = tuple(DOMAIN_KEYWORD_WEIGHTS.keys())

# Maximum number of source files to sample per repo.
MAX_SAMPLED_FILES = 5

# Maximum total characters of sampled code sent to the LLM.
MAX_CODE_SAMPLE_CHARS = 8000

# Maximum characters read from each file during content-density scoring.
# Kept small to avoid latency spikes — we just need enough text to count hits.
DENSITY_SCAN_CHARS = 500

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
        return {"github_username": "ArunPrakash2901", "repositories": {}}
    with open(STATE_FILE, "r") as f:
        return json.load(f)


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

# ─── GitHub Data Fetching ────────────────────────────────────────────────────

def fetch_public_repos(username):
    url = f"https://api.github.com/users/{username}/repos?type=owner&sort=pushed&per_page=100"
    headers = {"Authorization": f"token {os.environ.get('GITHUB_TOKEN', '')}"}
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()


def get_repo_details(repo_full_name, default_branch):
    """Fetch README, file tree, and heuristically sampled source code."""
    headers = {"Authorization": f"token {os.environ.get('GITHUB_TOKEN', '')}"}

    # README
    readme_url = (
        f"https://raw.githubusercontent.com/{repo_full_name}/{default_branch}/README.md"
    )
    readme_response = requests.get(readme_url, headers=headers)
    readme = (
        readme_response.text if readme_response.status_code == 200
        else "No README available."
    )

    # File tree
    tree_url = (
        f"https://api.github.com/repos/{repo_full_name}/git/trees/"
        f"{default_branch}?recursive=1"
    )
    tree_response = requests.get(tree_url, headers=headers)
    all_paths = []
    if tree_response.status_code == 200:
        tree_data = tree_response.json()
        all_paths = [
            item["path"]
            for item in tree_data.get("tree", [])
            if item.get("type") == "blob"
        ]
    tree_structure = "\n".join(all_paths[:500]) if all_paths else "Tree unreadable."

    # Heuristically sampled source files
    code_samples = _sample_source_files(repo_full_name, default_branch, all_paths)

    return readme, tree_structure, code_samples


def _path_keyword_score(path):
    """Fast path-only keyword density score (no network call).

    Returns a negative integer — more negative = higher priority.
    Used as the first-pass sort before content scanning.
    """
    basename = os.path.basename(path).lower()
    hit_score = sum(
        weight
        for kw, weight in DOMAIN_KEYWORD_WEIGHTS.items()
        if kw in basename
    )
    depth = path.count("/")
    # Negate hit_score so higher scores sort first; depth penalises deep files.
    return (-hit_score, depth, path)


def _content_keyword_density(repo_full_name, default_branch, file_path):
    """Fetch the first DENSITY_SCAN_CHARS of a file and score keyword density.

    Returns a weighted hit count. Skips the fetch if the file extension alone
    already gives us high confidence (i.e. the path score was already strong).
    """
    raw_url = (
        f"https://raw.githubusercontent.com/{repo_full_name}/"
        f"{default_branch}/{file_path}"
    )
    headers = {"Authorization": f"token {os.environ.get('GITHUB_TOKEN', '')}"}
    try:
        resp = requests.get(raw_url, headers=headers, timeout=5)
        if resp.status_code != 200:
            return 0
        snippet = resp.text[:DENSITY_SCAN_CHARS].lower()
        return sum(
            weight
            for kw, weight in DOMAIN_KEYWORD_WEIGHTS.items()
            if kw in snippet
        )
    except Exception:
        return 0


def _sample_source_files(repo_full_name, default_branch, all_paths):
    """Select and fetch the highest-signal source files for LLM context.

    Two-pass heuristic:
      Pass 1 (free) — rank by path-level keyword density and depth.
                       Take the top MAX_SAMPLED_FILES * 3 candidates.
      Pass 2 (network) — fetch a small head of each candidate, rescore by
                         content keyword density, then take the top
                         MAX_SAMPLED_FILES files for the final context payload.

    This guarantees that a Terraform-heavy repo surfaces its .tf files rather
    than generic README.md entries, and that a deep-learning repo surfaces its
    training scripts rather than its __init__.py files.
    """
    # Filter by extension and skip boilerplate
    candidates = [
        p for p in all_paths
        if p.lower().endswith(KEY_FILE_EXTENSIONS)
        and not any(skip in p for skip in SKIP_FILE_PATTERNS)
    ]

    # Pass 1: path-level ranking — cheap, no network
    candidates.sort(key=_path_keyword_score)
    shortlist = candidates[: MAX_SAMPLED_FILES * 3]

    # Pass 2: content-level density scoring — one small fetch per shortlisted file
    scored = []
    for path in shortlist:
        density = _content_keyword_density(repo_full_name, default_branch, path)
        scored.append((density, path))

    # Higher content density wins; stable sort preserves path-rank as tiebreaker
    scored.sort(key=lambda x: -x[0])
    selected = [path for _, path in scored[:MAX_SAMPLED_FILES]]

    # Fetch full file contents up to the character budget
    samples = []
    total_chars = 0
    headers = {"Authorization": f"token {os.environ.get('GITHUB_TOKEN', '')}"}
    for file_path in selected:
        if total_chars >= MAX_CODE_SAMPLE_CHARS:
            break
        raw_url = (
            f"https://raw.githubusercontent.com/{repo_full_name}/"
            f"{default_branch}/{file_path}"
        )
        resp = requests.get(raw_url, headers=headers)
        if resp.status_code == 200:
            remaining = MAX_CODE_SAMPLE_CHARS - total_chars
            content = resp.text[:remaining]
            samples.append(f"── {file_path} ──\n{content}")
            total_chars += len(content)

    return "\n\n".join(samples) if samples else "No source files sampled."

# ─── Score Validation ────────────────────────────────────────────────────────

def validate_scores(raw_scores):
    """Sanitise LLM-returned scores: enforce all 7 axes present as integers in [0, 100].

    UPGRADE 3: The LLM now also returns a 'qualitative_feedback' string array.
    This function explicitly ignores that key so it never contaminates the
    numeric aggregation — metric purity is preserved by design, not by accident.
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

    # Surface qualitative feedback to stdout for audit — never written to scores.json
    feedback = raw_scores.get("qualitative_feedback", [])
    if feedback:
        print("  📝 Qualitative feedback:")
        for item in feedback:
            print(f"     • {item}")

    return validated  # Only the 7 integer axes — qualitative_feedback excluded

# ─── LLM Evaluation ─────────────────────────────────────────────────────────

def evaluate_repo_with_llm(readme, tree, code_samples):
    """Score a repo across competency axes using a strict JSON schema.

    UPGRADE 3: The prompt now requests a 'qualitative_feedback' array alongside
    the 7 numeric axes. This segregates qualitative observations (deprecated libs,
    missing tests, architectural quirks) from the pure integer scores, preventing
    prose generation from biasing the autoregressive score token distribution.

    UPGRADE 4: Groq (llama-3.3-70b-versatile) is now the PRIMARY model for
    its speed and generous free-tier quota. Gemini 2.0 Flash is the fallback.

    Returns a (validated_scores, model_name) tuple.
    """
    prompt = f"""
Act as a Senior Technical Recruiter and Principal Engineer. Evaluate the
following GitHub repository based on its README, file tree, and sampled source
code.

OUTPUT a single, strictly typed, minified JSON object with exactly these keys:

1. Seven competency axes — integer values 0 to 100:
   analytics_eda, statistical_reasoning, machine_learning, data_engineering,
   cloud_infrastructure, visualisation_bi, communication

2. One qualitative array — string values only:
   qualitative_feedback

Scoring guidance for the numeric axes:
- 0–20: No meaningful evidence of this competency.
- 21–50: Some evidence, but shallow or incidental.
- 51–75: Clear, intentional demonstration of this competency.
- 76–100: Deep, impressive work that would stand out in a hiring review.

CRITICAL INSTRUCTION — METRIC PURITY:
Do NOT alter the 0-100 axis scores based on edge cases or anomalies.
The seven axes must remain mathematically pure indicators of core competency.
Place ALL qualitative observations — missing unit tests, deprecated libraries,
exceptional architectural patterns, unusual tool choices, or any other specific
findings — ENTIRELY within the qualitative_feedback string array.
The axis integers must never be penalised or inflated by these observations.

Example output format (minified, no markdown fences):
{{"analytics_eda":72,"statistical_reasoning":65,"machine_learning":88,"data_engineering":55,"cloud_infrastructure":30,"visualisation_bi":45,"communication":70,"qualitative_feedback":["Uses deprecated sklearn API","No unit tests present","Clean separation of training and inference logic"]}}

README:
{readme[:5000]}

FILE TREE:
{tree}

SAMPLED SOURCE CODE:
{code_samples}
"""

    # ── PRIMARY: Groq — llama-3.3-70b-versatile ──────────────────────────────
    # Chosen for its 14,400 RPD free quota, LPU-backed speed, and strong
    # instruction-following on structured JSON output tasks.
    try:
        groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
        chat_completion = groq_client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
        )
        content = chat_completion.choices[0].message.content
        raw_scores = json.loads(content)
        return validate_scores(raw_scores), "groq-llama3.3-70b"
    except Exception as e:
        print(f"  Groq failed: {e}. Falling back to Gemini 2.0 Flash...")

    # ── FALLBACK: Gemini 2.0 Flash via google-genai SDK ──────────────────────
    try:
        gemini_client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", ""))
        response = gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        content = response.text.replace("```json", "").replace("```", "").strip()
        raw_scores = json.loads(content)
        return validate_scores(raw_scores), "gemini-2.0-flash"
    except Exception as e:
        print(f"  ⚠ Gemini also failed: {e}. Recording zero scores.")
        return validate_scores({axis: 0 for axis in AXES}), "fallback-zeros"

# ─── Aggregation ─────────────────────────────────────────────────────────────

def _recency_weight(pushed_at_iso):
    """Compute an exponential-decay weight based on how recently a repo was pushed.

    weight = 2^(-days_ago / RECENCY_HALFLIFE_DAYS)

    A repo pushed today → weight ≈ 1.0
    A repo pushed 180 days ago → weight ≈ 0.5
    A repo pushed 360 days ago → weight ≈ 0.25
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

    Uses exponential decay (half-life = RECENCY_HALFLIFE_DAYS) so stale toy
    projects fade without being excluded entirely.
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
    """Fetch, score, and persist a single repo."""
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
    save_state(state)


def main():
    parser = argparse.ArgumentParser(
        description="LLM-powered CDC scoring engine for GitHub portfolio repos.",
    )
    parser.add_argument(
        "--force-reeval",
        metavar="REPO",
        help=(
            "Force re-evaluation of a specific repo by name, ignoring the "
            "pushed_at cache. Useful after a fallback-zeros run."
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

    # Filter to whitelisted repos only
    repos = [r for r in repos if r["name"] in TARGET_REPOS]

    # ── Force re-eval mode ────────────────────────────────────────────────
    if args.force_reeval:
        target = args.force_reeval
        repo_api = next((r for r in repos if r["name"] == target), None)
        if not repo_api:
            print(f"Repo '{target}' not found in {username}'s public repos.")
            return
        prev_model = state["repositories"].get(target, {}).get("scored_by", "n/a")
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