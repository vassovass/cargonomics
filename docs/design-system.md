# Cargonomics Design System

Reference document for the Cargonomics MVP website design system. Covers token architecture, colour palette, typography, spacing, component tokens, data attributes, BEM conventions, and the WordPress migration path.

Last updated: April 10, 2026.

---

## 1. Overview

**Purpose:** One codebase serves multiple brand instances (Cargonomics, Flexed, future Anne Hill brands). Visual theming is controlled entirely through CSS custom properties declared in brand-specific token files.

**File structure:**

| Layer | File | Role |
|-------|------|------|
| Layout + defaults | `css/style-v2.css` | All layout rules, components, responsive breakpoints. Declares default token values in `:root`. |
| Brand overrides | `css/tokens-cargonomics.css` | Loaded AFTER style-v2.css. Overrides `:root` values with Cargonomics Navy + Gold palette. |
| Brand overrides | `css/tokens-flexed.css` | Same structure, Flexed Blue + White palette. |

**To add a new brand:** Duplicate `tokens-cargonomics.css`, change the values, swap the `<link>` tag in the HTML `<head>`. No layout CSS changes needed.

---

## 2. Token Architecture

### Cascade Order

1. `style-v2.css` `:root` block declares fallback defaults (Deep Slate + Copper palette)
2. Brand token file loads second via a separate `<link>` tag and overrides with brand values
3. CSS specificity is equal (both use `:root`), so load order wins

### Token Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Colours | `--color-` | `--color-primary`, `--color-accent-teal` |
| Typography | `--font-`, `--font-weight-` | `--font-heading`, `--font-weight-body` |
| RGB Variants | `--color-*-rgb` | `--color-primary-rgb` |
| Spacing | `--space-`, `--section-`, `--container-` | `--space-lg`, `--section-padding-y` |
| Buttons | `--btn-` | `--btn-bg`, `--btn-radius` |
| Cards | `--card-` | `--card-bg`, `--card-padding` |
| Navigation | `--nav-` | `--nav-bg`, `--nav-link-hover` |
| Footer | `--footer-` | `--footer-bg`, `--footer-link-hover` |
| Form Inputs | `--input-` | `--input-border`, `--input-focus-border` |
| Transitions | `--transition-` | `--transition-base`, `--transition-fast` |

### Naming Convention

`--category-name` for simple tokens (e.g., `--color-primary`).
`--category-name-modifier` for variants (e.g., `--color-primary-dark`).
`--component-property` for component tokens (e.g., `--btn-hover-bg`).

---

## 3. Colour Tokens

| Token | Cargonomics | Flexed | Usage | Status |
|-------|-------------|--------|-------|--------|
| `--color-primary` | `#11294B` (Navy) | `#1E6091` (Blue) | Headers, nav, footer bg, primary text | Locked (R2 p.14) / Pending logo extract |
| `--color-primary-dark` | `#0A1A30` | `#144867` | Hover states on primary, footer | Pending tonal-ramp confirm |
| `--color-primary-light` | `#1D3A65` | `#3A7BAB` | Hover states on dark backgrounds | Pending tonal-ramp confirm |
| `--color-secondary` | `#D4B468` (Gold) | `#FFFFFF` (White) | CTAs, accents, highlights | Locked (R2 p.14) |
| `--color-secondary-dark` | `#B8984F` | `#F0F4F8` | Button hover | Pending tonal-ramp confirm |
| `--color-secondary-light` | `#E2C780` | `#FFFFFF` | Subtle highlights | Pending tonal-ramp confirm |
| `--color-accent-teal` | `#3AA5D6` | `#2A8C9F` | Tech accent, links | Locked (R2 p.15) / Placeholder |
| `--color-accent-orange` | `#F7B761` | `#E87722` | Energy, optimism callouts | Locked (R2 p.15) / Placeholder |
| `--color-accent-lime` | `#CCDD2C` | `#A6CE39` | Sustainability, freshness | Locked (R2 p.15) / Placeholder |
| `--color-accent-grey` | `#D2D3D5` | `#8A8E94` | Background grey, borders | Locked (R2 p.15) |
| `--color-accent` | `var(--color-accent-teal)` | `var(--color-primary)` | Generic accent alias | Derived |
| `--color-ivory` | `#FAF9F6` | `#FFFFFF` | Page background | Locked |
| `--color-stone` | `#F0EDE8` | `#F4F7FA` | Card backgrounds, subtle sections | Locked |
| `--color-text` | `#2C3E50` | `#1F2937` | Body text | Pending Marilyn confirm (Q24) |
| `--color-text-muted` | `#6C7A89` | `#6B7280` | Secondary/helper text | Pending Marilyn confirm |
| `--color-signal` | `#DC2626` | `#DC2626` | Errors, urgent indicators | Locked |
| `--color-white` | `#FFFFFF` | `#FFFFFF` | White | Locked |

**Notes:**
- Cargonomics primary/secondary hex codes are transcribed from R2 brand guide pages 14-15.
- Tonal ramp values (dark/light variants) are derived estimates. Waiting on Marilyn to confirm against R2 p.16 tints.
- Flexed primary blue is approximate. Will be extracted from the Flexed logo file when Marilyn sends it.

---

## 4. Typography Tokens

| Token | Cargonomics | Flexed | Notes |
|-------|-------------|--------|-------|
| `--font-heading` | Orbitron | Source Serif 4 | Cargonomics: locked, matches logo (R2 p.4). Flexed: placeholder. |
| `--font-body` | Open Sans | Outfit | Cargonomics: default pick, pending Marilyn confirm between Open Sans and Montserrat (Q22). Flexed: placeholder. |
| `--font-weight-heading` | 700 | 700 | Bold headings. |
| `--font-weight-body` | 400 | 400 | Regular body text. |

**Font loading:**
- All fonts loaded from Google Fonts in `<head>`. No proprietary font files needed (Q10 resolved).
- Orbitron weights available: 400, 500, 700, 900.
- Open Sans weights loaded: 400, 600, 700.
- `font-display: swap` on all Google Font imports for performance.

**Flexed fonts:** Currently using Source Serif 4 + Outfit as placeholders. These are the style-v2.css defaults. Will be updated if Marilyn specifies Flexed-specific fonts.

---

## 5. Spacing Token Scale

Base unit: **8px**.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | 4px | Icon gaps, tight inline spacing |
| `--space-xs` | 8px | Base unit, small gaps |
| `--space-sm` | 12px | Form field spacing, small margins |
| `--space-md` | 16px | Default paragraph spacing, card gaps |
| `--space-lg` | 20px | Section sub-headings, medium gaps |
| `--space-xl` | 24px | Card padding, larger gaps |
| `--space-2xl` | 32px | Section header spacing |
| `--space-3xl` | 48px | Large feature spacing |

### Section and Container Spacing

| Token | Mobile | Tablet (768px+) | Desktop (1024px+) |
|-------|--------|------------------|--------------------|
| `--section-padding-y` | 72px | 72px | 96px (via media query on individual sections) |
| `--section-padding-x` | 0px | 0px | 0px |
| `--container-max` | 1200px | 1200px | 1200px |
| `--container-padding` | 20px | 32px | 32px |

Note: Desktop section padding (96px) is applied directly to section classes in the `@media (min-width: 1024px)` block, not via the custom property. The token holds the mobile value.

---

## 6. Component Tokens

### Buttons (`--btn-*`)

| Token | Cargonomics | Flexed | Notes |
|-------|-------------|--------|-------|
| `--btn-bg` | `var(--color-secondary)` (Gold) | `var(--color-primary)` (Blue) | Primary CTA background |
| `--btn-color` | `#FFFFFF` | `#FFFFFF` | Button text |
| `--btn-hover-bg` | `#B8984F` | `var(--color-primary-dark)` | Hover state |
| `--btn-radius` | 0 | 0 | Sharp corners |
| `--btn-padding-y` | 14px | 14px | Vertical padding |
| `--btn-padding-x` | 32px | 32px | Horizontal padding |
| `--btn-font-size` | 0.95rem | 0.95rem | Button text size |
| `--btn-font-weight` | 600 | 600 | Semi-bold |

### Cards (`--card-*`)

| Token | Cargonomics | Flexed |
|-------|-------------|--------|
| `--card-bg` | `var(--color-white)` | `var(--color-white)` |
| `--card-border-color` | `var(--color-primary)` | `var(--color-primary)` |
| `--card-border-opacity` | 0.12 | 0.12 |
| `--card-radius` | 0 | 0 |
| `--card-padding` | 28px 24px | 28px 24px |

### Navigation (`--nav-*`)

| Token | Cargonomics | Flexed |
|-------|-------------|--------|
| `--nav-bg` | `var(--color-white)` | `var(--color-white)` |
| `--nav-border-opacity` | 0.1 | 0.1 |
| `--nav-link-color` | `var(--color-text)` | `var(--color-text)` |
| `--nav-link-hover` | `var(--color-primary)` | `var(--color-primary)` |

### Footer (`--footer-*`)

| Token | Cargonomics | Flexed |
|-------|-------------|--------|
| `--footer-bg` | `var(--color-primary)` | `var(--color-primary)` |
| `--footer-color` | `#FFFFFF` | `#FFFFFF` |
| `--footer-link-opacity` | 0.65 | 0.7 |
| `--footer-link-hover` | `var(--color-secondary)` | `var(--color-secondary-dark)` |

### Form Inputs (`--input-*`)

| Token | Cargonomics | Flexed |
|-------|-------------|--------|
| `--input-bg` | `var(--color-white)` | `var(--color-white)` |
| `--input-border` | `var(--color-accent-grey)` | `var(--color-accent-grey)` |
| `--input-radius` | 0 | 0 |
| `--input-padding` | 12px 16px | 12px 16px |
| `--input-focus-border` | `var(--color-primary)` | `var(--color-primary)` |

### Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-base` | 0.3s ease | Default hover/state transitions |
| `--transition-fast` | 0.2s ease | Quick micro-interactions |

---

## 7. RGB Variant Tokens

**Why:** CSS `rgba()` cannot accept a hex value inside `var()`. To enable transparent overlays, borders, and shadows that respond to brand swaps, each core colour has an RGB triplet token.

**Usage in style-v2.css:**
```css
background: rgba(var(--color-primary-rgb), 0.5);
border: 1px solid rgba(var(--color-primary-rgb), 0.12);
```

| Token | Cargonomics | Flexed |
|-------|-------------|--------|
| `--color-primary-rgb` | `17, 41, 75` | `30, 96, 145` |
| `--color-secondary-rgb` | `212, 180, 104` | `255, 255, 255` |
| `--color-accent-rgb` | `58, 165, 214` | `42, 140, 159` |
| `--color-ivory-rgb` | `250, 249, 246` | `255, 255, 255` |
| `--color-white-rgb` | `255, 255, 255` | `255, 255, 255` |

When adding a new brand token file, always include RGB variants for every colour used in `rgba()` calls in style-v2.css.

---

## 8. Data Attribute Conventions

### `data-section`

Applied to every top-level section element. Kebab-case, unique per page. Becomes an Elementor Saved Template during WordPress migration.

| Section | `data-section` value | Block class | Elementor widget |
|---------|---------------------|-------------|------------------|
| Navigation | `site-nav` | `.nav` | container |
| Hero | `hero` | `.hero` | container |
| Coach/Connect/Consult | `pillars` | `.pillars-v2` | container |
| Image break | `image-break` | `.image-break` | container |
| Programs | `programs` | `.programs-v2` | container |
| Journey | `journey` | `.journey-v2` | container |
| Credibility/Stats | `credibility` | `.credibility` | container |
| Why Vietnam | `vietnam` | `.vietnam` | container |
| Trainers | `trainers` | `.trainers-v2` | container |
| Conference | `conference` | `.conference-v2` | container |
| Footer | `footer` | `.footer` | container |
| Floating buttons | `floating-buttons` | `.floating-buttons` | - |
| WYDLS modal | `modal-wydls` | `.modal-overlay` | - |
| Sticky promo | `sticky-promo` | `.sticky-promo` | - |

### `data-slot`

Applied to content elements within sections. Identifies the content purpose for ACF field binding during WordPress migration.

Common slot values: `heading`, `body`, `image`, `cta`, `media`, `logo`, `subtitle`, `stat`, `list`.

### `data-elementor-widget`

Documents the Elementor widget type each element maps to during migration. Values: `heading`, `text-editor`, `button`, `image`, `video`, `container`.

---

## 9. BEM Naming Convention

**Pattern:** `block__element--modifier`

### Section Block Names

| Block class | Section |
|-------------|---------|
| `.hero` | Hero banner |
| `.pillars-v2` | Coach/Connect/Consult |
| `.image-break` | Full-width image break |
| `.programs-v2` | Programs listing |
| `.journey-v2` | How It Works / Journey |
| `.credibility` | Stats and credibility |
| `.vietnam` | Why Vietnam |
| `.trainers-v2` | Trainer profiles |
| `.conference-v2` | Conference/events |
| `.nav` | Site navigation |
| `.footer` | Footer |

**Legacy `-v2` suffix:** Carried over from the prototype iteration. Acceptable in existing sections. New sections should use clean names without suffix.

**Scoping rule:** All styles for a section are scoped to its block class. Example: `.hero__headline`, `.hero__cta`, `.programs-v2__card`. No global state leakage between sections.

---

## 10. Section Modularity Rules

1. Every section is self-contained and portable.
2. Zero sibling dependencies. Removing a section must not break any other section.
3. Sections can be copy-pasted between pages and function standalone.
4. Sections can be reordered without CSS changes.
5. This is how the Flexed site works: same section markup, different token file.
6. No shared state between sections (no section relies on another section's variables or DOM).

---

## 11. WordPress Migration Path

**Target stack:** Hello Elementor theme + Elementor Pro with Variables Manager (v3.33+).

| Static prototype | WordPress equivalent |
|-----------------|---------------------|
| CSS custom properties in `:root` | Elementor Global Colors + Global Fonts |
| `data-section` blocks | Elementor Saved Templates |
| `data-slot` elements | ACF (Advanced Custom Fields) field bindings |
| `tokens-cargonomics.css` | Site Style: Cargonomics |
| `tokens-flexed.css` | Site Style: Flexed |
| Token file swap via `<link>` tag | One theme, two Site Styles |

**Migration sequence:**

1. Marilyn signs off on the static prototype look
2. Set up Hello Elementor + Elementor Pro
3. Map CSS custom properties to Elementor global variables
4. Convert each `data-section` block into an Elementor Saved Template
5. Bind `data-slot` elements to ACF fields
6. Create two Site Styles (Cargonomics and Flexed) using the mapped variables
7. Token swap = switching one Site Style, same templates

---

## 12. Responsive Breakpoints

Mobile-first. Base styles apply to all viewports.

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Base (mobile) | < 768px | Single column, 20px container padding, 72px section padding, hamburger nav |
| Tablet | >= 768px | Desktop nav visible, 32px container padding, grid layouts activate (hero 55/45 split) |
| Desktop | >= 1024px | 96px section padding, wider gaps (48px pillar rows), multi-column layouts |
| Wide desktop | >= 1280px | Larger hero headline (3.5rem), larger image-break text (3.2rem) |
| Print | `@media print` | Nav, floating buttons, modals, sticky promo hidden. Black text on white. |
