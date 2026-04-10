# PRD 01: Design System & Token Architecture

> **Order:** 1
> **Status:** Proposed
> **Type:** Architecture
> **Dependencies:** None
> **Blocks:** PRD 2, PRD 3, PRD 4, PRD 5, PRD 6 (all downstream PRDs)
> **Sprint:** 1
> **Created:** 2026-04-10

> **Session note**: This PRD may run in its own Claude Code session or as a parallel agent.
> Read the sprint context file first. Do NOT update PRD_00_Index.md or commit/push.
> The orchestrator session handles index updates, commits, and pushes.

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct
> the research items listed below, and generate 5 proactive items. Report findings to the
> user before beginning any WRITE phases. Do not skip or shortcut the research phase.

---

## Why This Matters

The Cargonomics MVP must serve two brands (Cargonomics and Flexed) from a single codebase, then migrate to WordPress/Elementor after Marilyn signs off on the static prototype. Without a documented design system, every subsequent PRD introduces inconsistencies: hardcoded values, non-modular sections, and styling that breaks when tokens are swapped for the Flexed variant. This PRD establishes the foundation that makes everything else predictable, swappable, and WordPress-ready.

The codebase today carries forward defaults from the original GitHub mock (Deep Slate + Copper palette, Source Serif 4 + Outfit fonts). The brand tokens file overrides colours and fonts, but spacing, component tokens, section conventions, and BEM rules exist only as informal patterns. Thirteen subsequent PRDs depend on a single documented system. Without it, parallel agents working on PRDs 3 through 6 will make conflicting choices about spacing values, class naming, and section structure, and every choice will need to be reconciled later.

Elias's portfolio includes roughly 11 projects. If the token architecture works cleanly for Cargonomics and Flexed, it becomes the template for Anne Hill, Special Needs Center, and any other site in the group. Getting this right once saves significant rework later. The Tuesday April 14 MVP deadline means this foundation must be lean: enough structure for consistency, not so much that it consumes the time budget needed for the four pages.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `style-v2.css` declares default tokens (Deep Slate `#1E293B`, Copper `#B87333`, Source Serif 4 + Outfit) on lines 14-32 | These are mock defaults, not the brand. New properties added without a matching token override silently fall back to the wrong palette. |
| `tokens-cargonomics.css` contains colour and typography tokens (56 lines) | No spacing tokens, no component tokens (`--btn-bg`, `--card-radius`), no transition tokens. Layout values like `--max-width: 1200px` live only in `style-v2.css`. |
| `tokens-flexed.css` exists but not audited for parity | Must mirror every token name in `tokens-cargonomics.css` or Flexed will silently inherit Cargonomics values for missing tokens. |
| Sections use class-based markup: `.pillars-v2`, `.programs-v2`, etc. | No `data-section`, `data-slot`, or `data-elementor-widget` attributes. WordPress migration requires structured data attributes. |
| BEM partially used (`.hero__headline`, `.programs-v2__card`) | Inconsistent. Some sections use flat names (`.credibility`, `.vietnam`). No documented convention. |
| Hardcoded `px`/`rem` spacing scattered through `style-v2.css` | Section padding varies (80px, 60px, 100px). No spacing scale, no way to adjust for a different brand. |
| `docs/tokens.md` covers colour and typography only | No spacing, component, or convention documentation. New agents must reverse-engineer patterns from CSS. |

---

## Desired Outcomes

### Section A: Token Expansion -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Spacing token scale in both token files** | Hardcoded px values scattered through style-v2.css with no consistency or brand-switching capability | `tokens-cargonomics.css` and `tokens-flexed.css` both contain spacing tokens from `--space-2xs` (4px) through `--space-3xl` (64px), plus `--section-padding-y`, `--section-padding-x`, `--container-max` | Audit existing section padding values in `style-v2.css` to find the implicit rhythm and validate the 8px base scale |
| A-2 | **Component tokens for buttons, cards, nav, footer, inputs** | Brand-switching requires changing values in one place, but component-level properties (button radius, card shadow, nav height) have no token path | `tokens-cargonomics.css` contains `--btn-bg`, `--btn-radius`, `--card-bg`, `--card-shadow`, `--nav-bg`, `--footer-bg`, `--input-border`, plus transition tokens | None |
| A-3 | **1:1 token name parity between Cargonomics and Flexed files** | Missing tokens in Flexed cause silent fallbacks to Cargonomics brand values | Diff of token names between both files shows zero mismatches; values differ, names match | Read `tokens-flexed.css` current state and inventory missing names |

### Section B: Section Conventions -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **`data-section`, `data-slot`, `data-elementor-widget` on all homepage sections** | WordPress migration requires structured data attributes; adding them after 13 PRDs means touching every section twice | Every `<section>` in `index.html` has `data-section`. Key content elements have `data-slot`. No visual change or console errors after addition. | Verify `data-*` attributes do not conflict with existing JS in `script.js` |
| B-2 | **BEM naming convention documented with legacy alias policy** | Parallel agents invent conflicting naming schemes; legacy `-v2` suffixes conflict with clean BEM | `docs/design-system.md` includes BEM rules, 3+ Cargonomics examples, and documents `.pillars-v2` / `.programs-v2` as acceptable aliases | None |

### Section C: Documentation -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **`docs/design-system.md` as single reference** | Agents reverse-engineer conventions from CSS, reaching different conclusions | Document covers: colour palette, typography scale, spacing scale, component tokens, data attributes, BEM conventions, accessibility requirements, file structure | None |
| C-2 | **WordPress migration path documented** | Migration decisions deferred to post-MVP without documentation will be guesswork | `design-system.md` references Hello Elementor theme, Variables Manager, ACF mapping, and section-to-widget table | Confirm Elementor Variables Manager still supports CSS custom property import in v3.33+ |

---

## What This PRD Does NOT Cover

- Applying the design system to specific pages (that is PRDs 3-6)
- Fixing the font loading bug or swapping Google Fonts link tags (that is PRD 2)
- Replacing hardcoded hex values in `style-v2.css` property declarations (that is PRD 2)
- Image assets or logo integration (that is PRD 9)
- Responsive breakpoints and media queries (that is PRD 12)
- Building Flexed content or pages (post-MVP)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/docs/design-system.md` | CREATE | Full design system reference: colours, typography, spacing, components, BEM, data attributes, WordPress migration |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | MODIFY | Add spacing tokens, component tokens, transition tokens. Preserve existing colour and typography tokens. |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-flexed.css` | MODIFY | Add matching token names with Flexed-appropriate values. Achieve 1:1 name parity with Cargonomics. |
| `05-deliverables/website-prototype/cargonomics-site/docs/tokens.md` | MODIFY | Extend to include spacing scale table, component tokens table, and rationale. |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Add `data-section`, `data-slot`, `data-elementor-widget` attributes to all existing sections. No content changes. |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand token override chain |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Current token inventory (colour + typography). The file this PRD expands. |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-flexed.css` | Flexed tokens. Must achieve 1:1 name parity after this PRD. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Layout rules, default tokens, hardcoded spacing values to audit. |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Current section markup. Needs data attributes added. |
| `05-deliverables/website-prototype/cargonomics-site/docs/tokens.md` | Existing token spec (colour and typography only). Must be extended. |
| `01-research/cargonomics-brand-identity.pdf` | R2 brand guide. Source of truth for colour hex values, font choices. |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Section-by-section homepage spec. Defines which sections exist. |

### MCP Servers (only include relevant ones)

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`. Confirm data attributes cause no regressions. |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` `[PARALLEL]` | Read `style-v2.css` for all hardcoded spacing/colour/component values. Read `tokens-cargonomics.css` for current inventory. Read `tokens-flexed.css` for parity check. Read `index.html` for section markup. Read `docs/tokens.md`. |
| 2 | `[READ-ONLY]` `[SEQUENTIAL]` | Conduct all Research & Verification items (Elementor Variables Manager, spacing audit, clamp() support, BEM + data attribute specificity). |
| 3 | `[READ-ONLY]` `[SEQUENTIAL]` | Audit section padding values. Map current values to proposed 8px scale. Generate 5 proactive items. Report findings before proceeding. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Add spacing and component tokens to `tokens-cargonomics.css`. Maintain existing colour and typography tokens. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Update `tokens-flexed.css` with matching token names and Flexed-appropriate values. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Add `data-section`, `data-slot`, `data-elementor-widget` attributes to all sections in `index.html`. No visible content changes. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Create `docs/design-system.md` with all required sections. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Update `docs/tokens.md` to include spacing and component tokens. |
| 9 | `[READ-ONLY]` `[SEQUENTIAL]` | Verify all token names exist in both files. Verify `data-section` on all sections. Console check for errors. Visual regression check via Claude Preview. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Elementor Variables Manager | Confirm Elementor 3.33+ still supports CSS custom property import. Determine if it handles spacing/component tokens or only colour/font. | If Variables Manager only handles colours, component tokens need a different WordPress migration path. |
| R-2 | Spacing scale validation | Audit existing section padding values in `style-v2.css`. Compare current 80px/60px/100px patterns to the proposed 8px base scale. | If existing values do not align with the 8px scale, the transition will introduce visible layout shifts. |
| R-3 | `clamp()` browser support | Check CSS `clamp()` support in Coc Coc (Vietnamese Chromium browser) and Safari iOS (common among HCMC students). | If `clamp()` fails, responsive section padding tokens need a fallback strategy. |
| R-4 | BEM + data attribute specificity | Verify no specificity conflicts when combining BEM classes with `data-*` attribute selectors. | Data-attribute selectors may create specificity surprises for downstream PRDs. |
| R-5 | tokens-flexed.css current state | Inventory which token names are present vs missing compared to `tokens-cargonomics.css`. | Silent fallbacks to the wrong brand for any missing tokens. |
| R-6 | script.js data attribute usage | Grep `script.js` for `data-` attribute references to check for conflicts with new attributes. | Adding `data-section` could trigger unexpected JS behaviour if selectors overlap. |

---

## Proactive Items

| # | Item | Description | Trigger |
|---|------|-------------|---------|
| 1 | _TBD at execution time_ | _Generated after reading codebase_ | _Condition that activates this_ |
| 2 | _TBD_ | | |
| 3 | _TBD_ | | |
| 4 | _TBD_ | | |
| 5 | _TBD_ | | |

---

## Modularity & WordPress Readiness

- [ ] Every new/modified `<section>` uses `data-section="kebab-case-name"` attribute
- [ ] Content slots use `data-slot` attributes (heading, body, image, cta)
- [ ] Elementor target widget documented via `data-elementor-widget`
- [ ] All styling uses CSS custom properties from tokens file (no hardcoded hex/px)
- [ ] Section is self-contained (copy-pasteable to another page without breaking)
- [ ] No sibling dependencies between sections
- [ ] Component CSS scoped via BEM block matching section name

---

## Design & Code Quality

- [ ] BEM naming convention (block__element--modifier)
- [ ] No hardcoded colour, font, or spacing values (use `var(--token-name)`)
- [ ] Semantic HTML (appropriate heading hierarchy, landmark elements, no div soup)
- [ ] Accessible (labels on form fields, alt on images, focus states, ARIA on icon-only buttons)
- [ ] Vanilla JS only (no jQuery, no framework dependencies)
- [ ] Performant (lazy-load below-fold images, font-display: swap, no layout shifts)
- [ ] No em dashes in any text content (use commas, colons, or shorter sentences)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Spacing tokens in `tokens-cargonomics.css` | 0 spacing tokens | 11+ spacing tokens (`--space-2xs` through `--container-max`) | Grep for `--space-` and `--section-padding` in file |
| Component tokens in `tokens-cargonomics.css` | 0 component tokens | 20+ component tokens (`--btn-*`, `--card-*`, `--nav-*`, `--footer-*`, `--input-*`) | Grep for `--btn-`, `--card-`, `--nav-`, `--footer-`, `--input-` in file |
| Token name parity between Cargonomics and Flexed | Unknown, likely many missing | Zero name mismatches (values differ, names match) | Diff token names extracted from both files |
| `data-section` attributes on homepage | 0 sections have `data-section` | All `<section>` elements carry `data-section` | Grep `<section` in `index.html`, verify each has `data-section=` |
| Design system documentation | Partial (`docs/tokens.md` covers colour + typography only) | `docs/design-system.md` covers 8 required sections | Manual review of document headings |
| Console errors after data attribute additions | 0 errors | 0 errors (data attributes are inert) | `preview_console_logs` level=error |
| Visual regressions after data attribute additions | None | None | `preview_screenshot` comparison |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| No visual regressions | Page renders identically before and after data attribute additions | `preview_screenshot` comparison |
| Brand colours intact | Navy Blue + Gold still rendering correctly after token file expansion | `preview_inspect` on nav and buttons |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| All sections have `data-section` | Grep `<section` in `index.html` | Every `<section>` line includes `data-section=` |
| Token parity | Extract `--` declarations from both token files, diff names | Zero name-only differences |
| No hardcoded values in new tokens | Grep `docs/design-system.md` for raw hex or px values | All values reference token variable names |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 01 - Design system and token architecture`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Over-engineering tokens for a 4-page MVP | High (consumes time budget for pages due Tuesday) | Medium | Keep the token set minimal: spacing scale (11 values), component tokens (20 values), existing colour/typography. No responsive variants, no dark mode. |
| Spacing values break at mobile (375px) | Medium (layout looks wrong on student phones) | Medium | Audit existing padding values before writing tokens. Use `clamp()` for section-level spacing. Test via Claude Preview at mobile preset. |
| Elementor Variables Manager API change | Medium (documented WordPress path is wrong) | Low | Research during Phase 2. If deprecated, document the manual Global Colors fallback. Static prototype works regardless. |
| Flexed token values are placeholders (Marilyn has not confirmed palette) | Low (structure matters more than exact values for now) | High | Use Blue + White per existing logo. Mark all values as "pending confirmation" in comments. |
| Legacy `-v2` class suffixes conflict with clean BEM | Medium (renaming now risks breaking 1,800 lines of CSS) | Medium | Document as acceptable aliases. Note clean names for post-MVP normalization. Do not rename during this PRD. |

---

## Related Documents

- `01-research/cargonomics-brand-identity.pdf`: R2 brand guide, canonical values
- `06-client-comms/homepage-markup-notes-2026-04-08.md`: Section inventory from Marilyn's April 8 review
- `.claude/rules/website-conventions.md`: Coding standards and modularity rules

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (original version) |
| 2026-04-10 | Full | Expanded with detailed outcomes, research, risks, task structure |
| 2026-04-10 | Full rewrite | Restructured to match mandatory template. Added header block, session note, research-first mandate, lettered outcome sections with requirement tables, proactive items table, success criteria with Current/Target columns, split verification checklist, related documents. |
