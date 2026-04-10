# PRD 11: UTM Tracking & Attribution

> **Order:** 11
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 6 (Contact Form, hidden fields exist), PRD 10 (GTM dataLayer exists)
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

Cargonomics is launching its first bootcamp on June 1 with a free training model where revenue comes from placement fees paid by hiring companies. Every applicant has a direct path to revenue, which means every form submission needs full marketing attribution: which channel, which campaign, which ad brought this person. Without attribution, Vasso cannot prove ROI on any future ad spend, cannot optimize acquisition channels, and cannot report to Elias which marketing investments are working.

The reference implementation is the HandL UTM Grabber v3 WordPress plugin (at `C:\Users\vasso\Downloads\UTM Grabber\handl-utm-grabber-v3\js\handl-utm-grabber.js`), which Vasso has used on past projects. It captures UTM parameters, click IDs, referrer data, and landing page URLs, persists them in cookies, auto-fills hidden form fields, and decorates outbound links. Since the MVP is a static HTML site (not WordPress), this PRD specifies a vanilla JavaScript equivalent that replicates the critical features without the jQuery dependency or WordPress infrastructure.

The script must integrate with two other systems: the hidden form fields from PRD 6 (where attribution data gets submitted alongside the application) and the GTM dataLayer from PRD 10 (where attribution data gets forwarded to GA4). This three-layer architecture (capture in JS, persist in cookies, forward via dataLayer) ensures attribution survives page navigation, form submission, and the eventual WordPress migration.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Hidden form fields in `contact.html` (PRD 6) | Fields exist but nothing populates them |
| GTM dataLayer (PRD 10) | dataLayer exists but no attribution events are pushed |
| HandL UTM Grabber v3 source code (local) | jQuery-dependent, WordPress-specific, too large for static site |
| No cookie-based attribution | UTM parameters in URLs are lost on page navigation |
| No traffic source classification | Cannot distinguish paid vs organic vs social vs direct |

---

## Desired Outcomes

### Section A: URL Parameter Capture & Persistence -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **UTM and click ID parameters captured from URL and stored in cookies** | Parameters lost on navigation | Visit with `?utm_source=test`, navigate to another page, cookie persists | Cookie scoping on GitHub Pages (`path=/cargonomics/`) |
| A-2 | **First-touch and last-touch attribution maintained** | Cannot tell original vs most recent source | First-touch cookies never overwritten; last-touch cookies update on new UTM visits | None |

**A-1 details (parameters to capture):**
- Standard UTM: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- Google Ads: `gclid`; Facebook: `fbclid`; Microsoft Ads: `msclkid`
- Cookie expiry: 30 days (configurable constant)
- Cookies use `SameSite=Lax` and `Secure` flags

**A-2 details:**
- Last-touch cookies (e.g., `utm_source`) update on every UTM visit
- First-touch cookies (e.g., `first_utm_source`) set once, never overwritten
- If a visit has no UTM parameters, neither set is modified

### Section B: Traffic Intelligence -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Traffic source classified** | Cannot segment paid vs organic vs social vs direct | `traffic_source_type` cookie set with correct classification | Include Vietnam-relevant engines (Coc Coc, Baidu) and social (Zalo) |
| B-2 | **Landing page and referrer tracked** | No entry point data | `landing_page`, `referrer`, `referrer_domain` cookies set on first visit | None |

**B-1 classification logic (evaluated in order):**
1. Paid: click ID present OR `utm_medium` contains "cpc", "ppc", "paid"
2. Organic: referrer matches search engine (Google, Bing, Yahoo, DuckDuckGo, Baidu, Coc Coc)
3. Social: referrer matches social network (Facebook, Instagram, LinkedIn, Twitter/X, YouTube, Zalo, TikTok)
4. Email: `utm_medium` contains "email" or "newsletter"
5. Referral: referrer exists but no match above
6. Direct: no referrer and no UTM parameters

### Section C: Form & dataLayer Integration -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Hidden form fields auto-filled from cookies** | UTM data not submitted with applications | Hidden inputs with matching names get cookie values | Verify field name matching logic (name, id, class, data-name) |
| C-2 | **Attribution data pushed to GTM dataLayer** | GA4 and future tags cannot see attribution data | `attribution_loaded` event in dataLayer with all UTM data | Verify dataLayer exists before pushing (defensive) |
| C-3 | **GA Client ID captured from GA4 cookie** | Cannot link form submissions to GA4 sessions | `ga_client_id` cookie populated (or "unavailable" if GA blocked) | GA cookie format and async timing with GA4 |

### Section D: Script Quality -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Non-blocking script loading** | Attribution script must not delay page render | Script loaded with `defer`, under 5KB minified | None |
| D-2 | **Internal link decoration** | Attribution lost when navigating between static pages | `.utm-out` links have UTM parameters appended to `href` | None |

---

## What This PRD Does NOT Cover

- Server-side attribution or fingerprinting
- Cross-device attribution (requires user login)
- Multi-touch attribution modelling (first-touch and last-touch are sufficient)
- Custom analytics dashboard or attribution report
- Cookie consent banner UI (researched in PRD 10, built separately if required)
- Airtable integration for attribution data (CRM Phase 1 scope)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/js/attribution.js` | CREATE | Standalone attribution script: UTM capture, cookies, form fill, dataLayer push, link decoration |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Add `<script defer>` tag for attribution script |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | MODIFY | Add `<script defer>` tag |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Add `<script defer>` tag |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Add `<script defer>` tag |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules |
| `C:\Users\vasso\Downloads\UTM Grabber\handl-utm-grabber-v3\js\handl-utm-grabber.js` | Reference implementation. Study cookie logic, form filler, link decorator, traffic classification. Ignore jQuery and WordPress integrations. |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | Form with hidden fields to auto-fill. Verify field names match cookie names. |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_10_Analytics_GTM.md` | GTM dataLayer spec. Attribution data pushes to same dataLayer. |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_08_Form_Backend.md` | Form submission pipeline. UTM data must be included in every submission. |
| `03-project-management/airtable-conventions.md` | Field naming conventions that cookie names must match |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"`, cookie and console inspection |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read HandL UTM Grabber source. Read `contact.html` hidden fields. Read PRD 10 dataLayer format. Read PRD 8 submission flow. |
| 2 | `[READ-ONLY]` | Verify cookie scoping on GitHub Pages. Check CookieStore API support. Confirm `SameSite=Lax` behaviour. |
| 3 | `[READ-ONLY]` | Generate 5 proactive items based on codebase audit and HandL source review |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Create cookie helper functions: `getCookie`, `setCookie`, `deleteCookie`, `getCookieDomain` |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Implement URL parameter capture, first/last-touch logic, referrer detection, traffic classification, landing page tracking |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Implement GA cookie reader with retry/delay mechanism |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Implement hidden field auto-fill and link decoration |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Implement `attribution_loaded` dataLayer push. Add `<script defer>` to all 4 pages. |
| 9 | `[READ-ONLY]` | Test with `?utm_source=test&utm_medium=cpc`. Verify cookies, form auto-fill, dataLayer, link decoration, first-touch persistence. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | HandL UTM Grabber v3 source | Identify MVP-critical features vs post-MVP. Note jQuery dependency and WordPress integrations to exclude. | Reference implementation guides scope decisions. |
| R-2 | Cookie scoping on GitHub Pages | GitHub Pages uses shared `github.io` domain. Does `path=/cargonomics/` scope cookies correctly? | Cookies could leak to other repos on same subdomain. |
| R-3 | Cookie scoping on custom domain | When site moves to `cargonomics.com.vn`, does auto-detection handle apex and www subdomain? | Must work seamlessly after domain migration. |
| R-4 | CookieStore API vs document.cookie | Check browser support for CookieStore API (Safari, older mobile browsers in Vietnam). | If support insufficient, stick with `document.cookie` wrapper. |
| R-5 | Vietnam PDPD and attribution cookies | Are UTM/click ID cookies classified as tracking cookies requiring consent? | May require consent check before setting cookies. |
| R-6 | Race condition with GA4 cookie | `_ga` cookie may not exist when attribution script runs on first page load. | Need delay or retry mechanism for GA Client ID. |
| R-7 | SameSite cookie behaviour | Does `SameSite=Lax` work for the form submission flow when backend is cross-origin? | Cookies must be readable by page JS, not sent cross-origin. |
| R-8 | Coc Coc browser compatibility | Verify `URLSearchParams`, `document.cookie`, DOM manipulation work in this popular Vietnamese browser. | Script uses only standard APIs but Coc Coc may have quirks. |

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
| UTM cookies set on visit with parameters | No cookies | `utm_source`, `utm_medium` cookies present | Browser DevTools > Application > Cookies |
| Hidden fields auto-filled | Fields empty | Hidden inputs populated from cookies | Inspect hidden `<input>` elements in DevTools |
| UTM data in spreadsheet after submission | No UTM data | `utm_source`, `utm_medium` columns populated | Submit form, check spreadsheet |
| Traffic source classification | N/A | Correct `traffic_source_type` cookie for organic, direct, paid, social | Visit from different referrers, check cookie |
| First-touch persistence | N/A | `first_utm_source` unchanged after second visit with different UTM | Two visits with different params, check cookie |
| `attribution_loaded` in dataLayer | N/A | Event with all UTM data in `window.dataLayer` | Console: `window.dataLayer.filter(e => e.event === 'attribution_loaded')` |
| Link decoration | N/A | `.utm-out` links have UTM params appended | Inspect link `href` in DevTools |
| GA Client ID captured | N/A | `ga_client_id` cookie populated or "unavailable" | Check cookie in DevTools |
| Script loaded deferred | N/A | `<script defer>` on all 4 pages | `grep 'defer' *.html` |
| Script size | N/A | Under 5KB minified | `wc -c` on minified file |
| No console errors | N/A | Zero errors on any page | `preview_console_logs` |
| No jQuery in script | N/A | Zero matches for `jQuery`, `$`, external imports | `grep` script source |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| No visual impact | Attribution script should not change page appearance | `preview_screenshot` before and after |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| Script loaded on all pages | `grep 'attribution.js' *.html` | 4 matches |
| No jQuery dependency | `grep -i 'jquery\|\\$(' js/attribution.js` | Zero matches |
| Cookie names match form fields | Compare cookie names in script to `name` attributes in `contact.html` | Exact match |
| Namespace used | `grep 'CargoAttribution\|window.CargoAttribution' js/attribution.js` | Script exposes a namespaced object |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 11 - UTM tracking and attribution`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Cookie scoping on GitHub Pages leaks to other repos | Attribution data pollution | Medium | Set `path=/cargonomics/` for GitHub Pages. Switch to `path=/` on custom domain. Test cross-page persistence. |
| Script size exceeds 5KB | Performance concern for mobile | Medium | Prioritize MVP-critical features only. Defer link decoration and advanced classification if needed. |
| Race condition with GTM/GA4 | GA Client ID unavailable on first load | Medium | Retry with 1-second delay, then fallback to "unavailable". Check dataLayer existence before pushing. |
| Ad blockers suppress cookies | Some browsers block tracking-named cookies | Medium | Script fails silently (console.warn, not throw). Consider localStorage fallback for form auto-fill. |
| Form field name mismatch with PRD 6 | Auto-fill silently fails, UTM data lost | Medium | Coordinate with PRD 6 to ensure names are identical to cookie names. Document required names in both PRDs. |

---

## Related Documents

- `C:\Users\vasso\Downloads\UTM Grabber\handl-utm-grabber-v3\js\handl-utm-grabber.js` (reference implementation, first 100 lines)
- `03-project-management/airtable-conventions.md` Section 4: form field to Airtable mapping

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, research table, proactive items table, verification checklist |
