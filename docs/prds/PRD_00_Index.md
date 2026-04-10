# PRD Index: Cargonomics MVP Website

> **Total PRDs:** 13 | **Proposed:** 6 | **In Progress:** 0 | **Complete:** 7
> **Last Updated:** 2026-04-11
> **MVP Deadline:** Tuesday April 14, 2026 EOD

---

## Agent Instructions

**MANDATORY reading before working on any PRD:**
1. `CLAUDE.md` (MVP Website Working Context section)
2. This file (PRD_00_Index.md)
3. The relevant sprint context file (SPRINT_XX_*.md)
4. The specific PRD file

**After completing any PRD:**
1. Update this file: change status emoji, update counts in header, add changelog entry
2. Git commit with PRD number: `feat(website): PRD XX - description`
3. Git push to make progress visible on GitHub Pages

---

## Standard PRD Requirements

Every PRD in this project MUST include:

**Before starting work:**
- [ ] Read all files in Agent Context section
- [ ] Conduct research noted in "Research & Verification Needed"
- [ ] Generate 5 proactive items based on current codebase state

**During implementation:**
- [ ] Follow BEM naming, use CSS custom properties (no hardcoded values)
- [ ] Self-contained modular sections with `data-section`, `data-slot`, `data-elementor-widget` attributes
- [ ] Vanilla JS only (no jQuery)
- [ ] Semantic, accessible HTML

**After completion:**
- [ ] Verify via Claude Preview (preview_start "cargonomics-mock")
- [ ] Update PRD_00_Index.md status
- [ ] Git commit and push

---

## Sprint 1: Foundation (Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 1 | Design System & Token Architecture | Architecture | :white_check_mark: Complete | None | All |
| 2 | Brand Token Activation & Font Fix | Refactor | :white_check_mark: Complete | PRD 1 | PRDs 3-13 |

## Sprint 2: Pages (PRDs 3-6 Parallel, PRD 7 Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 3 | Homepage Restructure | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 4 | About Page | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 5 | Course/Program Page | Feature | :white_check_mark: Complete | PRD 2 | PRD 7 |
| 6 | Contact & Application Form Page | Feature | :white_check_mark: Complete | PRD 2 | PRDs 7, 8 |
| 7 | Multi-Page Navigation | Feature | :white_check_mark: Complete | PRDs 3-6 | PRD 12 |

## Sprint 3: Integration (PRDs 8-10 Parallel, PRD 11 Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 8 | Form Backend & Submission Pipeline | Feature | :clipboard: Proposed | PRD 6 | PRD 12 |
| 9 | Image & Logo Integration | Feature | :clipboard: Proposed | PRD 2 | PRD 12 |
| 10 | Analytics & GTM Setup | Feature | :clipboard: Proposed | PRD 2 | PRD 12 |
| 11 | UTM Tracking & Attribution | Feature | :clipboard: Proposed | PRDs 6, 10 | PRD 12 |

## Sprint 4: Ship (Sequential)

| PRD | Title | Type | Status | Dependencies | Blocks |
|-----|-------|------|--------|--------------|--------|
| 12 | Responsive Testing & Accessibility | QA | :clipboard: Proposed | PRDs 7-11 | PRD 13 |
| 13 | Final Deploy & Client Handoff | Ops | :clipboard: Proposed | PRD 12 | None |

---

## Summary

| Sprint | PRDs | Status |
|--------|------|--------|
| 1: Foundation | 1, 2 | Complete |
| 2: Pages | 3, 4, 5, 6, 7 | Complete |
| 3: Integration | 8, 9, 10, 11 | Not started |
| 4: Ship | 12, 13 | Not started |

---

## Dependency Graph

```
PRD 1 (Design System)
  +-- PRD 2 (Token Activation)
        |-- PRD 3 (Homepage) ------+
        |-- PRD 4 (About) ---------+
        |-- PRD 5 (Course) --------+-- PRD 7 (Navigation) --+
        |-- PRD 6 (Contact) -------+                        |
        |-- PRD 9 (Images) ---------------------------------+
        +-- PRD 10 (Analytics/GTM) -- PRD 11 (UTM Track) ---+
                                                             +-- PRD 12 (QA) -- PRD 13 (Ship)
            PRD 8 (Form Backend, needs PRD 6) ---------------+
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-10 | Created PRD index with 13 PRDs across 4 sprints. MVP deadline: Tuesday April 14 EOD. |
| 2026-04-10 | Created PRD_01_Design_System.md and PRD_02_Brand_Token_Activation.md with full outcome specs, research items, success criteria. |
| 2026-04-10 | Created Sprint 2 PRD files: PRD_03_Homepage_Restructure.md, PRD_04_About_Page.md, PRD_05_Course_Page.md, PRD_06_Contact_Form_Page.md, PRD_07_Multi_Page_Navigation.md. |
| 2026-04-10 | Sprint 1 complete. PRD 01 and PRD 02 delivered: design system docs, spacing/RGB/component tokens, data-section attributes on all 14 sections, Orbitron + Open Sans fonts, 27 hardcoded hex values replaced with CSS custom properties. Deployed to GitHub Pages. |
| 2026-04-11 | Sprint 2 complete. PRDs 03-07 delivered: homepage restructured (conference + video removed, pillars reordered, social icons + inquiry buttons added), about.html created (company profile, three pillars, leadership), course.html created (WYDLS overview, 6-module curriculum grid, schedule, CTAs), contact.html created (application form with 7 visible + 11 hidden fields, inquiry form, contact info), multi-page navigation standardized across all 4 pages with active states, skip links, synced footer with SVG social icons. |
