# Sprint 4: Ship

> **PRDs:** 12, 13 (sequential)
> **Goal:** QA the entire site, fix all issues, deploy final version, and hand off to Marilyn.
> **Execution:** Sequential in the orchestrator session. PRD 12 first (QA), then PRD 13 (deploy + handoff).

---

## Shared Context

### What this sprint produces
- A fully tested, responsive, accessible 4-page website
- Final deployment live on GitHub Pages
- Handoff message to Marilyn with summary, feedback requests, and next steps

### Key files
- All 4 HTML pages
- `css/style-v2.css` (responsive breakpoints)
- `css/tokens-cargonomics.css` (colour contrast check)
- `js/script.js` (functionality verification)
- `docs/prds/PRD_00_Index.md` (mark all PRDs complete)
- `03-project-management/tasks.md` (mark MVP tasks complete)
- `03-project-management/open-questions.md` (update resolved questions)
- `03-project-management/decisions-log.md` (add MVP delivery decision)
- `06-client-comms/marilyn-deliverables-checklist.md` (remaining items for handoff message)

### QA checklist targets
- Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO
- Responsive: mobile (375px), tablet (768px), desktop (1200px+)
- WCAG AA: colour contrast, form labels, alt text, keyboard navigation
- Functionality: forms, tracking, navigation, floating buttons, mobile menu
- Cross-page: UTM persistence, analytics firing, consistent styling

### Handoff message guidelines (from client-brief.md)
- No em dashes
- Positive framing (progress and decisions, not blockers)
- Include "why" with every "what"
- End with clear "what I need from you next" list
- Marilyn is the audience, not Elias

### Gate criteria (project MVP complete)
- [ ] Lighthouse scores 90+ on all 4 metrics for all 4 pages
- [ ] Zero console errors
- [ ] All form submissions work end-to-end
- [ ] UTM tracking verified
- [ ] GitHub Pages live and accessible
- [ ] Handoff message drafted and ready to send
- [ ] All 13 PRDs marked complete in PRD_00_Index.md
- [ ] tasks.md, open-questions.md, decisions-log.md updated
