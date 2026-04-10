# PRD 03: Homepage Restructure

> **Order:** 3
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

The current `index.html` is a single-page prototype that Marilyn reviewed line by line during the April 8 kickoff. Her feedback was specific, section by section, and captured in `homepage-markup-notes-2026-04-08.md`. The overall layout and structure were approved. Her critique was about images and colours, not layout. This means the restructure is surgical, not a redesign: remove two sections, swap one element, reorder one section, add social icons and inquiry buttons.

The homepage is the first thing students see when driven to the site during the bootcamp marketing push ahead of the June 1 launch. Every section that dilutes the training message (past conferences, a 3-minute AI explainer video) costs attention and weakens the conversion path to the application form. Marilyn explicitly said "less is better for now" about the conference section and "not at this stage" about the video. These are decisions captured in the meeting transcript, not suggestions.

The Coach/Connect/Consult section moving up is strategic. It introduces the three-pillar model early, framing Cargonomics as more than a bootcamp provider before the visitor scrolls to Programs. Inquiry buttons next to side service offerings create a secondary conversion path for visitors who are not students but are interested in coaching or consulting. This mirrors the `form_source` field in the Airtable schema, distinguishing "main_application" from "inquiry_coaching" and "inquiry_consulting".

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `<section class="conference-v2">` with past courses content | Marilyn said "less is better for now." Section dilutes training focus. |
| Hero section contains a video iframe or play button overlay | Marilyn said the AI explainer video is "not at this stage." Video elements remain in DOM. |
| Play button click handler in `script.js` (approx. lines 227-253) | Orphaned JS for removed video will cause console errors if DOM elements are gone. |
| `<section class="pillars-v2">` sits at line 118, below the fold | Marilyn wants Coach/Connect/Consult moved higher on the page, closer to above-the-fold. |
| Footer has LinkedIn link only | Marilyn wants Zalo + Facebook icons added alongside existing LinkedIn. |
| No inquiry buttons next to side service offerings | Marilyn wants small inquiry forms/buttons for coaching and consulting streams. |
| Pillars section uses `id="about"` | Potential conflict with the new `about.html` page (PRD 4). Internal links to `#about` may break. |

---

## Desired Outcomes

### Section A: Content Removal -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Conference/past courses section removed from DOM** | Section dilutes training message; Marilyn decision: "less is better for now" | `<section class="conference-v2">` not present in `index.html`. Not hidden with CSS, not commented out. Deleted. | None |
| A-2 | **AI explainer video block removed from DOM** | Video is "not at this stage" per Marilyn. Iframe/play button elements remain unnecessarily. | No video `<iframe>`, play button overlay, or video wrapper divs in hero section | None |
| A-3 | **Video play button JS cleaned up** | Orphaned event listeners and DOM references cause console errors when elements are removed | `script.js` has no references to removed video/play button elements. Zero console errors. | Verify exact line range of play button handler in `script.js` before deletion |

### Section B: Layout Changes -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Hero video replaced with hero image** | Right side of hero split layout shows a video that is being removed; needs a visual replacement | `<img>` element in hero right-side container with `width`, `height`, `alt`, `loading="lazy"`. Placeholder image source until Marilyn sends DepositPhotos picks. | Decide placeholder strategy: branded rectangle vs 3D shipping reference from Marilyn |
| B-2 | **Coach/Connect/Consult section moved up** | Pillars section sits too far below the fold, missing early framing opportunity | `<section class="pillars-v2">` appears immediately after hero in DOM order. `id` attribute updated to avoid conflict with About page anchor. | Check for internal links pointing to `#about` that would break after rename |

### Section C: New Elements -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Social icons in footer (Zalo, Facebook, LinkedIn)** | Only LinkedIn link exists; Zalo is dominant messaging platform in Vietnam | All three icons visible in footer, using inline SVG for token-based colour theming. Each has `aria-label`. | Find Zalo SVG icon (not in standard icon libraries). Check Zalo brand guidelines. |
| C-2 | **Inquiry buttons next to side service offerings** | No secondary conversion path for non-student visitors interested in coaching/consulting | "Inquire" button/link next to each side offering with `data-form-source` matching Airtable schema values | Coordinate interaction pattern with PRD 8 (form backend): anchor link vs inline form vs modal |

### Section D: Integrity Verification -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Vietnam section unchanged and rendering correctly** | Must confirm this section survives restructure intact | Section renders with brand tokens, content unchanged | None |
| D-2 | **Desktop modal and mobile sticky bar still functional** | DOM changes could break existing interactive components | Desktop inquiry modal opens/closes. Mobile sticky CTA visible at narrow viewport. Zero JS errors. | None |

---

## What This PRD Does NOT Cover

- Changing hero copy or headline text (copy refinement is a separate concern)
- Replacing stock images with final DepositPhotos assets (that is PRD 9)
- Building the form backend for inquiry buttons (that is PRD 8)
- Responsive layout adjustments (that is PRD 12)
- Implementing the rotating/flipping animation on Coach/Connect/Consult (parked for post-MVP)
- Dead CSS cleanup for removed sections (that is PRD 12)
- Multi-page navigation wiring (that is PRD 7, which depends on this PRD)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Remove conference section, remove video block, replace video with image, reorder pillars section, add social icons to footer, add inquiry buttons, verify data attributes |
| `05-deliverables/website-prototype/cargonomics-site/js/script.js` | MODIFY | Remove video play button handler and orphaned DOM references |

---

## Agent Context

| File | Purpose |
|------|---------|
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Authoritative section-by-section spec from Marilyn's April 8 feedback. Single source of truth for changes. |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Current homepage source. Primary write target. |
| `05-deliverables/website-prototype/cargonomics-site/js/script.js` | Video play button logic to remove. Must verify no other handlers break. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Check for `.conference-v2` rules. Do not delete CSS (cleanup is PRD 12). |
| `06-client-comms/assets-from-marilyn/3d-shipping-reference-marilyn-whatsapp.jpeg` | Visual reference for hero imagery. May be used as temporary placeholder. |
| `06-client-comms/client-brief.md` | Copy voice (course-as-vetting, exclusivity). Informs inquiry button labels. |
| `03-project-management/airtable-conventions.md` | `form_source` field values for inquiry streams. Buttons must use matching values. |
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens |

### MCP Servers (only include relevant ones)

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification: section removal, hero image, social icons, inquiry buttons, console errors, mobile sticky bar |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` `[PARALLEL]` | Read `homepage-markup-notes-2026-04-08.md` for spec. Read `index.html` for current section structure and hero markup. Read `script.js` for video handler location. Read `airtable-conventions.md` for `form_source` values. |
| 2 | `[READ-ONLY]` `[SEQUENTIAL]` | Research: Zalo SVG icon sources. Hero placeholder strategy. Inquiry button interaction pattern. Verify `script.js` video handler line range. Check anchor link conflicts for `#about`. Generate 5 proactive items. Report before proceeding. |
| 3 | `[WRITE]` `[SEQUENTIAL]` | Remove `<section class="conference-v2">` and AI explainer video block from `index.html`. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Replace video iframe/play button with `<img>` in hero section. Set placeholder source, `width`, `height`, `alt`, `loading="lazy"`. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Move `<section class="pillars-v2">` to immediately after hero. Update `id` attribute to avoid anchor conflict. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Remove video play button handler and orphaned references from `script.js`. |
| 7 | `[WRITE]` `[PARALLEL]` | Add Zalo, Facebook, LinkedIn inline SVG icons to footer with `aria-label` attributes. |
| 8 | `[WRITE]` `[PARALLEL]` | Add inquiry buttons next to side service offerings with `data-form-source` attributes. |
| 9 | `[WRITE]` `[PARALLEL]` | Verify or apply `data-section`, `data-slot`, `data-elementor-widget` on all remaining sections. |
| 10 | `[READ-ONLY]` `[SEQUENTIAL]` | Visual verification: conference gone, video gone, hero has image, pillars moved up, social icons in footer, inquiry buttons visible. Console check. Desktop modal + mobile sticky bar functional. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Updated Marilyn feedback | Check WhatsApp/email for any additional homepage changes since April 8 | Acting on stale notes risks rework |
| R-2 | Zalo SVG icon source | Search official Zalo brand resources. Zalo is not in Font Awesome, Heroicons, or Lucide. | Footer social links look incomplete without Zalo. Dominant messaging platform in Vietnam. |
| R-3 | Hero placeholder strategy | Decide: branded rectangle, 3D shipping reference (`assets-from-marilyn/3d-shipping-reference-marilyn-whatsapp.jpeg`), or generic placeholder | Placeholder must look intentional, not broken. WhatsApp-quality image is not production-grade. |
| R-4 | Inquiry button form target | Confirm: anchor link to contact page, inline form, or modal. Coordinate with PRD 8. | Interaction pattern affects both this PRD and PRD 8 (form backend). |
| R-5 | script.js video handler lines | Verify exact line range of play button handler (estimated 227-253) before deletion | Deleting wrong lines breaks other functionality |
| R-6 | Section reorder anchor conflicts | Check if internal links point to `#about` (current pillars section id). Moving section + having About page creates conflicts. | Broken anchor links are a silent UX failure |
| R-7 | CSS positional selectors | Grep `style-v2.css` for `:first-child`, `:last-child`, `+`, `~` selectors targeting sections | Section reorder may break CSS that depends on DOM position |

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
| Conference section | Present in DOM | Removed from DOM entirely | `preview_snapshot`, search for "conference" |
| Hero visual | Video iframe / play button | `<img>` element with placeholder | `preview_snapshot` of hero area |
| Pillars section position | Below fold (line 118+) | Immediately after hero | Read `index.html`, verify section order |
| AI explainer video | Present in DOM | Removed entirely | `preview_snapshot`, search for video elements |
| Social icons in footer | LinkedIn only | Zalo + Facebook + LinkedIn, all with `aria-label` | `preview_screenshot` of footer; grep for `aria-label` |
| Inquiry buttons | None | Visible next to side offerings with `data-form-source` | `preview_snapshot` |
| JS console errors | 0 | 0 (no orphaned handlers) | `preview_console_logs` level=error |
| Vietnam section | Intact | Still intact with brand colours | `preview_screenshot` of section |
| Desktop modal | Functional | Still functional | `preview_click` test |
| Mobile sticky bar | Functional | Still functional at narrow viewport | `preview_resize` mobile, `preview_screenshot` |
| Orphaned JS references | Video handler in script.js | Zero video references | Grep `script.js` for video selectors |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Conference section gone | No past courses content visible | `preview_snapshot` |
| Hero shows image, not video | Image element visible in hero right side | `preview_screenshot` |
| Pillars section near top | Coach/Connect/Consult visible early in scroll | `preview_screenshot` |
| Social icons in footer | Three icons visible with correct spacing | `preview_screenshot` of footer |
| Inquiry buttons visible | "Inquire" buttons next to offerings | `preview_snapshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No conference section | Grep `index.html` for `conference-v2` | Zero matches in `<section>` tags |
| No video elements | Grep `index.html` for `<iframe` and play button classes | Zero matches |
| No orphaned JS | Grep `script.js` for video/play button selectors | Zero matches |
| Data attributes present | Grep `index.html` for `data-section` | Match on every `<section>` tag |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 03 - Homepage restructure per Marilyn feedback`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Section reorder breaks positional CSS (`:first-child`, `+`, `~`) | Layout glitch on sections after reorder | Medium | Grep `style-v2.css` for positional selectors targeting sections. Fix any that break. |
| Removing video handler breaks other JS | Shared variables or event delegation causes errors | Medium | Read full `script.js` context around video handler. Identify shared variables. Test after removal. |
| Zalo SVG icon not available in standard libraries | Footer social links look incomplete | Medium | Search Zalo official brand resources. Fall back to "Z" text icon in a branded circle if no SVG found. |
| Hero placeholder looks broken or unfinished | Marilyn sees an incomplete page | Medium | Use branded placeholder (Navy Blue background, Gold text) rather than broken image icon or low-res photo. |
| Anchor link `#about` conflicts with About page | Internal links break or land in wrong place | Medium | Rename pillars section `id` to `id="pillars"`. Update any internal links that referenced `#about`. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md`: Authoritative section-by-section spec
- `06-client-comms/meeting-transcript-2026-04-08.md`: Full meeting transcript with Marilyn quotes
- `03-project-management/airtable-conventions.md`: `form_source` values for inquiry streams

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (original version) |
| 2026-04-10 | Full | Expanded with 10 outcomes, research items, task structure, risks |
| 2026-04-10 | Full rewrite | Restructured to match mandatory template. Added header block, session note, research-first mandate, lettered outcome sections (A-D) with requirement tables, proactive items table, success criteria with Current/Target columns, split verification checklist, related documents. Consolidated 10 outcomes into 9 across 4 lettered sections. |
