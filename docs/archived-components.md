# Archived Components — Cargonomics Website

**Purpose.** Lightweight archive of removed site components (HTML + CSS snapshots). Entries are added when a section, card, or block is taken off the live site but deliberately preserved for possible future reinstatement.

This file is the **interim archive** until PRD 20 ships the full visual pattern library (`styleguide.html`). When PRD 20 lands, entries here migrate to the styleguide as fully rendered showcase items with metadata, screenshots, and Elementor mapping notes.

## Naming convention

Entry IDs follow the module naming convention defined in the approved April 14 plan:

`{category}-{descriptor}-{variant?}[-v{N}?]`, kebab-case, lowercase.

Categories: `hero`, `section`, `form`, `card`, `nav`, `footer`, `utility`.

Examples:
- `section-programs-card-professional-development`
- `section-programs-card-corporate-training`
- `utility-modal-wydls-promo`

Each entry in this file uses its ID as an H2 heading so it can be linked via `#{entry-id}`.

## Entry format

Every archived entry must contain:

```
## {entry-id}

**Status.** archived
**Removed on.** {YYYY-MM-DD}
**Removed by.** PRD {NN}
**Reason.** {why it was removed}
**Reinstate via.** {paste-back instructions, PRD that will revive it, or "manual"}
**Tokens used.** {list of --color-*, --space-*, --font-* references the component relied on}
**Elementor target.** {future Elementor widget mapping — heading, text-editor, button, image, container, icon-box, etc.}

### HTML snapshot

(code fence containing the full HTML block at time of removal)

### CSS snapshot (from css/style-v{N}.css)

(code fence containing the scoped CSS at time of removal)

### Notes

- Dependencies on other sections or tokens at time of archive
- Any known issues when it was live
- Hints for what changes if it is reinstated (e.g. grid column adjustments)
```

## Archived entries

Entries are added here as components are archived. PRD 18 will populate the first two when it executes (`section-programs-card-professional-development` and `section-programs-card-corporate-training`).

_No entries yet. This file is a scaffold awaiting the first archive addition._

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-14 | Created as lightweight archive scaffold ahead of PRD 18 execution, per approved April 14 plan. Will be superseded by PRD 20's styleguide.html when that ships. Until then, this markdown file is the canonical home for removed-but-preserved component markup. |
