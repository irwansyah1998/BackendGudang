# Warehouse Assessment

**Status: PROVISIONAL — PERLU VERIFIKASI LAPANGAN**  
**As of:** 2026-10-24  
**Scope:** Desktop/workspace evidence only. No physical warehouse source material was present in the shared workspace during this assessment.

## 1. Executive Summary

No warehouse layout, inventory export, operating procedure, receiving/shipping record, equipment list, or site photo was found in the repository. The current application is a technical baseline and API playground, not a warehouse management system. It exposes only `GET /health`; it has no database, inventory entities, authentication, authorization, audit log, or stock transactions.

A defensible physical layout, location capacity, SKU placement, staffing plan, cost estimate, and final SOP cannot yet be determined. This document therefore records verified project facts, explicitly unknown site facts, and the smallest survey needed to make safe decisions. It does not claim that any physical work has happened.

## 2. Evidence Register

| Evidence | Finding | Classification | Source / verification |
| --- | --- | --- | --- |
| Shared workspace contents | Technical project files only; no floorplan, photo, spreadsheet, document, or inventory extract found | Verified absence within the inspected workspace, not proof that the business has no such records | Workspace file inventory, 2026-10-24 |
| Backend route | `GET /health` returns process liveness; all other GET paths return 404; non-GET methods return 405 | Verified | `src/httpApp.js`, `test/app.test.js` |
| Persistence and domain | No database, migrations, inventory, locations, warehouse operations, user roles, or authorization implementation | Verified | `Documentation.md`, project map and source inventory |
| API playground | Same-origin API testing UI; it is not inventory software | Verified | `src/App.tsx`, `src/apiClient.ts` |
| Building, equipment, inventory, process and hazards | No facts supplied or observed | Unknown; survey required | No field evidence available |

## 3. As-Is Assessment

### Physical condition

Room length, width, height, geometry, door positions, emergency exits, racks, floor bays, stack areas, aisle widths, lighting, ventilation, floor condition, moisture, load ratings, and physical obstructions are **not surveyed**. No layout or capacity estimate is supportable.

### Operating condition

Receiving, identification, inspection, putaway, transfers, picking, dispatch, returns, cycle counts, shift handover, equipment use, staffing, authorization, and exception handling are **not documented or observed**. Do not interpret the lack of documentation in this repository as proof that a process does not exist at the site.

### Problems and verification

| Potential issue to investigate | Current evidence | Impact if confirmed | Priority | Verification method |
| --- | --- | --- | --- | --- |
| Unlabeled/ambiguous locations | No location register supplied; physical state unknown | Search time, wrong putaway, misplaced stock | High to verify | Walk every storage position; compare physical labels with worker terminology and any records |
| Stock/location mismatches | No stock ledger or count supplied | Fulfillment errors and unreliable balances | High to verify | Select a controlled sample; count physical quantity and compare source records with timestamp |
| Unknown/damaged stock mixed with available stock | No photos or exception records | Quality, safety, and usability risks | High to verify | Inspect with site owner; mark findings without moving goods until disposition authority is known |
| Blocked aisles/exits or unstable stacks | No site inspection | Immediate injury or emergency-access risk | Immediate if observed | Site safety walk by authorized site/K3 lead; stop and escalate if imminent danger is seen |
| Excess travel/congestion | No movement data or observed flow | Lost time and collision risk | Medium to verify | Observe representative receiving, putaway, picking and dispatch cycles; record route/time without changing work |
| Unrecorded transfers/adjustments | No transaction logs supplied | Loss of traceability and inventory integrity | High to verify | Compare selected physical moves against records and interview operators/supervisors |

None of these potential problems is asserted to be occurring; they are survey questions.

## 4. Minimum Efficient Field Survey

Conduct with the warehouse manager and an authorized safety representative. Do not climb racks, move loads, test rack capacity, or obstruct operations during survey.

### Before the visit

Request only non-secret, relevant material:

- Any current floorplan with scale/dimensions, or permission to make a sketch.
- Existing item/SKU list and unit-of-measure definitions.
- Recent receiving, issue/dispatch, transfer, adjustment, count, and damage records for an agreed period.
- Rack drawings/nameplates, supplier load ratings, floor load information, equipment list and inspection status.
- Existing safety rules, emergency plan, restricted zones, hazardous-material compatibility rules, and shift pattern.
- Named decision-makers for location assignment, stock correction, quarantine release, safety sign-off, and pilot approval.

Redact personal information and commercial secrets not needed for the assessment. Record the source, owner, extraction time, and known limitations for every dataset.

### On-site sequence

1. **Safety-first walk:** identify entrances, exits, fire equipment, electrical panels, pedestrian/forklift interaction, unstable loads, leaks, damaged structures, blocked routes, and restricted areas. Photograph only with permission. Escalate imminent risks immediately; do not wait for the report.
2. **Measure boundary and access:** measure wall-to-wall internal dimensions, clear height/obstructions, door clear widths/heights, columns, ramps, and fixed obstacles. Record units, instrument, date, and uncertainty. Mark emergency exits and never propose storage within their required clearance.
3. **Map storage assets:** give temporary survey IDs to each observed rack/row/floor bay/stack area. Record type, usable dimensions, condition, manufacturer/load label if present, and inaccessible/blocked faces. Do not infer safe load or stacking height from appearance.
4. **Observe flows:** follow at least one representative inbound and outbound sequence if operations permit. Record start/end points, steps, queue points, equipment, approximate time, and crossings. Do not interrupt live work.
5. **Build item sample:** for each selected item, record printed identifier, description as supplied, unit, package dimensions/weight where safely available, on-hand record and source timestamp, physical count method, observed location, movement evidence, condition, compatibility/handling constraints, and confidence.
6. **Reconcile:** sample locations and SKUs using dual review. Keep book quantity and counted quantity separate. Any difference becomes an exception with evidence; only the authorized owner decides corrections.
7. **Review with operators:** test whether workers can locate the sampled goods using current records, collect local names/abbreviations, and validate proposed labels before printing.
8. **Sign off survey:** warehouse owner confirms operational observations, safety representative confirms safety observations, and the data owner confirms data extracts. Unconfirmed entries remain `PERLU VERIFIKASI`.

### Measurement sheet fields

`Survey ID | Date/time | Observer | Source/method | Length | Width | Clear height | Door/exit | Fixed obstruction | Storage asset ID | Dimensions | Condition | Load rating evidence | Aisle clearance | Photo reference | Safety concern | Confidence | Reviewer | Open question`

Use one row per measured object. Retain original sketches and annotate units, north/orientation, scale status, measurement points, and revision. Label any hand sketch `NOT TO SCALE` unless measurements substantiate scale.

## 5. Data Quality and Confidence Rules

- **VERIFIED:** directly measured/observed or taken from a controlled source; record who, when, method, and source revision.
- **USER-PROVIDED:** supplied by an owner but not independently checked; retain attribution and date.
- **ESTIMATE:** approximate observation with method and uncertainty; never use for capacity or safety limits.
- **UNKNOWN / PERLU VERIFIKASI:** do not convert to a numeric default or operational instruction.
- **CONFLICT:** keep both values and sources until the responsible owner resolves them; do not silently overwrite.

Physical count and system/book balance are separate values. Preserve count timestamp, counter, unit, method, recount status, and approval. Never treat an API liveness check as proof of warehouse data readiness.

## 6. Data Gaps and Decisions Needed

| Information needed | Why it matters | Owner to identify |
| --- | --- | --- |
| Site dimensions and access/emergency geometry | Safe layout and travel-path design | Facilities / warehouse lead |
| Rack/floor ratings and condition | Safe capacity; must not be inferred | Facilities / qualified rack or structural specialist |
| Product dimensions, weights, handling and compatibility constraints | Slot suitability and safe handling | Inventory/product owner / safety lead |
| SKU balances and movement history with source timestamps | Opening stock, item velocity, pilot sample | Inventory control/data owner |
| Receiving, dispatch, returns, transfer and adjustment process | SOP and transaction/state design | Warehouse supervisor |
| Workforce, shifts, equipment, training and connectivity | Ergonomic and digital workflow | Operations / IT |
| Current authority for corrections and quarantine release | Prevent unauthorized stock changes | Management / control owner |
| Budget, procurement rules, downtime tolerance, pilot constraints | Realistic schedule and spend plan | Sponsor / procurement |
| Applicable local safety/fire/building requirements | Required clearances and compliance | K3/safety lead and relevant qualified professionals |
| Current source-of-truth records during migration | Prevent dual conflicting stock ledgers | Management / inventory control |

## 7. Preliminary Risks and Controls

| Risk | Current status | Preliminary control |
| --- | --- | --- |
| Obstructed emergency egress or immediate physical hazard | Unknown until walk-through | Safety walk first; secure/escalate immediate danger through site authority; never trade access for capacity |
| Unsafe rack/floor/stack load assumptions | No ratings supplied | No capacity/height recommendation until documented rating and qualified review |
| Miscount or unit-of-measure mismatch | Unknown | Define units, recount exceptions, independently review high-impact items, preserve before/after evidence |
| Unauthorized stock corrections | Current application has no auth/audit controls | Keep corrections manual under existing approved control until a reviewed server-side authorization/audit design exists |
| Duplicate/conflicting records during pilot | Source of truth not identified | Name one authoritative record for each pilot period; freeze or reconcile changes under an agreed procedure |
| Worker adoption failure | Workforce/process not surveyed | Co-design labels and SOP with operators; pilot one controlled area; train and collect feedback |
| Personal/commercial data exposure | Datasets not supplied | Minimize, redact, restrict access, and avoid secrets in the project repository |

## 8. Current Conclusion

This is a **data and survey readiness assessment**, not an as-is physical audit or a final warehouse plan. The first safe deliverable after field work should be a measured, versioned, owner-reviewed map and location register with unresolved safety/capacity entries visibly blocked. No goods should be relocated based only on this document.
