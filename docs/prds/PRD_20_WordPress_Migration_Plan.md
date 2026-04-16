# PRD 20: WordPress Migration Plan

> **Order:** 20
> **Status:** Proposed
> **Type:** Ops / Migration
> **Dependencies:** PRD 15 (DNS Cutover), PRD 16 (Dev/Live Environments), PRD 17 (SEO Fundamentals), client sign-off on static MVP
> **Blocks:** None
> **Sprint:** Post-MVP (scheduled after Marilyn signs off on static design)
> **Created:** 2026-04-14

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct the
> research items below, and generate 3 core + 2 stretch proactive items. Report findings to the
> user before beginning any WRITE phases.

---

## Why This Matters

The static MVP serves a specific purpose: get a credible, branded, reviewable site in front of Marilyn before the June 1 bootcamp intake. The proposal (v5) committed to a WordPress + Elementor + ACF build as the target platform for the ongoing site. Design tokens, `data-section`, `data-slot`, and `data-elementor-widget` attributes were chosen precisely so migration wouldn't require a redesign, just a re-implementation.

This PRD captures the migration plan in full so when the green light comes, we execute it quickly without re-litigating choices. It picks AZDIGI as the managed WordPress host (Vietnam-local, low latency from HCMC, built-in staging), Fluent Forms with native Airtable integration (replacing Google Apps Script), and an in-place cutover via Cloudflare DNS swap that preserves `cargonomics.com.vn` URL authority.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| Static MVP on Cloudflare Pages at `cargonomics.com.vn` (once PRDs 15-17 complete) | Not a long-term editing surface for Marilyn |
| Form backend = Google Apps Script → Google Sheet | Airtable CRM migration pending; decoupled from WP choice |
| Design tokens in `css/tokens-cargonomics.css` | Elementor-ready via Variables Manager, no rebuild needed |
| 4 pages + sections with `data-section` + `data-slot` attributes | Migrate to Elementor Saved Templates + ACF fields |
| No WordPress host provisioned | Trigger: Marilyn signs off on design |
| No Elementor / ACF licenses yet | Purchase at migration start, annual |

---

## Desired Outcomes

### Section A: Host Provisioning -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **AZDIGI managed WordPress hosting account active** | No WP origin | Account active, plan sized for ~hundreds of visits/month with headroom; staging environment available | Confirm 2026 pricing and plan tiers; fallback to SiteGround if AZDIGI English support quality fails |
| A-2 | **WordPress installed on AZDIGI staging, Elementor Pro + ACF Pro + Fluent Forms + Hello Elementor theme installed** | Empty WP | Admin accessible; all four plugins active; Hello Elementor theme set | Confirm latest Elementor Pro + ACF Pro versions and license flow |

### Section B: Site Rebuild -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Design tokens imported to Elementor Variables Manager** | Brand values not in WP | Navy, Gold, secondaries, Orbitron, Open Sans present in Variables Manager, bound to Hello Elementor theme styles | Elementor Variables Manager 2026 flow |
| B-2 | **4 page templates rebuilt as Elementor Saved Templates matching `data-section` blocks** | No pages | Home, About, Course, Contact each render at parity with the static MVP | None |
| B-3 | **ACF field groups bound to `data-slot` elements** | Marilyn cannot edit content easily | ACF fields (heading, body, image, CTA) attached to relevant CPTs or pages; Marilyn can edit via WP admin | None |

### Section C: Form + CRM Integration -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Fluent Forms form built to match current application form (7 visible + 11 hidden fields, UTM auto-fill, form_source)** | Google Apps Script is interim | Form renders on contact page; submission saves to WP DB + pushes to Airtable via native integration | Airtable Personal Access Token scope, base/table mapping |
| C-2 | **Airtable base + table + field mapping in place (per Phase 1 CRM scope)** | No CRM target | Fluent Forms pushes fields to correct columns; hidden UTM and attribution fields survive | Depends on Phase 1 CRM PRD (separate track) |

### Section D: Cutover -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **301 redirect map from static paths to WP slugs** | URL authority loss | Every static URL (`/`, `/about`, `/course`, `/contact`, and variants) maps to the correct WP URL; map documented | Final URL structure choice in WP (e.g., `/about/` trailing slash, Permalinks setting) |
| D-2 | **Cloudflare DNS swap from Pages → AZDIGI** | Pages still serving | Apex + www CNAME/A points at AZDIGI origin; Cloudflare proxied; SSL issued; old Pages deployment left active but idle as rollback | AZDIGI DNS target (hostname or IP) |

---

## What This PRD Does NOT Cover

- Phase 1 CRM Airtable schema (separate PRD, separate track)
- Blog or additional pages beyond the MVP 4 (future scope per proposal)
- Flexed WordPress build (template instance after Cargonomics WP is stable)
- Any paid WP plugin beyond Elementor Pro + ACF Pro + Fluent Forms (justify anything else in an add-on PRD)
- E-commerce / WooCommerce (not in scope)

---

## Files to Create/Modify

WordPress content lives in the WP database, not the repo. Repo changes limited to:

| File | Action | Description |
|------|--------|-------------|
| `docs/infra/wordpress-migration-runbook.md` | CREATE | Step-by-step migration playbook |
| `docs/infra/url-redirect-map.csv` | CREATE | Static path → WP slug + 301 plan |
| `docs/infra/elementor-template-manifest.md` | CREATE | Which `data-section` blocks map to which Saved Template |
| `docs/infra/acf-field-manifest.md` | CREATE | Which `data-slot` elements map to which ACF field |
| `docs/infra/fluent-forms-airtable-mapping.md` | CREATE | Form field → Airtable column mapping |
| `03-project-management/decisions-log.md` | MODIFY | Log AZDIGI, Fluent Forms, cutover date |

---

## Agent Context

| File | Purpose |
|------|---------|
| `05-deliverables/proposal/proposal-cargonomics-crm-v5.md` | Proposed WordPress scope, up to 10 pages |
| `.claude/rules/website-conventions.md` | Current WordPress-Forward Design section (lines 62-70) |
| `docs/tokens.md` | Design token specification |
| All 4 HTML pages | Source of truth for content and structure |
| `docs/prds/PRD_08_Form_Backend.md` | Current form backend to replace |
| `.claude/plans/glowing-chasing-flamingo.md` | Architecture plan |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read plan, proposal, website-conventions, current HTML. Verify sign-off received. Generate 3 core + 2 stretch proactive items. |
| 2 | `[WRITE]` `[SEQUENTIAL]` | Provision AZDIGI hosting. Install WP, Hello Elementor, Elementor Pro, ACF Pro, Fluent Forms. |
| 3 | `[WRITE]` `[PARALLEL]` | Import tokens to Variables Manager. Build Elementor Saved Templates from `data-section` blocks. Define ACF field groups from `data-slot` elements. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Rebuild 4 pages as Elementor templates. Visual parity check against static MVP. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Build Fluent Forms version of application form. Wire Airtable integration. Test end-to-end submission. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Author redirect map CSV. Configure WP 301s via Yoast/RankMath/Redirection plugin. |
| 7 | `[READ-ONLY]` | Full QA: responsive, accessible, analytics firing, forms submitting, Airtable receiving. |
| 8 | `[WRITE]` `[SEQUENTIAL]` | Cutover: switch Cloudflare DNS from Pages to AZDIGI. Monitor error rate. Roll back by reverting DNS if critical regression. |
| 9 | `[WRITE]` `[SEQUENTIAL]` | Post-cutover: submit updated sitemap to GSC, monitor indexing, archive Cloudflare Pages deployment as rollback. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | AZDIGI 2026 plan pricing and features | Specs sufficient for WP + Elementor + ACF + Fluent Forms at expected traffic | Cost envelope, staging availability |
| R-2 | AZDIGI English support responsiveness | Test via pre-sales ticket or chat | Non-negotiable for this client |
| R-3 | Elementor Pro + ACF Pro latest versions and Site License tier | Pricing may have changed since proposal | Year-1 cost reality |
| R-4 | Fluent Forms Airtable native integration scope | Confirm it handles UTM hidden fields, attribution tracking, and file uploads if any | Drop-in replacement viability |
| R-5 | Airtable Personal Access Token scoping | Minimum scopes for Fluent Forms integration | Security principle of least privilege |
| R-6 | Cloudflare Pages deployment archiving | Can the old Pages deployment stay live on a subdomain as rollback? | Cheap safety net |

---

## Proactive Items

| # | Type | Item | Description | Trigger |
|---|------|------|-------------|---------|
| 1 | Core | _TBD at execution_ | | |
| 2 | Core | _TBD_ | | |
| 3 | Core | _TBD_ | | |
| -- | -- | --- Stretch below --- | | |
| 4 | Stretch | _TBD_ | | |
| 5 | Stretch | _TBD_ | | |

---

## Modularity & WordPress Readiness

- [ ] Every Elementor Saved Template mirrors one `data-section` block from the static HTML
- [ ] Every ACF field binds to exactly one `data-slot` element
- [ ] Tokens loaded into Variables Manager, not hardcoded in CSS
- [ ] Hello Elementor theme used as base (no theme customisation outside child CSS if needed)
- [ ] Flexed brand is a second Site Style, not a second theme

---

## Design & Code Quality

- [ ] No plugin sprawl: stick to Elementor Pro + ACF Pro + Fluent Forms + Redirection (+ GSC verification plugin if not using DNS TXT) + security basics (limit login attempts, Wordfence Lite or similar)
- [ ] WP admin accounts: Vasso (admin), Marilyn (editor), no shared credentials
- [ ] Nightly backups via AZDIGI built-in + occasional local export
- [ ] Staging is not indexable (reuse the `robots.txt` + `X-Robots-Tag` pattern from PRDs 16/17)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| WP live at `cargonomics.com.vn` | Static (Cloudflare Pages) | WP on AZDIGI via Cloudflare proxy | `curl -I` shows WP headers (or at least no Pages headers); page rendered via WP |
| Parity with static MVP | N/A | Visual parity on 4 pages | Side-by-side screenshots |
| Form submits to Airtable | No | Yes | Submit test, check Airtable base |
| All static URLs 301 to WP equivalents | No | Yes | `curl -I` against each old URL |
| Lighthouse performance | Static baseline | Within 10% | Lighthouse audit |
| GSC sitemap updated | Pointed at static URLs | Pointed at WP URLs | GSC shows new sitemap "Success" |
| Staging works | N/A | AZDIGI staging deploys independently | Push content to staging subdomain |

---

## Verification Checklist

Per-phase verification tables above, plus a final cutover runbook checklist in `docs/infra/wordpress-migration-runbook.md`.

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| AZDIGI English support insufficient at critical moment | Migration stalls | Medium | Fallback: SiteGround. Decision documented before provisioning. |
| Elementor Pro + ACF Pro bindings break on theme update | Layout shift on Marilyn's watch | Medium | Stage all plugin/theme updates on AZDIGI staging first. Never auto-update on production. |
| Fluent Forms + Airtable integration drops submissions silently | CRM pipeline breaks | Medium | Keep Google Sheet endpoint as secondary target via webhook for first month. Cross-check. |
| URL redirects incomplete, old SEO equity lost | Rank drop, 404s from external links | Medium | Redirect map CSV reviewed before cutover. `grep` across old content for internal links. Set up GSC Crawl Errors report review for first month post-cutover. |
| DNS cutover leaves email broken | M365 outage | Low | DNS records for M365 were set in Cloudflare (PRD 15); WP migration changes apex CNAME only, not MX. |
| Marilyn prefers editing via ACF but admin too complex | Her workflow breaks | Medium | Record short screencast walkthrough of common edits. Use ACF's "Friendly UI" plugin if needed. |

---

## Related Documents

- `.claude/plans/glowing-chasing-flamingo.md`
- `05-deliverables/proposal/proposal-cargonomics-crm-v5.md`
- `.claude/rules/website-conventions.md` (WordPress-Forward Design section)
- PRDs 15, 16, 17 (must complete first; their output is the foundation)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD capturing full WordPress migration plan: AZDIGI host, Elementor + ACF, Fluent Forms + Airtable, redirect map, cutover procedure |
