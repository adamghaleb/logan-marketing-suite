## What

Write the long-form content that fills the suite: Logan component playbook, Elementor tutorials, and practice briefs. Plain English on top, technical depth in `<details>` collapsibles where relevant.

## Source files (read first)

- `elementor-logan-marketing-ai-workflow-report.md` — research report (component patterns, workflow)
- `SPEC_LOGAN_TOOLKIT.md` — original spec sections on practice and reference
- `.design-incoming/logan-marketing-suite/project/mily-pages.jsx` — `PATTERNS` and `STUDIES` arrays for tone reference
- `BINGUS.md` — for voice cues

## Files to create

### Logan component playbook (12 entries)

`content/playbook/<slug>.mdx` — one file per pattern. Pull pattern names + descriptions from the research report. Each MDX:

```mdx
---
title: "<plain-english name>"
slug: "<slug>"
order: <n>
---

## What it is

## When to reach for it

## What makes it Logan

## What to watch for

<details>
<summary>How to actually build it in Elementor</summary>
<technical detail>
</details>
```

Suggested 12 patterns (research-derived; rename if a better fit emerges):

1. Hero block — full-width photo + soft headline
2. Welcome card — short copy + signature
3. Rooms grid — 3-up, photo-first
4. Booking widget strip — sticky-on-scroll
5. Testimonial pull-quote — slow fade
6. Slow-fade gallery
7. Amenity icons row
8. Local-area map block
9. Press / "as seen in" strip
10. Newsletter signup — single-field
11. Footer — three columns + small print
12. CTA banner — calm, one button

### Elementor tutorials (4 starter)

`content/tutorials/<slug>.mdx`:

1. `01-build-a-hero-from-a-figma-frame.mdx`
2. `02-create-a-reusable-room-card-template.mdx`
3. `03-fix-a-misaligned-section-on-mobile.mdx`
4. `04-write-and-attach-a-page-meta-block.mdx`

Each tutorial: plain-English steps, a `<details>` with the literal Elementor clicks/widgets used, expected time, common gotchas.

### Practice briefs

- `content/practice/sample-brief.mdx` — a fictional "Cedar & Stone Inn" brief Mily can practice against (audience, voice, must-haves, constraints, deliverable)
- `content/practice/exercises.mdx` — 6 practice exercises (10–40 min each), modeled after `mily-pages.jsx` PRACTICE list
- `content/practice/rubric.mdx` — a 1-page self-review rubric (warmth, clarity, image choice, type rhythm, mobile feel)

## Acceptance criteria

- [ ] 12 playbook MDX files
- [ ] 4 tutorial MDX files
- [ ] 3 practice MDX files (sample-brief, exercises, rubric)
- [ ] All MDX files have valid frontmatter (`title`, `slug`)
- [ ] Plain-English first; technical detail in `<details>`
- [ ] Hospitality voice; warm, specific, no AI-flavor filler
- [ ] Files ≤ 200 lines each

## Batch

batch-1 (parallel with #1, #2, #4 — different directories, no overlap)
