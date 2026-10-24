# Frontend Development

## Purpose
Build and maintain the BackendGudang React API playground.

## Use when
Changing the React UI, navigation, request builder, response viewer, or Vite build.

## Prerequisites
Read `AGENTS.md`, `Documentation.md`, `docs/architecture/PROJECT_MAP.md`, and the API testing and frontend security skills.

## Procedure
1. Confirm the API behavior in `src/httpApp.js` and its tests; do not infer undocumented routes.
2. Keep presentation in React, HTTP behavior in `src/apiClient.ts`, and styles in `src/styles.css`.
3. Use the established local typography, color tokens, responsive layouts, keyboard states, and reduced-motion rule.
4. Keep all requests on `window.location.origin`; use cancellation/timeouts and clear error states.
5. Run UI tests, backend tests, and `npm run build`; inspect desktop and mobile browser states where available.
6. Update `Documentation.md` and `docs/architecture/PROJECT_MAP.md` for behavior or structure changes.

## Acceptance
Visible values derive from real results or are explicitly described as empty/session data. Interactive controls work, errors remain understandable, and no unrequested API behavior is invented.