# PRD 22: Mobile-Responsive Audit, WordPress/Elementor-Forward

> **Order:** 22
> **Status:** Proposed
> **Type:** QA / Refactor
> **Dependencies:** None (site is v6, stable)
> **Blocks:** None (but quality-of-life before WP migration)
> **Sprint:** TBD (post-Marilyn-review)
> **Created:** 2026-04-16
> **Source:** D24 in `docs/deferred-items.md` (Vasso ask from Apr 14 session, captured during Apr 16 chat-ask backlog audit)

---

## Why This Matters

Vietnamese student audience is mobile-primary. The site has been built responsive but has never had a dedicated audit pass that systematically verifies every page at every relevant breakpoint with a WordPress/Elementor-migration-forward lens.

Specific concerns raised by Vasso in the Apr 14 session: "WordPress and Elementor forward-looking, mobile responsive layout assessment audit and change and fix" — implying both a defensive pass (find bugs) and a forward pass (ensure the breakpoint system is Elementor-compatible).

---

## Scope

### Breakpoints to audit (5 viewports)

| Viewport | Device class | Representative |
|---|---|---|
| 360px | Small Android | Samsung A-series |
| 375px | Small iPhone | iPhone SE, 12/13 mini |
| 414px | Large iPhone | iPhone Pro Max series |
| 768px | Tablet portrait | iPad mini/standard |
| 1024px | Tablet landscape / small laptop | iPad Pro landscape, small notebooks |

Plus smoke-test at 320px (iPhone SE 1st gen) and 1440px (desktop baseline).

### Pages to audit (5 live + 2 archived surfaces)

- `index.html` (home)
- `about.html`
- `course.html`
- `contact.html` (inquiry)
- `apply.html` (application)
- Not archived `-v5.html` files (they are frozen; regressions there are expected)

### Audit checklist per page, per breakpoint

| Check | Method |
|---|---|
| No horizontal scroll | `document.documentElement.scrollWidth <= clientWidth` |
| No clipped content | Visual inspection |
| Touch targets ≥ 44x44px | Grid measurement on interactive elements |
| Font sizes readable (≥ 14px body) | Computed style check |
| Images respect aspect, don't stretch | Already fixed for PRD 18/21 sections; verify everywhere else |
| Forms usable (keyboard, tap, focus) | Manual interaction test |
| Nav mobile drawer works | Interact + verify aria-expanded |
| Sticky / fixed elements don't cover content | Scroll + measure |
| Curriculum marquee not clipped by viewport | Scroll test |

### WordPress/Elementor-forward checks

- Every section uses `data-section` + `data-elementor-widget` attributes (spot-check; earlier PRDs established this pattern)
- Breakpoints align with Elementor's default breakpoints (mobile <768, tablet <1024, desktop ≥1024) so migration doesn't require breakpoint translation
- No CSS that uses JS-only responsive tricks (hover-only states on mobile, resize listeners, etc.) that wouldn't survive Elementor's static rendering
- BEM naming on all new elements so Elementor CSS class overrides stay predictable

---

## Deliverables

1. A report table: one row per (page, breakpoint) = 5 × 7 = 35 rows. Each row gets a pass/fail on the checklist above.
2. Fix PRs for every failure, grouped by theme (nav issues, image issues, spacing issues).
3. Updated `docs/tokens.md` if any breakpoint values shift (none expected).
4. Updated `.claude/rules/website-conventions.md` with a "mobile-first audit checklist" section so future work self-checks.

---

## Out of Scope

- New features (add a section, add a page) — this is quality, not growth.
- Desktop-only refactors.
- Performance audit (separate PRD).
- Accessibility audit beyond the mobile-usability subset (separate PRD).

---

## Success Criteria

| Metric | Current | Target |
|---|---|---|
| Pages with horizontal scroll issues | Unknown | 0 |
| Touch targets below 44px | Unknown | 0 |
| Forms usable on mobile | Assumed yes | Verified yes across all 5 pages at all 5 breakpoints |
| Elementor breakpoint alignment | Partial (768px, 1024px match; smaller breakpoints not explicitly mapped) | Full |

---

## Effort Estimate

3+ hours. Can be split into a Phase A (audit + report) and Phase B (fixes) across two sessions.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-16 | PRD created from D24 backlog item during chat-ask audit. Awaits scheduling post-Marilyn-review. |
