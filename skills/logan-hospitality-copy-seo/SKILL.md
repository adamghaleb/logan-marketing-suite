---
name: logan-hospitality-copy-seo
description: Use this skill when Mily needs hospitality-voice copy or SEO meta for a Logan Marketing client site. Triggers include "write copy for…", "give me 3 meta descriptions", "what should the H1 be", "alt text for this image", "rewrite this paragraph in Logan's voice", "FAQ ideas for the rooms page", or "CTA copy for the booking section". Covers home pages, room pages, amenities, area guides, dining, spa, blog posts, and CTAs. Do NOT use this skill to write copy for industries other than hospitality, to do hard SEO strategy work (keyword research, backlink audits — that's outside scope), or to write long-form blog content from scratch without a brief.
---

# Write copy + SEO meta

## When to use this

Mily needs hospitality copy or SEO meta in Logan Marketing's voice — warm, unhurried, place-rooted, sensory, specific. This skill writes or revises H1/H2/H3 hierarchy, body copy, meta titles, meta descriptions, FAQ candidates, image alt text, and CTA copy for boutique inns, B&Bs, ranches, small hotels, and similar properties.

## Trigger phrases

- "write copy for the [page] page"
- "give me 3 meta descriptions for…"
- "what should the H1 be for the rooms page"
- "alt text for this image"
- "rewrite this paragraph in Logan's voice"
- "FAQ ideas for the things-to-do page"
- "CTA copy for the booking section"

## What you give Claude

- Property name, type (B&B, inn, ranch, boutique hotel), and town/region
- Page type (home, room, things-to-do, dining, spa, blog, contact, etc.)
- Source copy if any, or a brief if not
- Specific things to mention (named breakfast item, named local winery, room features, square footage, view direction)
- Target keyword if there is one (e.g., "Hudson Valley bed and breakfast")
- Length constraint, if any

## What Claude gives back

Depending on what was asked:

- **H1/H2/H3:** specific, value-prop-led headings, not just the property name
- **Body copy:** 1–3 paragraph blocks in hospitality voice
- **Meta title:** 50–60 chars, format `Property Name | Type + Location` or close
- **Meta description:** 140–160 chars, location keyword + value prop + soft CTA
- **Alt text:** property name + descriptive subject + (optional) season/feature
- **CTA copy:** specific verbs ("Reserve your suite", "Plan your weekend", "Book your stay") not generic ("Click here", "Submit")
- **FAQ candidates:** 5–8 questions phrased like real guests would ask, each with a 1–2 sentence answer
- 3 options when generating short-form things (titles, metas, CTAs); 1 option when generating long-form things (paragraphs)

## Step-by-step

1. Confirm property name, location, and page type. Without those, voice will be generic.
2. If revising existing copy, read it for typos, voice misses, and clichés ("stunning," "luxurious," "breathtaking," "world-class") before rewriting.
3. Anchor every paragraph in something concrete — a named room, a named dish, a named trail, a specific view. Generic claims get cut.
4. For meta titles and descriptions, include the location keyword naturally. Don't keyword-stuff.
5. For headings, prefer descriptive over decorative. "Wraparound porch with Adirondack views" beats "Beautiful outdoor spaces."
6. For CTAs, use property-specific verbs over generic ones. "Reserve your suite" not "Submit."
7. If you flag something as a copy concern (factual claim, voice issue, ambiguous policy), put it in a separate "for client review" block, not inside the deliverable.

## Examples

**Input:** "Write a 2-paragraph intro for the home page of The Maplewood Inn, a 6-room B&B in Cold Spring, NY. Mention the wraparound porch, the Tuesday blueberry scones, and the river view."

**Output:**

```
H1: A Cold Spring inn made for slow weekends

Body:
Six rooms, a wraparound porch, and a view of the Hudson that turns gold around 6pm.
The Maplewood Inn sits a five-minute walk from the river and ten minutes from the
Cold Spring train, which means you can leave the city after lunch and be sitting on
the porch by dinner.

Breakfast is at 8:30. On Tuesdays, blueberry scones; on Saturdays, a poached pear
that has converted at least three skeptics. You eat slow, then walk into town, then
come back for tea. That's the whole idea.

Meta title: The Maplewood Inn | Cold Spring NY Bed and Breakfast (54 chars)
Meta description: A 6-room Hudson Valley B&B in Cold Spring with a wraparound
porch, river views, and Tuesday-morning blueberry scones. Reserve your weekend.
(150 chars)

Suggested CTA: Reserve your weekend
```

## Notes

- Hospitality voice: warm, unhurried, specific, sensory, place-rooted. The reader should picture themselves on the porch.
- Cliché blacklist: stunning, breathtaking, luxurious, world-class, oasis, retreat, escape (as a noun), elegant.
- Specificity wins. "Tuesday-morning blueberry scones" beats "delicious breakfast." Named places beat regions.
- Meta title length cap: 60 chars (Google truncates beyond ~580px). Meta description: 140–160 chars.
- For alt text, do not start with "image of" or "photo showing." Just describe the subject.
- Local SEO basics: include city/region in meta title, meta description, and at least one H2. Keep NAP (name/address/phone) consistent with what's in the footer and on Google Business Profile.
- Default to writing 3 options for short-form (titles, metas, CTAs) so Mily can pick. Default to 1 option for paragraphs so feedback is sharper.
- Things to flag for client review (don't fix yourself): pricing claims, policy claims, factual claims about the property, voice changes from the existing site, anything that contradicts what's already published.
- Related skills: logan-elementor-page-build (when copy is part of a full build), logan-elementor-qa (where copy gets caught one more time before handoff).
- Adam built this skill so Mily catches the copy before it ships, even when the brief is thin.
