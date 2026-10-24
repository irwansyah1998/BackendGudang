# Warehouse Implementation and Pilot Plan

**Status: PROVISIONAL — SCOPE, OWNERS, COSTS AND DATES REQUIRE SITE/MANAGEMENT APPROVAL**  
No field installation or operational transition is claimed to have occurred.

## 1. Guiding Decisions

- Start with observation, location identification and records reconciliation; do not begin by moving stock or buying storage equipment.
- Keep safety and stock traceability as stop conditions, not optimization trade-offs.
- Pilot one bounded, selected area only after survey, owner sign-off, baseline and rollback are ready.
- Name the source of truth during each phase. Do not allow two independently editable stock ledgers.
- Keep the current application as an API playground until warehouse requirements, authority rules, data definitions, and backend design are approved. Do not enter live inventory into the current app.

## 2. Staged Implementation

| Phase | Work | Owner to assign | Cost / duration | Dependency | Exit / acceptance evidence |
| --- | --- | --- | --- | --- | --- |
| 0. Authorize survey | Name sponsor, warehouse lead, safety lead, inventory/data owner; approve site access, evidence handling, and survey scope | Management | Unknown; obtain internal effort estimate | Site permission | Named owners, survey scope, safety briefing, evidence controls |
| 1. Survey and baseline | Complete `FIELD_SURVEY_TEMPLATE.md`; measure/map; observe flows; extract controlled records; sample counts/searches | Warehouse lead + facilities + safety + inventory control | Unknown; estimate after scope and shift access confirmed | Phase 0 | Signed evidence register; measured map or explicit gaps; baseline method and sample record |
| 2. Resolve critical constraints | Confirm emergency access, rack/floor rating, incompatible materials, restricted zones, stock source, correction approvals | Safety/facilities/management | Potential specialist cost unknown; request qualified review/quotes | Phase 1 | Written constraints and approved/prohibited areas; unresolved high-risk items block layout |
| 3. Minimum organization | Approve code convention; create register; test durable labels in one area; define exception/holding control if physically feasible | Warehouse lead + operators + safety | Label/measurement supply cost unknown; collect vendor quotes after quantity/material test | Phases 1-2 | Independently verified pilot labels, map cross-reference, no safety signage obscured |
| 4. Item/location baseline | Identify SKUs/units; conduct controlled physical count; record actual location; dual-review variances; approve corrections separately | Inventory control + counters + approver | Labor/time unknown; estimate from pilot sample | Source of truth and count/cut-off approval | Signed count; book and physical values preserved separately; open exceptions owned |
| 5. Manual pilot | Run agreed receiving, putaway, movement, issue and exception forms in one zone; train operators; reconcile each shift | Supervisor + operators | Training/material/time unknown; measure in pilot | Approved SOP, safety and source-of-truth rules | Transaction traceability, reconciliation and stop criteria met for agreed observation window |
| 6. Evaluate | Recount/search sample, analyze KPI changes, exceptions, safety observations, worker usability, and cost | Sponsor + operators + data owner | Internal review; confirm scope | Phase 5 evidence | Written go/no-go decision with residual risk and corrective actions |
| 7. Digital discovery/design | Confirm actors, permissions, schema, source systems, offline/connectivity, concurrency, audit/retention, migration and API contracts | Product owner + architect + inventory control + security | Software estimate only after requirements | Phase 6 go decision and signed requirements | Reviewed design, threat model, migration/rollback and acceptance tests |
| 8. Digital pilot | Implement/test approved scope; import controlled pilot data; parallel verification only under one authoritative-writer policy | Engineering + operations | Quote/estimate after architecture approval | Phase 7 approvals | Reconciled test/pilot data, audit evidence, training, rollback rehearsal |
| 9. Expand/operate | Expand area-by-area after decision gates; monitor KPI; maintain correction and incident controls | Sponsor + operations | Reforecast from pilot | Successful pilot and authorization | Per-zone acceptance, ongoing ownership, support and review cadence |

Durations and prices remain unspecified because labor, facility, procurement, geography, vendor, scope and operational windows are unknown. Obtain local quotes only after a measured bill of materials and approved specification exist.

## 3. Low-Cost First Actions

Can be done without physical alteration or system assumptions:

- Appoint survey owners and request existing drawings/records.
- Walk the site with safety lead and record observations without moving stock.
- Measure using a suitable instrument and independent check.
- Interview operators using current terminology; record steps and pain points as reports, not verified facts until observed.
- Create temporary survey IDs and a controlled spreadsheet/register with evidence/confidence columns.
- Test one sample label on a non-critical, approved position after location mapping.

Require approval before label rollout, designation of exception areas, operational movement, counts that affect availability, changes to official balances, equipment purchase, construction/rack changes, software procurement, or production rollout.

## 4. Pilot Stop / Rollback Conditions

Stop the affected task and notify its owner if: emergency route/access is obstructed; rack/floor/stack safety is uncertain; item identity, quantity, unit, source or destination cannot be verified; the authoritative record is unclear; an unauthorized correction is proposed; offline records cannot be reconciled without duplicates; a transaction cannot be tied to actor/time/reference; or workers cannot follow the approved safe procedure. Rollback means stopping new pilot transactions and reconciling outstanding work using the preapproved source-of-truth procedure; it does not mean deleting transactions or moving all goods back without a site-specific plan.

## 5. Cost Collection Worksheet

| Cost category | Required quantity/specification | Supplier/internal source | Quote/estimate | One-time/recurring | Exclusions/assumptions | Approver |
| --- | --- | --- | --- | --- | --- | --- |
| Measuring tools / survey labor | Set after survey scope |  | NOT QUOTED |  |  |  |
| Labels/printer/scanner if justified | Set after label pilot and durability test |  | NOT QUOTED |  |  |  |
| Rack/floor inspection or engineering | Determined by qualified reviewer |  | NOT QUOTED |  |  |  |
| Safety markings / physical changes | Only after approved drawing and local requirements |  | NOT QUOTED |  |  |  |
| Training and downtime | Based on shifts and pilot period |  | NOT ESTIMATED |  |  |  |
| Software development/hosting/support | After approved requirements and threat model |  | NOT ESTIMATED |  |  |  |

## 6. Migration and Source-of-Truth Plan

1. Inventory every record source and assign owner, revision, timestamp, units, edit rights and known limitations.
2. Select the authoritative inventory source for the survey and separately define the pilot source of truth in writing.
3. Preserve read-only copies/export and a restore method before transformation; do not overwrite originals.
4. Normalize item identity and units only with owner approval; retain source values and transformation/audit trail.
5. Assign mapped locations only after physical verification; unresolved rows remain `PERLU VERIFIKASI` and are excluded from availability claims.
6. Count stock under an approved cut-off/movement-control procedure; record physical count separately from book quantity.
7. Reconcile duplicates, unknown items, unit mismatches, and variances with owners; no silent merges or adjustments.
8. Pilot a limited area; reconcile each transaction and shift; keep one writer for inventory quantity.
9. Decide go/no-go based on measured evidence, safety, usability and rollback readiness.
10. Expand only with management approval, training, backup/recovery, access control, audit and monitoring.

No legacy data file is currently available in the workspace, so no import mapping or migration is implemented.
