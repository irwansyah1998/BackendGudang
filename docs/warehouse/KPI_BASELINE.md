# Warehouse KPI Baseline and Measurement Plan

**Status: BASELINE NOT MEASURED — DEFINE SAMPLE AND OWNERS BEFORE SETTING TARGETS**

No warehouse observations or stock data were supplied. The current API playground has no inventory, transaction or location metrics. Every baseline below is `NOT MEASURED`; no numeric target is asserted.

| KPI | Operational definition | Baseline | Collection method | Sample / cadence to agree | Owner | Guardrail |
| --- | --- | --- | --- | --- | --- | --- |
| Item search time | Elapsed time from a defined search request to worker physically locating and verifying item identity | NOT MEASURED | Time a representative, consented search; record start/stop rules, item and location, failed attempts | Stratify by item/activity/shift after scope review | Warehouse lead | Do not cherry-pick only easy items; disclose sample and search support |
| Valid labeled-location rate | Physical storage positions with legible unique label matching approved register / all in-scope positions checked | NOT MEASURED | Independent walk and label-to-register reconciliation | Count full pilot area before/after | Location owner | Exclude blocked/unknown positions explicitly; never mark unverified label as valid |
| Location accuracy | Sampled item/location records matching observed physical item and position / sampled records | NOT MEASURED | Blind/independent physical sample and timestamped record comparison | Risk-based sample method approved by inventory owner | Inventory control | Record mismatches, unknowns and uncounted goods; no silent correction |
| Stock record accuracy | Sampled item/unit balances matching count under approved cut-off / sampled balances | NOT MEASURED | Physical count compared to a frozen/timestamped book value; recount variance | Define unit, count method, treatment of active moves | Inventory control | Preserve book and physical quantity separately; report sample coverage |
| Unknown-location items | Count of verified item identities whose physical position cannot be confirmed | NOT MEASURED | Reconcile item list and full/sampled floor walk | Define inclusion and cut-off | Inventory control | Do not infer zero from absent records |
| Unrecorded moves | Observed physical transfers without a matching authorized movement record in the comparison window | NOT MEASURED | Observe moves and reconcile records; protect worker privacy | Define time window and sampling | Supervisor | Distinguish delayed posting, offline paper record, and truly unrecorded move |
| Stock adjustments by reason | Count/value of approved changes categorized by controlled reason | NOT MEASURED | Audit log/adjustment forms with before/after, actor, approver, evidence | Review at agreed cadence | Inventory controller | Corrections are not erased; reason categories need owner approval |
| Receiving cycle time | Elapsed time from agreed receipt event to accepted/recorded/putaway-ready state | NOT MEASURED | Time-stamped sample with pause/exception definitions | Stratify by delivery/item/shift | Receiving lead | Separate queue time, inspection, exception and active work |
| Issue/dispatch cycle time | Elapsed time from authorized request to verified handoff | NOT MEASURED | Time-stamped sample and exception classification | Stratify by request/item/shift | Dispatch lead | Compare like-for-like demand; do not encourage unsafe shortcuts |
| Blocked-access observations | Count of observed obstructions to approved route/access at defined inspections | NOT MEASURED | Safety walk checklist with location/time/evidence | Safety owner sets cadence | Safety/K3 lead | A serious hazard triggers immediate controls, not wait for KPI review |
| Audit completeness | Transactions with required actor, time, reason/reference, before/after or movement fields / transactions sampled | NOT MEASURED | Review sample against approved transaction schema | Define applicable transaction types | Control owner | Missing evidence remains a gap; do not backfill guesses |

## Target Setting

1. Agree exact definitions, sample frame, exclusions and source systems with process/data owners.
2. Measure an as-is baseline over representative shifts and demand conditions.
3. Validate repeatability and data quality; retain raw observations and methodology.
4. Set a pilot target only after baseline and operational constraints are known; record rationale, owner and deadline.
5. Evaluate target and safety/integrity guardrails together. A faster process is not an improvement if accuracy or safety worsens.
