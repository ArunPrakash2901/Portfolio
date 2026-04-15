Project: Data & AI Professional Portfolio
Stack: Next.js 15 (App Router), Tailwind CSS v4, Velite (MDX Parser), Framer Motion, @nivo/radar.

1. Aesthetic Directive: "Warm Editorial / Museum"

Colors: Backgrounds (#F7F4EF, #EFEBE3), Typography (#1A1814, #5A5650), Accents (#9B8B6E, #4CAF7E). No dark mode. No neon colors.

Typography: DM Serif Display (Headings) and DM Sans (Body).

UI Pattern: Flat bento-boxes, 0.5px solid #D4C9B8 borders, no heavy drop shadows.

2. Content Pipeline (Velite + MDX)

We use Velite to strictly parse markdown files from content/work and content/writing.

The schema includes title, category, date, and a boolean isLive.

3. Data Visualization (The Competency Map)

We use Nivo to render a 7-axis Radar Chart.

Crucial: The chart does NOT pull from MDX. It pulls from a static public/scores.json file.

4. The LLM Scoring Backend (Python/CDC)

We have a GitHub Action (.github/workflows/update_scores.yml) that runs manually.

It executes scripts/llm_scorer.py, which is a Change Data Capture (CDC) pipeline. It fetches new GitHub repos, asks an LLM (Gemini/Groq) to grade the code complexity across 7 axes, and saves the output to public/scores.json.

5. SEO & OpenGraph

We use Satori (ImageResponse) at app/api/og/route.tsx to dynamically generate OpenGraph PNG cards matching the Warm Editorial theme.
