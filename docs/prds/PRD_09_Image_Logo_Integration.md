# PRD 09: Image & Logo Integration

> **Order:** 9
> **Status:** In Progress
> **Type:** Feature
> **Dependencies:** PRD 2 (Brand Token Activation & Font Fix)
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

Marilyn's single strongest critique during the April 8 kickoff was the imagery. She wants a modern, innovative, young aesthetic, specifically "3D animated representation of shipping." The current site uses generic stock photos across every section (hero, pillars, journey, Vietnam, conference). These images undermine the positioning Cargonomics is trying to establish as a cutting-edge training company for the next generation of shipping professionals.

The logo situation is equally important. The site currently shows a text-based placeholder in the nav. The real Cargonomics logo has been received: 10 PNG variants (RGB and CMYK combinations) plus an AI source file, delivered by Marilyn on April 9 and stored in the assets folder. Using the real logo immediately elevates the site from "prototype" to "real brand" in Marilyn's eyes, and that perception shift matters for getting sign-off on the Tuesday deadline.

Beyond aesthetics, images are the heaviest assets on any web page. Unoptimized images on slow Vietnamese mobile connections (the primary device for target students) will tank load times and push performance scores below acceptable thresholds. Every image must be compressed, correctly sized, served in modern formats where possible, and lazy-loaded if below the fold. This is a performance requirement, not a polish task.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Text-based logo placeholder in nav | Not the real brand. Marilyn will notice immediately. |
| Stock photos from Pexels/Unsplash across all sections | "Too stock images" per Marilyn's kickoff feedback |
| No footer logo | Footer has no brand mark |
| No favicon | Browser tab shows generic icon |
| No OG image for social sharing | Links shared on Zalo/WhatsApp/Facebook show no preview |
| 10 logo PNG variants received (April 9) | Not yet integrated into the site |
| 3D shipping reference image received (WhatsApp) | Style guide exists but no matching images on the site |

---

## Desired Outcomes

### Section A: Logo Integration -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **PNG logo in navigation on all pages** | Text placeholder looks like a prototype | Logo renders on all 4 pages, no distortion, no white background rectangle | Check transparency of RGB variant |
| A-2 | **Logo in footer on all pages** | No brand mark in footer | Logo visible with sufficient contrast against dark background | Check for reversed/white variant in logo set |
| A-3 | **Favicon from logo** | Generic browser tab icon | Recognizable icon at 32x32 and 180x180 sizes | Determine if logo mark can be isolated from wordmark |

### Section B: Image Replacement -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **All stock photos replaced across all 4 pages** | "Too stock images" feedback from Marilyn | Zero stock photo URLs in HTML source | Inventory current stock images; check if DepositPhotos picks (deliverable 3a) arrived |
| B-2 | **Replacement images match 3D shipping aesthetic** | Current images undermine brand positioning | Images align with Marilyn's WhatsApp reference style | Test Nano Banana prompts if generating images |
| B-3 | **Images optimized for web performance** | Slow load on Vietnamese mobile connections | Hero under 200KB, others under 100KB, all with `width`/`height` attributes | Check WebP support for Vietnamese market; determine compression tooling |

### Section C: Social & Meta -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **OG image for social sharing** | No preview when URL shared on Zalo/WhatsApp/Facebook | `og:image` meta tag on every page, 1200x630px branded image | None |
| C-2 | **Meaningful alt text on every image** | Accessibility gap, screen readers get no context | Every `<img>` has descriptive alt (decorative images use `alt=""` with `role="presentation"`) | None |

### Section D: Image Review Carousel -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Click-to-cycle image review on all image slots** | Cannot compare multiple generated image options in-context | Clicking an image cycles to the next option, wrapping back to first after last | None |
| D-2 | **Current image filename displayed as overlay** | Cannot identify which image to keep when reporting choices | Filename or ID shown on the image (e.g., "hero-2.png") | None |
| D-3 | **Review mode is a removable layer** | Carousel logic must not ship to production permanently | `js/image-review.js` is a standalone file. Removing the script tag and data attributes returns images to static. | None |

**D-1 details:**
- Each `<img>` with multiple options gets a `data-images` attribute: `data-images='["img/hero-1.png","img/hero-2.png","img/hero-3.png"]'`
- Clicking the image advances to the next `src` in the array
- Cursor shows pointer on hover to indicate clickability
- Works on mobile (tap to cycle)

**D-2 details:**
- Small overlay label in the bottom-right corner of the image showing the current filename
- Semi-transparent dark background for readability
- Updates when image cycles

**D-3 details:**
- `js/image-review.js` is loaded via `<script>` tag at end of body
- All carousel behavior is initialized from that script reading `data-images` attributes
- To finalize: remove `<script>` tag, remove `data-images` attributes, keep the chosen `src`

---

## What This PRD Does NOT Cover

- Flexed logo integration (separate sub-brand, not blocking Tuesday MVP)
- Video content or animated GIFs
- Creating a full brand photography library
- Image CDN or external hosting (all images are local files)
- Responsive image art direction with different crops for mobile vs desktop (that is PRD 12 scope if needed)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/img/` | CREATE (multiple) | Logo files, replacement images, favicon, OG image |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Replace stock image refs, add logo, add OG meta, add favicon link |
| `05-deliverables/website-prototype/cargonomics-site/about.html` | MODIFY | Replace stock images, add logo, OG meta, favicon |
| `05-deliverables/website-prototype/cargonomics-site/course.html` | MODIFY | Replace stock images, add logo, OG meta, favicon |
| `05-deliverables/website-prototype/cargonomics-site/contact.html` | MODIFY | Replace stock images, add logo, OG meta, favicon |
| `05-deliverables/website-prototype/cargonomics-site/js/image-review.js` | CREATE | Temporary click-to-cycle carousel for image review. Reads data-images attributes, cycles src on click, shows filename overlay. |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens, received assets list |
| `06-client-comms/assets-from-marilyn/2026-04-09-cargonomics-logos/Cargonomics-logo only/` | All 10 received logo PNG variants plus AI source |
| `06-client-comms/assets-from-marilyn/3d-shipping-reference-marilyn-whatsapp.jpeg` | Marilyn's aesthetic reference for image generation |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | Lines 142-148: image feedback; Lines 155-156: logo request |
| `06-client-comms/marilyn-deliverables-checklist.md` | Deliverable 3a (DepositPhotos picks, due Sunday April 12) status |
| `01-research/cargonomics-brand-identity.pdf` | Brand guide R2 with Navy Blue + Gold palette |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification via `preview_start "cargonomics-mock"` |
| **Nano Banana** | 3D shipping image generation if DepositPhotos picks unavailable |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Inventory all stock image URLs across all 4 HTML pages |
| 2 | `[READ-ONLY]` | Inspect received logo files: dimensions, transparency, identify RGB variant for nav, check for reversed variant |
| 3 | `[READ-ONLY]` | Check if DepositPhotos picks (deliverable 3a) arrived. If not, prepare Nano Banana prompts from WhatsApp reference. |
| 4 | `[READ-ONLY]` | Generate 5 proactive items based on codebase state and image audit findings |
| 5 | `[WRITE]` `[PARALLEL with Phase 6]` | Replace text logo with PNG in nav on all pages. Add footer logo. Create favicon. |
| 6 | `[WRITE]` `[PARALLEL with Phase 5]` | Generate or source replacement images. Compress all images. Place in `img/` with descriptive filenames. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Replace all stock image refs in HTML. Add `width`, `height`, `alt`, `loading` to every `<img>`. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Create OG image (1200x630). Add OG meta and favicon links to `<head>` of every page. |
| 9 | `[READ-ONLY]` | Visual verification: logo rendering, image display, footer contrast. Check console for broken paths. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | DepositPhotos picks from Marilyn | RESOLVED: DepositPhotos picks not yet received (due Sunday April 12). Decision: generate all images via Nano Banana MCP now. Marilyn's picks can replace generated images later if preferred. | Using Marilyn's picks avoids a "that is not what I wanted" rejection. |
| R-2 | Logo variant transparency | Open `RGB_Cargonomics - Blue n Gold.png` and verify transparent background. If opaque, check other variants. | A white rectangle behind the logo on the nav is an immediate visual defect. |
| R-3 | Logo file dimensions | Check pixel dimensions of received PNGs. If very large (5000px+), resize for web. If very small, may pixelate. | Serving a 5MB logo in the nav is a critical performance issue. |
| R-4 | Reversed/white logo variant | Check if any of the 10 variants is white or reversed for dark backgrounds. | Footer uses dark Navy background. Standard logo may lack contrast. |
| R-5 | WebP browser support in Vietnam | Check current WebP support. If above 95%, simple WebP-only approach may work. | Determines whether `<picture>` fallback is needed or optional. |
| R-6 | Nano Banana prompt strategy | If generating images, test prompts using WhatsApp reference as style input. | Generated images that miss the aesthetic will be rejected. |
| R-7 | Image compression tooling | Best available approach: Squoosh CLI, Sharp, manual export settings. Need repeatable process. | Multiple images need compression. Scripted approach saves time. |
| R-8 | Current stock image inventory | Scan all 4 HTML files for external image URLs. Create complete replacement list. | Missing even one stock photo URL means the PRD fails. |

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
| Logo in nav | Text placeholder | PNG logo on all 4 pages, no distortion | `preview_screenshot` of nav on each page |
| Logo in footer | None | Logo visible with contrast against dark background | `preview_screenshot` of footer |
| Zero stock photo URLs | Multiple external URLs | `grep` for pexels, unsplash, placeholder returns zero | Automated grep |
| Replacement image aesthetic | Stock photos | Modern 3D shipping style per Marilyn's reference | `preview_screenshot` for orchestrator review |
| All images have alt text | Unknown | Every `<img>` has descriptive alt | `grep` for `<img` and verify `alt` presence |
| Image file sizes | Unknown | Hero under 200KB, others under 100KB | File size check on `img/` directory |
| Lazy loading below fold | Unknown | Below-fold images have `loading="lazy"`, hero does not | `grep` for `loading=` on `<img>` tags |
| Layout stability | Unknown | Every `<img>` has `width` and `height` | `grep` for `<img` and verify attributes |
| OG image present | None | `og:image` meta tag in `<head>` of every page | `grep` across HTML files |
| Favicon present | None | `<link rel="icon">` in every page, file exists | `grep` and file check |
| No console errors | Unknown | Zero broken image path errors | `preview_console_logs` |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Nav logo all pages | PNG renders without white rectangle, correct size | `preview_screenshot` at desktop and mobile |
| Footer logo | Sufficient contrast on dark background | `preview_screenshot` |
| Image aesthetic | Matches 3D shipping reference style | `preview_screenshot` for review |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No external stock URLs | `grep -r "pexels\|unsplash\|placehold" *.html` | Zero matches |
| All images have alt | `grep '<img' *.html` | Every img tag has alt attribute |
| Lazy loading | `grep 'loading=' *.html` | Below-fold images have `lazy`, hero has `eager` or none |
| Width/height attributes | `grep '<img' *.html` | Every img has width and height |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 09 - image and logo integration`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Marilyn's DepositPhotos picks not received by execution time | Must generate all images via Nano Banana, adding time and aesthetic uncertainty | Medium | Start Nano Banana prompt testing in Phase 3 regardless. Have generated fallbacks ready. |
| Logo PNG has opaque white background | White rectangle visible in nav on non-white backgrounds | Medium | Check transparency in Phase 2. If opaque, attempt background removal or use AI source file. |
| Generated 3D images miss Marilyn's aesthetic | Marilyn rejects the look, requiring re-generation | Medium | Generate 2-3 style variants per section. Present options before committing. Use WhatsApp reference as explicit style input. |
| Large hero image tanks mobile load | Performance drops below threshold, slow first paint | High | Compress aggressively. Use responsive `srcset` for smaller mobile images. Target under 200KB desktop, under 80KB mobile. |
| Favicon unrecognizable at 32x32 | Browser tab shows blurry blob | Low | If full wordmark is not legible at 32px, use only the icon/mark portion. Test at actual size. |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` Lines 142-148: image feedback
- `01-research/cargonomics-brand-identity.pdf` R2 brand guide

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, research table, proactive items table, verification checklist |
| 2026-04-11 | All | Session decisions: image generation via Nano Banana (not waiting for DepositPhotos), new Section D added for click-to-cycle image review carousel, status updated to In Progress |
