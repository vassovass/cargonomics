# PRD 10: Analytics & GTM Setup

> **Order:** 10
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 2 (Brand Token Activation & Font Fix)
> **Blocks:** PRD 11 (UTM Tracking & Attribution), PRD 12 (Responsive & Accessibility)
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

The MVP website launches with zero measurement. Without analytics from day one, there is no baseline for traffic, user behaviour, or form conversion rates before the June 1 bootcamp starts driving real applicants. Vasso has 14+ years of digital marketing experience, and proper martech infrastructure is core competency, not an afterthought.

GA4 provides the measurement layer. GTM (Google Tag Manager) provides the tag management layer. The critical architectural decision is that GTM is the single point of tag management for everything: GA4 today, remarketing pixels when ad campaigns launch, conversion tracking when placement revenue begins, and any future third-party tags. Nothing gets hardcoded into the HTML. This separation means the analytics setup survives the WordPress migration intact: the GTM container ID stays the same, every tag and trigger configured inside GTM transfers automatically, and the only thing that changes is which CMS renders the GTM snippet.

This is also about demonstrating professional-grade delivery. Elias runs 11 projects and has seen plenty of websites built without measurement infrastructure. Shipping with analytics from day one signals that Vasso's work is strategic, not just cosmetic. It sets the standard for the retainer relationship.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Cloned prototype HTML | May contain legacy GA or tracking scripts from original |
| No GTM container | No tag management layer |
| No GA4 property | No measurement at all |
| No dataLayer | No structured event data for future tags |
| No event tracking | CTA clicks and form submissions are invisible |

---

## Desired Outcomes

### Section A: GTM Infrastructure -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **GTM container deployed on all 4 pages** | No tag management layer | GTM snippet in `<head>` and `<noscript>` after `<body>` on Home, About, Course, Contact | Verify current GTM snippet placement best practices |
| A-2 | **dataLayer initialized before GTM** | Custom events pushed before GTM loads could be lost | `window.dataLayer` is an array containing `page_type` on every page | None |
| A-3 | **No hardcoded tracking scripts remain** | Legacy scripts from cloned prototype | Zero matches for `google-analytics.com`, `gtag/js`, `analytics.js`, `ga.js` in HTML | Audit all 4 HTML files for existing tracking code |

**A-1 details:**
- Container snippet is identical across all 4 pages
- Container ID is a configurable value (easy to swap)
- GTM snippet does not block page rendering

**A-2 details:**
- `window.dataLayer = window.dataLayer || [];` appears before GTM snippet
- Initial push includes `page_type` (home, about, course, contact), `page_title`, and `brand` (cargonomics)

### Section B: GA4 Measurement -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **GA4 pageview fires on every page load** | No traffic measurement | GA4 Configuration tag status = "Fired" in GTM Preview | Confirm GA4 property creation flow and Measurement ID format |
| B-2 | **GA4 property owned by Cargonomics account** | Data loss if property is under Vasso's personal account | Both Vasso and Marilyn are property admins | Clarify if Cargonomics Google account exists or needs creation |

### Section C: Event Tracking -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **`form_submit` event fires on successful submission** | Cannot measure conversion rate | Event in dataLayer with `form_name` and `form_location` parameters | Coordinate with PRD 8 form success callback |
| C-2 | **`cta_click` event fires on primary CTAs** | Cannot measure engagement with key buttons | Event in dataLayer with `cta_text`, `cta_location`, `cta_destination` | None |

**C-1 details:**
- Event triggers from form success callback (PRD 8), not a generic form listener
- Avoids counting failed submissions

### Section D: Documentation -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **GTM setup reference document** | No record of what was configured | Document lists Container ID, Measurement ID, all tags/triggers/variables, WordPress migration notes | None |

---

## What This PRD Does NOT Cover

- Server-side GTM (web container is sufficient for MVP)
- Google Ads conversion tracking or remarketing pixels (post-launch)
- Facebook Pixel, LinkedIn Insight Tag, or any ad platform tags (added to GTM later)
- Custom dashboards or Looker Studio reports
- Cookie consent banner UI (researched here, built separately if needed)
- UTM parameter capture and attribution (that is PRD 11)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Add dataLayer init, GTM snippets, remove legacy tracking |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | MODIFY | Same GTM integration |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Same GTM integration |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Same GTM integration, form event wiring |
| `05-deliverables/website-prototype/cargonomics-site/js/analytics.js` | CREATE | dataLayer push utility function and custom event handlers |
| `05-deliverables/website-prototype/cargonomics-site/docs/gtm-setup.md` | CREATE | GTM configuration reference |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Homepage, check for legacy tracking code |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | Contact page, form event integration |
| `05-deliverables/website-prototype/cargonomics-site/js/script.js` | Existing JS, check for legacy analytics |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_08_Form_Backend.md` | Form submission callback for `form_submit` event |
| `06-client-comms/client-brief.md` | Vasso's digital marketing background, commercial context |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`, console checks |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Audit all 4 HTML files for existing tracking scripts. Read `script.js` for legacy analytics. Read PRD 8 for form callback integration. |
| 2 | `[READ-ONLY]` | Verify GTM snippet placement best practices. Confirm Enhanced Measurement features. Check Vietnam PDPD requirements. |
| 3 | `[READ-ONLY]` | Generate 5 proactive items based on audit findings |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Add `window.dataLayer` initialization to all 4 pages with page-level metadata |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Add GTM snippets to all 4 pages. Remove legacy tracking scripts found in Phase 1. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Create dataLayer push utility function. Add `cta_click` and `form_submit` event pushes. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Create GTM setup reference document |
| 8 | `[READ-ONLY]` | Verify GTM Preview fires all tags. Check `window.dataLayer` in console on each page. No console errors. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | GA4 property creation flow | Confirm setup wizard, Measurement ID format, whether a Cargonomics Google account should host the property | Property must be owned by the client, not the consultant |
| R-2 | GA4 property ownership | Does a Cargonomics Google account exist, or must one be created? | Avoids data lock-in under Vasso's personal account |
| R-3 | Enhanced Measurement features | Which events GA4 Enhanced Measurement captures automatically (scroll, outbound clicks, site search, video) | Avoids duplicate tracking of auto-captured events |
| R-4 | Vietnam PDPD consent requirements | Does PDPD require a consent mechanism for analytics cookies, or is "legitimate interest" sufficient? | If consent is required, GTM must support Consent Mode with delayed tag firing |
| R-5 | GA4 Consent Mode v2 | Is Consent Mode required or recommended for Vietnam traffic? | Google requires it for EU. May also apply to international applicants. |
| R-6 | Existing tracking scripts in prototype | Audit cloned prototype for legacy GA or tracking scripts that must be removed | Leftover scripts cause duplicate tracking and console errors |
| R-7 | GTM Preview and Tag Assistant | Confirm GTM Preview still uses Tag Assistant Chrome extension for debugging | Required for verification phase |

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
| GTM snippet on all pages | None | GTM container ID in `<head>` and `<noscript>` on all 4 pages | `grep` for GTM container ID across HTML files |
| dataLayer initialized | None | `window.dataLayer` array with `page_type` on every page | Browser console on each page |
| GA4 pageview fires | None | GA4 tag "Fired" on every page load | GTM Preview mode |
| `form_submit` event | None | Event in dataLayer after form submission | Browser console after submitting contact form |
| `cta_click` event | None | Event in dataLayer when clicking Apply Now | Browser console after clicking CTA |
| No legacy tracking scripts | Possibly present | Zero matches for legacy GA script URLs | `grep` for `google-analytics.com`, `gtag/js`, `analytics.js` |
| No console errors | Unknown | Zero GTM/GA4-related errors | `preview_console_logs` |
| Performance impact | Baseline | Less than 3-point Lighthouse drop | Lighthouse before and after |
| GTM docs exist | None | Document lists all tags, triggers, variables | File exists at `docs/gtm-setup.md` |
| Utility function used | None | All custom events use the same push function | `grep` for utility function name in JS files |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| No visual changes | GTM/analytics should not affect page appearance | `preview_screenshot` before and after |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| GTM in all pages | `grep -l "GTM-" index.html about.html course.html contact.html` | 4 files matched |
| No legacy scripts | `grep -r "google-analytics\|analytics.js\|ga.js\|gtag/js" *.html` | Zero matches |
| dataLayer init before GTM | Inspect HTML source order | `dataLayer` init appears before GTM snippet |
| Utility function exists | `grep "dataLayer.push" js/analytics.js` | Wrapped in utility function |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 10 - analytics and GTM setup`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| GA4 property created under wrong account | Cargonomics loses access to analytics data | Medium | Confirm or create Cargonomics Google account before property setup. Add both Vasso and Marilyn as admins. |
| Ad blockers suppress GTM entirely | Analytics data undercounts by 15-30% | High (by design) | Accept as known limitation. Do not attempt ad-blocker circumvention. Note undercount in reporting. |
| Vietnam PDPD requires cookie consent | Tag firing must be delayed until consent is granted | Medium | Research PDPD requirements. If needed, implement Consent Mode as a follow-up PRD. |
| Race condition: dataLayer not ready when GTM loads | Events pushed before GTM initializes could be lost | Low | dataLayer array init before GTM snippet guarantees buffering. GTM reads existing entries on load. |
| Lighthouse performance regression from GTM | GTM adds 20-50KB of JavaScript | Low | GTM loads async. Measure with Lighthouse before/after. Defer non-critical tags if needed. |

---

## Related Documents

- `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_08_Form_Backend.md` (form callback for `form_submit` event)
- `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_11_UTM_Tracking_Attribution.md` (attribution data pushes to same dataLayer)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, research table, proactive items table, verification checklist |
