# Agent Instructions

- Read `Documentation.md` and `docs/architecture/PROJECT_MAP.md` before making project changes.
- For frontend work, read the relevant skills under `skills/frontend-development/`, `skills/api-testing/`, `skills/ui-ux-accessibility/`, and `skills/frontend-security/`.
- Check Git status before editing and preserve existing user changes.
- Treat inspected implementation as authoritative; update documentation when behavior, configuration, dependencies, endpoints, or architecture changes.
- Keep the project dependency-free unless a confirmed requirement justifies a maintained package.
- Do not invent warehouse workflows, data models, authentication, or authorization policies. Ask for requirements where those decisions affect security or data integrity.
- Never read or expose real secrets. Keep secret values out of source, tests, and logs.
- Add or update focused tests and run `npm test` for code changes. Report commands and actual outcomes; do not claim unrun CI or cross-platform verification.
- Node.js 26 is the requested runtime and is currently Current, not LTS. Do not change the runtime target without user approval; disclose production support risk.
- Update `Documentation.md` and `docs/architecture/PROJECT_MAP.md` whenever the verified system changes.
- Keep browser requests same-origin unless an explicit, reviewed environment policy is implemented. Never persist credentials or invent API contracts.