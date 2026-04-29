---
name: logan-elementor-page-build
description: Use this skill when Mily has a page assignment and wants a step-by-step build plan tailored to Logan Marketing's Elementor template and component library. Triggers include "help me build a [page type]", "what sections should I use for…", "give me a build plan for…", "I'm starting the about page", or any moment a junior designer is staring at a blank Elementor canvas with copy and images in hand. Do NOT use this skill to design new templates from scratch (that's the lead designer's job), to generate raw Elementor JSON (use logan-elementor-template-json), or to QA a finished page (use logan-elementor-qa).
---

# Build a page

## When to use this

Mily has a page assignment — about, things to do, a single room, area attractions, a gallery, a blog post — and she wants Claude to walk her through it section by section using Logan Marketing's existing inside template. The output is a build plan: which template components to drop in, in what order, with which copy and images. This is the daily junior workflow, not a design exercise.

## Trigger phrases

- "help me build a [page type]"
- "what sections should I use for the about page"
- "give me a build plan for the things-to-do page"
- "I'm starting the rooms page, walk me through it"
- "blank canvas — where do I start"

## What you give Claude

- Page type (home, about, rooms, single room, things to do, gallery, blog, contact, custom)
- Client property name and location (for voice and SEO context)
- The page brief or content brief from the lead, if there is one
- Source copy (paste it in, or note "no copy yet — generate placeholders")
- Image list or image folder description (or "no images yet")
- Booking link, if relevant
- Any deviations the lead has called out from the standard inside template

## What Claude gives back

A build plan with:

1. Page meta — proposed H1, meta title, meta description, slug
2. Section-by-section list — which inside-template component to use, in what order
3. Copy placement — exactly which paragraphs go in which widget
4. Image needs — sizes and aspect ratios per section, with alt text suggestions
5. CTA placement — where the "Book Your Stay" or property-specific CTA lives
6. Internal links — what to link to (rooms, contact, things to do)
7. A self-QA checklist tied to logan-elementor-qa for after the build

## Step-by-step

1. Confirm page type and pull the matching Logan recipe (home, room, area, blog, etc.)
2. Read the source copy. Identify the natural breaks — intro, body sections, CTA, supporting blocks.
3. Map each copy block to an inside-template component. Stick to the library; don't invent.
4. For images, list dimensions and where each one lives in the layout. Flag missing images.
5. Order the sections top-to-bottom in the order they should appear on the page.
6. Note any spots where Mily should pause and ask the lead before continuing (unusual content, missing brand cue, ambiguous brief).
7. End with a 5-line "after you build" checklist: heading hierarchy, mobile pass, alt text, links, page meta.

## Examples

**Input:** "Help me build the things-to-do page for The Maplewood Inn, a B&B in Hudson Valley. Copy is attached. I have 12 photos of local spots."

**Output (abbreviated):**

```
H1: Things to Do Around the Maplewood Inn
Meta title: Things to Do in the Hudson Valley | The Maplewood Inn
Meta description: Hike Bear Mountain, taste local cider, explore Cold Spring antique
shops — the Hudson Valley around our Hudson Valley B&B.

Sections (top to bottom):
1. Page-intro block — H1 + 2-sentence intro about the area
2. Two-column image+text — fall foliage drives (paragraph 1 of copy + 2 images)
3. Card grid (3 cards) — Cold Spring, Beacon, Garrison (1 photo each + 2-line blurb)
4. Two-column text+image — wineries section (paragraph 2 + 1 image)
5. Card grid (3 cards) — featured wineries
6. Pull quote — guest comment about the area
7. CTA block — "Plan Your Hudson Valley Getaway" → /book-now

Image needs: hero 1920×1080, card grid 800×600 each, 4:3 aspect.
After build: run logan-elementor-qa.
```

## Notes

- Default to the Gothic Eves inside template as the canonical component library reference until Mily confirms a different template for the client.
- Hospitality voice rules: warm, place-rooted, sensory, specific. Tuesday-morning blueberry scones beats "delicious breakfasts." Avoid "stunning," "luxurious," "breathtaking."
- If copy is missing for a section, generate one short placeholder and clearly label it `[draft — replace with real copy]` so Mily doesn't ship it.
- Always end with a CTA back to booking. Hospitality pages without a booking path lose the lead.
- If Mily mentions images that look like they need resizing or compressing, point her at the image-optimization reference in the suite playbook.
- Related skills: logan-component-picker (when she's not sure which section fits), logan-hospitality-copy-seo (when the copy itself needs work), logan-elementor-qa (after the build), logan-pm-handoff (after QA).
- Adam built this skill for Mily. Stay in lane: junior designer filling pages from a template, not a lead redesigning systems.
