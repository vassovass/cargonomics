# PRD 16: Dev/Live Environments on Cloudflare Pages

> **Order:** 16
> **Status:** Proposed
> **Type:** Ops / Infra
> **Dependencies:** PRD 15 (DNS Cutover)
> **Blocks:** None (enables ongoing site changes with client review)
> **Sprint:** 5 (Infrastructure)
> **Created:** 2026-04-14

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct the
> research items below, and generate 3 core + 2 stretch proactive items. Report findings to the
> user before beginning any WRITE phases.

---

## Why This Matters

Shipping changes directly to a live client site is risky. Marilyn needs a preview URL she can visit before any change hits production, and Google must never see the staging copy (duplicate content, confusion, clean-up work). The plan file chose Cloudflare Pages for production and Pages branch previews for staging because branch preview URLs are ephemeral, unindexed by default, and fronted by Cloudflare Access or Basic Auth to keep crawlers and casual visitors out.

This PRD sets up the two-environment workflow: `main` branch deploys to production at `cargonomics.com.vn`, and any other branch (e.g., `staging`) deploys to a branch preview at `<branch>.<project>.pages.dev`, gated behind authentication and `X-Robots-Tag: noindex, nofollow`. Forms already record `form_source` (PRD 8), so submissions can be filtered in the Google Sheet by environment without any form code change.

It also replaces GitHub Pages as the production host. GitHub Pages served the MVP preview well, but lacks branch previews, HTTP 301 rules, and header rules. A 301 from the old github.io URL to the new apex preserves the small amount of traffic the preview picked up.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| GitHub Pages production at `vassovass.github.io/cargonomics/` | No staging URL, no header control, no native 301s |
| Sub-repo `vassovass/cargonomics` on `main` only | No staging branch, no deploy-previews pattern |
| Google Apps Script form backend (PRD 8) | Already records `form_source`; no code change needed to distinguish envs |
| No `_redirects` or `_headers` files in the repo | Cloudflare Pages uses these for framework-less redirect/header rules |

---

## Desired Outcomes

### Section A: Production on Cloudflare Pages -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Cloudflare Pages project created, connected to `vassovass/cargonomics`** | No Pages host wired | Project appears in dashboard; first deploy succeeds; `main` mapped to Production | Confirm GitHub App permissions |
| A-2 | **Custom domain `cargonomics.com.vn` + `www` attached to production** | Production not on the real URL yet | Apex resolves to Pages; `www` 301 to apex | Depends on PRD 15 nameserver flip |
| A-3 | **301 from `vassovass.github.io/cargonomics/*` to apex** | Old URL still live and risks duplicate content | `curl -I` against old URL returns 301 to new apex | GitHub Pages does not support native 301; use `jekyll-redirect-from` config or a single `_config.yml` + meta-refresh fallback |

### Section B: Staging on Cloudflare Pages -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **`staging` branch creates a deploy preview at `staging.<project>.pages.dev`** | No staging URL | Pushing to `staging` triggers a build visible at that URL | None |
| B-2 | **Staging protected by Cloudflare Access (email PIN) or Worker Basic Auth, with `X-Robots-Tag: noindex, nofollow` response header** | Anyone (and Google) can read staging | Unauthenticated `curl -I` returns 401/302; authenticated request returns 200 + `X-Robots-Tag: noindex, nofollow` | Choose between Access (pre-approved email list for Marilyn + Vasso) and Worker Basic Auth (shared credential). Pick whichever is faster to stand up today; document the choice. |

### Section C: Environment Hygiene -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **Form submissions distinguishable by environment in the Google Sheet** | Marilyn cannot tell staging from live submissions | Submissions from production log `form_source=production` (or domain-derived label); from staging log `form_source=staging` | Confirm form JS derives source from `window.location.hostname` or a build-time env var |

---

## What This PRD Does NOT Cover

- Cloudflare zone creation (PRD 15)
- DNS record management (PRD 15)
- `robots.txt`, `sitemap.xml`, canonical audit (PRD 17)
- WordPress origin swap (PRD 20, future)
- PR-per-branch review workflow (out of scope, overkill for this team size)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `_headers` (repo root) | CREATE | Cloudflare Pages custom headers: `X-Robots-Tag` on staging preview hostnames, basic security headers on production |
| `_redirects` (repo root) | CREATE | Apex/www canonicalisation if not handled at Cloudflare level |
| `staging` branch | CREATE | Long-lived staging branch, pushed to trigger preview deploys |
| `docs/infra/deploy-workflow.md` | CREATE | Short doc: how to push to staging, how to promote to main |
| `js/form-submit.js` (or wherever `form_source` is set) | MODIFY | Ensure `form_source` reflects real environment (production vs staging vs local) |
| `.claude/rules/website-conventions.md` | MODIFY | Update `Dev Server` and `Git Protocol` sections to document the new workflow (main = production, staging = preview) |

---

## Agent Context

| File | Purpose |
|------|---------|
| `.claude/plans/glowing-chasing-flamingo.md` | Architecture plan |
| `docs/prds/PRD_08_Form_Backend.md` | Form backend spec, `form_source` attribution |
| `.claude/rules/website-conventions.md` | Current dev server / git protocol |
| `.claude/rules/sprints.md` | Commit/push protocol |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read plan + form backend PRD. Decide Access vs Worker Basic Auth for staging gate. Generate 3 core + 2 stretch proactive items. |
| 2 | `[WRITE]` `[SEQUENTIAL]` | Create Cloudflare Pages project connected to `vassovass/cargonomics`. Verify first build succeeds. |
| 3 | `[WRITE]` `[SEQUENTIAL]` | Attach `cargonomics.com.vn` + `www` as custom domains on the Pages project. Wait for SSL issue. |
| 4 | `[WRITE]` `[PARALLEL]` | Create `_headers` file (security + staging noindex). Create `_redirects` if needed. Create `staging` branch. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Configure Cloudflare Access (or Worker Basic Auth) for staging hostname. Pre-approve Marilyn and Vasso. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Add `jekyll-redirect-from` (or equivalent) to the existing GitHub Pages repo config so old URL 301s to new apex. Keep the GitHub repo live as backup. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Update `form_source` derivation to environment-aware value. Commit, push to staging, verify. |
| 8 | `[READ-ONLY]` | Run full verification pack from plan file (steps 3-9). |
| 9 | `[WRITE]` `[SEQUENTIAL]` | Update `website-conventions.md` with new workflow. Commit, push. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Cloudflare Access free tier scope | Free tier supports up to 50 users; sufficient for Vasso + Marilyn + a small review group | Informs whether to use Access or Worker Basic Auth |
| R-2 | Cloudflare Pages branch preview hostname pattern | Format is typically `<branch>.<project>.pages.dev`, confirm for the project being created | Access policy scope needs the exact hostname pattern |
| R-3 | `_headers` syntax for hostname-scoped rules | Cloudflare Pages supports per-path and per-hostname rules in `_headers`; confirm current syntax for 2026 | Wrong syntax = headers not applied |
| R-4 | GitHub Pages redirect plugin options | `jekyll-redirect-from` vs HTML meta-refresh + canonical + noindex | 301 is stronger than meta refresh for SEO signal |
| R-5 | Form JS current env detection | How does `form_source` currently get its value in the shipped code | Tells us whether the env-aware change is trivial or needs a rethink |

---

## Proactive Items

| # | Type | Item | Description | Trigger |
|---|------|------|-------------|---------|
| 1 | Core | `form_source_env` derived from `window.location.hostname` at submit time | Added `deriveFormSource()` in `js/form-submit.js` that tags each submission `production` / `staging` / `local` / hostname based on `window.location.hostname`. Independent of the existing `form_source` field (which preserves channel / intent: `application-form`, `inquiry_coaching`, etc.). Both columns ship to the same Google Sheet; filter by either without losing information. Survives WP migration unchanged. | Every form submission |
| 2 | Core | Immutable long-cache on `/img/*`, `/css/*`, `/js/*` in `_headers` | Added `Cache-Control: public, max-age=31536000, immutable` rules scoped to versioned asset paths in `_headers`. Repeat-view LCP improves; Cloudflare CDN cache hit rate jumps. Bust via rename if needed. HTML stays short-cache with `must-revalidate`. | Every request for static assets |
| 3 | Core | One-click rollback procedure documented in `deploy-workflow.md` | Cloudflare Pages supports one-click rollback to a prior deployment from the dashboard. Captured in `docs/infra/deploy-workflow.md` alongside git-revert and custom-domain-detach escalation paths. Vasso's future self thanks him. | Anytime production regresses |
| -- | -- | --- Stretch below --- | | |
| 4 | Stretch | `X-Robots-Tag: noindex` on `*.pages.dev` via Cloudflare Transform Rule (defence in depth on top of Basic Auth) | `_headers` does not support hostname scoping, so the noindex header is enforced via a Cloudflare Transform Rule in the dashboard (documented in runbook Part 6). Triple lockout: auth gate + transform rule + (eventually) a disallow-all `robots.txt` on staging via branch-diff. Not all three are live yet; transform rule ships at Cloudflare account setup. | After Cloudflare Pages provisioning |
| 5 | Stretch | Worker Basic Auth credentials rotated on a cadence | Shared credential is the operational tradeoff for Marilyn-friction. Rotate quarterly or when a reviewer leaves. Stored as Cloudflare Worker secret, shared with Marilyn out of band (WhatsApp voice or password manager). Not a code item, a process item. | Every quarter or on reviewer change |

---

## Modularity & WordPress Readiness

- [ ] Deploy workflow documented so the same pattern (production branch + staging branch + gated preview) transfers to the AZDIGI WP host in PRD 20
- [ ] `form_source` distinction uses `window.location.hostname` check (generic, survives the WP migration unchanged)

---

## Design & Code Quality

- [ ] `_headers` uses the minimum necessary rules (no overreach into paths not needing it)
- [ ] No secrets committed (Worker Basic Auth credential, if chosen, stored in Cloudflare env, not in repo)
- [ ] `deploy-workflow.md` written for Vasso's future self, not just for execution today

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Apex serves from Cloudflare Pages | No | Yes | `curl -I https://cargonomics.com.vn` returns 200 + Cloudflare headers |
| www 301s to apex | No | Yes | `curl -I https://www.cargonomics.com.vn` returns 301 |
| Staging branch auto-deploys | No | Yes | Push to staging triggers a visible deploy in Cloudflare dashboard |
| Staging gated behind auth | No | Yes | `curl -I` to staging URL returns 401/302 without auth |
| Staging has noindex header | No | Yes | Authenticated `curl -I` returns `X-Robots-Tag: noindex, nofollow` |
| Old github.io URL 301s to apex | No | Yes | `curl -I https://vassovass.github.io/cargonomics/` returns 301 |
| Form submissions tagged by env | `form_source` exists but uniform | Different values for prod vs staging | Submit from each, inspect Google Sheet |

---

## Verification Checklist

Same set as plan file (.claude/plans/glowing-chasing-flamingo.md), Verification section steps 3-9.

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Cloudflare Access email PIN annoys Marilyn for every review | She stops reviewing or asks for shared password | Medium | Have Worker Basic Auth with a shared credential ready as fallback. Pick based on Marilyn's preference after first review. |
| Branch preview hostname pattern changes | Access policy scope breaks | Low | Review Cloudflare Pages docs at setup time; use wildcard scope covering `*.<project>.pages.dev` if supported |
| Forgetting to add `X-Robots-Tag` before pushing test content | Google sees staging | Low | `_headers` ships before `staging` branch gets real content. Verification step 5 is a hard gate. |
| Split DNS during propagation confuses form origin logic | Some submissions logged to wrong env | Low | `form_source` uses `window.location.hostname`, not a build-time env, so it self-corrects as DNS stabilises |
| Old GitHub repo forgotten and bit-rots | Stale 301 chain or eventual breakage | Low | Add a note in the GitHub repo README pointing to the new apex and stating the repo is archival |

---

## Related Documents

- `.claude/plans/glowing-chasing-flamingo.md`
- PRD 15 (must complete first)
- PRD 17 (runs parallel or after, feeds robots.txt and sitemap.xml into the same Pages project)
- PRD 08 (existing form backend, `form_source` attribution)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD for Cloudflare Pages production, staging branch preview, gated + noindex, env-aware form attribution, old URL 301 |
