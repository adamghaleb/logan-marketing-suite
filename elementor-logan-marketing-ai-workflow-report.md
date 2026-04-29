# Elementor, Logan Marketing, and an AI-Assisted Website Production System

## Executive Summary

Elementor is best understood as a WordPress visual builder built across PHP, JavaScript, TypeScript, SCSS, CSS, and template data rather than as a single-language tool; its open-source repository is 38.3% PHP, 34.5% JavaScript, 22.1% TypeScript, 4.3% SCSS, 0.7% CSS, and 0.1% Shell according to the official GitHub repository language breakdown ([Elementor GitHub](https://github.com/elementor/elementor)). For a junior designer role, the most important “language” is not PHP or JavaScript but Elementor’s visual grammar: containers, widgets, global styles, templates, responsive controls, reusable section patterns, and WordPress content hygiene ([Elementor template import docs](https://elementor.com/help/adding-templates/), [Elementor Theme Style docs](https://elementor.com/help/theme-style-global-settings/)).

Logan Marketing’s examples show a repeatable hospitality website system rather than one-off custom sites: sticky headers, full-screen photo or video heroes, rust/terracotta primary CTAs, Elementor popup navigation, room card grids or sliders, activity/experience cards, testimonial blocks, trust badges, newsletter capture, blog cards, and structured footers appear across the provided sites and template page ([Sprucedale Ranch](https://sprucedaleranch.com/), [The Whaler’s Inn](https://whalersinnmystic.com/), [Bottger Mansion](https://bottger.com/), [Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)). That repeatability is exactly where Claude Code skills, a searchable playbook, and a thin WordPress/Elementor automation layer can create leverage.

The most realistic system is not “Claude replaces Elementor”; it is “Claude prepares and checks everything around Elementor, then optionally imports editable Elementor templates into a staging site.” Elementor can import JSON or ZIP templates manually through the template library, and Elementor’s CLI can import a template JSON file with `wp elementor library import <file-path> [--returnType]` when WP-CLI access exists ([Elementor template import docs](https://elementor.com/help/adding-templates/), [Elementor CLI library import docs](https://developers.elementor.com/docs/cli/library-import/)). WordPress can also be automated through the REST API, which exposes posts, pages, taxonomies, and other resources as JSON endpoints that authenticated tools can query, create, and modify ([WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)).

The correct strategy is to build Emily a “junior designer exoskeleton”: a small suite of Claude Code skills, a Logan-specific component playbook, a page QA checklist, a content migration assistant, an SEO/accessibility checker, and eventually a safe MCP or WP-CLI workflow that operates only on staging sites. WordPress Application Passwords are revocable, per-application credentials intended for REST API authentication, which makes them a safer default than sharing a primary admin password with external tools ([WordPress Application Passwords](https://developer.wordpress.org/advanced-administration/security/application-passwords/)). Direct production automation should be delayed until the staging workflow, rollback process, and QA checklist are boringly reliable.

## The Direct Answer

Elementor itself is a WordPress plugin and visual website builder, so the backend and rendering layer is primarily PHP because WordPress core, themes, and plugins are PHP-driven ([Elementor PHP guide](https://elementor.com/blog/what-is-php-a-web-creators-guide/)). Elementor’s editor experience runs heavily in JavaScript and React-style browser UI, where the user drags widgets, changes controls, and saves design data from the browser to WordPress ([Elementor PHP guide](https://elementor.com/blog/what-is-php-a-web-creators-guide/)). Elementor stores page design as structured data that can be exported and imported through JSON or ZIP template files, which is why Claude can sometimes generate Elementor template JSON that remains editable in the builder ([Elementor template import docs](https://elementor.com/help/adding-templates/), [Elementor CLI library import docs](https://developers.elementor.com/docs/cli/library-import/)).

The practical stack looks like this:

| Layer             | What it does                                                           | Main technologies                                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WordPress backend | Users, pages, posts, media, plugins, permissions, database persistence | PHP, MySQL, REST API JSON ([WordPress REST API Handbook](https://developer.wordpress.org/rest-api/))                                                                                        |
| Elementor plugin  | Builder logic, widgets, theme builder, forms, template rendering       | PHP, JavaScript, TypeScript, SCSS/CSS ([Elementor GitHub](https://github.com/elementor/elementor))                                                                                          |
| Elementor editor  | Drag-and-drop UI, live preview, controls, responsive editing           | JavaScript/TypeScript in the browser ([Elementor PHP guide](https://elementor.com/blog/what-is-php-a-web-creators-guide/))                                                                  |
| Saved templates   | Reusable sections, pages, site kits, global settings                   | JSON and ZIP template exports/imports ([Elementor template import docs](https://elementor.com/help/adding-templates/), [Elementor Export Kit docs](https://elementor.com/help/export-kit/)) |
| Frontend output   | What visitors see                                                      | HTML, CSS, JavaScript generated by WordPress and Elementor ([Elementor PHP guide](https://elementor.com/blog/what-is-php-a-web-creators-guide/))                                            |

For Emily’s job, she probably does not need to write PHP or JavaScript at first. She needs to become fluent in using Elementor’s editor, copying and adapting templates, respecting global colors and typography, editing responsive layouts, filling page templates with real content, and catching quality issues before the project manager or client sees them ([Elementor Theme Style docs](https://elementor.com/help/theme-style-global-settings/), [Elementor container docs](https://elementor.com/help/how-do-i-create-a-container/)).

## What the Job Really Is

Jeff’s email describes a production-line design workflow: the lead designer creates the Figma design, home page, room page, and inner template, then the junior designer completes the rest of the site using the component library and project-management checklist. Logan Marketing’s own site says it designs websites, builds online presence, and offers Design + SEO + PPC + Remarketing, with a long history serving bed-and-breakfasts, inns, and many other local-business categories ([Logan Marketing](https://loganmarketing.com/)). That means Emily’s role is probably closer to “implementation designer and content finisher” than “from-scratch brand designer.”

The provided Logan examples are concentrated in hospitality: Sprucedale Ranch is a dude ranch site, The Whaler’s Inn is a boutique hotel site, Bottger Mansion is a bed-and-breakfast site, and Gothic Eves is an internal inn page template ([Sprucedale Ranch](https://sprucedaleranch.com/), [The Whaler’s Inn](https://whalersinnmystic.com/), [Bottger Mansion](https://bottger.com/), [Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)). Hospitality websites are repetitive in a useful way because they need rooms, rates, booking CTAs, amenities, local attractions, reviews, location proof, photo galleries, blog/destination content, and conversion-focused direct booking flows. Cloudbeds’ hotel website guidance similarly emphasizes prominent “Book Now” or “Check Availability” CTAs, professional photography, integrated booking engines, fresh SEO content, review/social proof, and mobile-first performance ([Cloudbeds hotel website design guide](https://www.cloudbeds.com/articles/hotel-website-design/)).

This makes the opportunity real, but not because every website can be generated in five minutes. The five-minute part can be scaffolding: page outlines, section copy, image checklists, alt text, meta descriptions, template-selection guidance, QA checklists, and maybe importable Elementor JSON sections. The actual professional work is still fitting the client’s assets, brand, copy, booking engine, mobile layouts, SEO requirements, and visual polish into a finished site.

## Logan Pattern Analysis

The example sites suggest Logan Marketing uses a recognizable WordPress/Elementor production system. Whaler’s Inn exposes an Elementor popup navigation link using an `#elementor-action:action=popup:open` URL pattern, Bottger Mansion exposes a similar Elementor popup pattern for newsletter behavior, and the Gothic Eves template exposes an Elementor popup hamburger menu with popup ID 8458 in the browser inspection ([The Whaler’s Inn](https://whalersinnmystic.com/), [Bottger Mansion](https://bottger.com/), [Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)). Sprucedale Ranch, Bottger Mansion, and Whaler’s Inn also show WordPress-style `wp-content` paths or WordPress surface patterns in inspection, which aligns with Logan’s own claim that it builds WordPress sites clients can update ([Sprucedale Ranch](https://sprucedaleranch.com/), [Bottger Mansion](https://bottger.com/), [Logan Marketing](https://loganmarketing.com/)).

The cross-site component set is consistent enough to become a reusable playbook. Sprucedale Ranch uses a rustic heritage-western design with a full-screen photo/video hero, transparent sticky header, rust “Reserve” CTA, alternating image/text sections, badge/stat rows, feature sections, newsletter signup, blog cards, and a footer ([Sprucedale Ranch](https://sprucedaleranch.com/)). The Whaler’s Inn uses an upscale coastal system with a video hero, audience-segment links, package cards, room-category image cards, press-logo marquee, dining feature, itinerary cards, blog cards, and trust badges ([The Whaler’s Inn](https://whalersinnmystic.com/)). Bottger Mansion uses a conversion-first B&B layout with an integrated booking date widget, room carousel, activity carousel with prices, breakfast feature, location section, travel-guide teaser, personality section, and footer trust badges ([Bottger Mansion](https://bottger.com/)). Gothic Eves is the clearest page-template blueprint, with a full-screen hero, H1 SEO block, alternating two-column content modules, list sections, feature-card modules, and a reusable TripAdvisor-style testimonial block ([Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)).

The important takeaway is that Logan’s “component library” should be treated as a library of business functions, not just visual sections. A room card is not just a card; it must answer room name, room image, capacity, bed type, floor or location, CTA, and booking path. A local guide card is not just a blog teaser; it must target a search intent, connect the destination to the property, and send the guest back toward the booking flow. A testimonial block is not just a quote; it establishes trust near the point where a visitor needs confidence to continue.

## Reusable Components

The initial playbook should define each component as a reusable pattern with fields, rules, and QA criteria. This is more useful for Emily than a generic Elementor tutorial because it tells her what to place, what to replace, what not to break, and how to tell whether the section is done.

| Component                | Purpose                              | Required fields                                                             | QA rules                                                                               |
| ------------------------ | ------------------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Sticky header            | Persistent brand and booking access  | Logo, primary nav, booking CTA, hamburger/popup trigger                     | Header must be readable over hero, mobile menu must open, booking CTA must work        |
| Full-screen hero         | First impression and positioning     | Hero image/video, H1 or title, subhead, scroll cue, CTA if required         | Image focal point must work on mobile, text contrast must pass, no duplicated H1       |
| Booking bar hero         | Convert high-intent visitors         | Arrival date, departure date, check-rates button, booking engine link       | Date widget must function, CTA must be above the fold on mobile                        |
| Room card grid           | Route guests to room options         | Image, room/category name, description or metadata, CTA                     | Every card must link to correct room/category, images must have meaningful alt text    |
| Room carousel            | Showcase multiple rooms compactly    | Room image, name, bed/sleeps/floor metadata, “View Room” link               | Slider must be usable by keyboard and mobile swipes                                    |
| Experience card          | Sell local tours or add-ons          | Image, title, starting price, short description, CTA                        | Prices and links must be current, no orphaned experience pages                         |
| Two-column content block | Fill interior/SEO pages              | H2/H3, body copy, image, optional CTA                                       | Heading hierarchy must be logical, image and text order must stack correctly on mobile |
| Testimonial block        | Trust and conversion support         | Star graphic or rating, review headline, review body, attribution           | Quote must be real, attribution must be consistent, contrast must be readable          |
| Press/trust badge strip  | Third-party credibility              | Logos, associations, awards, source labels                                  | Logos must not be distorted, outbound links must open safely if used                   |
| Blog card grid           | Destination SEO and internal linking | Title, image, excerpt, “Continue” or “Read” link                            | Blog posts must link internally to rooms/booking pages where relevant                  |
| Newsletter/popup         | Lead capture                         | Trigger, form fields, success state, integration target                     | Form must submit, webhook/email must be mapped, popup must not trap mobile users       |
| Footer                   | Business contact and trust           | Address, phone, email, social links, accessibility link, badges, newsletter | Contact info must match client source of truth, all links must work                    |

Elementor’s global Theme Style controls default backgrounds, headings, buttons, images, and form fields, while Global Fonts and Global Colors provide reusable design tokens that can update instances across the site ([Elementor Theme Style docs](https://elementor.com/help/theme-style-global-settings/), [Elementor design system docs](https://elementor.com/help/how-elementors-theme-style-and-design-system-options-work-together/)). That means every component in the playbook should specify “use global token” by default and treat one-off color-picker styling as a QA smell unless the lead designer intentionally overrides it.

## Elementor Proficiency Map

Emily’s minimum viable Elementor skill stack should be organized around the work she will actually do. First, she needs WordPress admin basics: finding pages, duplicating pages safely, editing media, replacing images, checking permalinks, previewing drafts, and understanding when she is editing a page versus a template. Second, she needs Elementor editor basics: containers, widgets, Navigator, responsive mode, margins/padding, global colors, global fonts, saved templates, and update/publish workflow. Third, she needs Logan-specific execution: choosing the right section pattern, filling it with client content, preserving the brand kit, and passing QA.

Elementor now emphasizes containers and Flexbox-style layout controls, where containers can hold widgets or nested containers, use row/column direction, alignment, gaps, boxed/full-width behavior, order, and responsive stacking ([Elementor container docs](https://elementor.com/help/how-do-flexbox-containers-work/), [Elementor create container docs](https://elementor.com/help/how-do-i-create-a-container/)). This matters because junior designers can accidentally create heavy, nested layouts that are hard to maintain and slow to load. Elementor’s own performance guidance highlights optimized asset loading, image optimization, lazy loading, reduced DOM output, and performance features such as optimized image loading and lazy background images ([Elementor performance guide](https://elementor.com/blog/how-to-optimize-website-performance/), [Elementor performance features docs](https://elementor.com/help/what-are-performance-experiments/)).

Dynamic content is the next level. Elementor dynamic tags can pull post title, post URL, post excerpt, custom fields, featured image data, archive data, site title, site URL, shortcodes, and popup/contact actions into page designs ([Elementor Dynamic Tags docs](https://elementor.com/help/dynamic-tags-pro-2/)). For room pages and local guide pages, dynamic tags can reduce repeated manual entry if Logan’s sites use custom fields or consistent post/page structures.

Forms and lead capture are another essential layer. Elementor Pro form actions include Collect Submissions, Email, Email 2, Redirect, Webhook, MailChimp, Drip, ActiveCampaign, GetResponse, ConvertKit, MailerLite, Slack, Discord, and Popup, and developers can register custom form actions when needed ([Elementor Form Actions docs](https://developers.elementor.com/docs/form-actions/)). This gives the automation roadmap obvious targets: form QA, webhook mapping checks, lead-routing templates, and client handoff notes.

SEO and accessibility should be treated as finish-line gates, not bonus polish. Elementor’s SEO guidance emphasizes integrations with Yoast SEO and Rank Math, snippet optimization, permalinks, meta descriptions, internal links, schema, content optimization, and image optimization ([Elementor SEO guide](https://elementor.com/blog/elementor-seo/)). Elementor accessibility guidance emphasizes keyboard navigation, screen reader testing, sufficient color contrast, alt text, ARIA support, and heading structure ([Elementor accessibility guide](https://elementor.com/blog/test-web-accessibility/)). For hospitality sites, Cloudbeds similarly recommends mobile-first design, clear CTAs, integrated booking engines, high-quality photography, reviews, fresh search-optimized content, FAQ sections, structured schema, and internal links from blog content to rooms and booking pages ([Cloudbeds hotel website design guide](https://www.cloudbeds.com/articles/hotel-website-design/)).

## Claude + Elementor Workflow Reality

Claude can help with Elementor in four different ways, and each has a different risk profile. The safest layer is advisory: Claude generates checklists, page outlines, copy variants, image alt text, SEO metadata, and QA reports. The next layer is template-adjacent: Claude generates or modifies Elementor template JSON that a human imports manually through the Elementor template library. The third layer is authenticated WordPress automation: Claude or a script uses REST API, WP-CLI, or Elementor CLI on a staging site. The fourth layer is direct MCP control, where Claude can read and modify WordPress or Elementor data through an MCP server.

Manual template import is already supported by Elementor because users can import JSON or ZIP files into the template library and insert those templates into a page ([Elementor template import docs](https://elementor.com/help/adding-templates/)). Command-line template import is also supported through Elementor CLI with `wp elementor library import <file-path> [--returnType]`, and there is a directory import command for importing multiple JSON templates at once ([Elementor CLI library import docs](https://developers.elementor.com/docs/cli/library-import/), [Elementor CLI import-dir docs](https://developers.elementor.com/docs/cli/library-import-dir/)). Site-level export/import can include pages, posts, custom post types, menus, taxonomies, media, templates, site parts, global widgets, global fonts, global colors, theme style, layout, lightbox, background settings, experiments, plugin selections, custom fonts, icons, custom code, and public themes depending on plan and options ([Elementor website template import/export docs](https://elementor.com/help/import-and-export-elementor-website-templates/), [Elementor Export Kit docs](https://elementor.com/help/export-kit/)).

REST and WP-CLI automation should be treated as infrastructure, not a toy. WordPress REST API allows applications to send and receive JSON to query, modify, and create posts, pages, taxonomies, and other built-in data types, with authentication required for private or protected resources ([WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)). WP-CLI can manage plugins, posts, post meta, terms, users, and other WordPress resources from the command line, and `wp post meta` can add, update, delete, and list custom fields ([WP-CLI commands](https://developer.wordpress.org/cli/commands/), [WP-CLI post meta docs](https://developer.wordpress.org/cli/commands/post/meta/)). This is useful for repeatable tasks such as creating draft pages, importing media, updating SEO meta fields, and importing template JSON on staging.

MCP is promising but should be sandbox-first. A public Elementor MCP repository describes a server for CRUD operations on Elementor page data and uses WordPress URL, username, and Application Password environment variables for connection ([Elementor MCP GitHub](https://github.com/aguaitech/Elementor-MCP)). The WordPress Developer Blog describes an official WordPress MCP Adapter that adapts WordPress Abilities into MCP tools and resources so AI agents can discover and execute site functionality ([WordPress MCP Adapter article](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/)). A Meow Apps guide warns that MCP can give Claude Code full admin access to create, modify, and delete WordPress content, plugins, themes, and settings, so it should begin on a test site with careful permissions ([Meow Apps Claude Code WordPress MCP guide](https://meowapps.com/claude-code-wordpress-mcp/)).

Figma-to-Elementor workflows are also possible, but they are not magic. A Figma community plugin claims it can convert Figma designs into Elementor widgets and produce JSON that can be pasted into Elementor, while noting that Auto Layout, grouping, image naming, SVG support, and Application Password authentication affect outcomes ([Figma to Elementor plugin](https://www.figma.com/community/plugin/1289146550601337525/figma-to-elementor)). Elementor’s own AI Site Planner can generate a brief, sitemap, and wireframe that can be customized in Elementor, but Elementor recommends Elementor Pro for smoother direct import because Pro elements and theme parts may be involved ([Elementor Site Planner FAQ](https://elementor.com/help/website-planner-faq/)).

## Custom Claude Code Skills

The skill suite should be downloadable, small, and role-specific. Each skill should tell Claude Code how to behave inside one workflow, what files to read, what output to produce, what to never touch, and what QA gates must pass. The goal is to reduce Emily’s cognitive load and prevent accidental drift from Logan’s production style.

### 1. `logan-elementor-page-builder`

This is the core skill. It should turn a page assignment into a fillable implementation plan, using Logan’s section taxonomy and Elementor constraints. Inputs should include page type, client brand kit, target URL/slug, source copy, available images, booking links, and the lead designer’s template notes. Outputs should include a section-by-section build plan, exact component choices, copy placement, image needs, and a final QA checklist.

### 2. `logan-hospitality-copy-seo`

This skill should generate or revise hospitality page copy in Logan’s style. It should handle home pages, room pages, amenities pages, local guide pages, itinerary posts, spa pages, restaurant/dining pages, and booking-focused CTAs. It should produce H1/H2/H3 structure, meta title, meta description, internal-link suggestions, FAQ candidates, image alt text, and booking CTA copy aligned with hotel SEO best practices such as clear CTAs, fresh optimized content, reviews, and internal links ([Cloudbeds hotel website design guide](https://www.cloudbeds.com/articles/hotel-website-design/), [Elementor SEO guide](https://elementor.com/blog/elementor-seo/)).

### 3. `elementor-template-json-safe`

This skill should guide Claude through generating or modifying Elementor JSON templates only when the user explicitly asks for importable templates. It should prefer modern containers over legacy sections because Elementor’s current container system supports Flexbox direction, alignment, nesting, responsive order, and leaner layouts ([Elementor create container docs](https://elementor.com/help/how-do-i-create-a-container/), [Elementor Flexbox announcement](https://elementor.com/blog/introducing-flexbox-containers/)). It should include a strict warning that generated JSON must be imported into staging first and visually checked in Elementor before use on a production site.

### 4. `elementor-qa-auditor`

This skill should audit a page before handoff. It should check broken links, CTA consistency, responsive layout, heading hierarchy, image alt text, image compression, global style use, duplicated placeholder text, missing testimonials, missing booking path, form configuration, popup behavior, footer contact accuracy, and accessibility basics. Elementor’s accessibility guidance says designers should test keyboard navigation, screen readers, color contrast, alt text, ARIA attributes, and heading structure ([Elementor accessibility guide](https://elementor.com/blog/test-web-accessibility/)).

### 5. `logan-component-selector`

This skill should ask a small number of questions and choose the right Logan component pattern. If the page is a room listing, it should choose room grid or carousel. If the page is a local guide, it should choose intro, map/location proof, attraction cards, itinerary blocks, internal booking CTA, and FAQ. If the page is a spa or package page, it should choose feature cards, treatment/menu sections, testimonial block, and booking CTA. This becomes the “what section do I use here?” helper for a junior designer.

### 6. `wordpress-staging-automation`

This skill should guide safe REST/WP-CLI operations on staging only. It should create drafts, upload media, set titles/slugs, import templates, and update metadata only after confirming target environment, backup status, and rollback path. WordPress Application Passwords should be one per integration, revocable, stored securely, and used over HTTPS rather than sharing the primary admin password ([WordPress Application Passwords](https://developer.wordpress.org/advanced-administration/security/application-passwords/)).

### 7. `logan-pm-handoff`

This skill should translate finished work into project-manager language. It should produce a concise update with completed pages, blocked items, missing assets, questions for the client, QA status, and direct links. The value is not just speed but fewer back-and-forth messages.

## Playbook Website

The playbook website should be a searchable internal reference for Emily, not a broad Elementor course. Its first version can be static and local, with JSON entries that later power a nicer UI. Each entry should have a title, component category, when to use it, required content, Elementor steps, Logan examples, pitfalls, QA checks, and source links.

Recommended top-level categories:

| Category               | Example entries                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Logan components       | Hero variants, room grid, room carousel, activity carousel, testimonial, trust badge strip, footer   |
| Page recipes           | Home page, room page, amenity page, local guide, itinerary blog, dining page, spa page, contact page |
| Elementor fundamentals | Containers, responsive mode, global colors, global fonts, templates, popups, forms                   |
| Hospitality conversion | Booking CTAs, direct booking widgets, social proof, local SEO, review placement                      |
| QA and handoff         | Mobile QA, link QA, form QA, accessibility, SEO metadata, PM update                                  |
| Automation             | Template JSON, WP-CLI import, REST API drafts, MCP staging safety                                    |

The first 50 entries should be extremely practical. Examples include “How to fill a Logan interior page template,” “When to use a full-screen hero versus booking-bar hero,” “How to replace a room card without breaking metadata,” “How to write a local attraction section that links back to booking,” “How to check a popup menu link,” and “How to remove Lorem ipsum before handoff.” The Gothic Eves template is especially useful as the initial interior-page recipe because it already shows the H1 block, H2/H3 content hierarchy, two-column modules, list modules, feature card, and testimonial section ([Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)).

## Tool Ideas

The highest-value tools are the boring ones that remove repetitive mistakes. They should be built before ambitious AI page generation.

| Tool                                |                                                                               What it does | Build difficulty | Why it helps Emily                              |
| ----------------------------------- | -----------------------------------------------------------------------------------------: | ---------------: | ----------------------------------------------- |
| Logan Component Picker              |                                    Selects page type and returns the exact sections to use |              Low | Prevents blank-page paralysis                   |
| Page QA Checklist Generator         |                                       Creates a per-page QA list from the component recipe |              Low | Makes handoff consistent                        |
| Hospitality Copy Filler             |                                             Converts client notes into H1/H2/body/CTA copy |              Low | Speeds interior pages                           |
| Image Alt Text + Filename Generator |                                                  Produces SEO/accessibility image metadata |              Low | Avoids a common junior miss                     |
| Booking Link Validator              |                                             Checks that every booking CTA points correctly |           Medium | Prevents revenue-impacting errors               |
| Elementor Template JSON Linter      |                       Checks generated/imported JSON for missing fields and risky patterns |           Medium | Makes Claude-generated templates safer          |
| WordPress Draft Page Creator        |                                           Uses REST API to create draft pages from sitemap |           Medium | Saves setup time                                |
| Media Intake Processor              |                                             Renames, compresses, maps, and alt-tags images |           Medium | Handles hospitality image-heavy workflows       |
| Logan Site Pattern Browser          |                                     Searchable gallery of approved components and examples |           Medium | Turns example sites into training data          |
| Staging MCP Control Panel           | Controlled actions for staging only: list pages, create draft, import template, audit page |             High | Enables AI operations without broad admin chaos |

The first MVP should be a web-based “Logan Page Builder Console” with three tabs: Page Recipe, Copy/SEO, and QA. Page Recipe chooses the sections, Copy/SEO fills the content, and QA turns the chosen sections into a punch list. This can be built without WordPress access, which keeps it safe while Emily learns the real workflow.

## MCP Roadmap

MCP should be introduced in layers. Layer 1 should be read-only: list pages, list templates, fetch page titles, fetch slugs, fetch media metadata, and inspect global style names. Layer 2 should be draft-only: create draft pages, upload media, assign featured images, and import templates to the library on staging. Layer 3 should be controlled edits: update draft content, set SEO meta, update Elementor page data, and run audits. Layer 4 should be production-aware: guarded publishing, rollback snapshots, and PM handoff, but only after the staging process proves reliable.

The authentication model should use one WordPress Application Password per integration and user, because Application Passwords are individually revocable and intended for REST API access rather than browser login ([WordPress Application Passwords](https://developer.wordpress.org/advanced-administration/security/application-passwords/)). The operational model should use staging by default because MCP tools can potentially create, modify, and delete WordPress content, plugins, themes, and settings if given broad access ([Meow Apps Claude Code WordPress MCP guide](https://meowapps.com/claude-code-wordpress-mcp/)). The technical model can start with existing WordPress REST API and Elementor CLI operations before attempting low-level Elementor data mutation, because official APIs and CLI commands are more stable than directly patching builder internals ([WordPress REST API Handbook](https://developer.wordpress.org/rest-api/), [Elementor CLI library import docs](https://developers.elementor.com/docs/cli/library-import/)).

## Build Roadmap

### Phase 0: Interview Prep and Skill Ramp

Emily should learn the vocabulary first: WordPress admin, Elementor editor, containers, widgets, templates, global colors, global fonts, responsive mode, popups, forms, and booking CTAs. She should inspect the example sites and write down 10 reusable components she recognizes. She should practice editing a dummy Elementor page, replacing text/images, checking mobile, and restoring from revisions before touching client work.

### Phase 1: No-Access AI Assistant

Build the first Claude Code skills and a simple markdown/JSON playbook. The immediate deliverables should be `logan-elementor-page-builder`, `logan-hospitality-copy-seo`, `elementor-qa-auditor`, and a 50-entry component playbook. This phase requires no WordPress credentials and can still remove most cognitive load.

### Phase 2: Pattern Library Website

Build a private searchable reference site with components, page recipes, screenshots or reference links, checklists, and “what to do in Elementor” steps. The site should include direct references to Sprucedale, Whaler’s Inn, Bottger Mansion, and Gothic Eves as examples of approved Logan patterns ([Sprucedale Ranch](https://sprucedaleranch.com/), [The Whaler’s Inn](https://whalersinnmystic.com/), [Bottger Mansion](https://bottger.com/), [Gothic Eves page template](https://gothiceves.loganmarketing.com/page-template/)).

### Phase 3: Staging Automation

Add REST/WP-CLI tools only after Emily has a staging site or a local WordPress sandbox. The first automation should create draft pages from a sitemap, import template JSON into the Elementor library, upload and metadata-tag images, and run link/SEO/accessibility checks. Elementor’s template library supports JSON and ZIP import, and Elementor CLI supports importing template JSON from the command line ([Elementor template import docs](https://elementor.com/help/adding-templates/), [Elementor CLI library import docs](https://developers.elementor.com/docs/cli/library-import/)).

### Phase 4: MCP and Direct Elementor Edits

Only after the staging workflow is stable should an MCP server get access to Elementor or WordPress actions. Existing Elementor MCP experiments show CRUD operations on Elementor page data are possible, and the official WordPress MCP Adapter direction suggests WordPress-native AI tooling will keep improving ([Elementor MCP GitHub](https://github.com/aguaitech/Elementor-MCP), [WordPress MCP Adapter article](https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/)). The first safe MCP tools should be read-only inspection and draft-only creation, not production publishing.

## First 10 Things to Build

1. A one-page Elementor cheat sheet that answers “where do I click?” for templates, containers, responsive mode, global styles, popups, and forms.
2. A Logan component taxonomy JSON with headers, heroes, content blocks, room cards, experiences, testimonials, trust badges, blog cards, newsletter, and footer patterns.
3. A `logan-elementor-page-builder` skill that converts a page brief into section-by-section Elementor instructions.
4. A `logan-hospitality-copy-seo` skill that writes H1/H2/H3 structure, copy, meta title, meta description, FAQ ideas, CTA copy, and internal-link suggestions.
5. An `elementor-qa-auditor` skill with mobile, links, forms, popups, SEO, accessibility, and placeholder-text checks.
6. A “remove all placeholder content” scanner for Lorem ipsum, “Click Here,” duplicate headings, and missing client-specific details.
7. A “booking CTA map” spreadsheet or JSON file that lists every CTA label and destination by page.
8. A basic static playbook website that searches components and page recipes.
9. A staging-only script or tool that creates draft pages from a sitemap through WordPress REST API.
10. A staging-only Elementor template import workflow using Elementor’s JSON import or CLI import path.

## Interview Angle

Emily should not oversell “AI can build all your websites instantly.” The stronger interview angle is: “I’m comfortable learning Elementor quickly, following a component library, and using AI to speed up repetitive implementation, QA, and content organization without losing design judgment.” That directly matches Jeff’s described workflow where the lead designer builds the core system and the junior designer fills the website using the template and task checklist.

She can also say she is preparing by studying Elementor’s global design system, containers, templates, forms, responsive editing, and WordPress admin workflow. That is credible because Elementor’s global settings and Theme Style control site-wide typography, buttons, form fields, images, backgrounds, and design tokens ([Elementor Theme Style docs](https://elementor.com/help/theme-style-global-settings/), [Elementor design system docs](https://elementor.com/help/how-elementors-theme-style-and-design-system-options-work-together/)). She should frame AI as a quality multiplier: it can catch missing links, inconsistent CTAs, weak alt text, broken heading hierarchy, and incomplete copy before handoff.

## Risks and Guardrails

The biggest risk is assuming that an AI-generated Elementor template is production-ready because it imports successfully. A template can import and still have bad mobile stacking, weak typography, bloated nesting, broken links, missing alt text, or off-brand spacing. Elementor itself advises performance-minded layout choices, optimized images, reduced unnecessary HTML, and global fonts/colors for consistency and fewer requests ([Elementor performance course](https://elementor.com/academy/website-performance-optimization-in-elementor/)).

The second risk is direct production automation. WordPress Application Passwords are safer than main passwords because they are per-application and revocable, but any credential that can modify a site still needs HTTPS, limited roles where possible, secure storage, rotation, and staging-first testing ([WordPress Application Passwords](https://developer.wordpress.org/advanced-administration/security/application-passwords/)). MCP should never start with broad production admin access because WordPress MCP tooling can expose actions that create, modify, or delete important site assets ([Meow Apps Claude Code WordPress MCP guide](https://meowapps.com/claude-code-wordpress-mcp/)).

The third risk is confusing “fast” with “good.” Logan Marketing’s own business depends on conversion, SEO, PPC, remarketing, and direct revenue outcomes, not just pages that look filled in ([Logan Marketing](https://loganmarketing.com/)). The AI system should therefore optimize for fewer mistakes, faster iteration, better handoffs, and consistent conversion patterns, not just raw page-generation speed.

## Bottom Line

This role is highly systematizable because Logan’s hospitality sites share a repeatable Elementor/WordPress component language. The best immediate move is to give Emily a playbook and Claude Code skills that help her choose sections, fill copy, preserve brand tokens, check mobile, verify booking links, and hand off clean work. The best medium-term move is a private playbook website and staging-only automation for draft pages, media, template import, and QA. The best long-term move is a controlled MCP layer for staging that can inspect and update Elementor pages while respecting credentials, backups, and approvals.

Elementor is technically PHP plus JavaScript/TypeScript plus CSS/SCSS plus JSON-like template data, but the job skill is pattern execution. If Emily can learn the Logan component system, use Elementor’s global styles and templates correctly, and rely on AI for checklists and repetitive prep, she can become productive very quickly.
