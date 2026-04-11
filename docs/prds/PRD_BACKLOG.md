# PRD Backlog

Emergent items discovered during PRD execution. Any agent can append rows. Reviewed periodically and promoted to full PRDs when ready.

| Date | Discovered During | Item | Priority | Notes |
|------|-------------------|------|----------|-------|
| 2026-04-11 | PRD 3 | ~~Dead CSS cleanup for `.conference-v2` rules~~ | Low | **RESOLVED Sprint 4:** 48 lines removed from style-v2.css. |
| 2026-04-11 | PRD 3 | ~~Dead CSS cleanup for `.hero__video` etc.~~ | Low | **RESOLVED Sprint 4:** 63 lines removed + 7 responsive lines removed. |
| 2026-04-11 | PRD 3 | ~~`btn--outline-sm` class needs CSS rule~~ | Medium | **RESOLVED:** CSS exists at style-v2.css:1934-1950. Was already added during Sprint 3. |
| 2026-04-11 | PRD 3 | `.hero__media` class needs CSS rule or verify `.hero__video` rules apply | Medium | Hero image displays correctly at all viewports after dead CSS removal. No regression. Low priority. |
| 2026-04-11 | PRD 3 | ~~Em dashes in index.html~~ | Low | **RESOLVED Sprint 4:** 11 visible em dashes replaced with commas, colons, or shorter sentences. Comments left as-is. |
| 2026-04-11 | PRD 3 | `.footer__social-link` class needs CSS for SVG icon sizing and spacing | Medium | Footer social icons use inline SVGs with `fill="currentColor"`. Need hover state, spacing, and alignment CSS rules. |
| 2026-04-11 | PRD 4 | Elias title discrepancy: CLAUDE.md says "former CEO of ZIM Shipping Vietnam" but LinkedIn profile says "Managing Director". Used "Managing Director" on About page as LinkedIn is the primary source. CLAUDE.md should be corrected. | Low | Fact-checking only, no code change needed |
| 2026-04-11 | PRD 4 | ~~About page inline styles~~ | Medium | **RESOLVED Sprint 4:** 288 lines extracted to style-v2.css under ABOUT PAGE STYLES header. |
| 2026-04-11 | PRD 4 | About page company-profile section is text-heavy with no image. Consider adding a hero image (office exterior, team photo, or 3D shipping visual) once Marilyn provides DepositPhotos selections. | Medium | Depends on image deliverables from Marilyn |
| 2026-04-11 | PRD 4 | Partner trainer placeholder uses generic "IE" initials. Update when partner details become available from Marilyn. | Low | Tracked in marilyn-deliverables-checklist.md |
| 2026-04-11 | PRD 5 | ~~Homepage JSON-LD startDate mismatch~~ | Medium | **RESOLVED Sprint 4:** Fixed index.html JSON-LD from 2026-05-27 to 2026-06-01. Both pages now aligned. |
| 2026-04-11 | PRD 5 | ~~Course page inline styles in head style block~~ | Low | **RESOLVED Sprint 4:** 362 lines extracted to style-v2.css under COURSE PAGE STYLES header. |
| 2026-04-11 | PRD 5 | Day 5 port/dock facility visit has no named facility. Update course.html schedule and JSON-LD when Marilyn confirms the venue. | Low | Waiting on Marilyn. |
| 2026-04-11 | PRD 5 | Course PDF (deliverable 2b) still not received. Course page copy is drafted from homepage marquee and transcript. All module descriptions marked with PLACEHOLDER comments for Marilyn review. | Medium | Blocks final copy approval. |
| 2026-04-11 | PRD 6 | Airtable mapping gap: PRD 6 visible fields omit `university` and `graduation_year` which are in airtable-conventions.md section 4.1. Decide whether to add them to the application form or treat them as CRM-only fields populated manually. | Low | Does not block MVP. Backend mapping (PRD 8) should account for the delta. |
| 2026-04-11 | PRD 6 | WhatsApp/Zalo link destinations: contact-info section and floating buttons use `href="#"` placeholder links. Real Zalo and WhatsApp URLs needed once Marilyn provides the business contact numbers. | Medium | Blocks real messaging but not MVP launch. |
| 2026-04-11 | PRD 6 | Contact page WhatsApp green (#25D366 and #1DA851) is the only hardcoded hex in the contact page style block. Intentional: it is a third-party brand colour, not part of Cargonomics palette. | Low | Intentional decision, no action needed. |
| 2026-04-11 | PRD 6 | Inquiry form pre-selection via URL `?source=inquiry_coaching` works, but PRD 7 (navigation) should verify these cross-page links from index.html pillar Inquire buttons after all pages exist. | Medium | Functional now, needs verification in PRD 7. |
| 2026-04-11 | PRD 6 | PDPD consent text is placeholder. Legal review should confirm whether the consent copy meets Decree 13/2023/ND-CP requirements before production launch. | Medium | Not blocking MVP. |
