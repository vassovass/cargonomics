# PRD 24: Pattern Library / Styleguide Page

> **Order:** 24
> **Status:** Proposed
> **Type:** Dev Infrastructure
> **Dependencies:** None (feeds off existing components; benefits from PRD 22 audit first)
> **Blocks:** PRD 20 WordPress migration (patterns become Elementor Saved Templates)
> **Sprint:** TBD (post-Marilyn-review)
> **Created:** 2026-04-16
> **Source:** D26 in `docs/deferred-items.md` (Vasso ask from Apr 14 session, captured during Apr 16 chat-ask backlog audit)

---

## Why This Matters

Vasso's Apr 14 ask: "A page where whenever something gets added, changed, or whatever, there is a record of it on a page so that we can see what they look like... like WordPress theme kitchen-sink pages... good naming conventions."

Two goals:
1. **Design review tool.** Vasso can show Marilyn every reusable block at once on a single page: pillar cards, trainer cards, curriculum marquee, hero variants, pillar section layouts, footer variants, form components. Faster than navigating the five live pages hunting for examples.
2. **WordPress migration spec.** Every block on this page becomes an Elementor Saved Template with an ACF field mapping. Pattern library IS the migration spec.

---

## Scope

### Page: `styleguide.html`

Routed behind dev flag (same toggle pattern as PRD 23). Not on the sitemap, not indexable, not linked from nav. Reachable via `/styleguide` only if you know the URL.

### Sections (each renders a live component + its metadata)

| Section | Component | Metadata to show |
|---|---|---|
| 1 | Colour palette | All tokens from `tokens-cargonomics.css` with hex + CSS variable name + PANTONE if set |
| 2 | Typography | Each heading level + body + small + caption, with font family + size + line height |
| 3 | Spacing scale | Visual render of --space-xs through --space-4xl |
| 4 | Buttons | All button variants (btn--copper, btn--outline, btn--outline-sm, btn--large) with hover states |
| 5 | Pillar card (homepage) | `.pillar-row` alternating |
| 6 | Pillar card (about) | `.about-pillar-card` with image |
| 7 | Trainer card | `.trainer-card-v2` and `.leader-card` |
| 8 | Trusted partners tile | `.trusted-partners__tile` + `--more` variant |
| 9 | Program card featured | `.program-featured` |
| 10 | Curriculum marquee | `.curriculum-v2` with flip cards |
| 11 | Curriculum grid card | `.curriculum-grid__card` + `.curriculum-grid__card--highlight` |
| 12 | Hero variants | homepage hero, about hero, course-overview hero |
| 13 | Footer | single rendered footer |
| 14 | Form components | input, textarea, select, checkbox group, radio group, submit button |
| 15 | Modal | `.modal-overlay` |
| 16 | Floating buttons | zalo + whatsapp sidebar |
| 17 | Archived components reference | Links to `docs/archived-components.md` with preview |

### Each section documents

- Class name (BEM root)
- Tokens used (list of CSS custom properties referenced)
- `data-elementor-widget` value (target widget on migration)
- `data-slot` values (ACF field mapping targets)
- HTML snippet (copy-paste ready)
- Notes on dependencies, gotchas, responsive behaviour

---

## Relationship to Existing Files

- `docs/archived-components.md` = morgue (removed-but-preserved components). Continues to exist.
- `styleguide.html` = **live showcase** (currently-shipped components). New.

No overlap: an entry moves from styleguide → morgue when it's removed from the live site, not when it's added.

---

## Design Constraints

- Built from the SAME CSS the live site uses (`css/style-v{N}.css` + tokens). Never a fork.
- Any regression on styleguide implies a regression on the live site — so it's a lightweight live test too.
- Mobile-responsive: same layout breakpoints as the live site (PRD 22 setup benefits this).

---

## Deliverables

1. `styleguide.html` at sub-repo root (excluded from sitemap, marked `noindex` via `<meta>`)
2. `css/styleguide-only.css` for the styleguide-specific chrome (table of contents, section dividers, code blocks) — never bleeds into live site
3. `docs/pattern-library-readme.md` explaining how to add a new pattern when a new component ships
4. Update `_redirects` so `/styleguide.html` 301s to `/styleguide` for the clean URL pattern

---

## Out of Scope

- Interactive prop tweaker (e.g., "change button color live") — that is PRD 23 territory
- Automated regression screenshots — nice for a future CI integration
- Visual diff vs prior versions — overkill for this phase

---

## Success Criteria

| Metric | Target |
|---|---|
| Every live component has a styleguide entry | Yes, 1:1 |
| Each entry shows class name + tokens + data attributes | Yes |
| Page is noindex / excluded from sitemap | Yes |
| Page is not linked from public nav | Yes |
| Adding a new component updates styleguide same-commit | Enforced via convention doc |

---

## Effort Estimate

4-6 hours for first build. Incremental updates afterwards are small (15-30 min per new component).

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-16 | PRD created from D26 backlog item. Awaits scheduling post-Marilyn-review. |
