# PRD 05: Course/Program Page

> **Order:** 5
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 2 (Brand Token Activation & Font Fix)
> **Blocks:** PRD 7 (Multi-Page Navigation)
> **Sprint:** 2
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

The WYDLS ("What You Didn't Learn at School") bootcamp is the flagship product launching June 1, 2026. It is the sole revenue source for the Coaching pillar, and the entire CRM, placement pipeline, and company-side sales motion depend on it producing qualified graduates. The homepage Programs section teases the course with a featured card and a horizontal curriculum marquee using 3D flip-card animations, but that format is designed for visual impact, not for a prospective student deciding whether to commit to a week-long intensive. A dedicated course page gives the program its own URL that every marketing link, social post, WhatsApp share, and Zalo message can point to.

This is the page Marilyn will send to university career centres, the page Elias will forward to industry contacts, and the page Google will index when someone searches "shipping logistics training Vietnam." Without it, the homepage does double duty as brand showcase and course detail page, and it does neither well. The copy positioning must reinforce the course-as-vetting angle from the April 8 kickoff: the bootcamp is not open enrollment but a selection mechanism where students are chosen, the course filters for quality, and top graduates get direct placement access with hiring companies. This framing does the commercial heavy lifting because it positions free training as exclusive rather than cheap, and it gives companies confidence that graduates have been pre-vetted.

Marilyn was asked to provide a course PDF (deliverable 2b, due Friday April 10). If it has arrived by execution time, it is the authoritative source for curriculum details, schedule, and positioning language. If it has not arrived, the executing agent drafts from the homepage marquee content, client-brief.md positioning notes, and the kickoff transcript, then marks copy sections with "[Marilyn to confirm]" placeholders.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Homepage Programs section with 6-module flip-card marquee | Built for visual impact, not decision-making. No room for descriptions or schedule. |
| No `course.html` file | Students have no dedicated URL to land on from marketing links or social shares. |
| Homepage has Course JSON-LD structured data | Schema.org `Course` markup exists but is embedded in the homepage, not on a dedicated page. |
| Course PDF may or may not exist in `assets-from-marilyn/` | Authoritative copy source is uncertain. Agent must check at execution time. |
| Homepage CTA buttons link to `#contact` anchor | No cross-page link to a contact/application form exists yet. |

---

## Desired Outcomes

### Section A: Page Structure and Chrome -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **`course.html` exists and loads without errors** | No dedicated course URL exists | Page loads at `localhost:3456/course.html` with zero console errors | None |
| A-2 | **Page meta tags are course-specific** | Duplicate meta from homepage hurts SEO | Unique `<title>` and `<meta description>` referencing the WYDLS bootcamp | None |
| A-3 | **Shared chrome matches other pages** | Inconsistent nav/footer breaks user trust | Nav, footer, floating Zalo/WhatsApp buttons identical to `index.html`. No desktop modal or mobile sticky bar. | Check if PRDs 3-4 have established a chrome pattern to copy from |

### Section B: Course Content -- 5 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Bootcamp overview section answers "What, Who, What do I get?"** | Students cannot find basic program info | Section heading names WYDLS, mentions free-for-students model, states 5-day intensive format, displays June 1 start date | Check if Marilyn's PDF has arrived for authoritative copy |
| B-2 | **Curriculum modules in a scannable static grid** | Flip-card marquee does not support reading | 6 modules (Shipping Landscape, Operations, Sales, Documentation, Legal/Ethics, Careers) in a 2-col desktop / 1-col mobile grid with title + 2-3 sentence description each | Extract module names from `index.html` marquee |
| B-3 | **"Who Should Apply" section with self-selection criteria** | Unqualified applications waste Marilyn's time | Section targets recent graduates, mentions no prior experience needed, references the selection process | None |
| B-4 | **Schedule and dates section** | Students do not know the daily structure | June 1 start date displayed, day-by-day or module-by-module overview, Day 5 dock/port visit highlighted | Check kickoff transcript for schedule details |
| B-5 | **PDF download link (if available) or placeholder** | Marilyn's PDF may be the preferred takeaway | If PDF exists in `assets-from-marilyn/`, downloadable link near overview. If not, placeholder comment and "[Brochure coming soon]" text. | Check `06-client-comms/assets-from-marilyn/` at execution time |

### Section C: Positioning and CTAs -- 4 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Two application CTAs linking to `contact.html`** | No conversion path from course page | One mid-page CTA (after curriculum or "Who Should Apply"), one bottom CTA. Gold accent styling. | None |
| C-2 | **Course-as-vetting language woven throughout** | Strategic differentiator lost if isolated | Selection/vetting phrasing in at least 3 sections (overview, "Who Should Apply", CTA copy) | Review `06-client-comms/client-brief.md` for exact positioning language |
| C-3 | **Exclusivity and scarcity language** | No urgency without scarcity signals | "Limited spots" near a CTA, "selected students" or "invitation to apply" in at least one section, cohort framing ("Q2 2026 cohort"). 2-3 references total, not more. | None |
| C-4 | **Placeholder sections for future content** | FAQ, trainers, testimonials have no structural home | FAQ stub (heading + 3-4 placeholder questions), instructor profiles stub, testimonials stub. Each is a valid `<section>` with `data-section` attributes. | None |

---

## What This PRD Does NOT Cover

- Course listing/index page (only one course for MVP, no listing needed)
- E-commerce or payment flow (training is free for Phase 1)
- Registration or account creation (applications go through `contact.html`)
- Detailed trainer biographies (placeholder only, full profiles post-MVP)
- Blog or resource articles related to the course
- Flexed co-working content (Flexed has no course offering)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/course.html` | CREATE | New course detail page with all sections |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | MODIFY | Add course-specific grid and section styles if not already covered by existing patterns |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/SPRINT_02_PAGES.md` | Sprint shared context |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Programs section marquee with 6 module titles. Nav/footer chrome to duplicate. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Existing grid/card patterns to reuse |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | CSS custom properties for brand colours, fonts, spacing |
| `06-client-comms/client-brief.md` | Course-as-vetting positioning, copy voice, exclusivity language |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Lines 197-201: course page requirements from the April 8 meeting |
| `06-client-comms/meeting-transcript-2026-04-08.md` | Kickoff transcript for copy voice reference and schedule details |
| `06-client-comms/marilyn-deliverables-checklist.md` | Check deliverable 2b (course PDF, due Friday April 10) status |
| `03-project-management/airtable-conventions.md` | Section 4.1: form field mapping. CTA links to `contact.html`, field names must be consistent. |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"` |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all Agent Context files. Extract 6 module titles and descriptions from `index.html` marquee. Check if Marilyn's course PDF has arrived in `assets-from-marilyn/`. |
| 2 | `[READ-ONLY]` | Check existing CSS grid/card patterns in `style-v2.css`. Identify reusable classes. Check `tokens-cargonomics.css` for accent colours. |
| 3 | `[READ-ONLY]` | Generate 5 proactive items based on codebase state and content findings. Report to orchestrator before proceeding. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Create `course.html` with document structure, `<head>`, Schema.org JSON-LD, shared chrome (nav, footer, floating buttons). |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Build bootcamp overview section with positioning copy. Draft or transcribe from PDF if available. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Build curriculum module grid (6 cards, static). Add "Who Should Apply" section. Add schedule/dates section. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Add mid-page and bottom CTAs. Add placeholder sections (FAQ, trainers, testimonials). Add PDF download link or placeholder. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Add `data-section`, `data-slot`, `data-elementor-widget` attributes. Add page-specific CSS if needed. |
| 9 | `[READ-ONLY]` | Visual verification via Claude Preview: page loads, grid renders, CTAs link correctly, brand colours applied, no console errors. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Course PDF from Marilyn | Check if deliverable 2b (due Friday April 10) has arrived in `06-client-comms/assets-from-marilyn/` | Marilyn's PDF is the primary content source. Drafting without it risks copy rewrites. |
| R-2 | Homepage curriculum content | Extract the 6 module titles and descriptions from the Programs section marquee in `index.html` | The grid layout needs the same module data in a different format. |
| R-3 | Bootcamp schedule details | Confirm whether morning/evening session options exist. Check kickoff transcript for daily schedule mentions. | Schedule section needs accurate time details or an explicit "[TBD]" marker. |
| R-4 | "Free for students" messaging | Training is free for Phase 1 (revenue from placement fees). Decide framing: "industry-sponsored" vs "no tuition fees" vs "free." | "Free" attracts bargain-hunters. "Industry-sponsored" attracts motivated students. |
| R-5 | Port facility visit details | Confirm dock visit is on Day 5. Identify facility name if known from kickoff transcript. | The dock visit is the most compelling differentiator. Specific detail strengthens it. |
| R-6 | Existing CSS grid patterns | Check `style-v2.css` for existing grid or card patterns reusable for the curriculum module grid. | Reusing patterns avoids duplicate CSS and keeps the stylesheet lean. |
| R-7 | Schema.org Course markup | Verify `startDate` and `courseMode` values in the homepage JSON-LD match latest confirmed details. | Structured data improves Google search visibility and enables rich results. |

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
- [ ] Curriculum grid uses a repeatable card pattern (easy to add/remove modules in WordPress)
- [ ] Placeholder sections are valid `<section>` elements that can be toggled visible in WordPress

---

## Design & Code Quality

- [ ] BEM naming convention (block__element--modifier)
- [ ] No hardcoded colour, font, or spacing values (use `var(--token-name)`)
- [ ] Semantic HTML (appropriate heading hierarchy, landmark elements, `<time datetime="2026-06-01">` for dates)
- [ ] Accessible (labels on form fields, alt on images, focus states, ARIA on icon-only buttons)
- [ ] Vanilla JS only (no jQuery, no framework dependencies)
- [ ] Performant (lazy-load below-fold images, font-display: swap, no layout shifts)
- [ ] No em dashes in any text content (use commas, colons, or shorter sentences)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Page loads | No `course.html` exists | Loads at `localhost:3456/course.html` with zero errors | `preview_start "cargonomics-mock"` then `preview_console_logs` |
| Curriculum grid | Marquee-only on homepage | 6 modules in static grid layout | `preview_snapshot` to check grid structure |
| Start date visible | Only in JSON-LD | "June 1, 2026" prominently displayed in page body | `preview_snapshot` to scan content |
| Application CTAs | No cross-page link | At least 2 CTA buttons linking to `contact.html` | `grep -c "contact.html" course.html` returns >= 2 |
| Vetting language | Not on any dedicated page | Selection/vetting phrasing in at least 3 sections | Manual: read page copy |
| Exclusivity phrasing | N/A | "Limited spots", "selected students", or equivalent visible | Manual: read page copy |
| Shared chrome | N/A | Nav, footer, floating buttons identical to `index.html` | Visual: side-by-side comparison via `preview_screenshot` |
| Data attributes | N/A | All sections have `data-section` attributes | `grep -c "data-section" course.html` returns >= 6 |
| Brand tokens | N/A | No hardcoded hex values in the HTML body | `grep "#[0-9a-fA-F]" course.html` returns none outside `<head>` |
| Schema.org data | Homepage-only | JSON-LD `Course` block in `<head>` | `grep '"@type": "Course"' course.html` returns 1 |
| Placeholder sections | N/A | FAQ, trainers, testimonials stubs exist as `<section>` elements | `grep -c "data-section" course.html` covers these |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Page renders | Course page loads with brand colours, no broken layout | `preview_screenshot` |
| Grid layout | 6 curriculum modules in 2-col (desktop) / 1-col (mobile) | `preview_resize` preset "mobile" then `preview_screenshot` |
| CTA visibility | Gold CTAs stand out against Navy page palette | `preview_inspect` on CTA buttons for computed background colour |
| Placeholder sections | FAQ, trainers, testimonials stubs visible or intentionally hidden | `preview_snapshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No console errors | `preview_console_logs` | Zero errors |
| Data attributes | `grep "data-section" course.html` | At least 6 matches |
| CTA links | `grep "contact.html" course.html` | At least 2 matches |
| No hardcoded hex | `grep -E "#[0-9a-fA-F]{3,6}" course.html` | Zero matches outside `<head>` meta tags |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 05 - course detail page with curriculum grid and vetting copy`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Marilyn's course PDF not received by execution time | Must draft all copy from homepage content and transcript. Risk of inaccurate details needing rewrites. | Medium | Draft from existing sources. Mark uncertain content with "[Marilyn to confirm]". Structure page so copy swaps without layout changes. |
| Module descriptions too thin without PDF | Grid cards look empty with only titles. | Medium | Write 2-3 sentence descriptions per module from homepage flip cards and industry knowledge. Mark as draft. |
| "Free" messaging attracts wrong audience | Emphasizing "free" too heavily draws unserious students. | Low | Frame as "industry-sponsored" or "fully funded by corporate partners." Pair with selection language. |
| Gold CTA buttons fail contrast check | Gold on white may not meet WCAG AA (4.5:1). | Medium | Use dark text on Gold background. Test contrast at execution time. Adjust Gold shade within brand tolerance if needed. |
| Schedule details not confirmed | Day-by-day breakdown may be inaccurate. | Medium | Use flexible format ("Day 1: Orientation and Shipping Landscape"). Include note: "Schedule subject to confirmation." |
| Page length feels too long with placeholders | FAQ, trainers, testimonials stubs add space with no content. | Low | Keep stubs minimal (heading + one-line placeholder). Consider hiding via CSS `display: none` with a comment for activation. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` (lines 197-201: course page spec)
- `06-client-comms/client-brief.md` (copy voice and positioning)
- `06-client-comms/meeting-transcript-2026-04-08.md` (kickoff transcript)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, 125 lines) |
| 2026-04-10 | All | Full rewrite with expanded outcomes, research, risks |
| 2026-04-10 | All | Template-compliant rewrite: added header block, session note, research-first mandate, lettered outcome sections with requirement tables, files to create/modify table, MCP servers table, task-optimized structure, proactive items table, success criteria with current/target columns, split verification checklist, and related documents section |
