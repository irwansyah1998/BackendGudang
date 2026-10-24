# Frontend Security

## Purpose
Reduce credential exposure and unintended network access in the browser playground.

## Use when
Changing request targets, authentication inputs, persistence, response rendering, or browser security headers.

## Procedure
1. Keep destinations same-origin in both URL resolution and backend path handling; never add a generic server-side fetch proxy.
2. Keep bearer values in component memory only, never in storage, URL, logs, history, or export.
3. Render response bodies as text; do not inject HTML or execute response content.
4. Keep CSP `connect-src` restricted to self and avoid remote assets that violate it.
5. Treat frontend allowlists as defense in depth, not as backend authorization or SSRF controls.
6. Ask before adding auth methods, staging/production targets, or persisted secrets.

## Acceptance
No arbitrary host forwarding, persisted credential, response HTML execution, or unsupported auth claim is introduced.