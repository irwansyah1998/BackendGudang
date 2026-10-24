# Provisional Warehouse Pilot SOP

**Status: DRAFT FOR SITE REVIEW — NOT AUTHORIZED FOR OPERATIONAL USE**  
**Scope:** A control framework for a future small pilot, not a claim about current site procedures. Local work instructions, safety rules, role names, units, approval limits, forms, and emergency contacts must be supplied and approved before use.

## 1. Roles to Assign Before Pilot

Do not infer or grant authority from a job title. The site owner must name:

- `Receiving operator`: records arrival and observed package/item data.
- `Inventory checker`: independently verifies item identity/count where required.
- `Putaway / movement operator`: performs approved physical placement/movement and records both locations.
- `Inventory controller`: reconciles records and investigates exceptions.
- `Adjustment approver`: approves changes to official quantity/location records under written limits.
- `Quarantine/exception release approver`: decides disposition or release.
- `Shift supervisor`: reviews open work and handover.
- `Safety/K3 representative`: approves applicable routes, handling, storage constraints, and hazard response.

These are placeholders. One person may hold multiple duties only if local control policy permits and required independent review remains effective.

## 2. Common Transaction Rules

- Identify the item using an approved source; do not invent a SKU from appearance.
- Use approved unit of measure and preserve package/lot/serial identifiers when applicable.
- Record a unique transaction/reference ID, event time, actor, action, item, quantity and unit, source/destination location, reason, and evidence reference as relevant.
- Physical actual and system/book value are distinct. Never overwrite the original count or history.
- An incomplete or conflicting record remains `PENDING / PERLU VERIFIKASI`; do not silently mark stock available.
- If identity, quantity, safe handling, or location is uncertain, stop the affected transaction and escalate to the assigned owner.
- A correction records before value, after value, reason, evidence, actor, time, approver, and linked transaction. No delete-and-recreate workaround.
- Follow site safety and equipment procedures. Stop and escalate imminent hazards; this document does not define technical load limits or emergency clearances.

## 3. Receiving and Inspection

**Objective:** Register arrival evidence and keep unverified stock distinguishable from released stock.  
**Responsible:** Receiving operator; checker and exception owner as assigned.

1. Confirm that the receiving activity and delivery reference are expected under the site's approved process.
2. Record arrival timestamp, reference, sender/source as permitted, package/item labels as read, quantities and units as stated, and condition observations.
3. Independently verify identity/count according to the site's risk-based check rule; retain original observed values and any recount.
4. Record discrepancy, damage, unknown identity, or incompatible/unsafe condition as an exception; do not represent it as available stock.
5. Route only to a surveyed, approved temporary position if one exists and handling is safe. Otherwise hold the transaction and contact the supervisor for direction.
6. Close with operator/checker evidence and a receiving reference. Corrections require the designated approver.

**Evidence:** Receiving record, reference, count/inspection result, exception link, actor/time, and temporary position if verified.  
**Open before use:** Accepted-document rule, sampling/count rule, permitted temporary positions, package/lot capture, and exception owner.

## 4. Storage / Putaway

**Objective:** Place accepted goods only in a verified, suitable, addressable position.  
**Responsible:** Assigned putaway operator; supervisor/location owner as designated.

1. Confirm item identity, release status, quantity/unit, handling constraints, and approved location code.
2. Confirm the location is physically labeled and its status/capacity/compatibility is verified for this item. Capacity cannot be inferred from empty floor area or appearance.
3. Check the move against site safety instructions and equipment access. Do not exceed approved limits.
4. Move goods and record the confirmed source (if any), destination, quantity/unit, event time, operator, and transaction reference.
5. A checker or system control verifies the location/item/quantity match according to the approved pilot policy.
6. If the actual destination differs or a label cannot be read, stop completion and record the exception; do not leave the system claiming the planned location.

**Evidence:** Putaway reference linked to receiving record and destination label.  
**Open before use:** Location release owner, item/location compatibility rules, capacity source, and verification method.

## 5. Inter-location Movement

**Objective:** Preserve traceability during any physical transfer.  
**Responsible:** Authorized movement operator; approval/checker according to local policy.

1. Create a movement reference before moving, or use an approved offline numbered form if the system is unavailable.
2. Verify item, unit, quantity, source, destination, status, and reason.
3. Verify destination is active and appropriate; do not move into a blocked/unverified position.
4. Move safely; record actual completion time and any split/partial movement.
5. Confirm the resulting source and destination balances using the approved control. Link partial moves to the original reference.
6. Reconcile offline forms at handover; preserve the paper reference and avoid duplicate posting.

**Exception:** If destination differs, quantity is short, goods are damaged, or source identity is uncertain, stop and open an exception. Never update only one side of a two-location move.

## 6. Picking and Issue / Dispatch

**Objective:** Issue the right item and quantity from a verified location to an authorized reference.  
**Responsible:** Picker/issuer and checker/recipient as defined by site policy.

1. Verify the approved request/reference and authorization before picking.
2. Locate using the approved code; confirm item identity, location, unit, status, and picked quantity.
3. Record shortages, substitutions, damage, or location mismatch as exceptions; do not silently substitute.
4. Stage only in a verified allowed position and keep access/emergency routes clear.
5. Confirm handoff/dispatch evidence, event time, receiver/reference, and remaining book/recorded quantity.
6. Close or leave visibly pending any incomplete line; reconcile according to the source-of-truth rule.

**Evidence:** Issue/dispatch transaction, request reference, picker/checker/handoff, quantity/unit, source location, and exception links.

## 7. Cycle Count and Discrepancy

**Objective:** Compare physical observations with the authoritative record without erasing either value.  
**Responsible:** Counter independent of the record where feasible; inventory controller; adjustment approver.

1. Select scope and cut-off with the inventory owner; prevent or track movements during the count window.
2. Record physical count, unit, location, time, counter, method, and item/lot identifiers before viewing or editing book values where policy requires blind count.
3. Compare to a timestamped book value; retain both values and calculate variance using a validated unit conversion.
4. Recount or independently verify variances according to the site's agreed materiality/risk rule.
5. Investigate likely causes and attach evidence. Do not change the authoritative balance until the assigned approver approves a correction.
6. Record adjustment as an immutable linked event with before, after, reason, actor, time, approver, and evidence; report the adjustment separately from the physical count.
7. Close with unresolved variances listed as open, owner-assigned exceptions.

**Open before use:** Blind-count policy, recount thresholds, materiality limits, cut-off/movement control, and approver authority.

## 8. Unknown, Damaged, or Suspected Incompatible Goods

**Objective:** Prevent accidental use or unsafe handling while ownership/disposition is decided.  
**Responsible:** Anyone observing reports immediately; supervisor and assigned safety/quality owner decide action.

1. Stop handling if safety or identity is unclear; isolate people from an imminent hazard using site emergency controls and escalate.
2. Record observation, time, location, label as seen, condition, photo/evidence permission, and observer. Do not speculate on material or hazard class.
3. Do not relocate, dispose of, relabel, release, or combine with other stock unless an authorized owner gives a documented safe instruction.
4. If an approved exception location exists, move only under approved handling instructions and record origin/destination and custody; otherwise await direction.
5. Release/disposition requires named authority, decision, basis, time, and linked record.

## 9. Shift Handover and Close

Outgoing and incoming supervisors jointly review open receiving, putaway, transfers, picks, counts, exceptions, equipment/access issues, offline forms, and safety observations. Record handover time, both names, status, references, next owner, and overdue items. Reconcile offline forms against posted transactions with duplicate prevention. Do not close an unresolved quantity/location difference as if corrected.

## 10. Pilot Approval Gate

This SOP is not ready for floor use until management and relevant site owners approve the local process, role/authority matrix, safe surveyed locations and handling constraints, authoritative source of stock records, forms/transaction IDs, exception path, offline procedure, worker training, pilot boundary, rollback/reconciliation procedure, and success/stop criteria.
