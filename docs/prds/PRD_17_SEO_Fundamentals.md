# PRD 17: SEO Fundamentals

> **Order:** 17
> **Status:** Proposed
> **Type:** Feature / SEO
> **Dependencies:** PRD 15 (DNS Cutover), PRD 16 (Dev/Live Environments)
> **Blocks:** None
> **Sprint:** 5 (Infrastructure)
> **Created:** 2026-04-14

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct the
> research items below, and generate 3 core + 2 stretch proactive items. Report findings to the
> user before beginning any WRITE phases.

---

## Why This Matters

The MVP already has canonical URLs, Open Graph tags, Twitter cards, meta descriptions, and EducationalOrganization schema on the homepage (verified in `index.html` at execution time). What it lacks is the ground-layer SEO infrastructure that makes a production site discoverable: a `robots.txt` telling crawlers what to do, a `sitemap.xml` listing the four canonical URLs, and consistent canonical/OG/meta coverage on the About, Course, and Contact pages.

Without `robots.txt` and `sitemap.xml`, Google will eventually crawl the site but with no priority signals, no sitemap hints, and no explicit invitation to index. Adding these on Day 1 at the new apex domain costs nothing and shortens the discovery window. At the same time, the staging environment (PRD 16) must carry its own `robots.txt` (or header rule) that disallows everything, layered on top of the `X-Robots-Tag` header and the auth gate.

This is the "once and done" SEO layer. It doesn't attempt to rank anything, it just makes the site legible to crawlers when and only when we want it to be.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `index.html` has canonical (`cargonomics.com.vn`), OG, Twitter Card, meta description, EducationalOrganization schema | Need to verify About, Course, Contact match |
| No `robots.txt` | Crawlers get no directive; default is permissive but implicit |
| No `sitemap.xml` | No discovery aid for Googlebot |
| No OG image confirmed to exist at `img/og-image.jpg` | 404 on social shares means broken preview cards |
| No Google Search Console verification | No way to monitor indexing, submit sitemap, or catch issues |

---

## Desired Outcomes

### Section A: Production Crawl Layer -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Production `robots.txt`** | No crawl directive | `User-agent: *` + `Allow: /` + `Sitemap: https://cargonomics.com.vn/sitemap.xml`. Served at `/robots.txt` on apex. | None |
| A-2 | **Production `sitemap.xml`** | No discovery aid | Lists the 4 canonical URLs (apex, `/about`, `/course`, `/contact`) with `lastmod`, served at `/sitemap.xml` | Confirm URL pattern (trailing slash vs `.html` vs clean URL). Prefer canonical-matching URLs. |

### Section B: Staging Crawl Lockout -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **Staging has a `robots.txt` Disallow + `X-Robots-Tag` header (from PRD 16)** | Staging might leak into search results | Authenticated request to staging `/robots.txt` returns `User-agent: *` + `Disallow: /`. Response headers include `X-Robots-Tag: noindex, nofollow`. | Cloudflare Pages `_headers` hostname-scoped rule syntax |

### Section C: Per-Page SEO Consistency -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **About, Course, Contact pages each have canonical + OG + Twitter + meta description matching the homepage pattern** | Social shares and canonical signals inconsistent | `grep 'rel="canonical"'`, `grep 'og:'`, `grep 'meta name="description"'` on each HTML file returns matching structure with page-appropriate values | None (pattern exists in `index.html`) |
| C-2 | **OG image file exists and loads at `img/og-image.jpg`** | Broken social preview | `curl -I https://cargonomics.com.vn/img/og-image.jpg` returns 200; LinkedIn/WhatsApp/Twitter preview card renders | Confirm current OG image asset |

### Section D: Discoverability -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| D-1 | **Google Search Console verified for `cargonomics.com.vn` apex, sitemap submitted** | No visibility into indexing | Property shows verified in GSC; sitemap shows "Success" status; coverage report accessible | Verification method: DNS TXT (Cloudflare) or HTML tag |

---

## What This PRD Does NOT Cover

- Content SEO (headings, internal linking, keyword targeting) — that's part of content work with Marilyn
- Schema for About / Course / Contact pages beyond what already exists — add opportunistically if proactive-items surface it
- Rich results / FAQ schema / VideoObject — future scope
- Staging in GSC (explicitly excluded — staging must not be verified there)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `robots.txt` (repo root) | CREATE | Production version (allow all + sitemap link) |
| `sitemap.xml` (repo root) | CREATE | Production sitemap with 4 URLs |
| `_headers` (repo root) | MODIFY | Add hostname-scoped `X-Robots-Tag` for staging if not already in PRD 16 |
| `about.html` | MODIFY if needed | Ensure canonical, OG, Twitter, meta description |
| `course.html` | MODIFY if needed | Same |
| `contact.html` | MODIFY if needed | Same |
| `img/og-image.jpg` | VERIFY | Confirm exists, 1200x630, under 1MB |
| `docs/infra/gsc-setup.md` | CREATE | Short note on how GSC is verified and who has access |

---

## Agent Context

| File | Purpose |
|------|---------|
| `index.html` | Reference pattern for canonical/OG/Twitter/schema |
| `docs/prds/PRD_09_Image_Logo_Integration.md` | Image integration context, OG image provenance |
| `.claude/plans/glowing-chasing-flamingo.md` | Architecture plan |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read index.html head block. Grep about.html, course.html, contact.html for canonical/OG/meta. Verify og-image.jpg exists. Generate 3 core + 2 stretch proactive items. |
| 2 | `[WRITE]` `[PARALLEL]` | Create `robots.txt`. Create `sitemap.xml` with 4 canonical URLs. |
| 3 | `[WRITE]` `[SEQUENTIAL]` | Fix any gaps in about/course/contact head blocks. No refactor of existing working tags. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | If og-image.jpg is missing, generate or source one (1200x630, brand-aligned). Commit. |
| 5 | `[READ-ONLY]` | Commit, push to staging. Verify staging serves Disallow robots.txt + noindex header. |
| 6 | `[WRITE]` `[SEQUENTIAL]` | Promote to main. Verify production serves Allow robots.txt + no noindex header. |
| 7 | `[WRITE]` `[SEQUENTIAL]` | Add site to Google Search Console. Verify via Cloudflare DNS TXT. Submit sitemap. Write gsc-setup.md. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | URL pattern on Pages | Does Cloudflare Pages serve `/about`, `/about/`, or `/about.html`? Pick the canonical one, make it consistent in sitemap, internal links, and `rel="canonical"`. | Mismatch creates duplicate-URL risk |
| R-2 | Existing og-image.jpg | Does the file exist in `img/`? What dimensions? | Broken social shares if missing |
| R-3 | Search Console verification method | DNS TXT via Cloudflare is cleaner than HTML tag (permanent, no page edit) | Choose the one least likely to break on WP migration |
| R-4 | Current canonical values on all 4 pages | Some may point to github.io or be missing | Must all point to cargonomics.com.vn equivalents |
| R-5 | Schema.org coverage beyond homepage | Does about.html have Organization? Does course.html have Course schema? | Opportunistic: flag as proactive items, don't expand scope here |

---

## Proactive Items

| # | Type | Item | Description | Trigger |
|---|------|------|-------------|---------|
| 1 | Core | Clean URL scheme across the site | Dropped `.html` from canonicals, `og:url`, sitemap URLs, and internal `<a href>` links across all four live pages. `_redirects` 301s any `.html` inbound. Matches WordPress permalink patterns and reduces churn at migration. Decision logged 2026-04-16. | Every internal navigation |
| 2 | Core | `Course` schema enhanced with `endDate`, `inLanguage`, `educationalLevel`, `offers` | `course.html` JSON-LD now covers the full run: `startDate: 2026-06-01`, `endDate: 2026-06-04`, `educationalLevel: Professional`, `inLanguage: en`, and an `Offer` with `price: 0`, `priceCurrency: VND`, `availability: LimitedAvailability`. Rich results eligible; unblocks Course cards in Google. | Every GSC crawl |
| 3 | Core | `Organization` schema on about.html enriched with `logo`, `sameAs`, `foundingLocation` | Adds logo URL (for Knowledge Panel), `sameAs` (Zalo + WhatsApp), and `foundingLocation` (HCMC). Knowledge Panel eligibility improves for "Cargonomics" brand queries. Preserves existing founder block. | Every GSC crawl |
| -- | -- | --- Stretch below --- | | |
| 4 | Stretch | Bing Webmaster Tools + IndexNow | Bing powers DuckDuckGo, Ecosia, and a rising share of ChatGPT web search citations. Five-minute setup via import from Google Search Console. Flagged for follow-up; not shipped this session. | Post-GSC verification |
| 5 | Stretch | `hreflang` tag (en-VN) and future Vietnamese translation scaffold | Current site is English-primary with the footer noting Vietnamese version on request. Adding `<link rel="alternate" hreflang="en-VN">` signals regional intent. Sets up cleanly for a future `/vi/` subtree. Not urgent; flagged. | When translation lands or sooner |

---

## Modularity & WordPress Readiness

- [ ] `robots.txt` and `sitemap.xml` will transfer verbatim to WordPress (Yoast/RankMath can replace but the current versions are a valid floor)
- [ ] Canonical URLs use cargonomics.com.vn so the WordPress migration does not rewrite them
- [ ] GSC verification via DNS TXT survives hosting changes (no HTML tag bound to static HTML)

---

## Design & Code Quality

- [ ] `sitemap.xml` validates against the sitemap schema (no malformed XML)
- [ ] `robots.txt` is plain text, UTF-8, no BOM
- [ ] All canonical URLs match the apex + path pattern used in internal links
- [ ] No canonical points to `vassovass.github.io/cargonomics/` (that's the OLD URL)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| `robots.txt` served on production | No | Yes | `curl https://cargonomics.com.vn/robots.txt` |
| `sitemap.xml` served on production | No | Yes | `curl https://cargonomics.com.vn/sitemap.xml` validates |
| Staging `/robots.txt` disallows all | No | Yes | Authenticated `curl` returns Disallow: / |
| All 4 pages have canonical + OG + Twitter + description | 1 of 4 confirmed | 4 of 4 | Grep across HTML files |
| OG image loads | Unknown | 200 OK | `curl -I https://cargonomics.com.vn/img/og-image.jpg` |
| GSC verified + sitemap submitted | No | Yes | GSC dashboard shows verified + sitemap "Success" |
| Social preview card renders | Unknown | Yes | Share URL in WhatsApp or LinkedIn Post Inspector |

---

## Verification Checklist

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| Production robots.txt | `curl https://cargonomics.com.vn/robots.txt` | Text with `User-agent: *`, `Allow: /`, `Sitemap:` line |
| Production sitemap.xml | `curl https://cargonomics.com.vn/sitemap.xml` | Valid XML with 4 `<url>` entries |
| Staging robots.txt | Authenticated `curl` | `User-agent: *`, `Disallow: /` |
| Staging X-Robots-Tag header | `curl -I` with auth | `X-Robots-Tag: noindex, nofollow` |
| Canonical on all pages | `grep 'rel="canonical"' *.html` | 4 matches, all pointing to cargonomics.com.vn |
| OG image loads | `curl -I .../img/og-image.jpg` | 200 |
| Facebook/LinkedIn card | Post URL Debugger / Inspector tool | Preview card renders correctly |
| GSC verification | GSC dashboard | Verified, sitemap submitted, coverage visible |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Sitemap URL format doesn't match actual serving pattern | Crawl errors in GSC | Medium | Confirm URL pattern during phase 1 (R-1); test with one URL before finalising |
| OG image missing or wrong size | Broken social shares | Medium | Verify in phase 1 before other work; regenerate with Nano Banana if needed at 1200x630 |
| Staging robots.txt accidentally deployed to production | Google blocks real site | Low | `_headers` rule is hostname-scoped; sanity-check after deploy via `curl https://cargonomics.com.vn/robots.txt` |
| GSC verification breaks on WP migration | Loss of historical data | Low | Use DNS TXT verification (not HTML tag), which survives hosting changes |

---

## Related Documents

- `.claude/plans/glowing-chasing-flamingo.md`
- PRD 15 (domain must resolve)
- PRD 16 (staging must exist and be gated)
- PRD 09 (OG image provenance)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD for robots.txt, sitemap.xml, per-page SEO consistency, OG image audit, GSC verification |
