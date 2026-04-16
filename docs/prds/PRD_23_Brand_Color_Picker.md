# PRD 23: Brand Color Picker + Reset (Dev Tool, Footer)

> **Order:** 23
> **Status:** Proposed
> **Type:** Internal Dev Tool
> **Dependencies:** None
> **Blocks:** None
> **Sprint:** TBD (post-Marilyn-review)
> **Created:** 2026-04-16
> **Source:** D25 in `docs/deferred-items.md` (Vasso ask from Apr 14 session, captured during Apr 16 chat-ask backlog audit)

---

## Why This Matters

During design iteration with Marilyn, Vasso wants to experiment with brand-color shifts live on the site without committing a code change each time. An inline color picker + reset button in the footer lets him demo alternatives in real time during a review call ("what if we swap gold for a deeper amber?"), then reset to canonical brand colors before committing anything.

Must be modular, removable before WordPress migration (Elementor has its own Variables Manager; this widget would conflict or double-manage).

---

## Scope

### Controls (footer, low-visual-weight placement)

- One color picker per primary token: `--color-primary` (navy), `--color-secondary` (gold), `--color-text`
- Reset button — restores canonical values from `tokens-cargonomics.css`
- Optional: "Copy CSS" button that outputs the current tokens as CSS for pasting into `tokens-cargonomics.css` when a decision sticks

### Behaviour

- Values written to CSS custom properties on `:root` via inline style
- Changes persist via `localStorage` for the session (so a page nav on the live site keeps the current palette)
- Reset clears localStorage + inline styles
- Toggle to hide/show the control cluster (starts hidden; a key combo like Ctrl+Shift+C or a tiny toggle in the footer reveals it)

### Removal path

- All markup wrapped in a single `<div data-devtool="color-picker">` container
- All JS in a single `js/devtool-color-picker.js` file, loaded conditionally
- Disable flag: a `<meta name="devtool-color-picker" content="enabled">` or a URL param (`?devtool=1`). Off by default on production.
- WordPress migration step: delete the container + the JS file + the meta tag. One minute to rip out.

---

## Design Constraints

- No new CSS classes leak into the production cascade (all devtool CSS scoped via `[data-devtool="color-picker"]` selector or `:where()`)
- No dependencies on external libraries — vanilla JS only, matches project convention
- Does not affect SEO, accessibility, or form submissions
- `data-devtool` attribute is recognised as a "strip before WordPress migration" marker in `.claude/rules/website-conventions.md`

---

## Deliverables

1. `js/devtool-color-picker.js` — self-contained vanilla JS widget
2. Optional CSS in `css/v{N}-fixes.css` under a clearly marked "DEVTOOL — REMOVE BEFORE PRODUCTION" heading
3. Footer markup update on all 5 pages (or a single shared include pattern — to decide at execution)
4. README note in `docs/devtools.md` explaining enable/disable

---

## Out of Scope

- Picker for secondary palette colors (teal, orange, lime, grey) — add later if needed
- Font picker — own PRD
- Spacing picker — own PRD
- Saving to a URL shareable with Marilyn — nice-to-have, consider in a v2

---

## Success Criteria

| Metric | Target |
|---|---|
| Enable/disable via a single flag | Yes |
| Changes persist across page navigation | Yes via localStorage |
| Reset restores exact canonical values | Byte-match against tokens file |
| Widget accessible (keyboard + screen reader) | Yes |
| Leaves production cascade untouched when disabled | Zero selectors match on production |
| Removable in under 5 minutes | Yes |

---

## Effort Estimate

2-3 hours. Straightforward vanilla JS + small CSS + footer markup.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-16 | PRD created from D25 backlog item. Awaits scheduling post-Marilyn-review. |
