# Google Search Console Setup

Reference doc for verifying the `cargonomics.com.vn` property and keeping it healthy.

## Verification

**Method:** Domain property (DNS TXT via Cloudflare). Chosen over HTML tag because DNS verification is hosting-agnostic. The property survives the WordPress migration without re-verification.

1. Go to https://search.google.com/search-console.
2. **Add property** → **Domain** (not URL prefix).
3. Enter `cargonomics.com.vn`. Google will show a `google-site-verification=...` TXT record.
4. In Cloudflare → DNS → add a TXT record for `@` with the provided value. Proxy status: DNS only (grey cloud, TXT records are always DNS-only).
5. Wait 60 seconds for propagation. Click verify in GSC.

## Sitemap

1. GSC → the property → **Sitemaps** (left nav under "Indexing").
2. **Add a new sitemap** → enter `sitemap.xml`.
3. Submit. Expected status: **Success**, discovered URLs: 4.

## Access

- **Vasso:** property owner (full access).
- **Marilyn:** add as property owner once the property is verified. Use `marilyn.leong@cargonomics.com.vn`.
- **Elias or Sophia:** add as "full user" (read + some write) if they request visibility. Default: not added.

## Staging must never be verified

The staging preview at `<branch>.cargonomics-site.pages.dev` is covered by three independent crawl blockers:

1. Worker Basic Auth gates any anonymous request (returns 401).
2. Cloudflare Transform Rule appends `X-Robots-Tag: noindex, nofollow` to every response from `*.pages.dev`.
3. If either of the above fails, Cloudflare Pages `_headers` in the repo is the fallback.

Even with all three in place, DO NOT add the staging hostname as a GSC property. A verified property tells Google the content is intentionally ours; staging is intentionally not.

## Monthly check cadence

At the start of each month, open GSC and scan:

- **Coverage / Pages** — any new "Not indexed" entries? Most are valid (404s, redirects, canonical to another URL). Investigate anything marked "Discovered, currently not indexed" that is a real target URL.
- **Sitemaps** — still showing Success. If Discovered < Submitted, investigate.
- **Performance** — top queries, top pages, top countries. Cargonomics' primary audience is Vietnam; a sharp drop in VN traffic is a signal.
- **Enhancements** — Core Web Vitals, mobile usability. Flag anything amber or red.

## Related documents

- `cloudflare-setup-runbook.md` Part 8 (initial setup steps)
- `deploy-workflow.md` (environment separation)
- `docs/prds/PRD_17_SEO_Fundamentals.md` (the PRD this implements)
