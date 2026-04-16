# PRD 21: Client Image Replacements (April 15 WhatsApp Pack)

> **Order:** 21
> **Status:** In Progress
> **Type:** Content / Feature
> **Dependencies:** PRD 9 (Image & Logo Integration, Complete)
> **Blocks:** None direct; unblocks Marilyn sign-off on static MVP, which gates PRD 20 (WordPress migration planning) and Flexed clone.
> **Sprint:** 5 (parallel content track alongside infrastructure PRDs 15, 16, 17)
> **Created:** 2026-04-16
> **Source:** `06-client-comms/whatsapp-image-pack-2026-04-15.md`

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct the
> research items below, and generate 3 core + 2 stretch proactive items. Report findings to the
> user before beginning any WRITE phases.

---

## Why This Matters

Marilyn's single strongest critique in the April 8 kickoff was "too stock images." On 2026-04-15 she sent the authoritative replacement pack: five DepositPhotos selections tied to specific sections, plus a Google Drive folder of conference photos for Connect and Consult. This is direct client-side direction, the kind of input that unblocks sign-off, which in turn unblocks the WordPress migration planning track (PRD 20) and the Flexed site clone.

Replacing these images in place, with proper optimisation and alt text, lifts the site from "prototype with placeholders" to "client-approved content" without touching layout. The image review carousel from PRD 9 is a sensible casualty on the replaced slots: Marilyn has committed to specific images, so the click-to-cycle comparison is no longer needed on those slots.

---

## Current State

| What Exists | Source |
|-------------|--------|
| Branded placeholder JPEGs from PRD 9 on hero, coach, connect, consult, port-1 | `img/hero-1.jpg` through `img/hero-3.jpg`, `img/coach-1.jpg` through `img/coach-3.jpg`, `img/connect-1.jpg` through `img/connect-3.jpg`, `img/consult-1.jpg` through `img/consult-3.jpg`, `img/port-1.jpg` |
| Click-to-cycle review carousel | `js/image-review.js`, enabled via `data-images='[...]'` JSON pools on each `<img>` |
| Course overview hero with no image (text-only) | `course.html` `.course-overview` block |
| How-it-works section with no image | `index.html` `#how-it-works` / `.journey-v2` |

| What Arrived 2026-04-15 |
|-------------------------|
| 5 DepositPhotos lightbox URLs mapped to site sections |
| Google Drive folder of conference photos for Connect + Consult |
| Local downloads: `C:\Users\vasso\Downloads\Connect.jpg` (8.7 MB, 5561x3707), `C:\Users\vasso\Downloads\Consult.jpg` (16 MB, 5869x3913) |

---

## Desired Outcomes

### Section A: Homepage Replacements -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Hero image replaced** with Marilyn's DepositPhotos pick #1 | Hero is the first impression; current branded placeholder no longer matches Marilyn's visual direction | Hero slot shows the new image. Alt text describes the actual imagery. Page weight for `index.html` stays under 1.2 MB total. | DepositPhotos licensing. Dimensions of source asset. |
| A-2 | **Coach pillar card image replaced** with pick #2 | Pillar cards set the tone for the three-pillar model on the homepage | Coach card shows the new image. Alt text rewritten. Carousel pool either removed or refreshed. | Same as A-1. |
| A-3 | **How-it-works section gains an image** from pick #3 | Section currently has no image; adding one breaks up a text-heavy region | `#how-it-works` shows the new image inline with the journey steps. Layout does not regress. | Confirm the section has a slot for an image, or allocate one (template-level adjustment possible). |

### Section B: Course Page Replacements -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Course hero visual anchor** from pick #4 | `course.html` `.course-overview` currently has no image; PRD 19 flagged this gap | Course hero shows the new image. Aligns with whatever layout decision lands from PRD 19 (supersedes or merges with PRD 19). | Resolve PRD 19 overlap: mark superseded or collapse. |
| B-2 | **Curriculum-grid image replaced** with pick #5 | Current `img/port-1.jpg` is a placeholder | `.curriculum-grid` shows the new image. Alt text matches imagery. | Same as A-1. |

### Section C: Connect + Consult Conference Photos -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Connect pillar card** uses `Connect.jpg` from the Drive folder | Section currently uses stock-style placeholder `img/connect-1.jpg` | Connect card shows the optimised conference photo. Alt text rewritten. WebP variants served where supported. | None (asset on disk). |
| C-2 | **Consult pillar card** uses `Consult.jpg` from the Drive folder | Same as C-1 | Consult card shows the optimised conference photo. Alt text rewritten. WebP variants served where supported. | None (asset on disk). |

### Section D: Hygiene -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Carousel review mode retired on replaced slots** | Marilyn has chosen specific images; click-to-cycle no longer relevant for those slots | `data-images` attribute removed from replaced `<img>` elements; `js/image-review.js` handles absence gracefully (already does, confirmed in existing code) | None |

---

## What This PRD Does NOT Cover

- Sections Marilyn did not mention (stats, Vietnam, trainers, footer logo): keep current images per her explicit instruction.
- Image review carousel removal from all slots: out of scope; the carousel stays on any slot still using placeholders.
- Retroactive restyling of image containers: the replacement images fit the existing BEM-scoped `.pillar-card__image`, `.hero__media`, etc.
- Logo or favicon changes (PRD 9 territory).

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `06-client-comms/assets-from-marilyn/2026-04-15-image-pack/drive-originals/Connect.jpg` | COPY + README | Archive of original Drive download with provenance note |
| `06-client-comms/assets-from-marilyn/2026-04-15-image-pack/drive-originals/Consult.jpg` | COPY + README | Same |
| `05-deliverables/website-prototype/cargonomics-site/img/connect-conference.jpg` | CREATE | Optimised JPEG fallback, 1200x800, under 180 KB |
| `05-deliverables/website-prototype/cargonomics-site/img/connect-conference-800.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/img/connect-conference-1200.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/img/connect-conference-1600.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/img/consult-conference.jpg` | CREATE | Optimised JPEG fallback |
| `05-deliverables/website-prototype/cargonomics-site/img/consult-conference-800.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/img/consult-conference-1200.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/img/consult-conference-1600.webp` | CREATE | WebP srcset variant |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Swap Connect + Consult `<img>` for `<picture>` with WebP source; rewrite alt text; drop `data-images` on replaced slots |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY (later) | Deferred until DepositPhotos licensing resolved |

For the 5 DepositPhotos slots, files and edits will be listed at execution time of that follow-up run.

---

## Agent Context

| File | Purpose |
|------|---------|
| `06-client-comms/whatsapp-image-pack-2026-04-15.md` | Verbatim transcript + mapping pack |
| `docs/prds/PRD_09_Image_Logo_Integration.md` | Prior image pipeline, alt-text conventions, carousel behaviour |
| `docs/prds/PRD_19_Course_Hero_Visual_Anchor.md` | Overlapping proposal for course hero visual; candidate for supersession |
| `.claude/rules/website-conventions.md` | Modularity, BEM, version management, no hardcoded values |
| `06-client-comms/meeting-transcript-2026-04-08.md` | Kickoff critique context for "too stock images" |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Open each DepositPhotos URL + Drive folder. Confirm licensing path. Map each label to exact selector. Generate 3 core + 2 stretch proactive items. |
| 2 | `[WRITE]` `[SEQUENTIAL]` | Archive Connect.jpg + Consult.jpg into `06-client-comms/assets-from-marilyn/2026-04-15-image-pack/drive-originals/` with provenance README. |
| 3 | `[WRITE]` `[PARALLEL]` | Optimise Connect + Consult: 1 JPEG fallback + 3 WebP srcset variants per image. Target budgets per Design & Code Quality section. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Swap Connect + Consult `<img>` in `index.html` for `<picture>` elements. Rewrite alt text. Drop `data-images`. |
| 5 | `[READ-ONLY]` | Verify via `preview_start` + `preview_snapshot`. Zero console errors. Page weight within budget. |
| 6 | `[DEFERRED]` | DepositPhotos slots (A-1 through B-2): resolve licensing, download, optimise, swap. Separate run. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | DepositPhotos licensing | Does Cargonomics hold an active subscription? Or does Vasso purchase + invoice? | Blocks A-1, A-2, A-3, B-1, B-2 execution |
| R-2 | Drive folder access | Vasso's Google account read permission on the folder | Blocks C-1, C-2 if not readable. (Already bypassed: Vasso downloaded locally.) |
| R-3 | Label-to-section mapping | "How it works" is `#how-it-works`; "Student Immersion Training Program" is course hero (`.course-overview`); "What you'll learn" is `.curriculum-grid`. Confirm with Marilyn if ambiguous. | Wrong slot = wrong image in wrong place |
| R-4 | Source image dimensions and aspect ratios | DepositPhotos originals are typically 5000px+; Drive conference photos are 5561x3707 and 5869x3913 | Informs resize targets, aspect-ratio crop decisions |
| R-5 | Carousel fate on unmentioned slots | Keep the review carousel on hero-1/2/3, coach-1/2/3 variants? Or retire everywhere? | Affects cleanup scope |

---

## Proactive Items

| # | Type | Item | Description | Trigger |
|---|------|------|-------------|---------|
| 1 | Core | WebP primary + JPEG fallback via `<picture>` | Each replaced slot serves WebP (smaller, modern) with JPEG fallback for older clients. Cuts transfer 25-30% | Every replacement |
| 2 | Core | Alt text rewritten to match the actual imagery | Current alt text describes placeholder concepts ("Industry professionals networking at logistics conference"); new imagery needs new copy that describes what the photo shows. No em dashes. | Every replacement |
| 3 | Core | Provenance README in `06-client-comms/assets-from-marilyn/2026-04-15-image-pack/` | One README per asset batch: source URL, date, file sizes, delivery method. Protects audit trail. | Once per pack |
| -- | -- | --- Stretch below --- | | |
| 4 | Stretch | Low-quality image placeholder (LQIP) inline base64 | Tiny blur served inline, swapped on full load. Improves perceived performance on slow Vietnamese mobile connections | Applied opportunistically to hero only |
| 5 | Stretch | `srcset` with three width variants (800w/1200w/1600w) | Responsive image serving; larger lift but meaningful on mobile LCP | Connect + Consult already implemented as default; DepositPhotos slots on licensing resolution |

---

## Modularity & WordPress Readiness

- [ ] `data-slot` on each replaced `<img>` preserved (ACF field binding path intact)
- [ ] Images live in `img/`; originals archived separately in `06-client-comms/` (out of sub-repo, keeps deployable assets small)
- [ ] `<picture>` element migrates cleanly to WordPress Media Library; Elementor supports native `<picture>` blocks
- [ ] `data-section` and `data-elementor-widget` attributes on containing sections untouched
- [ ] No hardcoded values: image sizing via existing `.pillar-card__image`, `.hero__media`, etc. BEM classes

---

## Design & Code Quality

- [ ] Every `<img>` keeps `width`, `height`, and `loading="lazy"` (except above-fold hero which stays `loading="eager"`)
- [ ] Alt text: descriptive, no em dashes, no em dashes in descriptions
- [ ] EXIF + GPS metadata stripped from all published JPEGs and WebPs
- [ ] JPEG fallback target: under 180 KB per image
- [ ] WebP variants target: 1600w under 200 KB, 1200w under 120 KB, 800w under 60 KB
- [ ] Total `index.html` page weight after replacements: under 1.2 MB
- [ ] Total `course.html` page weight after replacements: under 900 KB

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Connect card image | Branded placeholder `img/connect-1.jpg` | `img/connect-conference.jpg` + WebP variants, conference photo | Visual check on homepage Connect card |
| Consult card image | Branded placeholder `img/consult-1.jpg` | `img/consult-conference.jpg` + WebP variants, conference photo | Visual check on homepage Consult card |
| Homepage total weight (after Connect+Consult swap) | ~900 KB (pre-swap baseline) | Under 1.2 MB | `preview_network` panel, or `curl` each asset and sum |
| Console errors on homepage | 0 | 0 | `preview_console_logs` |
| Alt text on replaced images | Placeholder concept | Describes actual photo content | `grep 'alt=' index.html` |
| Page Speed Insights LCP on homepage | TBD | Under 2.5s on 4G | PSI test (post-deploy) |

---

## Verification Checklist

| Check | Command / Tool | Expected Result |
|-------|----------------|-----------------|
| Images exist | `ls img/connect-conference*` and `ls img/consult-conference*` | 4 files per subject: 1 JPEG + 3 WebP |
| HTML swap landed | `grep 'connect-conference' index.html` | Present in both `<picture>` elements |
| Alt text updated | `grep 'alt="' index.html \| grep -i 'conference'` | New alt text present |
| Carousel attribute removed | `grep 'data-images' index.html` | No match on connect/consult rows |
| Page loads cleanly | `preview_start cargonomics-mock` + `preview_console_logs` | Zero errors |
| Visual regression | `preview_snapshot` + compare to baseline | Only image slots changed, no layout shift |
| WebP served to modern browsers | `preview_network` | `.webp` request on homepage load |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| DepositPhotos licensing blocker | A-1, A-2, A-3, B-1, B-2 stay open | High (unresolved at PRD creation) | Park affected slots in `open-questions.md`, deliver C-1, C-2 independently |
| Drive folder goes dark (link access revoked) | C-1, C-2 blocked | Low (assets already downloaded) | Archived copies in `06-client-comms/`; we no longer depend on the Drive link |
| Stripped EXIF removes rights metadata by accident | Licensing dispute downstream | Low | Keep originals with EXIF in `06-client-comms/` archive; only published copies strip metadata |
| Page weight balloons past budget | Slow Vietnamese mobile LCP | Medium | Enforce the compression targets; reject commit if budget broken |
| Stock-metadata alt text leaks into HTML | "Set 5: businesspeople.jpg" style alt strings ship to production | Medium | Alt text written by hand per image, not auto-extracted |
| PRD 19 overlap with B-1 | Two PRDs trying to own the course hero slot | Medium | Mark PRD 19 Superseded in the index once PRD 21 B-1 ships |

---

## Related Documents

- `06-client-comms/whatsapp-image-pack-2026-04-15.md` (source)
- `docs/prds/PRD_09_Image_Logo_Integration.md` (prior image pipeline)
- `docs/prds/PRD_19_Course_Hero_Visual_Anchor.md` (overlaps with B-1; supersede after B-1 lands)
- `docs/prds/PRD_20_WordPress_Migration_Plan.md` (downstream beneficiary of Marilyn sign-off)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-16 | Initial | PRD created from Marilyn's WhatsApp pack delivered 2026-04-15. 5 DepositPhotos slots + 2 Drive-sourced conference photos for Connect + Consult. |
| 2026-04-16 | C-1, C-2 | Connect + Consult images optimised (WebP + JPEG fallback, 3 size variants, EXIF stripped, provenance archived) and swapped in `index.html`. Alt text rewritten. Carousel removed on replaced slots. Status: In Progress (5 DepositPhotos slots pending licensing). |
