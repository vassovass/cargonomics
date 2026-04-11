# Visual & UX Audit Report — Cargonomics Website

**Date:** April 11, 2026
**Auditor:** Claude (Opus 4.6)
**Site:** https://vassovass.github.io/cargonomics/
**Pages audited:** Homepage, About, Course, Contact
**Source files:** PDF full-page captures (desktop viewport)
**Benchmark:** Coursera-style modern ed-tech / training platform
**Target audience:** Vietnamese logistics graduates (21-25), mobile-first, comparing against Coursera/Udemy/university sites

---

## Severity Key

| Rating | Meaning |
|---|---|
| **CRITICAL** | Breaks trust or looks unfinished to a visitor. Fix before any client review. |
| **MAJOR** | Noticeable UX or visual problem. Fix before handoff. |
| **MINOR** | Polish issue. Fix when time allows. |
| **ENHANCEMENT** | Not broken, but the Coursera-level benchmark demands it. Post-MVP. |

---

## Executive Summary: Top 10 Priorities

| # | Issue | Page | Severity | Section |
|---|---|---|---|---|
| 1 | IMAGE REVIEW MODE banner visible across the top of the live site | Homepage | CRITICAL | Nav bar area |
| 2 | Image filename indicators ("hero-2.jpg (2/3)") exposed throughout | Homepage | CRITICAL | Every image |
| 3 | About page is a wall of text with empty right half of the viewport | About | MAJOR | About intro |
| 4 | Leadership cards have wildly unequal heights, creating dead space | About | MAJOR | Leadership section |
| 5 | Partner placeholder ("Industry Expert" + initials "IE") looks unfinished | Home + About | MAJOR | Leadership/Trainers |
| 6 | Course page has zero images anywhere on the entire page | Course | MAJOR | Entire page |
| 7 | Two redundant CTA sections stacked at the bottom of the Course page | Course | MAJOR | Bottom CTAs |
| 8 | "Downloadable brochure coming soon" placeholder text is visible | Course | MAJOR | Below quick-facts |
| 9 | No hero image on About or Course pages (text-only headers) | About + Course | MAJOR | Page headers |
| 10 | Floating Zalo/WA buttons overlap body content on right edge | All pages | MINOR | Right edge, mid-page |

---

## Page 1: Homepage

**Source:** `C:\Users\vasso\Downloads\Cargonomics Home Page.pdf`

### Section-by-Section Analysis

#### 1.1 — Navigation Bar
**Location:** Top of page, sticky

- **MINOR — Logo + tagline feel small.** The Cargonomics logo and "Coaching, Connecting, Consulting" tagline sit at the far left and are quite compact compared to the generous whitespace in the centre of the nav bar. On Coursera, the logo is larger with clear visual weight.
- **MINOR — "Apply Now" CTA blends with nav.** The gold "Apply Now" button in the top right is the right idea, but its muted gold-on-white styling at small size doesn't pop enough against the navigation links. Consider increasing size or contrast.

#### 1.2 — IMAGE REVIEW MODE Banner
**Location:** Full-width yellow bar directly below navigation

- **CRITICAL — Development tool visible on the live site.** A bright yellow banner reads "IMAGE REVIEW MODE: Click any image to cycle through options. Note the filename of your preferred choice." This is a development/review feature that is visible to every visitor. It must be disabled or hidden before any client viewing.

#### 1.3 — Hero Section
**Location:** Below banner, first viewport

- **CRITICAL — Image filename indicator visible.** Text "hero-2.jpg (2/3)" appears overlaid at the bottom of the hero image. Visitors see this.
- **MINOR — Hero image (warehouse interior) is generic.** A yellow-toned warehouse with shelving. It works contextually but doesn't convey "career opportunity for young graduates." Coursera heroes tend to show people (students, professionals) rather than infrastructure. This aligns with Marilyn's April 8 feedback about wanting better imagery.
- **MINOR — Hero text is very large Orbitron.** The heading "Break into shipping & logistics, trained by the people who built the industry." spans roughly 7 lines in the Orbitron display font. The font weight and size make it dominant, but the line height feels tight for such large text, reducing readability at a glance.
- **ENHANCEMENT — No social proof in the hero.** Coursera shows enrollment counts, star ratings, and university logos in the hero zone. Here, the hero is purely a value proposition with no evidence. Even a single line like "300+ conference attendees | 1,000+ industry connections" above the CTAs would add credibility.

#### 1.4 — Coach / Connect / Consult Section
**Location:** Below hero, "WHAT WE DO"

- **MAJOR — "Inquire" button inconsistency.** Coach has an "Inquire" button. Connect has NO button. Consult has an "Inquire" button. This looks like a bug, not a design choice. Either all three need a CTA or none do.
- **CRITICAL — Image filename indicators visible.** "coach-1.jpg (1/3)", "connect-1.jpg (1/3)", "consult-1.jpg (1/3)" all display on the images.
- **MINOR — Section is very long.** The alternating image-text layout (image left/text right, then text left/image right) creates a section that spans roughly 3 full viewports of scrolling. This is a lot of scroll distance for three items. Coursera uses compact horizontal cards for similar content.
- **ENHANCEMENT — No icons.** Each pillar is identified only by number (01, 02, 03) and text. A simple icon per pillar would improve scannability.

#### 1.5 — "Where Shipping Careers Begin" Banner
**Location:** Full-width navy section

- **MINOR — Feels disconnected.** This full-width navy banner with large Orbitron text ("Where Shipping Careers Begin") serves as a section divider, but it's unclear what it's introducing. It sits between the Coach/Connect/Consult section and the Programs section. The phrase is evocative but doesn't guide the user. On Coursera, section transitions use clear labels like "Popular Courses" or "What You'll Learn."

#### 1.6 — Programs & Courses Section
**Location:** Below the banner

- **MINOR — "Applications Open: May 2026" date.** If the current date is April 11, this is fine, but it needs to be updated once applications actually open or close. Static dates on websites age poorly.
- **MINOR — WYDLS card is visually dominant but text-heavy.** The main bootcamp card has a "FREE: NO TUITION" badge overlaid and lots of body text. The two cards below (Professional Development, Corporate Training) are much shorter. This creates a visual imbalance.
- **ENHANCEMENT — No imagery in course cards.** Coursera course cards always have a thumbnail image, institution logo, rating, and enrollment count. Here the cards are text-only with gold borders.

#### 1.7 — "WYDLS Bootcamp: What You'll Learn" Section
**Location:** Below Programs

- **MAJOR — Curriculum icons are very small and hard to read.** Six circular/rounded items are arranged horizontally. Each has a small number, a title, and description text. At desktop viewport, these items are tiny and the text within them is difficult to read. The numbering (01-06) with titles like "Logistics & Shipping Landscape" wraps awkwardly.
- **MINOR — Reading order is confusing.** The items appear to flow in a non-obvious pattern. A simple numbered vertical list or 2x3 grid would be clearer.

#### 1.8 — "How It Works" Section
**Location:** Below curriculum

- **MINOR — Good layout, minor text density.** The 4-step process (Apply, Get Selected, Train, Get Placed) with numbered steps and a port photo is well-structured. The image on the right adds visual interest. This is one of the strongest sections on the page.
- **ENHANCEMENT — Steps could use icons.** Each step is just a number and text. Simple icons (clipboard, checkmark, graduation cap, handshake) would make the process more scannable.

#### 1.9 — Stats Bar
**Location:** Full-width gold bar

- **MINOR — "Inaugural conference at The Reverie Saigon, November 2025" subtitle.** This is a specific historical reference that may not mean anything to a Vietnamese graduate. The stats themselves (50+ years, 1,000+ connections, 300+ attendees, HCMC location) are good social proof. Consider whether the conference footnote adds or distracts.

#### 1.10 — Vietnam: A Rising Logistics Powerhouse
**Location:** Below stats bar

- **MINOR — Image is generic stock.** The Vietnam section image shows a port/crane scene. This is fine but very standard. The text content is good and contextual.

#### 1.11 — Learn from Industry Veterans
**Location:** Near bottom

- **MAJOR — Partner placeholder card.** The second trainer card shows only "Industry Expert" as the name, "Co-Founder & Senior Trainer" as the title, and a placeholder image with just the initials "IE" on a navy background. This immediately signals "unfinished website" to any visitor. Either populate this with real data or remove the card entirely until the partner's details are confirmed.
- **MINOR — Unequal card content.** Elias's card has a real photo and substantive bio. The partner card has a brief 2-line description. The visual imbalance draws attention to what's missing.

#### 1.12 — Footer
**Location:** Bottom

- **MINOR — Footer is clean and functional.** Four-column layout with logo, links, and contact info. "Vietnamese language version available on request" is a nice touch. Social icons (Zalo, Facebook, LinkedIn) are present.
- **MINOR — "Events" link in the Company column.** There's currently no Events page. This link may 404 or go nowhere.

#### 1.13 — Floating Buttons (Zalo + WhatsApp)
**Location:** Right edge, mid-page, floating

- **MINOR — Buttons overlap body content.** The circular Zalo (green) and WhatsApp (blue "WA") buttons float on the right edge and can overlap text or images depending on viewport width. On narrower desktops or tablets, this becomes more of a problem.

---

## Page 2: About Page

**Source:** `C:\Users\vasso\Downloads\Cargonomics about.pdf`

### Section-by-Section Analysis

#### 2.1 — Page Header / About Intro
**Location:** Top of page, below nav

- **MAJOR — Wall of text with empty right side.** The "About Cargonomics" section is 5 dense paragraphs of body text in a narrow left-aligned column. The entire right half of the viewport is completely empty white space. This is the most visually unbalanced section on the entire site. A visitor scanning quickly would see a document, not a web page.
  - **Coursera comparison:** Coursera's About page uses large hero imagery, pull quotes, stats counters, team photo grids, and mission statements with visual hierarchy. The Cargonomics About intro reads like a Word document pasted into a browser.
  - **Recommendation (for future fix):** Break the text into 2-3 short sections with images, stats, or pull quotes alongside. Or use a 2-column layout with a hero image/photo collage on the right.

- **MINOR — No hero image.** Unlike the Homepage which has a warehouse photo hero, the About page opens directly with text. No visual hook to establish context. A photo of the Cargonomics team, the office, or Elias teaching would add immediate visual interest.

- **MINOR — "Visit us:" address line at the bottom of the intro.** This is useful information but feels buried at the end of a text block. It could be styled as a distinct contact card or CTA.

#### 2.2 — Three Pillars of Impact
**Location:** Below intro, 3-column section

- **MINOR — Dense text blocks in narrow columns.** Each pillar (Coaching, Connecting, Consulting) has a gold Orbitron heading ("Train. Assess. Place." etc.) followed by a full paragraph of body text. In a 3-column layout, these paragraphs wrap to 8-10 lines of small text per column. This is hard to scan.
  - **Coursera comparison:** Coursera uses short 1-2 sentence descriptions with icons for similar feature lists.
- **ENHANCEMENT — No icons or images.** Each pillar is differentiated only by the number (01, 02, 03) and the heading text. Icons would significantly improve scannability.
- **MINOR — The "gold heading" font (Orbitron) used for the sub-headings ("Train. Assess. Place.") is effective** but the periods after each word create a staccato feel. This is a deliberate brand choice and works for the premium tone.

#### 2.3 — Leadership Section
**Location:** Below pillars, "OUR TEAM"

- **MAJOR — Unequal card heights create large dead space.** Elias's card has a photo, name, long title, and a multi-paragraph biography (roughly 8-10 lines). The Partner's card has a photo, name, short title, and a 2-line description. The result is that the right card ends roughly halfway down the section, leaving a large empty white rectangle beneath it. This is the "blank space on the right" that Vasso flagged.
  - **Fix options:** (1) Equalize card heights with a min-height. (2) Add more content to the partner card. (3) Use a different layout (e.g., full-width stacked cards). (4) Remove the partner card until real bio is available.

- **MAJOR — Partner placeholder.** "Industry Expert" as a name and the generic description are clearly placeholder content. On the Homepage, this person shows as initials "IE" on a navy background. On the About page, their photo appears to be a slide/presentation screenshot with the Cargonomics logo rather than a headshot. This looks unprofessional and unfinished.

- **MINOR — Elias's photo is a candid presentation shot.** It shows him presenting to a room with a slide behind him. This is authentic but the image quality and framing look like a conference photo rather than a professional headshot. Coursera instructor profiles typically use clean headshots with neutral backgrounds.

#### 2.4 — CTA Section
**Location:** Bottom, above footer

- **MINOR — Good CTA.** "Ready to Start Your Career in Shipping?" on a navy background with a gold "Explore the Programme" button. Clean, direct, appropriate.
- **MINOR — The spacing above and below this section is very generous.** There's a lot of empty space between the Leadership section and this CTA. It feels like a gap rather than intentional breathing room.

#### 2.5 — Footer
- Same as Homepage. No page-specific issues.

---

## Page 3: Course Page

**Source:** `C:\Users\vasso\Downloads\Cargonomics Course.pdf`

### Section-by-Section Analysis

#### 3.1 — Page Header
**Location:** Top of page, below nav

- **MAJOR — No hero image.** The Course page opens with "FLAGSHIP PROGRAM" label and "What You Didn't Learn at School" heading on a plain white background. No image, no visual context, no colour. Compare to Coursera course pages which have a course thumbnail, instructor photo, enrollment stats, and a video preview all in the header zone.
  - This page is about an intensive, exciting bootcamp. It should feel dynamic and energising. The current header feels like a document title.

- **MINOR — Subtitle text is good but could be styled with more impact.** "A 5-day intensive shipping and logistics bootcamp designed for ambitious graduates ready to launch their careers. Industry-sponsored, highly selective, and built around the real skills that employers need." This is strong copy but it's rendered as a standard paragraph under the heading with no visual differentiation.

#### 3.2 — Quick Facts Bar
**Location:** Below header text

- **MINOR — Well-designed.** Four items (Start Date, Duration, Investment, Location) with gold left-borders. Scannable, informative, compact. This is one of the best-designed elements on the site.
- **ENHANCEMENT — Could add "Cohort Size" or "Applications" count** for social proof. E.g., "25 spots" or "142 applications received."

#### 3.3 — Description Paragraphs
**Location:** Below quick facts

- **MAJOR — "Downloadable brochure coming soon."** This placeholder text is visible on the live site. It signals incompleteness. Either remove it or replace with an actual download link when ready.
- **MINOR — Two long paragraphs of body text.** Again, text-heavy with no images or visual breaks. The content is good (explaining the selection-based model and corporate sponsorship) but the presentation is plain.

#### 3.4 — Curriculum: What You'll Learn
**Location:** 6 module cards in 2x3 grid

- **MINOR — Cards are functional but plain.** Each module card has a "MODULE 0X" label, a title, and a description paragraph. They have gold left-borders (odd modules) and what appears to be a different colour for even modules.
- **ENHANCEMENT — No icons or images.** Six text-only cards in a grid. Coursera uses topic icons, completion indicators, and time estimates. Even simple line icons for each topic (ship, warehouse, handshake, document, gavel, graduation cap) would improve scannability.
- **MINOR — Module 06 card ("Ethics & Career Paths") appears to have a slightly different background colour.** It looks slightly purple/mauve compared to the white of the other cards. If intentional, it's not clear why. If unintentional, it's a styling inconsistency.

#### 3.5 — Eligibility: Who Should Apply
**Location:** Below curriculum

- **MINOR — Good 2-column layout.** Left column has intro text, right column has a bullet list of requirements. The bullets are clear and actionable. The callout box at the bottom ("We review every application individually...") reinforces the exclusivity/vetting message.
- **ENHANCEMENT — Could be styled as a checklist** with checkmarks instead of bullets, giving applicants a sense of self-qualification.

#### 3.6 — Program Structure: Bootcamp Schedule
**Location:** Below eligibility

- **MINOR — Functional 2x2 + 1 grid.** Days 1-4 in a 2x2 grid, Day 5 spanning full width. Each card has a "DAY X" label, title, and description. The layout works.
- **MINOR — Day cards could have more visual differentiation.** All cards look identical except for the day number. Different icons or subtle colour coding per day would help.
- **MINOR — Small text note at the bottom.** "The Q2 2026 cohort begins June 1, 2026. Schedule subject to confirmation." This is fine but the text is very small.

#### 3.7 — Bottom CTA Sections (THE "LONG FOOTER" ISSUE)
**Location:** Bottom of page, above actual footer

- **MAJOR — Two redundant CTA sections stacked back-to-back.** This is the "definite looking-weird situation" Vasso flagged:
  1. First CTA: "Apply for the Q2 2026 Cohort" on a navy background with a gold "Submit Your Application" button.
  2. Second CTA: "Limited Spots Available" on a white background with a gold "Apply Now" button.
  
  Both sections say essentially the same thing: apply now. Having them stacked creates a long, repetitive tail to the page that feels like the designer wasn't sure which CTA to use, so they included both. This makes the page feel longer than it needs to be and dilutes the urgency.
  - **Recommendation:** Merge into a single strong CTA section. Use the navy background version with the scarcity message incorporated.

#### 3.8 — Overall Course Page Assessment

- **MAJOR — Zero images on the entire page.** The Course page has no photographs, illustrations, or visual media of any kind (except the logo in the nav/footer). For a page selling an intensive, hands-on, in-person bootcamp with a dock visit on Day 5, this is a significant missed opportunity. Even 2-3 images (classroom training, port facility, graduates/students) would transform the page.
  - **Coursera comparison:** Every Coursera course page has at minimum an instructor photo, a course thumbnail, and often a video preview.

---

## Page 4: Contact Page

**Source:** `C:\Users\vasso\Downloads\Cargonomics Contact Page.pdf`

### Section-by-Section Analysis

#### 4.1 — Page Header
**Location:** Top of page, below nav

- **MINOR — Clean header.** "Start Your Career in Shipping" heading with subtitle text about the application review process. A gold badge reads "Limited spots available for the Q2 2026 cohort." This is well-designed and sets the right tone.
- **ENHANCEMENT — No hero image.** Same issue as About and Course pages, though for a Contact/Form page, text-only headers are more acceptable.

#### 4.2 — Bootcamp Application Form
**Location:** Main content area

- **MINOR — Form layout is clean and functional.** Sections are clearly labelled: Personal Information, Qualification, Additional Information. Each field has a label, input, and helper text. The Orbitron headings ("PERSONAL INFORMATION", "QUALIFICATION") are distinctive.
- **MINOR — Form width is narrow.** The form sits in a narrow centred column (roughly 40% of viewport width on desktop). There's significant whitespace on both sides. This isn't wrong, but it makes the page feel sparse.
- **ENHANCEMENT — No progress indicator.** For a multi-section form, a simple step indicator (Step 1 of 3, or dots) would help users understand the form's length. Coursera enrollment forms use multi-step flows with progress bars.
- **MINOR — Dropdown fields show "Select an option" with no indication of choices.** For "Are you available for the bootcamp dates?", "Can you commit to the full week?", and "What is your current work schedule?" the placeholder text is "Select an option" which doesn't preview what the options are. Clarifying (e.g., "Yes / No / Not sure") in the label would reduce cognitive load.
- **MINOR — The "Submit Application" button is styled correctly** (gold background, navy text, Orbitron font) and is prominent enough.

#### 4.3 — General Inquiry Form
**Location:** Below the Application form

- **MINOR — No visual separation from the Application form.** The transition from Application form to General Inquiry form relies on a heading change and some whitespace. Users scrolling quickly might not realise they've moved to a different form.
  - **Enhancement:** Use a different background colour for the Inquiry section (e.g., the warm stone card background from the token system, `#F0EDE8`) to visually separate the two forms.
- **MINOR — The Inquiry form is shorter (4 fields)** but given its secondary importance, it receives nearly equal visual weight to the Application form. Consider making the Application form more prominent (larger, bordered, highlighted) relative to the Inquiry form.
- **ENHANCEMENT — Tab-based switching instead of stacking.** Rather than placing both forms on one long page, a tab interface ("Apply" / "General Inquiry") would reduce page length and let users self-select their intent immediately.

#### 4.4 — Contact Info Bar
**Location:** Below forms, above footer

- **MINOR — Clean 3-column layout.** Office address, email, and messaging apps (Zalo, WhatsApp). Functional and well-organised.
- **ENHANCEMENT — Could add a small map embed** or link to Google Maps for the office address.

#### 4.5 — Overall Contact Page Assessment

- **MINOR — Page is long due to two full forms stacked.** The total scroll distance is significant. For a Vietnamese graduate on a mobile phone, scrolling past the Application form to find the Inquiry form is a lot of distance.
- **MINOR — No social proof near the form.** A small testimonial, stat, or reassurance near the "Submit Application" button (e.g., "Join 300+ industry professionals in our network") would increase conversion confidence.

---

## Cross-Page Issues

These issues affect multiple pages or the site as a whole.

### C.1 — Mobile Viewport (not directly tested in these captures)
**Severity: MAJOR (assessment based on responsive design principles)**

The PDF captures appear to be desktop viewport. Key mobile concerns:
- The Orbitron headings are very large and may overflow or wrap awkwardly on small screens.
- The 3-column layouts (Three Pillars, footer) need to stack properly.
- The floating Zalo/WA buttons may overlap critical content on 375px viewports.
- The image review mode banner would be even more obtrusive on mobile.
- Forms need to be full-width on mobile for thumb-friendly input.

**Recommendation:** Capture mobile (375px) screenshots of all 4 pages and add to this audit.

### C.2 — Coursera Benchmark Gap Analysis

| Attribute | Coursera | Cargonomics | Gap |
|---|---|---|---|
| Hero imagery | Course thumbnail + instructor photo + video | Text-only on 3 of 4 pages | Large |
| Social proof | Star ratings, enrollment counts, reviews | Stats bar on homepage only | Large |
| Instructor profiles | Clean headshots, credentials, ratings | Presentation candids, placeholder partner | Medium |
| Course cards | Thumbnail, institution, rating, duration | Text-only with gold borders | Medium |
| Progress/structure | Module count, time estimates, completion % | Module cards without progress context | Medium |
| CTA clarity | One clear "Enroll" button per page | Multiple redundant CTAs (Course page) | Medium |
| Visual density | Generous whitespace, card-based | Text-heavy paragraphs, document-feel | Large |
| Icons/illustrations | Consistent icon system | None | Large |
| Interactivity | Video previews, expandable modules | Static text | Large (post-MVP) |

### C.3 — Brand Token Application
**Severity: MINOR**

The Navy Blue (#11294B) and Gold (#D4B468) palette is well-applied across the site. The Orbitron + Open Sans font pairing is distinctive. However:
- The gold colour can appear muted on some sections (e.g., the nav "Apply Now" button).
- The secondary palette colours (Teal, Orange, Lime, Grey from the R2 brand guide) are almost entirely unused. Using these for accent elements (icons, module card borders, section backgrounds) would add visual variety.

### C.4 — Content Placeholder Issues
**Severity: MAJOR (aggregated)**

Multiple placeholder/unfinished elements are visible:
1. IMAGE REVIEW MODE banner (Homepage)
2. Image filename indicators (Homepage, all images)
3. "Industry Expert" partner name (Homepage + About)
4. "IE" initials as partner photo (Homepage)
5. Presentation screenshot as partner photo (About)
6. "Downloadable brochure coming soon" (Course)
7. "Events" nav link potentially pointing nowhere (Footer, all pages)

These collectively create an impression of an unfinished site. They are the highest-priority fixes.

### C.5 — Page Length / Scroll Depth
**Severity: MINOR**

All four pages are long-scrolling. The Homepage is the longest (hero, Coach/Connect/Consult, banner, programs, curriculum, How It Works, stats, Vietnam section, trainers, footer = roughly 12-15 viewport heights of content). For a Vietnamese graduate on a budget Android phone with a smaller screen, this is a LOT of scrolling.

Coursera solves this with:
- Anchor links / table of contents at the top
- Collapsible/expandable sections
- Tab-based content switching

These are post-MVP enhancements but worth noting.

---

## Target Audience Perspective

**Persona:** Nguyen Minh, 22, logistics graduate from HCMC University, browsing on a Xiaomi phone via mobile data. He found Cargonomics through a Zalo group share.

**What Minh would think:**

1. **Homepage:** "The hero looks professional, but what's this yellow bar? And the file names on the images? Is this a test site?" Trust reduced immediately by the dev indicators.

2. **About page:** "So much text. I'm scrolling past it. Oh, the trainers section, that guy looks legit but who's the other one? 'Industry Expert'? That's not a real name." The wall of text would be skipped entirely on mobile.

3. **Course page:** "Good info about the modules and schedule, but no photos of the actual training? No pictures of the dock visit? I want to see what I'm signing up for." Zero images on a bootcamp page is a significant trust gap for a visual-first generation.

4. **Contact page:** "The form is clear enough. But which option do I pick? What are the dropdown choices? And why is there a second form below? I just want to apply." Form friction from unclear dropdowns and the two-form stack.

**Key insight:** This audience lives on Instagram, TikTok, and Zalo. They judge quality and trust within 3 seconds. The site's text-heavy approach, placeholder content, and dev artifacts would lose many visitors before they reach the form.

---

## Recommended Fix Priority

### Before client review (this weekend):
1. Disable IMAGE REVIEW MODE banner and filename indicators
2. Hide or remove partner placeholder cards (or populate with real data)
3. Remove "Downloadable brochure coming soon" text
4. Merge the two bottom CTA sections on the Course page into one

### Before Tuesday April 14 handoff:
5. Add at least one image to the Course page (classroom, port, students)
6. Break up the About page intro text (add image, stats, or 2-column layout)
7. Equalize Leadership card heights or restructure the layout
8. Verify all footer links work (especially "Events")
9. Check mobile viewport for all 4 pages

### Post-MVP enhancements (for Marilyn's next review):
10. Add icons to Coach/Connect/Consult section
11. Add icons to curriculum module cards
12. Add social proof near forms (stat, testimonial)
13. Consider tab-based form switching on Contact page
14. Add hero images to About and Course page headers
15. Introduce secondary palette colours for visual variety

---

## Screenshot Reference Index

| Page | Source File |
|---|---|
| Homepage (full-page desktop) | `C:\Users\vasso\Downloads\Cargonomics Home Page.pdf` |
| About (full-page desktop) | `C:\Users\vasso\Downloads\Cargonomics about.pdf` |
| Course (full-page desktop) | `C:\Users\vasso\Downloads\Cargonomics Course.pdf` |
| Contact (full-page desktop) | `C:\Users\vasso\Downloads\Cargonomics Contact Page.pdf` |
| Mobile captures | Not yet captured (flagged in C.1) |

---

*Report generated April 11, 2026. No code changes made. Audit only.*
