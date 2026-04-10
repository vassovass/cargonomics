# PRD 12: Responsive Testing & Accessibility

> **Order:** 12
> **Status:** Proposed
> **Type:** QA
> **Dependencies:** PRD 7, PRD 8, PRD 9, PRD 10, PRD 11
> **Blocks:** PRD 13 (Deploy & Client Handoff)
> **Sprint:** 4
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

All 4 pages are built. Integrations (form backend, images, analytics, UTM tracking) are in place. Before the MVP ships to Marilyn, the entire site needs a comprehensive QA pass. Marilyn is a brand and integrated marketing professional. She will evaluate the prototype with a professional eye, on her own device, probably on her phone first. If a section clips on mobile, a form field is unlabelled, or the Gold-on-Navy contrast feels washed out, those are the first things she notices, and they undermine confidence in the build quality before she even reads the copy.

The June 1 bootcamp launch depends on this site converting student applicants. Accessibility is not a compliance checkbox. Students in HCMC browse on phones, often on slower connections. Touch targets, readable contrast, and keyboard-navigable forms directly affect whether someone finishes an application or bounces.

Every issue found in this QA pass gets fixed within this PRD. Nothing gets deferred to a "post-launch" list. The goal is zero known issues at handoff.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| 4 HTML pages (Home, About, Course, Contact) | Not yet tested at all 4 breakpoints |
| `tokens-cargonomics.css` with brand colours | Gold `#D4B468` on Navy `#11294B` may fail WCAG AA 4.5:1 for normal text |
| Muted text `#6C7A89` on Cream `#FAF9F6` | May fail 4.5:1 contrast ratio |
| Form on Contact page | Not verified for keyboard-only completion |
| No skip-navigation link | First-focusable element is unknown |
| All sections built by Sprint 2/3 PRDs | No cross-page consistency verification done |

---

## Desired Outcomes

### Section A: Responsive Layout -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **All 4 pages render correctly at 375px, 768px, 1200px, 1440px** | Untested layouts may clip, overflow, or break | No horizontal scrollbar, content stays in viewport, grids collapse cleanly | None |
| A-2 | **Touch targets meet 44x44px minimum on mobile** | Small targets cause misclicks on budget Android phones | All buttons, links, form inputs meet minimum size at 375px | None |

### Section B: Colour Contrast & Accessibility -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **WCAG AA colour contrast passes for all text** | Certain brand colour pairs may fail contrast ratios | All text-on-background combos pass 4.5:1 (normal) or 3:1 (large) | Check Gold on Navy, Muted on Cream specifically |
| B-2 | **Accessible markup verified** | Heading hierarchy, labels, alt text, focus, skip-nav, ARIA may be missing | Every page has one `<h1>`, no skipped levels, all forms labelled, all images have alt | Verify WCAG 2.2 AA requirements for 2026 |
| B-3 | **Keyboard navigation works end-to-end** | Cannot complete form via keyboard alone | Tab order follows visual layout, form submittable via Enter, focus indicators visible | None |

**B-1 details (specific colour pairs to verify):**

| Foreground | Background | Use | Min Ratio |
|------------|-----------|-----|-----------|
| Navy `#11294B` | White `#FFFFFF` | Nav text, headings | 4.5:1 |
| Navy `#11294B` | Cream `#FAF9F6` | Body text | 4.5:1 |
| Gold `#D4B468` | Navy `#11294B` | Accent on dark sections | 4.5:1 normal, 3:1 large |
| Body `#2C3E50` | Cream `#FAF9F6` | Paragraphs | 4.5:1 |
| White `#FFFFFF` | Navy `#11294B` | Text on hero/footer | 4.5:1 |
| Muted `#6C7A89` | Cream `#FAF9F6` | Captions | 4.5:1 |
| Gold `#D4B468` | White `#FFFFFF` | Decorative headings | Check and flag if fails |

**If Gold on Navy fails 4.5:1 for normal text:** Create a `--color-secondary-text` token with a lighter gold tint for small text. Keep `#D4B468` for decorative and large-text use.

### Section C: Integration Verification -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **All links verified across all pages** | Broken links, wrong destinations, missing `target="_blank"` on external | Zero 404s, anchors scroll correctly, external links open in new tab | None |
| C-2 | **Form submission end-to-end** | Form may not work after all integrations | Data reaches backend, thank-you displays, UTM params captured, keyboard submittable | None |
| C-3 | **Analytics fire correctly** | GTM/GA4 may have integration issues | Pageview on every page, UTM cookies set, no duplicate fires | None |

### Section D: Performance & Consistency -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Lighthouse scores meet targets** | No baseline performance data | Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+ (median of 3 runs) | Confirm 2026 Lighthouse scoring methodology |
| D-2 | **Zero console errors** | Undetected JS errors or 404s | No uncaught exceptions, no failed requests, no mixed content | None |
| D-3 | **Cross-page consistency verified** | Shared elements may differ between pages | Header, footer, floating buttons, font loading, token application identical across all 4 pages | None |

---

## What This PRD Does NOT Cover

- Cross-browser testing on Safari, Firefox, Edge (Chrome is primary for MVP)
- Full screen reader testing with NVDA, JAWS, VoiceOver (keyboard nav is in scope)
- Load testing, stress testing, or concurrent user performance
- Security or penetration testing
- Content accuracy review (that is Marilyn's review after handoff in PRD 13)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Fix any responsive, accessibility, or link issues found |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | MODIFY | Same QA fixes |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Same QA fixes |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Same QA fixes, form accessibility |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | MODIFY | Responsive fixes, focus styles, touch target sizing |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | MODIFY | Add `--color-secondary-text` if gold contrast fails |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, accessibility requirements, breakpoints |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Colour values for contrast checks |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Main stylesheet with responsive breakpoints |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Homepage to test |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | About page to test |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | Course page to test |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | Contact page to test |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification, responsive testing, console checks, Lighthouse audits |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all 4 HTML pages, CSS files, JS files. Start dev server. Generate 5 proactive items. |
| 2 | `[READ-ONLY]` | Responsive audit: `preview_resize` at 375, 768, 1200, 1440 for each page. Screenshot issues. |
| 3 | `[READ-ONLY]` | Accessibility audit: contrast checks, heading hierarchy, form labels, alt text, focus, skip-nav, ARIA. |
| 4 | `[READ-ONLY]` | Link verification: click every link on every page. Anchor scrolling. External links. mailto/tel. |
| 5 | `[READ-ONLY]` | Form and tracking test: submit form, verify backend, check UTM capture, verify GA4/GTM. |
| 6 | `[READ-ONLY]` | Lighthouse audits: all 4 pages, 3 runs each, take median. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Fix every issue found in phases 2-6. One commit per logical group. |
| 8 | `[READ-ONLY]` | Re-verify all checks from phases 2-6. Re-run Lighthouse. Confirm zero console errors. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | WCAG 2.2 AA requirements for 2026 | Confirm no new success criteria affect this site beyond colour contrast, target size, focus, headings | Ensures audit covers current standards |
| R-2 | Gold `#D4B468` on Navy `#11294B` contrast | Use contrast checker. If fails 4.5:1 for normal text, find lightest gold tint that passes while remaining visually "gold" | Most visible brand colour pair. Failure is a blocker. |
| R-3 | Muted `#6C7A89` on Cream `#FAF9F6` contrast | May be too light for 4.5:1. If fails, darken the muted colour. | Secondary text readability on every page. |
| R-4 | Lighthouse 2026 scoring methodology | Confirm 0-100 scoring per category. Confirm 90+ is "good". | Prevents false failures from scoring changes. |
| R-5 | GitHub Pages HTTPS | Confirm no mixed content issues on deployed URL | Mixed content warnings cause Best Practices score drop |

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
| No overflow at 375/768/1200/1440 | Untested | Zero horizontal scrollbar on any page at any breakpoint | `preview_resize` + `preview_screenshot` |
| Touch targets 44x44px | Unknown | All interactive elements meet minimum on mobile | `preview_inspect` at 375px |
| WCAG AA contrast all text | Unknown | All pairs pass 4.5:1 (normal) or 3:1 (large) | Contrast checker tool |
| Form labels | Unknown | Every field has visible `<label>` with `for` | `preview_snapshot` of contact page |
| Alt text complete | Unknown | Every `<img>` has descriptive alt | `grep` across HTML files |
| Keyboard tab order | Unknown | Tab order follows visual layout | Tab through each page |
| Skip-to-content link | None | First focusable element on every page | Tab once from page load |
| All links work | Unknown | Zero 404s, anchors scroll correctly | Click each link |
| Form end-to-end | Unknown | Data reaches backend, thank-you displays | Submit test entry |
| UTM capture works | Unknown | Load with `?utm_source=test`, data captured | Submit form, check spreadsheet |
| GA4 pageview fires | Unknown | Requests to google-analytics on every page | `preview_network` |
| Lighthouse Performance | Unknown | 90+ median of 3 runs | Lighthouse audit |
| Lighthouse Accessibility | Unknown | 90+ median of 3 runs | Lighthouse audit |
| Lighthouse Best Practices | Unknown | 90+ median of 3 runs | Lighthouse audit |
| Lighthouse SEO | Unknown | 90+ median of 3 runs | Lighthouse audit |
| Zero console errors | Unknown | No errors on any page | `preview_console_logs` |
| Cross-page consistency | Unknown | Header, footer, floating buttons identical | Visual comparison |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Mobile layout (375px) | No overflow, readable text, usable form | `preview_resize` preset mobile + `preview_screenshot` |
| Tablet layout (768px) | Grid collapse, nav behaviour | `preview_resize` + `preview_screenshot` |
| Desktop layout (1200px) | Full layout, multi-column sections | `preview_resize` + `preview_screenshot` |
| Focus indicators | Visible ring on all interactive elements | Tab through page, `preview_screenshot` |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| Heading hierarchy | `preview_snapshot` | One h1 per page, no skipped levels |
| Form labels | `grep 'for=' contact.html` | Every input has a matching label |
| Alt text | `grep '<img' *.html` | Every img has alt |
| Skip nav | `grep 'skip' *.html` | Skip-to-content link present |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 12 - responsive testing and accessibility`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Gold on Navy fails 4.5:1 for normal text | Accessibility score drops, text hard to read | High | Create `--color-secondary-text` token with lighter gold (e.g., `#E2C780`) for small text. Keep `#D4B468` for decorative/large use. |
| Lighthouse score volatility | A page scores 88 on one run, 92 on the next | Medium | Run 3 times, use median. If 88-89, investigate failing items rather than re-running. |
| QA fixes cascade into regressions | Fixing responsive on one page breaks another | Medium | After each batch of fixes, re-check all 4 pages at all breakpoints. |
| Scope creep from discovered issues | QA reveals feature requests, not bugs | Medium | Stick to QA scope. Log genuine features in PRD_BACKLOG.md. Fixes for existing functionality stay here. |
| GitHub Pages caching delays verification | Deployed fixes not visible immediately | Low | Verify locally first. Hard refresh + incognito on live URL. Wait 2-3 minutes after push. |

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, contrast table, research table, proactive items table, verification checklist |
