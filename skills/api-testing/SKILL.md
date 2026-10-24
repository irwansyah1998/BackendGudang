# API Testing

## Purpose
Exercise the backend through real browser requests and explicit assertions.

## Use when
Adding request-builder behavior, endpoint discovery, request history, or test suites.

## Procedure
1. Verify methods, paths, status codes, headers, and payloads in backend source/tests or an OpenAPI document.
2. Use the centralized `src/apiClient.ts` client; keep the request on the current origin.
3. Validate URL, headers, and JSON before sending; cap request time and response reads, and support cancellation/abort behavior.
4. Show the actual status, readable headers/body, measured duration, and safe diagnostic hints.
5. Add assertions against actual response values. Mark unavailable suites as planned rather than completed.
6. Redact or omit secrets and request bodies from history and exports.

## Acceptance
Network, HTTP failure, timeout, invalid input, and successful response states are distinguishable without claiming an unproven cause.