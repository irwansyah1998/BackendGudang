# Backend Development

## Purpose
Implement focused backend changes consistent with the verified project architecture.

## Use when
Adding or changing an API, business rule, configuration, or server behavior.

## Prerequisites
Read `AGENTS.md`, relevant sections of `Documentation.md`, and nearby source and tests.

## Procedure
1. Identify the controlling code path, contract, and a focused falsification check.
2. Keep transport, business behavior, and infrastructure responsibilities distinct where the actual complexity warrants it.
3. Validate external input, return deliberate HTTP statuses, and avoid leaking internal errors or sensitive data.
4. Use parameterized database access and transactions if persistence is introduced; require confirmed data and authorization rules first.
5. Add focused tests, run them, review the diff, and update the project map and documentation.

## Acceptance
No unrequested domain behavior, secrets, unsafe query construction, or unsupported runtime assumptions are introduced. Report remaining risks and platform validation accurately.