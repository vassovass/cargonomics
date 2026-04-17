# PRD Index: Cargonomics MVP Website

> **Total PRDs:** 24 | **Proposed:** 1 | **In Progress:** 3 | **Complete:** 19 | **Superseded:** 1
> **Last Updated:** 2026-04-17 (versioning system simplified: -v{N} archives removed, git history is now the archive, footer label is the only version artifact)
> **MVP Deadline:** Tuesday April 14, 2026 EOD (initial MVP shipped April 11; April 14 batch extends scope for Wednesday follow-up)

---

## Agent Instructions

**MANDATORY reading before working on any PRD:**
1. `CLAUDE.md` (MVP Website Working Context section)
2. This file (PRD_00_Index.md)
3. The relevant sprint context file (SPRINT_XX_*.md)
4. The specific PRD file

**After completing any PRD:**
1. Update this file: change status emoji, update counts in header, add changelog entry
2. Git commit with PRD number: `feat(website): PRD XX - description`
3. Git push to make progress visible on GitHub Pages

---

## Standard PRD Requirements

Every PRD in this project MUST include:

**Before starting work:**
- [ ] Read all files in Agent Context section
- [ ] Conduct research noted in "Research & Verification Needed"
- [ ] Generate 3 core + 2 stretch proactive items based on current codebase state (standard locked 2026-04-14; applies from PRD 15 onwards)

**During implementation:**
- [ ] Follow BEM naming, use CSS custom properties (no hardcoded values)
- [ ] Self-contained modular sections with `data-section`, `data-slot`, `data-elementor-widget` attributes
- [ ] Vanilla JS only (no jQuery)
- [ ] Semantic, accessible HTML

**After completion:**
- [ ] Verify via Claude Preview (preview_start "cargonomics-mock")
- [ ] Update PRD_00_Index.md status
- [ ] Git commit and push

---

## Sprint 1: Foundation (Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 1 | Design System & Token Architecture | Architecture | :white_check_mark: Complete | None | All |
| 2 | Brand Token Activation & Font Fix | Refactor | :white_check_mark: Complete | PRD 1 | PRDs 3-13 |

## Sprint 2: Pages (PRDs 3-6 Parallel, PRD 7 Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 3 | Homepage Restructure | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 4 | About Page | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 5 | Course/Program Page | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 6 | Contact & Application Form Page | Feature | :white_check_mark: Complete | PRD 2 | PRDs 7, 8 |
| 7 | Multi-Page Navigation | Feature | :white_check_mark: Complete | PRDs 3-6 | PRD 12 |

## Sprint 3: Integration (PRDs 8-10 Parallel, PRD 11 Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 8 | Form Backend & Submission Pipeline | Feature | :white_check_mark: Complete | PRD 6 | PRD 12 |
| 9 | Image & Logo Integration | Feature | :white_check_mark: Complete | PRD 2 | PRD 12 |
| 10 | Analytics & GTM Setup | Feature | :white_check_mark: Complete | PRD 2 | PRD 12 |
| 11 | UTM Tracking & Attribution | Feature | :white_check_mark: Complete | PRDs 6, 10 | PRD 12 |

## Sprint 4: Ship (Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 12 | Responsive Testing & Accessibility | QA | :white_check_mark: Complete | PRDs 7-11 | PRD 13 |
| 13 | Final Deploy & Client Handoff | Ops | :white_check_mark: Complete | PRD 12 | None |

## Sprint 5: Infrastructure + Content (PRDs 15/16/17 infra track; PRD 21 parallel content track)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 15 | DNS Cutover to Cloudflare | Ops / Infra | :construction: In Progress (docs shipped, zone creation pending Vasso + NS swap pending Marilyn's contact) | PRD 13 | PRDs 16, 17 |
| 16 | Dev/Live Environments on Cloudflare Pages | Ops / Infra | :white_check_mark: Complete (Cloudflare Pages project `cargonomics-site` provisioned, main auto-deploys, preview gated by Basic Auth middleware, verified live 2026-04-16) | PRD 15 | None |
| 17 | SEO Fundamentals | Feature / SEO | :construction: In Progress (clean URLs + sitemap + schema + gsc-setup shipped, GSC verification pending DNS cutover) | PRDs 15, 16 | None |
| 21 | Client Image Replacements (April 15 Pack) | Content / Feature | :construction: In Progress (all 7 images shipped, 5 DepositPhotos licensing formalisation pending) | PRD 9 | None (unblocks PRD 20) |

## Post-MVP Enhancements

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 14 | WhatsApp & Zalo Icon Integration | Feature | :white_check_mark: Complete | PRD 9 | None |
| 18 | Homepage Scope Reduction | Refactor | :white_check_mark: Complete | None | None |
| 19 | Course Hero Visual Anchor | Feature | :ballot_box_with_check: Superseded by PRD 21 (B-1 landed student-immersion image in `course-overview`) | None | None |

## Post-MVP Migration

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 20 | WordPress Migration Plan | Ops / Migration | :memo: Proposed | PRDs 15, 16, 17 + client sign-off | None |

## Post-MVP Backlog (captured 2026-04-16 from past-session audit)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 22 | Mobile-Responsive Audit, WordPress/Elementor-Forward | QA / Refactor | :white_check_mark: Complete | None | None |
| 23 | Brand Color Picker + Reset (Dev Tool, Footer) | Internal Dev Tool | :white_check_mark: Complete | None | None |
| 24 | Pattern Library / Styleguide Page | Dev Infrastructure | :white_check_mark: Complete | Benefits from PRD 22 audit first | PRD 20 WordPress migration uses this as spec |

---

## Summary

| Sprint | PRDs | Status |
|--------|------|--------|
| 1: Foundation | 1, 2 | Complete |
| 2: Pages | 3, 4, 5, 6, 7 | Complete |
| 3: Integration | 8, 9, 10, 11 | Complete |
| 4: Ship | 12, 13 | Complete |
| 5: Infrastructure + Content | 15, 16, 17, 21 | 16 Complete; 15/17 In Progress (awaiting DNS); 21 In Progress (licensing pending) |
| Post-MVP Enhancements | 14, 18, 19 | 14 Complete; 18 Complete; 19 Superseded by PRD 21 |
| Post-MVP Migration | 20 | Proposed |
| Post-MVP Backlog (2026-04-16) | 22, 23, 24 | All Complete 2026-04-16 evening |

---

## Dependency Graph

```
PRD 1 (Design System)
  +-- PRD 2 (Token Activation)
        |-- PRD 3 (Homepage) ------+
        |-- PRD 4 (About) ---------+
        |-- PRD 5 (Course) --------+-- PRD 7 (Navigation) --+
        |-- PRD 6 (Contact) -------+                        |
        |-- PRD 9 (Images) ---------------------------------+
        +-- PRD 10 (Analytics/GTM) -- PRD 11 (UTM Track) ---+
                                                             +-- PRD 12 (QA) -- PRD 13 (Ship)
            PRD 8 (Form Backend, needs PRD 6) ---------------+
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-10 | Created PRD index with 13 PRDs across 4 sprints. MVP deadline: Tuesday April 14 EOD. |
| 2026-04-10 | Created PRD_01_Design_System.md and PRD_02_Brand_Token_Activation.md with full outcome specs, research items, success criteria. |
| 2026-04-10 | Created Sprint 2 PRD files: PRD_03_Homepage_Restructure.md, PRD_04_About_Page.md, PRD_05_Course_Page.md, PRD_06_Contact_Form_Page.md, PRD_07_Multi_Page_Navigation.md. |
| 2026-04-10 | Sprint 1 complete. PRD 01 and PRD 02 delivered: design system docs, spacing/RGB/component tokens, data-section attributes on all 14 sections, Orbitron + Open Sans fonts, 27 hardcoded hex values replaced with CSS custom properties. Deployed to GitHub Pages. |
| 2026-04-11 | Sprint 2 complete. PRDs 03-07 delivered: homepage restructured (conference + video removed, pillars reordered, social icons + inquiry buttons added), about.html created (company profile, three pillars, leadership), course.html created (WYDLS overview, 6-module curriculum grid, schedule, CTAs), contact.html created (application form with 7 visible + 11 hidden fields, inquiry form, contact info), multi-page navigation standardized across all 4 pages with active states, skip links, synced footer with SVG social icons. |
| 2026-04-11 | Sprint 3 complete. PRDs 08-11 delivered: form backend (Google Apps Script to Google Sheet, fetch handler with thank-you/error states, privacy notices, ARIA live regions), image and logo integration (PNG logo in nav/footer on all pages, favicon, OG image, 7 stock images replaced with branded placeholders, click-to-cycle image review carousel), GTM analytics (GTM-NCG2LPNQ on all pages, dataLayer init, 42 CTA data-track attributes, analytics.js event tracking, GTM container import JSON, gtm-setup.md reference doc), UTM attribution (cookie-based first/last-touch tracking, traffic source classification including Zalo/Coc Coc, form auto-fill, dataLayer push). |
| 2026-04-11 | Sprint 4 complete. PRDs 12-13 delivered: QA pass (Apps Script URL wired to live Google Sheet, 11 em dashes replaced in visible copy, JSON-LD course date fixed to June 1, inline styles extracted from about.html and course.html into style-v2.css, 133 lines of dead CSS removed for conference-v2 and hero-video classes), zero console errors across all 4 pages at mobile/tablet/desktop, all 13 PRDs marked complete. MVP website ready for Marilyn handoff. |
| 2026-04-13 | PRD 14 created and completed: WhatsApp & Zalo official brand SVG icons added to floating buttons (all 4 pages) and contact page social block. Live deep links wired with pre-filled message (wa.me/84903033039, zalo.me/84903033039). |
| 2026-04-14 | Process A foundation landed per approved April 14 plan: created `docs/deferred-items.md` and `docs/archived-components.md` scaffold. Added Tracker Discipline rule to `.claude/rules/website-conventions.md` and root `CLAUDE.md` Conventions section. Anti-duplication principle: `open-questions.md` for PEOPLE-blocked items, `deferred-items.md` for TIME and PRIORITY-blocked code and UX observations. |
| 2026-04-14 | Process C landed: proactive items standard changed from 5 to 3 core + 2 optional stretch. Updated `.claude/rules/website-conventions.md`, `.claude/rules/prds.md`, `.claude/commands/create-prd.md`, and this index's Standard PRD Requirements checklist. Applies to all PRDs from PRD 15 onwards. PRDs 1-14 not retroactively updated. |
| 2026-04-14 | PRDs 18 and 19 created in Proposed status. PRD 18 (Homepage Scope Reduction): remove Professional Development + Corporate Training cards from homepage + footer, archive markup to `docs/archived-components.md`. PRD 19 (Course Hero Visual Anchor): add visual element to `course.html` `.course-overview` hero to reduce text-heavy feel, stats card recommended as default placeholder. Both are MVP Today track per approved April 14 plan; PRD execution pending. |
| 2026-04-14 | Sprint 5 (Infrastructure) created with PRDs 15, 16, 17. PRD 15 (DNS Cutover to Cloudflare): Cloudflare as DNS provider, domain stays at current registrar, DNS pack handed to Marilyn's contact for nameserver swap, M365 email preserved. PRD 16 (Dev/Live Environments on Cloudflare Pages): Cloudflare Pages replaces GitHub Pages for production, staging on branch preview URL with Cloudflare Access or Worker Basic Auth + `X-Robots-Tag: noindex`, 301 from old github.io URL. PRD 17 (SEO Fundamentals): production `robots.txt` and `sitemap.xml` created, staging lockout confirmed, per-page canonical/OG audit (already in place; verified), GSC verification. Config files shipped this session: `robots.txt`, `sitemap.xml`, `_headers`. Runbook at `docs/infra/cloudflare-setup-runbook.md`. DNS pack at `06-client-comms/dns-pack-2026-04-14.md`. Execution pending Cloudflare account action by Vasso + nameserver swap by Marilyn's contact. |
| 2026-04-14 | PRD 20 (WordPress Migration Plan) created in Proposed status. AZDIGI as target managed WP host (Vietnam-local, <50ms from HCMC, ~$40-80/yr), Elementor Pro Advanced + ACF Pro, Fluent Forms with native Airtable integration replacing Google Apps Script, in-place cutover via Cloudflare DNS swap preserving apex URL authority. Execution scheduled after Marilyn signs off on static MVP design. |
| 2026-04-16 | PRD 21 (Client Image Replacements) created from Marilyn's WhatsApp pack delivered 2026-04-15. Five DepositPhotos URLs for homepage + course sections, plus a Drive folder of conference photos for Connect + Consult. Added to Sprint 5 as parallel content track alongside infra PRDs 15-17. Unmentioned sections keep current images per Marilyn's explicit instruction. PRD 19 (Course Hero Visual Anchor) flagged as supersession candidate once PRD 21 B-1 lands. Transcript archived at `06-client-comms/whatsapp-image-pack-2026-04-15.md`. |
| 2026-04-16 | PRD 18 (Homepage Scope Reduction) executed. Removed Professional Development + Corporate Training programme cards from `index.html` and the footer Programs column on all 4 pages. Archived original markup + scoped CSS to `docs/archived-components.md` with reinstate hints (HTML snapshots, CSS grid rules, waitlist-on-reinstate suggestion per proactive item). Deleted orphan `.programs-v2__secondary` selectors from `style-v5.css` (2 rules: base grid + responsive). Footer Programs column now shows "WYDLS Bootcamp" + "Programme Details" linking to `course#curriculum` on all pages. Verified via Claude Preview at mobile (375px, no horizontal scroll, 48px gap), tablet (768px, all 4 footer columns 249px equal height), desktop (1280px, all 4 footer columns 169px equal height). Zero console errors. PRD 16 promoted to Complete (Cloudflare Pages project + Basic Auth middleware + staging branch verified live earlier this session). Version bump v4 to v5 across all 4 defaults; v4 archives (hp/about/course/contact-v4.html, js/*-v4.js) created and self-contained with internal refs rewritten to -v4 siblings. |
| 2026-04-16 | Sprint 5 execution landed code + docs for PRDs 15, 16, 17, 21 and promoted site to v4. DNS pack refreshed (TTL-lowering preamble, autodiscover, contact block). Cloudflare runbook: Part 0 baseline capture, Worker Basic Auth promoted as recommended staging gate, autodiscover in verification, 4-step rollback ladder. `_redirects` created for `.html` -> clean URL 301s. `_headers` rewritten with immutable cache on `/img/*`, `/css/*`, `/js/*` + short-cache HTML + security headers. `form-submit.js` gained `deriveFormSource()` -> `form_source_env` column (production / staging / local). `docs/infra/deploy-workflow.md` and `docs/infra/gsc-setup.md` created. Clean URL scheme across all 4 pages (canonicals, og:url, sitemap, internal hrefs). `Course` schema enhanced (endDate, offers, inLanguage, educationalLevel). `Organization` schema enriched (logo, sameAs, foundingLocation). PRD 21: all 7 images optimised (JPEG fallback + 3 WebP srcset variants each, EXIF stripped), originals archived in `06-client-comms/assets-from-marilyn/2026-04-15-image-pack/`, `<picture>` elements swapped in `index.html` + `course.html` for hero, coach, connect, consult, program-featured, how-it-works, course-overview (new slot), curriculum-grid. Carousel `data-images` retired on replaced slots. Alt text rewritten. Version bump v3 -> v4: archived `hp-v3.html`, `about-v3.html`, `course-v3.html`, `contact-v3.html`, `js/*-v3.js`; promoted defaults to reference `css/style-v4.css` + `css/v4-fixes.css`. PRDs 15/16/17/21 status: In Progress (external actions pending). PRD 19 marked Superseded by PRD 21 B-1. Decisions log: Worker Basic Auth + clean URLs. Parent `.claude/rules/website-conventions.md` updated with Environments section. |
| 2026-04-16 | **Deferred PRDs 22/23/24 executed + version-lock rule codified.** Three PRDs shipped in one session, with a concurrent mobile audit agent running in parallel. (A) PRD 23 commit `21eba89` v6->v7 bump + color picker devtool: `js/devtool-color-picker.js` self-contained vanilla JS widget (~8 KB) injected via `<script defer>` tag on all 5 defaults. Enabled via `?devtool=1` query string (persists via localStorage `cargo-devtool`), disabled via `?devtool=0`. Three color inputs for --color-primary, --color-secondary, --color-text with live CSS custom property updates on :root, persisted across navigation in localStorage `cargo-devtool-colors`. Reset + Copy CSS + Disable buttons. All markup wrapped in `data-devtool="color-picker"` container for one-sweep removal before WordPress migration. `docs/devtools.md` documents enable/disable pattern and 5-minute WP-removal procedure. (B) PRD 22 commit `735ab7b` (no version bump, stays v7) mobile audit fixes: WhatsApp hardcoded hex (#25D366, #1DA851) moved to `--color-whatsapp`, `--color-whatsapp-hover`, `--color-zalo` tokens in `tokens-cargonomics.css`; class-based CSS added to `v7-fixes.css` for `.nav__logo img`, `.footer__logo`, `.footer__version`, `.company-profile__tagline`, `.company-profile__mission`, `.company-profile__address`; `.nav__links a { min-height: 44px }` for WCAG AA touch targets; `.trusted-partners__tile { min-height: 80px (96 desktop) }` for uniform grid. 15 inline styles stripped across 5 defaults (logo height, footer logo, footer version). (C) PRD 24 commit [this commit] `styleguide.html` pattern library: 10 sections (colours, typography, spacing, buttons, pillar row, about pillar card, trusted partners tile, program featured card, trainer card, curriculum grid card) each with BEM class list, tokens used, Elementor migration target, data-slot/data-elementor-widget mapping, live component render using production CSS, and copy-pasteable HTML snippet. Noindex + nofollow meta, not in sitemap, not linked from public nav. Reachable only via direct URL /styleguide. Complementary to `docs/archived-components.md` (morgue for removed components). **Version-lock rule codified** (parent repo commit `4724104`): `.claude/rules/website-conventions.md` "Version Management" section flipped from AUTOMATIC bumping to USER-GATED. Explicit bump cues listed ("bump to v8", "new version", "cut a version"). Ambiguous cues explicitly NOT-bump ("clean up", "ship it", "push to live"). Rule added to `.claude/rules/deploy-protocol.md` and `CLAUDE.md` Conventions. Memory file `feedback_version_user_gated.md` created + MEMORY.md index updated for cross-session persistence. Historical context recorded: v5 (PRD 18), v6 (placeholder hygiene), v7 (PRD 23) all landed 2026-04-16 silently under the old auto rule; not rolled back. |
| 2026-04-17 | Versioning system simplified. 58 -v{N} archive files deleted (hp-v0..v6, about/course/contact-v1..v6, apply-v6, style-v2..v6, v2..v6-fixes, script/analytics/attribution/form-submit/image-review-v2..v6). css/style-v7.css renamed to css/style.css, css/v7-fixes.css renamed to css/fixes.css. Version is now just a string in the footer; git history is the archive. Pre-cleanup state preserved at git tag v7-pre-cleanup. |
| 2026-04-16 | **Backlog-closure session triggered by Vasso flagging dropped asks.** Past-session audit mined `C:/Users/vasso/.claude/projects/C--Users-vasso-Projects-CRM-Consultancy/*.jsonl` logs back to Apr 11 and surfaced 12+ concrete asks that had never been tracked. Root cause: no reliable system for logging in-chat asks. Root-cause fix: `.claude/rules/deploy-protocol.md` (parent repo, commit `ebe31ec`) gained two new rules: (1) mandatory Placeholder Audit before any push (grep PLACEHOLDER/coming soon/TBD on changed HTML, report severity-grouped to user, block push on user-visible hits) and (2) Chat-ask logging (any ask-shaped user message must be written to `deferred-items.md` in the same turn, BEFORE the work begins, with source tag and flip to done+commit-SHA when landed). `deferred-items.md` rebuilt with full backlog: 13 entries closed from this session (D1/D2/D3/D4/D10/D11/D17/D18/D19/D21/D22/D27/D28), 13 remain open or blocked on Marilyn content. Three executed commits across this session: (A) `96744fb` v5->v6 placeholder hygiene: About hero image swap (port-1 -> hero-home with 2-col grid + 4:5 aspect desktop / 16:9 mobile, sticky-on-scroll), Three Pillars redesign on About (image headers reusing PRD 21 optimised coach/connect/consult images, 3:2 aspect, scale-on-hover), Second trainer card removed from both About leadership and Homepage trainers (archived to `docs/archived-components.md` with reinstate hints), Course FAQ/Instructors/Testimonials hidden via `hidden` attribute (markup preserved), CSS for `.about-pillar-card__image` slot added. (B) `dcb56db` Trusted Partners section on homepage + course page: 11 partner tiles seeded from Elias' verified career (APL/CMA CGM, ZIM) + VN market majors (Saigon Newport, Gemadept, Tan Cang) + top global carriers (Maersk, MSC, Hapag-Lloyd, ONE) + forwarders (DB Schenker, DHL Global Forwarding), `data-partner-logo-src=""` attributes ready for future logo swap, disclaimer line avoids falsely claiming formal partnerships, responsive 2/3/4 col grid. (C) `ddb5d1f` Apply/Contact split (Marilyn's Apr 14 ask): new `apply.html` houses the application form (canonical `/apply`, title + meta updated, page_type=`apply`, nav Apply Now active), `contact.html` reduced to inquiries + contact-info with new "Get in Touch" hero and inline link back to `/apply`, 9 Apply Now CTAs site-wide retargeted from `/contact` to `/apply` (data-cta-destination flipped from `contact-form` to `application-form`), sitemap adds `/apply` entry at priority 0.95, `_redirects` adds `/apply.html -> /apply 301`, course.html JSON-LD `Course.offers.url` updated to `/apply`. PRDs 22 (Mobile-Responsive Audit), 23 (Brand Color Picker Dev Tool), 24 (Pattern Library Styleguide) created as Proposed stubs capturing deferred asks D24/D25/D26 from the backlog audit. Site still v6 after all three commits (no CSS cascade change after Phase 1). Live on cargonomics-site.pages.dev verified: /apply 200, application form present there only, 9 Apply CTAs all point to /apply, sitemap lists /apply, zero console errors. |
