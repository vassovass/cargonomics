# Sprint 1: Foundation

> **PRDs:** 1, 2 (sequential)
> **Goal:** Establish the design system and activate brand tokens so all subsequent PRDs build on a correct, documented foundation.
> **Execution:** Sequential in the orchestrator session. PRD 1 first, then PRD 2.

---

## Shared Context

### What this sprint produces
- A documented design system (`docs/design-system.md`) with modular section conventions, spacing tokens, component tokens, data attribute spec, and WordPress migration notes
- Corrected `index.html` with the right Google Fonts loaded and `data-*` attributes on all sections
- Updated `tokens-cargonomics.css` and `tokens-flexed.css` with spacing and component tokens
- Verified brand rendering: Navy Blue nav, Gold buttons, Orbitron headings, Open Sans body

### Key files
- `05-deliverables/website-prototype/cargonomics-site/index.html`
- `05-deliverables/website-prototype/cargonomics-site/css/style-v2.css`
- `05-deliverables/website-prototype/cargonomics-site/css/tokens-cargonomics.css`
- `05-deliverables/website-prototype/cargonomics-site/css/tokens-flexed.css`
- `05-deliverables/website-prototype/cargonomics-site/docs/tokens.md`

### Business decisions (locked)
- Brand colours: Navy #11294B (primary), Gold #D4B468 (secondary), from R2 brand guide
- Fonts: Orbitron (headings, matches logo), Open Sans (body, default). Both free Google Fonts.
- WordPress migration target: Hello Elementor theme with Elementor Variables Manager
- Modular sections with `data-section`, `data-slot`, `data-elementor-widget` attributes
- Token architecture: one layout CSS + one brand tokens CSS per client

### Gate criteria (before Sprint 2)
- [ ] `docs/design-system.md` exists and is comprehensive
- [ ] Correct fonts load in browser (Orbitron + Open Sans, not Source Serif 4 + Outfit)
- [ ] Brand colours render correctly (Navy nav, Gold buttons)
- [ ] No hardcoded hex values in style-v2.css
- [ ] All existing sections in index.html have `data-section` attributes
- [ ] Both PRDs committed and pushed to GitHub Pages
