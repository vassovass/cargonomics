# Sprint 3: Integration

> **PRDs:** 8, 9, 10 (parallel), then 11 (sequential after PRD 10)
> **Goal:** Connect the form backend, integrate brand images/logo, set up analytics/GTM, and implement UTM tracking.
> **Execution:** Orchestrator launches 3 parallel agents for PRDs 8, 9, 10. After PRD 10 completes, PRD 11 runs.

---

## Shared Context

### What this sprint produces
- Working form submission pipeline (contact form data reaches a Google Sheet)
- Brand-appropriate images and the received logo integrated across all pages
- GA4 + GTM installed and firing on all pages
- UTM tracking script capturing parameters, persisting in cookies, auto-filling forms, pushing to dataLayer

### Parallel execution plan
PRDs 8, 9, 10 can run in parallel because they touch different concerns:
- PRD 8: form backend (JS form handler in contact.html)
- PRD 9: images and logo (img/ directory, `<img>` tags across all pages)
- PRD 10: analytics (GTM snippet in `<head>` of all pages, dataLayer initialization)

PRD 11 (UTM tracking) runs AFTER PRD 10 because it needs the GTM dataLayer to exist.

### Key files
- `05-deliverables/website-prototype/cargonomics-site/contact.html` (PRDs 8, 11)
- `05-deliverables/website-prototype/cargonomics-site/img/` (PRD 9)
- `06-client-comms/assets-from-marilyn/2026-04-09-cargonomics-logos/` (PRD 9, read-only source)
- `06-client-comms/assets-from-marilyn/3d-shipping-reference-marilyn-whatsapp.jpeg` (PRD 9, reference)
- All 4 HTML pages (PRDs 9, 10 modify all pages)
- `C:\Users\vasso\Downloads\UTM Grabber\handl-utm-grabber-v3\js\handl-utm-grabber.js` (PRD 11, reference)

### MCP Servers available
- **Nano Banana MCP:** Generate 3D shipping images matching the reference aesthetic (PRD 9)
- **Claude Preview:** Visual verification for image rendering and layout (all PRDs)

### Conflict prevention
PRD 9 and PRD 10 both modify `<head>` sections of all pages. To avoid conflicts:
- PRD 9 only modifies `<img>` tags and the nav logo
- PRD 10 only adds GTM snippets to `<head>` and `<body>`
- If conflicts arise, orchestrator resolves after both complete

### Gate criteria (before Sprint 4)
- [ ] Test form submission reaches Google Sheet with all fields including UTM data
- [ ] Logo PNG renders in nav on all 4 pages
- [ ] No stock photo URLs remain (all images local or generated)
- [ ] GA4 pageview fires on every page
- [ ] GTM dataLayer contains UTM data
- [ ] UTM cookies persist across page navigation
- [ ] First-touch attribution preserved on revisit with different UTMs
- [ ] All PRDs committed and pushed to GitHub Pages
