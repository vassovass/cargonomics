# Cloudflare Setup Runbook

Internal runbook for standing up Cloudflare DNS + Cloudflare Pages for cargonomics.com.vn.

Covers PRD 15 (DNS Cutover) and PRD 16 (Dev/Live Environments) execution.

**Before starting:** make sure you know where the domain is currently registered and have a way to reach whoever can change nameservers at that registrar (this is Marilyn's route, per the April 14 conversation).

---

## Part 0: Pre-swap baseline capture

Run this BEFORE creating the Cloudflare zone. The point is to capture the current, authoritative DNS state so it can be diffed against the new Cloudflare zone before the nameserver swap. Paste the outputs inline below so the runbook becomes self-contained.

```bash
# Authoritative NS + SOA
dig cargonomics.com.vn NS +trace
dig cargonomics.com.vn SOA +short

# Email: MX + SPF + DKIM + DMARC
dig cargonomics.com.vn MX +short
dig cargonomics.com.vn TXT +short | grep -E 'spf1|dmarc'
dig selector1._domainkey.cargonomics.com.vn CNAME +short
dig selector2._domainkey.cargonomics.com.vn CNAME +short
dig _dmarc.cargonomics.com.vn TXT +short

# Outlook auto-discovery
dig autodiscover.cargonomics.com.vn CNAME +short

# Any other A/CNAME you know about
dig cargonomics.com.vn A +short
dig www.cargonomics.com.vn A +short
```

**Baseline captured (paste outputs here before the swap):**

```
[to be filled in by Vasso at zone-creation time]
```

Cross-reference this against the M365 Admin Center → Domains → DNS records view. Anything in M365 that does NOT appear in the `dig` outputs is a record that Cloudflare's auto-scan will miss (low-TTL, private, or provider-specific). Add those manually during Part 1 step 5.

---

## Part 1: Create Cloudflare account + zone

1. Sign in at https://dash.cloudflare.com (or create a free account if needed). One account is fine for all Cargonomics work; no need for an enterprise plan at this stage.
2. Click **Add a site** (top right or "Websites" section).
3. Enter `cargonomics.com.vn`. Pick the **Free** plan.
4. Cloudflare will scan for existing DNS records. Wait for the scan to complete.
5. **Review every imported record.** The scan catches publicly-resolvable records but can miss low-TTL or provider-specific ones.

### Records that MUST survive

| Record | Why | Where to verify |
|---|---|---|
| `@` MX | Microsoft 365 inbound mail | M365 Admin Center → Domains → cargonomics.com.vn → DNS records |
| `@` TXT `v=spf1 ...` | SPF, stops spoofing | Same place, SPF record |
| `selector1._domainkey` CNAME | DKIM signing | M365 DKIM settings |
| `selector2._domainkey` CNAME | DKIM signing (rotation) | Same |
| `_dmarc` TXT | DMARC policy | If currently set |
| `autodiscover` CNAME | Outlook autodiscovery | M365 Domain settings |
| Any service CNAMEs/As | E.g. if there's a subdomain pointing somewhere | Current registrar's DNS panel |

**If any record is missing from the Cloudflare import, add it manually before the nameserver swap.** Use the values from the Microsoft 365 Admin Center (Settings → Domains → cargonomics.com.vn → DNS records view) as source of truth.

6. **Copy the two Cloudflare nameservers** Cloudflare assigns. They look like `alex.ns.cloudflare.com` and `lisa.ns.cloudflare.com` (the names are randomised per account). These go into the DNS pack (see `06-client-comms/dns-pack-2026-04-14.md`).

---

## Part 2: Create Cloudflare Pages project

1. In the Cloudflare dashboard, go to **Workers & Pages** (left nav).
2. Click **Create application** → **Pages** → **Connect to Git**.
3. Authenticate with GitHub. Grant access to the `vassovass/cargonomics` repository (not the parent CRM Consultancy repo).
4. Select `vassovass/cargonomics`. Project name: `cargonomics-site` (stable, all future references use this).
5. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave blank)
   - **Build output directory:** `/` (root of the repo)
   - **Environment variables:** none needed
6. Click **Save and Deploy**. First build should finish in under a minute since there's nothing to compile.
7. Confirm the site loads at `<project>.pages.dev` (the default URL).

### Production branch settings

- **Production branch:** `main` (default, leave as-is)
- **Preview branches:** `All non-production branches` (so `staging`, feature branches, etc. auto-deploy)

---

## Part 3: Attach the custom domain

**Note:** this step requires the nameserver swap from Part 1 to have propagated. If NS is still pending at the registrar, skip to Part 4 first and come back.

1. Pages project → **Custom domains** tab → **Set up a custom domain**.
2. Enter `cargonomics.com.vn`. Cloudflare will auto-add the necessary CNAME/AAAA records to the zone.
3. Repeat for `www.cargonomics.com.vn`.
4. SSL provisioning takes a few minutes. Wait for the green tick.
5. In Cloudflare DNS tab: set up a redirect from `www` → apex if not auto-handled. The simplest way is a **Page Rule** or **Redirect Rule**:
   - If URL matches `www.cargonomics.com.vn/*` → Static redirect to `https://cargonomics.com.vn/$1`, 301.

---

## Part 4: Staging branch + preview deploys

1. In the sub-repo locally: `git checkout -b staging && git push -u origin staging`.
2. Cloudflare Pages will auto-build the new branch. The preview URL is `staging.<project>.pages.dev` (or similar depending on account; check the deployment page).
3. Note the exact hostname pattern for the staging preview. You'll scope the auth gate to it.

---

## Part 5: Gate the staging URL

**Recommended path: Pages Functions middleware with Basic Auth.** Decided 2026-04-16 on the grounds of zero friction for Marilyn. Single shared credential, one prompt per browser session (not per page), no email round-trip per review. Cloudflare Access is the documented fallback if a larger reviewer group is added later.

**Important:** the original plan called for a standalone Cloudflare Worker bound to a route like `staging.<project>.pages.dev/*`. **That does not work.** Worker routes require a Cloudflare-hosted DNS zone; `*.pages.dev` is Cloudflare's shared zone, not customer-controlled. The correct path on Pages is a Functions middleware file (`functions/_middleware.js`) inside the repo. See Option B below.

### Option A: Cloudflare Access (fallback, wider reviewer group)

1. Go to **Zero Trust** dashboard (https://one.dash.cloudflare.com).
2. Create a Team Name if you haven't already. Free plan allows up to 50 users.
3. **Access → Applications → Add an application** → **Self-hosted**.
4. Application domain: the staging preview hostname (e.g., `staging.<project>.pages.dev`). Use wildcard if the hostname varies per commit.
5. **Add a policy:**
   - Policy name: `Allow Cargonomics reviewers`
   - Action: Allow
   - Include: Emails → `marilyn.leong@cargonomics.com.vn`, `<vasso's email>`
   - Session duration: 24 hours (less friction than default)
6. Save. Visit the staging URL in an incognito window to confirm the email PIN login appears.

### Option B: Pages Functions middleware with Basic Auth (RECOMMENDED for this project)

Runs on every request to the Pages project. Self-disables on production (env var gate) so only preview URLs get the prompt.

1. Add `functions/_middleware.js` to the repo:

   ```js
   export const onRequest = async ({ request, env, next }) => {
     if (!env.BASIC_PASS) return next();  // unset on production, skip gate
     const auth = request.headers.get("Authorization");
     const expected = "Basic " + btoa(`${env.BASIC_USER}:${env.BASIC_PASS}`);
     if (auth !== expected) {
       return new Response("Authentication required", {
         status: 401,
         headers: { "WWW-Authenticate": 'Basic realm="Cargonomics Staging"' },
       });
     }
     return next();
   };
   ```

2. Commit and push to `main`. Cloudflare Pages auto-detects `functions/` and wires the middleware on the next build.
3. In Cloudflare dashboard: Pages project → **Settings → Environment variables**.
4. Under **Preview** environment only: add encrypted vars `BASIC_USER` and `BASIC_PASS`. Leave the Production environment's vars unset.
5. Test:
   - `curl -I https://cargonomics-site.pages.dev/` → expect 200 (production, no auth).
   - `curl -I https://<any-preview>.cargonomics-site.pages.dev/` → expect 401.
   - `curl -I -u user:pass https://<any-preview>.cargonomics-site.pages.dev/` → expect 200.

Browser UX: the user sees one Basic Auth prompt at the first request. Credentials are cached in the browser credential store for the session. No per-page re-prompt. Clearing browser data (or closing the browser, depending on OS / browser) clears the cached creds.

Document the choice in PRD 16's Changelog. If both are tried, delete the one you're not using.

---

## Part 6: Headers and crawl rules

The repo's `_headers` file handles all the necessary edge headers.

1. Hostname-scoped rule at the top of `_headers`:
   ```
   https://:project.pages.dev/*
     X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
     Cache-Control: private, no-store
   ```
   This applies to every `*.pages.dev` request (production preview URL and all branch previews). The production custom domain (once attached) never matches this pattern.
2. Global security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) apply to all hostnames.
3. **Do NOT try to create a Transform Rule** for `X-Robots-Tag` on `*.pages.dev`. Transform Rules require a customer-controlled Cloudflare zone; `*.pages.dev` is Cloudflare's shared zone and is not customer-controlled. `_headers` is the correct path for Pages.

Verify:
- `curl -I https://cargonomics-site.pages.dev/` → includes `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`
- `curl -I https://cargonomics.com.vn/` (once custom domain is attached) → no `X-Robots-Tag` header, production indexable
- Combined with the Basic Auth middleware (Part 5), any request to `*.pages.dev` either returns 401 (unauthenticated) or 200 with the noindex header (authenticated)

---

## Part 7: 301 from old GitHub Pages URL

GitHub Pages does not issue native HTTP 301s. Two options:

### Simple: `jekyll-redirect-from` + front-matter

The old content at `vassovass.github.io/cargonomics/` can be replaced with a single `index.html` + `_config.yml` that issues a meta-refresh redirect. This is lower quality than a 301 but works.

### Preferred: Delete the old repo content and let GitHub Pages serve a single redirect page

Replace the content of `vassovass/cargonomics` on `main` with:

- `_config.yml` containing `plugins: [jekyll-redirect-from]`
- `index.html` (or `index.md`) with front-matter `redirect_to: https://cargonomics.com.vn/`
- Similar redirect files for `about.html`, `course.html`, `contact.html` each pointing to the apex equivalents.

Keep the repo live but archival. Add a README line stating the site has moved and pointing to the new apex.

---

## Part 8: Google Search Console

1. https://search.google.com/search-console → Add property → Domain property (DNS TXT verification).
2. Cloudflare DNS tab → add the Google-provided TXT record.
3. Click verify in GSC.
4. **Property → Sitemaps → Add a new sitemap** → `https://cargonomics.com.vn/sitemap.xml` → Submit.
5. Wait 24-48 hours for first crawl. Check Coverage tab.

Do NOT verify staging in GSC. Ever.

---

## Verification Pack

Run this after the nameserver swap + initial Pages deploy has had time to propagate. See PRD 16 verification checklist for the full list. Quick pack:

```bash
# Nameservers
dig cargonomics.com.vn NS +short

# Email preservation
dig cargonomics.com.vn MX +short
dig cargonomics.com.vn TXT +short | grep spf1
dig selector1._domainkey.cargonomics.com.vn CNAME +short
dig selector2._domainkey.cargonomics.com.vn CNAME +short
dig autodiscover.cargonomics.com.vn CNAME +short
dig _dmarc.cargonomics.com.vn TXT +short

# Apex + www
curl -I https://cargonomics.com.vn
curl -I https://www.cargonomics.com.vn

# Old URL redirects
curl -I https://vassovass.github.io/cargonomics/

# Robots + sitemap
curl https://cargonomics.com.vn/robots.txt
curl https://cargonomics.com.vn/sitemap.xml

# Staging auth gate + noindex
curl -I https://<branch>.<project>.pages.dev   # expect 401/302 without auth
curl -I -u user:pass https://<branch>.<project>.pages.dev   # if Basic Auth; expect 200 + X-Robots-Tag
```

---

## Rollback

### Rollback ladder (least to most disruptive)

1. **Cloudflare Pages deploy rollback.** Dashboard → the Pages project → Deployments → prior deployment → "Rollback to this deployment". Reverts production to the previous commit's build in a single click. Use this for anything that is a code regression, not an infrastructure problem.

2. **Cloudflare Pages custom-domain detach.** Dashboard → Pages → Custom domains → remove `cargonomics.com.vn`. Apex stops serving from Pages immediately. DNS still points at Cloudflare; site returns a placeholder 404. Use only when a code rollback is not enough and you need apex off Pages entirely.

3. **Cloudflare DNS record disable.** DNS tab → toggle the proxied A/CNAME record for apex to "DNS only" (grey cloud) or delete it entirely. Traffic stops resolving to Pages. Email records unaffected.

4. **Nameserver revert at registrar.** Registrar panel → switch nameservers back to the pre-Cloudflare values captured in Part 0's baseline. Propagation back is same-day for most resolvers, up to 24 hours for stubborn ones. Cloudflare zone stays intact, email continues to work via the old DNS. Last resort. Fix the problem in Cloudflare, re-swap when ready.

### Secondary backup

- GitHub Pages URL at `vassovass.github.io/cargonomics/` is still live throughout the cutover. If apex goes dark, share the GitHub Pages URL with Marilyn for the time it takes to fix. The 301 redirect from old URL to apex (Part 7) is a ONE-WAY canonicalisation; keep the source content in place until DNS is green for at least 72 hours.

---

## Estimated Time

- Parts 1-2: 15-20 minutes
- Part 3: 5 minutes (after NS propagates)
- Parts 4-5: 15-20 minutes
- Part 6: 10 minutes
- Part 7: 15-30 minutes (depends on whether we archive the old repo or not)
- Part 8: 10 minutes + 24-48h for first crawl

Total active work: ~90 minutes. Total elapsed including propagation: 24-48 hours.
