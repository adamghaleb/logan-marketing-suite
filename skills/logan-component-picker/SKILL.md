---
name: logan-component-picker
description: Use this skill when Mily knows what page she's building but doesn't know which Logan inside-template components to use. Triggers include "what section do I use for…", "I'm building a [page type] but I'm stuck", "blank page paralysis", "which component fits this copy", or "I have a paragraph and three images, what goes here". Do NOT use this skill for full page build plans (use logan-elementor-page-build), generating Elementor template JSON (use logan-elementor-template-json), or designing new components (that's the lead's job).
---

# Pick the right section

## When to use this

Mily is staring at a blank Elementor canvas, or at a half-built page with a chunk of copy and a few images and no idea which inside-template block fits. She doesn't need a whole build plan — she just needs to answer one question: "what section do I use here?" This skill asks two or three short questions and returns a recommended component with a short reason why.

## Trigger phrases

- "what section do I use for this paragraph"
- "I'm building a rooms page — what components"
- "blank page paralysis"
- "which component fits this copy"
- "is this a card grid or a two-column"

## What you give Claude

- Page type (or section purpose, like "intro," "social proof," "list of things")
- The copy you're trying to place, or a short description of it
- How many images you have, if any
- Any constraint the lead mentioned (e.g., "no carousels on this site")

## What Claude gives back

- One recommended component from the Logan inside-template library
- A second-best alternative, with a one-line reason to use it instead
- Where in the page hierarchy it usually lives (top, middle, bottom)
- A note on common copy length and image count for that component
- A red flag if the copy doesn't fit the component cleanly, with a suggested fix

## Step-by-step

1. Identify the page type and the section's job. Intro? Body? Social proof? CTA?
2. Match against the Logan inside-template component list (hero variants, two-column image+text, card grid, pull quote, testimonial block, CTA block, gallery, map, FAQ, list module).
3. Pick the component whose typical copy length and image count fit best.
4. If two components fit, pick the simpler one. Junior designers should bias toward the simpler block.
5. Return the recommendation with a one-line "why" and a one-line "if not this, then…"
6. Flag any spot where the copy needs trimming or expanding to fit the component.

## Examples

**Input:** "I have a 2-paragraph intro about the inn's history and one wide photo of the building. About page, near the top."

**Output:**

```
Use: two-column image+text component
Why: 2 paragraphs is too long for a centered intro block but right for a 50/50 layout
with a hero-adjacent feel. The wide photo crops cleanly to the column.
If not that: page-intro block (single column, centered) — but you'll want to drop one
of the paragraphs.
Lives: top of the page, right after the H1 hero.
Image: 800×1000 portrait crop works best for the column.
Heads up: if the photo is landscape only, the 50/50 will feel short. Crop to 4:5 or
swap to the page-intro block.
```

## Notes

- Default Logan inside-template components (until Mily confirms otherwise from the lead): page-intro, two-column image+text, two-column text+image, card grid (3 or 4 cards), pull quote, testimonial block, CTA block, gallery grid, map embed, FAQ accordion, list module, full-width image band.
- If she names a component that isn't in the standard library, ask the lead before building. Don't invent.
- Hospitality bias: prefer specific, photo-rich components (cards, two-column) over generic text blocks. Inn websites earn bookings on imagery.
- If she's building a single room page, the standard recipe is: hero photo + room name H1, two-column key features, gallery, amenities list, rate/booking widget, related rooms.
- If she's building a things-to-do page, the standard recipe is: page-intro, two-column area context, card grid (attractions), card grid (food/wineries), CTA back to booking.
- Related skills: logan-elementor-page-build (for the whole page), logan-hospitality-copy-seo (if copy needs polishing to fit a component).
- Adam made this skill so Mily can move past blank-canvas paralysis in under a minute.
