---
name: logan-elementor-template-json
description: Use this skill when Mily wants a reusable Elementor template generated as a JSON file she can import through Templates → Saved Templates → Import. Triggers include "make me a template for…", "generate Elementor JSON", "importable template", "give me an Elementor template file", or "I want to reuse this section as a template". Do NOT use this skill for full page builds inside the editor (use logan-elementor-page-build), for picking which component to use (use logan-component-picker), or for any operation against a live production WordPress site (use logan-staging-automation, and only on staging).
---

# Make an Elementor template

## When to use this

Mily wants an Elementor template — a section, a page, or a reusable block — as a `.json` file she can import. The output is a valid Elementor template using modern Flexbox containers (not legacy Section/Column), conforming to Logan Marketing's inside-template patterns. The JSON gets imported through Templates → Saved Templates → Import on a staging site, checked visually, and then promoted to production by the lead.

## Trigger phrases

- "make me a template for [section type]"
- "generate Elementor JSON for…"
- "I want this as an importable template"
- "give me an Elementor template file"
- "I want to reuse this as a template"

## What you give Claude

- Template type (page or section)
- What the template represents (room page, things-to-do page, hero block, card grid block, etc.)
- Logan's Global Colors and Global Fonts (so the JSON references the right tokens)
- Any client-specific brand cues (colors, fonts, spacing) that override Logan defaults
- The intended target site (staging URL — production sites are off-limits for this skill)
- Optional: a sample Figma frame or a description of the desired layout

## What Claude gives back

- A valid Elementor template JSON, saved to a file Mily can download
- A short description of what's in the template (sections, widgets, container structure)
- Import instructions (Templates → Saved Templates → Import, on staging)
- A loud, prominent reminder that the template MUST be imported to staging first, visually checked in the Elementor editor, and verified against responsive views before any production use
- A list of what the template depends on (Elementor Pro features, specific plugins, image sizes) so Mily isn't surprised by missing widgets after import
- A note flagging anything that needs lead review (custom interactions, non-standard patterns, anything outside the inside-template library)

## Step-by-step

1. Confirm template type and target. If Mily mentions a production site, refuse and ask for staging.
2. Confirm the layout uses modern Flexbox containers, not legacy Section/Column. Always.
3. Reference Logan's Global Colors and Global Fonts by ID where possible, so the template inherits the client's brand on import.
4. Generate the JSON with the correct Elementor schema (top-level `version`, `title`, `type`, `content` array, `page_settings`).
5. Save the JSON to a file with a clear name (e.g., `logan-things-to-do-section.json`) so Mily can download it.
6. Write the import instructions in plain English.
7. End with the staging-first warning, prominent and unambiguous.

## Examples

**Input:** "Make me an Elementor template for a 3-card grid section — image on top, H3, two-line description, link. Will use it on the things-to-do page for The Maplewood Inn."

**Output:**

```
Generated: maplewood-card-grid-3.json

What's inside:
- One full-width Flexbox container (direction: row, gap: 24px, wrap: wrap on mobile)
- Three column Flexbox containers (direction: column, gap: 16px, equal width)
- Per column: image widget (4:3, 800x600 placeholder), heading (H3), text editor
  (2-line paragraph), button widget (text link style)

Dependencies: Elementor Free is enough — no Pro widgets used.

Import:
1. Go to Templates → Saved Templates → Import
2. Upload maplewood-card-grid-3.json
3. Open the new template in the editor
4. Verify it on desktop, tablet, mobile views
5. Replace placeholder images and copy with real content

⚠️ STAGING ONLY. Do not import this directly to a production site. Bring it into
staging first, eyeball it in the editor at all three breakpoints, then have the lead
sign off before promoting anything to production.

Flag for lead: this uses a 24px row gap and 16px column gap. If the inside-template
default is different, override locally on import or ask the lead before saving as
a global pattern.
```

## Notes

- Elementor templates are JSON. The `type` field matters: `page` for full pages, `section` for reusable section blocks. Stay in the modern Flexbox container schema, not the legacy Section/Column schema. Legacy is being deprecated and Logan's stack uses containers.
- Global tokens: where possible, reference Logan's Global Color and Global Font IDs (e.g., `globals.colors.primary` instead of a hex value). This way the template adopts the destination site's brand on import.
- Image placeholders: use Elementor's default placeholder image references in the JSON, not hotlinks to external images. Mily replaces them after import.
- Pro vs Free: flag every widget that requires Elementor Pro. Some Logan sites are Pro, some are not — Mily needs to know before import.
- Staging-first is a hard rule. JSON imports can carry over global style overrides, broken widgets from version mismatches, or unexpected page settings. Always check on staging before production.
- Version mismatch: if the destination Elementor version is older than the version the JSON was generated against, widgets can disappear or render wrong. Flag the version assumption in the output.
- The template should be a starting point for Mily and the lead, not the final word. The lead reviews and sign-offs anything that's becoming a Logan-wide pattern.
- Related skills: logan-staging-automation (importing the template via REST API on staging), logan-elementor-page-build (when Mily is building from a template, not making one), logan-elementor-qa (after import, before lead review).
- Adam built this skill so Mily can speed up repetitive sections without hand-building each time. Treat the JSON as a draft, never as the source of truth.
