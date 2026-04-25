const project = {
  slug: "treasury-nowcasting",
  name: "Treasury Nowcasting",
  oneLiner: "A registry-driven nowcasting system that turns ABS and RBA releases into reproducible state and national output inputs, then tests how far a coherent Bayesian estimator can actually be trusted.",
  status: "Completed",
  builtDate: "2025-11",
  stack: ["R", "Python", "targets", "tarchetypes", "NumPy", "pandas", "SciPy", "PyMc"],
  githubUrl: "https://github.com/ArunPrakash2901/Estimation_GSP",
  blogUrl: "",
  why: "To build a reproducible state and national output pipeline and test whether a coherent Bayesian framework could estimate Gross State Product under incomplete quarterly information.",
  hard: "Keeping annual GSP anchors, quarterly State Final Demand, and monthly macro indicators aligned without creating the collinearity, scaling, and timing problems that later broke estimation.",
  differently: "I would build complexity in stages: fixed-volatility VAR first, then stochastic volatility, then mixed-frequency structure, with more structured priors and lower dimensionality before scaling back up.",
  notes: [
    "Built an explicit targets graph from registry loading through ABS and RBA ingestion to a saved modeling artefact.",
    "Standardised dates, frequencies, seasonal-adjustment flags, and state codes before quarterisation so the panel could be inspected and rerun consistently.",
    "Added ragged-edge and snapshot tooling for `T+15`, `T+45`, and `T+75` information cuts rather than treating every quarter as fully observed.",
    "The Bayesian MF-BVAR-SV work preserved state-national coherence numerically, but it never reached the project's own calibration thresholds or a stable posterior."
  ],
  media: "/images/treasury-nowcasting.png"
};

export default project;
