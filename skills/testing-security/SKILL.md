# Testing and Security

## Purpose
Select and run proportionate correctness and security checks for backend changes.

## Use when
Changing request handling, validation, identity, authorization, persistence, dependencies, or CI.

## Procedure
1. Derive acceptance cases from the changed contract, including invalid input and denied access where applicable.
2. Prefer the narrowest executable test first; add integration tests when module boundaries or persistence are involved.
3. Check errors, logs, headers, resource bounds, secret handling, and authorization against the actual threat surface.
4. Run dependency audit when dependencies or lockfiles change; do not suppress findings to obtain a passing result.
5. Record exact commands and whether each platform was actually tested.

## Stop and ask
Pause before destructive data changes, production operations, secret rotation, or choosing unresolved authentication and authorization rules.

## Acceptance
Tests exercise changed behavior, failures are reported honestly, and no security claim exceeds the evidence gathered.