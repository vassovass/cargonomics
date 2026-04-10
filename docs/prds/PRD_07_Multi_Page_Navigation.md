# PRD 07: Multi-Page Navigation

> **Order:** 7
> **Status:** Proposed
> **Type:** Feature
> **Dependencies:** PRD 3 (Homepage Restructure), PRD 4 (About Page), PRD 5 (Course Page), PRD 6 (Contact Form Page)
> **Blocks:** PRD 12 (Responsive Testing & Accessibility)
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

The current site is a single-page prototype where nav links use anchor references (`#programs`, `#about`, `#trainers`, `#contact`). With 4 separate HTML pages now built by PRDs 3-6, every one of those anchor links is broken on every page except the homepage. A visitor who clicks "About" in the nav on the course page goes nowhere, or scrolls to a non-existent anchor. This is the kind of defect that immediately signals "not a real website" to Marilyn, who evaluates with professional marketing eyes, not developer tolerance for broken links.

This PRD is sequential because it touches every page and requires all 4 pages to exist first. It is the final step in Sprint 2 before the site functions as a cohesive multi-page experience. Until this PRD lands, each page is an island. After it lands, the site is navigable. Beyond link correction, this PRD establishes three patterns every page must follow: an active state indicator showing which page the visitor is on, a consistent "Apply Now" CTA in the nav that always points to `contact.html`, and identical footer content across all pages.

The mobile menu is especially important. The hamburger toggle, slide-down menu, close-on-click, and close-on-outside-click behaviours are handled by `script.js`. That script was written for a single-page context and references DOM elements by class name (`.nav`, `.nav__mobile-toggle`, `.nav__links`). It should work on other pages if the nav HTML structure is identical, but "should work" is not "verified working." The smooth scroll handler (section 7 of `script.js`) intercepts all `a[href^="#"]` clicks and tries to scroll on the current page. On non-homepage pages, clicking a cross-page anchor like `index.html#trainers` could be silently swallowed. This PRD must fix that handler and test navigation on every page.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `index.html` nav links use `#programs`, `#about`, `#trainers`, `#contact` | Anchor-only links break on any page except the homepage |
| `about.html`, `course.html`, `contact.html` created by PRDs 4-6 | Each page has its own nav/footer copy, potentially inconsistent |
| `script.js` smooth scroll handler intercepts `a[href^="#"]` | May swallow cross-page anchor links (e.g., `index.html#trainers` from about.html) |
| `script.js` mobile menu uses class-based selectors | Works only if nav HTML markup is identical across all pages |
| Desktop modal and mobile sticky bar in `script.js` | Homepage-only elements may have been accidentally copied to other pages |
| No active state class on nav links | Visitor cannot tell which page they are on |
| No skip navigation link | WCAG 2.1 Level A requirement missing on all pages |

---

## Desired Outcomes

### Section A: Navigation Links and Active State -- 4 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Consistent nav markup across all 4 pages** | Copy-paste divergence between pages | Nav structure (logo, tagline, links, CTA, hamburger) identical on all pages | Inventory nav markup on all 4 pages in Phase 1 |
| A-2 | **Nav links point to correct pages via relative paths** | Anchor links broken on non-homepage pages | Home > `index.html`, About > `about.html`, Programs > `course.html`, Contact > `contact.html`. No hash-only links remain. | Verify "Programs" vs "Course" label preference from kickoff notes |
| A-3 | **Active state marks current page** | Visitor cannot tell where they are | CSS class (e.g., `nav__link--active`) and `aria-current="page"` on the relevant `<a>` per page, applied statically | Check if `style-v2.css` already has an active state class |
| A-4 | **"Apply Now" CTA on every page** | No persistent conversion path in nav | Button present on all pages linking to `contact.html`, styled with Gold accent, visible in both desktop nav and mobile menu | None |

### Section B: Footer and Floating Elements -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Footer identical across all pages** | Footer drift after independent page builds | Footer content (logo, tagline, address, email, phone, social icons, nav links, copyright) byte-for-byte identical except `aria-current` on active link | Diff footer HTML across all 4 pages in Phase 1 |
| B-2 | **Floating Zalo and WhatsApp buttons on all pages** | Messaging buttons may be missing on new pages | Bottom-right buttons present, linked, and not overlapping footer | None |
| B-3 | **Homepage-only elements scoped correctly** | Modal/sticky bar accidentally on non-homepage pages | `about.html`, `course.html`, `contact.html` do NOT contain modal overlay or sticky promo bar markup | Grep for `modal-overlay` and `sticky-promo` in all non-homepage files |

### Section C: Mobile Menu and Cross-Page Links -- 4 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Mobile menu toggle works on all pages** | Hamburger menu may silently fail on new pages | Opens, closes, navigates correctly on every page. `aria-expanded` updates. | Verify nav markup selectors match `script.js` expectations on all pages |
| C-2 | **Cross-page anchor links work** | `index.html#trainers` from about.html does nothing | Format: `index.html#section-id`. Browser navigates to homepage and scrolls to target. | Test native hash-on-page-load behaviour across browsers |
| C-3 | **Smooth scroll handler does not block cross-page anchors** | `script.js` intercepts `a[href^="#"]` and prevents navigation | Handler checks if target element exists on current page. If not, lets browser navigate normally. | Read `script.js` section 7 to understand current interception logic |
| C-4 | **Skip navigation link on every page** | WCAG 2.1 Level A requirement missing | `<a href="#main-content" class="skip-link">Skip to main content</a>` as first focusable element, visible on focus, with corresponding `<main id="main-content">` | None |

**A-2 details:**
- All links use bare relative filenames (`about.html`, not `/about.html`) to work on GitHub Pages subdirectory
- "Programs" label in nav links to `course.html` (scalable label if more courses added later)

**C-1 details:**
- Hamburger icon visible below mobile breakpoint on all pages
- Clicking a nav link in the open menu closes it AND navigates to the target page
- Clicking outside the open menu closes it
- No "stuck open" state when resizing between mobile and desktop

---

## What This PRD Does NOT Cover

- External link validation (social media URLs, Zalo deep links)
- SEO meta tags per page (each page PRD handles its own `<title>` and `<meta description>`)
- Breadcrumbs (unnecessary for a 4-page site)
- Canonical URLs (each page PRD handles its own `<link rel="canonical">`)
- Footer redesign or content changes (this PRD syncs the existing footer, not redesign it)
- Nav animation or transition effects (hamburger slide-down already implemented in `script.js`)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Update nav links from anchors to page URLs, add active state class |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | MODIFY | Update nav links, add active state, sync footer, add skip-link |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Update nav links, add active state, sync footer, add skip-link |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Update nav links, add active state, sync footer, add skip-link |
| `05-deliverables/website-prototype/cargonomics-site/js/script.js` | MODIFY | Fix smooth scroll handler for cross-page anchors, optional resize handler for mobile menu |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | MODIFY | Add active state styles and skip-link styles if not already present |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/SPRINT_02_PAGES.md` | Sprint shared context |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Current nav with anchor links, footer, floating buttons. Source of truth for chrome markup. |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | About page nav/footer to update |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | Course page nav/footer to update |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | Contact page nav/footer to update |
| `05-deliverables/website-prototype/cargonomics-site/js/script.js` | Mobile menu (section 1), smooth scroll (section 7), modal (section 5), sticky bar (section 6) |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css` | Nav, footer, floating button, and potential active state styles |
| `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css` | Brand tokens for active state and CTA colours |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Lines 11-17: MVP page list (Home, About, Course, Contact) |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification on all 4 pages, mobile menu testing, cross-page link testing |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all 4 HTML pages. Inventory nav links, footer content, and floating button markup on each. Note discrepancies. |
| 2 | `[READ-ONLY]` | Read `script.js` to understand mobile menu toggle, smooth scroll, modal, and sticky bar logic. Identify selectors that depend on page-specific markup. |
| 3 | `[READ-ONLY]` | Read `style-v2.css` for existing active state classes, nav styling, footer styling. |
| 4 | `[READ-ONLY]` | Generate 5 proactive items. Report discrepancies and items to orchestrator before proceeding. |
| 5 | `[WRITE]` `[PARALLEL]` | Update nav links on all 4 pages: replace anchors with page URLs. Add `nav__link--active` and `aria-current="page"` per page. Add "Apply Now" CTA. |
| 6 | `[WRITE]` `[PARALLEL]` | Sync footer across all 4 pages. Ensure identical markup, links, social icons, address. |
| 7 | `[WRITE]` `[PARALLEL]` | Verify floating buttons on all pages. Remove homepage-only elements (modal, sticky bar) from non-homepage pages if present. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Add skip navigation link to all 4 pages. Add `<main id="main-content">` wrapper if missing. Add skip-link CSS. |
| 9 | `[WRITE]` `[SEQUENTIAL]` | Update `script.js` smooth scroll: skip cross-page anchors. Optional: add resize handler to clear mobile menu `is-open` at desktop widths. |
| 10 | `[READ-ONLY]` | Visual verification: test every nav link on every page (16 clicks). Test mobile menu on all pages. Test cross-page anchor. Test skip-link focus. Console error check. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Active state approach | Static class per page vs JS-based pathname matching. Static is simpler and WordPress-compatible. | JS matching can break on subdirectory deployments. Static classes are reliable. |
| R-2 | Cross-page anchor behaviour | Test `index.html#trainers` from `about.html`. Does the browser scroll after navigation? | If native hash scrolling fails, a small page-load script may be needed. |
| R-3 | Mobile menu JS selectors | Verify `.nav`, `.nav__mobile-toggle`, `.nav__links` exist on all pages with identical structure. | If PRDs 3-6 used different class names, mobile menu silently fails. |
| R-4 | Smooth scroll interception | `script.js` section 7 intercepts `a[href^="#"]`. Cross-page anchors like `index.html#trainers` do NOT start with `#`, they start with `index`. But same-page hash links do. | The current handler already only matches `href^="#"`. Verify it does not interfere with full cross-page URLs. |
| R-5 | "Programs" vs "Course" nav label | Check kickoff transcript and markup notes for preferred label. "Programs" is more scalable. | Label should match what Marilyn expects to see. |
| R-6 | Hamburger stuck state on resize | If menu opened on mobile, then viewport resized to desktop, `is-open` class may persist. | Add `matchMedia` listener or CSS override to prevent layout issues. |
| R-7 | Footer consistency | Diff footer HTML across all 4 pages after PRDs 3-6. Note discrepancies before standardizing. | Small differences from independent builds are common. |

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
- [ ] Active state uses a CSS class (`nav__link--active`) compatible with WordPress `wp_nav_menu`
- [ ] `aria-current="page"` present (WordPress adds this automatically with the right walker)
- [ ] `data-section="site-header"` on `<nav>`, `data-section="site-footer"` on `<footer>`
- [ ] Skip navigation link pattern compatible with WordPress theme conventions

---

## Design & Code Quality

- [ ] BEM naming convention (block__element--modifier)
- [ ] No hardcoded colour, font, or spacing values (use `var(--token-name)`)
- [ ] Semantic HTML (`<nav>`, `<ul>`, `<li>`, `<a>` for menu items, `<footer>`)
- [ ] Accessible (`aria-current="page"`, `aria-expanded` on toggle, `aria-label="Main navigation"`, `aria-label` on floating buttons)
- [ ] Vanilla JS only (no jQuery, no framework dependencies)
- [ ] Performant (no new assets loaded)
- [ ] No em dashes in any text content (use commas, colons, or shorter sentences)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Nav links work | Anchor links break on non-homepage pages | All 16 nav clicks (4 links x 4 pages) navigate correctly | `preview_click` each link on each page |
| Active state visible | No active indicator | Current page highlighted in nav on every page | `preview_screenshot` of nav on each page |
| `aria-current="page"` | Not present | Present on active nav link on every page | `grep "aria-current" *.html` across all 4 files |
| "Apply Now" CTA | Not in nav | Goes to `contact.html` from every page | `preview_click` on each page |
| Footer identical | Potentially inconsistent | Matching content across all 4 pages | Extract footer from each page and diff |
| Floating buttons | May be missing on new pages | Zalo + WhatsApp visible on every page | `preview_screenshot` of each page |
| Mobile menu | Untested on new pages | Hamburger opens/closes on every page | `preview_resize` mobile, click hamburger on each page |
| Homepage-only elements | May be on non-homepage pages | Modal and sticky bar absent from about, course, contact | `grep "modal-overlay\|sticky-promo" about.html course.html contact.html` returns zero |
| Cross-page anchor | Untested | `index.html#trainers` from about.html navigates and scrolls | `preview_click` test |
| Skip navigation | Not present | "Skip to main content" is first focusable element on every page | Press Tab on each page, verify skip link appears |
| No console errors | Unknown | Zero JS errors on any page | `preview_console_logs` on all 4 pages |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Nav consistency | Same nav markup, links, and CTA on all 4 pages | `preview_screenshot` on each page |
| Active state | Current page is visually highlighted in nav | `preview_screenshot` on each page |
| Mobile menu | Hamburger opens/closes, links navigate | `preview_resize` mobile then `preview_click` |
| Footer match | Same content, links, icons across all pages | `preview_screenshot` of footer on each page |
| Skip link | Visible on Tab focus, hidden otherwise | Tab key test on each page |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No console errors | `preview_console_logs` on all pages | Zero errors |
| aria-current | `grep "aria-current" *.html` | Exactly one match per file |
| No hash-only nav links | `grep 'href="#' *.html` | Zero matches in nav elements (homepage section links are OK) |
| Homepage-only scoping | `grep "modal-overlay\|sticky-promo" about.html course.html contact.html` | Zero matches |
| Skip link present | `grep "skip-link" *.html` | One match per file |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 07 - multi-page navigation with active states and skip links`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Pages from PRDs 3-6 have inconsistent nav markup | Per-page fixes instead of find-and-replace. Increased scope. | Medium | Phase 1 inventories all 4 pages and notes discrepancies before writes. Standardize to `index.html` version first. |
| Smooth scroll handler blocks cross-page anchors | Clicking `index.html#trainers` from `about.html` does nothing | Medium | Verify current handler only matches `href^="#"` (not full URLs). Update if needed to check for target element on current page. |
| Mobile menu JS fails on non-homepage pages | Mobile users cannot navigate | Low | Test mobile menu on every page in Phase 10. Fix markup to match if selectors differ. |
| Relative paths break on GitHub Pages subdirectory | Links work on localhost but fail at `vassovass.github.io/cargonomics/` | Low | Use bare filenames (`about.html`) without leading slashes. Test on live URL after deployment. |
| Footer drift after future PRD edits | A later PRD modifies footer on one page but not others | Medium | Add HTML comment in each footer: `<!-- FOOTER: Keep identical across all pages. See PRD 07. -->` |
| Active state colour insufficient contrast | Gold underline on Navy too subtle to notice | Low | Use at least two visual cues (colour change plus underline or font weight) for visibility without colour perception. |
| Hamburger menu stuck open on resize | `is-open` class persists when viewport crosses desktop breakpoint | Low | CSS at desktop widths overrides `is-open` display, or `matchMedia` listener removes the class. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` (lines 11-17: MVP page list)
- `05-deliverables/website-prototype/cargonomics-site/js/script.js` (mobile menu, smooth scroll, modal, sticky bar)
- `.claude/rules/website-conventions.md` (coding standards, modularity rules)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, 127 lines) |
| 2026-04-10 | All | Full rewrite with 11 outcomes, 7 research items, 7 risks |
| 2026-04-10 | All | Template-compliant rewrite: added header block, session note, research-first mandate, lettered outcome sections with requirement tables, files to create/modify table, MCP servers table, task-optimized structure, proactive items table, success criteria with current/target columns, split verification checklist, and related documents section |
