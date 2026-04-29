---
name: logan-figma-handoff
description: Use this skill when Mily has been handed a Figma file by the lead designer and needs to translate it into an Elementor build. Triggers include "translating from Figma", "got a Figma file from [lead]", "Figma to Elementor", "how do I read this Figma", "what's the Elementor equivalent of auto-layout", or any moment Mily is inspecting a Figma frame and trying to figure out what to actually build. Do NOT use this skill for original Figma design work (that's the lead's job), for building pages without a Figma reference (use logan-elementor-page-build), or for editing the Figma file itself.
---

# Read a Figma file

## When to use this

The lead designer hands Mily a Figma file. She needs to read it like a junior — pulling spacing, color, typography, layout, and breakpoint behavior — and translate it into an Elementor build using modern Flexbox containers. This skill maps Figma concepts to Elementor concepts, calls out what's safe to assume and what to ask, and lists the common translation traps.

## Trigger phrases

- "translating from Figma"
- "got a Figma file from the lead"
- "Figma to Elementor"
- "how do I read this Figma"
- "what's the Elementor version of auto-layout"

## What you give Claude

- The Figma frame Mily is working from (a screenshot, a copied spec, or a description)
- Whether the lead provided dev-mode access or just view access
- The breakpoints in the Figma file (1920, 1440, 1024, 768, 375 — whatever exists)
- Anything the lead called out specifically (a custom interaction, a non-template section, a one-off color)
- The target Elementor template (usually Logan's inside template)

## What Claude gives back

- A Figma → Elementor mapping for the frame (auto-layout to flex container, color styles to globals, text styles to global fonts, spacing to padding/margin, frame variants to saved templates)
- A breakpoint plan: how the desktop frame should behave at tablet and mobile, even if the Figma file doesn't show those breakpoints explicitly
- A "what to ask the lead" list — anything genuinely ambiguous (interaction, edge case, missing breakpoint)
- A "what to figure out yourself" list — things that are literal absences but standard (Logan's normal mobile padding, default link color, default button style)
- Common translation traps to watch for in this specific frame

## Step-by-step

1. Confirm Mily can read the Figma file. View access is enough for spacing, color, type, and layout; dev mode helps but isn't required.
2. Identify the layout. Which Figma frames are auto-layout? Those become Elementor flex containers (direction, gap, padding map directly).
3. Pull color values. Match them against Logan's Global Colors. If a value isn't in globals, that's a flag — don't add a one-off color, ask.
4. Pull type styles. Match against Global Fonts. Same rule — if a style isn't in globals, ask.
5. Pull spacing. Figma auto-layout gap maps to Elementor container gap. Padding maps to padding. Watch for the trap below.
6. Plan breakpoints. Figma usually shows desktop only or desktop + 1 mobile frame. Map the standard Logan responsive behavior for in-between sizes.
7. List ambiguities for the lead. List standard assumptions Mily can make on her own. Be explicit about which is which.
8. Flag the common traps for this frame (see Notes).

## Examples

**Input:** "Got a Figma frame from the lead for the things-to-do page hero. Desktop only, 1440 wide. Has a background image, an H1, a subhead, and a CTA button. Auto-layout vertical with 24px gap."

**Output:**

```
Elementor build:
- Flex container, direction: column, gap: 24px (matches Figma auto-layout)
- Container width: full width, padding: 80px top/bottom (Logan inside-template default
  for hero — confirm with lead if frame shows different)
- Background image: set on the container, size: cover, position: center
- Heading widget (H1) — use Global Font heading-1
- Heading widget (H2 or paragraph, check Figma type style) — use Global Font subhead
- Button widget — use Global Style button-primary
- Mobile: container should stay column. Reduce padding to 40px top/bottom. H1 size
  drops one step (Logan global font handles this if breakpoints are set on the global).

Ask the lead:
- "Frame is 1440 desktop only — what's the mobile spacing target?"
- "Background image — should it be parallax, fixed, or scroll?"

Figure out yourself:
- Logan's default mobile hero padding (40px top/bottom)
- Default button style (use button-primary global)

Common traps for this frame:
- Figma auto-layout gap behaves slightly differently from Elementor flex gap on
  wrapped rows. Test if anything wraps on tablet.
- Background images in Figma render through Figma's compression. The original asset
  in the Figma file is what should go to Elementor (export at 2x).
- If the H1 looks heavier in Figma than in browser, it's font rendering, not a real
  difference. Don't bump the weight.
```

## Notes

- Figma → Elementor mental map: auto-layout = Flexbox container; frame variants = saved templates; color styles = Global Colors; text styles = Global Fonts; spacing tokens = container padding and gap; constraints = container width and align-self.
- Breakpoint defaults: Figma at 1920/1440 = Elementor desktop; 1024 = tablet (Elementor's tablet breakpoint, often 1024px and below); 768 = also tablet edge; 375 = mobile.
- If a value (color, font, spacing) isn't in Logan's globals, that's a flag. Junior designers do not add one-off globals. Ask the lead.
- Figma auto-layout gap and Elementor container gap behave differently in edge cases (especially with wrapped rows and nested auto-layout). When in doubt, test in the editor and check at the smallest breakpoint.
- Image masks, blend modes, and effects in Figma often don't translate 1:1 to Elementor. If the design uses them, ask the lead before improvising.
- Font rendering differs between Figma and browsers. Don't change weight or size to "match" Figma unless the lead specifically calls it out.
- Dev mode is helpful but not required. Mily should be comfortable reading the inspect panel for spacing, colors, and type without it.
- Default rule: literal absences (no mobile frame, no hover state, no error state) — assume Logan's standard. Genuine ambiguity (custom interaction, unusual color, non-template layout) — ask the lead.
- Related skills: logan-elementor-page-build (after the Figma is translated into a plan), logan-component-picker (when a Figma section doesn't obviously match a Logan component), logan-elementor-qa (after the build).
- Adam wrote this skill so Mily can translate a Figma file without panicking and without redesigning.
