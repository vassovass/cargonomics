# Devtools

Internal tooling that is enabled via URL parameter or localStorage, disabled by default, and must be removed before WordPress migration (Elementor has its own Variables Manager; this widget would double-manage).

All devtools live in their own `js/devtool-*.js` files, use `data-devtool="..."` attributes on their injected markup so they can be grepped and stripped as a set, and read their enable flags from `localStorage` under the `cargo-devtool*` key namespace.

---

## 1. Brand Color Picker (PRD 23)

**File:** `js/devtool-color-picker.js`
**Injection:** referenced via `<script src="js/devtool-color-picker.js" defer></script>` in each page just before `</body>`.
**Markup:** the script injects a floating widget in the bottom-right (fixed position) when enabled. No static HTML in the page files.
**CSS:** injected inline by the script (single `<style>` tag with id `devtool-color-picker-style`). Scoped to `[data-devtool="color-picker"]` so it cannot affect production cascade when disabled.

### Enable

One of:

- Append `?devtool=1` to any URL. The widget appears and the setting persists in `localStorage` under key `cargo-devtool`, so subsequent navigations within the session keep it on.
- Or manually in the browser console: `localStorage.setItem('cargo-devtool', '1'); location.reload();`

### Use

- Click the floating "Devtool" button (bottom right) to open the panel.
- Three color inputs: `--color-primary` (navy), `--color-secondary` (gold), `--color-text` (body). Change any of them — the whole site restyles live.
- Current values shown as hex next to each input.
- **Reset** button: clears any devtool overrides, restores the tokens from `tokens-cargonomics.css`.
- **Copy CSS** button: writes a `:root { ... }` block to your clipboard with the current values. Paste into `tokens-cargonomics.css` when a palette decision sticks, and commit.
- **Disable** button: turns the widget off for this session (same as `?devtool=0`).

Changes persist across page navigation inside the site via `localStorage` under key `cargo-devtool-colors`. They do not ship to anyone else.

### Disable

One of:

- Append `?devtool=0` to any URL. Both flags cleared, widget removed.
- Click the "Disable" button inside the widget panel.
- In console: `localStorage.removeItem('cargo-devtool'); localStorage.removeItem('cargo-devtool-colors'); location.reload();`

### Safety / isolation

- When disabled, `devtool-color-picker.js` early-returns. Zero DOM writes, zero CSS injection, zero performance cost beyond the script download itself.
- The script download is small (~8 KB unminified) and runs deferred. No blocking impact on page load.
- Widget never affects analytics (`data-track` is not added to devtool elements).
- Widget never affects form submissions or any production behaviour.

### Adding more tokens

Edit the `TOKENS` array at the top of `js/devtool-color-picker.js`. Each entry is:

```js
{ name: '--color-foo', label: 'Foo (context)', fallback: '#HEXFALLBACK' }
```

The `fallback` is used if the browser can't read the live computed value of the token.

---

## 2. Image Review Carousel (PRD 9 legacy)

**File:** `js/image-review.js`
**Enable:** any `<img>` with a `data-images='[...]'` JSON array attribute becomes click-to-cycle.
**Status:** retired on most production slots (PRD 21 replaced placeholders with real images). Still live on the remaining placeholder slots.

---

## Removal before WordPress migration

Everything devtool related ships to the repo so it can be iterated on, but none of it should migrate to WordPress. When PRD 20 runs:

1. Delete all `js/devtool-*.js` files.
2. Remove any `<script src="js/devtool-*.js">` tags from `index.html`, `about.html`, `course.html`, `contact.html`, `apply.html`.
3. Remove any `<div data-devtool="..">` markup (there is none in the current page files — devtools inject their own markup at runtime).
4. Grep `data-devtool` across the repo one last time to confirm zero matches.
5. Delete this `docs/devtools.md`.

Should take ~5 minutes.
