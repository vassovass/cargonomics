# Deferred Items — Cargonomics Website

**Purpose.** Durable record of site issues and observations noticed during work but not fixed in the same change. Distinct from `03-project-management/open-questions.md`, which tracks items blocked on PEOPLE. This file tracks items blocked on TIME or PRIORITY — code and UX observations that can be addressed unilaterally when scheduled.

**Anti-duplication rule.** See `.claude/rules/website-conventions.md` Tracker Discipline section. An item never carries `open` status in both trackers simultaneously. If an item needs both external input AND internal work, the primary tracker owns resolution while the secondary carries a cross-reference stub at most.

**Status flow.** `open` → `scheduled` (linked to a PRD number) → `done` (linked to commit SHA or PRD closing date).

**When to use which tracker.**

- Does fixing it require waiting on someone? → `03-project-management/open-questions.md`
- Can we just code it when priority allows? → this file

---

## Items

| Date added | Observed during | Description | Impact | Proposed fix | Effort | Owner | Status |
|------------|-----------------|-------------|--------|--------------|--------|-------|--------|
| 2026-04-14 | Process A seed (April 14 planning) | `course.html` testimonials section is an empty `.course-placeholder` | Low. Reduces course page credibility signal below what PRD 5 envisaged. | Gather 2-3 testimonials from prior conference attendees or pilot cohort. Render in existing `.course-placeholder` slot with name, role, quote. | Medium (content + layout) | Vasso | open |
| 2026-04-14 | Process A seed | `course.html` FAQ section empty placeholder | Low. Applicants have unanswered practical questions (cost, time commitment, post-graduation commitment). | Draft 6-8 FAQ items from recurring WhatsApp questions. Render as accordion inside existing `.course-placeholder` block. | Small (content + accordion CSS) | Vasso | open |
| 2026-04-14 | Process A seed | `course.html` instructors section shows only placeholder card beyond Elias | Medium. Single-leader framing weakens the "learn from veterans" promise. | Recruit 2-3 named trainers with photos and bios. Cross-reference open-questions trainer roster confirmation. | Medium (content + pending Marilyn confirmation) | Vasso | open |
| 2026-04-14 | Process A seed | Homepage second trainer card is a placeholder ("Senior Industry Advisor") | Medium. Visible placeholder erodes trust. | Same resolution as course.html instructors entry above, tied to trainer roster confirmation. | Medium | Vasso | open |
| 2026-04-14 | Process A seed | Homepage "Why Us" section has structure but placeholder copy | Medium. MVP ships with visible placeholders where Marilyn's bullets belong. | Replace placeholder copy with Marilyn's bullets when that input arrives. Cross-reference: open-questions item for Why Us bullets. | Small | Vasso | open |
| 2026-04-14 | Process A seed | Application form lacks post-submit success-state styling (`.form--submitted` class declared but unstyled) | Low. Submission still works via GAS backend but visual feedback is minimal. | Add a success card with check icon, confirmation copy, and what-to-expect-next. Style the `.form--submitted` class in style-v3.css. | Small | Vasso | open |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-14 | Created as Process A deliverable per approved April 14 plan. Seeded with 6 internal observations discovered during April 14 planning exploration. Anti-duplication rule linked to `.claude/rules/website-conventions.md` Tracker Discipline section. |
