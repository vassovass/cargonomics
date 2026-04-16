# PRD 19: Course Page Hero Visual Anchor

> **Order:** 19
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** None
> **Blocks:** None
> **Sprint:** Post-MVP Enhancements
> **Created:** 2026-04-14

> **Session note**: This PRD may run in its own Claude Code session or as a parallel agent.
> Read the sprint context file first. Do NOT update PRD_00_Index.md or commit/push.
> The orchestrator session handles index updates, commits, and pushes.

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct
> the research items listed below, and generate proactive items (3 core + 2 stretch).
> Report findings to the user before beginning any WRITE phases. Do not skip the research phase.

---

## Why This Matters

The April 14 review of `course.html` flagged the hero section (`.course-overview`, lines 119 to 159) as too text-heavy. The user shared a screenshot with a purple-drawn rectangle on the right side of the hero, indicating where a visual anchor belongs. Right now the hero is a single column: heading, intro copy, six-fact grid, then a positioning paragraph. There is nothing for the eye to land on before the reader has to commit to reading prose.

The course page is the conversion hinge between awareness and application. A prospective student arrives, decides in seconds whether the program looks credible, and either keeps reading or bounces. A balanced two-column hero with a strong visual on the right makes the page feel like a published programme, not a Word document. It also matches the homepage hero pattern users already saw, so the brand reads consistently across pages.

Marilyn and Sophia (Marilyn's newly onboarded marketing assistant) will provide final imagery later. This PRD does not wait for them. It ships a placeholder so the page stops reading as text-heavy immediately, and it builds the DOM slot in a way that lets a final image be swapped in via simple file replacement when it arrives.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `course.html` lines 119 to 159: `.course-overview` hero is single-column | Reads as a text wall. No visual anchor. Page feels unfinished compared to homepage. |
| `course.html` line 123: `<h1>` "From Campus to Career in 4 Days" | Heading sits alone with no supporting visual on the right. |
| `course.html` line 124: subtitle paragraph | Pushes the facts grid further down without giving the eye anything to rest on. |
| `course.html` lines 127 to 152: six-fact grid | Currently the only visual element in the hero. Rich content but laid out as another text block. |
| `course.html` lines 154 to 156: positioning paragraph | Adds another full-width text block at the bottom of the hero. Reinforces the text-heavy feel. |
| No CTA in the hero | The first call to action lives at the bottom of the page. The hero ends without an action prompt. |
| `css/style-v3.css`: `.course-overview__layout` is single-column flex/stack | No grid rule for desktop two-column split. No mobile stacking rule for a visual slot. |

---

## Desired Outcomes

### Section A: Hero Layout Refactor -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Two-column grid on desktop** | Hero reads as text wall | `.course-overview` renders as text-left / visual-right at viewports >= 769px | Verify breakpoint matches site convention (likely 768px) |
| A-2 | **Vertical stack on mobile, visual below text** | CTA risks getting pushed below the fold on phones | At <= 768px the visual appears AFTER the text block so the heading and any CTA stay above the fold on common mobile viewports (375x812, 390x844) | Confirm common mobile viewport heights for the audience |
| A-3 | **No regression on existing hero content** | Refactor must not lose any content | Heading (line 123), subtitle (line 124), facts grid (lines 127 to 152), positioning paragraph (lines 154 to 156), and any existing CTAs remain present and accessible | None |

### Section B: Placeholder Visual -- 3 Items (executing agent picks one)

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Option 1 (recommended): Stats card** | Zero asset dependency, ships today, reinforces vetting + scarcity | Semantic `<dl>` with `<dt>`/`<dd>` pairs renders in the visual slot. Uses tokens for colour, spacing, type. Contrast meets WCAG AA on ivory background. | None |
| B-2 | **Option 2: Nano Banana generated image** | Visual richness if image quality is acceptable | Image saved to `img/course-hero-placeholder.{jpg,webp}`. Meaningful `alt`. Loaded via `<picture>` with WebP/AVIF fallback. | Verify Nano Banana MCP is available and quota is healthy |
| B-3 | **Option 3: Reuse `img/hero-3.jpg`** | Fastest path, brand-consistent with homepage carousel | Existing image reused. Meaningful `alt`. Lazy-loaded if below the fold on mobile. | Confirm `img/hero-3.jpg` exists and aspect ratio works in the slot |

**B-1 details (recommended option):**
- Content: "4 Days, intensive immersion", "Limited to 20, selected students", "3 Days classroom + 1 day port visit", "Direct placement, 1,000+ industry contacts"
- Use `<dl>` with `<dt>` for the metric label and `<dd>` for the supporting line
- One BEM block: `.course-overview__stats` with elements `__item`, `__metric`, `__label`
- All colour, font, spacing values come from tokens

**Slot contract (applies to all three options):**
- The DOM slot in the hero (`.course-overview__visual`) accepts EITHER a stats card OR an `<img>` / `<picture>` element
- Final imagery from Marilyn and Sophia can be swapped in by replacing the slot's children, with no structural changes to the page

### Section C: Accessibility and Tokens -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Semantic stats card if B-1 chosen** | Stats need to be machine-readable and screen-reader friendly | Uses `<dl>`/`<dt>`/`<dd>`. Heading hierarchy not skipped. Visible labels. Contrast meets WCAG AA on token ivory background. | None |
| C-2 | **Image accessibility if B-2 or B-3 chosen** | Images must support assistive tech and not block layout | Meaningful `alt` describing the scene (not "image"). `<picture>` with WebP/AVIF fallback. `loading="lazy"` if rendered below the fold on the relevant viewport. | None |

---

## What This PRD Does NOT Cover

- Final imagery from Marilyn and Sophia (tracked separately, see cross-reference below)
- Restructuring the rest of the course page (Why Apply, Curriculum Grid, Schedule, etc.)
- Restyling or refactoring the homepage hero
- Building a full image carousel in the course hero (deferred)
- Animating the visual slot (Coach/Connect/Consult rotation idea is parked, see CLAUDE.md)
- WordPress migration of this section (handled when the site moves to Elementor)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Restructure `.course-overview` hero into two-column grid. Add `.course-overview__visual` slot. Preserve existing heading, subtitle, facts grid, positioning paragraph. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v{N+1}.css` | MODIFY | Add `.course-overview__grid`, `.course-overview__visual`, stats-card rules. Mobile stacking rules so visual appears after text on <= 768px. |
| `05-deliverables/website-prototype/cargonomics-site/img/course-hero-placeholder.{jpg,webp}` | CREATE (optional) | Only if option B-2 chosen. Generated via Nano Banana MCP. |
| `05-deliverables/website-prototype/cargonomics-site/course-v{N}.html` | CREATE (archive) | Per Version Management rule, archive the previous course.html with current version suffix. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v{N}.css` | CREATE (archive) | Archive the previous CSS alongside the HTML. |
| `05-deliverables/website-prototype/cargonomics-site/js/script-v{N}.js` | CREATE (archive) | Archive the previous JS alongside the HTML. |
| `05-deliverables/website-prototype/cargonomics-site/docs/deferred-items.md` | MODIFY | Add a one-line cross-reference stub pointing at the open-questions entry for final imagery from Marilyn and Sophia. Not a duplicate of the OQ entry. |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens, Version Management, Tracker Discipline |
| `.claude/rules/prds.md` | PRD execution rules |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_00_Index.md` | PRD index, status conventions |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_14_Social_Icons.md` | Most recent completed PRD, reference for style and depth |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | Target file. Hero lives at `.course-overview` lines 119 to 159. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v3.css` | Current CSS. Read for existing `.course-overview__layout`, `.course-overview__facts`, and breakpoints. |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Brand tokens. All colour, font, spacing values must come from here. |
| `05-deliverables/website-prototype/cargonomics-site/docs/deferred-items.md` | Tracker for time/priority blockers. Cross-reference stub goes here. |
| `03-project-management/open-questions.md` | Tracker for people-blocked items. Final imagery item lives here. |
| `CLAUDE.md` | Project context, MVP scope, current status |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`, `preview_snapshot`, `preview_inspect`, `preview_resize` |
| **Nano Banana** | Optional, only if option B-2 chosen for image generation |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all Agent Context files |
| 2 | `[READ-ONLY]` | Conduct research items from the table below |
| 3 | `[READ-ONLY]` | Generate proactive items (3 core + 2 stretch) based on codebase state |
| 4 | `[READ-ONLY]` | Pick placeholder option (B-1 recommended) and report choice to user before WRITE |
| 5 | `[WRITE]` | Apply Version Management archive step (course-v3.html, style-v3.css, script-v3.js) `[SEQUENTIAL]` |
| 6 | `[WRITE]` | Update `course.html`: restructure hero into two-column layout with visual slot `[PARALLEL with Phase 7]` |
| 7 | `[WRITE]` | Update `style-v4.css`: add grid, visual slot, stats card, mobile stacking rules `[PARALLEL with Phase 6]` |
| 8 | `[WRITE]` | Update `docs/deferred-items.md`: add cross-reference stub `[SEQUENTIAL]` |
| 9 | `[WRITE]` | Verify via Claude Preview at desktop, tablet, mobile breakpoints `[SEQUENTIAL]` |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Current CSS version | Read footer version tag in `course.html` and confirm the css filename in the `<link>` tag | Determines the next version number for archives |
| R-2 | Existing breakpoint | Check `style-v3.css` for the mobile breakpoint used elsewhere on the course page | Mobile stacking rule must match site convention |
| R-3 | `.course-overview__layout` current rules | Read existing flex/grid rules so the new grid does not collide | Avoids regression on facts grid layout |
| R-4 | Existing CTA in hero | Confirm whether the current hero contains a CTA, and where it sits | A-3 requires no regression; if a CTA exists it must remain visible |
| R-5 | Token availability | Confirm tokens exist for grid gap, ivory background, gold accent, body type used on stats | Needed to style the stats card without hardcoded values |
| R-6 | `img/hero-3.jpg` existence and aspect | If option B-3 picked, verify the asset exists and the aspect ratio works in the slot | Avoids broken image or distortion |
| R-7 | Nano Banana availability | If option B-2 picked, confirm MCP is reachable and quota is healthy | Avoids mid-build failure |
| R-8 | Open-questions entry for final imagery | Confirm an entry exists for Marilyn + Sophia imagery; if not, the executing agent should NOT create one (PRD 19 only writes the deferred-items stub). Surface to the user. | Tracker Discipline: stub must point to a real OQ item |

---

## Proactive Items

> **April 14 standard**: 3 core + 2 stretch. Items 1 to 3 below are core (must address). Items 4 and 5 are stretch (optional). The executing agent finalises Description and Trigger after the READ-ONLY phase.

| # | Item | Description | Trigger |
|---|------|-------------|---------|
| 1 | Rotating testimonial in the visual slot | Once testimonials arrive (post-first-cohort), the same slot can host a rotating quote card | Testimonials deferred-item resolves in `docs/deferred-items.md` |
| 2 | Countdown timer to next cohort | Live countdown to June 1, 2026 reinforces scarcity and urgency in the hero | Cohort start date is locked and visible in the hero |
| 3 | QR code with attribution | Print collateral QR code that pre-fills the application form with `form_source=course_hero_qr` | Print collateral is commissioned for events or campus visits |
| --- | --- | --- | --- |
| 4 (stretch) | Looping port excursion video | Short muted loop in the visual slot once footage from a previous excursion is available | Footage exists and meets the 5MB / autoplay-friendly bar |
| 5 (stretch) | Interactive placement map | Map of where recent graduates placed, sourced from Airtable | Placement data exists in Airtable and a public read endpoint is available |

---

## Modularity & WordPress Readiness

- [ ] Hero `<section>` keeps its `data-section="course-overview"` attribute
- [ ] New visual slot uses `data-slot="visual"` (and `data-slot="stats"` if B-1 chosen)
- [ ] Elementor target widget documented via `data-elementor-widget="container"` on the slot
- [ ] All styling uses CSS custom properties from `tokens-cargonomics.css` (no hardcoded hex/px)
- [ ] Section remains self-contained (copy-pasteable to another page without breaking)
- [ ] No sibling dependencies between hero and other sections
- [ ] Component CSS scoped via BEM block `.course-overview`

---

## Design & Code Quality

- [ ] BEM naming (`.course-overview__grid`, `.course-overview__visual`, `.course-overview__stats`, `.course-overview__stats__item`)
- [ ] No hardcoded colour, font, or spacing values (use `var(--token-name)`)
- [ ] Semantic HTML (correct heading hierarchy, `<dl>`/`<dt>`/`<dd>` if stats card, meaningful `alt` if image)
- [ ] Accessible (WCAG AA contrast, focus states preserved, no skipped headings)
- [ ] Vanilla JS only if any JS is added (no jQuery, no framework)
- [ ] Performant (image lazy-loaded if below the fold, no layout shifts, font-display: swap)
- [ ] No em dashes anywhere in copy or markup

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Hero visual presence | None | One visual element in the right column on desktop | `preview_snapshot` of `.course-overview__visual` |
| Hero column count (desktop) | 1 | 2 | `preview_inspect .course-overview__grid` `display`/`grid-template-columns` |
| Hero stack order (mobile) | N/A | Text first, visual after | `preview_resize` preset `mobile` then `preview_snapshot` |
| Heading preserved | "From Campus to Career in 4 Days" | Same heading text present | `preview_snapshot` text check |
| Facts grid preserved | 6 facts | 6 facts | `preview_snapshot` count |
| Positioning paragraph preserved | Present | Present | `preview_snapshot` text check |
| Console errors | 0 | 0 | `preview_console_logs` |
| Token compliance | N/A | Zero hardcoded hex or px values in new CSS rules | Grep new rules in `style-v4.css` for `#` and raw `px` |
| WCAG AA contrast (stats card if B-1) | N/A | >= 4.5:1 normal, >= 3:1 large | `preview_inspect` computed colours, manual contrast check |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Desktop hero | Two columns: text left, visual right | `preview_screenshot` at default desktop width |
| Tablet hero | Layout adapts cleanly | `preview_resize` preset `tablet` then `preview_screenshot` |
| Mobile hero | Vertical stack, visual after text, heading + any CTA above the fold at 375x812 | `preview_resize` preset `mobile` then `preview_screenshot` |
| Visual slot content | Renders the chosen placeholder (stats card / generated image / reused image) | `preview_snapshot` |
| No regression | Heading, subtitle, facts grid, positioning paragraph all still visible | `preview_snapshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| New CSS uses tokens only | Grep new rules for `#` and raw `px` | Zero matches |
| Footer version tag updated | Read `course.html` `footer__version` | Reads `v4` (or next version number) |
| Archive files exist | `ls cargonomics-site/css/style-v3.css cargonomics-site/course-v3.html` | Both present |
| Console clean | `preview_console_logs` | No errors |

### Documentation Checks

- [ ] PRD_00_Index.md updated by orchestrator (NOT this agent)
- [ ] Git commit by orchestrator: `feat(website): PRD 19 - course hero visual anchor`
- [ ] Git push to GitHub Pages by orchestrator
- [ ] `docs/deferred-items.md` cross-reference stub added (one line, not a duplicate of the OQ entry)
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Two-column grid breaks the existing facts grid layout | Medium | Medium | Read existing rules first (R-3); scope new grid to `.course-overview__grid` and leave `.course-overview__facts` rules untouched |
| Visual on mobile pushes CTA below the fold | Medium | Medium | A-2 explicitly orders visual AFTER text on mobile; verify on 375x812 viewport |
| Placeholder visual looks worse than no visual | Medium | Low | Recommend B-1 (stats card) which has zero asset dependency and reinforces messaging; B-2 and B-3 are explicit alternatives |
| Final imagery from Marilyn and Sophia takes longer than expected | Low | Medium | Slot accepts either content type; swap is a file replacement, no structural change |
| Nano Banana output is off-brand if B-2 chosen | Medium | Medium | Prompt brief locks palette (navy + gold) and context (Vietnam shipping training); fall back to B-1 if output is poor |
| Skipping Version Management archive step | High | Low | Phase 5 of Task-Optimized Structure pins this as a sequential WRITE step before any HTML/CSS edits |
| Duplicate tracker entry across `open-questions.md` and `deferred-items.md` | Low | Medium | Tracker Discipline rule: deferred-items stub is a one-line "See OQ#NN" pointer, not a duplicate. Verify in R-8. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` (Marilyn's hero feedback context)
- `CLAUDE.md` (MVP scope, current status, Marilyn + Sophia context)
- `.claude/rules/website-conventions.md` (Version Management, Tracker Discipline)
- `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_05_Course_Page.md` (original course page PRD)
- `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_14_Social_Icons.md` (most recent reference PRD)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD |
