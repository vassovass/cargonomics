# PRD 15: DNS Cutover to Cloudflare

> **Order:** 15
> **Status:** Proposed
> **Type:** Ops / Infra
> **Dependencies:** PRD 13 (Final Deploy & Client Handoff)
> **Blocks:** PRD 16 (Dev/Live Environments), PRD 17 (SEO Fundamentals)
> **Sprint:** 5 (Infrastructure)
> **Created:** 2026-04-14

---

## Research-First Mandate

> Before implementing this PRD, the agent MUST complete all READ-ONLY phases, conduct the
> research items below, and generate 3 core + 2 stretch proactive items. Report findings to the
> user before beginning any WRITE phases.

---

## Why This Matters

The MVP is live on GitHub Pages at `https://vassovass.github.io/cargonomics/`. Cargonomics already owns `cargonomics.com.vn`; Marilyn is routing the registrar access through a separate transfer process. Vasso's role is not to buy or transfer the domain but to stand up Cloudflare as the DNS provider and hand a clean DNS pack to whoever currently manages the registrar so they can flip the nameservers.

The cutover has to preserve Microsoft 365 email (MX, SPF, DKIM, DMARC) and carry no downtime for the newly shipped MVP. Once nameservers point at Cloudflare, the site is served from Cloudflare Pages, HTTPS is automatic, and the foundation for dev/live separation (PRD 16) and SEO fundamentals (PRD 17) is in place. Doing this now, before WordPress migration, means the same DNS plane serves the static MVP and the future WP origin with no zone rebuild.

---

## Current State

| What Exists | Issue |
|-------------|-------|
| `cargonomics.com.vn` owned by Cargonomics, registrar TBC via Marilyn's transfer process | DNS currently served by registrar defaults or ex-employee config, not under Vasso's control |
| GitHub Pages live at `vassovass.github.io/cargonomics/` | No custom domain attached, and GitHub Pages lacks HTTP 301 redirect rules |
| Microsoft 365 in use for email | MX/TXT records must survive the nameserver swap intact |
| No Cloudflare zone for the domain | Cannot host Pages, Transform Rules, or Access policies |

---

## Desired Outcomes

### Section A: Cloudflare Zone -- 3 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| A-1 | **Cloudflare zone created for `cargonomics.com.vn`** | No DNS control plane | Zone appears in Cloudflare dashboard; two NS records issued | Confirm Cloudflare account plan (Free is sufficient for MVP) |
| A-2 | **All existing DNS records imported and verified** | Nameserver swap would otherwise break email | Cloudflare zone shows MX, SPF TXT, DKIM CNAME/TXT, DMARC TXT, any A/CNAME for existing services. Each record verified against the source of truth. | Obtain current DNS zone export from registrar or manual re-entry list |
| A-3 | **Placeholder records for Pages** | Apex + www must resolve to Pages once NS flips | `cargonomics.com.vn` A/AAAA or CNAME set for Pages; `www` CNAME to apex or to Pages | Confirm Cloudflare Pages custom domain attachment flow |

### Section B: DNS Pack -- 2 Items

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| B-1 | **DNS pack written for Marilyn's contact** | Registrar manager has no actionable instruction | Document in `06-client-comms/` with nameservers, reassurance about email preservation, propagation window, contact point | None |
| B-2 | **Pre-cutover email sanity check** | Silent MX loss is the worst failure mode | Verify MX target resolves, SPF/DKIM/DMARC records present. Send a test email before and after cutover. | None |

### Section C: Verification -- 1 Item

| # | Outcome | Problem Solved | Success Criteria | Research Needed |
|---|---------|----------------|------------------|-----------------|
| C-1 | **End-to-end DNS verification after propagation** | Swap silently failing is the risk | `dig NS`, `dig MX`, `dig A`, `curl -I` checks all pass as per plan file verification section | None |

---

## What This PRD Does NOT Cover

- Cloudflare Pages project creation and GitHub connection (PRD 16)
- Transform Rules for `X-Robots-Tag` headers (PRD 16)
- Access policies for staging (PRD 16)
- `robots.txt`, `sitemap.xml`, canonical audit (PRD 17)
- WordPress origin DNS changes (PRD 20, future)

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `06-client-comms/dns-pack-2026-04-14.md` | CREATE | Handover document for Marilyn's contact |
| `05-deliverables/website-prototype/cargonomics-site/docs/infra/cloudflare-setup-runbook.md` | CREATE | Internal runbook for Vasso executing the Cloudflare steps |
| `03-project-management/decisions-log.md` | MODIFY | Log Cloudflare as DNS provider, domain stays at current registrar |
| `03-project-management/open-questions.md` | MODIFY | Add current DNS record inventory question if registrar access is still pending |

---

## Agent Context

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Carry-over items (domain/DNS from Marilyn), Microsoft 365 note |
| `.claude/plans/glowing-chasing-flamingo.md` | Architecture plan this PRD implements |
| `06-client-comms/client-brief.md` | Communication voice for the DNS pack |

---

## Task-Optimized Structure

| Phase | Mode | Task |
|-------|------|------|
| 1 | `[READ-ONLY]` | Read plan file, CLAUDE.md, client-brief. Generate 3 core + 2 stretch proactive items. |
| 2 | `[READ-ONLY]` | Obtain current DNS inventory (from registrar access if available, or from Microsoft 365 admin for MX/SPF/DKIM/DMARC as minimum). |
| 3 | `[WRITE]` `[SEQUENTIAL]` | Create Cloudflare zone. Import/enter DNS records. Verify email records match source. |
| 4 | `[WRITE]` `[SEQUENTIAL]` | Draft DNS pack in `06-client-comms/`. No em dashes. Friendly, actionable tone. |
| 5 | `[WRITE]` `[SEQUENTIAL]` | Hand DNS pack to Marilyn. Nameserver swap happens on her timeline. |
| 6 | `[READ-ONLY]` | Post-propagation: run `dig`/`curl` verification pack. Send email test to confirm M365 intact. |

---

## Research & Verification Needed

| # | Item | What to Investigate | Why It Matters |
|---|------|---------------------|----------------|
| R-1 | Current DNS record list | Get the full current zone from registrar panel or M365 admin | Missing a record on import = broken email or service |
| R-2 | Cloudflare auto-import coverage | Cloudflare scans existing DNS when adding a zone but only what's publicly resolvable | Hidden or low-TTL records may not be caught; manual verification required |
| R-3 | Microsoft 365 DKIM selectors | DKIM uses `selector1._domainkey` and `selector2._domainkey` CNAMEs | Wrong selector = signed mail fails DKIM |
| R-4 | Registrar NS-change support | Some Vietnamese registrars require a form or support ticket | Informs what Marilyn's contact needs to do, not just where |
| R-5 | TTL lowering ahead of swap | Not strictly needed for NS change (registrar-side TTL), but safe to lower record TTLs on the old zone if possible | Faster rollback if cutover reveals a problem |

---

## Proactive Items

| # | Type | Item | Description | Trigger |
|---|------|------|-------------|---------|
| 1 | Core | Pre-swap TTL lowering ask in the DNS pack | Ask the registrar to lower `@` and `www` TTLs to 300s at least 24 hours before the nameserver change. Faster rollback if the cutover reveals a problem. Shipped in `dns-pack-2026-04-14.md` revision 2026-04-16. | DNS pack sent to Marilyn's contact |
| 2 | Core | Pre-swap DNS baseline capture in the runbook | `dig +trace` outputs for NS, SOA, MX, SPF, DKIM (both selectors), DMARC, autodiscover, apex A, www A pasted inline in the runbook before zone creation. Diff target after swap. Added as Part 0 of `cloudflare-setup-runbook.md`. | Before creating the Cloudflare zone |
| 3 | Core | Autodiscover CNAME explicit in preservation list + verification pack | Outlook auto-configuration silently breaks if autodiscover CNAME is missing after swap. Added to DNS pack "records that must survive" table and to the runbook Verification Pack dig commands. | At swap time and in post-swap verification |
| -- | -- | --- Stretch below --- | | |
| 4 | Stretch | DMARC reports mailbox | If DMARC is quarantine or reject with no `rua=` address, there is no visibility into spoofing attempts. Low cost to add, high signal over months. Not shipped this session; flagged for Marilyn conversation. | After cutover stabilises |
| 5 | Stretch | Cloudflare Email Routing for catch-all forwarding | Free with Cloudflare, gives Marilyn disposable per-campaign addresses without a new mailbox. Optional, not migration-critical. Flagged for future consideration. | Post-cutover polish |

---

## Modularity & WordPress Readiness

Not applicable. This PRD touches infrastructure only, no HTML/CSS/JS sections.

---

## Design & Code Quality

- [ ] DNS pack uses no em dashes
- [ ] All record changes documented in Cloudflare audit log (automatic)
- [ ] Email test sent from M365 before and after cutover (bonus: DMARC report check one week post-cutover)

---

## Success Criteria

| Metric | Current | Target | Verification Method |
|--------|---------|--------|---------------------|
| Cloudflare zone status | Not created | Active (NS propagated) | Cloudflare dashboard shows green status |
| M365 email functional | Yes (pre-cutover baseline) | Yes (post-cutover) | Send + receive test email |
| Apex resolves to Pages | No | Yes | `dig cargonomics.com.vn`, `curl -I https://cargonomics.com.vn` returns 200 |
| www redirects to apex | No | Yes (301) | `curl -I https://www.cargonomics.com.vn` returns 301 |
| No record omissions | N/A | All source-of-truth records present in Cloudflare | Manual diff of old zone vs new |
| DNS pack received by Marilyn | Not sent | Sent + confirmed | Email/WhatsApp reply |

---

## Verification Checklist

| Check | Command/Tool | Expected Result |
|-------|-------------|-----------------|
| NS records | `dig cargonomics.com.vn NS +short` | Two `*.ns.cloudflare.com` values |
| MX records | `dig cargonomics.com.vn MX +short` | M365 MX host, e.g. `cargonomics-com-vn.mail.protection.outlook.com` |
| SPF record | `dig cargonomics.com.vn TXT +short \| grep spf1` | `v=spf1 include:spf.protection.outlook.com -all` (or current policy) |
| DKIM selector 1 | `dig selector1._domainkey.cargonomics.com.vn CNAME +short` | M365 DKIM host |
| DMARC | `dig _dmarc.cargonomics.com.vn TXT +short` | Current policy preserved |
| Apex HTTP | `curl -I https://cargonomics.com.vn` | 200, HTTPS, Cloudflare headers |
| www HTTP | `curl -I https://www.cargonomics.com.vn` | 301 to apex |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| MX record missed on import | Email down | Medium | Manual diff of old zone vs Cloudflare zone; email test pre and post cutover |
| DKIM selector missing | Outbound mail fails DKIM, lands in spam | Medium | Pull both selector1 and selector2 CNAMEs from M365 admin; re-enter in Cloudflare |
| Registrar takes days to change NS | Site stays on github.io longer | Medium | Leave GitHub Pages URL live as fallback; no user-facing impact until apex goes live |
| NS cached at old values post-swap | Split-brain where some users see old, some see new | Low | Cloudflare and registrar both auto-handle TTLs; can lower registrar-side TTL pre-swap if possible |
| Nameserver swap reveals forgotten records (a forgotten A record for a CRM subdomain, old Wix CNAME, etc.) | Some legacy service breaks | Low | Cloudflare import attempts to catch publicly-resolvable records; audit registrar panel manually before swap |

---

## Related Documents

- `.claude/plans/glowing-chasing-flamingo.md` (architecture plan)
- `CLAUDE.md` (Microsoft 365 note, carry-over items)
- PRD 16 (depends on Cloudflare zone existing)
- PRD 17 (depends on apex resolving to Pages so robots.txt and sitemap.xml serve)

---

## Changelog

| Date | Section | Change |
|------|---------|--------|
| 2026-04-14 | Initial | Created PRD for Cloudflare zone + DNS pack + verification |
