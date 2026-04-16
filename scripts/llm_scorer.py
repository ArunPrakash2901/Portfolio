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

# The Strict Whitelist
TARGET_REPOS = [
    "Mortality_prediction_ICU_data", 
    "Estimation_GSP", 
    "Melbourne-oil-Scarcity-outlook"
]

CONTRIBUTION_THRESHOLD = 60
RECENCY_HALFLIFE_DAYS = 180
MAX_SAMPLED_FILES = 8
MAX_CODE_SAMPLE_CHARS = 10000

# ── UPGRADE 1: Exhaustive File Extension Mapping ──
KEY_FILE_EXTENSIONS = (
    # Data / ML
    ".py", ".ipynb", ".r", ".rmd", ".qmd", ".jl", ".scala", ".m",
    # DB / Data Engineering
    ".sql", ".prql", ".json", ".csv", ".parquet", ".tsv",
    # Systems / Low-level
    ".c", ".cpp", ".h", ".rs", ".go", ".asm",
    # Web / App
    ".js", ".ts", ".jsx", ".tsx", ".html", ".css", ".php", ".rb", ".java", ".cs", ".swift", ".kt",
    # Cloud / Config
    ".yaml", ".yml", ".tf", ".dockerfile", ".toml", ".sh", ".bat", ".ini",
    # Docs
    ".md", ".txt", ".rst"
)

# ── UPGRADE 2: Domain Keyword Expansion (Heuristics) ──
DOMAIN_KEYWORDS = (
    "etl", "pipeline", "tensor", "neural", "aws", "docker", "kubernetes", 
    "ci/cd", "terraform", "microservices", "multithreading", "encryption", 
    "serverless", "hyperparameter", "mutex", "websocket", "graphql", "model",
    "train", "predict", "feature", "dag", "workflow", "serve", "preprocess"
)

SKIP_FILE_PATTERNS = (
    "__init__", "setup.py", "conftest", "test_", "_test.py",
    "migrations/", "node_modules/", ".min.", "dist/", "venv/", ".lock"
)

AXES = [
    "analytics_eda", "statistical_reasoning", "machine_learning", 
    "data_engineering", "cloud_infrastructure", "visualisation_bi", "communication"
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

# ─── Auth Helper ─────────────────────────────────────────────────────────────

def get_github_headers():
    """Inject GITHUB_TOKEN to bypass rate limits and 401 errors."""
    token = os.environ.get("GH_TOKEN", "")
    headers = {"Accept": "application/vnd.github.v3+json"}
    if token:
        headers["Authorization"] = f"token {token}"
    return headers

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
    response = requests.get(url, headers=get_github_headers())
    response.raise_for_status()
    return response.json()

def get_repo_details(repo_full_name, default_branch):
    headers = get_github_headers()
    
    # README
    readme_url = f"https://raw.githubusercontent.com/{repo_full_name}/{default_branch}/README.md"
    readme_resp = requests.get(readme_url, headers=headers)
    readme = readme_resp.text if readme_resp.status_code == 200 else "No README available."

    # File tree
    tree_url = f"https://api.github.com/repos/{repo_full_name}/git/trees/{default_branch}?recursive=1"
    tree_resp = requests.get(tree_url, headers=headers)
    all_paths = []
    if tree_resp.status_code == 200:
        tree_data = tree_resp.json()
        all_paths = [item["path"] for item in tree_data.get("tree", []) if item.get("type") == "blob"]
    tree_structure = "\n".join(all_paths[:500]) if all_paths else "Tree unreadable."

    # Sample source files
    code_samples = _sample_source_files(repo_full_name, default_branch, all_paths, headers)
    return readme, tree_structure, code_samples

def _file_relevance_score(path):
    """Calculate Heuristic Keyword Density to prioritize high-signal files."""
    path_lower = path.lower()
    depth = path_lower.count("/")
    
    # Keyword hits
    hits = sum(1 for kw in DOMAIN_KEYWORDS if kw in path_lower)
    
    # Lower score is better. Massive bonus for keyword hits, slight penalty for deep nesting.
    score = (depth * 2) - (hits * 15)
    return score

def _sample_source_files(repo_full_name, default_branch, all_paths, headers):
    candidates = [
        p for p in all_paths
        if p.lower().endswith(KEY_FILE_EXTENSIONS)
        and not any(skip in p for skip in SKIP_FILE_PATTERNS)
    ]
    
    # Sort by our heuristic engine
    candidates.sort(key=_file_relevance_score)
    selected = candidates[:MAX_SAMPLED_FILES]

    samples = []
    total_chars = 0
    for file_path in selected:
        if total_chars >= MAX_CODE_SAMPLE_CHARS:
            break
        raw_url = f"https://raw.githubusercontent.com/{repo_full_name}/{default_branch}/{file_path}"
        resp = requests.get(raw_url, headers=headers)
        if resp.status_code == 200:
            remaining = MAX_CODE_SAMPLE_CHARS - total_chars
            content = resp.text[:remaining]
            samples.append(f"── {file_path} ──\n{content}")
            total_chars += len(content)

    return "\n\n".join(samples) if samples else "No source files sampled."

# ─── Score Validation ────────────────────────────────────────────────────────

def validate_scores(raw_payload):
    """
    UPGRADE 3: Metric Purity
    Extracts the 0-100 integers while ignoring the qualitative feedback array 
    so the math aggregator doesn't break.
    """
    validated = {}
    for axis in AXES:
        value = raw_payload.get(axis, 0)
        try:
            value = int(value)
        except (TypeError, ValueError):
            value = 0
        validated[axis] = max(0, min(100, value))
    
    # Safely extract qualitative feedback to store in state, but keep out of axes
    qual_feedback = raw_payload.get("qualitative_feedback", [])
    
    return validated, qual_feedback

# ─── LLM Evaluation (The Fallback Chain) ────────────────────────────────────

def evaluate_repo_with_llm(readme, tree, code_samples):
    prompt = f"""
Act as a Principal Software Architect. Evaluate the following GitHub repository based on its README, file tree, and sampled source code.

Determine the competency score (0-100) for these exactly 7 axes:
analytics_eda, statistical_reasoning, machine_learning, data_engineering, cloud_infrastructure, visualisation_bi, communication.

CRITICAL INSTRUCTION FOR METRIC PURITY:
Do not alter the 0-100 axis scores based on edge cases or anomalies. The axes must remain mathematically pure indicators of core competency. Place any observations regarding missing tests, outdated libraries, architectural quirks, or specific tool usage entirely within the 'qualitative_feedback' string array.

Respond ONLY with a valid JSON object matching this exact schema:
{{
  "analytics_eda": int,
  "statistical_reasoning": int,
  "machine_learning": int,
  "data_engineering": int,
  "cloud_infrastructure": int,
  "visualisation_bi": int,
  "communication": int,
  "qualitative_feedback": ["string observation 1", "string observation 2"]
}}

README:
{readme[:3000]}

FILE TREE:
{tree}

SAMPLED SOURCE CODE:
{code_samples}
"""

    # Primary: Groq LLaMA 3.3 70B Versatile (Fast, excellent JSON adherence)
    try:
        client = Groq(api_key=os.environ.get("GROQ_API_KEY", ""))
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
        )
        content = chat_completion.choices[0].message.content
        raw_payload = json.loads(content)
        scores, feedback = validate_scores(raw_payload)
        return scores, feedback, "groq-llama-3.3-70b"
    except Exception as e:
        print(f"  Groq failed: {e}. Falling back to Gemini 2.0 Flash...")

    # Fallback: Gemini 2.0 Flash (New SDK)
    try:
        client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", ""))
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
        )
        content = response.text.replace("```json", "").replace("```", "").strip()
        raw_payload = json.loads(content)
        scores, feedback = validate_scores(raw_payload)
        return scores, feedback, "gemini-2.0-flash"
    except Exception as e:
        print(f"  ⚠ Gemini also failed: {e}. Recording zero scores.")
        return {axis: 0 for axis in AXES}, [], "fallback-zeros"

# ─── Aggregation ─────────────────────────────────────────────────────────────

def _recency_weight(pushed_at_iso):
    try:
        pushed_dt = datetime.fromisoformat(pushed_at_iso.replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return 0.5
    now = datetime.now(timezone.utc)
    days_ago = max((now - pushed_dt).days, 0)
    return 2 ** (-days_ago / RECENCY_HALFLIFE_DAYS)

def aggregate_scores(state):
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
    repo_name = repo_api["name"]
    repo_full_name = repo_api["full_name"]
    pushed_at = repo_api["pushed_at"]
    default_branch = repo_api["default_branch"]

    print(f"△ Evaluating: {repo_name}")
    readme, tree, code_samples = get_repo_details(repo_full_name, default_branch)
    scores, feedback, model_used = evaluate_repo_with_llm(readme, tree, code_samples)
    print(f"  Scored by {model_used}")

    state["repositories"][repo_name] = {
        "pushed_at": pushed_at,
        "scored_by": model_used,
        "scored_at": datetime.now(timezone.utc).isoformat(),
        "scores": scores,
        "qualitative_feedback": feedback
    }
    save_state(state)
    return True

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--force-reeval", metavar="REPO")
    args = parser.parse_args()

    state = load_state()
    username = state.get("github_username")

    if not username or username == "YOUR_GITHUB_USERNAME":
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

    if args.force_reeval:
        target = args.force_reeval
        repo_api = next((r for r in repos if r["name"] == target), None)
        if not repo_api:
            print(f"Repo '{target}' not found in {username}'s target repos.")
            return
        _evaluate_single_repo(repo_api, state)
        aggregate_scores(state)
        print("Pipeline complete (forced re-eval).")
        return

    delta_processed = False
    for repo in repos:
        repo_name = repo["name"]
        cached_repo = state["repositories"].get(repo_name)

        if not cached_repo or cached_repo.get("pushed_at") != repo["pushed_at"]:
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