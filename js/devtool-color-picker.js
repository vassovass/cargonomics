/**
 * DEVTOOL — Brand Color Picker (Cargonomics)
 *
 * PRD 23 (D25). Footer-mounted color picker + reset + copy-CSS button for
 * iterating brand colour choices live during design review. Self-contained:
 * injects its own markup and styles when enabled, does nothing when disabled.
 *
 * ENABLE: append `?devtool=1` to any URL (one-time enable; also persists via
 *         localStorage so subsequent navigations within the session stay on)
 *         OR set `localStorage.setItem('cargo-devtool', '1')` in the console.
 * DISABLE: append `?devtool=0` to any URL, or clear localStorage.
 *
 * REMOVE FOR WORDPRESS MIGRATION: delete this file + the <script> tag that
 * loads it + the `data-devtool` localStorage key. That's it.
 *
 * Scope of tokens exposed: --color-primary (navy), --color-secondary (gold),
 * --color-text (body). More can be added by appending to TOKENS below.
 *
 * Author: Cargonomics site project. Vanilla JS only, no dependencies.
 */

(function () {
  'use strict';

  // ==== 1. Enable / disable gate ==========================================

  var LS_KEY = 'cargo-devtool';
  var params = new URLSearchParams(window.location.search);
  if (params.get('devtool') === '1') {
    localStorage.setItem(LS_KEY, '1');
  } else if (params.get('devtool') === '0') {
    localStorage.removeItem(LS_KEY);
    clearPersistedColors();
    return;
  }
  if (localStorage.getItem(LS_KEY) !== '1') return;

  // ==== 2. Tokens exposed ==================================================

  var TOKENS = [
    { name: '--color-primary',   label: 'Primary (Navy)', fallback: '#11294B' },
    { name: '--color-secondary', label: 'Secondary (Gold)', fallback: '#D4B468' },
    { name: '--color-text',      label: 'Body Text',      fallback: '#2C3E50' }
  ];

  var LS_COLORS = 'cargo-devtool-colors';

  // ==== 3. Persistence helpers =============================================

  function loadPersisted() {
    try {
      return JSON.parse(localStorage.getItem(LS_COLORS) || '{}');
    } catch (e) {
      return {};
    }
  }

  function savePersisted(obj) {
    localStorage.setItem(LS_COLORS, JSON.stringify(obj));
  }

  function clearPersistedColors() {
    localStorage.removeItem(LS_COLORS);
  }

  function applyToken(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function readCurrentToken(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // Hydrate persisted colours on load
  var persisted = loadPersisted();
  TOKENS.forEach(function (t) {
    if (persisted[t.name]) applyToken(t.name, persisted[t.name]);
  });

  // ==== 4. Widget styles (scoped, defence-in-depth) ========================

  var STYLE_ID = 'devtool-color-picker-style';
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = [
      '[data-devtool="color-picker"] {',
      '  position: fixed; right: 16px; bottom: 16px; z-index: 9999;',
      '  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;',
      '  font-size: 12px;',
      '}',
      '[data-devtool="color-picker"] .devtool-toggle {',
      '  background: #11294B; color: #fff; border: 1px solid #D4B468;',
      '  padding: 8px 12px; border-radius: 4px; cursor: pointer;',
      '  font-family: inherit; font-size: inherit; font-weight: 600;',
      '  letter-spacing: 0.04em; text-transform: uppercase;',
      '  box-shadow: 0 4px 16px rgba(0,0,0,0.2);',
      '}',
      '[data-devtool="color-picker"] .devtool-toggle:hover { background: #1D3A65; }',
      '[data-devtool="color-picker"] .devtool-panel {',
      '  background: #fff; border: 1px solid #D4B468; border-radius: 6px;',
      '  padding: 14px; margin-top: 8px; min-width: 260px;',
      '  box-shadow: 0 8px 24px rgba(0,0,0,0.15);',
      '}',
      '[data-devtool="color-picker"] .devtool-panel[hidden] { display: none; }',
      '[data-devtool="color-picker"] .devtool-row {',
      '  display: flex; align-items: center; gap: 8px;',
      '  margin-bottom: 10px;',
      '}',
      '[data-devtool="color-picker"] .devtool-row label {',
      '  flex: 1; color: #2C3E50; font-size: 11px;',
      '}',
      '[data-devtool="color-picker"] .devtool-row input[type="color"] {',
      '  width: 40px; height: 28px; padding: 0; border: 1px solid #ddd;',
      '  border-radius: 3px; cursor: pointer; background: #fff;',
      '}',
      '[data-devtool="color-picker"] .devtool-row .devtool-hex {',
      '  font-family: "JetBrains Mono", Menlo, monospace;',
      '  font-size: 11px; color: #777; width: 60px; text-align: right;',
      '}',
      '[data-devtool="color-picker"] .devtool-actions {',
      '  display: flex; gap: 6px; margin-top: 12px;',
      '  padding-top: 10px; border-top: 1px solid #eee;',
      '}',
      '[data-devtool="color-picker"] .devtool-actions button {',
      '  flex: 1; padding: 6px 8px; font-size: 11px; cursor: pointer;',
      '  border: 1px solid #D4B468; background: #fff; color: #11294B;',
      '  border-radius: 3px; font-family: inherit; font-weight: 600;',
      '}',
      '[data-devtool="color-picker"] .devtool-actions button:hover {',
      '  background: #D4B468; color: #fff;',
      '}',
      '[data-devtool="color-picker"] .devtool-meta {',
      '  margin-top: 10px; padding-top: 8px; border-top: 1px solid #eee;',
      '  color: #999; font-size: 10px;',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  // ==== 5. Build widget markup =============================================

  function buildWidget() {
    var root = document.createElement('div');
    root.setAttribute('data-devtool', 'color-picker');
    root.innerHTML = [
      '<button class="devtool-toggle" type="button" aria-expanded="false" aria-controls="devtool-panel">\u{1F3A8} Devtool</button>',
      '<div class="devtool-panel" id="devtool-panel" hidden>',
      '  <div class="devtool-rows"></div>',
      '  <div class="devtool-actions">',
      '    <button type="button" class="devtool-reset">Reset</button>',
      '    <button type="button" class="devtool-copy">Copy CSS</button>',
      '    <button type="button" class="devtool-off">Disable</button>',
      '  </div>',
      '  <div class="devtool-meta">PRD 23 \u00b7 localStorage cargo-devtool-colors \u00b7 <a href="?devtool=0" style="color:inherit">Disable (clear)</a></div>',
      '</div>'
    ].join('');
    return root;
  }

  function buildRow(token) {
    var currentValue = (persisted[token.name] || readCurrentToken(token.name) || token.fallback).toLowerCase();
    // Ensure 6-char hex for <input type=color>
    if (currentValue.length === 4) {
      currentValue = '#' + currentValue.slice(1).split('').map(function(c){return c+c;}).join('');
    }
    var row = document.createElement('div');
    row.className = 'devtool-row';
    row.dataset.token = token.name;
    row.innerHTML = [
      '<label for="devtool-' + token.name.replace(/[^a-z]/gi, '') + '">' + token.label + '</label>',
      '<span class="devtool-hex">' + currentValue + '</span>',
      '<input type="color" id="devtool-' + token.name.replace(/[^a-z]/gi, '') + '" value="' + currentValue + '" />'
    ].join('');
    return row;
  }

  // ==== 6. Wire behaviour ==================================================

  function initWidget() {
    injectStyle();
    var widget = buildWidget();
    document.body.appendChild(widget);

    var rowContainer = widget.querySelector('.devtool-rows');
    var rows = TOKENS.map(buildRow);
    rows.forEach(function (row) { rowContainer.appendChild(row); });

    // Toggle panel open / closed
    var toggle = widget.querySelector('.devtool-toggle');
    var panel = widget.querySelector('.devtool-panel');
    toggle.addEventListener('click', function () {
      var willOpen = panel.hasAttribute('hidden');
      if (willOpen) { panel.removeAttribute('hidden'); }
      else { panel.setAttribute('hidden', ''); }
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    // Wire each color input
    rows.forEach(function (row) {
      var token = row.dataset.token;
      var input = row.querySelector('input[type="color"]');
      var hex = row.querySelector('.devtool-hex');
      input.addEventListener('input', function () {
        applyToken(token, input.value);
        hex.textContent = input.value;
        var p = loadPersisted();
        p[token] = input.value;
        savePersisted(p);
      });
    });

    // Reset
    widget.querySelector('.devtool-reset').addEventListener('click', function () {
      TOKENS.forEach(function (t) {
        document.documentElement.style.removeProperty(t.name);
      });
      clearPersistedColors();
      // Refresh input values
      rows.forEach(function (row) {
        var token = row.dataset.token;
        var input = row.querySelector('input[type="color"]');
        var hex = row.querySelector('.devtool-hex');
        var current = readCurrentToken(token) || TOKENS.find(function(t){return t.name===token;}).fallback;
        input.value = current;
        hex.textContent = current;
      });
    });

    // Copy CSS
    widget.querySelector('.devtool-copy').addEventListener('click', function (e) {
      var btn = e.currentTarget;
      var css = ':root {\n' + TOKENS.map(function (t) {
        var v = document.documentElement.style.getPropertyValue(t.name) || readCurrentToken(t.name);
        return '  ' + t.name + ': ' + v.trim() + ';';
      }).join('\n') + '\n}';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(css).then(function () {
          var original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = original; }, 1200);
        });
      } else {
        // Fallback: print to console
        console.log(css);
        btn.textContent = 'See console';
        setTimeout(function () { btn.textContent = 'Copy CSS'; }, 1200);
      }
    });

    // Disable
    widget.querySelector('.devtool-off').addEventListener('click', function () {
      localStorage.removeItem(LS_KEY);
      clearPersistedColors();
      TOKENS.forEach(function (t) { document.documentElement.style.removeProperty(t.name); });
      widget.remove();
      var styleEl = document.getElementById(STYLE_ID);
      if (styleEl) styleEl.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
})();
