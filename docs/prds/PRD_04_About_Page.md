# PRD 04: About Page

> **Order:** 4
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

Cargonomics is a new brand with no public track record. The first bootcamp launches June 1, 2026, and the students driving traffic to this site have never heard of the company. When a student lands on the homepage, sees the training offer, and gets interested, their next question is "Who are these people?" The About page answers that question. Without it, the student must decide whether to apply based on a homepage alone, with no company profile, no leadership credentials, and no explanation of why a shipping company is offering free training.

The credibility gap is real. Cargonomics has no Google reviews, no press coverage, no alumni testimonials. What it does have is Elias Abraham: 25+ years in global shipping, former CEO of ZIM Shipping Vietnam, MD of Cargonomics, Executive Director of the Anne Hill Education Group, and operator of a portfolio spanning roughly 11 projects. That personal track record is the company's strongest trust signal. The About page converts Elias's individual reputation into institutional credibility by framing Cargonomics as the education arm of an established executive with deep industry connections.

Marilyn explicitly requested this page during the April 8 kickoff: "I think there should be one about the company profile as well." No copy has been provided by Marilyn. The agreed workflow is that Vasso drafts, Marilyn edits. The copy written here is draft quality, structured for Marilyn to revise. The three-pillar model (Coaching, Connecting, Consulting) also belongs here, explaining narratively why these three pillars exist, how they interconnect, and what each delivers. This reinforces the course-as-vetting positioning by showing that Coaching is the entry point to a larger ecosystem.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| No `about.html` file | Page does not exist. Marilyn requested it in the April 8 kickoff. |
| Homepage has `<section class="trainers-v2">` with leadership content | Existing content can be extracted and adapted, but it lives on the homepage only. |
| No Elias headshot in `assets-from-marilyn/` | Profile card will need a placeholder image. |
| No copy from Marilyn for this page | All content must be Vasso-drafted from known facts, marked as placeholder for Marilyn to edit. |
| Nav links in `index.html` do not include About | Navigation needs to be updated (PRD 7 handles cross-page nav, but About page itself needs correct local nav). |

---

## Desired Outcomes

### Section A: Page Foundation -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **`about.html` exists and loads correctly** | No About page exists | File renders at `http://localhost:3456/about.html` without errors. Page-specific `<title>`, `<meta description>`, Open Graph tags present. Stylesheet chain matches `index.html`. | None |
| A-2 | **Shared chrome matches index.html** | About page must feel like part of the same site, not a standalone document | Nav, footer, floating action buttons (Zalo, WhatsApp), mobile sticky CTA identical to `index.html`. About link marked as active page. | Check nav active state convention in `index.html` (`.nav-link--active` or equivalent) |

### Section B: Content Sections -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Company profile section** | Students need to know who Cargonomics is and why they should trust this new brand | Section covers: what Cargonomics does, founding context, gap it fills, AHEG connection, physical address. Copy voice is student-first, confident, course-as-vetting. No em dashes. | Cross-reference `CLAUDE.md`, `client-brief.md`, and `abraham-elias-profile.md` for factual accuracy |
| B-2 | **Three-pillar model section (Coaching, Connecting, Consulting)** | Homepage introduces pillars visually; About page must explain them narratively | Each pillar described with its purpose and connection to the others. Card or column layout, visually distinct but connected. Section reusable on other pages. | None |
| B-3 | **Leadership/trainer profiles section** | No credibility signals without leadership credentials visible | Elias Abraham profile card with verified bio (25+ years, former CEO ZIM, MD Cargonomics, AHEG Exec Director). Placeholder slots for additional trainers. Repeatable card component. | Check `assets-from-marilyn/` for Elias headshot. Verify bio facts against multiple sources. |

### Section C: Quality & Structure -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **All content draft quality, all placeholders marked** | No copy from Marilyn; structure must be production-ready even if words change | Every placeholder text block has `<!-- PLACEHOLDER: description -->` HTML comment. Elias bio uses verified facts. Partner profile is a generic placeholder. | None |
| C-2 | **All sections modular with data attributes** | WordPress migration requires structured sections | Every `<section>` has `data-section`, key elements have `data-slot`, widget types annotated with `data-elementor-widget`. | None |

---

## What This PRD Does NOT Cover

- A detailed team directory with full staff profiles (deferred page in full 10-page scope)
- A timeline or company history (Cargonomics is too new for a meaningful timeline)
- Social proof elements like testimonials or logos (no data exists yet)
- Course-specific content (that is PRD 5, Course/Program page)
- The unknown partner's profile beyond a placeholder slot (no details available)
- Responsive layout tuning (that is PRD 12)
- Multi-page navigation wiring (that is PRD 7)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/about.html` | CREATE | Full About page: `<head>` block, nav, company profile section, three-pillar section, leadership profiles section, CTA section, footer, floating buttons |

---

## Agent Context

| File | Purpose |
|------|---------|
| `06-client-comms/client-brief.md` | Company context, stakeholder bios, copy voice (course-as-vetting, exclusivity, student-first) |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Source for shared chrome (nav, footer, floating buttons). Trainers section for existing leadership content. |
| `CLAUDE.md` | People section (Elias, Marilyn details). Business pillars. Anne Hill connection. Portfolio of ~11 projects. |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Marilyn's comment requesting the About page. Confirms page is in MVP scope. |
| `01-research/cargonomics-brand-identity.pdf` | Brand guide R2 for visual reference. Confirms colour palette and typography. |
| `01-research/abraham-elias-profile.md` | Detailed Elias profile for bio accuracy. Career history, titles, achievements. |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Token definitions for styling. Orbitron/Open Sans, Navy Blue/Gold. |
| `05-deliverables/website-prototype/cargonomics-site/docs/design-system.md` | PRD 1 output. Data attribute conventions, BEM rules, section modularity. |

### MCP Servers (only include relevant ones)

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification: page loads, nav active state, sections present, brand colours, console errors |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` `[PARALLEL]` | Read `index.html` for shared chrome (nav, footer, `<head>` block). Read trainers section for existing leadership content. Read `client-brief.md` for copy voice. Read `CLAUDE.md` People section. Read `abraham-elias-profile.md` for bio. Read `design-system.md` for data attribute conventions. |
| 2 | `[READ-ONLY]` `[SEQUENTIAL]` | Check `assets-from-marilyn/` for Elias headshot. Verify nav active state convention. Cross-reference Elias bio across three sources. Determine AHEG relationship framing. Generate 5 proactive items. Report before proceeding. |
| 3 | `[WRITE]` `[SEQUENTIAL]` | Create `about.html` shell: `<head>` block, nav, footer, floating buttons copied from `index.html`. Set page-specific `<title>`, `<meta description>`, Open Graph tags. Mark "About" nav link as active. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Add company profile section with mission, founding context, AHEG connection, physical address. Apply `data-section="company-profile"` and content slot attributes. Mark placeholders. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Add three-pillar section (Coaching, Connecting, Consulting) with narrative descriptions. Apply `data-section="three-pillars"`. Card/column layout. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Add leadership section with Elias profile card (verified bio) and placeholder slots. Apply `data-section="leadership"`. Use `<article>` for cards. |
| 7 | `[WRITE]` `[PARALLEL]` | Add bottom-of-page CTA pointing to Course or Contact page. Add any new CSS rules to `style-v2.css` using BEM and tokens only. |
| 8 | `[READ-ONLY]` `[SEQUENTIAL]` | Visual check: page loads, nav active state correct, all sections present, Elias profile visible, brand colours applied. Console check for errors. Verify shared chrome matches `index.html`. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Marilyn's About page copy | Check WhatsApp/email for any draft copy or bullet points sent since April 8 | If Marilyn sent content, use it instead of drafting from scratch |
| R-2 | Existing trainer content | Extract leadership content from `index.html` trainers section (line 482+). Adapt for About page. | Reusing approved content saves time and ensures consistency |
| R-3 | Elias bio accuracy | Cross-reference `CLAUDE.md`, `client-brief.md`, and `abraham-elias-profile.md` for titles, years, highlights | Inaccurate bio on About page undermines the page's credibility purpose |
| R-4 | Elias headshot availability | Check `assets-from-marilyn/` for headshot. Check `marilyn-deliverables-checklist.md`. | Profile card without photo looks incomplete. Need placeholder strategy. |
| R-5 | AHEG relationship framing | Confirm how explicitly to describe the Anne Hill Education Group connection. Parent company? Sibling entity? | Framing affects credibility. Must be described accurately. |
| R-6 | Nav active state convention | Check current nav in `index.html` for active page class (`.nav-link--active` or equivalent) | About page must mark "About" as active. Wrong class creates inconsistency. |

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
| Page exists and loads | No `about.html` | Renders at `localhost:3456/about.html` without errors | `preview_snapshot` |
| Shared chrome matches | N/A | Nav, footer, floating buttons identical to `index.html` | Visual comparison of both pages |
| Nav active state | N/A | "About" link visually marked as current page | `preview_inspect` on About nav link for active class |
| Company profile section | N/A | Section with mission, founding context, AHEG connection | `preview_snapshot`, search for relevant text |
| Three pillars displayed | N/A | Coaching, Connecting, Consulting as three distinct cards/columns | `preview_screenshot` of section |
| Elias profile present | N/A | Card with "Abraham Y. Elias", "25+ years", "ZIM Shipping" | `preview_snapshot`, search for "Elias" |
| All sections have data-section | N/A | Every `<section>` has `data-section` attribute | Grep `about.html` for `<section` tags |
| Brand tokens applied | N/A | Orbitron headings, Open Sans body, Navy Blue + Gold | `preview_inspect` on heading and body elements |
| No hardcoded colours | N/A | Zero hex values in new inline styles or CSS | Grep new CSS for `#[0-9A-Fa-f]` outside comments |
| No console errors | N/A | Zero errors on page load | `preview_console_logs` level=error |
| Placeholders marked | N/A | Every placeholder has `<!-- PLACEHOLDER: -->` comment | Grep `about.html` for `PLACEHOLDER` |
| Profile cards repeatable | N/A | Adding a trainer requires HTML copy only, no CSS changes | Duplicate Elias card HTML, change text, verify rendering |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Page loads correctly | No errors, all sections visible | `preview_snapshot` |
| Brand colours applied | Navy Blue nav, Gold accents, correct fonts | `preview_screenshot` |
| Elias profile card | Photo/placeholder, name, titles, bio visible | `preview_screenshot` of leadership section |
| Three pillars layout | Three distinct cards/columns for Coaching, Connecting, Consulting | `preview_screenshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| Data attributes present | Grep `about.html` for `data-section` | Match on every `<section>` tag |
| Placeholders marked | Grep `about.html` for `PLACEHOLDER` | At least 3 placeholder comments |
| No hardcoded colours | Grep new CSS for raw hex values | Zero matches outside token files |
| Heading hierarchy | Read `about.html` for heading tags | Single `<h1>`, `<h2>` for sections, `<h3>` for cards |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 04 - About page with company profile and leadership`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| No copy from Marilyn by execution time | All content is Vasso-drafted, increasing revision cycles | High | Write confident draft copy from `client-brief.md` and `CLAUDE.md`. Mark every section with clear placeholder comments. Structure so copy swaps without layout changes. |
| Elias bio inaccuracy | Error in titles, years, or highlights undermines the page's credibility purpose | Medium | Cross-reference three sources before writing. Flag any discrepancies for Vasso to resolve before publishing. |
| No Elias headshot available | Profile card looks incomplete without a photo | Medium | Use professional placeholder (initials in brand-coloured circle). Add headshot to Marilyn's deliverables checklist if missing. |
| Shared chrome drifts from index.html | PRD 3 modifies nav/footer on index.html in parallel; About page copy becomes stale | Medium | Copy chrome from index.html at start. PRD 7 (Multi-Page Navigation) normalizes across all pages after Sprint 2. |
| AHEG relationship described incorrectly | Saying "subsidiary" when AHEG is separate entity could be a reputational issue | Low | Use neutral phrasing: "operates under the leadership of Abraham Y. Elias, who also serves as Executive Director of the Anne Hill Education Group." Avoid corporate structure claims. |

---

## Related Documents

- `06-client-comms/client-brief.md`: Copy voice, stakeholder bios, brand constraints
- `06-client-comms/homepage-markup-notes-2026-04-08.md`: Marilyn's request for the About page
- `01-research/abraham-elias-profile.md`: Detailed Elias profile for bio accuracy
- `CLAUDE.md`: People section, three-pillar model, AHEG connection

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (original version) |
| 2026-04-10 | Full | Expanded with content specs, copy voice guidance, profile card pattern, risks |
| 2026-04-10 | Full rewrite | Restructured to match mandatory template. Added header block, session note, research-first mandate, lettered outcome sections (A-C) with requirement tables, proactive items table, success criteria with Current/Target columns, split verification checklist, related documents. Consolidated 8 outcomes into 7 across 3 lettered sections. |
