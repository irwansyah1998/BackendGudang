# Provisional Location Coding Standard

**Status: PROVISIONAL — PERLU VERIFIKASI LAPANGAN**  
**No location codes are assigned yet.** Confirm the building's physical storage structure and operating vocabulary before printing labels or encoding locations in software.

## 1. Principles

- A code identifies one physical, addressable storage position, not an item or quantity.
- Keep codes short enough to read aloud and print; use one consistent case and zero-padded sequence where appropriate.
- Codes must be unique, permanent, and never silently reused for a different physical position.
- Do not encode product category, owner, capacity, or status in the code; those attributes change independently.
- Every code must map to a surveyed position on a reviewed map and a location register.
- Use a temporary survey ID before operational labels are approved.

## 2. Candidate Pattern (not yet approved)

If the site actually has warehouse, zone, rack/row, level, and position structure:

`WH01-Z01-R02-L03-P04`

If storage is floor-based, a candidate form may instead use:

`WH01-Z01-BAY05`

or, only where a measured grid is agreed:

`WH01-Z01-ROW02-COL04`

These are illustrative patterns only. `WH01`, zone names, rack numbers, row/column orientation, and all example sequences are not assigned site data. Omit components that do not exist physically. Never assign a level to floor storage or a rack code to an un-racked area.

## 3. Naming Rules to Approve

1. Confirm one site prefix and whether there is more than one warehouse/building.
2. Divide zones by observable boundaries or operating purpose only after a walk-through; keep exits and mandatory clearances outside storage zones.
3. Agree the orientation reference (e.g., viewed from the main entrance or a north arrow) so left/right and sequence do not reverse between workers.
4. Define rack/row, level, and position numbering from a posted orientation diagram.
5. Use fixed-width numeric components if numbering may exceed 9; decide maximum width from observed scale, not guesswork.
6. Avoid characters commonly confused in speech/print (`O/0`, `I/1`) if the chosen font/label makes them ambiguous.
7. Print human-readable code first. Add barcode/QR only after scanning devices, connectivity, label durability, and workflow have been tested.
8. Maintain retired codes as inactive history; do not delete transaction references.

## 4. Location Register Template

No real location rows have been populated.

| Location code | Zone | Description / map coordinate | Location type | Allowed goods / constraints | Verified capacity and basis | Status | Last physical verification | Verified by | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `BELUM DIBUAT` | `BELUM DISURVEI` | `BELUM DIUKUR` | `BELUM DIKONFIRMASI` | `BELUM DIKONFIRMASI` | `TIDAK DITETAPKAN` | `BELUM DISURVEI` | `-` | Create only after approved survey |

Permitted provisional status vocabulary: `BELUM DISURVEI`, `TERSEDIA` (only after a physical check), `TERISI`, `PENUH` (against validated capacity), `DIBLOKIR`, `PERLU PEMERIKSAAN`, `KARANTINA` (only if an authorized operational rule exists). A visual guess is not enough to assign `TERSEDIA` or `PENUH`.

Capacity stays `TIDAK DITETAPKAN` until the relevant dimension/weight, rack/floor load rating, stacking stability, access clearance, and handling method are reviewed. Record the evidence and the professional/authority responsible for approval.

## 5. Label Pilot Acceptance

Before bulk printing, test labels in one approved pilot zone:

- Worker can read and repeat the code from normal approach and safe handling positions.
- Every label matches exactly one mapped physical location.
- Similar adjacent labels are distinguishable and sequence direction is unambiguous.
- Material, adhesive, print, placement, and barcode (if used) survive site conditions and handling.
- Label does not cover rack rating plates, safety signs, inspection tags, or emergency markings.
- An independent checker verifies all pilot labels against the location register.

Stop label rollout if any position cannot be mapped confidently or if placement would create a safety/access issue.
