# PRD 06: Contact & Application Form Page

> **Order:** 6
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 2 (Brand Token Activation & Font Fix)
> **Blocks:** PRD 7 (Multi-Page Navigation), PRD 8 (Form Backend & Submission Pipeline)
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

The application form is the primary conversion point for the entire MVP website. Every page, every CTA, every marketing link funnels here. If a student visits the homepage, reads the course page, and decides to apply, this is where that intent becomes a lead. If the form is confusing, broken, or missing fields, the entire upstream effort is wasted. This page is the commercial engine of the MVP.

Marilyn and Vasso agreed during the April 8 kickoff that the form needs qualification fields to filter serious candidates from casual browsers. Three qualification questions (availability on bootcamp dates, full-week commitment, day/evening schedule preference) were explicitly discussed. These fields do double duty: they give Marilyn the data she needs to triage applicants, and they signal to students that this is a selective process, reinforcing the course-as-vetting positioning. The form must also capture source attribution (UTM parameters, referrer URL, landing page) from day one. When the Airtable CRM goes live, historical lead data must already have tracking metadata. Retrofitting attribution after launch means losing the most valuable early leads.

Field naming is not arbitrary. Every `name` attribute on every form input must match the snake_case conventions in `airtable-conventions.md` (section 2). If the form field is `fullName` but Airtable expects `full_name`, the migration script breaks or requires a mapping layer. This page also serves a secondary purpose: general contact inquiries for non-bootcamp services (coaching, consulting). The homepage markup notes (lines 109-113) specify inquiry buttons next to side offerings. A `form_source` hidden field distinguishes "main-application" from "inquiry" submissions.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| No `contact.html` file | No dedicated application or contact page exists |
| Homepage has a `#contact` anchor section | Single-page anchor, not a full form page with qualification fields |
| Airtable field mapping defined in `airtable-conventions.md` section 4.1 | Spec exists but no form implements it yet |
| Hidden field requirements defined in markup notes (lines 175-192) | Spec exists but no hidden inputs exist in the codebase |
| Qualification fields agreed in April 8 kickoff | Three fields verbally confirmed but not yet built |
| Inquiry buttons specified for side services (markup notes lines 109-113) | No inquiry form exists |

---

## Desired Outcomes

### Section A: Page Structure and Chrome -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **`contact.html` exists and loads without errors** | No dedicated form page exists | Page loads at `localhost:3456/contact.html` with zero console errors | None |
| A-2 | **Shared chrome matches other pages** | Inconsistent nav/footer breaks trust | Nav, footer, floating buttons identical to `index.html`. No desktop modal or mobile sticky bar. | Check existing form CSS patterns in `style-v2.css` |

### Section B: Application Form -- 5 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Application form with all visible fields** | No way to collect applicant data | 7 visible fields: full_name, email, phone, available_on_bootcamp_dates, full_week_available, day_or_evening_work_schedule, notes. All labelled. | Read `airtable-conventions.md` section 4.1 for exact field names |
| B-2 | **Hidden fields for tracking and attribution** | Lead source data lost without tracking | 10 hidden inputs: utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, referrer, landing_page, form_source (pre-set to "main-application") | None |
| B-3 | **HTML5 client-side validation** | Invalid submissions waste Marilyn's review time | `required` on mandatory fields, `type="email"` and `type="tel"`, phone `pattern` for Vietnamese format, validation styling scoped to post-interaction | Research `:user-invalid` browser support and Vietnamese phone format regex |
| B-4 | **Success and error state markup** | No user feedback on submission | Success message area ("Application submitted, review within 5 business days") and error area ("Something went wrong, try WhatsApp"), both hidden by default | None |
| B-5 | **Autocomplete attributes for mobile usability** | Mobile users re-type info already stored on their phone | `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` on relevant fields | Verify correct autocomplete token strings per HTML spec |

### Section C: Inquiry Form and Contact Info -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **General inquiry form for non-bootcamp contacts** | No path for coaching/consulting inquiries | Separate, shorter form with name, email, inquiry topic (select), message. `form_source` set to "inquiry". No bootcamp qualification fields. | None |
| C-2 | **Contact information and social links on page** | Visitors who prefer messaging cannot find alternatives | Zalo, WhatsApp, email address visible on page (not just floating buttons). Office address: 268 To Hien Thanh Street, Hoa Hung Ward, HCMC. | None |
| C-3 | **Exclusivity and scarcity language in page copy** | Form feels transactional without positioning | Introductory copy frames application as selective. "Limited spots", "selected students" appear naturally. No scarcity language inside form labels. | Review `06-client-comms/client-brief.md` for voice |

**B-1 field details:**
- All `name` attributes use snake_case per `airtable-conventions.md` section 2
- Qualification fields use select or radio: Yes / No / Unsure (availability, commitment); Day / Evening / Flexible / Not Working (schedule)
- Phone field accepts both local (0xx) and international (+84xx) formats

**B-3 validation details:**
- Custom `title` attributes on patterned fields explain expected format
- `aria-describedby` links each field to its validation hint for screen readers
- Validation error styles do not trigger on page load (use `:user-invalid` or JS-gated class)

---

## What This PRD Does NOT Cover

- Form backend or submission processing (PRD 8 scope, this PRD builds HTML form and validation only)
- Payment or billing forms (bootcamp is free for students)
- Login or account creation
- File upload fields (no resume uploads for MVP)
- UTM parameter parsing and population logic (PRD 11 tracking script provides the hidden input values)
- Email autoresponders or confirmation emails (post-MVP)
- CAPTCHA or bot protection (execution-time decision, may be added in PRD 8 or PRD 12)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | CREATE | New contact/application page with both forms |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | MODIFY | Add form-specific styles (validation states, field grouping) if not already covered |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/SPRINT_02_PAGES.md` | Sprint shared context |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Lines 175-192: form spec, qualification fields, tracking. Lines 109-113: inquiry buttons. |
| `06-client-comms/client-brief.md` | Copy voice, exclusivity positioning, no em dashes |
| `03-project-management/airtable-conventions.md` | Section 2: naming conventions (snake_case). Section 4.1: form-to-Airtable field mapping. Section 4.2: inquiry form backend. |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Existing nav/footer chrome. Any existing form patterns or CSS classes. |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Existing form, input, button, validation styles to reuse |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | CSS custom properties for brand colours |
| `06-client-comms/meeting-transcript-2026-04-08.md` | Search for "qualify", "form", "mailto", "UTM" for exact requirements |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`, keyboard navigation testing |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all Agent Context files. Extract field names from `airtable-conventions.md` section 4.1. Check for existing form CSS patterns in `style-v2.css`. |
| 2 | `[READ-ONLY]` | Research phone number regex for Vietnamese format. Check for existing `<form>` elements in `index.html`. Identify reusable form CSS classes. |
| 3 | `[READ-ONLY]` | Generate 5 proactive items. Report to orchestrator before proceeding. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Create `contact.html` with document structure, `<head>`, shared chrome (nav, footer, floating buttons). |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Build main application form with all visible fields, hidden fields, validation attributes, and autocomplete attributes. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Build success and error message areas. Add introductory copy with exclusivity language. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Build general inquiry section with shorter form. Set `form_source` to "inquiry". |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Add contact info section (address, Zalo, WhatsApp, email). Add `data-section`, `data-slot`, `data-elementor-widget` attributes. |
| 9 | `[WRITE]` `[SEQUENTIAL]` | Add form-specific CSS if needed (validation states, focus styles, error styling). |
| 10 | `[READ-ONLY]` | Visual verification: form renders, tab through fields, test required validation, check brand colours, no console errors. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Airtable field naming | Read `airtable-conventions.md` section 4.1 line by line. Every form `name` attribute must match snake_case conventions. | Mismatched names create mapping bugs during CRM migration. |
| R-2 | Vietnamese phone format | Mobile: 10 digits starting with 0 (e.g., 0901234567). International: +84 followed by 9 digits. Decide regex for `pattern` attribute. | Regex must accept both local and international without rejecting non-Vietnamese applicants. |
| R-3 | Vietnam data privacy (PDPD) | Decree 13/2023/ND-CP requires consent for personal data collection. Check if a consent checkbox is legally required. | A consent checkbox is low-cost to add and builds trust even if not strictly mandatory. |
| R-4 | HTML5 validation UX | Research `:user-invalid` CSS support, custom validation messages, focus management. Avoid red borders on page load. | Default HTML5 validation triggers before interaction in some browsers, feels hostile. |
| R-5 | Existing form patterns | Check `index.html` for any `<form>` elements or form-related CSS classes. Reuse established patterns. | Duplicate form CSS wastes space and creates inconsistency. |
| R-6 | Single-page vs multi-step form | 7 visible fields plus 3 qualification questions may feel long on mobile. Evaluate visual length. | Multi-step adds JS complexity. Single-page is simpler for static HTML. Decide at execution time. |
| R-7 | Success state UX | Same-page success message vs redirect to thank-you section. A separate page enables GA4 conversion tracking via pageview. | PRD 8 handles actual submission. This PRD builds the visual states. |
| R-8 | `autocomplete` token values | Verify correct token strings: `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` per HTML spec. | Wrong tokens (e.g., "fullname" instead of "name") prevent browser autofill. |

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
- [ ] Form field `name` attributes match `airtable-conventions.md` snake_case exactly
- [ ] Hidden tracking fields present and ready for PRD 11 population
- [ ] Form `action` set to placeholder that PRD 8 will replace with real backend URL
- [ ] Main application and inquiry forms are separate `<form>` elements

---

## Design & Code Quality

- [ ] BEM naming convention (block__element--modifier)
- [ ] No hardcoded colour, font, or spacing values (use `var(--token-name)`)
- [ ] Semantic HTML (`<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<select>`, `<textarea>`)
- [ ] Accessible (labels via `for`/`id`, `aria-describedby` for validation hints, `aria-required="true"`)
- [ ] Vanilla JS only (no jQuery, no framework dependencies)
- [ ] Performant (no heavy assets)
- [ ] No em dashes in any text content (use commas, colons, or shorter sentences)
- [ ] Form fully keyboard-navigable (tab order follows visual order)
- [ ] Validation styles do not trigger on page load

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Page loads | No `contact.html` exists | Loads at `localhost:3456/contact.html` with zero errors | `preview_console_logs` |
| Visible fields present | N/A | All 7 visible fields present and labelled | `preview_snapshot` |
| Hidden fields present | N/A | All 10 hidden fields in the DOM | `grep -c 'type="hidden"' contact.html` returns >= 10 |
| Field names match Airtable | N/A | Every `name` attribute uses snake_case matching section 4.1 | Manual: compare to mapping table |
| Required validation works | N/A | Empty submit shows validation errors | `preview_click` submit then `preview_snapshot` |
| Exclusivity language | N/A | "Limited spots", "selected students", or equivalent visible | Manual: read page copy |
| Social links visible | N/A | Zalo, WhatsApp, email prominent on page | `preview_snapshot` |
| Shared chrome matches | N/A | Nav, footer, floating buttons identical to `index.html` | Visual comparison via `preview_screenshot` |
| Data attributes | N/A | All sections have `data-section` attributes | `grep -c "data-section" contact.html` |
| Keyboard navigable | N/A | Tab moves through all fields in logical order | Manual: keyboard test |
| Inquiry form present | N/A | Separate inquiry form with `form_source` = "inquiry" | `grep "inquiry" contact.html` |
| Success/error states | N/A | Both message areas present in HTML | `grep -c "success\|error" contact.html` |
| Autocomplete attributes | N/A | Present on name, email, phone fields | `grep -c "autocomplete" contact.html` returns >= 3 |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Form renders | Both forms display with brand colours, proper field grouping | `preview_screenshot` |
| Mobile layout | Form fields stack cleanly on mobile viewport | `preview_resize` preset "mobile" then `preview_screenshot` |
| Validation states | Required field errors appear styled, not default browser | Submit empty form via `preview_click`, then `preview_screenshot` |
| Inquiry form | Visually secondary to main form, clearly separated | `preview_snapshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No console errors | `preview_console_logs` | Zero errors |
| Hidden fields | `grep 'type="hidden"' contact.html` | At least 10 matches |
| Field names | `grep 'name="' contact.html` | All snake_case, matching airtable-conventions.md |
| Autocomplete | `grep 'autocomplete=' contact.html` | At least 3 matches |
| No hardcoded hex | `grep -E "#[0-9a-fA-F]{3,6}" contact.html` | Zero matches outside `<head>` |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 06 - contact page with application form and qualification fields`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Form field names do not match Airtable conventions | CRM migration requires a mapping layer, adding complexity | Medium | Read `airtable-conventions.md` section 4.1 line by line before naming fields. Cross-reference at Phase 10. |
| Phone regex too restrictive | International or non-standard format applicants blocked from submitting | Medium | Use permissive regex accepting 8-15 digits with optional `+` prefix. Show `title` hint for format guidance. |
| PDPD consent requirement missed | Legal risk collecting personal data without consent | Low | Add consent checkbox as safe default. Low cost, builds trust. |
| Form feels too long on mobile | Applicants abandon mid-form from scroll fatigue | Medium | Group fields with `<fieldset>` and `<legend>`. Personal info in one group, qualification in another. |
| Validation styles trigger on page load | Red borders before interaction makes page feel hostile | Medium | Use `:user-invalid` or add `.form--submitted` class via JS on first submit attempt. |
| Backend not connected (PRD 8 pending) | Form submits but nothing happens, confusing testers | High | Set `action="#"` and `method="POST"`. Add JS handler that prevents default and shows success message. PRD 8 replaces with real backend. |
| Two forms create visual clutter | Page feels busy with main and inquiry forms | Low | Make inquiry form visually secondary: smaller, lighter background, below main form with clear divider. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` (lines 175-192: form spec)
- `03-project-management/airtable-conventions.md` (field naming and mapping)
- `06-client-comms/client-brief.md` (copy voice and positioning)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, 138 lines) |
| 2026-04-10 | All | Full rewrite with expanded outcomes, research, risks |
| 2026-04-10 | All | Template-compliant rewrite: added header block, session note, research-first mandate, lettered outcome sections with requirement tables, files to create/modify table, MCP servers table, task-optimized structure, proactive items table, success criteria with current/target columns, split verification checklist, and related documents section |
