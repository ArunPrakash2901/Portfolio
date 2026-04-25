const project = {
  slug: "electorate-analysis",
  name: "Goldstein Electorate Geospatial Analysis",
  oneLiner: "I overlaid AEC electorate boundaries, ABS Census layers, and referendum results to see how Goldstein sat against nearby Victorian divisions.",
  status: "Completed",
  builtDate: "2024-04",
  stack: ["R", "geomsf", "ggplot2", "dplyr", "geospatial"],
  why: "I wanted to treat Goldstein as a map question rather than a table question, then see what changed once election results, Census structure, rent, income, and referendum results were all aligned on the same Victorian geography.",
  hard: "The tricky part was getting the AEC boundary layer and the ABS geography into the same spatial frame, then assigning small Census areas to electorates before averaging the rent and income measures.",
  differently: "I would finish the missing Indigenous profile section, fix the Chisholm label typo, and add clean export steps so the map outputs do not depend on notebook cache files.",
  mediaMode: "stretch-horizontal",
  notes: [
    "The core spatial workflow aligned the AEC boundaries with the ABS small-area geography, assigned each Census area to an electorate, and then rolled rent and income up to division level.",
    "Using a cropped inner-Melbourne view did more analytical work than the full-state map because it made the local rent pattern around Goldstein readable straight away.",
    "The demographic comparison added context to the maps by placing Goldstein next to Victoria rather than treating it as a standalone profile.",
    "The unfinished edges were useful too: the Indigenous profile section never landed, one geography package was only a pointer file, and the map labels still carried a typo for Chisholm."
  ],
  media: "/images/electorate-analysis.png"
};

export default project;
