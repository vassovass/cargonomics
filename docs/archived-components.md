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

## section-programs-card-professional-development

**Status.** archived
**Removed on.** 2026-04-16
**Removed by.** PRD 18 (Homepage Scope Reduction)
**Reason.** Professional Development is a future offering with no live enrolment dates. Keeping it on the homepage diluted the WYDLS bootcamp as the single conversion goal of the MVP page. Removed per Marilyn's April 14 direction to focus the homepage exclusively on the June 1 bootcamp intake.
**Reinstate via.** Paste the HTML snapshot below back into `index.html` inside a restored `.programs-v2__secondary` wrapper (see the other archived entry for the wrapper). Restore CSS snapshot in `css/style-v{N}.css`. Add corresponding footer link in the Programs column.
**Tokens used.** `--color-white`, `--color-primary-rgb`, `--transition-base` (via `.program-card` shared rules — these stay live and do not need restoration), `--space-*` (via `.programs-v2__secondary` grid gap, see other archive entry).
**Elementor target.** Card widget (heading + text-editor + button) inside a two-column container. Suggest binding title, meta bullets, description, and CTA button to ACF fields on a future Programme CPT so Marilyn can add more programmes without developer involvement.

### HTML snapshot

```html
<div class="program-card fade-up">
  <h3 class="program-card__name" id="professional-dev">Professional Development</h3>
  <div class="program-card__meta">
    <span>6 weeks</span>
    <span>24 hours</span>
    <span>Half-yearly</span>
  </div>
  <p class="program-card__desc">For mid-management professionals already in the industry. Advanced modules in management, finance, business development, and mentoring.</p>
  <a href="contact" class="program-card__cta" data-track="cta" data-cta-type="inquire" data-cta-location="programs" data-cta-destination="contact-form">Enquire</a>
</div>
```

### CSS snapshot (from css/style-v4.css)

The `.program-card` class itself is shared with the featured WYDLS card and remains in the active stylesheet. Only the parent grid wrapper `.programs-v2__secondary` was scoped exclusively to these two cards; its CSS snapshot lives in the sibling entry `section-programs-card-corporate-training` below to avoid duplication.

### Notes

- This card had no image slot, just text and a CTA. When reinstated, consider adding a waitlist signup field (email input tied to a new Airtable table or Mailchimp list) so pent-up demand during the "paused" period becomes a measurable signal by the time the programme launches.
- Analytics attributes (`data-track`, `data-cta-location="programs"`, `data-cta-destination="contact-form"`) were already wired. If reinstated with the same class, GTM triggers keep working with zero config.
- No image dependency; no JSON-LD schema entry; no sitemap entry. Pure content block.

---

## section-programs-card-corporate-training

**Status.** archived
**Removed on.** 2026-04-16
**Removed by.** PRD 18 (Homepage Scope Reduction)
**Reason.** Same as the Professional Development entry: future offering with no live dates, dilutes the single conversion goal of the MVP homepage.
**Reinstate via.** Paste the HTML snapshot below back into `index.html` inside a restored `.programs-v2__secondary` wrapper (grid CSS snapshot included below). Restore the footer Programs column link.
**Tokens used.** Same as the Professional Development entry. The `.programs-v2__secondary` grid wrapper uses a hardcoded 20px gap which should be tokenised to `var(--space-lg)` or similar on reinstate; flagged as a cleanup opportunity.
**Elementor target.** Second card in the same two-column container as the Professional Development widget. ACF binding same as the sibling entry.

### HTML snapshot

```html
<div class="program-card fade-up">
  <h3 class="program-card__name" id="corporate-training">Corporate Training</h3>
  <div class="program-card__meta">
    <span>1-3 days</span>
    <span>Ad hoc</span>
    <span>Tailored</span>
  </div>
  <p class="program-card__desc">Custom programs designed around your company's specific needs: skills development, knowledge transfer, and team capability building.</p>
  <a href="contact" class="program-card__cta" data-track="cta" data-cta-type="inquire" data-cta-location="programs" data-cta-destination="contact-form">Request a Programme</a>
</div>
```

### CSS snapshot (from css/style-v4.css)

The `.programs-v2__secondary` wrapper is the only selector scoped exclusively to the pair of archived cards. On reinstatement, paste both rules back into the active stylesheet.

```css
/* Secondary programs — 2-col */
.programs-v2__secondary {
  display: grid;
  gap: 20px;
}

/* Responsive variant at desktop breakpoint (around line 1544) */
@media (min-width: 768px) {
  .programs-v2__secondary {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

Note: the `.program-card`, `.program-card__name`, `.program-card__meta`, `.program-card__desc`, `.program-card__cta` rules are shared with the featured WYDLS card. They remain live in the active stylesheet and do not need restoration.

### Notes

- Hardcoded `gap: 20px` should be swapped for `var(--space-lg)` on reinstate. Token was `--space-md` or `--space-lg` depending on the final rhythm; inspect adjacent sections at reinstate time to pick.
- Wrap element on reinstate: `<div class="programs-v2__secondary">{card1}{card2}</div>` between `.program-featured` and `.curriculum-v2` in `index.html`.
- Corporate Training historically had a "Request a Programme" CTA rather than "Enquire", to signal that these are bespoke engagements. Preserve the copy distinction on reinstate.
- Like the sibling entry, consider a waitlist signup on reinstate so the pre-launch period captures interest.

---

## trainer-card-partner-placeholder

**Status.** archived
**Removed on.** 2026-04-16
**Removed by.** PRD 18 follow-through (Commit 1 of backlog-closure plan)
**Reason.** The card presented a second trainer as "Senior Industry Advisor" with the Cargonomics logo at 30% opacity as a fake portrait and "Profile details coming soon" as the bio. Marilyn and Vasso both flagged this across multiple sessions as reading "broken" rather than "coming soon". Removing it leaves Elias as the single named trainer, which reads as "strong lead with team to come" instead of "broken profile".
**Reinstate via.** Paste the HTML snapshot back into `.trainers-v2__grid` as a second `.trainer-card-v2` sibling to the Elias card. Replace the placeholder logo `img` with a real headshot. Replace the placeholder bio with real copy. Confirm the person's name, role, and ID before shipping.
**Tokens used.** `--color-stone`, `--color-primary`, `--color-secondary` (via `.trainer-card-v2` and `.trainer-placeholder-logo` shared rules).
**Elementor target.** Image + Text Box widget in a 2-column container. Bind photo, name, role, bio to ACF fields on a Trainer CPT for scalability.

### HTML snapshot

```html
<div class="trainer-card-v2 fade-up">
  <div class="trainer-card-v2__photo">
    <div class="trainer-placeholder-logo">
      <img src="img/logo-cargonomics-white.png" alt="Senior Industry Advisor" loading="lazy">
    </div>
  </div>
  <div class="trainer-card-v2__info">
    <h3 class="trainer-card-v2__name" id="advisor">Senior Industry Advisor</h3>
    <div class="trainer-card-v2__role">Co-Founder &amp; Senior Trainer</div>
    <p class="trainer-card-v2__bio">Profile details coming soon. Decades of industry experience with an extensive international network. Specialises in strategy and operational excellence across the shipping and logistics sector.</p>
  </div>
</div>
```

### Notes

- The `.trainer-placeholder-logo` wrapper is specific to the placeholder treatment (30% opacity logo). On reinstate, replace the wrapper + inner `img` with a normal `<img>` headshot at full opacity.
- Same card re-used on the About page (`leader-card-partner-placeholder` entry below) with a different BEM namespace. Reinstate both together so the About leadership section and homepage trainers stay in sync.

---

## leader-card-partner-placeholder

**Status.** archived
**Removed on.** 2026-04-16
**Removed by.** PRD 18 follow-through (Commit 1 of backlog-closure plan)
**Reason.** Same as `trainer-card-partner-placeholder`: the About page leadership section showed a second card for "Senior Industry Advisor" with the Cargonomics logo at 30% opacity as a fake portrait. Read as broken rather than coming-soon. Removed so About leadership presents as a confident single-founder-focus section.
**Reinstate via.** Paste the HTML snapshot back into `.leadership__grid` as a second `.leader-card` sibling to the Elias card. Replace placeholder image, copy, name.
**Tokens used.** Same as the trainer-card archive.
**Elementor target.** Same Image + Text Box widget pattern. Shared Trainer CPT with the homepage trainers section, so one data entry populates both.

### HTML snapshot

```html
<!-- Partner Trainer — placeholder, no details available -->
<article class="leader-card fade-up" data-slot="leader-partner" data-elementor-widget="container">
  <div class="leader-card__photo leader-card__photo--placeholder" data-slot="image" data-elementor-widget="image">
    <img src="img/logo-cargonomics-white.png" alt="Senior Industry Advisor" loading="lazy" style="width: 50%; height: auto; object-fit: contain; opacity: 0.3;">
  </div>
  <div class="leader-card__info">
    <h3 class="leader-card__name" id="about-advisor">Senior Industry Advisor</h3>
    <div class="leader-card__role">Co-Founder &amp; Senior Trainer</div>
    <p class="leader-card__bio">Profile details coming soon. Decades of industry experience with an extensive international network. Specialises in strategy and operational excellence across the shipping and logistics sector.</p>
  </div>
</article>
```

### Notes

- Inline styles on the placeholder image (`opacity: 0.3`, `width: 50%`) were intentional to make the fake portrait fade into the background. On reinstate, drop these inline styles and use a real photo at full opacity.
- Coordinate reinstate with `trainer-card-partner-placeholder` so both pages surface the same trainer consistently.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-14 | Created as lightweight archive scaffold ahead of PRD 18 execution, per approved April 14 plan. Will be superseded by PRD 20's styleguide.html when that ships. Until then, this markdown file is the canonical home for removed-but-preserved component markup. |
