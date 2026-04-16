# Deferred Items — Cargonomics Website

**Purpose.** Durable record of site issues and observations noticed during work but not fixed in the same change. Distinct from `03-project-management/open-questions.md`, which tracks items blocked on PEOPLE. This file tracks items blocked on TIME or PRIORITY — code and UX observations that can be addressed unilaterally when scheduled.

**Anti-duplication rule.** See `.claude/rules/website-conventions.md` Tracker Discipline section. An item never carries `open` status in both trackers simultaneously.

**Status flow.** `open` → `in-progress` (linked to active work) → `scheduled` (linked to a PRD number) → `done` (linked to commit SHA or PRD closing date).

**When to use which tracker:**
- Does fixing it require waiting on someone? → `03-project-management/open-questions.md`
- Can we just code it when priority allows? → this file.

**Chat-ask logging rule (new, 2026-04-16).** See `.claude/rules/deploy-protocol.md` "Chat-ask logging" section. Any user ask stated in chat is logged here in the same turn, BEFORE the work begins, so no ask drops silently.

---

## Active items (open + in-progress + scheduled)

| # | Date added | Observed during | Description | Impact | Proposed fix | Effort | Owner | Status |
|---|------------|-----------------|-------------|--------|--------------|--------|-------|--------|
| D1 | 2026-04-14 | Process A seed (Apr 14 planning) | `course.html` testimonials section is an empty `.course-placeholder` | Low. Reduces course page credibility signal below what PRD 5 envisaged. | Hide the section until real testimonials exist (Commit 1 of Apr 16 plan). Long-term: gather 2-3 testimonials from prior conference attendees or pilot cohort. | Small (hide) / Medium (content gather) | Vasso | done (96744fb) |
| D2 | 2026-04-14 | Process A seed | `course.html` FAQ section empty placeholder | Low. Applicants have unanswered practical questions (cost, time commitment, post-graduation commitment). | Hide for now. Long-term: draft 6-8 FAQ items from recurring WhatsApp questions. Render as accordion inside existing `.course-placeholder` block. | Small (hide) / Small (content + accordion CSS) | Vasso | done (96744fb) |
| D3 | 2026-04-14 | Process A seed | `course.html` instructors section shows only placeholder card beyond Elias | Medium. Single-leader framing weakens the "learn from veterans" promise. | Hide for now. Long-term: recruit 2-3 named trainers with photos and bios. | Small (hide) / Medium (content + pending Marilyn) | Vasso | done (96744fb) |
| D4 | 2026-04-14 | Process A seed | Homepage second trainer card is a placeholder ("Senior Industry Advisor") | Medium. Visible placeholder erodes trust. | Remove the card entirely for now. Reinstate when real partner named. | Small | Vasso | done (96744fb) |
| D5 | 2026-04-14 | Process A seed | Homepage "Why Us" section has structure but placeholder copy | Medium. MVP ships with visible placeholders where Marilyn's bullets belong. | Replace placeholder copy with Marilyn's bullets when that input arrives. Cross-reference: open-questions item for Why Us bullets. | Small | Vasso / Marilyn | open (blocked on Marilyn content) |
| D6 | 2026-04-14 | Process A seed | Application form lacks post-submit success-state styling (`.form--submitted` class declared but unstyled) | Low. Submission still works via GAS backend but visual feedback is minimal. | Add a success card with check icon, confirmation copy, and what-to-expect-next. Style the `.form--submitted` class. | Small | Vasso | open |
| D7 | 2026-04-11 | PRD 3 | `.hero__media` class needs CSS rule or verify `.hero__video` rules apply | Low | Verify, add rule if needed | Small | Vasso | open |
| D8 | 2026-04-11 | PRD 3 | `.footer__social-link` class needs CSS for SVG icon sizing and spacing | Medium | Add hover state, spacing, and alignment CSS rules | Small | Vasso | open |
| D9 | 2026-04-11 | PRD 4 | CLAUDE.md says "former CEO of ZIM Shipping Vietnam" but LinkedIn says "Managing Director". Used "Managing Director" on About page. | Low. Fact-checking only, no code change needed. | Correct CLAUDE.md | Trivial | Vasso | open |
| D10 | 2026-04-11 | PRD 4 | About page company-profile section has no hero image | Medium | Consider adding a hero image (office exterior, team photo, or 3D shipping visual) once Marilyn provides DepositPhotos. | Medium | Vasso / Marilyn | done (96744fb) |
| D11 | 2026-04-11 | PRD 4 | Partner trainer placeholder uses generic "IE" initials. | Low. Tracked in marilyn-deliverables-checklist. | Update when partner details arrive. | Small | Vasso / Marilyn | superseded (D4 done in 96744fb) |
| D12 | 2026-04-11 | PRD 5 | Day 5 port/dock facility visit has no named facility. | Low. Update course.html schedule + JSON-LD when Marilyn confirms venue. | Update copy when named | Small | Vasso / Marilyn | open (blocked on Marilyn) |
| D13 | 2026-04-11 | PRD 5 | Course PDF (deliverable 2b) still not received. Course page copy drafted from homepage marquee and transcript, marked PLACEHOLDER. | Medium. Blocks final copy approval. | Replace when PDF arrives | Medium | Vasso / Marilyn | open (blocked on Marilyn) |
| D14 | 2026-04-11 | PRD 6 | Airtable mapping gap: PRD 6 visible fields omit `university` and `graduation_year` which are in airtable-conventions.md 4.1. | Low. Does not block MVP. | Decide to add to form or treat as CRM-only | Small | Vasso | open |
| D15 | 2026-04-11 | PRD 6 | WhatsApp/Zalo link destinations: contact-info section and floating buttons use `href="#"` placeholder. | Medium. Blocks real messaging but not MVP launch. | Update once Marilyn provides business numbers | Small | Vasso / Marilyn | open (blocked on Marilyn) |
| D16 | 2026-04-11 | PRD 6 | PDPD consent text is placeholder. | Medium. Not blocking MVP. | Legal review against Decree 13/2023/ND-CP before production launch | Medium | Vasso | open |

---

## Apr 16 session intake (NEW — from chat-asks backlog audit)

Items below were identified by auditing past session logs on 2026-04-16 after Vasso flagged that asks were dropping. Entering them here with full provenance.

| # | Date added | Source session | Description | Impact | Proposed fix | Effort | Owner | Status |
|---|------------|----------------|-------------|--------|--------------|--------|-------|--------|
| D17 | 2026-04-16 | Apr 14 session | **Trusted Partners section on homepage.** Vasso: "trusted partners section that needs to be added in... with logos... but for now, it might just be a list of who the partners are... social validation." Text-based now, logo-ready for later. Seed from Elias' verified career history (APL, CMA CGM, ZIM) + VN market majors. | High. Social validation is a named ask. Marilyn has not seen this ask addressed. | Build `.trusted-partners` section with text tiles; `data-partner-name` + `data-partner-logo-src` ready for future logo swap. | Medium | Vasso | done (dcb56db) |
| D18 | 2026-04-16 | Apr 14 session | **Trusted Partners on course page.** Adapted version of D17 — same section or reworked for course context. | High. Same ask as D17. | Same module, placed between `.why-apply` and `.curriculum-grid`. | Medium | Vasso | done (dcb56db) |
| D19 | 2026-04-14 | Apr 14 session | **Apply page split.** Marilyn's instruction per Vasso: separate `apply.html` for prospective applicants; `contact.html` stays a general inquiry form. | High. Structural. Marilyn-requested. | Create `apply.html`, move application form; strip from contact.html; update nav + CTAs + sitemap + redirects. | Medium | Vasso | done (ddb5d1f) |
| D20 | 2026-04-14 | Apr 14 session | **Extra form questions from Marilyn** pending. | Medium. Form incomplete until received. | Add fields when Marilyn sends them. | Small | Marilyn | open (blocked on Marilyn) |
| D21 | 2026-04-16 | Apr 16 session | **About hero image stretched landscape.** Vasso: "this image looks weird being so landscape". Currently `port-1.jpg` with no aspect constraint. | High. Visible immediately on About page load. | Swap to `hero-home.jpg` with `<picture>` + srcset. Add `object-fit: cover` with max-height. | Small | Vasso | done (96744fb) |
| D22 | 2026-04-16 | Apr 16 session | **Three Pillars on About is text-heavy.** Vasso: "very text heavy... make it look better". | High. Visible immediately on About page scroll. | Add image headers reusing `coach-pillar`, `connect-conference`, `consult-conference` images. Promote numbering. Trim closing meta-sentence from each body. | Medium | Vasso | done (96744fb) |
| D23 | 2026-04-14 | Apr 14 session | **Image/visual to break up text-only homepage spot.** Screenshot reference, exact spot unclear. | Medium. Improves scannability. | Vasso to point at specific spot in a future chat. | Small once located | Vasso | **open (blocked on Vasso clarification)** |
| D24 | 2026-04-14 | Apr 14 session | **Mobile-responsive audit, WordPress/Elementor-forward.** Full layout assessment and fix pass. | Medium-High. Mobile is primary for VN students. | Dedicated PRD 22 — mobile audit spanning all pages, every breakpoint, with token adjustments and BEM refactors where needed. Run via Claude Preview at 360/375/414/768/1024. | Large (3+ hours) | Vasso | **scheduled (PRD 22)** |
| D25 | 2026-04-14 | Apr 14 session | **Color picker + reset in footer** for brand-color experimentation. Modular, removable before WordPress migration. | Medium. Internal dev tool for design iteration with Marilyn. | Dedicated PRD 23 — vanilla JS widget in a corner of the footer, writes to CSS custom properties, persists in localStorage, reset button clears. | Medium | Vasso | **scheduled (PRD 23)** |
| D26 | 2026-04-14 | Apr 14 session | **Module / pattern library page** (`styleguide.html`). Every section rendered in isolation, naming conventions documented, WP-theme-kitchen-sink style. | Medium. Serves design iteration + WP migration handoff. | Dedicated PRD 24 — `styleguide.html` rendering each component (hero, pillar, trainer card, program-featured, curriculum-marquee, etc.) with its class names, tokens used, and Elementor target. | Large | Vasso | **scheduled (PRD 24)** |
| D27 | 2026-04-16 | Apr 16 session | **Site review before Marilyn** — confirm v4/v5/v6 state is presentable. Sent with CTA + one-pager. | High. Marilyn about to review. | Run full placeholder audit + visual scroll of all pages post-Apr 16 commits. | Small | Vasso | done (Apr 16 session audit complete; all visible placeholders closed) |
| D28 | 2026-04-11 | Apr 11 session | About page right-side blank space + "whole long footer" weird | Medium | Verify after Commit 1 fixes land; may already be resolved by hero image swap + pillars redesign | Small | Vasso | done (96744fb; Apr 11 right-side blank space fixed by 2-col grid + hero image) |

---

## Done

| # | Date resolved | Description | Commit / PRD |
|---|---------------|-------------|--------------|
| D1 | 2026-04-16 | course.html testimonials section hidden (empty placeholder, visible as empty shell) | Commit `96744fb` (PRD 18 follow-through Phase 1) |
| D2 | 2026-04-16 | course.html FAQ section hidden (6 question headings with no answers) | Commit `96744fb` |
| D3 | 2026-04-16 | course.html instructors section hidden (placeholder text only) | Commit `96744fb` |
| D4 | 2026-04-16 | Homepage second trainer card removed ("Senior Industry Advisor" logo-opacity placeholder) | Commit `96744fb`. Archived in `docs/archived-components.md` id=`trainer-card-partner-placeholder` |
| D10 | 2026-04-16 | About page hero image: port-1.jpg replaced with hero-home.jpg via `<picture>` + 4:5/16:9 aspect constraint | Commit `96744fb` |
| D17 | 2026-04-16 | Trusted Partners section on homepage (11 partners + "+ 1,000 more" tile, text-first, logo-forward attributes) | Commit `dcb56db` |
| D18 | 2026-04-16 | Trusted Partners section on course page (adapted placement-first framing) | Commit `dcb56db` |
| D19 | 2026-04-16 | Apply page split: new `apply.html` holds application form, `contact.html` reduced to inquiries + contact-info, 9 Apply Now CTAs retargeted site-wide, sitemap + redirects + Course JSON-LD Offer URL all updated | Commit `ddb5d1f` |
| D21 | 2026-04-16 | About hero image stretched-landscape complaint: fixed via image swap + 2-column grid + aspect constraint | Commit `96744fb` |
| D22 | 2026-04-16 | Three Pillars on About text-heavy: image headers added to all 3 cards, number promoted, closing meta-sentence trimmed from each body | Commit `96744fb` |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-14 | Created as Process A deliverable per approved April 14 plan. Seeded with 6 internal observations. |
| 2026-04-16 | Rebuilt from chat-ask backlog audit. Added D17-D28 from past-session mining + current session. Process fix: chat-ask logging rule codified in `.claude/rules/deploy-protocol.md` so future asks never drop. |
