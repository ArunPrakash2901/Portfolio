const project = {
  slug: "icu-mortality",
  name: "ICU Mortality Prediction",
  oneLiner: "Predicting patient outcomes using high-frequency physiological data.",
  status: "Completed",
  builtDate: "2024-03",
  stack: ["Python", "Scikit-Learn", "Pandas", "XGBoost"],
  githubUrl: "https://github.com/ArunPrakash2901/icu-mortality",
  why: "To bridge the gap between raw medical sensor data and actionable clinical insights.",
  hard: "Handling the extreme sparsity and non-uniform sampling rates of real-world ICU data.",
  differently: "I would explore Transformer-based architectures for better temporal dependency modeling.",
  notes: [
    "Used SMOTE for class imbalance handling.",
    "Engineered custom rolling-window features for heart rate variability.",
    "Validated against the MIMIC-III open dataset."
  ],
  media: "https://images.unsplash.com/photo-1581056310764-3235339f4083?q=80&w=800"
};

export default project;

