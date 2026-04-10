# Sprint 2: Pages

> **PRDs:** 3, 4, 5, 6 (parallel), then 7 (sequential)
> **Goal:** Build all 4 MVP pages (Home restructure, About, Course, Contact) and wire up multi-page navigation.
> **Execution:** Orchestrator launches up to 4 parallel agents for PRDs 3-6. After all complete, PRD 7 runs sequentially.

---

## Shared Context

### What this sprint produces
- Restructured homepage (conference section removed, hero video replaced with image, social icons added)
- New `about.html` with company profile and leadership
- New `course.html` with WYDLS bootcamp detail and curriculum grid
- New `contact.html` with application form and qualification fields
- Consistent multi-page navigation across all 4 pages

### Parallel execution plan
PRDs 3, 4, 5, 6 can run in parallel because they each own separate files:
- PRD 3 edits `index.html` and `script.js`
- PRD 4 creates `about.html`
- PRD 5 creates `course.html`
- PRD 6 creates `contact.html`

PRD 7 (navigation) runs AFTER all four complete because it needs all pages to exist.

### Key files (shared, read-only for workers)
- `06-client-comms/homepage-markup-notes-2026-04-08.md` (authoritative homepage spec)
- `06-client-comms/client-brief.md` (copy voice, positioning, commercial terms)
- `css/tokens-cargonomics.css` (brand tokens, from Sprint 1)
- `docs/design-system.md` (conventions, from Sprint 1)

### Copy positioning rules
- Course-as-vetting: frame the bootcamp as a vetting mechanism for companies hiring fresh graduates
- Exclusivity and scarcity: "limited spots", "selected students", "invitation to apply"
- Student-first: hero leads with student outcome, not company logos
- Vasso drafts, Marilyn edits. All copy is draft quality.
- No em dashes.

### Conflict prevention
Each worker only modifies its own file(s). No worker edits another worker's HTML file. The nav in each new page is a copy of the current nav from index.html, which PRD 7 will unify after all pages exist.

### Gate criteria (before Sprint 3)
- [ ] All 4 HTML pages load correctly at localhost:3456
- [ ] Navigation works between all pages
- [ ] Contact form has all qualification fields
- [ ] Course page has curriculum grid
- [ ] All pages have consistent nav, footer, floating buttons
- [ ] All new sections have `data-section` attributes
- [ ] All PRDs committed and pushed to GitHub Pages
