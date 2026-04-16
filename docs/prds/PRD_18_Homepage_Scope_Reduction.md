# PRD 18: Homepage Scope Reduction (remove Professional Development + Corporate Training cards)

> **Order:** 18
> **Status:** Proposed
> **Type:** Refactor
> **Dependencies:** None (relies on `docs/archived-components.md` scaffold being present, created in parallel by orchestrator)
> **Blocks:** None
> **Sprint:** Post-MVP Enhancements
> **Created:** 2026-04-14

> **Session note**: This PRD may run in its own Claude Code session or as a parallel agent.
> Read the sprint context (`PRD_00_Index.md` Post-MVP Enhancements row) first. Do NOT update `PRD_00_Index.md` or commit/push.
> The orchestrator session handles index updates, commits, and pushes.

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct
> the research items listed below, and finalise the proactive items in the table.
> Report findings to the user before beginning any WRITE phases. Do not skip or
> shortcut the research phase. The archive write to `docs/archived-components.md`
> MUST happen before any deletion in `index.html` so the markup is preserved with
> reinstate hints.

---

## Why This Matters

Marilyn confirmed on April 14 that the homepage should focus exclusively on the WYDLS Bootcamp for the Tuesday handoff. Professional Development and Corporate Training are real future offerings, but they are not in market yet, they have no enrolment dates, and showing them dilutes the single conversion goal of the MVP page: drive bootcamp applications before the June 1 launch. Marilyn's earlier feedback already pruned the homepage of the conference video and past events; this is the same logic applied to the Programs section.

The two cards are not being deleted permanently. They will return when Cargonomics formally launches those tracks (likely after the first bootcamp cohort completes). To make that future reinstatement a copy-paste operation rather than a re-author, the existing HTML and CSS for both cards is captured into `docs/archived-components.md` first. That file is the project's component morgue: each entry holds a snapshot, the date archived, the reason, and a one-line reinstate hint.

This PRD is a refactor with strict scope: remove two cards, rebalance the grid, prune two footer links, archive the markup. No copy rewrites, no token changes, no new sections beyond a single balancing CTA element. The work is small but it must not regress the responsive grid, the WordPress migration readiness, or the analytics tracking attributes on the surviving WYDLS card.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `index.html` lines 226 to 248: `.programs-v2__secondary` two-column grid containing both deprecated cards | Hosts the cards being removed; grid will collapse to empty if cards leave without replacement |
| `index.html` lines 227 to 236: "Professional Development" `.program-card` block (id `professional-dev`) | Card to remove; future offering with no live enrolment, dilutes WYDLS focus |
| `index.html` lines 238 to 247: "Corporate Training" `.program-card` block (id `corporate-training`) | Card to remove; future offering with no live enrolment, dilutes WYDLS focus |
| `index.html` line 584: footer Programs column link `<a href="course.html">Professional Development</a>` | Footer link to a card that will not exist; orphan target |
| `index.html` line 585: footer Programs column link `<a href="course.html">Corporate Training</a>` | Footer link to a card that will not exist; orphan target |
| `css/style-v3.css` (current default): `.programs-v2__secondary`, `.program-card`, `.program-card__*` rules | Some selectors may become orphaned once the cards are removed; grid rule may need adjustment if a balancing element replaces the two-column layout |
| `index.html` line 601: `<span class="footer__version">v3</span>` | Indicates current version is v3; promotion to v4 required per Version Management rule |
| `docs/archived-components.md` | Created in parallel by orchestrator. Will exist as an empty scaffold; this PRD adds two entries |

---

## Desired Outcomes

### Section A: Homepage Programs Section (4 items)

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Professional Development card removed from `index.html`** | Card promotes a non-live offering, dilutes WYDLS focus | The block currently at lines 227 to 236 no longer appears in the rendered DOM. `grep -n "professional-dev" index.html` returns no match | Confirm no other element references id `professional-dev` (anchors, JS, schema) |
| A-2 | **Corporate Training card removed from `index.html`** | Same as A-1 for the second future offering | The block currently at lines 238 to 247 no longer appears in the rendered DOM. `grep -n "corporate-training" index.html` returns no match | Confirm no other element references id `corporate-training` (anchors, JS, schema) |
| A-3 | **Programs section is visually balanced after removal** | The featured WYDLS card alone may look orphaned; the two-column secondary grid will be empty | Section reads as a single coherent block on desktop, tablet, and mobile. Executing agent picks one of: (a) center the WYDLS card at a wider max-width, (b) add a "Programme Details" CTA card linking to `course.html` to fill the secondary grid, (c) collapse the two-column secondary grid into a single full-width CTA band. The PRD does not mandate which | Inspect actual whitespace and visual rhythm in the live page after removal; pick option that requires the least CSS surgery |
| A-4 | **No regression in grid, padding, responsive behaviour** | A naive deletion can break the section's spacing rules and leave gaps | `preview_resize` at desktop, tablet, mobile shows the section retains expected vertical rhythm, no orphan whitespace, no horizontal scroll, no broken column layouts | Read `.programs-v2`, `.programs-v2__secondary`, `.program-featured` rules in `style-v3.css` to map dependent selectors before removal |

### Section B: Footer Programs Column (2 items)

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Footer Programs column links to Professional Development and Corporate Training are removed** | Orphan footer links pointing to non-existent homepage anchors | Lines 584 and 585 no longer present. `grep -n "Professional Development\|Corporate Training" index.html` returns zero matches across the whole file | None |
| B-2 | **Programs column gets a "Programme Details" link to `course.html`** | Removing two of three links collapses the column height and unbalances the four-column footer grid | Footer column has at least 2 visible links (WYDLS Bootcamp + Programme Details). Visual height of Programs column matches Company column within a small tolerance | Inspect actual rendered column heights at desktop and mobile; if removal of one link still produces a balanced footer, link addition may be reduced to a single link |

### Section C: Archive and Clean-Up (3 items)

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Both card blocks are archived in `docs/archived-components.md` BEFORE deletion** | Future reinstatement requires the original markup; without an archive, the cards must be re-authored from scratch | Two entries exist in `docs/archived-components.md` with ids `section-programs-card-professional-development` and `section-programs-card-corporate-training`, status `archived`, date `2026-04-14`. Each entry contains: (1) HTML snapshot copied verbatim from `index.html`, (2) CSS snapshot of any selectors scoped to these cards from `css/style-v3.css`, (3) reason field, (4) reinstate-via hint pointing back to the original `index.html` location and the `.programs-v2__secondary` parent | Read the entry format defined in the `docs/archived-components.md` scaffold and follow it exactly |
| C-2 | **Stray references to removed cards are cleaned up** | Anchor links, sitemap entries, search references, or `data-track` attributes pointing at the dead cards become 404s or noise in analytics | A grep across the entire `cargonomics-site/` tree for `professional-dev`, `corporate-training`, `Professional Development`, `Corporate Training` returns zero hits in HTML, JS, JSON-LD, sitemap, and config files. Hits only exist in archive markdown and historical PRDs | Search: `index.html`, `about.html`, `course.html`, `contact.html`, all `js/*.js`, `sitemap.xml` if present, `*.json` |
| C-3 | **Version Management archiving convention followed** | Project rule requires defaults always reflect latest; previous versions live in archived files; missing this step pollutes the rolling-default invariant | Per `.claude/rules/website-conventions.md` Version Management section: `index.html` (v3) is copied to `hp-v3.html`, `css/style-v3.css` is copied to `css/style-v3.css` if not already archived, current default JS files are copied to `-v3.css` / `-v3.js` counterparts, then the new edits land in the unsuffixed defaults and the `footer__version` tag is updated to `v4` across all four pages. Archived files have their internal links rewritten to point at matching `-v3.html` / `-v3.css` siblings | Confirm current version by reading `footer__version` in current `index.html`. The current value is `v3`; the next version is `v4`. Confirm whether `style-v3.css` and `script-v3.js` already exist as archives or whether they are still the current defaults |

---

## What This PRD Does NOT Cover

- Rewriting copy on the WYDLS card (out of scope; copy is locked for the Tuesday handoff)
- Changing brand tokens, fonts, or colour palette (PRDs 1, 2)
- Adding new programmes beyond a single balancing CTA element (future PRD when programmes formally launch)
- Restructuring the rest of the homepage (Why Us, stats, CTA band, footer columns other than Programs)
- Updating `course.html` to reflect that only WYDLS is currently on offer (separate scope, will be a dedicated PRD if Marilyn confirms)
- Building a generic component library or pattern library (Proactive item 5 hints at it, but it is not delivered here)
- Permanently deleting the markup (the cards live on in `docs/archived-components.md` ready for reinstatement)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `05-deliverables/website-prototype/cargonomics-site/index.html` | MODIFY | Remove Professional Development card (current lines 227 to 236) and Corporate Training card (current lines 238 to 247). Rework the `.programs-v2__secondary` grid per Outcome A-3. Update footer Programs column per Section B. Bump `footer__version` to `v4` |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v4.css` | MODIFY | Drop orphaned selectors that only applied to removed cards (if any). Adjust `.programs-v2__secondary` grid rules if the layout changes from two-column to single-element or one-CTA band. Source from current default `style-v3.css` |
| `05-deliverables/website-prototype/cargonomics-site/docs/archived-components.md` | MODIFY | Add two entries: `section-programs-card-professional-development` and `section-programs-card-corporate-training`. Each entry contains HTML snapshot, CSS snapshot, reason, reinstate-via hint. The file scaffold is created in parallel by the orchestrator before this PRD executes |
| `05-deliverables/website-prototype/cargonomics-site/hp-v3.html` | CREATE (archive) | Snapshot of pre-change `index.html` per Version Management rule |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v3.css` | CREATE or VERIFY (archive) | Snapshot of pre-change CSS, verify if already present |
| `05-deliverables/website-prototype/cargonomics-site/js/script-v3.js` | CREATE or VERIFY (archive) | Snapshot of pre-change JS, verify if already present |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/rules/website-conventions.md` | Coding standards, modularity rules, brand tokens, Version Management automatic archive procedure, Tracker Discipline |
| `.claude/rules/prds.md` | PRD mandatory sections and anti-patterns |
| `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_00_Index.md` | Sprint and dependency map |
| `05-deliverables/website-prototype/cargonomics-site/index.html` | Source of the cards being removed and the footer Programs column |
| `05-deliverables/website-prototype/cargonomics-site/css/style-v3.css` | Current default stylesheet, source of any card-scoped selectors |
| `05-deliverables/website-prototype/cargonomics-site/docs/archived-components.md` | Destination for the archived markup. Format defined in the file's own preamble |
| `06-client-comms/homepage-markup-notes-2026-04-08.md` | April 8 markup notes, useful for cross-checking that the change does not contradict an earlier instruction |

### MCP Servers

| Server | Purpose |
|--------|---------|
| **Claude Preview** | Visual verification of the rebalanced Programs section via `preview_start "cargonomics-mock"`, `preview_snapshot`, `preview_resize`, `preview_inspect` |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read all Agent Context files. Confirm `docs/archived-components.md` scaffold is present and capture its entry format |
| 2 | `[READ-ONLY]` | Conduct research items R-1 through R-5 from the table below |
| 3 | `[READ-ONLY]` | Finalise the 3 core + 2 stretch proactive items in the table below, replacing seeds with concrete, codebase-grounded versions |
| 4 | `[WRITE]` | Archive procedure: copy `index.html`, `css/style-v3.css`, `js/script-v3.js` (or current defaults) into versioned siblings if not already present `[SEQUENTIAL]` |
| 5 | `[WRITE]` | Write two new entries into `docs/archived-components.md` capturing both cards with HTML and CSS snapshots, reason, reinstate-via hint `[SEQUENTIAL, must precede Phase 6]` |
| 6 | `[WRITE]` | Remove the two cards from `index.html` and apply the chosen rebalancing option from Outcome A-3 `[PARALLEL with Phase 7]` |
| 7 | `[WRITE]` | Update footer Programs column per Section B `[PARALLEL with Phase 6]` |
| 8 | `[WRITE]` | Adjust `css/style-v4.css` to drop orphaned selectors and update grid rules as needed `[SEQUENTIAL after Phases 6, 7]` |
| 9 | `[WRITE]` | Bump `footer__version` to `v4` across all four pages `[SEQUENTIAL]` |
| 10 | `[WRITE]` | Verify via Claude Preview: snapshot, console logs, responsive resize at desktop, tablet, mobile `[SEQUENTIAL]` |

---

## Research and Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Anchor reference scan | Search the entire `cargonomics-site/` tree for `professional-dev`, `corporate-training`, `Professional Development`, `Corporate Training`. Note every hit | Outcome C-2 needs zero stray references after cleanup. Pre-change inventory tells the agent what to clean |
| R-2 | CSS selector audit | Open `css/style-v3.css`, find every selector that targets `.programs-v2__secondary`, `.program-card`, `#professional-dev`, `#corporate-training`, or any descendant only used by these cards | Outcome A-4 needs no regression. Outcome C-1 needs the CSS snapshot for the archive. Without this audit, orphan selectors stay in the stylesheet |
| R-3 | JSON-LD and sitemap audit | Check `index.html` for any JSON-LD course or program references to the removed cards. Check for `sitemap.xml` and audit | Removal of cards must not leave SEO structured data pointing at non-existent content |
| R-4 | Analytics data-track audit | Find every `data-track`, `data-cta-*` attribute on or inside the two card blocks. Note whether removing them affects existing analytics dashboards | Outcome A-1 and A-2 must not silently break analytics. If a dashboard segments by `data-cta-location="programs"`, removing two of three cards skews historical comparisons |
| R-5 | Version Management state | Read `footer__version` in current `index.html` to confirm version. Check whether `hp-v3.html`, `css/style-v3.css`, `js/script-v3.js` already exist as archives or whether the current defaults still need promotion | Outcome C-3 depends on knowing the starting state. Misnaming or skipping archive breaks the rolling-default invariant for the project |

---

## Proactive Items

> 3 core (must address) + 2 stretch (optional, only if execution time allows). Format: `# | Item | Description | Trigger`.

### Core

| # | Item | Description | Trigger |
|---|------|-------------|---------|
| 1 | 301 redirect plan for deep anchors | Any external links or marketing material pointing at `#professional-dev` or `#corporate-training` will land on a homepage that no longer scrolls to those positions. Document a redirect or fragment-fallback plan in `docs/deferred-items.md` so SEO is not silently degraded after deploy | A grep finds external citations or social shares with the removed anchors, OR before-after Search Console comparison shows lost impressions on those URLs |
| 2 | Analytics event `programmes_pruned_view` on the rebalanced grid | Add a single GTM `dataLayer.push` fired when the Programs section enters the viewport on the rebalanced homepage. Lets the team measure bounce and scroll behaviour after pruning, so latent demand for the absent offerings can be inferred from session depth | The Programs section is restructured per Outcome A-3 and analytics ownership confirms a new event slot is acceptable |
| 3 | Embedded waitlist signup on each archived entry | When a card is archived in `docs/archived-components.md`, append a one-line internal note suggesting that on reinstatement the card should ship with a waitlist field. This converts pent-up demand into a measurable signal the next time the cards return | Archive entries created in Phase 5; the note travels with the markup so future agents see it on reinstate |

---

### Stretch

| # | Item | Description | Trigger |
|---|------|-------------|---------|
| 4 | "Coming soon" tease card on homepage | Replace the deleted secondary grid with a single low-key tease card hinting at future programmes. Acts as a placeholder while preserving the visual rhythm of the section | Outcome A-3 option (b) is chosen and the agent has time to craft copy that does not over-promise dates |
| 5 | Hidden admin view for archived components | A simple `docs/archived-components-view.html` rendering the archive entries in a searchable table. Precursor to a full pattern library PRD | Multiple archived entries accumulate (this PRD adds 2; threshold is 5+) AND the agent finishes core work with budget remaining |

---

## Modularity and WordPress Readiness

- [ ] WYDLS card retains `data-section="programs"`, `data-elementor-widget` and `data-slot` attributes
- [ ] Any new balancing element uses `data-section`, `data-slot`, `data-elementor-widget` per project convention
- [ ] All grid styling adjustments use CSS custom properties from `tokens-cargonomics.css` (no hardcoded hex or px)
- [ ] Programs section remains self-contained; removing it does not break adjacent sections
- [ ] No sibling dependency introduced between Programs and Curriculum sections by the rebalance
- [ ] BEM scoping preserved: `.program-card`, `.program-featured`, `.programs-v2__*`
- [ ] Footer Programs column remains a portable `data-elementor-widget="container"` block

---

## Design and Code Quality

- [ ] BEM naming preserved on all surviving and added elements
- [ ] No hardcoded colour, font, or spacing values introduced
- [ ] Semantic HTML preserved (the `<section class="programs-v2">` and its heading hierarchy stay intact)
- [ ] Accessible: any new CTA has a clear accessible name, focus state, and 44x44px touch target on mobile
- [ ] Vanilla JS only (no JS changes expected for this PRD)
- [ ] Performant: removal reduces DOM size; no new images, fonts, or scripts added by core scope
- [ ] No em dashes in any new copy

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| `grep -n "Professional Development" index.html` (lines 228, 584) | 2 hits | 0 hits | Manual grep after Phase 6 and 7 |
| `grep -n "Corporate Training" index.html` (lines 239, 585) | 2 hits | 0 hits | Manual grep after Phase 6 and 7 |
| Programs section visual balance on desktop (1280px wide) | Featured + 2-col secondary | Featured + chosen rebalance from A-3, no orphan whitespace | `preview_resize` desktop, `preview_screenshot` |
| Programs section visual balance on mobile (375px wide) | Featured + 2 stacked cards | Featured + rebalance, no horizontal scroll, no broken stack | `preview_resize` preset `mobile`, `preview_screenshot` |
| Footer Programs column link count | 3 links | 1 to 2 links per Outcome B-2 | `preview_inspect` `.footer__col:nth-child(2) a` |
| Footer column visual height parity | Programs taller than Company by 1 link | Programs within small tolerance of Company column | `preview_inspect` height in pixels at desktop |
| Console errors after change | 0 | 0 | `preview_console_logs` |
| Archive entries in `docs/archived-components.md` | 0 entries for these cards | 2 entries with HTML and CSS snapshots, reason, reinstate hint | Read the file after Phase 5 |
| `footer__version` value across pages | v3 | v4 | `grep -rn "footer__version" *.html` |

---

## Verification Checklist

### Visual Checks

| Check | What to Verify | Tool |
|-------|---------------|------|
| Programs section reads as coherent | Featured WYDLS card sits naturally with chosen rebalance, no jarring whitespace | `preview_screenshot` |
| Mobile stack rhythm | Programs section stacks cleanly at 375px, no horizontal scroll | `preview_resize` preset `mobile` then `preview_screenshot` |
| Footer columns balanced | All four columns roughly equal height | `preview_inspect` `.footer__col` heights at desktop |

### Code Checks

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| No stray card references | `grep -rn "professional-dev\|corporate-training\|Professional Development\|Corporate Training" 05-deliverables/website-prototype/cargonomics-site/` | Zero hits in `index.html`, `about.html`, `course.html`, `contact.html`, `js/*.js`, JSON-LD, sitemap. Hits permitted only in `docs/archived-components.md` and historical PRD files |
| Archive entries present | Read `docs/archived-components.md` | Two entries with required fields |
| Version bumped | `grep -n "footer__version" index.html about.html course.html contact.html` | Each file shows `v4` |
| No orphan CSS | Open `css/style-v4.css`, search for `#professional-dev` and `#corporate-training` | Zero hits |

### Documentation Checks

- [ ] `PRD_00_Index.md` status updated (orchestrator handles)
- [ ] Git commit: `feat(website): PRD 18 - homepage scope reduction (remove PD + CT cards, archive, rebalance)`
- [ ] Git push to GitHub Pages
- [ ] `PRD_BACKLOG.md` updated with any emergent items (e.g., the eventual reinstatement PRD)

---

## Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Cards deleted from `index.html` before being archived to `docs/archived-components.md`, losing the markup with no recovery | High | Medium | Phase 5 (archive write) is marked SEQUENTIAL and must precede Phase 6 (deletion) in the Task-Optimized Structure. Agent confirms archive write succeeded before any deletion edit |
| Rebalanced grid leaves visible whitespace or breaks responsive layout | Medium | Medium | Outcome A-3 forces the agent to pick from three explicit options (a, b, or c) and verify with `preview_resize` at three breakpoints before commit. A-4 specifies the no-regression check |
| Footer Programs column collapses to one link and unbalances the four-column footer grid | Low | High | Outcome B-2 mandates a "Programme Details" link addition. Visual height parity check is in Verification |
| Stray anchor links pointing at `#professional-dev` or `#corporate-training` from external marketing material now scroll to nowhere | Medium | Medium | Proactive item 1 documents a redirect plan in `docs/deferred-items.md`; analytics monitoring proactive item 2 surfaces the impact post-deploy |
| Archive entry format drift; agent invents a different entry shape than the rest of the file uses | Low | Low | Phase 1 reads the file's preamble and existing entries; Phase 5 follows that exact format |
| Version archiving (C-3) is skipped because the agent assumes the current defaults are already archived | Medium | Medium | R-5 forces a state check; archive writes are conditional but always verified |

---

## Related Documents

- `06-client-comms/homepage-markup-notes-2026-04-08.md` (April 8 markup baseline; pruning is a continuation of the same logic)
- `.claude/rules/website-conventions.md` (Version Management section, Tracker Discipline section)
- `05-deliverables/website-prototype/cargonomics-site/docs/archived-components.md` (component morgue, dependency for this PRD)
- `05-deliverables/website-prototype/cargonomics-site/docs/prds/PRD_03_Homepage_Restructure.md` (prior precedent for pruning the homepage)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD |
