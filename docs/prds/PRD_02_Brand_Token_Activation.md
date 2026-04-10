# PRD 02: Brand Token Activation & Font Fix

> **Order:** 2
> **Status:** Proposed
> **Type:** Refactor
> **Dependencies:** PRD 1 (Design System & Token Architecture)
> **Blocks:** PRD 3, PRD 4, PRD 5, PRD 6 (every page-level PRD inherits the visual foundation)
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

The Cargonomics prototype currently renders with the wrong fonts. The `index.html` file loads Source Serif 4 and Outfit via Google Fonts (line 25), but neither is a Cargonomics brand font. The tokens file correctly declares Orbitron for headings and Open Sans for body text, yet no `<link>` tag loads those typefaces. The result is that Orbitron and Open Sans silently fall back to the browser's default sans-serif. Marilyn reviewed the prototype during the April 8 kickoff and approved the layout, but the brand identity from the R2 guide (Navy Blue, Gold, Orbitron logo font) is not what the browser actually renders.

Beyond fonts, `style-v2.css` (1,820 lines) contains hardcoded hex values in property declarations. The known offender is `.btn--copper:hover` using `#A3642B` instead of `var(--color-secondary-dark)`, but a full audit will likely surface more. Every hardcoded colour is a point where the Flexed token swap breaks. The entire value proposition of the one-codebase, multi-token architecture depends on zero raw hex values outside the tokens files.

This PRD is the visual proof that the token system works. After execution, the site should look like the R2 brand guide: Navy Blue backgrounds, Gold accent buttons, Orbitron headings, Open Sans body copy. Until this lands, every page-level PRD (3 through 6) would inherit broken brand rendering and produce work that needs re-doing.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `index.html` line 25 loads Source Serif 4 + Outfit from Google Fonts | Wrong fonts. Should be Orbitron + Open Sans per R2 brand guide. |
| `tokens-cargonomics.css` declares `--font-heading: 'Orbitron'` and `--font-body: 'Open Sans'` | Fonts declared as tokens but never loaded via `<link>` tag. Browser falls back to default sans-serif. |
| `.btn--copper:hover` in `style-v2.css` uses hardcoded `#A3642B` | Uses raw hex instead of `var(--color-secondary-dark)`. Flexed token swap would not affect this element. |
| Unknown count of other hardcoded hex values in 1,820 lines of `style-v2.css` | Full audit needed. Each hardcoded value is a token-swap failure point. |
| Preconnect tags on lines 23-24 point to `fonts.googleapis.com` and `fonts.gstatic.com` | Correct domains, but must verify they remain valid for the replacement font URL. |
| No `data-section` or `data-slot` attributes on any sections | PRD 1 may or may not have added these yet. This PRD should verify and apply if missing. |

---

## Desired Outcomes

### Section A: Font Loading -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Correct Google Fonts loaded (Orbitron + Open Sans)** | Source Serif 4 and Outfit are not brand fonts; headings and body render in wrong typeface | DevTools computed `font-family` on `h1` shows `Orbitron`; on `<p>` shows `Open Sans`. No references to Source Serif or Outfit in `index.html`. | Verify Google Fonts v2 API URL format for multi-family loading with `display=swap` |
| A-2 | **Font loading performance optimised** | Invisible text during font load (FOIT) is unacceptable for a brand-heavy site | Preconnect tags present for `fonts.googleapis.com` and `fonts.gstatic.com`. Font URL includes `display=swap`. | Compare `font-display: swap` vs `optional` for Orbitron; determine which is appropriate for a logo font |

**A-1 details:**
- Orbitron weights: 400, 500, 700, 900 (headings, display text, hero titles, nav brand mark)
- Open Sans weights: 400, 600, 700 (body text, labels, navigation links, form inputs)
- Remove Source Serif 4 + Outfit `<link>` tag entirely
- Use `font-display: swap` to prevent invisible text during load

### Section B: Colour Audit & Replacement -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Full hardcoded colour audit completed** | Unknown number of raw hex values that break token-swap | Audit table produced listing every hardcoded hex in `style-v2.css` with line number, current value, and target token | None (this is the audit itself) |
| B-2 | **Zero hardcoded hex values in style-v2.css property declarations** | Flexed token swap fails on any element with raw hex colour | Regex search for `#[0-9A-Fa-f]{3,8}` in non-comment lines returns zero. All replaced with `var(--token-name)`. | Check current ratio of token usage vs raw hex to estimate audit scope |

**B-2 details:**
- Hex values in CSS comments are acceptable (documentation)
- Hex values inside token files themselves are expected (they define the tokens)
- `rgba()` values derived from token colours should use the token with appropriate alpha
- Audit table must be reviewed before any replacements begin

### Section C: Token Chain Verification -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **End-to-end token override chain verified visually** | No confidence that `style-v2.css` defaults are fully overridden by `tokens-cargonomics.css` | Nav background = Navy Blue (#11294B). Buttons = Gold (#D4B468). Headings = Orbitron. Body = Open Sans. Hover state uses `var(--color-secondary-dark)`, not hardcoded copper. Footer = dark navy variant. | None (this is visual verification) |

---

## What This PRD Does NOT Cover

- Restructuring section layout or content (that is PRDs 3-6)
- Creating the tokens files from scratch or adding spacing/component tokens (that is PRD 1)
- Image replacement (that is PRD 9)
- Responsive adjustments (that is PRD 12)
- Creating `tokens-flexed.css` structure (that is PRD 1)
- Typography scale adjustments (this PRD swaps the font family, not the size scale)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Replace Source Serif 4 + Outfit `<link>` tag (line 25) with Orbitron + Open Sans. Verify preconnect tags. Apply `data-section`/`data-slot` if not yet present from PRD 1. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | MODIFY | Replace every hardcoded hex value in property declarations with corresponding CSS custom property. |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, brand token override chain, colour reference |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Lines 22-31 for current font loading tags. All `<section>` elements for data attribute check. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | 1,820-line stylesheet to audit for hardcoded hex values. Primary write target. |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Token definitions. Reference for mapping hex values to custom property names. |
| `05-deliverables/website-prototype/cargonomics-site/docs/design-system.md` | PRD 1 output. Data attribute conventions and token catalogue. |
| `01-research/cargonomics-brand-identity.pdf` | R2 brand guide. Visual reference for verification (Navy Blue, Gold, Orbitron, Open Sans). |
| `06-client-comms/client-brief.md` | Marilyn's hard constraints on brand adherence. R2 as authoritative source. |

### MCP Servers (only include relevant ones)

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`. Font rendering, colour checks, console errors. |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` `[PARALLEL]` | Read `index.html` lines 22-31 for current font tags. Read `tokens-cargonomics.css` for all token names and values. Read `design-system.md` for data attribute conventions (PRD 1 output). Inventory all `<section>` elements. |
| 2 | `[READ-ONLY]` `[SEQUENTIAL]` | Full hex audit: scan every line of `style-v2.css` for hardcoded hex colour values. Produce audit table with line number, current hex, target token. |
| 3 | `[READ-ONLY]` `[SEQUENTIAL]` | Verify Google Fonts v2 API syntax. Confirm preconnect domains. Compare `font-display: swap` vs `optional`. Check CSS custom property usage ratio. Generate 5 proactive items. Report to orchestrator. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Replace Source Serif 4 + Outfit `<link>` tag with Orbitron + Open Sans in `index.html`. Verify preconnect tags present. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Replace every hardcoded hex value in `style-v2.css` with corresponding CSS custom property, following the audit table. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Apply `data-section`, `data-slot`, `data-elementor-widget` to sections if not already present from PRD 1. |
| 7 | `[READ-ONLY]` `[SEQUENTIAL]` | Visual verification: nav background Navy Blue, buttons Gold, headings Orbitron, body Open Sans, hover states use tokens. Console check for errors. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Google Fonts v2 API syntax | Verify current URL format for loading Orbitron + Open Sans with multiple weights and `display=swap` | Incorrect URL silently fails (no network error, just no font) |
| R-2 | Font loading strategy | Compare `font-display: swap` vs `optional` for Orbitron specifically. `optional` prevents FOUT but first-time visitors may not see Orbitron. | Orbitron is the brand logo font. Not seeing it on first visit is problematic for headings. |
| R-3 | Preconnect domain check | Confirm `fonts.googleapis.com` and `fonts.gstatic.com` are still correct Google Fonts CDN domains | Preconnect to wrong domain wastes a connection and delays the real request |
| R-4 | Full hex colour audit | Audit every line of `style-v2.css` for hex references. Document line number, value, and target token. | Must be complete before replacement. Missing a value means Flexed swap breaks on that element. |
| R-5 | CSS custom property usage ratio | Count how many values in `style-v2.css` already use `var()` vs raw hex | Determines audit scope: if 90% use tokens, audit is small. If 50% use hex, audit is large. |
| R-6 | script.js data attribute conflicts | Grep `script.js` for `data-` attribute references before adding new attributes | Adding `data-*` might trigger unexpected JS behaviour if selectors overlap |

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
| Heading font family | Browser default (Orbitron declared but not loaded) | Orbitron renders on all `h1`-`h6` | `preview_inspect` on heading elements, check computed `font-family` |
| Body font family | Browser default (Open Sans declared but not loaded) | Open Sans renders on `<p>` and `<body>` | `preview_inspect` on body text |
| Nav background colour | Correct (token override works for colour) | Navy Blue (#11294B) confirmed | `preview_inspect` on `<nav>` |
| Primary button background | Correct (token override works) | Gold (#D4B468) confirmed | `preview_inspect` on CTA button |
| Hover state on `.btn--copper` | Hardcoded `#A3642B` | `var(--color-secondary-dark)` | Grep for `#A3642B` in `style-v2.css` returns zero |
| Hardcoded hex count in `style-v2.css` | Unknown (audit needed) | Zero in property declarations (comments excepted) | Regex search for hex in non-comment lines |
| Source Serif 4 / Outfit references | Present in `index.html` line 25 | Zero references | Grep for `Source Serif` and `Outfit` in `index.html` |
| Console errors | 0 | 0 | `preview_console_logs` level=error |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Headings render in Orbitron | Hero h1, section h2s all show Orbitron font | `preview_inspect` computed font-family |
| Body renders in Open Sans | Paragraph text shows Open Sans | `preview_inspect` on `<p>` |
| Nav background is Navy Blue | Background matches #11294B | `preview_screenshot` |
| Gold buttons visible | Primary CTAs show #D4B468 background | `preview_screenshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No Source Serif / Outfit | Grep `index.html` for these font names | Zero matches |
| No hardcoded hex in declarations | Regex `style-v2.css` for `#[0-9A-Fa-f]{3,8}` outside comments | Zero matches in property declarations |
| Preconnect tags present | Read `index.html` lines 22-24 | Both preconnect links exist |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 02 - Brand token activation and font fix`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Font swap causes layout shift | Orbitron is wider than Outfit, causing text to overflow containers or break hero layout | Medium | Use `font-display: swap` to see the shift immediately. Adjust fixed-width containers that break. Test hero, nav, and headings specifically. |
| Hex audit misses a value | One hardcoded colour survives, breaking Flexed token swap on that element | Medium | Use regex search, not manual scanning. Re-run search after all replacements as a final check. |
| Token mapping ambiguity | A hex value does not have a clear 1:1 token match (shade between two tokens) | Low | Map to nearest token. If the shade is needed, add a new derived token with a comment. |
| Google Fonts API format change | v2 CSS API URL format has changed since last check | Low | Test the URL in a browser before committing. Google Fonts Helper can generate verified URLs. |
| Data attributes conflict with script.js | Adding `data-*` triggers unexpected JS behaviour | Low | Grep `script.js` for `data-` references before adding new attributes. |

---

## Related Documents

- `01-research/cargonomics-brand-identity.pdf`: R2 brand guide (canonical font and colour values)
- `05-deliverables/website-prototype/cargonomics-site/docs/tokens.md`: Token specification
- `.claude/rules/website-conventions.md`: Brand token override chain documentation

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (original version) |
| 2026-04-10 | Full | Expanded with hex audit spec, font loading details, research items, risks |
| 2026-04-10 | Full rewrite | Restructured to match mandatory template. Added header block, session note, research-first mandate, lettered outcome sections with requirement tables, proactive items table, success criteria with Current/Target columns, split verification checklist, related documents. |
