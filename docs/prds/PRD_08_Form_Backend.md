# PRD 08: Form Backend & Submission Pipeline

> **Order:** 8
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 6 (Contact & Application Form Page)
> **Blocks:** PRD 12 (Responsive & Accessibility)
> **Sprint:** 3
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

The application form is the only conversion mechanism on the MVP website. Without a working backend, the site collects zero data from the students who will drive traffic to it for the June 1 bootcamp. Marilyn reviews applications manually in the early phase, so the data must land somewhere she can access immediately, not in a database she cannot see. The backend must also handle two distinct form streams: the main bootcamp application form and the side-service inquiry forms (coaching, consulting). Both feed the same data store, distinguished by a `form_source` field, so Marilyn sees all inbound leads in a single view.

Source attribution is non-negotiable from day one. Vasso has committed to tracking UTM parameters, referrer URLs, and form source identifiers on every submission. If the first 50 applicants arrive without tracking metadata, that data is gone forever. When the Airtable CRM goes live after the MVP, every column in the spreadsheet must map cleanly to the CRM schema defined in `airtable-conventions.md`. Renaming or re-mapping columns after the fact means lost context and manual cleanup.

The form must not reload the page on submission. A full-page reload loses the user's scroll position, breaks the feeling of a modern site, and makes error recovery harder. An in-page thank-you message on success and an in-page error message on failure are the minimum acceptable UX. The thank-you message carries scarcity language reinforcing the "limited spots" positioning.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `contact.html` form markup (PRD 6) | Form has visible and hidden fields but no submission handler |
| No backend configured | Submissions go nowhere; zero data capture |
| Airtable conventions doc specifies snake_case field keys | No spreadsheet exists yet to receive data |
| Homepage inquiry buttons (PRD 3) | No backend wired for side-service inquiry forms |
| No thank-you or error states | User gets no feedback after clicking submit |

---

## Desired Outcomes

### Section A: Backend Selection & Configuration -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Serverless form backend receives submissions** | No data capture exists | Test submission appears in data store with all visible fields populated | Evaluate Google Apps Script, FormSubmit.co, Formspree, Basin against selection criteria |
| A-2 | **Data column names match Airtable CRM schema** | Future CRM migration requires zero re-mapping | Every column uses the snake_case key from `airtable-conventions.md` Section 2 | Verify chosen backend preserves column names from JSON payload |
| A-3 | **CORS accepts GitHub Pages and future custom domain** | Form fails silently if CORS blocks the request | Submissions succeed from both `vassovass.github.io` and future `cargonomics.com.vn` | Test CORS headers during research phase |

**A-1 details (selection criteria, priority order):**
- Data lands in a spreadsheet Marilyn can open without technical help
- All hidden fields (UTM params, referrer, form source, timestamp) arrive as distinct columns
- Free tier supports at least 50 submissions per month
- Supports AJAX/fetch POST without page reload

**A-2 details (required column mapping):**

| Form field (visible) | Spreadsheet column | Airtable target |
|---|---|---|
| Full Name | `full_name` | Full Name |
| Email | `email` | Email |
| Phone | `phone` | Phone |
| Available on bootcamp dates | `available_on_bootcamp_dates` | Available On Bootcamp Dates |
| Full week commitment | `full_week_available` | Full Week Available |
| Day or evening work schedule | `day_or_evening_work_schedule` | Day Or Evening Work Schedule |
| Message / notes | `notes` | Notes |

| Hidden field | Spreadsheet column | Airtable target |
|---|---|---|
| UTM source | `utm_source` | UTM Source |
| UTM medium | `utm_medium` | UTM Medium |
| UTM campaign | `utm_campaign` | UTM Campaign |
| UTM term | `utm_term` | (future use) |
| UTM content | `utm_content` | (future use) |
| Referrer URL | `referrer_url` | (custom field) |
| Form source | `form_source` | Form Source |
| Submission timestamp | `submitted_at` | Submitted Date |

### Section B: Submission UX -- 4 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **No page reload on form submission** | Reload breaks scroll position and feels dated | Page URL unchanged, scroll preserved, form replaced by thank-you | None |
| B-2 | **Thank-you confirmation on success** | No user feedback after submission | Thank-you message visible with scarcity language, Zalo/WhatsApp links | None |
| B-3 | **Error message on failure with retry** | Silent failures lose applicants | Error message visible, form fields retain values, submit button re-enabled | None |
| B-4 | **Timestamp on every submission** | Cannot sort or filter by submission time | `submitted_at` column populated with ISO 8601 datetime | Verify if backend auto-timestamps or if JS must provide it |

### Section C: Multi-Stream & Privacy -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Both form streams distinguished** | Cannot tell application from inquiry | `form_source` values differ: `main_application`, `inquiry_coaching`, `inquiry_consulting`, `inquiry_general` | None |
| C-2 | **GDPR/PDPD privacy notice visible** | Legal risk for international applicants | Single-line privacy text below submit button on all forms | Check Vietnam PDPD requirements for form consent |

---

## What This PRD Does NOT Cover

- Building a custom server or API endpoint
- Sending automated confirmation emails to applicants (post-MVP)
- Admin notification emails on new submissions (nice-to-have, not required)
- Airtable integration (that is CRM Phase 1, separate scope)
- Anti-spam measures beyond basic validation (honeypot fields are acceptable if time permits)
- File upload (no resume uploads for MVP)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/js/form-submit.js` | CREATE | Standalone form submission handler with fetch, thank-you, error states |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Wire form to submission script, add thank-you/error DOM elements, add privacy notice |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Wire homepage inquiry buttons to same backend with distinct `form_source` values |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | Form markup, hidden fields, field names |
| `03-project-management/airtable-conventions.md` | Section 2 (naming) and Section 4 (form-to-Airtable mapping) |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Lines 109-113: inquiry buttons next to side services |
| `06-client-comms/client-brief.md` | Copy voice for thank-you message (exclusivity, scarcity, confidence) |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Homepage inquiry forms that post to this backend |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"` |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read `contact.html` form markup, hidden fields, `airtable-conventions.md` Sections 2 and 4, `index.html` inquiry buttons |
| 2 | `[READ-ONLY]` | Research serverless form backends, test CORS from GitHub Pages, evaluate against selection criteria |
| 3 | `[READ-ONLY]` | Generate 5 proactive items based on codebase state and research findings |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Configure chosen backend (create spreadsheet, deploy script or sign up for service, set CORS whitelist) |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Create `js/form-submit.js` with fetch submission, thank-you state, error state. Wire to `contact.html`. |
| 6 | `[WRITE]` `[PARALLEL with Phase 5]` | Wire homepage inquiry buttons to same backend with distinct `form_source` values. Add privacy notice. |
| 7 | `[READ-ONLY]` | Test: submit 5+ entries across both form streams. Verify columns, names, timestamp. Verify thank-you and error states. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Google Apps Script as form backend | Can a Google Apps Script web app accept JSON POST from a cross-origin fetch on GitHub Pages? What CORS headers does it return? | Leading candidate because it writes directly to a Google Sheet Marilyn can access. CORS is the key risk. |
| R-2 | FormSubmit.co hidden field support | Does FormSubmit.co pass through custom hidden fields as distinct columns, or does it flatten/strip them? | If hidden fields are stripped, FormSubmit.co is disqualified regardless of other advantages. |
| R-3 | Free tier submission limits | Current free tier limits for Formspree, Basin, FormSubmit.co. Do limits reset monthly or are they lifetime? | MVP traffic is low, but May marketing push could spike submissions. Need headroom. |
| R-4 | Spreadsheet column ordering | Does the chosen backend preserve column order from the JSON payload, or alphabetize? | Marilyn reads the spreadsheet manually. Logical column ordering matters for usability. |
| R-5 | Vietnamese phone number format | Vietnamese mobile numbers are 10 digits starting with 0. International format is +84. Determine right `pattern` attribute. | Consistent format prevents duplicates when migrating to Airtable. |

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
| Form submission reaches data store | No backend exists | Test submission appears with all fields | Submit form, check spreadsheet |
| Hidden fields arrive as distinct columns | N/A | UTM, referrer, form_source, timestamp each have own column | Inspect spreadsheet after test submission |
| Column names match Airtable conventions | N/A | Every column uses snake_case key from conventions doc | Compare headers to `airtable-conventions.md` |
| No page reload on submission | N/A | URL unchanged, scroll preserved | `preview_screenshot` before and after submission |
| Thank-you message displays | N/A | Thank-you div visible, form hidden, scarcity language present | `preview_snapshot` |
| Error message displays on failure | N/A | Error div visible, fields retain values, submit re-enabled | Disconnect network, attempt submission |
| Both form streams distinguished | N/A | Different `form_source` values in spreadsheet | Submit from both forms, check column |
| Timestamp on every row | N/A | `submitted_at` populated with ISO 8601 | Inspect spreadsheet |
| No JS console errors | N/A | Zero errors during submission flows | `preview_console_logs` |
| Privacy notice visible | N/A | Single-line text below submit button | `preview_snapshot` |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Thank-you state | Confirmation message visible, form hidden | `preview_snapshot` |
| Error state | Error message visible, form fields retained | `preview_snapshot` |
| Privacy notice | Single-line text below each form | `preview_snapshot` |
| Submit button disabled during request | Button text changes and is non-clickable | `preview_screenshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No hardcoded backend URL in HTML | `grep -r "formsubmit\|formspree\|script.google" contact.html index.html` | Zero matches (URL is in JS only) |
| snake_case field names | `grep 'name="' contact.html` | All name attributes use snake_case |
| Form submit script loaded | `grep 'form-submit.js' contact.html` | Script tag present |
| ARIA live regions | `grep 'role="alert"\|role="status"' contact.html` | At least one of each |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 08 - form backend and submission pipeline`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Free tier submission limit exceeded during May marketing push | Submissions silently dropped or rejected | Medium | Monitor usage. Google Apps Script has no submission limit, only execution quotas (90 min/day free tier). |
| CORS rejection from GitHub Pages origin | Form submissions fail silently | Medium | Test CORS during research phase before committing to a backend. Google Apps Script handles CORS natively. |
| Google Sheet sharing permissions block Marilyn | She cannot access the spreadsheet | Low | Share with marilyn.leong@cargonomics.com.vn during setup. Use their Microsoft 365 email if Google sharing is blocked. |
| Double submissions from impatient users | Duplicate rows in spreadsheet | Medium | Disable submit button immediately on click. Re-enable only on error. |
| Network timeout on slow Vietnamese mobile connections | User sees no feedback, assumes failure, retries | Medium | Set reasonable fetch timeout (10 seconds). Show loading indicator. On timeout, show error with retry option. |

---

## Related Documents

- `03-project-management/airtable-conventions.md` Section 4: Website Form to Airtable Mapping
- `06-client-comms/homepage-markup-notes-2026-04-08.md` Lines 109-113: inquiry button behaviour

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, research table, proactive items table, verification checklist |
