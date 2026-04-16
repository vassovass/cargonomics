# Deploy Workflow

Two environments served by Cloudflare Pages from the `vassovass/cargonomics` repo.

## Environments

| Branch | Environment | URL | Auth | Robots |
|--------|-------------|-----|------|--------|
| `main` | Production | `https://cargonomics.com.vn` | None (public) | Indexable via `robots.txt` + `sitemap.xml` |
| `staging` | Preview | `https://staging.cargonomics-site.pages.dev` (confirm exact pattern in Cloudflare Pages dashboard) | Worker Basic Auth, shared credential | `X-Robots-Tag: noindex, nofollow` via Cloudflare Transform Rule scoped to `*.pages.dev` |
| Any other branch | Ad-hoc preview | `<branch>.cargonomics-site.pages.dev` | Same Basic Auth | Same noindex |

Cloudflare Pages auto-deploys every push. Production auto-deploys only from `main`.

## Push to staging

```bash
cd "C:/Users/vasso/Projects/CRM Consultancy/05-deliverables/website-prototype/cargonomics-site"
git checkout staging
git merge main          # sync with production baseline
# ...commit your changes on staging...
git push origin staging
```

Cloudflare triggers a build. Preview URL shown in the dashboard deployment log. Share with Marilyn for review.

## Promote to production

Fast-forward merge from `staging` to `main`:

```bash
git checkout main
git merge --ff-only staging
git push origin main
```

If the fast-forward fails (because `main` has diverged), rebase `staging` on `main` first:

```bash
git checkout staging
git rebase main
git push --force-with-lease origin staging
# ...visual review again on staging URL...
git checkout main && git merge --ff-only staging && git push
```

## Staging auth (for Marilyn and reviewers)

Worker Basic Auth, one shared credential.

- **Username + password:** stored in Cloudflare Worker secrets. Keep both out of this repo and out of email. Share with Marilyn via WhatsApp voice or a password manager.
- **Where to find them after setup:** Cloudflare dashboard → Workers & Pages → the Basic Auth worker → Settings → Variables.
- **Rotation:** rotate whenever a reviewer leaves or the credential is suspected of leaking. Update the worker secret, share the new credential out of band.

Cloudflare Access (email PIN) remains the documented fallback if the reviewer group grows beyond Vasso + Marilyn. See `cloudflare-setup-runbook.md` Part 5 Option A.

## Form submissions by environment

Both application and inquiry forms POST to the same Google Apps Script endpoint (and the same Google Sheet). Two columns tag each row:

- `form_source` — attribution tag. Comes from the hidden `form_source` input in the HTML: `application-form`, `inquiry-form`, `inquiry_coaching`, `inquiry_connecting`, `inquiry_consulting`. Preserves intent / channel.
- `form_source_env` — environment tag. Computed at submit time in `js/form-submit.js` from `window.location.hostname`: `production`, `staging`, `local`, or the raw hostname for unknown environments.

Both columns are independent. To see only live submissions, filter `form_source_env = production`. To see only application forms (across envs), filter `form_source = application-form`.

Local `python -m http.server 3456` submissions are tagged `form_source_env = local` and can be ignored in live reports.

## Rollback

From most to least disruptive.

1. **Cloudflare Pages deploy rollback.** Dashboard → the Pages project → Deployments → prior deployment → "Rollback to this deployment". Reverts production in one click.
2. **Git revert + push.** `git revert <commit> && git push origin main`. Takes the next deploy cycle (~30 seconds on Cloudflare Pages).
3. **Detach custom domain.** Dashboard → Pages → Custom domains → remove `cargonomics.com.vn`. Last resort.
4. **Nameserver revert at registrar.** Ultimate rollback to pre-cutover state. See `cloudflare-setup-runbook.md` Rollback ladder.

## Verification after any push

```bash
# Sanity check the deploy
curl -I https://cargonomics.com.vn/
curl -I https://cargonomics.com.vn/about
curl -I https://cargonomics.com.vn/course
curl -I https://cargonomics.com.vn/contact

# Staging should require auth
curl -I https://staging.cargonomics-site.pages.dev/
# Expect 401

# Staging should emit noindex once authenticated
curl -I -u user:pass https://staging.cargonomics-site.pages.dev/
# Expect 200 with X-Robots-Tag: noindex, nofollow
```

## Related documents

- `cloudflare-setup-runbook.md` (one-time Cloudflare setup steps)
- `gsc-setup.md` (Google Search Console property)
- `docs/prds/PRD_16_Dev_Live_Environments.md` (PRD this workflow implements)
