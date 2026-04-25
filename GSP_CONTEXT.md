This document reports only directly confirmed repository facts. Any interpretation from naming, folder structure, comments, or indirect evidence is marked `[INFERRED]`. Missing items are written as `NOT FOUND`.

# STEP 1 — FULL DIRECTORY TRAVERSAL

## Traversal Notes

- A 3-level directory traversal was run with PowerShell (`Get-ChildItem -Recurse -Depth 3`).
- A full recursive file list was also collected so deeper `_extensions/quarto-monash/presentation/_images/...` assets would not be omitted from the inventory.
- `165` files were enumerated for project-context purposes.
- `.git/` and `.Rproj.user/` internals were present as repository/editor metadata but are not listed below because they are not project source, data, or build artefacts.

## Directory Tree (3 Levels Deep)

```text
D:\GSP
├─ R
├─ data
│  └─ temp
├─ images
├─ Meeting notes
├─ __pycache__
├─ _extensions
│  └─ quarto-monash
│     ├─ presentation
│     └─ report
├─ _targets
│  ├─ meta
│  ├─ objects
│  ├─ user
│  └─ workspaces
└─ _targets_diag
   ├─ meta
   ├─ objects
   ├─ user
   └─ workspaces
```

## Inventory — Root

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `.Rhistory` | R session log | [CONFIRMED] Interactive R console history; includes report/table rendering and package-install commands. |
| `.gitignore` | Project config | [CONFIRMED] Git ignore rules. |
| `AACSB.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `AMBA.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `Coherence_gap.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `Data_sourcing_GSP.qmd` | Quarto source | [CONFIRMED] Data-sourcing note describing ABS/RBA selection workflow and registry creation. |
| `EQUIS.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `Estimation_GSP.html` | Rendered HTML | [INFERRED] Rendered HTML presentation generated from `Estimation_GSP.qmd`. |
| `Estimation_GSP.qmd` | Quarto source | [CONFIRMED] Presentation-style modeling summary with equations and explicit sampler-failure notes. |
| `GSP.Rproj` | Project config | [CONFIRMED] RStudio project file. |
| `GSP_report.pdf` | Rendered PDF | [INFERRED] Rendered PDF report generated from `GSP_report.qmd`. |
| `GSP_report.qmd` | Quarto source | [CONFIRMED] Main report documenting methodology, baselines, Bayesian nowcast results, and failure analysis. |
| `LICENSE` | Doc / license | [CONFIRMED] Repository license file. |
| `MBSportrait.jpg` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `NOW_1.ipynb` | Notebook | [CONFIRMED] Python notebook continuing quarterly preprocessing and MF-BVAR-SV experiments; untracked in git status. |
| `QGSP.ipynb` | Notebook | [CONFIRMED] Python notebook with preprocessing, EDA, blocked-Gibbs MF-BVAR-SV code, and diagnostics. |
| `README.html` | Rendered HTML | [INFERRED] HTML-rendered copy of `README.md`; untracked in git status. |
| `README.md` | Doc / notes | [CONFIRMED] Project README with structure and pipeline run notes. |
| `_targets.yaml` | Pipeline config | [CONFIRMED] `targets` YAML config; points `script` to `_targets_DataSourcing.R` and `store` to `_targets_diag`. |
| `_targets_DataSourcing.R` | Pipeline config | [CONFIRMED] Active `targets` entry point for data ingestion and preprocessing. |
| `data_pipeline.qmd` | Quarto source | [CONFIRMED] Pipeline note showing `tar_manifest()` and `tar_make()` usage for `_targets_DataSourcing.R`. |
| `model_fit_calibration.csv` | CSV data | [CONFIRMED] Saved calibration summary table matching notebook check metrics. |
| `monash2.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `national_fit.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `nowcast_NSW.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `nowcast_VIC.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `per_state_rmse.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |
| `raw.csv` | CSV data | [CONFIRMED] Long-format data extract with `56,023` rows and `120` series; untracked in git status; active writer not found. |
| `references.bib` | Bibliography | [CONFIRMED] BibTeX references used by report/presentation. |
| `spectral_radius.png` | Image | [INFERRED] Image asset or rendered figure stored at repository root. |

## Inventory — `R/`

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `R/mfbvar_preflight_and_fit.R` | R script | [CONFIRMED] Wrapper for `mfbvar` pre-flight checks and estimation fallback across variance specifications. |
| `R/quarterizing.R` | R script | [CONFIRMED] Helper functions for quarterly aggregation, ragged-edge mapping, and snapshot creation. |
| `R/transformation_core.R` | R script | [CONFIRMED] Stationarity-test and transformation-selection helpers for quarterly panels. |
| `R/utils_build_agg_rules.R` | R script | [CONFIRMED] Script that derives aggregation rules from schema metadata and writes an updated schema file. |
| `R/utils_clean.R` | R script | [CONFIRMED] Cleaning/preparation step that normalizes dates, frequencies, and state codes. |
| `R/utils_fetch_abs.R` | R script | [CONFIRMED] Registry-driven ABS retrieval helpers built around `readabs::read_abs()`. |
| `R/utils_fetch_rba.R` | R script | [CONFIRMED] Registry-driven RBA retrieval helpers built around `readrba::read_rba()`. |
| `R/utils_registry.R` | R script | [CONFIRMED] Schema/registry loader with basic defaults and required-column checks. |
| `R/utils_schema_augment.R` | R script | [CONFIRMED] Helpers that classify series types, hash datasets, and augment schema metadata. |
| `R/utils_state_code.R` | R script | [CONFIRMED] State-code normalization and inference helpers used by preprocessing. |

## Inventory — `data/`

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `data/baseline_metrics.csv` | CSV data | [CONFIRMED] Holdout benchmark metrics by state and model (`naive`, `ols`, `ar`). |
| `data/p21_mfbvar_raw.rds` | RDS data | [CONFIRMED] Serialized output written by the active `p21_raw_mfbvar_rds` target. |
| `data/p21_raw.rds` | RDS data | [CONFIRMED] Older serialized preprocessed dataset from the historical diagnostics workflow. |
| `data/raw_mfbvar.csv` | CSV data | [CONFIRMED] Long-format modeling input used by notebooks/report; `16,460` rows and `26` series. |
| `data/schema_mfbvar.csv` | CSV data | [CONFIRMED] Active `26`-row series registry/schema for the mixed-frequency nowcast dataset. |
| `data/temp/04_current_prices_seasonally_adjusted_capex.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/07_volume_measures_seasonally_adjusted_capex.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/10_volume_measures_states_territories_capex.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5206001_key_aggregates.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5206025_sfd_summary.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5220001_annual_gross_state_product_all_states.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/536801.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5681001_13-industry_summary.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682001.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682003.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682004.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682005.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682006.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682007.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682008.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682009.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682010.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/5682019.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202001.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202004.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202005.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202006.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202007.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202008.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202009.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202019.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6202019a.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/634502b.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/6354001.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/640101.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/850101.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/850103.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731001.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731002.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731003.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/87310030.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/87310031.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/87310032.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/87310033.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/87310034.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731004.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731005.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |
| `data/temp/8731007.xlsx` | XLSX data | [INFERRED] Cached/downloaded source workbook under `data/temp`, named after an ABS catalogue/table identifier or source extract. |

## Inventory — `_targets/` and `_targets_diag/`

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `_targets/.gitignore` | Targets store config | [CONFIRMED] Ignore file inside historical `_targets` store. |
| `_targets/meta/meta` | Targets metadata | [CONFIRMED] Historical `targets` metadata ledger; includes prior pipeline targets and file paths. |
| `_targets/meta/process` | Targets metadata | [CONFIRMED] Historical `targets` process metadata file. |
| `_targets/meta/progress` | Targets metadata | [CONFIRMED] Historical `targets` progress metadata file. |
| `_targets/objects/p11_abs_raw` | Targets cache object | [INFERRED] Historical cached target object `p11_abs_raw` in `_targets` store. |
| `_targets/objects/p12_rba_raw` | Targets cache object | [INFERRED] Historical cached target object `p12_rba_raw` in `_targets` store. |
| `_targets/objects/p1_abs_rba_raw` | Targets cache object | [INFERRED] Historical cached target object `p1_abs_rba_raw` in `_targets` store. |
| `_targets/objects/p211_rules` | Targets cache object | [INFERRED] Historical cached target object `p211_rules` in `_targets` store. |
| `_targets/objects/p21_raw` | Targets cache object | [INFERRED] Historical cached target object `p21_raw` in `_targets` store. |
| `_targets/objects/series_registry` | Targets cache object | [INFERRED] Historical cached target object `series_registry` in `_targets` store. |
| `_targets/workspaces/p1_abs_rba_raw` | Targets workspace | [INFERRED] Historical target workspace `p1_abs_rba_raw` in `_targets` store. |
| `_targets/workspaces/p214_snaps_files` | Targets workspace | [INFERRED] Historical target workspace `p214_snaps_files` in `_targets` store. |
| `_targets_diag/.gitignore` | Targets store config | [CONFIRMED] Ignore file inside diagnostic `_targets_diag` store. |
| `_targets_diag/meta/meta` | Targets metadata | [CONFIRMED] Diagnostic `targets` metadata ledger; records failed targets such as `diag_step3_outputs`, `acf_heatmap_png`, and `p21_rules`. |
| `_targets_diag/meta/process` | Targets metadata | [CONFIRMED] Diagnostic `targets` process metadata file. |
| `_targets_diag/meta/progress` | Targets metadata | [CONFIRMED] Diagnostic `targets` progress metadata file. |
| `_targets_diag/objects/diag_p21_raw` | Targets cache object | [INFERRED] Diagnostic cached target object `diag_p21_raw` in `_targets_diag` store. |
| `_targets_diag/objects/diag_schema_rules` | Targets cache object | [INFERRED] Diagnostic cached target object `diag_schema_rules` in `_targets_diag` store. |
| `_targets_diag/objects/feat_summary` | Targets cache object | [INFERRED] Diagnostic cached target object `feat_summary` in `_targets_diag` store. |
| `_targets_diag/objects/p11_abs_raw` | Targets cache object | [INFERRED] Diagnostic cached target object `p11_abs_raw` in `_targets_diag` store. |
| `_targets_diag/objects/p12_rba_raw` | Targets cache object | [INFERRED] Diagnostic cached target object `p12_rba_raw` in `_targets_diag` store. |
| `_targets_diag/objects/p1_abs_rba_raw` | Targets cache object | [INFERRED] Diagnostic cached target object `p1_abs_rba_raw` in `_targets_diag` store. |
| `_targets_diag/objects/p211_rules` | Targets cache object | [INFERRED] Diagnostic cached target object `p211_rules` in `_targets_diag` store. |
| `_targets_diag/objects/p21_raw` | Targets cache object | [INFERRED] Diagnostic cached target object `p21_raw` in `_targets_diag` store. |
| `_targets_diag/objects/p21_rules` | Targets cache object | [INFERRED] Diagnostic cached target object `p21_rules` in `_targets_diag` store. |
| `_targets_diag/objects/q_panel` | Targets cache object | [INFERRED] Diagnostic cached target object `q_panel` in `_targets_diag` store. |
| `_targets_diag/objects/series_registry` | Targets cache object | [INFERRED] Diagnostic cached target object `series_registry` in `_targets_diag` store. |
| `_targets_diag/workspaces/acf_heatmap_png` | Targets workspace | [CONFIRMED] Diagnostic workspace for `acf_heatmap_png`; metadata ledger records error `subscript out of bounds`. |
| `_targets_diag/workspaces/diag_p21_raw_file` | Targets workspace | [INFERRED] Diagnostic target workspace `diag_p21_raw_file` in `_targets_diag` store. |
| `_targets_diag/workspaces/diag_step3_outputs` | Targets workspace | [CONFIRMED] Diagnostic workspace for `diag_step3_outputs`; metadata ledger records error `missing value where TRUE/FALSE needed`. |
| `_targets_diag/workspaces/feat_summary` | Targets workspace | [INFERRED] Diagnostic target workspace `feat_summary` in `_targets_diag` store. |
| `_targets_diag/workspaces/p21_raw` | Targets workspace | [INFERRED] Diagnostic target workspace `p21_raw` in `_targets_diag` store. |
| `_targets_diag/workspaces/p21_raw_mfbvar_rds` | Targets workspace | [INFERRED] Diagnostic target workspace `p21_raw_mfbvar_rds` in `_targets_diag` store. |
| `_targets_diag/workspaces/p21_rules` | Targets workspace | [CONFIRMED] Diagnostic workspace for `p21_rules`; metadata ledger records error `object 'agg_rule' not found`. |
| `_targets_diag/workspaces/q_panel` | Targets workspace | [INFERRED] Diagnostic target workspace `q_panel` in `_targets_diag` store. |
| `_targets_diag/workspaces/registry_file` | Targets workspace | [INFERRED] Diagnostic target workspace `registry_file` in `_targets_diag` store. |
| `_targets_diag/workspaces/series_registry` | Targets workspace | [INFERRED] Diagnostic target workspace `series_registry` in `_targets_diag` store. |

## Inventory — `_extensions/quarto-monash/...`

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `_extensions/quarto-monash/presentation/_extension.yml` | Extension config | [CONFIRMED] Quarto extension configuration for Monash presentation theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-01.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-02.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-03.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-04.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-05.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-06.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-07.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-08.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-09.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-10.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-11.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-12.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/background/bg-13.png` | Theme asset | [INFERRED] Presentation background image asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-one-line-black-rgb.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-shield.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-stacked-black-rgb.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-stacked-blue-rgb-transparent.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-stacked-blue-rgb.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/_images/logo/monash-stacked-reversed-white.png` | Theme asset | [INFERRED] Presentation logo asset for the Monash Quarto theme. |
| `_extensions/quarto-monash/presentation/beamer/beamerthemeMonash.sty` | Theme asset | [INFERRED] Beamer theme/template asset for the Monash Quarto presentation extension. |
| `_extensions/quarto-monash/presentation/beamer/before-title.tex` | Theme asset | [INFERRED] Beamer theme/template asset for the Monash Quarto presentation extension. |
| `_extensions/quarto-monash/presentation/beamer/toc.tex` | Theme asset | [INFERRED] Beamer theme/template asset for the Monash Quarto presentation extension. |
| `_extensions/quarto-monash/presentation/letterbox/letterbox.scss` | Theme asset | [INFERRED] Letterbox presentation theme template/stylesheet for the Monash Quarto extension. |
| `_extensions/quarto-monash/presentation/letterbox/theme.html` | Theme asset | [INFERRED] Letterbox presentation theme template/stylesheet for the Monash Quarto extension. |
| `_extensions/quarto-monash/presentation/letterbox/title-slide.html` | Theme asset | [INFERRED] Letterbox presentation theme template/stylesheet for the Monash Quarto extension. |
| `_extensions/quarto-monash/presentation/revealjs/monash.scss` | Theme asset | [INFERRED] RevealJS stylesheet for the Monash Quarto presentation extension. |
| `_extensions/quarto-monash/report/AACSB.png` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/AMBA.png` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/EQUIS.png` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/MBSportrait.jpg` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/_extension.yml` | Extension config | [CONFIRMED] Quarto extension configuration for Monash report theme. |
| `_extensions/quarto-monash/report/before-title.tex` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/monash2.png` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |
| `_extensions/quarto-monash/report/title.tex` | Theme asset | [INFERRED] Report theme asset/template for the Monash Quarto extension. |

## Inventory — Support Files

| File Path | Type | Purpose (1 line, confirmed or inferred) |
|---|---|---|
| `Meeting notes/GSP_Meeting_1.docx` | Doc / notes | [CONFIRMED] Meeting note document containing project-scope and success-criteria text. |
| `Meeting notes/GSP_Meeting_notes_2.txt` | Doc / notes | [CONFIRMED] Plain-text meeting notes summarizing planning, methodology, data consistency, and future steps. |
| `__pycache__/helper.cpython-311.pyc` | Binary cache | [CONFIRMED] Compiled Python bytecode cache; corresponding source `helper.py` was not found in the current tree. |
| `images/data_pipeline.png` | Image | [INFERRED] Rendered pipeline diagram image. |
| `images/image-1.webp` | Image | [INFERRED] Report asset / embedded image. |

# STEP 2 — PIPELINE DEEP SCAN (_targets.R)

## Entry Point Status

- `NOT FOUND`: a current top-level `_targets.R` file is not present in the working tree.
- [CONFIRMED] `_targets.yaml` contains:
  - `store: _targets_diag`
  - `script: _targets_DataSourcing.R`
- [CONFIRMED] The active pipeline entry point is therefore `_targets_DataSourcing.R`, not `_targets.R`.
- [CONFIRMED] A historical `_targets.R` existed in git history and is still reflected in the legacy `_targets/` store.

## 2a. Target Node List

| Order | Target name | Expression / command | Upstream dependencies | Produces |
|---|---|---|---|---|
| 1 | `registry_file` | `"schema_mfbvar.csv"` with `format = "file"` | none | [CONFIRMED] file target path string; intended schema file |
| 2 | `series_registry` | `read_registry(registry_file)` | `registry_file` | [INFERRED] registry tibble/data frame |
| 3 | `p11_abs_raw` | `fetch_abs_by_registry(series_registry)` | `series_registry` | [INFERRED] raw ABS long-format tibble/data frame |
| 4 | `p12_rba_raw` | `fetch_rba_by_registry(series_registry)` | `series_registry` | [INFERRED] raw RBA long-format tibble/data frame |
| 5 | `p1_abs_rba_raw` | `bind_rows(p11_abs_raw, p12_rba_raw)` | `p11_abs_raw`, `p12_rba_raw` | [INFERRED] combined long-format tibble/data frame |
| 6 | `p21_raw` | `prep_step1(p1_abs_rba_raw)` | `p1_abs_rba_raw` | [INFERRED] cleaned/prepared tibble/data frame |
| 7 | `p21_raw_mfbvar_rds` | `tarchetypes::tar_file({ saveRDS(p21_raw, "data/p21_mfbvar_raw.rds"); "data/p21_mfbvar_raw.rds" })` | `p21_raw` | [CONFIRMED] file artefact `data/p21_mfbvar_raw.rds` |

### Commented-Out / Historical Targets Present In The Active Script

- [CONFIRMED] `#tar_target(p11_abs_bad, find_bad_abs_ids(series_registry, p11_abs_raw))`
- [CONFIRMED] `# tar_target(p12_rba_bad, find_bad_rba_ids(series_registry, p12_rba_raw))`
- [CONFIRMED] `#tar_target(p21_rules, ...)` is commented out entirely.

### Historical / Diagnostic Targets Found In Targets Metadata

- [CONFIRMED] `_targets/meta/meta` records older targets including `registry_file` with path `data/schema.csv`, `p211_rules`, and `p214_snaps_files`.
- [CONFIRMED] `_targets_diag/meta/meta` records diagnostic-era targets including `diag_p21_raw`, `diag_step3_outputs`, `q_panel`, `feat_summary`, `acf_heatmap_png`, `diag_schema_rules`, `diag_snaps_files`, `p21_rules`, and the newer `p21_raw_mfbvar_rds`.

## 2b. Data Sources

### External data ingestion methods

- [CONFIRMED] ABS retrieval occurs via `readabs::read_abs(series = sid, show_progress_bars = FALSE)` in `R/utils_fetch_abs.R`.
- [CONFIRMED] RBA retrieval occurs via `readrba::read_rba(series = sid)` in `R/utils_fetch_rba.R`.
- [CONFIRMED] `Data_sourcing_GSP.qmd` cites the ABS dataflow URL `https://data.api.abs.gov.au/rest/dataflow`.
- [CONFIRMED] `data_pipeline.qmd` sets `Sys.setenv(R_READABS_PATH = "D:/GSP/data/temp")`, indicating a local cache/download location for ABS files.
- `NOT FOUND`: any database connection code.

### Registry / schema file paths

- [CONFIRMED] `_targets_DataSourcing.R` target `registry_file` points to `schema_mfbvar.csv`.
- [CONFIRMED] `R/utils_registry.R` defaults `read_registry(path = "schema_mfbvar.csv")`.
- [CONFIRMED] `schema_mfbvar.csv` at repository root does **not** exist.
- [CONFIRMED] `data/schema_mfbvar.csv` does exist.
- [CONFIRMED] `README.md` identifies the schema file as `data/schema_mfbvar.csv`.
- [CONFIRMED] This is a live path mismatch between active targets code and the checked-in schema location.

### Output/input hand-off mismatch

- [CONFIRMED] The active targets pipeline writes `data/p21_mfbvar_raw.rds`.
- [CONFIRMED] `GSP_report.qmd` reads `data/raw_mfbvar.csv`.
- [CONFIRMED] `QGSP.ipynb` and `NOW_1.ipynb` both read `data/raw_mfbvar.csv`.
- [CONFIRMED] No current writer for `data/raw_mfbvar.csv` was found in source files searched; only readers were found.

### Example catalogue/table references in documentation

- [CONFIRMED] `Data_sourcing_GSP.qmd` example ABS pull: `read_abs("6354.0")`
- [CONFIRMED] `Data_sourcing_GSP.qmd` example RBA pulls: `read_rba("f1.1")`, `read_rba("f2")`, `read_rba("d2")`, `read_rba("g1")`

### RBA `needed_series` listed in `Data_sourcing_GSP.qmd`

- [CONFIRMED] `Cash Rate Target`
- [CONFIRMED] `Australian Government 2 year bond`
- [CONFIRMED] `Australian Government 10 year bond`
- [CONFIRMED] `Credit; Business; Seasonally adjusted`
- [CONFIRMED] `Credit; Owner-occupier housing; Seasonally adjusted`
- [CONFIRMED] `Credit; Investor housing; Seasonally adjusted`
- [CONFIRMED] `Credit; Total; Seasonally adjusted`
- [CONFIRMED] `Consumer price index`
- [CONFIRMED] `Quarterly trimmed mean inflation`
- [CONFIRMED] `Quarterly weighted median inflation`

### Series IDs present in the active schema

| Alias | series_id | source | freq | transform | geo |
|---|---|---|---|---|---|
| `gdp_aus` | `A2304418T` | `ABS` | `Q` | `qoq_logdiff` | `AUS` |
| `cpi_aus` | `A2325846C` | `ABS` | `Q` | `dlog1` | `AUS` |
| `imports_goods_aus` | `A2718577A` | `ABS` | `M` | `dlog1` | `AUS` |
| `exports_goods_aus` | `A2718594C` | `ABS` | `M` | `dlog1` | `AUS` |
| `bti_total_13div_sa` | `A124874157C` | `ABS` | `M` | `dlog1` | `AUS` |
| `trimmed_mean_inflation_aus` | `GCPIOCPMTMQP` | `RBA` | `Q` | `qoq_logdiff` | `AUS` |
| `cash_rate_target` | `FIRMMCRT` | `RBA` | `M` | `dlog1` | `AUS` |
| `credit_total_rba` | `DLCACS` | `RBA` | `M` | `dlog1` | `AUS` |
| `twi` | `FXRTWI` | `RBA` | `M` | `dlog1` | `AUS` |
| `cmpi` | `GRCPAISDR` | `RBA` | `M` | `dlog1` | `AUS` |
| `sfd_1` | `A2303111F` | `ABS` | `Q` | `qoq_logdiff` | `NSW` |
| `sfd_2` | `A2303139J` | `ABS` | `Q` | `qoq_logdiff` | `VIC` |
| `sfd_3` | `A2303187A` | `ABS` | `Q` | `qoq_logdiff` | `QLD` |
| `sfd_4` | `A2302956R` | `ABS` | `Q` | `qoq_logdiff` | `SA` |
| `sfd_5` | `A2302984X` | `ABS` | `Q` | `qoq_logdiff` | `WA` |
| `sfd_6` | `A2303012X` | `ABS` | `Q` | `qoq_logdiff` | `TAS` |
| `sfd_7` | `A2303040J` | `ABS` | `Q` | `qoq_logdiff` | `NT` |
| `sfd_8` | `A2303068K` | `ABS` | `Q` | `qoq_logdiff` | `ACT` |
| `gsp_nsw_currp_a` | `A2336320R` | `ABS` | `A` | `log` | `NSW` |
| `gsp_vic_currp_a` | `A2336321T` | `ABS` | `A` | `log` | `VIC` |
| `gsp_qld_currp_a` | `A2336322V` | `ABS` | `A` | `log` | `QLD` |
| `gsp_sa_currp_a` | `A2336323W` | `ABS` | `A` | `log` | `SA` |
| `gsp_wa_currp_a` | `A2336324X` | `ABS` | `A` | `log` | `WA` |
| `gsp_tas_currp_a` | `A2336325A` | `ABS` | `A` | `log` | `TAS` |
| `gsp_nt_currp_a` | `A2336326C` | `ABS` | `A` | `log` | `NT` |
| `gsp_act_currp_a` | `A2336327F` | `ABS` | `A` | `log` | `ACT` |

## 2c. Custom Functions

### Scope note

- [CONFIRMED] R helper/project functions are listed here.
- [CONFIRMED] Notebook-local Python functions are enumerated in Step 5 because they belong to the Python modeling notebooks rather than the active `targets` pipeline.

### `R/utils_registry.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `read_registry(path = "schema_mfbvar.csv")` | `path` | registry tibble/data frame | [CONFIRMED] Reads CSV, upper-cases `source`, `freq`, `sa_flag`, fills `state`, `alias`, and defaults empty `transform` to `"level"`; stops if required columns are missing. |

### `R/utils_fetch_abs.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `get_col(df, nm, default = NA_character_)` | data frame, column name, default | column vector or default | [CONFIRMED] Returns `df[[nm]]` if present, otherwise default. |
| `fetch_abs_by_registry(reg)` | registry tibble/data frame | long-format tibble/data frame | [CONFIRMED] Filters `source == "ABS"`, loops over `series_id`, calls `readabs::read_abs()`, and returns `series_label`, `series_id`, `date`, `value`, `unit`, `sa_flag`, `frequency`, `collection_month`, `table_no`, `table_title`, `sheet_no`. |
| `find_bad_abs_ids(reg, abs_raw)` | registry, retrieved ABS data | character vector | [CONFIRMED] Returns requested ABS `series_id` values not found in retrieved data. |

### `R/utils_fetch_rba.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `get_col(df, nm, default = NA_character_)` | data frame, column name, default | column vector or default | [CONFIRMED] Same helper pattern as the ABS file. |
| `fetch_rba_by_registry(reg)` | registry tibble/data frame | long-format tibble/data frame | [CONFIRMED] Filters `source == "RBA"`, loops over `series_id`, calls `readrba::read_rba()`, and returns `series_label`, `series_id`, `date`, `value`, `unit`, `sa_flag`, `frequency`, `table_title`, `description`, `pub_date`, `source`. |
| `find_bad_rba_ids(reg, rba_raw)` | registry, retrieved RBA data | character vector | [CONFIRMED] Returns requested RBA `series_id` values not found in retrieved data. |

### `R/utils_clean.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `prep_step1(df)` | long-format raw data frame | cleaned data frame / tibble | [CONFIRMED] Cleans names, drops optional columns, ensures `date`, normalizes `frequency` and `sa_flag`, fills `freq`, adds canonical `state_code`, normalizes `freq` to `Q/M/W/D`, reorders canonical columns, and asserts `series_id`, `date`, and `value` exist. |

### `R/utils_state_code.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `.norm_label(x)` | label vector | normalized character vector | [CONFIRMED] Lower-cases and literal-replaces `>` and `;`. |
| `recode_existing_state(x)` | existing state column | canonical state-code vector | [CONFIRMED] Maps names/codes to `NSW`, `VIC`, `QLD`, `SA`, `WA`, `TAS`, `NT`, `ACT`, `AUS`. |
| `infer_state_from_series_label(series_label)` | label vector | inferred state-code vector | [CONFIRMED] Literal-token scan of labels/capital-city names to infer state. |
| `add_state_code(df, state_col = "state", series_label_col = "series_label", out_col = "state_code", keep_internals = FALSE)` | data frame and column names | augmented data frame | [CONFIRMED] Prefers explicit `state`, falls back to inferred label token, and writes `state_code`; defaults unresolved rows to `"AUS"`. |

### `R/quarterizing.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `q_start(d)` | date-like vector | quarter-start date | [CONFIRMED] `floor_date(d, unit = "quarter")`. |
| `q_end(d)` | date-like vector | quarter-end date | [CONFIRMED] `ceiling_date(d, unit = "quarter") - days(1)`. |
| `q_id(d)` | date-like vector | quarter ID string | [CONFIRMED] `paste0(year(q_start(d)), "Q", quarter(q_start(d)))`. |
| `quarterize_panel(df, rules_tbl)` | long data, rules table | quarterly panel tibble/data frame | [CONFIRMED] Normalizes frequency, rolls daily/weekly to monthly, then aggregates to `value_q` by quarter using `sum`, `last`, `compound`, or `mean`; adds `q`. |
| `ragged_edge_map(df, ref_date = Sys.Date())` | long data, reference date | summary tibble/data frame | [CONFIRMED] Computes last observation date, last quarter, and `days_since_last` by `series_id` and `state`. |
| `snapshot_cut_dates(target_q_end)` | target quarter-end date | tibble/data frame | [CONFIRMED] Returns labels `T+15`, `T+45`, `T+75` and cut dates from quarter start plus `15/45/75` days. |
| `quarter_month_coverage(df, cut_date)` | long data, cut date | summary tibble/data frame | [CONFIRMED] Counts distinct monthly observations seen per quarter up to a cut date. |
| `build_nowcast_snapshots(df, rules_tbl, target_q_end = NULL)` | long data, rules table, optional quarter-end | list | [CONFIRMED] Returns `cuts`, `panels`, and `coverage` using common rules across cut dates. |

### `R/utils_build_agg_rules.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `normalize_rule(x)` | raw rule string | normalized rule string | [CONFIRMED] Maps variants onto `sum`, `mean`, `last`, `compound`, or `NA`. |
| `rule_from_unit(unit_chr)` | unit string | default rule or `NA` | [CONFIRMED] Uses unit text to infer aggregation rule. |
| `rule_from_series(series_label)` | label string | override rule or `NA` | [CONFIRMED] Uses series-label patterns (credit, bond, CPI, turnover, capex, etc.) to infer rule. |
| `decide_agg_rule(unit, series_label, agg_rule_existing = NA_character_)` | unit, label, existing rule | chosen rule | [CONFIRMED] Prioritizes series-label overrides, then schema rule, then unit default, then `"mean"`. |

### `R/utils_schema_augment.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `classify_series_type(unit, series_label)` | unit, label | series-type string | [CONFIRMED] Classifies into `"index"`, `"rate"`, `"stock"`, or `"flow"`. |
| `compute_dataset_hash(q_panel)` | quarterly panel tibble/data frame | hash string | [CONFIRMED] Hashes sorted core columns `series_id`, `state`, `qtr_end`, `value_q` with `xxhash64`. |
| `augment_schema(schema_raw, q_panel_tbl, freeze_summary = TRUE)` | raw schema, quarterly panel, flag | augmented schema tibble/data frame | [CONFIRMED] Joins `log_ok`, assigns `series_type`, `transform_pref`, and optionally stamps `dataset_hash`, `frozen_at`, `transform_final_frozen`. |

### `R/transformation_core.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `is_true(x)` | logical-like scalar | logical scalar | [CONFIRMED] `isTRUE(x)`. |
| `not_safe(x)` | logical-like scalar | logical scalar | [CONFIRMED] NA-safe negation helper. |
| `safe_any(x)` | logical vector | logical scalar | [CONFIRMED] Treats `NA` as `FALSE`. |
| `classify_series_type(unit, series_label)` | unit, label | series-type string | [CONFIRMED] Same four-way classification as the schema-augment file. |
| `sa_hint_from_label(lbl)` | label string | logical scalar | [CONFIRMED] Detects `"seasonally adjusted"` in labels. |
| `diff1(x)` | numeric vector | differenced vector | [CONFIRMED] First difference. |
| `diffk(x, k)` | numeric vector, lag | differenced vector | [CONFIRMED] Lag-`k` difference. |
| `safe_log(x, offset)` | numeric vector, offset | log vector | [CONFIRMED] Logs `x + offset` where offset is usable. |
| `compute_offset(x, unit, cfg = step3_default_cfg)` | values, unit, config | numeric offset or `NA` | [CONFIRMED] Chooses log offset using units and positivity checks. |
| `adf_p(x, max_lags = 6)` | numeric vector, lag count | p-value bucket | [CONFIRMED] Runs `urca::ur.df()` and maps result to `0.01`, `0.05`, `0.10`, or `0.20`. |
| `kpss_p(x)` | numeric vector | p-value or `NA` | [CONFIRMED] Runs `tseries::kpss.test()`. |
| `passes_stationarity(p_adf, p_kpss, cfg = step3_default_cfg)` | test results, config | logical | [CONFIRMED] Applies tie-break policy such as `"lenient_adf_primary"`. |
| `choose_with_tests(series_type, candidates, cfg = step3_default_cfg)` | series type, candidate list, config | list | [CONFIRMED] Tests candidate transforms and picks the first passing transform or a fallback. |
| `transform_panel_with_tests(q_panel_tbl, schema_aug, cfg = step3_default_cfg)` | quarterly panel, augmented schema, config | augmented quarterly panel | [CONFIRMED] Computes `x_level`, `x_diff`, `x_log`, `x_dlog`, seasonal variants, selected transform, p-values, and standardized `x_final_z`. |
| `summarise_transform_choice(q_panel_transformed)` | transformed panel | summary tibble/data frame | [CONFIRMED] Counts transform choices and returns the dominant choice by `series_id`. |

### `R/mfbvar_preflight_and_fit.R`

| Function | Inputs | Returns | Notes |
|---|---|---|---|
| `mfbvar_preflight_and_fit(Y_ts, freq_vec, n_lags = 4, prior_type = c("ss","ssng","minn"), variance_list = c("fsv","csv","iw"), n_fac = NULL, prior_psi_mean = NULL, prior_psi_Omega = NULL, prior_ng = c(0.01, 0.01), block_exo = integer(0), n_burnin = 2000, n_reps = 4000, n_thin = 2, n_fcst = 12, debug = FALSE, log_file = "mfbvar_debug.log")` | monthly `ts`/`mts`, frequency vector, prior/variance/sampling controls | list | [CONFIRMED] Drops unusable series, checks W→M→Q ordering and observed quarterly values, standardizes inputs, constructs `mfbvar` prior, attempts estimation with `fsv` then falls back to `csv` then `iw`, and returns `model`, `prior`, `dropped`, `Y_ts`, `freq_vec`, `success`. |

## 2d. Final Pipeline Output

### Active pipeline output

- [CONFIRMED] The active `targets` graph ends with `p21_raw_mfbvar_rds`.
- [CONFIRMED] That target writes `data/p21_mfbvar_raw.rds`.
- [INFERRED] The serialized object is the `p21_raw` object returned by `prep_step1()`, so its in-memory structure is expected to be a tibble/data frame.

### Canonical column structure of `p21_raw` inferred from `prep_step1()`

- [CONFIRMED] `prep_step1()` explicitly reorders these canonical columns when present:
  - `series_id`
  - `alias`
  - `series_label`
  - `state`
  - `state_code`
  - `date`
  - `value`
  - `freq`
  - `unit`
  - `sa_flag`
  - `transform_rule`
  - `source`
  - `industry`
  - `table`
  - `seasonal_adj_source`

### Closest directly inspectable downstream data file

- [CONFIRMED] `data/raw_mfbvar.csv` has shape `(16460, 14)`.
- [CONFIRMED] `data/raw_mfbvar.csv` columns are:
  - `Unnamed: 0`
  - `series_id`
  - `series_label`
  - `state`
  - `state_code`
  - `date`
  - `value`
  - `freq`
  - `unit`
  - `sa_flag`
  - `source`
  - `frequency`
  - `table_title`
  - `description`
- [CONFIRMED] Date range in `data/raw_mfbvar.csv`: `1948-09-01` to `2025-10-24`.
- [CONFIRMED] Frequency counts in `data/raw_mfbvar.csv`: `D = 10547`, `M = 3608`, `Q = 2025`, `Annual = 280`.
- [CONFIRMED] Unique series count in `data/raw_mfbvar.csv`: `26`.

### Historical / diagnostic outputs found in targets metadata

- [CONFIRMED] `_targets/meta/meta` and `_targets_diag/meta/meta` show prior/historical outputs including `data/p21_raw.rds`, `data/q_panel.csv`, `data/ragged_edge_profile.csv`, `data/snapshot_cuts.csv`, `data/within_quarter_coverage.csv`, and baseline snapshot files.
- [CONFIRMED] These files are not all present in the current working tree; several were deleted in later commits.

## 2e. Reproducibility Features

- `renv.lock`: `NOT FOUND`
- `requirements.txt`: `NOT FOUND`
- `pyproject.toml`: `NOT FOUND`
- `DESCRIPTION`: `NOT FOUND`
- `environment.yml`: `NOT FOUND`
- [CONFIRMED] `targets` caching/store behavior is used through `_targets.yaml`, `_targets/`, and `_targets_diag/`.
- [CONFIRMED] `_targets.yaml` currently sets `store: _targets_diag`.
- [CONFIRMED] `README.md` states: `The pipeline is declarative, rerunning tar_make() only rebuilds what changed.`
- [CONFIRMED] `data_pipeline.qmd` explicitly runs `tar_manifest(script = "_targets_DataSourcing.R")` and `tar_make(script = "_targets_DataSourcing.R")`.
- [CONFIRMED] Notebook sampling uses explicit NumPy seeds such as `default_rng(20251029)` and `default_rng(123)`.
- [CONFIRMED] `mfbvar_preflight_and_fit.R` has no global seed-setting code.
- CI/CD: `NOT FOUND`
- Git history: [CONFIRMED] present and usable for temporal reconstruction.

# STEP 3 — EDA SCAN

## EDA Asset Status

- Dedicated EDA-only `.Rmd` or `.qmd` notebooks in the current tree: `NOT FOUND`
- [CONFIRMED] Exploratory data inspection is embedded in `QGSP.ipynb` and `NOW_1.ipynb`.
- [CONFIRMED] Historical files `Stationarity.qmd` and `Snapshot_leakage.qmd` appear in git history but are not present in the current working tree.

## Per-file EDA Report — `QGSP.ipynb`

- File type: [CONFIRMED] Jupyter notebook, kernel `mf-bvar-pymc-311`, Python `3.11.13`
- Variables / series explored:
  - [CONFIRMED] `GDP_ALIAS = "gdp_aus"`
  - [CONFIRMED] exogenous aliases: `cash_rate_target`, `trimmed_mean_inflation_aus`, `twi`, `cmpi`
  - [CONFIRMED] state aliases loaded through `sfd_[1-8]`
  - [CONFIRMED] annual GSP current-price rows identified by `series_title` containing `"Gross state product: Current prices"`
- Transform/resample logic:
  - [CONFIRMED] monthlies are quarterized by `to_quarterly(s, how="mean")`
  - [CONFIRMED] supported transforms in `apply_transform()` are `level/none/identity`, `log`, `dlog1`, `qoq_logdiff`
  - [CONFIRMED] quarterly alignment uses `PeriodIndex("Q-JUN")`
- Data coverage summaries printed by notebook:
  - [CONFIRMED] `quarters: 137`
  - [CONFIRMED] `y_nat_q.shape: (137,)`
  - [CONFIRMED] `X_exog_q.shape: (137, 4)`
  - [CONFIRMED] `y_sfd_q.shape: (137, 8)`
  - [CONFIRMED] `W_q.shape: (137, 8)`
  - [CONFIRMED] `exog_order: ['cash_rate_target', 'trimmed_mean_inflation_aus', 'twi', 'cmpi']`
  - [CONFIRMED] `first_quarter: 1991Q2`
  - [CONFIRMED] `last_quarter: 2025Q4`
- Statistical summaries computed before model fitting:
  - [CONFIRMED] OLS on standardized national vs weighted-state combination:
    - `a_hat = 0.010615934286051513`
    - `b_hat = 0.7950528259347572`
    - `R2 = 0.26809805960489475`
    - `corr = 0.5177818648860686`
  - [CONFIRMED] first-difference regression:
    - `diff_R2 = 0.2208427182907644`
    - `diff_corr = 0.4699390580604729`
    - `a_hat = -0.010779720776873256`
    - `b_hat = 0.6399244876426806`
  - [CONFIRMED] lag-correlation search over `range(-4, 5)` reported best lag `(0, 0.5177818648860686)`
  - [CONFIRMED] period-correlation output:
    - `{'lo': None, 'hi': '2000-01-01', 'corr': 0.4316627105391153}`
    - `{'lo': '2000-01-01', 'hi': '2008-01-01', 'corr': 0.4664510800843944}`
    - `{'lo': '2008-01-01', 'hi': '2020-01-01', 'corr': 0.5819906602151496}`
    - `{'lo': '2020-01-01', 'hi': None, 'corr': 0.6436390650827579}`
- Visualisations produced:
  - [CONFIRMED] `National fit from latent G`
  - [CONFIRMED] histogram titled `Spectral radius across draws`
  - [CONFIRMED] faceted figure titled `State nowcasts — last 12 quarters`
  - [CONFIRMED] bar chart titled `Per-state RMSE (last 8 quarters)`
- Author comments / notes written in notebook:
  - [CONFIRMED] markdown heading `## Data Loading and Pre-processing`
  - [CONFIRMED] markdown heading `## Dirichlet–Laplace (DL) prior utilities`
  - [CONFIRMED] markdown heading `## Top-level MCMC loop (blocked Gibbs)`
  - [CONFIRMED] comment `p = 7  # start with 3 quarterly lags; we can lift to 7 later`
  - [CONFIRMED] comment in `load_q()`: `# Monthlies -> quarterly via mean (schema doesn’t provide an aggregator column)`
- Decisions implied by the EDA / preprocessing code:
  - [CONFIRMED] common quarterly intersection is enforced across all required series.
  - [CONFIRMED] state ordering is fixed as `["NSW","VIC","QLD","SA","WA","TAS","NT","ACT"]`.
  - [INFERRED] the notebook keeps the national/state coherence link because the weighted-state and national series correlation is not strong enough to justify dropping the measurement block.

## Per-file EDA Report — `NOW_1.ipynb`

- File type: [CONFIRMED] Jupyter notebook, kernel `mf-bvar-pymc-311`, Python `3.11.13`
- Relationship to `QGSP.ipynb`:
  - [CONFIRMED] `NOW_1.ipynb` has `35` cells vs `32` in `QGSP.ipynb`.
  - [CONFIRMED] the core notebook structure is almost identical, with changed run parameters and extra final cells.
  - [INFERRED] `NOW_1.ipynb` is a continuation/refinement rather than a full restart.
- Variables / series explored:
  - [CONFIRMED] same quarterly inputs as `QGSP.ipynb`: `gdp_aus`, `cash_rate_target`, `trimmed_mean_inflation_aus`, `twi`, `cmpi`, `sfd_[1-8]`, and annual GSP current-price series for weights.
- Statistical summaries computed:
  - [CONFIRMED] the same pre-fit OLS, differenced, lag-correlation, and period-correlation diagnostics are present with the same reported values as `QGSP.ipynb`.
- Visualisations produced:
  - [CONFIRMED] same national-fit, spectral-radius, faceted state-nowcast, and per-state RMSE figures as `QGSP.ipynb`
  - [CONFIRMED] additional saved single-state nowcast figures:
    - `nowcast_NSW.png`
    - `nowcast_VIC.png`
- Author comments / notes written in notebook:
  - [CONFIRMED] markdown heading changed from `## Important helper components` to `## helper components`
  - [CONFIRMED] same `p = 7  # start with 3 quarterly lags; we can lift to 7 later` comment remains
  - [CONFIRMED] helper docstrings in final cells state plots are in `MILLIONS`
- Important ambiguity / incomplete state:
  - [CONFIRMED] final level-reconstruction cells reference `dfA`, `anchor_year`, `anchor_t`, and `reconstruct_levels_from_growth`
  - [CONFIRMED] these names do not appear elsewhere in the saved source of the notebook
  - [INFERRED] those cells were executed with additional in-memory state not preserved in the notebook file
- Decisions made / changed:
  - [CONFIRMED] sampler call in `NOW_1.ipynb` uses `N_iter=10000, burn=2000, thin=2`
  - [CONFIRMED] `QGSP.ipynb` uses `N_iter=30000, burn=10000, thin=2`
  - [INFERRED] `NOW_1.ipynb` appears to be a shorter rerun / revised experiment on the same model structure

# STEP 4 — MODELING SCAN: R PHASE

## 4a. Packages Used

- [CONFIRMED] `mfbvar` via namespace calls in `R/mfbvar_preflight_and_fit.R`
- [CONFIRMED] `tseries` in `R/transformation_core.R`
- [CONFIRMED] `urca` in `R/transformation_core.R`
- [CONFIRMED] `targets` / `tarchetypes` are part of the R workflow layer but not the model-fitting layer itself

## 4b. Model Specifications

### `mfbvar_preflight_and_fit()` wrapper

- Model type: [CONFIRMED] mixed-frequency Bayesian VAR wrapper for `mfbvar::estimate_mfbvar()`
- Input data frequency:
  - [CONFIRMED] `Y_ts` must be a monthly `ts`/`mts`
  - [CONFIRMED] quarterly variables are expected to be `padded by NA in non-quarter-end months`
  - [CONFIRMED] `freq_vec` tags are `"m"`, `"q"`, or `"w"`
- Variable set:
  - `NOT FOUND` as hard-coded series names in the R model wrapper
  - [CONFIRMED] variables are passed generically as columns of `Y_ts`
- Lag structure:
  - [CONFIRMED] default `n_lags = 4`
- Prior structure:
  - [CONFIRMED] `prior_type = c("ss","ssng","minn")`
  - [CONFIRMED] `set_prior()` baseline prior is built first
  - [CONFIRMED] `update_prior()` then applies steady-state or related prior settings
  - [CONFIRMED] default `prior_ng = c(0.01, 0.01)`
  - [CONFIRMED] if `prior_type == "ss"`, default `prior_psi_Omega <- diag(k) * 0.05`
  - [CONFIRMED] if `prior_type == "ss"` or `"ssng"`, default `prior_psi_mean <- rep(0, k)`
- Variance structure:
  - [CONFIRMED] `variance_list = c("fsv","csv","iw")`
  - [CONFIRMED] FSV requires `n_fac`; if not provided, fallback `n_fac <- 1L`
- Forecast horizon / MCMC controls:
  - [CONFIRMED] `n_burnin = 2000`
  - [CONFIRMED] `n_reps = 4000`
  - [CONFIRMED] `n_thin = 2`
  - [CONFIRMED] `n_fcst = 12`
- Target output:
  - [CONFIRMED] returned list with `model`, `prior`, `dropped`, `Y_ts`, `freq_vec`, `success`

### R-side conceptual model described in `GSP_report.qmd` / `Estimation_GSP.qmd`

- [CONFIRMED] state equation VAR:
  - `g_t = c + A_1 g_{t-1} + ... + A_p g_{t-p} + u_t`
- [CONFIRMED] measurement equation:
  - `y_{N,t} = a_N + b_N ( w_t' g_t ) + e_{N,t}`
- [CONFIRMED] national/state coherence is handled by weighting contemporaneous state growth
- [CONFIRMED] Minnesota shrinkage is explicitly documented
- [CONFIRMED] Dirichlet-Laplace global-local prior is explicitly documented
- [CONFIRMED] stochastic volatility support is documented, with `\phi_i` possibly fixed near `0.98`
- [CONFIRMED] blocked Gibbs sampling and FFBS are documented

## 4c. Results & Failure Modes

### `mfbvar_preflight_and_fit.R`

- Did it run to completion? `NOT FOUND`
- Output file from this wrapper: `NOT FOUND`
- Debug log file `mfbvar_debug.log`: `NOT FOUND`
- Failures explicitly anticipated by the wrapper comments:
  - [CONFIRMED] `"Mat::cols(): indices out of bounds or incorrectly used"`
  - [CONFIRMED] `"Too low order"`
  - [CONFIRMED] `"non-numeric matrix extent"`
  - [CONFIRMED] `Cholesky and precision failures arising from singular design matrices`
- Fallback strategy:
  - [CONFIRMED] try `variance = "fsv"`
  - [CONFIRMED] then fall back to `variance = "csv"`
  - [CONFIRMED] then fall back to `variance = "iw"`

### R-side diagnostics / transformation workflow failures captured in targets metadata

- [CONFIRMED] `_targets_diag/meta/meta` records:
  - `diag_step3_outputs ... missing value where TRUE/FALSE needed`
  - `acf_heatmap_png ... subscript out of bounds`
  - `p21_rules ... object 'agg_rule' not found`
- [CONFIRMED] these are not model-convergence metrics, but they are concrete R-phase failures in the diagnostic/transformation pipeline around quarterly panel construction and rule handling.

### Reported status of the broader Bayesian model in R-authored documents

- [CONFIRMED] `GSP_report.qmd` line 108 states: `The models have not yet produced a stable or reliable posterior.`
- [CONFIRMED] `GSP_report.qmd` line 21 lists `identification and scaling`, `sensitivity to prior choices`, `sampler errors (divergences and poor mixing)`, and `timing mismatches`
- [CONFIRMED] `Estimation_GSP.qmd` line 243 states: `Highly collinear data pairs causing Cholesky decomposition failure, followed by matrix out of bound errors.`

### TODO / FIXME / versioned abandoned R model scripts

- `TODO`: `NOT FOUND`
- `FIXME`: `NOT FOUND`
- explicit versioned R model files such as `v1`, `v2`, `final_BROKEN`: `NOT FOUND`
- [CONFIRMED] untracked R files in current git status indicate ongoing R-side iteration:
  - `R/mfbvar_preflight_and_fit.R`
  - `R/transformation_core.R`
  - `R/utils_schema_augment.R`

## 4d. Paper Replication

- [CONFIRMED] `GSP_report.qmd` cites `@KoopMcIntyreMitchellPoon2020` when motivating coherent regional/national estimation.
- [CONFIRMED] `GSP_report.qmd` cites `@MitchellEtAl2005` for the mixed-frequency motivation.
- [CONFIRMED] `GSP_report.qmd` cites `@MarianoMurasawa2010` for the national/state coherence link.
- [CONFIRMED] `GSP_report.qmd` cites `@BhattacharyaPatiPillaiDunson2015` for the Dirichlet-Laplace prior.
- [CONFIRMED] `GSP_report.qmd` cites `@KimShephardChib1998` and `@CarterKohn1994` for stochastic-volatility / FFBS estimation.
- Direct statement that a paper was being formally replicated: `NOT FOUND`
- [INFERRED] The modeling framework is heavily informed by the cited literature, especially the UK regional-output and mixed-frequency nowcasting references, but the repo does not state a strict line-by-line replication objective.
- How far replication/inspiration got:
  - [CONFIRMED] data pipeline and structural formulas are documented
  - [CONFIRMED] prototype Bayesian estimation/reporting exists
  - [CONFIRMED] stable posterior / reliable nowcasts were not achieved

# STEP 5 — MODELING SCAN: PYTHON PHASE

## Python Source Status

- `.py` source files: `NOT FOUND`
- [CONFIRMED] Python work is in `QGSP.ipynb` and `NOW_1.ipynb`
- [CONFIRMED] `__pycache__/helper.cpython-311.pyc` exists, but the corresponding source file is not in the current tree

## 5a. Packages Used

### Exact import statements found across Python notebooks

- `from IPython.display import display`
- `from matplotlib.ticker import StrMethodFormatter`
- `from numpy.linalg import cholesky as _np_chol, solve as _np_solve`
- `from numpy.linalg import cholesky, solve`
- `from numpy.random import default_rng`
- `from pathlib import Path`
- `from pytensor import scan`
- `from scipy.linalg import solve_triangular`
- `from scipy.special import logsumexp`
- `import ipywidgets`
- `import matplotlib.pyplot as plt`
- `import numpy as np`
- `import pandas as pd`
- `import pytensor.tensor as pt`

### Commented imports / attempted packages

- [CONFIRMED] `# import pymc as pm`
- [CONFIRMED] `# import pytensor`
- [CONFIRMED] `#from pymc.model.transform.optimization import freeze_dims_and_data`

### Notebook-local custom function inventory

The following function names are directly present in the saved notebook source.

#### Functions present in both `QGSP.ipynb` and `NOW_1.ipynb`

- [CONFIRMED] preprocessing / diagnostics:
  - `build_series_bank_long`
  - `to_quarterly`
  - `safe_log`
  - `apply_transform`
  - `to_quarter_period`
  - `load_q`
  - `load_sfd`
  - `diff1`
  - `corr_at_lag`
- [CONFIRMED] linear-algebra / simulation helpers:
  - `cholsolve`
  - `sym_pd`
  - `rmvnorm`
  - `ridge_gaussian_draw`
  - `ridge_gaussian_draw_compat`
  - `rmvnorm_compat`
- [CONFIRMED] VAR / prior helpers:
  - `build_var_design`
  - `make_prior_scale_vec`
  - `update_beta_equation`
  - `build_minnesota_scale`
  - `calibrate_nat`
  - `spectral_radius`
  - `spectral_radius_from_Phi`
- [CONFIRMED] Dirichlet-Laplace helpers:
  - `dl_init`
  - `dl_prior_precision`
  - `inv_gaussian_mu_lambda`
  - `dl_update_locals`
  - `dl_update_phi`
  - `slice_sample`
  - `dl_update_tau`
  - `dl_update_locals_compat`
  - `dl_update_phi_compat`
  - `dl_update_tau_compat`
  - `summarize_dl_blocks`
  - `ridge_precision_stats`
- [CONFIRMED] residual / contemporaneous-structure helpers:
  - `residuals_from_var`
  - `update_L_dl`
  - `update_L_dl_compat`
- [CONFIRMED] stochastic-volatility helpers:
  - `sv_update_series`
  - `sv_update_block` (defined more than once)
  - `_sv_should_update`
  - `_clip_h`
  - `_lam_floor`
  - `_cap_phi_blocks`
  - `_robust_eq_scales`
- [CONFIRMED] state-space / FFBS helpers:
  - `companion_F`
  - `embed_Phi_top`
  - `build_Qt_from_SV`
  - `ffbs_companion`
- [CONFIRMED] defensive / utility helpers:
  - `_nan_report`
  - `_soft_enforce_stationarity`
  - `_safe_log_u2`
  - `_rowwise_categorical_from_logw`
  - `_ok_nat_mask`
  - `first_present`
  - `pull_vec_draws`
  - `rmse`
  - `corr`
- [CONFIRMED] forecasting / evaluation helpers:
  - `quick_nat_rmse_from_draws`
  - `fitted_mean_from_latent`
  - `ppc_nat_from_tilde`
  - `plot_nat_ppc_tilde`
  - `forecast_naive`
  - `forecast_ar1`
  - `forecast_tslm`
  - `run_bvar_sv_dl`

#### Additional functions present in `NOW_1.ipynb`

- [CONFIRMED]
  - `_destandardize`
  - `_to_millions`
  - `plot_one_state`

#### Additional function/state observations

- [CONFIRMED] `sv_update_block` is defined twice in each notebook.
- [CONFIRMED] `NOW_1.ipynb` adds level-reconstruction / plotting helpers not present in `QGSP.ipynb`.
- [INFERRED] the notebooks evolved interactively, with compatibility wrappers and repeated helper redefinitions retained in saved source.

## 5b. PyMC Model Structure

- Active `pm.Model()` block: `NOT FOUND`
- Active `pm.sample(...)` call: `NOT FOUND`
- Active posterior predictive call through PyMC: `NOT FOUND`
- [CONFIRMED] `Estimation_GSP.qmd` mentions `PyMC` in the note `Assigning coordinate indices to NaN entries in PyMC allows the model to identify`
- [CONFIRMED] that sentence is incomplete in the saved file
- [CONFIRMED] both notebooks use a kernel named `mf-bvar-pymc-311`
- [INFERRED] PyMC appears to have been considered, but the saved notebooks implement a custom Gibbs/FFBS workflow rather than an active PyMC model

### Non-PyMC Bayesian notebook structure actually present

- [CONFIRMED] `run_bvar_sv_dl(...)` is the top-level sampler function
- [CONFIRMED] saved per-draw variables include:
  - `Alpha`
  - `Phi_list`
  - `L`
  - `h`
  - `G`
  - `sigma_nat`
  - `sigma_sfd`
  - `a_sfd`
  - `b_sfd`
  - `a_nat`
  - `b_nat`
- [CONFIRMED] national measurement in standardized space:
  - `y_nat(t) = a_nat + b_nat * sum_j W_q(t,j) * G_t[j] + e_nat(t)` in docstring
  - also explicitly: `WG_til = (WG - WG_mu0) / WG_sd0` and `y_nat  = a_til + b_til * WG_til + e`
- [CONFIRMED] state measurement:
  - `y_j(t)   = a_j   + b_j   * G_t[j]                 + e_j(t)` in docstring
- [CONFIRMED] lag order in executed notebooks: `p = 7`
- [CONFIRMED] exogenous input matrix is `X_exog_std` with four quarterly exogenous series
- [CONFIRMED] stochastic volatility persistence parameter passed to sampler: `phi_sv=0.98`
- [CONFIRMED] stationarity guard is enabled with `stationarity_guard=True`
- [CONFIRMED] SV schedule examples:
  - `sv_freeze=1200`
  - `sv_eps_schedule={0:1e-3, 1500:1e-6, 3500:1e-8, 5000:1e-12}`

## 5c. Results & Failure Modes

### `QGSP.ipynb`

- Sampler call:
  - [CONFIRMED] `N_iter=30000`
  - [CONFIRMED] `burn=10000`
  - [CONFIRMED] `thin=2`
  - [CONFIRMED] `rng=default_rng(20251029)`
- Verification outputs:
  - [CONFIRMED] `[Check] 80% PPC coverage = 0.759  (target ~0.75–0.85)`
  - [CONFIRMED] `[Check] corr(center, obs) = 0.677     (target ≥ 0.70)`
  - [CONFIRMED] `[Check] RMSE (std units)   = 0.792`
  - [CONFIRMED] `[Check] b_nat_tilde 90% CI = [0.125, 0.263]  (should be > 0)  | median=0.187`
  - [CONFIRMED] `[Check] spectral radius  median=0.969  p95=0.970  % near guard (≥0.97-1e-3)=60.7%`
- State evaluation:
  - [CONFIRMED] `[Audit] Coherence max|diff|: 4.440892098500626e-15`
  - [CONFIRMED] `Median RMSE (model): 0.36374760670085965`
  - [CONFIRMED] `Share states meeting corr ≥ 0.70: 0.875`
  - [CONFIRMED] `Share states with 80% coverage in [0.75,0.85]: 0.0`
  - [CONFIRMED] `Share states beating baselines (RMSE): Naive=1.00, AR1=0.75, TSLM=0.75`
- Failure / concern signals:
  - [CONFIRMED] calibration correlation misses stated target (`0.677` vs `≥ 0.70`)
  - [CONFIRMED] spectral radius is very near the stationarity guard (`median=0.969`, `p95=0.970`)
  - [CONFIRMED] state predictive coverage target is met by `0.0` share of states

### `NOW_1.ipynb`

- Sampler call:
  - [CONFIRMED] `N_iter=10000`
  - [CONFIRMED] `burn=2000`
  - [CONFIRMED] `thin=2`
  - [CONFIRMED] `rng=default_rng(20251029)`
- Progress output excerpts:
  - [CONFIRMED] at `iter 750`: `RMSE_nat=230`, `h(min=-3.00, med=-3.00, max=-3.00)`
  - [CONFIRMED] at `iter 1500`: `RMSE_nat=0.741`, `rho=0.970`, `vol(exp(h) med=1.34, p05=0.643, p95=2.72)`
  - [INFERRED] the early `RMSE_nat=230` plus `h` pinned at `-3.00` indicates poor initial state/volatility behavior before later stabilization
- Verification outputs:
  - [CONFIRMED] `[Check] 80% PPC coverage = 0.744  (target ~0.75–0.85)`
  - [CONFIRMED] `[Check] corr(center, obs) = 0.674     (target ≥ 0.70)`
  - [CONFIRMED] `[Check] RMSE (std units)   = 0.786`
  - [CONFIRMED] `[Check] b_nat_tilde 90% CI = [0.133, 0.276]  (should be > 0)  | median=0.196`
  - [CONFIRMED] `[Check] spectral radius  median=0.969  p95=0.970  % near guard (≥0.97-1e-3)=61.3%`
- State evaluation:
  - [CONFIRMED] `[Audit] Coherence max|diff|: 2.4091839634365897e-14`
  - [CONFIRMED] `Median RMSE (model): 0.3477619254524832`
  - [CONFIRMED] `Share states meeting corr ≥ 0.70: 0.75`
  - [CONFIRMED] `Share states with 80% coverage in [0.75,0.85]: 0.0`
  - [CONFIRMED] `Share states beating baselines (RMSE): Naive=1.00, AR1=0.75, TSLM=0.75`
- Additional saved summary table:
  - [CONFIRMED] `checks = pd.DataFrame([...])` writes the same five metrics later saved in `model_fit_calibration.csv`
- Failure / concern signals:
  - [CONFIRMED] correlation misses stated target (`0.674` vs `>= 0.70`)
  - [CONFIRMED] PPC coverage misses target lower bound (`0.744` vs target around `0.75`)
  - [CONFIRMED] spectral radius remains very near `1`
  - [CONFIRMED] state-level predictive coverage target is again met by `0.0` share of states
  - [CONFIRMED] final notebook cells depend on undefined saved-source names (`anchor_year`, `anchor_t`, `reconstruct_levels_from_growth`), so the notebook is not self-contained as committed

### Convergence warnings of the Stan/PyMC type

- Divergent-transition count: `NOT FOUND`
- `Rhat` values: `NOT FOUND`
- `ESS` values: `NOT FOUND`
- [CONFIRMED] these HMC-style diagnostics do not appear because the saved notebooks are not using a live PyMC/NUTS workflow

## 5d. Comparison to R Phase

- [CONFIRMED] The R phase contains an `mfbvar` wrapper expecting monthly `ts/mts` input, W→M→Q ordering, and package-managed estimation.
- [CONFIRMED] The Python phase uses a custom quarterly blocked-Gibbs / FFBS sampler in notebook code.
- [CONFIRMED] `Estimation_GSP.qmd` mentions a PyMC missing-value heuristic, but the saved notebooks do not contain active PyMC model code.
- [INFERRED] The Python phase is best described as a continuation/evolution of the same modeling goal rather than a clean restart:
  - same economic target (quarterly/state-national GSP coherence)
  - same exogenous variables
  - same mixed-frequency framing
  - different implementation path (custom sampler instead of package/PyMC route)
- [CONFIRMED] `QGSP.ipynb` and `NOW_1.ipynb` differ mainly in run length, some helper code revisions, updated outputs, and extra level-plotting cells.

# STEP 6 — TEMPORAL RECONSTRUCTION

| Phase | Files Involved | What Was Attempted | Outcome |
|---|---|---|---|
| Aug 2025: project setup and scoping | `LICENSE`, `GSP.Rproj`, `Meeting notes/GSP_Meeting_1.docx`, `Meeting notes/GSP_Meeting_notes_2.txt`, historical `Timeline/*` files from git log | Repository initialization, meeting-note capture, initial timeline/project planning | [CONFIRMED] Repo scaffolding and planning artefacts were committed first. |
| Sep 2025: schema and data-source exploration | historical `GSP.qmd`, `data/schema.csv`, `data/schema_draft.xlsx`, `R/utils_fetch_abs.R`, `R/utils_fetch_rba.R`, `R/utils_registry.R`, `Data_sourcing_GSP.qmd` | Building schema, identifying ABS/RBA series, adding helper functions, documenting source selection | [CONFIRMED] Helper R files and the data-sourcing note were added; historical schema files were later replaced/deleted. |
| Sep 2025: first targets pipeline and preprocessing | historical `_targets.R`, current `R/utils_clean.R`, `R/utils_state_code.R`, `_targets/`, `data/p21_raw.rds` | First `targets` pipeline, cleaning rules, state-code inference, combined ABS/RBA pull | [CONFIRMED] Core fetch/clean pipeline existed by late September; `_targets` store still contains historical outputs. |
| Sep 2025: diagnostics / quarterly panel work | historical `_targets_diagnostics.R`, current `R/quarterizing.R`, untracked `R/transformation_core.R`, untracked `R/utils_schema_augment.R`, `_targets_diag/`, deleted `data/q_panel.csv`, deleted `data/ragged_edge_profile.csv`, deleted snapshot files | Ragged-edge diagnostics, quarterly aggregation, stationarity-based transforms, snapshot leakage checks, feature summaries | [CONFIRMED] Diagnostic workflow was built; targets metadata records concrete failures in `diag_step3_outputs`, `acf_heatmap_png`, and `p21_rules`. |
| Sep 30 2025: diagnostic notebooks removed / transition point | deleted `Snapshot_leakage.qmd`, deleted `Stationarity.qmd`, deleted `_targets.R`, deleted `_targets_diagnostics.R` | Cleanup or consolidation away from earlier diagnostic entry points | [CONFIRMED] These files were deleted in git history. |
| Oct 2025: presentation and report drafting | `Estimation_GSP.qmd`, `Estimation_GSP.html`, image assets, root branding images | Formalizing methodology, documenting sampler issues, preparing slides/visuals | [CONFIRMED] Modeling equations and specific failure explanations were written into the presentation. |
| Late Oct to early Nov 2025: active data-source pipeline refresh | `_targets.yaml`, `_targets_DataSourcing.R`, `data/schema_mfbvar.csv`, `data/raw_mfbvar.csv`, `data/p21_mfbvar_raw.rds`, `data_pipeline.qmd`, `README.md` | Switch to `_targets_DataSourcing.R`, newer schema, MF-BVAR-oriented raw data extract, updated README/pipeline note | [CONFIRMED] This is the currently active data-pipeline layer, though path/output mismatches remain. |
| Nov 2025: Python Bayesian notebook work and evaluation artefacts | `QGSP.ipynb`, `NOW_1.ipynb` (untracked), `model_fit_calibration.csv`, `national_fit.png`, `Coherence_gap.png`, `per_state_rmse.png`, `spectral_radius.png`, `nowcast_NSW.png`, `nowcast_VIC.png` | Custom quarterly blocked-Gibbs / FFBS MF-BVAR-SV experiments, calibration checks, state backtests, figure generation | [CONFIRMED] Notebooks and figures exist; calibration remained below target in several key metrics. |

### Current Working Tree State Relevant To Timeline

- [CONFIRMED] modified tracked files:
  - `R/quarterizing.R`
  - `R/utils_registry.R`
  - `_targets/meta/meta`
- [CONFIRMED] untracked files:
  - `NOW_1.ipynb`
  - `R/mfbvar_preflight_and_fit.R`
  - `R/transformation_core.R`
  - `R/utils_schema_augment.R`
  - `README.html`
  - `data/temp/`
  - `raw.csv`
- [INFERRED] the repo is still in active iteration rather than a frozen final state.

# STEP 7 — HONEST FAILURE AUDIT

## 1. What was the specific technical reason the nowcasts were unreliable?

- [CONFIRMED] The repo documents multiple interacting causes, not one single cause.
- [CONFIRMED] The most specific mechanical failure recorded is in `Estimation_GSP.qmd`:
  - `Highly collinear data pairs causing Cholesky decomposition failure, followed by matrix out of bound errors.`
  - `When I inspected the feature matrix after lag expansion, I found near-duplicate columns → multicollinearity.`
- [CONFIRMED] `GSP_report.qmd` adds broader reasons:
  - `identification and scaling`
  - `sensitivity to prior choices`
  - `sampler errors (divergences and poor mixing)`
  - `timing mismatches`
- [CONFIRMED] The notebook metrics show the resulting model remained under-calibrated or below target:
  - `80% PPC coverage = 0.744` vs target around `0.75–0.85`
  - `corr(center, obs) = 0.674` vs target `>= 0.70`
  - state coverage target met by `0.0` share of states
- [INFERRED] The nowcasts were unreliable because the model never reached a posterior state the project itself considered stable and calibrated.

## 2. What evidence exists in the files of the failure?

### Direct quotes / logged evidence

- [CONFIRMED] `GSP_report.qmd` line 21:
  - `Despite careful diagnostics, several problems remain, such as issues with identification and scaling, sensitivity to prior choices, sampler errors (divergences and poor mixing), and timing mismatches. These have so far prevented reliable results.`
- [CONFIRMED] `GSP_report.qmd` line 108:
  - `The models have not yet produced a stable or reliable posterior.`
- [CONFIRMED] `Estimation_GSP.qmd` line 243:
  - `Highly collinear data pairs causing Cholesky decomposition failure, followed by matrix out of bound errors.`
- [CONFIRMED] `Estimation_GSP.qmd` line 249:
  - `When I inspected the feature matrix after lag expansion, I found near-duplicate columns → multicollinearity.`
- [CONFIRMED] `NOW_1.ipynb`:
  - `[Check] 80% PPC coverage = 0.744  (target ~0.75–0.85)`
  - `[Check] corr(center, obs) = 0.674     (target ≥ 0.70)`
  - `[Check] spectral radius  median=0.969  p95=0.970  % near guard (≥0.97-1e-3)=61.3%`
  - `Share states with 80% coverage in [0.75,0.85]: 0.0`
- [CONFIRMED] `QGSP.ipynb` shows the same pattern:
  - `[Check] corr(center, obs) = 0.677     (target ≥ 0.70)`
  - `Share states with 80% coverage in [0.75,0.85]: 0.0`
- [CONFIRMED] `_targets_diag/meta/meta` logs additional diagnostic failures:
  - `missing value where TRUE/FALSE needed`
  - `subscript out of bounds`
  - `object 'agg_rule' not found`

### Missing evidence that would normally support a successful Bayesian fit

- `Rhat` table: `NOT FOUND`
- effective sample size report: `NOT FOUND`
- saved successful `mfbvar` object: `NOT FOUND`
- saved `mfbvar_debug.log`: `NOT FOUND`
- active PyMC `pm.sample()` output: `NOT FOUND`

## 3. What would need to be different for the Bayesian approach to work?

Only file-backed answers are included here.

- [CONFIRMED] `GSP_report.qmd` line 23 says the plan is to:
  - `build model complexity in stages (from fixed-volatility VAR to full stochastic volatility, then to mixed-frequency), use more structured priors, reduce dimensionality before scaling up, and add formal checks for coherence and backtesting once the model converges`
- [CONFIRMED] `GSP_report.qmd` line 475 suggests:
  - `introducing state-specific lag structures, adjusting shrinkage priors, or refining indicator weights`
- [CONFIRMED] `Estimation_GSP.qmd` notes near-duplicate lagged columns and multicollinearity, so the design matrix would need to be less collinear.
- [CONFIRMED] `mfbvar_preflight_and_fit.R` is explicitly designed to help by:
  - dropping dead/no-post-lag series
  - enforcing `W→M→Q` ordering
  - standardizing inputs
  - using safer prior construction
  - falling back across `fsv`, `csv`, and `iw`
- [INFERRED] The repository itself points toward a simpler/lower-dimensional/staged model before reintroducing full SV and mixed-frequency complexity.

## 4. Was the data pipeline affected by the modeling failure, or did it remain intact and functional?

- [CONFIRMED] The repo repeatedly identifies the data pipeline as a project success:
  - `The main achievement to date is a solid and transparent data pipeline...`
  - `a reproducible and well-documented data pipeline`
- [CONFIRMED] The core fetch-and-clean path in `_targets_DataSourcing.R` is separate from the notebook modeling code.
- [CONFIRMED] However, the repo is **not** fully intact end-to-end:
  - active code expects `schema_mfbvar.csv` at repo root, but the checked-in file is `data/schema_mfbvar.csv`
  - active pipeline writes `data/p21_mfbvar_raw.rds`, while downstream report/notebooks read `data/raw_mfbvar.csv`
  - diagnostic `targets` metadata records failed R-side diagnostic targets
- Conclusion:
  - [CONFIRMED] modeling failure did not invalidate the existence of a functioning data-ingestion/preparation pipeline concept
  - [CONFIRMED] the current repo still contains active hand-off and diagnostic breakpoints, so the pipeline is not perfectly clean from source ingestion through final model consumption

# STEP 8 — COMPLETE TECH STACK INVENTORY

| Technology | Category | Where Found | Status |
|---|---|---|---|
| `R` | Language | `R/*.R`, `*.qmd`, `.Rhistory` | [CONFIRMED] |
| `Python` | Language | `QGSP.ipynb`, `NOW_1.ipynb`, `__pycache__/helper.cpython-311.pyc` | [CONFIRMED] |
| `Jupyter Notebook` | Notebook environment | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `Quarto` | Reporting / publishing | `Data_sourcing_GSP.qmd`, `data_pipeline.qmd`, `Estimation_GSP.qmd`, `GSP_report.qmd`, `_extensions/quarto-monash/*` | [CONFIRMED] |
| `RStudio` | IDE project | `GSP.Rproj` | [CONFIRMED] |
| `git` | Version control | `.git` repository present; git history used in reconstruction | [CONFIRMED] |
| `targets` | R package / pipeline orchestration | `_targets_DataSourcing.R`, `_targets.yaml`, `data_pipeline.qmd`, `README.md` | [CONFIRMED] |
| `tarchetypes` | R package / pipeline helpers | `_targets_DataSourcing.R`, `Estimation_GSP.qmd` | [CONFIRMED] |
| `dplyr` | R package | multiple `R/*.R`, `*.qmd` | [CONFIRMED] |
| `tidyr` | R package | `R/quarterizing.R`, `R/transformation_core.R`, `R/utils_fetch_abs.R`, `R/utils_fetch_rba.R` | [CONFIRMED] |
| `tidyverse` | R package collection | `R/utils_build_agg_rules.R`, `R/utils_clean.R`, `data_pipeline.qmd`, `Estimation_GSP.qmd`, `GSP_report.qmd` | [CONFIRMED] |
| `lubridate` | R package | `_targets_DataSourcing.R`, `R/quarterizing.R`, `R/transformation_core.R`, `R/utils_clean.R`, `R/utils_fetch_abs.R`, `R/utils_fetch_rba.R`, `Estimation_GSP.qmd`, `GSP_report.qmd` | [CONFIRMED] |
| `stringr` | R package | `R/transformation_core.R`, `R/utils_build_agg_rules.R`, `R/utils_clean.R`, `R/utils_registry.R`, `R/utils_schema_augment.R` | [CONFIRMED] |
| `readr` | R package | `R/utils_registry.R`, `GSP_report.qmd` via `readr::read_csv()` | [CONFIRMED] |
| `readabs` | R package | `R/utils_fetch_abs.R`, `Data_sourcing_GSP.qmd`, `Estimation_GSP.qmd` | [CONFIRMED] |
| `readrba` | R package | `R/utils_fetch_rba.R` namespace call, `Data_sourcing_GSP.qmd`, `Estimation_GSP.qmd` | [CONFIRMED] |
| `janitor` | R package | `R/utils_clean.R` | [CONFIRMED] |
| `purrr` | R package | `R/utils_registry.R` | [CONFIRMED] |
| `digest` | R package | `R/utils_schema_augment.R` | [CONFIRMED] |
| `tseries` | R package | `R/transformation_core.R` | [CONFIRMED] |
| `urca` | R package | `R/transformation_core.R` | [CONFIRMED] |
| `ggplot2` | R package | `Data_sourcing_GSP.qmd` | [CONFIRMED] |
| `kableExtra` | R package | `GSP_report.qmd` | [CONFIRMED] |
| `knitr` | R package | `GSP_report.qmd` | [CONFIRMED] |
| `scales` | R package | `GSP_report.qmd` | [CONFIRMED] |
| `conflicted` | R package | `Estimation_GSP.qmd` | [CONFIRMED] |
| `mfbvar` | R package / Bayesian VAR | `R/mfbvar_preflight_and_fit.R` | [ATTEMPTED] |
| `NumPy` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `pandas` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `SciPy` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `matplotlib` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `ipywidgets` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `IPython.display` | Python package/module | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `Pytensor` | Python package | `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `PyMC` | Python probabilistic modeling | commented imports in notebooks; kernel name `mf-bvar-pymc-311`; `Estimation_GSP.qmd` note | [ATTEMPTED] |
| `Monash Quarto extension` | Theme / template system | `_extensions/quarto-monash/presentation/*`, `_extensions/quarto-monash/report/*` | [CONFIRMED] |
| `CSV` | Data format | `data/*.csv`, `raw.csv`, `model_fit_calibration.csv` | [CONFIRMED] |
| `RDS` | Data format | `data/p21_mfbvar_raw.rds`, `data/p21_raw.rds` | [CONFIRMED] |
| `XLSX` | Data format / source cache | `data/temp/*.xlsx` | [CONFIRMED] |
| `HTML` | Rendered output format | `README.html`, `Estimation_GSP.html` | [CONFIRMED] |
| `PDF` | Rendered output format | `GSP_report.pdf` | [CONFIRMED] |
| `BibTeX` | Citation format | `references.bib` | [CONFIRMED] |
| `ABS Data API / ABS workbooks` | External data source | `Data_sourcing_GSP.qmd`, `R/utils_fetch_abs.R`, `data/temp/*.xlsx` | [CONFIRMED] |
| `RBA statistical tables` | External data source | `Data_sourcing_GSP.qmd`, `R/utils_fetch_rba.R` | [CONFIRMED] |
| `Minnesota prior` | Bayesian method | `Estimation_GSP.qmd`, `GSP_report.qmd`, notebooks, `R/mfbvar_preflight_and_fit.R` | [CONFIRMED] |
| `Dirichlet-Laplace prior` | Bayesian method | `GSP_report.qmd`, `QGSP.ipynb`, `NOW_1.ipynb` | [CONFIRMED] |
| `stochastic volatility` | Bayesian method | `Estimation_GSP.qmd`, `GSP_report.qmd`, notebooks | [CONFIRMED] |
| `FFBS` | Bayesian state-space method | `GSP_report.qmd`, notebook helper names such as `ffbs_companion` and `sv_update_block` | [CONFIRMED] |
