# Design Tokens — Cargonomics + Flexed

This file is the authoritative spec for the colour, typography, and logo tokens used across the Cargonomics and Flexed sites. It replaces the earlier approach of hardcoding values in the main stylesheet.

**How it works:** the site loads `css/style-v2.css` (which contains the layout, components, and default tokens from the original mock), then loads ONE client token file (`css/tokens-cargonomics.css` or `css/tokens-flexed.css`) AFTER it. The client token file re-declares the `:root` custom properties, and because it loads second, its values win. Swapping clients is a one-line change in `index.html`.

This same pattern maps directly to Elementor when we migrate to WordPress: each CSS custom property here corresponds to an Elementor Global Color or Global Font. One Elementor theme, two "Site Styles" configurations.

## File structure

```
cargonomics-site/
├── css/
│   ├── style-v2.css            ← layout + components + default tokens (from original mock)
│   ├── tokens-cargonomics.css  ← Cargonomics overrides (Navy Blue + Gold)
│   └── tokens-flexed.css       ← Flexed overrides (Blue + White)
└── docs/
    └── tokens.md               ← this file
```

## Active client

In `index.html` the `<link>` order is:

```html
<link rel="stylesheet" href="css/style-v2.css">
<link rel="stylesheet" href="css/tokens-cargonomics.css">  <!-- swap to tokens-flexed.css for Flexed -->
```

The tokens file MUST come after `style-v2.css`. Reversing the order will cause the defaults to win.

## Token reference

Every token lives in `:root` as a CSS custom property. Names follow the existing style-v2.css convention (`--color-primary`, `--color-secondary`, etc.) so the rest of the stylesheet picks them up without modification.

### Colour tokens

| Variable | Description | Cargonomics | Flexed |
|---|---|---|---|
| `--color-primary` | Main brand colour | **`#11294B`** Navy "Cargo" (R2 p.14, PANTONE 2767 C) | `#1E6091` Flexed Blue (pending logo file) |
| `--color-primary-dark` | Darker primary for hovers/footers | `#0A1A30` (derived; pending tonal-ramp confirm Q23) | `#144867` (pending) |
| `--color-primary-light` | Lighter primary | `#1D3A65` (derived; pending tonal-ramp confirm Q23) | `#3A7BAB` (pending) |
| `--color-secondary` | Secondary brand colour | **`#D4B468`** Gold "Prestige" (R2 p.14, PANTONE 4023 C) | `#FFFFFF` White |
| `--color-secondary-dark` | Darker secondary | `#B8984F` (derived; pending tonal-ramp confirm Q23) | `#F0F4F8` |
| `--color-secondary-light` | Lighter secondary | `#E2C780` (derived; pending tonal-ramp confirm Q23) | `#FFFFFF` |
| `--color-accent` | Accent used for highlights | Maps to `--color-accent-teal` `#3AA5D6` | Maps to primary (simple palette) |
| `--color-accent-teal` | Secondary palette teal | **`#3AA5D6`** "Tech" (R2 p.15, PANTONE 8120 C) | `#2A8C9F` (placeholder, may not apply to Flexed) |
| `--color-accent-orange` | Secondary palette orange | **`#F7B761`** "Human centric" (R2 p.15, PANTONE T365 C) | `#E87722` (placeholder, may not apply) |
| `--color-accent-grey` | Secondary palette grey | **`#D2D3D5`** "Neutral System" (R2 p.15, PANTONE 427 C). LIGHT BACKGROUND grey, NOT body text. | `#8A8E94` |
| `--color-accent-lime` | Secondary palette lime | **`#CCDD2C`** Lime Green (R2 p.15, PANTONE 381 C) | `#A6CE39` (placeholder, may not apply) |
| `--color-ivory` | Page background | `#FAF9F6` cream | `#FFFFFF` white |
| `--color-stone` | Card backgrounds | `#F0EDE8` | `#F4F7FA` |
| `--color-text` | Body text | `#2C3E50` placeholder; R2 grey is background-only (Q24) | `#1F2937` |
| `--color-text-muted` | Secondary text | `#6C7A89` (pending Marilyn confirm) | `#6B7280` |
| `--color-signal` | Error/urgent CTAs | `#DC2626` | `#DC2626` |
| `--color-white` | Pure white | `#FFFFFF` | `#FFFFFF` |

**Bolded** Cargonomics values are exact transcriptions from the R2 brand guide PDF (extracted April 10, 2026 — see `01-research/cargonomics-brand-notes-for-website.md` for the full extraction with PANTONE / CMYK / RGB).

### Typography tokens

| Variable | Cargonomics | Flexed |
|---|---|---|
| `--font-heading` | **`'Orbitron', sans-serif`** (R2 p.4 — same font as the logo) | `'Source Serif 4', serif` (pending Flexed brand decision) |
| `--font-body` | **`'Open Sans', sans-serif`** (default; Montserrat is the alt — Q22) | `'Outfit', sans-serif` (pending) |
| `--font-weight-heading` | `700` | `700` |
| `--font-weight-body` | `400` | `400` |

The R2 brand guide describes the primary font as "solid, strong, modern, youthful, unique, trustworthy" for headings and the secondary as "clean, modern, widely available, easy on the eye" for body. The April 10 R2 extraction confirmed:

- **Heading: Orbitron** (locked) — explicitly labelled on R2 page 4 as the logo's typeface. Matching headings to the logo is the only sensible call. Free Google Font.
- **Body: Open Sans (Option 2)** — selected as default for the MVP because it's more accessible at small sizes than Montserrat. R2 page 11 also offers **Montserrat** (Option 1) as an alt and the brand guide does not pick one. Marilyn to confirm — see open-questions.md Q22.

All three fonts are free Google Fonts, so the "font files generic or proprietary?" question (Q10 / deliverables 1b) is RESOLVED.

Load via Google Fonts in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

### Logo tokens

| Variable | Cargonomics | Flexed |
|---|---|---|
| `--logo-url` | `url('../img/logo-cargonomics.svg')` (pending final file) | `url('../img/logo-flexed.svg')` (pending file from Marilyn) |
| `--logo-alt-text` | `'Cargonomics'` | `'Flexed'` |

## Pending values (tracked to open questions)

### Resolved April 10, 2026

| Token / decision | Resolution | Source |
|---|---|---|
| All six Cargonomics primary + secondary colours | Exact hex values transcribed from R2 brand guide pages 14 + 15 | `01-research/cargonomics-brand-notes-for-website.md` |
| Heading font | **Orbitron** (matches the logo, R2 p.4) | R2 page 4 |
| Body font (provisional) | **Open Sans** default; Montserrat is the alt option | R2 pages 11–12 |
| Font files generic or proprietary? | All Google Fonts, no proprietary files needed | Resolves Q10 + deliverables 1b |

### Still pending

| Token | What is pending | Open question |
|---|---|---|
| Cargonomics tonal ramps | R2 p.16 shows tints visually but no hex labels. Currently derived programmatically. | Q23 |
| Cargonomics body text grey | R2 "grey" `#D2D3D5` is a background grey, not a text grey. Body text grey TBD. | Q24 |
| Cargonomics body font final pick | Open Sans (default) vs Montserrat — Marilyn to confirm | Q22 |
| Cargonomics tagline "Smarter Flow. Better Results." | Appears only on R2 p.20 signage mockup. Not in any other doc. | Q25 |
| Cargonomics logo file | Final PNG landscape + SVG | Deliverables 1a |
| Flexed primary blue | Extract from Marilyn's blue + white logo file | Deliverables 5a + fallback extraction plan |
| Flexed logo file | Existing blue + white logo Marilyn has but hasn't sent | Deliverables 5a |
| Flexed sitemap | Photo pending since April 8 | Q7 |
| Flexed brand identity | R2 only covers Cargonomics. Does Flexed get its own guide, or stay as a navy+gold sibling? | Q26 |

See `06-client-comms/marilyn-deliverables-checklist.md` for the authoritative outstanding items list with hard deadlines, and `03-project-management/open-questions.md` for the full set of open questions.

## Adding a new client (future Elias-portfolio sites)

The template is designed to scale across Elias's ~11-project portfolio (Anne Hill IT, Special Needs Center, etc.). To add a new client:

1. Create `css/tokens-<client>.css` as a copy of `tokens-cargonomics.css`.
2. Replace the colour hex values with the new client's brand.
3. Replace the logo URL.
4. Swap the `<link>` tag in `index.html` (or keep multiple for a multi-site build).
5. Swap content per section.

Nothing in `style-v2.css` changes. That is the point.

## Section conventions (not duplicated here)

The April 8 kickoff meeting agreed specific changes to the homepage layout (hero is student-first, Coach/Connect/Consult moves up, 3-minute video removed, past conferences removed, etc.). Those decisions live in `06-client-comms/homepage-markup-notes-2026-04-08.md`. That file is the authoritative spec for MVP rebuild work. This tokens file only governs colour, type, and logo values.

## WordPress migration target

When Marilyn signs off on the HTML/CSS design, the tokens map one-to-one to Elementor:

| CSS custom property | Elementor target |
|---|---|
| `--color-primary`, `--color-secondary`, etc. | Elementor Global Colors (Site Settings → Global Colors) |
| `--font-heading`, `--font-body` | Elementor Global Fonts (Site Settings → Global Fonts) |
| `--color-ivory`, `--color-stone` | Additional Global Colors |
| `--color-text`, `--color-text-muted` | Elementor Typography → Text Colour |
| `--logo-url` | Site Identity → Site Logo |

One Elementor theme, two "Site Styles" configurations (Cargonomics and Flexed). Future clients = additional Site Styles configurations. No theme duplication.

WordPress migration is out of scope for the Tuesday April 14 MVP. This section is forward-looking only.
