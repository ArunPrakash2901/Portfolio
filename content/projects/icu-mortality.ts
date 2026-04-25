const project = {
  slug: "icu-mortality",
  name: "ICU Mortality Prediction",
  oneLiner: "A machine learning approach to catching ICU deterioration early, using what the body signals before clinicians intervene.",
  status: "Completed",
  builtDate: "2025-04",
  stack: ["R", "XGBoost", "NLP (GloVe)", "SHAP", "ML"],
  githubUrl: "https://github.com/ArunPrakash2901/Mortality_prediction_ICU_data",
  blogUrl: "/writing/icu-mortality-lessons",
  why: "To move beyond simple classification and provide clinicians with early warning signs, giving them more time to intervene and save lives.",
  hard: "Clinical data reality: Reconstructing patient timelines from shifted dates and capturing physiological instability through Min/Max vitals instead of misleading averages.",
  differently: "I would use Recurrent Neural Networks (RNNs) or Transformers to capture the temporal sequence of diagnoses, rather than just static co-occurrence patterns.",
  notes: [
    "Engineered 50-dimensional GloVe embeddings for ICD-9 codes to capture medical context.",
    "Balanced class weights (7.91) to improve recall from 0.40 to 0.62 for high-risk patients.",
    "Integrated SHAP values to provide transparent, patient-level explanations for clinical trust.",
    "Achieved a ROC-AUC of 0.95 across a 5-fold cross-validation suite."
  ],
  media: "/images/ICU-mortality-prediction.webp"
};

export default project;
