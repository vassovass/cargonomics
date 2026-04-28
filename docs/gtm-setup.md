# GTM & Analytics Setup

## Container

- **GTM Container ID:** `GTM-NCG2LPNQ`
- **GA4 Property:** Configured inside GTM (no separate GA4 snippet on the page). Measurement ID stored in the `GA4 Measurement ID` GTM constant variable.
- **Deployment:** GTM snippet in `<head>` + `<noscript>` fallback after `<body>` on all 4 pages

## Hostname filtering — GA4 fires on production only

GTM published version 3 (2026-04-28) added a blocking trigger so GA4 only fires on the live hostnames. This stops staging clicks, GitHub Pages mirror traffic, branch previews, and local dev from polluting GA4.

- **Blocking trigger:** `Block GA4 - Non-Production Hostname` (ID 32). Type: Custom Event with event name regex `.*` (catches every event, including the implicit `gtm.js` page-view event). Filter: `Page Hostname` not equal to `cargonomics.com.vn` AND not equal to `www.cargonomics.com.vn`.
- **Applied as exception on all 4 GA4 tags:** GA4 - Configuration (31), GA4 Event - CTA Click (14), GA4 Event - Attribution Loaded (26), GA4 Event - Form Submit (29).
- **Allowlist-prod, not blocklist-staging.** Anything other than the two production hostnames is excluded automatically. New preview environments (e.g. branch previews on `*.cargonomics-site.pages.dev`, `vassovass.github.io`, `cargonomics-site.pages.dev` bare URL) need no further config.
- **Negation pattern in the API:** GTM v2 API has no `notEquals` filter type. The blocking trigger uses `equals` with `{type: "boolean", key: "negate", value: "true"}` as a third parameter. UI shows it as "does not equal".

To verify a change to this filter:

1. GTM → workspace → Preview, point at `https://staging.cargonomics-site.pages.dev/`. All 4 GA4 tags must appear under Tags Not Fired with reason "Blocked by Block GA4 - Non-Production Hostname".
2. Browser DevTools Network tab on staging — filter for `google-analytics.com`. Zero hits.
3. GA4 Realtime — staging activity must not show up.
4. Same checks on `cargonomics.com.vn` post-DNS cutover; tags MUST fire there.

If the production domain ever changes (e.g. to a new TLD), update the two `Page Hostname` values in trigger 32 and republish.

## Internal team opt-out — cookie-based block on prod hostnames

GTM published version 4 (2026-04-28) added a second blocking layer for known team / Marilyn / partner traffic on the live hostname. The hostname filter (trigger 32) doesn't catch these visits because they hit `cargonomics.com.vn` like any other visitor.

**How it works:**

- **Variable:** `Cookie - cgn_internal` (ID 33). 1st-party cookie, returns the cookie value or `undefined` if not set.
- **Blocking trigger:** `Block GA4 - Internal Opt-Out Cookie` (ID 34). Type: Custom Event with `.*` regex. Filter: `Cookie - cgn_internal` equals `1`. Applied as a second exception alongside trigger 32 on all 4 GA4 tags. Either condition blocks GA4.
- **Companion site code:** inline script in the `<head>` of `index.html`, `about.html`, `course.html`, `contact.html`, `apply.html`, placed before the GTM snippet so the cookie is set before any tag fires. Reads `?internal=1` from URL → sets `cgn_internal=1; max-age=31536000; SameSite=Lax; Secure` cookie with `domain=.cargonomics.com.vn` on prod (so it covers both `cargonomics.com.vn` and `www.cargonomics.com.vn`). `?internal=0` clears the cookie. The URL parameter is intentionally retained after handling so users can bookmark the opt-out link via Ctrl+D / Cmd+D; clicking the bookmark again later overwrites the cookie with a fresh 1-year `max-age`, effectively renewing the opt-out indefinitely as long as the user occasionally re-visits via the bookmark. Reload-while-on-the-page just re-sets the same cookie (idempotent, no harm).

**Distribute to the team — INTERNAL REVIEWERS ONLY:**

1. Send `https://www.cargonomics.com.vn/?internal=1` to anyone whose hits should not count in real-visitor stats: Marilyn, Vasso, Elias, Anthony Tay if he reviews pages, Lisa, Anne Hill staff who look at the site, future internal team members.
2. **Never send to partners, applicants, prospective students, clients, or include in marketing materials / email signatures / social posts / ads / public-facing pages.** Partner referral traffic is something we explicitly want to track — opting them out defeats the point. If the link leaks externally, real visitors who click it stop counting for ~1 year and we lose visibility on traffic we actually want to measure.
3. Each person opens the URL once on every browser/device they use to visit the site (laptop Chrome, laptop Safari, phone, work machine).
4. Recommend they bookmark the URL with `?internal=1` via Ctrl+D / Cmd+D. Clicking the bookmark again at any time overwrites the cookie with a fresh 1-year `max-age`, effectively renewing the opt-out and recovering from cookie-clear events in one click.
5. Confirmation: open DevTools Console after the visit. Should see `[Cargonomics] Internal traffic opt-out ENABLED on this browser. GA4 tracking is now disabled here for ~1 year.`
6. They can verify it took by visiting any page and checking that there's no `_ga` activity (DevTools → Network filter `google-analytics.com` → empty).
7. To opt back in: visit `https://www.cargonomics.com.vn/?internal=0`.

**Limitations:**

- **Per-browser, per-device.** Clearing site cookies undoes it. Incognito sessions are unaffected (incognito has no cookies). Different browser on same machine = separate opt-out. Phone vs laptop = separate opt-out.
- **Not a privacy tool.** This is for keeping internal hits out of GA4, not for protecting personal data. The cookie itself is just a flag.
- **Doesn't prevent server-side GA traffic** (the site has none) or extension-based tracking pixels (the site has none).

**Recommended pairing with GA4 Internal Traffic IP filter** (set up in GA4 Admin, not GTM): for the Cargonomics office WiFi, define the public IP under Admin → Data Streams → Configure Tag Settings → Show all → Define Internal Traffic, then activate the built-in "Internal Traffic" data filter. This catches everyone on the office network without per-browser setup. The cookie covers home / mobile / VPN / partner machines.

## Architecture

```
Page Load
  -> dataLayer.push({ page_type, page_title, brand })
  -> GTM container loads (async)
  -> GTM fires GA4 pageview tag
  -> analytics.js initializes CTA click listener

User clicks a CTA
  -> analytics.js reads data-track attributes
  -> dataLayer.push({ event: 'cta_click', cta_type, cta_location, cta_destination, cta_text, cta_url })
  -> GTM fires GA4 event tag

User submits a form
  -> form-submit.js calls CargoAnalytics.trackFormSubmit()
  -> dataLayer.push({ event: 'form_submit', form_name, form_location })
  -> GTM fires GA4 event tag
```

## dataLayer Initialization

Every page pushes initial data before GTM loads:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'page_type': 'home',       // home | about | course | contact
  'page_title': document.title,
  'brand': 'cargonomics'     // cargonomics | flexed
});
```

## CTA Tracking Data Attributes

### Required Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-track="cta"` | Marks element for auto-tracking | Always `"cta"` |
| `data-cta-type` | Action category | `apply`, `inquire`, `learn-more`, `contact`, `download`, `social` |
| `data-cta-location` | Page section where CTA appears | `hero`, `nav`, `pillar-coach`, `pillar-connect`, `pillar-consult`, `programs`, `footer`, `sidebar`, `sticky-bar`, `why-us`, `journey`, `leadership` |
| `data-cta-destination` | Where the CTA leads | `contact-form`, `course-page`, `about-page`, `external`, `phone`, `email`, `whatsapp`, `zalo` |

### Allowed Values

**data-cta-type:**
- `apply` : Application-related CTAs ("Apply Now", "Submit Your Application")
- `inquire` : Inquiry buttons ("Inquire", "Ask a Question")
- `learn-more` : Content discovery ("Explore Programs", "Explore the Programme")
- `contact` : General contact actions ("Get in Touch", "Contact Us")
- `download` : File downloads (brochures, PDFs)
- `social` : Social media links (Zalo, WhatsApp, Facebook, LinkedIn)

**data-cta-location:**
- `hero` : Hero/header section
- `nav` : Navigation bar
- `pillar-coach` : Coaching pillar section
- `pillar-connect` : Connecting pillar section
- `pillar-consult` : Consulting pillar section
- `programs` : Programs/courses section
- `footer` : Footer area
- `sidebar` : Sidebar elements
- `sticky-bar` : Mobile sticky promotion bar
- `why-us` : Why Us / About CTA section
- `journey` : How It Works / Journey section
- `leadership` : Leadership/team section
- `modal` : Desktop popup modal
- `contact-info` : Contact information section
- `application-form` : Application form section
- `inquiry-form` : Inquiry form section
- `course-cta-mid` : Mid-page CTA on course page
- `course-cta-bottom` : Bottom CTA on course page

**data-cta-destination:**
- `contact-form` : Links to contact.html or form section
- `course-page` : Links to course.html
- `about-page` : Links to about.html
- `external` : External links (social media profiles)
- `phone` : Phone number links
- `email` : Email links
- `whatsapp` : WhatsApp chat links
- `zalo` : Zalo chat links
- `form-submit` : Form submit buttons

### Example Markup

```html
<!-- Hero Apply button -->
<a href="contact.html" class="btn btn--outline"
   data-track="cta"
   data-cta-type="apply"
   data-cta-location="hero"
   data-cta-destination="contact-form">Apply Now</a>

<!-- Footer social link -->
<a href="#" class="footer__social-link" aria-label="Follow us on LinkedIn"
   data-track="cta"
   data-cta-type="social"
   data-cta-location="footer"
   data-cta-destination="external">...</a>

<!-- Form submit button -->
<button type="submit" class="form__submit"
   data-track="form"
   data-cta-type="apply"
   data-cta-location="application-form"
   data-cta-destination="form-submit">Submit Application</button>
```

## How to Add New Tracked CTAs

1. Add `data-track="cta"` to the element
2. Add `data-cta-type` with the appropriate action category
3. Add `data-cta-location` describing the page section
4. Add `data-cta-destination` describing where the CTA leads
5. No JavaScript changes needed. The click listener in `analytics.js` auto-detects new elements.

## GTM Trigger Configuration

To fire a GA4 event tag on CTA clicks:

1. Create a **Click - All Elements** trigger in GTM
2. Set condition: **Click Element** matches CSS selector `[data-track="cta"]`
3. Create a GA4 Event tag with event name `cta_click`
4. Map dataLayer variables to GA4 event parameters:
   - `cta_type` -> custom dimension
   - `cta_location` -> custom dimension
   - `cta_destination` -> custom dimension
   - `cta_text` -> event parameter
   - `cta_url` -> event parameter

For form submissions, create a **Custom Event** trigger matching event name `form_submit`.

## GA4 Custom Dimensions

Create these custom dimensions in GA4 Admin > Custom definitions:

| Dimension Name | Scope | Event Parameter |
|---------------|-------|-----------------|
| CTA Type | Event | `cta_type` |
| CTA Location | Event | `cta_location` |
| CTA Destination | Event | `cta_destination` |
| Form Name | Event | `form_name` |
| Form Location | Event | `form_location` |

## dataLayer Event Reference

| Event | Source | Parameters |
|-------|--------|------------|
| `cta_click` | Auto-tracked by `analytics.js` | `cta_type`, `cta_location`, `cta_destination`, `cta_text`, `cta_url` |
| `form_submit` | Called by form handler via `CargoAnalytics.trackFormSubmit()` | `form_name`, `form_location` |

## WordPress / Elementor Migration Notes

When migrating to WordPress with Elementor:

- The GTM Container ID (`GTM-NCG2LPNQ`) stays the same
- Install a GTM plugin (e.g., "GTM4WP" or "Insert Headers and Footers") to add the GTM snippet site-wide
- Data attributes are added via **Elementor Pro Custom Attributes** on each widget (Advanced tab > Custom Attributes)
- Format in Elementor: `data-track|cta` (pipe-separated key|value)
- The `analytics.js` logic can be enqueued as a WordPress script or moved into a GTM Custom HTML tag
- The `page_type` in the dataLayer can be set dynamically using WordPress conditional tags or GTM's built-in Page Path variable

## Container Import File

**File:** `docs/GTM-NCG2LPNQ_cargonomics_v2.json`

This is a ready-to-import GTM container that includes everything above. To import:

1. Open [Google Tag Manager](https://tagmanager.google.com/)
2. Go to **Admin** > **Import Container**
3. Click **Choose container file** and select `GTM-NCG2LPNQ_cargonomics_v2.json`
4. Choose **Default Workspace**
5. Select **Overwrite** (replaces the empty container with full setup)
6. Click **Confirm**
7. **After import:** Update the `GA4 Measurement ID` variable with your real ID (format: `G-XXXXXXXXXX`)
8. **Preview** using GTM Preview mode to verify all tags fire correctly
9. **Publish** the container

### What the import includes

| Category | Count | Items |
|----------|-------|-------|
| **Folders** | 5 | GA4 Core, CTA Tracking, Form Tracking, Attribution/UTM, Site Variables |
| **Variables** | 17 | GA4 Measurement ID (constant), page_type, 5 CTA params, 2 form params, 8 UTM/attribution params |
| **Triggers** | 3 | CE - cta_click, CE - form_submit, CE - attribution_loaded |
| **Tags** | 4 | GA4 Configuration (all pages), GA4 Event CTA Click, GA4 Event Form Submit, GA4 Event Attribution Loaded |
| **Built-in Variables** | 19 | Page URL/Hostname/Path, Referrer, Event, Click (Element/Classes/ID/Target/URL/Text), Form (Element/Classes/ID/URL/Text), Scroll Depth (Threshold/Units/Direction) |

### Template reuse for other sites

To use this container as a template for Flexed or other AHEG sites:

1. Export this container from GTM (Admin > Export Container)
2. In the new GTM container, import the exported file using **Merge**
3. Update the `GA4 Measurement ID` variable with the new site's ID
4. The `brand` field in the dataLayer is set per-page, so no GTM changes needed for multi-brand
5. All triggers and event tags work automatically if the site uses the same data-track attribute convention

### WordPress form plugin compatibility

When migrating to WordPress, forms may use plugins (WPForms, Gravity Forms, Contact Form 7, Elementor Forms). To maintain tracking:

1. Add a Custom Event trigger in GTM for the plugin's submission event (most plugins push to dataLayer)
2. Or add a generic Form Submission trigger with CSS selector matching the form ID
3. Map the plugin's field names to the same GA4 event parameters (form_name, form_location)
4. The CTA tracking framework works independently of the form plugin

## Files

| File | Purpose |
|------|---------|
| `js/analytics.js` | CTA click listener, form tracking helper, dataLayer utility |
| `docs/GTM-NCG2LPNQ_cargonomics_v2.json` | GTM container import file (tags, triggers, variables) |
| `docs/google-apps-script.js` | Google Apps Script form backend (copy to Apps Script editor) |
| All HTML pages | GTM `<head>` snippet, `<noscript>` fallback, `data-track` attributes on CTAs |
| This file (`docs/gtm-setup.md`) | Configuration reference and template documentation |
