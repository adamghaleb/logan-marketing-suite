---
name: logan-elementor-troubleshoot
description: Use this skill when something in Elementor or WordPress is broken, slow, weird, or not behaving the way Mily expects. Triggers include "Elementor is being weird", "this won't save", "the page looks broken", "mobile doesn't match the editor", "I can't drag this widget", "image won't upload", "form isn't sending", "I changed something and now…", or any "is it me or is it Elementor" moment. Do NOT use this skill for design decisions (use logan-component-picker), full QA passes (use logan-elementor-qa), or anything that requires editing theme files, plugins, or the database — those go to the lead.
---

# Fix something broken

## When to use this

Something in Elementor isn't working. The page looks broken, a widget setting disappeared, mobile doesn't match the editor, an image won't upload, a form won't send, the editor is slow. Mily wants a calm, specific answer with a fix and a "if that didn't work, then…" path. This skill walks symptom → diagnosis → fix for the most common Elementor problems, ordered by frequency.

## Trigger phrases

- "Elementor is being weird"
- "this won't save"
- "the page looks broken"
- "mobile doesn't match the editor"
- "I can't drag this widget where I want"
- "image won't upload"
- "the form isn't sending"
- "I changed something and now [bad thing]"

## What you give Claude

- A short description of the symptom (what was the last thing changed, what's not working now)
- Where you're seeing it (editor, preview, real device, real browser)
- Whether you can reproduce it (every time, sometimes, only after save)
- Browser and whether you've cleared cache
- Whether the issue is on a single page or sitewide

## What Claude gives back

- Most likely diagnosis (in plain English)
- The exact fix steps
- One alternative diagnosis if the first fix doesn't work
- A clear escalation line — "if neither of those works, stop and ping the lead before trying anything else"
- A note on what NOT to touch (theme files, plugins, the database, anything custom)

## Step-by-step

1. Read the symptom. Don't jump to a fix until you've identified what's actually broken.
2. Pick the most likely cause from the common-issues list (below in Notes).
3. Give the fix in numbered steps.
4. Offer one alternative if the first doesn't land.
5. If neither path works, escalate. Junior designers do not edit theme files, plugin files, or custom code.

## Examples

**Input:** "I changed the H2 color to one of the global colors but it's still showing the old color on the live page. Mobile editor view shows it correct."

**Output:**

```
Most likely: a local color override is still set on that heading widget. Global
colors only "win" when there's no local value overriding them.

Fix:
1. Open the heading widget.
2. Go to the Style tab.
3. Find the Color property.
4. Right-click the property label and choose Reset.
5. Reapply the global color from the dropdown.
6. Save.
7. On the live page, hard-refresh (Cmd/Ctrl + Shift + R) to clear browser cache.

If that didn't work: it might be CSS cache. Go to Elementor → Tools → Regenerate
CSS, then Files & Data → Regenerate Files. Save. Hard-refresh.

If neither works: stop. Ping the lead. There may be a theme-level override or a
plugin overriding heading styles, and that's not yours to touch.

Don't touch: theme files, plugins, custom CSS in the WP customizer.
```

## Notes

Common Elementor issues, ordered by frequency:

- **"Page looks broken after a change"** → Elementor → Tools → Regenerate CSS, then Regenerate Files. Hard-refresh browser.
- **"Mobile editor looks fine, real phone broken"** → Browser cache first (clear or hard-refresh on the phone). Then check responsive overrides at the right breakpoint.
- **"Widget setting disappeared after Elementor update"** → Check Elementor → Settings → Experiments. New experiments default on/off can hide settings. Also check plugin compatibility (especially with Elementor Pro version).
- **"Editor slow or freezing"** → Disable other plugins one at a time. Check browser memory (close tabs). Reduce image sizes on the page. If still slow, ping the lead.
- **"Can't drag a widget where I want"** → It's the container's Direction (row vs column) and Justify Content. Check the parent container's flex settings.
- **"Container won't resize"** → Check Width (full vs boxed), min-height, and align-self vs container alignment. Often the issue is the parent container's settings, not the widget itself.
- **"Heading wrong color despite global color set"** → Local override exists. Right-click property → Reset. Then reapply the global.
- **"Image won't upload"** → File too large, or unsupported format. Check WP upload limit (typically 64–128MB). Check format (JPG, PNG, WebP). Compress and retry. If hosting limit, escalate.
- **"Form not sending"** → Check Elementor form Actions After Submit (Email action configured, recipient set). Check spam folder. SMTP issues are a lead-level problem; don't try to fix SMTP yourself.
- **"Site slow on mobile"** → Image size first (most common). Lazy loading. If neither, escalate to lead — could be hosting or plugin bloat.
- **"I broke something I can't undo"** → Don't panic-publish. Check the Elementor history panel (bottom-left, clock icon). Check WP Revisions on the page. Most things are recoverable.

What to NEVER touch without lead approval:

- Theme files
- Plugin code
- WordPress core
- The database
- Custom CSS in the customizer (Elementor's custom CSS at widget level is fine if you know what you're doing; site-wide custom CSS is not)
- Plugin updates, Elementor updates, WordPress core updates
- User accounts, settings, permissions

When to STOP and ask the lead:

- The fix requires editing files
- The fix requires installing/updating a plugin
- The fix didn't work and you're about to try a third thing
- You don't recognize what's happening at all
- It's affecting more than one page

Related skills: logan-elementor-qa (catches some of these before they reach production), logan-staging-automation (for safer experimentation on staging).

Adam built this skill so Mily can fix the routine 90% calmly and escalate the other 10% without spinning.
