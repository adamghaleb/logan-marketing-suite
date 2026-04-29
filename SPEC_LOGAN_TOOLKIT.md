# SPEC: Logan Marketing Toolkit for Emily

> Paste this into Claude Code at the root of an empty repo (or a subfolder of an existing one) and run. Claude Code should execute autonomously without asking for clarification — assumptions are baked in, defaults are reasonable, and anything ambiguous defaults to "build the simpler version, document the assumption."

---

## Context

**Who:** Emily is a designer interviewing for (and likely starting) a junior designer role at **Logan Marketing**, a small WordPress + Elementor marketing agency that builds 18–22 hospitality sites per year (bed & breakfasts, inns, boutique hotels, ranches, vacation rentals, spas).

**Logan Marketing's workflow:**

1. Lead designer designs in **Figma**, then builds three things in Elementor: a home page, a "room page" (single-suite/property-page template), and an "inside template" (a generic content page that doubles as a styled component library — H1/H2/H3, body, two-column layouts, image+text, pull quotes, CTAs, gallery patterns, testimonial blocks).
2. **Junior designer** (Emily's role) fills in the rest of the website: about, things to do, area attractions, photo gallery, blog, additional content pages — using the component library on the inside template. Two weeks per site, then handoff to PM.
3. **Project manager** runs to-do lists, tracks delivery, fields client review.

**Stack:**

- WordPress (latest)
- Elementor (Free + Pro), with **Flexbox Containers** (default since 2023, NOT legacy Sections/Columns)
- Theme Builder for headers/footers/templates
- Typical integrations: ResNexus (booking), Google Maps, Mailchimp / Constant Contact (newsletter), Yoast/Rank Math (SEO)
- Hosting varies by client; Logan likely manages hosting credentials centrally

**Emily's constraints:**

- New to Elementor specifically (knows design fundamentals, may have other CMS experience like Squarespace/Webflow)
- New to WordPress conventions
- New to hospitality vertical
- Will be ramping while shipping — not a long onboarding period
- Junior role — should NOT redesign systems; should master the existing one

**Reference clients:** Sprucedale Ranch (sprucedaleranch.com), The Whalers Inn (whalersinnmystic.com), Bottger Mansion (bottger.com), Inn at Gothic Eves (gothiceves.loganmarketing.com — the inside template is at /page-template/).

---

## Goal

Build a **Logan Marketing Toolkit** — a self-contained folder of skills, reference docs, templates, tools, and onboarding materials that:

1. Gets Emily productive in week 1
2. Gives her self-service answers to common questions in weeks 2–4
3. Encodes Logan Marketing's specific workflow patterns so she fits in cleanly
4. Builds her toward "competent independent junior" by month 3

The toolkit lives in a single folder structure she can clone, reference daily, and grow into. Skills follow Anthropic's `SKILL.md` format so they slot into Claude Code (or Claude.ai with Skills enabled).

---

## Repository structure

Create this exact folder tree:

```
logan-marketing-toolkit/
├── README.md                              # Index + how-to-use guide
├── skills/                                # SKILL.md format, Anthropic standard
│   ├── elementor-page-build/
│   │   └── SKILL.md
│   ├── elementor-hospitality-qa/
│   │   └── SKILL.md
│   ├── elementor-figma-handoff/
│   │   └── SKILL.md
│   ├── elementor-troubleshoot/
│   │   └── SKILL.md
│   ├── hospitality-copy-polish/
│   │   └── SKILL.md
│   └── logan-pm-handoff/
│       └── SKILL.md
├── reference/                             # Quick-reference docs, scannable
│   ├── 01-elementor-fundamentals.md
│   ├── 02-containers-vs-sections.md
│   ├── 03-global-styles.md
│   ├── 04-responsive-editing.md
│   ├── 05-widget-cheatsheet.md
│   ├── 06-keyboard-shortcuts.md
│   ├── 07-image-optimization.md
│   ├── 08-hospitality-seo.md
│   ├── 09-wordpress-admin-essentials.md
│   └── 10-common-gotchas.md
├── templates/                             # Reusable text templates
│   ├── pm-handoff-message.md
│   ├── status-update.md
│   ├── self-qa-checklist.md
│   ├── pre-launch-checklist.md
│   ├── alt-text-patterns.md
│   └── meta-description-patterns.md
├── tools/                                 # LLM prompts + light scripts
│   ├── alt-text-generator.md              # LLM prompt template
│   ├── seo-meta-generator.md              # LLM prompt template
│   ├── hospitality-copy-review.md         # LLM prompt template
│   ├── image-resize.sh                    # Bash + ImageMagick batch resize
│   └── README.md                          # How to use the tools
├── onboarding/                            # Emily's ramp plan
│   ├── day-1.md
│   ├── week-1.md
│   ├── month-1.md
│   └── month-3.md
└── practice/                              # Self-driven learning
    ├── sample-client-brief.md             # Fictional B&B for practice
    ├── sample-component-library.md        # What a Logan template provides
    ├── practice-exercises.md              # Build-along scenarios
    └── self-evaluation-rubric.md          # How to grade her own work
```

---

## Build phases (priority order)

Build in this order. If context budget is tight, ship **Phase 1 complete** before starting Phase 2.

### Phase 1: MVP — Emily's first week

- `README.md`
- `skills/elementor-page-build/SKILL.md`
- `skills/elementor-hospitality-qa/SKILL.md`
- `reference/01-elementor-fundamentals.md`
- `reference/02-containers-vs-sections.md`
- `reference/03-global-styles.md`
- `reference/04-responsive-editing.md`
- `onboarding/day-1.md`
- `onboarding/week-1.md`
- `templates/self-qa-checklist.md`

### Phase 2: Expansion — weeks 2–4

- `skills/elementor-figma-handoff/SKILL.md`
- `skills/elementor-troubleshoot/SKILL.md`
- `skills/logan-pm-handoff/SKILL.md`
- `reference/05-widget-cheatsheet.md`
- `reference/06-keyboard-shortcuts.md`
- `reference/07-image-optimization.md`
- `reference/08-hospitality-seo.md`
- `reference/09-wordpress-admin-essentials.md`
- `reference/10-common-gotchas.md`
- `templates/pm-handoff-message.md`
- `templates/status-update.md`
- `templates/pre-launch-checklist.md`
- `templates/alt-text-patterns.md`
- `templates/meta-description-patterns.md`
- `tools/alt-text-generator.md`
- `tools/seo-meta-generator.md`
- `tools/image-resize.sh`
- `tools/README.md`

### Phase 3: Long-term — month 2+

- `skills/hospitality-copy-polish/SKILL.md`
- `tools/hospitality-copy-review.md`
- `onboarding/month-1.md`
- `onboarding/month-3.md`
- `practice/sample-client-brief.md`
- `practice/sample-component-library.md`
- `practice/practice-exercises.md`
- `practice/self-evaluation-rubric.md`

---

## Skill specifications

All skills follow Anthropic's SKILL.md format:

```yaml
---
name: skill-name
description: One-paragraph description of when to use this skill, including specific triggers (phrases, contexts) and clear "do NOT use this skill for X" exclusions. Critical for triggering accuracy.
---
# Skill Title

Body content as markdown. Should be operational, not academic.
```

### `elementor-page-build`

**STATUS: Already drafted.** Import the existing SKILL.md as-is. Do NOT rewrite. If file is not present in the repo, request it from the user.

Purpose: Junior designer daily workflow for filling pages from a template's component library.

### `elementor-hospitality-qa`

**STATUS: Already drafted.** Import the existing SKILL.md as-is. Do NOT rewrite. If file is not present, request it.

Purpose: Pre-handoff checklist tuned to inn/B&B/hotel sites — booking integration, brand consistency, SEO, responsive, performance, legal/accessibility, hospitality-specific patterns.

### `elementor-figma-handoff`

**Build new.**

Purpose: Translating Figma designs into Elementor builds. Reading a Figma file as a junior, knowing what to build vs. ask about.

Required content:

- Figma → Elementor mental mapping: Auto-layout = Flexbox Container; Frame variants = saved templates; color styles = Global Colors; text styles = Global Fonts; spacing tokens = padding/margin values
- How to inspect Figma without dev mode confusion (measurements, spacing, font sizes, colors)
- Breakpoint mapping: Figma frames at common widths (1920/1440/1024/768/375) → Elementor desktop/tablet/mobile responsive values
- What to ask the lead designer vs. what to figure out yourself (ambiguity vs. literal absence)
- Common translation traps: Figma's auto-layout gap vs Elementor's container gap behave differently in edge cases; Figma rendering of fonts can differ from browser rendering; image masks and effects often don't translate 1:1

Trigger: receiving a Figma file from the lead, or inspecting Figma during build.
Anti-trigger: doing original Figma design work (lead's job).

### `elementor-troubleshoot`

**Build new.**

Purpose: Common Elementor problems and how to fix them, ordered by frequency.

Required content (each as its own subsection with symptom → diagnosis → fix):

- "I changed something and the page looks broken" → Regenerate CSS (Elementor → Tools → Regenerate CSS); also Files & Data → Regenerate Files
- "Mobile looks fine in editor but broken on real phone" → Browser cache, then check responsive overrides at the right breakpoint
- "Widget settings disappeared after I updated Elementor" → Check experiment toggles; check plugin compatibility
- "Editor is slow / freezing" → Disable other plugins one at a time; check browser memory; reduce image sizes
- "Can't drag a widget where I want it" → Check container Direction (row vs. column) and Justify Content settings
- "Container won't resize properly" → Width: full vs boxed; min-height; align-self vs container alignment
- "Heading is the wrong color despite Global Color set" → Local override exists; right-click property → Reset
- "Image won't upload" → File too large, or wrong format; check WP upload limit; check media library quota
- "Form not sending" → SMTP setup; spam filter; check Elementor form actions
- "Site is slow on mobile" → Image size, lazy loading, plugin bloat — when to escalate to lead/dev
- "I broke something I can't undo" → Revisions panel (WP), Elementor history panel; never panic-publish
- When to STOP and ask the lead: any database or theme file edits, any plugin changes, any custom code

### `hospitality-copy-polish`

**Build new.**

Purpose: Light editing pass on hospitality copy provided by the client or copywriter. Junior designer is often the last set of eyes before publish — typos and clunky phrasing get caught here.

Required content:

- What to fix without asking: typos, basic grammar, clear inconsistencies (property name spelled differently in two places), broken sentences, obvious factual errors (wrong phone number, wrong address)
- What to flag for client review: voice/tone changes, factual claims that might need verification, anything ambiguous about pricing/policies/availability
- Hospitality voice patterns: warm but not saccharine, place-rooted, sensory (food/scenery/feel), specific details over generic claims
- Common hospitality copy mistakes: overusing "luxurious" / "stunning" / "breathtaking" (cliché signals); underusing concrete details (the actual breakfast, the specific view, the named local winery)
- Headings should be specific: "Wraparound Porch with Adirondack Views" beats "Beautiful Outdoor Spaces"
- CTA copy: "Book Your Stay" > "Click Here"; "Reserve Your Suite" > "Submit"
- SEO-friendly phrasing: include location naturally ("Finger Lakes B&B" not "B&B [period]"); include amenities ("ADA-accessible suite" if applicable)
- A pre-publish copy checklist (5 items)

Trigger: reviewing client-provided copy before placing in Elementor.
Anti-trigger: writing original copy from scratch (escalate to lead or copywriter).

### `logan-pm-handoff`

**Build new.**

Purpose: Preparing a page or set of pages for PM review — what to communicate, in what format, with what level of detail.

Required content:

- Status taxonomy: Not Started / In Progress / Ready for Review / In Review / Revisions / Approved / Published
- The handoff message format (template provided in templates/pm-handoff-message.md)
- What MUST be in a handoff message: page URL(s), what was built, any deviations from the template (with reason), any missing inputs that affected the build, any open questions
- What NOT to include: emotional commentary, apologies for normal time taken, defensive explanations
- When to flag a delay early: missing assets, unexpected complexity, technical block — escalate within 1 day, not at deadline
- Self-QA must happen BEFORE handoff (run elementor-hospitality-qa skill)
- Response to PM feedback: acknowledge, clarify if needed, ETA for revisions, no defensiveness
- The "I'm stuck" protocol: state what you tried, what didn't work, what you think the issue might be, what you need

Trigger: page is built and self-QA'd, ready for PM eyes.
Anti-trigger: page isn't actually done; escalating problems mid-build (those go directly to PM, not via handoff format).

---

## Reference doc specifications

Reference docs are scannable, not narrative. Heavy on tables, lists, code blocks. Emily reads these at her desk while building.

### `01-elementor-fundamentals.md`

The 10-minute orientation. Mental model of Elementor: WordPress page builder, sits on top of WP, visual editor for HTML/CSS-equivalent output. The four levels of the editor: Site Settings → Theme Builder → Templates → Pages. The three primary objects: Containers, Widgets, Templates.

### `02-containers-vs-sections.md`

The single most important conceptual reference. Pre-2023 = Section/Column/Widget. 2023+ = Container (Flexbox or Grid) holds widgets directly. Why containers won (cleaner DOM, infinite nesting, can be `<a>` link, better responsive). What "Direction" means (row/column/row-reverse/column-reverse). Justify content vs Align Items demystified. Quick decision tree: when to use Flexbox container vs Grid container. Note: legacy sections still exist on old sites; conversion tool exists but is one-way.

### `03-global-styles.md`

The design system layer. Where to find Global Colors, Global Fonts, and Global Style for buttons/headings/links. Why junior designers should NEVER override globals locally. How to apply a global color to text/border/background. How to know when something is using a global vs. a local value (the indicator dots in the editor). What to do when a value isn't in globals but you need it (escalate, don't add).

### `04-responsive-editing.md`

The three breakpoints (desktop/tablet/mobile) — note Elementor supports more if enabled, but Logan likely uses the standard three. How to switch responsive views. The critical rule: properties set at smaller breakpoints OVERRIDE larger ones. So edit desktop first, then adjust tablet/mobile only where needed. The "responsive override" indicator. Common responsive patterns: column-to-row direction switch, hiding/showing widgets per breakpoint, adjusting font size per breakpoint.

### `05-widget-cheatsheet.md`

A scannable list of common widgets with one-line descriptions and Logan-specific notes. Categories:

- **Basic:** Heading, Text Editor, Image, Button, Spacer, Divider, Icon
- **Pro / Common:** Image Box, Icon Box, Counter, Progress Bar, Testimonial, Gallery, Image Carousel, Posts, Form
- **Hospitality-relevant:** Form (for contact + newsletter), Posts (for blog/area pages), Gallery (lightbox), Image Carousel (room photos), Map (Google Maps embed)
- **Avoid unless directed:** Animated Headline (overdone), Flip Box (gimmicky), Price Table (rare in hospitality)
- For each: typical usage, gotchas

### `06-keyboard-shortcuts.md`

Table of Elementor + browser shortcuts. The high-value ones: Cmd/Ctrl+E (Finder), Cmd/Ctrl+Z/Y (undo/redo), Cmd/Ctrl+S (save), Cmd/Ctrl+Shift+H (history), right-click context menu options (copy/paste/duplicate). WordPress shortcuts: G (block-level kbd shortcuts in Gutenberg, not relevant here). Browser DevTools: Cmd+Shift+M for responsive view, Cmd+Shift+C for inspector.

### `07-image-optimization.md`

The pipeline:

1. Receive originals (often huge, 4000px+, RAW or large JPEGs)
2. Resize to web max width: 1920px for full-bleed hero, 800–1200px for content images
3. Compress (TinyPNG, Squoosh, ShortPixel plugin) — target 80% quality JPEG, or WebP if site supports it
4. Upload to WP media library with descriptive filename (no IMG_4827.jpg — use "inn-at-gothic-eves-rose-garden.jpg")
5. Set alt text in Elementor or media library
6. Choose appropriate "Image Size" dropdown in Elementor (don't serve full-size when thumbnail will do)

Quick reference: file size targets, format guide, when WebP vs JPEG vs PNG, dimensions per common widget.

### `08-hospitality-seo.md`

Patterns specific to inn/B&B/hotel sites:

- Meta titles: Property Name | Type + Location (e.g., "Bottger Mansion of Old Town | Albuquerque Bed and Breakfast")
- Meta descriptions: 140–160 chars, include location keyword + value prop + CTA
- H1: descriptive of the page's value proposition, not just the property name
- Local SEO basics: NAP consistency (Name, Address, Phone) across site, Google Business Profile alignment, schema markup (Yoast/Rank Math handles)
- Image alt text patterns: property name + descriptive subject
- Common hospitality keyword patterns: "[location] bed and breakfast", "[location] inn", "romantic getaway [region]", "[region] wineries"
- What NOT to do: keyword stuffing, generic alt text, copy-pasting meta descriptions across pages

### `09-wordpress-admin-essentials.md`

The minimum WordPress admin Emily needs:

- Dashboard navigation
- Pages vs Posts vs custom post types
- Media library — uploading, organizing, finding
- Yoast/Rank Math basics (meta title, meta description, focus keyword)
- User roles (she'll likely be Editor or Author level, NOT Admin)
- What to NEVER touch without lead approval: themes, plugins, settings, users, theme files
- Updates: Elementor, plugins, WordPress core — Logan likely manages centrally; junior shouldn't update on her own

### `10-common-gotchas.md`

Things that will trip her up specifically:

- Pasting copy from Word/Google Docs brings inline styles (always paste as plain text)
- Image not showing on mobile because uploaded after responsive view set incorrectly
- Container background image not showing because it's set on the wrong nested container
- Heading hierarchy broken because she changed an H2 to H3 visually but kept the H2 tag
- Two pages with the same H1
- Forgetting to set the page's "Featured Image" (used in card displays elsewhere on site)
- Saving a page draft thinking it published, or publishing thinking it was draft
- Forgetting to disable Elementor on the "Privacy Policy" or "Accessibility" pages where Logan wants WP default styling
- Local overrides accumulating until the page no longer matches the template
- Cache issues making her think a fix didn't work when it did

---

## Template specifications

Templates are short, copy-pasteable text artifacts. Each is one file, includes usage notes at the top, and the actual template body.

### `pm-handoff-message.md`

A 5-sentence template with placeholders: page URL, what was built, deviations (if any), missing inputs (if any), open questions (if any). Plus 2 example filled-in versions: one clean handoff, one with a flagged issue.

### `status-update.md`

A weekly status update template: this week's progress (3 bullets max), next week's focus (3 bullets max), blockers (if any), on-track-for date.

### `self-qa-checklist.md`

A copy-pasteable checklist Emily runs on every page before PM handoff. Boxes to tick. Should cover: heading hierarchy, alt text, links, responsive (mobile + tablet), brand consistency (globals used), template adherence, no placeholder content, page meta filled. ~15 items, scannable.

### `pre-launch-checklist.md`

The full site checklist (more comprehensive than per-page). References the elementor-hospitality-qa skill for full version; this template is the operational worksheet — print/save and tick through.

### `alt-text-patterns.md`

A reference of alt text patterns by image type:

- Hero images: "[property name] [primary subject], [location]"
- Room photos: "[property name] [room name] showing [key features]"
- Food photos: "[breakfast item description] at [property name]"
- Exterior: "[property name] [view/angle], [season/time of day]"
- Decorative: empty alt="" (only when truly decorative — pattern dividers, etc.)
- 5–8 examples filled in for a fictional inn

### `meta-description-patterns.md`

A reference of meta description patterns by page type:

- Home: "[Property] is a [type] in [location], offering [key features]. [CTA + book/visit verb]." 140–160 chars.
- Room/suite: "[Suite name] at [property] — [key features in 5–8 words], sleeps [N]. [Book CTA]." 140–160 chars.
- Things to do: "[N+ activities/attractions] near [property] in [location]. From [example] to [example], plan your stay." 140–160 chars.
- Blog post: hook + value prop + CTA, 140–160 chars.
- 5+ examples per page type.

---

## Tool specifications

Tools are LLM prompts (markdown files Emily can paste into Claude.ai with content) plus one optional shell script. The README in tools/ explains how to use each.

### `alt-text-generator.md`

LLM prompt template. Inputs: image description (or attached image), property name, page context. Output: 3 alt text options (short, medium, descriptive) following hospitality patterns. Includes "anti-pattern" examples in the prompt to avoid (e.g., "image of...", "photo showing...", keyword-stuffed alt text).

### `seo-meta-generator.md`

LLM prompt template. Inputs: page type, property info (name, location, type), page content summary, target keyword. Output: 3 meta title options + 3 meta description options, all within length limits, in hospitality voice.

### `hospitality-copy-review.md`

LLM prompt template. Input: client-provided copy. Output: copy review with three sections — typos/grammar (definite fixes), suggested rewrites (with reasoning), flags for client review (factual or voice concerns to escalate). Tuned to hospitality voice (warm, place-rooted, sensory, specific).

### `image-resize.sh`

Bash script using ImageMagick to batch-resize images in a folder. Usage: `./image-resize.sh /path/to/images 1920` (folder + max width). Resizes any image larger than the max width while preserving aspect ratio, outputs to a `resized/` subfolder, preserves originals. Skips files that don't need resizing. Includes basic error handling and a help flag.

### `tools/README.md`

Lists all four tools, what each does, when to use each, and a "minimum viable usage" example for each. Notes that LLM tools require Claude.ai or similar (not bundled with the toolkit).

---

## Onboarding documents

These are guides written TO Emily. Second person. Encouraging but not patronizing.

### `day-1.md`

A 90-minute orientation she can do before her first real assignment:

1. Skim `reference/01-elementor-fundamentals.md` (15 min)
2. Skim `reference/02-containers-vs-sections.md` (15 min)
3. Open the gothiceves.loganmarketing.com/page-template/ link, walk through the page in a browser, identify each component pattern (15 min)
4. Read `skills/elementor-page-build/SKILL.md` end to end (15 min)
5. Set up local environment: bookmarks (WP admin, staging URLs, Logan's PM tool), folder for project assets, copy `templates/self-qa-checklist.md` somewhere accessible (15 min)
6. Do one practice exercise from `practice/practice-exercises.md` if time (15 min)

End-of-day-1 self-check: can you describe what a Container is, what a Global Style is, and what a Theme Builder template is? If yes, ready for week 1 work.

### `week-1.md`

First-week ramp plan, day by day. Goals:

- Day 1: orientation (above)
- Day 2–3: shadow lead designer / PM, ask questions, take notes
- Day 4–5: pick up first real page assignment, work through it slowly with self-QA
- End of week 1: one page shipped, self-QA'd, PM-handed-off

Includes: questions to ask the lead designer in week 1 (about their Figma conventions, about Logan's global styles patterns, about edge cases), a list of references to bookmark, and a "you should be feeling X by Friday" expectation.

### `month-1.md`

First-month milestones:

- Week 1: first page shipped
- Week 2: first full content section (multiple pages) shipped
- Week 3: first full junior pass on a site (multiple non-template pages)
- Week 4: confident in self-QA, asking fewer "is this right" questions, starting to anticipate template patterns

Skills to develop: speed (page-build time should drop), responsive intuition (catching mobile issues without toggling), pattern recognition (seeing which template block fits which copy section without thinking), copy hygiene (light fixes without asking).

### `month-3.md`

Where she should be at month 3:

- Independent on standard hospitality content pages
- Can self-direct on most builds without lead checking in until QA
- Has internalized Logan's voice and patterns
- Faster than month 1 by 2x on similar work
- Comfortable raising design issues to lead with specific suggestions

What month 3 ISN'T: leading projects, designing templates, doing Figma work, making strategic site decisions. Those are the lead's domain. Stay in lane, get great in lane, then earn the next domain.

---

## Practice materials (Phase 3)

### `sample-client-brief.md`

A fictional B&B brief Emily can use for self-directed practice. Includes:

- Property: "The Maplewood Inn", a 6-room B&B in a fictional Hudson Valley town
- Property story (1 paragraph, evocative)
- Audience (couples, weekend travelers, foodies)
- Brand cues (warm autumn palette, serif typography, photography-driven)
- Site goals (drive bookings, showcase rooms, highlight area)
- Constraints (small budget for photography, no existing site)
- A page list (Home, About, Rooms, Breakfast, Things to Do, Gallery, Contact, Blog)

### `sample-component-library.md`

A description of what a Logan-style inside template provides — modeled on the gothiceves page-template. Lists each component, what it's used for, and what content it expects. Acts as a reference for practice exercises and for understanding "what comes from the template."

### `practice-exercises.md`

4–6 build-along exercises ranging from beginner (build a single content section using only template components) to advanced (build a full Things-to-Do page with embedded map, three content sections, and a CTA, then self-QA it). Each exercise: scenario, inputs (text + image links to use — placeholder/Unsplash references), success criteria, common pitfalls.

### `self-evaluation-rubric.md`

A rubric Emily can use to grade her own work BEFORE handoff. Five dimensions:

1. **Template adherence** (1–5): does this look like the inside template, or have I drifted?
2. **Responsive integrity** (1–5): does this look right on mobile and tablet?
3. **Content hygiene** (1–5): typos, alt text, headings, links — all clean?
4. **Brand consistency** (1–5): globals used everywhere, no rogue colors/fonts?
5. **PM-handoff-ready** (1–5): would I be embarrassed if PM saw this in 30 seconds?

Total /25. Anything below 22 should not be handed off. Anything 22–24 ship with a note. 25 ship clean.

---

## README.md specification

The repo's front door. Should include:

1. **What this is** — One paragraph: a self-service toolkit for ramping into a Logan Marketing junior designer role.
2. **How to use it** — On day 1 read onboarding/day-1.md. After that, reference docs answer 80% of questions; skills cover workflows; templates cover communication; tools speed up repetitive work; practice helps build confidence.
3. **The folder map** — One-line description of each folder.
4. **The 5 things to read this week** (in order):
   1. onboarding/day-1.md
   2. reference/01-elementor-fundamentals.md
   3. reference/02-containers-vs-sections.md
   4. skills/elementor-page-build/SKILL.md
   5. templates/self-qa-checklist.md
5. **The 3 skills to know exist for later:**
   - elementor-hospitality-qa (for site QA before launch)
   - elementor-figma-handoff (when reading lead's Figma)
   - elementor-troubleshoot (when something breaks)
6. **Maintenance** — brief note that this toolkit is meant to grow; she should add notes/patterns as she learns Logan's specific quirks.
7. **Last updated** — date stamp.

---

## Voice and style guide

Apply consistently across ALL generated content.

**Voice:**

- Direct, operational, concrete
- Confident without being smug
- No filler ("As we all know," "It's important to note that," "In today's fast-paced world")
- No motivational language ("You've got this!" "Crush it!")
- No corporate jargon ("synergize," "leverage," "best-in-class")
- Pragmatic over aspirational — "do this, not that" beats "consider doing this when appropriate"

**Formatting:**

- Markdown headers (H2/H3 mostly, H4 sparingly, H1 only for doc titles)
- Bulleted lists for parallel items, numbered lists for ordered steps
- Tables when comparing options or values
- Code blocks for anything literal (filenames, commands, exact text snippets)
- Bold for emphasis, sparingly. Italics rarer.
- Em-dashes for flow ( — not -- )
- Sentence case for headers, not Title Case

**Length:**

- Reference docs: scan-friendly, mostly tables/lists, prose only when necessary
- Skills: operational-length (200–400 lines), not academic essays
- Onboarding: warm but tight, no padding
- Templates: short, with clear placeholder syntax `[like-this]` or `{{like-this}}`

**What to avoid:**

- "We" (whose we?) — prefer "you" or imperative voice
- Cliffhangers ("More on that later") — say it now or not at all
- Hedging beyond what's actually uncertain
- Overuse of headings to fake structure on thin content

**Hospitality vertical voice (when generating example copy):**

- Warm but not saccharine
- Place-rooted (specific to a region)
- Sensory (food, scenery, feeling)
- Specific over generic ("Tuesday-morning blueberry scones" beats "delicious breakfasts")
- Avoid clichés: "stunning views," "breathtaking," "luxurious," "world-class"

---

## SKILL.md frontmatter rules

Every skill must have a `name` and `description` in YAML frontmatter. The description is critical — it's what triggers the skill in Claude.

**Description format:**

- Start with "Use this skill when..."
- List 3–5 specific trigger phrases the user might say
- Include "Triggers include:" with concrete examples
- End with "Do NOT use this skill for X" exclusions to prevent over-triggering
- Keep under 500 characters where possible
- Be unambiguous — overlap between skills is bad

Example structure:

```yaml
---
name: skill-name
description: Use this skill when [PRIMARY TRIGGER]. Triggers include "[example phrase 1]", "[example phrase 2]", "[example phrase 3]", or [contextual situations]. Also use when [secondary trigger]. Do NOT use this skill for [exclusion 1], [exclusion 2], or [exclusion 3] — use [other skill] instead.
---
```

---

## Acceptance criteria

The toolkit is complete when:

1. **Structure:** All folders and files in the structure exist
2. **Phase 1 essentials:** Phase 1 files are complete and high-quality
3. **Skills are operational:** Each skill is self-contained and could be triggered standalone
4. **References are scannable:** Reference docs use tables/lists, can be skimmed in under 60 seconds
5. **Templates are paste-ready:** Templates have clear placeholders and example fills
6. **Voice is consistent:** All content matches the style guide
7. **No filler:** No content is padding; every section earns its place
8. **README maps everything:** A new user reading only README.md knows where everything is
9. **Internal links work:** Cross-references between docs use relative paths and resolve

---

## Final instructions to Claude Code

1. Build Phase 1 first, completely. Do not start Phase 2 until Phase 1 is done.
2. After Phase 1, pause and produce a brief summary of what was built and what assumptions were made. Then continue to Phase 2.
3. After Phase 2, pause again with a summary. Then Phase 3 if context allows.
4. If a file already exists in the target location (specifically the two pre-drafted skills), preserve it; do not overwrite.
5. If at any point a decision is genuinely ambiguous, default to the simpler/shorter option and add a `<!-- ASSUMPTION: ... -->` HTML comment at the relevant location explaining the choice.
6. After all phases are complete, run a final pass: check that all internal links resolve, the README accurately reflects the structure, and every file has been touched.
7. End with a "What's next" note in the README suggesting Emily customize the toolkit as she learns Logan's specific patterns (especially: filling in real component library descriptions, real PM tool names, real client list).

---

**Begin.**
