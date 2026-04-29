---
name: logan-elementor-qa
description: Use this skill when Mily has finished a page (or thinks she has) and wants to QA it before handing off to PM or before the lead reviews it. Triggers include "QA this page", "check my work", "ready for handoff?", "audit this page before I send it", "is this done", or any moment a page is built and Mily wants a structured check. Do NOT use this skill mid-build (use logan-elementor-page-build), for fixing specific broken behavior (use logan-elementor-troubleshoot), or for writing the actual handoff message (use logan-pm-handoff after this passes).
---

# Check my work

## When to use this

A page is built. Before it goes to PM or the lead, run a structured pre-handoff QA on it. This skill audits heading hierarchy, alt text, links, mobile/tablet layout, brand consistency, placeholder content, page meta, booking path, accessibility basics, and Logan-specific patterns. Pass/fail with notes.

## Trigger phrases

- "QA this page"
- "check my work"
- "ready for handoff?"
- "audit this page before I send it"
- "is this page done"

## What you give Claude

- The page URL (staging or local) so the audit is concrete
- The client property name and any client-specific QA rules the lead has called out
- Any deviations from the inside template Mily made on purpose (so the QA doesn't flag them as bugs)
- Whether this is a single-page check or part of a multi-page handoff

## What Claude gives back

A structured audit:

1. **Heading hierarchy** — H1 unique, H2/H3 in order, no skipped levels
2. **Alt text** — every non-decorative image has descriptive alt text in Logan's pattern
3. **Links** — internal links work, external links open in new tab where appropriate, no broken
4. **Responsive** — desktop, tablet, mobile look right; no overflow, no overlap
5. **Brand consistency** — Global Colors and Global Fonts used everywhere, no rogue values
6. **Template adherence** — page matches the inside-template patterns; deviations are intentional and documented
7. **Placeholder content** — no Lorem ipsum, no `[draft]` markers, no stock greeting copy
8. **Page meta** — meta title, meta description, slug, featured image set
9. **Booking path** — at least one CTA leads to the booking flow
10. **Accessibility basics** — color contrast, form labels, link text not "click here"

Each item is pass / fail / flag, with a one-line note when failed or flagged. Bottom line: ready for handoff or not, with the smallest set of fixes needed to ship.

## Step-by-step

1. Pull the URL. If it's local, ask Mily to push to staging first — QA on a real URL catches more.
2. Run through the 10 checks in order. Don't skip ahead.
3. For each check, mark pass / fail / flag. A flag is "probably fine but Mily should look once more."
4. Compile the failures into a fix list, smallest first.
5. End with a clear verdict: ready for PM (no blockers), almost ready (small fixes), or not yet (big issues).
6. If the page is not ready, do not write the PM handoff. Send Mily back to logan-elementor-troubleshoot or logan-elementor-page-build for the gap.

## Examples

**Input:** "QA the things-to-do page at https://maplewood-staging.example.com/things-to-do"

**Output (abbreviated):**

```
Audit of /things-to-do — pass/fail summary:

1. Heading hierarchy — PASS (one H1, four H2s, two H3s, no skipped levels)
2. Alt text — FAIL (3 images have empty alt: cold-spring-1.jpg, beacon-2.jpg,
   wineries-hero.jpg)
3. Links — FLAG (one external link to "visithudsonvalley.com" opens in same tab —
   should be new tab)
4. Responsive — PASS (checked desktop, tablet 768px, mobile 375px)
5. Brand consistency — PASS (all colors and fonts pulling from globals)
6. Template adherence — PASS (matches inside-template card-grid pattern)
7. Placeholder content — FAIL (one paragraph reads "Add winery copy here" — looks
   like a placeholder Mily forgot)
8. Page meta — FAIL (meta description is empty)
9. Booking path — PASS (CTA to /book-now at the bottom)
10. Accessibility — PASS (contrast and link text both clean)

Verdict: NOT YET. Fix list, smallest first:
- Set 3 alt texts (1 min)
- Open the external link in a new tab (30 sec)
- Replace the "Add winery copy here" paragraph (depends on copy)
- Write the meta description (use logan-hospitality-copy-seo)

Estimated time to ready: 15–20 minutes.
```

## Notes

- Always QA on a real URL (staging is fine) on a real device or at least real browser, not just the Elementor editor preview.
- Heading hierarchy is the most common failure. The Elementor heading widget lets Mily change visual size and HTML tag separately — that's where the gap appears. Always check the HTML tag dropdown, not just the visual size.
- Alt text rules: descriptive, property-name-anchored, no "image of" or "photo showing." Empty alt is correct only for truly decorative images (pattern dividers, etc.).
- Mobile QA: pull out an actual phone if possible. Editor mobile view is close but not identical to a real device.
- Brand consistency check: open the Elementor navigator and look for any value not pulling from a global. The indicator dot in the editor flags local values.
- Placeholder content: search the page (Cmd/Ctrl + F in browser) for "Lorem", "[draft", "TODO", "fix me", "lorem", "placeholder", "TBD". Cheap and catches a lot.
- Page meta: meta title 50–60 chars, meta description 140–160 chars, slug clean (no `?p=42`), featured image set (used in card displays elsewhere on site).
- Booking path: every hospitality page should have at least one CTA to the booking flow. Single-room pages should have a direct "Book This Suite" button.
- Accessibility basics: color contrast (use a checker if unsure), form labels present, no "click here" link text, decorative images empty alt.
- Logan-specific deviations: the lead may have called out a custom pattern for this client. Note it before running QA so it doesn't get flagged.
- Related skills: logan-elementor-troubleshoot (when something fails QA and Mily isn't sure why), logan-hospitality-copy-seo (when copy or meta needs fixing), logan-pm-handoff (after this passes).
- Adam built this skill so Mily catches her own work before PM does. It saves Mily a round of back-and-forth and makes her look sharp.
