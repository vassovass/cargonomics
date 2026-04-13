# PRD 14: WhatsApp & Zalo Icon Integration

> **Order:** 14
> **Status:** Complete
> **Type:** Feature
> **Dependencies:** PRD 9 (Images)
> **Blocks:** None
> **Sprint:** Post-MVP
> **Created:** 2026-04-13

## Research-First Mandate

Agent MUST complete all READ-ONLY phases and research before WRITE phases.

## Why This Matters

The floating contact buttons and contact page social block used text labels ("WA", "Zalo") instead of recognizable brand icons. For Vietnamese users, Zalo is a primary messaging platform, and WhatsApp is widely used for business inquiries. Official brand SVG icons make these CTAs instantly recognizable, increasing tap rates and reducing friction for prospective bootcamp applicants reaching out.

This also wires up live contact links (previously placeholder `#` hrefs) with a default message starter, turning decorative buttons into functional lead capture touchpoints before the Tuesday handoff.

## Current State

| Element | Before | Issue |
|---------|--------|-------|
| Floating buttons (all 4 pages) | Text labels "WA" / "Zalo" in colored circles | Not recognizable as messaging app icons |
| Contact page social block | Plain text "WhatsApp" / "Zalo" buttons | No visual brand identity |
| All button hrefs | `href="#"` | Non-functional, no contact pathway |

## Desired Outcomes

### A. Official Brand Icons

| Outcome | Description |
|---------|-------------|
| WhatsApp glyph SVG | Official green glyph from WhatsApp Brand Resource Center (Digital RGB, 720x720 viewBox) |
| Zalo icon SVG | Official Zalo app icon (50x50 viewBox, blue #0068FF) |
| Success criteria | SVG icons render at 28x28px in floating buttons, 20x20px in contact social block |
| Research needed | Verify WhatsApp brand guidelines permit glyph usage on websites (confirmed: glyph is for digital use) |

### B. Live Contact Links

| Outcome | Description |
|---------|-------------|
| WhatsApp deep link | `https://wa.me/84903033039` with pre-filled message |
| Zalo deep link | `https://zalo.me/84903033039` |
| Default message | "Hi Cargonomics, I'd like to learn more about your programs." |
| Success criteria | Tapping buttons opens respective messaging app with pre-filled text |

### C. WordPress Readiness

| Outcome | Description |
|---------|-------------|
| `data-slot` attributes | Icon elements tagged for ACF field binding |
| External SVG files | Stored in `img/` for WordPress media library management |
| CSS custom properties | Icon sizing via standard properties, overridable by Elementor |

## What This PRD Does NOT Cover

- Footer social icons (Facebook, LinkedIn) -- separate scope
- Zalo Official Account API integration
- WhatsApp Business API / chatbot
- Icon color theming per brand (Flexed variant)

## Files Created/Modified

| File | Action | Description |
|------|--------|-------------|
| `img/icon-whatsapp.svg` | CREATE | Official WhatsApp glyph (green, Digital RGB) |
| `img/icon-zalo.svg` | CREATE | Official Zalo icon (blue #0068FF) |
| `index.html` | MODIFY | Floating buttons: SVG icons + live links |
| `about.html` | MODIFY | Floating buttons: SVG icons + live links |
| `course.html` | MODIFY | Floating buttons: SVG icons + live links |
| `contact.html` | MODIFY | Floating buttons + social block: SVG icons + live links |
| `css/style-v2.css` | MODIFY | `.floating-btn__icon` sizing for `<img>` elements |

## Agent Context

| File | Purpose |
|------|---------|
| `css/style-v2.css` | Floating button and contact info component styles |
| `css/tokens-cargonomics.css` | Brand color tokens |
| `docs/tokens.md` | Design token specification |
| `contact.html` | Contact info social block markup |

## Task-Optimized Structure

### Phase 1: Research [READ-ONLY] [PARALLEL]
- Verify WhatsApp brand guidelines for glyph usage
- Read existing floating button HTML and CSS across all pages
- Read contact page social block markup

### Phase 2: Assets [WRITE] [SEQUENTIAL]
- Copy WhatsApp glyph SVG to `img/icon-whatsapp.svg`
- Copy Zalo icon SVG to `img/icon-zalo.svg`

### Phase 3: HTML Updates [WRITE] [PARALLEL]
- Update floating buttons on index.html, about.html, course.html, contact.html
- Update contact page social block

### Phase 4: CSS Updates [WRITE] [SEQUENTIAL]
- Add `.floating-btn__icon` img sizing rules

### Phase 5: Verification [READ-ONLY] [SEQUENTIAL]
- Claude Preview: check icon rendering on all pages
- Console logs: zero errors
- Responsive: icons scale correctly on mobile

## Proactive Items

1. **Icon caching**: SVG files are small (~2KB each), but adding `Cache-Control` headers in `.htaccess` or WordPress config would prevent re-downloads
2. **Zalo deep link reliability**: `zalo.me` links may not work on desktop without Zalo installed; consider fallback to Zalo web chat
3. **WhatsApp pre-fill encoding**: The `text` parameter uses URL encoding; special characters in future message templates need proper encoding
4. **Icon color adaptation**: For Flexed brand variant, the WhatsApp green stays constant (brand requirement) but the Zalo blue and button background colors should adapt via tokens
5. **Accessibility**: Both icons have `alt=""` (decorative, since the parent `<a>` has `aria-label`); screen readers will announce the label text, not the icon

## Modularity & WordPress Readiness

- [x] `data-section` on floating-buttons container
- [x] `data-slot` on icon elements for ACF field binding
- [x] `data-cta-destination` for analytics tracking
- [x] External SVG files (WordPress media library compatible)
- [x] CSS sizing via standard properties
- [x] `target="_blank" rel="noopener"` on external links
- [x] BEM scoping (`.floating-btn__icon`, `.contact-info__social-icon`)

## Design & Code Quality

- [x] BEM naming throughout
- [x] No hardcoded color/font/spacing values in new CSS
- [x] Semantic HTML with ARIA labels on icon-only buttons
- [x] Accessible (icons are decorative `alt=""`, parent links have `aria-label`)
- [x] Vanilla JS only (no JS changes needed)
- [x] Performant (SVGs are <3KB each, no layout shifts)
- [x] No em dashes in copy

## Success Criteria

| Metric | Before | After | Verification |
|--------|--------|-------|--------------|
| Floating button icons | Text labels | SVG brand icons | `preview_inspect .floating-btn__icon` |
| Contact social icons | Plain text | SVG + text | `preview_inspect .contact-info__social-icon` |
| WhatsApp link | `#` | `wa.me/84903033039?text=...` | `preview_snapshot` href check |
| Zalo link | `#` | `zalo.me/84903033039` | `preview_snapshot` href check |
| Console errors | 0 | 0 | `preview_console_logs` |
| Icon sizing (floating) | N/A | 28x28px | `preview_inspect` width/height |
| Icon sizing (contact) | N/A | 20x20px | `preview_inspect` width/height |

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Zalo deep link not working on desktop | Medium | Medium | Users on desktop can search the number manually; mobile is primary target |
| WhatsApp brand compliance | Low | Low | Using official glyph from brand resource center, correct variant for digital use |
| SVG rendering issues in older browsers | Low | Low | Both SVGs are simple paths, no filters or animations |

## Related Documents

- WhatsApp Brand Resource Center (official download)
- `06-client-comms/homepage-markup-notes-2026-04-08.md` (Marilyn's icon request)
- `docs/tokens.md` (design token spec)

## Changelog

| Date | Change |
|------|--------|
| 2026-04-13 | PRD created and implemented. WhatsApp glyph + Zalo icon SVGs added, floating buttons and contact social block updated across all 4 pages, live links wired with pre-filled message. |
