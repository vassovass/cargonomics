# PRD 13: Final Deploy & Client Handoff

> **Order:** 13
> **Status:** Proposed
> **Type:** Ops
> **Dependencies:** PRD 12 (Responsive & Accessibility)
> **Blocks:** None (final PRD)
> **Sprint:** 4
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

This is the moment the Tuesday April 14 deadline is met. The MVP website has been built, tested, and QA-verified. Now it needs to be deployed to the live GitHub Pages URL and handed off to Marilyn with a clear, professional message. The handoff message is not an afterthought. It is a deliverable. Marilyn is a brand and integrated marketing professional who evaluates the strategic thinking behind the execution, not just the execution itself. A sloppy handoff with a bare link and no context would undermine all the work that went into the build.

The handoff must give Marilyn everything she needs to review the site on her own terms, provide specific feedback, and understand exactly what comes next. It must also list the deliverables Vasso still needs from her (with deadlines) so the project keeps moving forward. A well-structured handoff reduces back-and-forth, accelerates Marilyn's sign-off, and keeps the WordPress migration and June 1 bootcamp launch on track.

This is also the first major deliverable Vasso has shipped for this engagement. First impressions of delivery quality set the standard for the entire retainer relationship and the broader portfolio play across Elias's other projects. The carry-over items (Techcombank payment unblock on Vasso's side, domain/DNS from Marilyn, outstanding deliverables from the checklist) must be tracked but never framed as blockers in client communication.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Complete MVP website (4 pages, form, analytics, images) | Not yet deployed to live URL after final QA |
| GitHub Pages configured for `vassovass/cargonomics` | Must verify deployment works post-QA push |
| Marilyn deliverables checklist | Some items may still be pending at handoff time |
| No handoff message drafted | Marilyn has no context for review |
| No screenshots captured | No visual reference for email/WhatsApp |
| Project state files (tasks.md, open-questions.md, decisions-log.md) | Not updated with MVP completion |

---

## Desired Outcomes

### Section A: Deployment -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **All changes committed and pushed** | Uncommitted work not deployed | Clean `git status` in sub-repo, main branch up to date | None |
| A-2 | **GitHub Pages deployment verified** | Site may not be live after push | All 4 pages load, assets load, form works, analytics fire on live URL | Check GitHub Pages deployment source config |
| A-3 | **Domain readiness assessed** | DNS access may or may not be available | Documentation of DNS config needed, or positive framing of GitHub Pages URL as preview | None |

**A-3 details:**
- If domain access available: document CNAME/A record config needed
- If not available (likely): frame github.io URL as preview, note domain connection is a 15-minute config step

### Section B: Client Handoff Message -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Complete handoff message drafted** | Marilyn has no context for review | Message covers all 6 sections (below), uses Vasso's voice, no em dashes, positive framing | Review current deliverables checklist status |
| B-2 | **Desktop and mobile screenshots captured** | No visual reference for email/WhatsApp | 8 screenshots: 4 pages at desktop (1200px) and mobile (375px) | None |

**B-1 required sections:**
1. What Was Built (4 pages, brand, form, analytics, responsive)
2. How To Test It (live URL, phone + desktop, test form, sample UTM link)
3. What Needs Marilyn's Review (images, copy, layout, brand feel)
4. Remaining Deliverables From Marilyn (from checklist, framed positively)
5. What Comes Next (review, feedback, WordPress migration, Flexed, CRM)
6. Action Items For Marilyn (numbered with deadlines and reasons)

### Section C: Project State Updates -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **PRD index marked complete** | Index does not reflect finished state | All 13 PRDs show completion status, sprint summary updated | None |
| C-2 | **tasks.md, open-questions.md, decisions-log.md updated** | State files stale | Sprint 4 tasks complete, resolved questions marked, deployment decision logged | Check for questions resolved during build |

### Section D: Optional Enhancement -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Video walkthrough (2-3 min) if time allows** | Screenshots may not convey responsive behaviour | Recording shows navigation, mobile resize, form submission | Check if screen recording tool is available |

---

## What This PRD Does NOT Cover

- WordPress migration (separate phase, after Marilyn signs off)
- Custom domain configuration (depends on Marilyn providing DNS access)
- Flexed site deployment (lower priority, separate timeline)
- CRM/Airtable setup (Phase 1, entirely separate track)
- Actual sending of the handoff message (Vasso sends it himself; this PRD drafts it)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_00_Index.md` | MODIFY | Mark all PRDs complete, update sprint summary |
| `03-project-management/tasks.md` | MODIFY | Mark Sprint 4 complete, add post-MVP section |
| `03-project-management/open-questions.md` | MODIFY | Mark resolved questions, add new if any |
| `03-project-management/decisions-log.md` | MODIFY | Log deployment and handoff decisions |
| `06-client-comms/handoff-message-2026-04-14.md` | CREATE | Complete handoff message for Marilyn |
| `06-client-comms/handoff-screenshots/` | CREATE | Directory with 8 screenshots |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Git protocol, deployment config |
| `06-client-comms/marilyn-deliverables-checklist.md` | Source for "remaining deliverables" section of handoff |
| `06-client-comms/client-brief.md` | Copy voice, communication preferences, no em dashes, positive framing |
| `03-project-management/tasks.md` | Current sprint state to update |
| `03-project-management/open-questions.md` | Resolved/open questions to update |
| `03-project-management/decisions-log.md` | Decisions to log |
| `CLAUDE.md` | People section (Marilyn's role), carry-over items (Techcombank, domain/DNS) |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Screenshots at desktop and mobile sizes, live URL verification |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all context files. Verify sub-repo has no uncommitted changes. Check GitHub Pages config. Generate 5 proactive items. |
| 2 | `[WRITE]` `[SEQUENTIAL]` | Stage, commit, push to `vassovass/cargonomics` main branch. Wait for deployment. |
| 3 | `[READ-ONLY]` | Open live URL in browser. Verify all 4 pages, assets, form, analytics. No mixed content or 404s. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Take 8 screenshots (4 pages at desktop + mobile). Save to handoff folder. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Read deliverables checklist for current status. Draft complete 6-section handoff message. |
| 6 | `[WRITE]` `[PARALLEL]` | Update tasks.md, open-questions.md, decisions-log.md, PRD_00_Index.md (different files, no conflict). |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Optional: record 2-3 minute walkthrough if tools available. Do not delay handoff. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Commit state file updates to parent repo. Push both repos. Confirm everything live. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | GitHub Pages deployment source | Confirm `vassovass/cargonomics` deploys from `main` branch root (not `/docs`) | If misconfigured, site will not be live at expected URL |
| R-2 | Form submission on live URL | Form backend may have CORS restrictions. Works on localhost but may fail on github.io. | A non-working form on handoff day is a critical failure |
| R-3 | Marilyn deliverables current status | Items may have been delivered between PRD creation and execution. Handoff message must reference accurate state. | Referencing already-delivered items as "pending" looks unprofessional |
| R-4 | Screen recording tools available | OBS Studio, Windows Game Bar, or browser extension for the walkthrough | Only attempt if tool is already installed or trivially available |
| R-5 | Wednesday follow-up meeting still scheduled | Handoff message should reference the upcoming meeting | If date changed, message must reflect that |

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
| Live URL loads all 4 pages | Not deployed post-QA | All pages load in incognito | Open each page in incognito browser |
| All assets load (CSS, JS, images, fonts) | N/A | Zero 404s in network tab | Browser DevTools network tab |
| Form works on live URL | Untested on live | Test submission reaches backend | Submit from live URL, check spreadsheet |
| GA4/GTM fire on live URL | Untested on live | Requests to google-analytics and googletagmanager | Network tab filter |
| UTM tracking on live URL | Untested on live | Load with `?utm_source=test`, data captured | Submit form, verify UTM data |
| Handoff message complete | None | All 6 sections present, voice matches client-brief | Read through and verify |
| No em dashes in handoff | N/A | Zero em dashes | Search message text |
| Screenshots captured | None | 8 screenshots (4 pages, desktop + mobile) | Files exist in handoff folder |
| PRD index updated | Partial | All 13 PRDs show complete | Read PRD_00_Index.md |
| State files updated | Stale | tasks.md, open-questions.md, decisions-log.md current | Read each file |
| No uncommitted changes | Unknown | Clean `git status` in both repos | `git status` in sub-repo and parent |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Live URL loads | All 4 pages render correctly | Open in incognito browser |
| Screenshots captured | 8 files present, correctly cropped | Check handoff folder |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No uncommitted changes | `git status` in sub-repo | Clean working directory |
| Remote up to date | `git log --oneline -1` vs remote | Local and remote HEAD match |
| No debug code | `grep -r "console.log\|TODO\|FIXME" js/ *.html` | Zero matches in production code |
| No test data | Visual scan of page content | No "lorem ipsum" or fake entries |

### Documentation Checks

- [ ] PRD_00_Index.md status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 13 - deploy and client handoff`
- [ ] Git push to GitHub Pages
- [ ] PRD_BACKLOG.md updated with any emergent items

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| GitHub Pages caching shows stale content | Marilyn sees old version if she clicks link immediately | Medium | Wait 2-3 minutes after push. Verify with hard refresh in incognito. Include note in handoff: "If site looks incomplete, try refreshing or opening in incognito." |
| Relative path breakage on GitHub Pages | Assets that work locally may 404 on github.io | Medium | Verify every page and asset on live URL before drafting handoff. Fix and re-deploy. |
| Form backend CORS restriction on live domain | Form configured for localhost only, rejects github.io | Medium | Test form submission on live URL. If CORS fails, update backend config to allow github.io. |
| Marilyn response time after handoff | No feedback for days, Wednesday meeting slips | Low | Include clear deadline in handoff. Reference scheduled Wednesday meeting. Follow up via WhatsApp if no response in 24 hours. |
| Outstanding deliverables make site look unfinished | Placeholders for logos, images, copy | Medium | Frame positively: "I have used professional placeholder images matching the style you described. Once you send the final images, I will swap them in." Do not apologize. |
| DNS access not yet provided | Site lives at github.io, less professional | High | Frame as "preview version." Note domain connection is a 15-minute config step once access is provided. Standard practice. |

---

## Related Documents

- `06-client-comms/marilyn-deliverables-checklist.md` (outstanding items for handoff message)
- `06-client-comms/client-brief.md` (communication preferences, copy voice)
- `CLAUDE.md` (carry-over items: Techcombank, domain/DNS, Marilyn deliverables)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-10 | Initial | Created PRD (thin version, then full rewrite) |
| 2026-04-10 | All | Rewritten to template v2 format with lettered outcome sections, 6-section handoff structure, research table, proactive items table, verification checklist |
