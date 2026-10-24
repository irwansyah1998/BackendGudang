# UI and Accessibility

## Purpose
Keep the API playground usable across keyboard, screen sizes, and motion preferences.

## Use when
Changing navigation, forms, request/response controls, layout, colors, or interaction states.

## Procedure
1. Use semantic buttons, labeled inputs, status announcements, visible focus, and predictable tab order.
2. Test axe DOM rules in Vitest; note that jsdom cannot validate visual contrast or layout.
3. Inspect narrow and wide browser layouts when browser tooling is available.
4. Respect `prefers-reduced-motion`; ensure status is not communicated by color alone.
5. Check overflow for long URLs, JSON, and header values.

## Acceptance
Critical actions work by keyboard, labels are meaningful, content does not overlap, and residual visual checks are reported honestly.