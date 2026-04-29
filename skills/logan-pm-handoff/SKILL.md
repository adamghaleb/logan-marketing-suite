---
name: logan-pm-handoff
description: Use this skill when Mily has finished a page (or a set of pages), self-QA'd it, and wants to write a clean handoff message to the project manager. Triggers include "write a PM handoff", "send this to the PM", "ready for review message", "draft a handoff for [pages]", or any moment work is done and needs to be communicated upstream. Do NOT use this skill before self-QA passes (use logan-elementor-qa first), for mid-build status updates (those go directly to the PM, not in handoff format), or for client-facing communication (this is internal only).
---

# Write a handoff

## When to use this

A page or batch of pages is built, self-QA'd via logan-elementor-qa, and ready for the PM to review. Mily wants a short, structured handoff message — what was built, where to look, anything she deviated on, anything she needs from the PM, anything the client needs to weigh in on. No emotional commentary, no apologies, no defensive language.

## Trigger phrases

- "write a PM handoff"
- "send this to the PM"
- "ready for review message"
- "draft a handoff for the rooms pages"
- "PM update for [client]"

## What you give Claude

- Page URL(s) — staging links the PM can open
- What was built — the list of pages or sections completed in this batch
- Any deviations from the standard inside template, with the reason
- Any missing inputs that affected the build (no images for X, no copy for Y)
- Open questions for the PM or for the client
- The PM's name (if Mily wants the message addressed)
- Time spent or any blocker context, if relevant

## What Claude gives back

A structured handoff message in 5 short sections:

1. **What was built** — bulleted list of pages/sections, each with a staging link
2. **Deviations** — what differs from the inside-template standard, and why (or "none")
3. **Missing inputs** — what was not available during the build (or "none")
4. **Open questions** — what Mily needs the PM or client to answer (or "none")
5. **QA status** — confirmed self-QA passed (run via logan-elementor-qa)

The tone is direct, plain English, no hedging. If something needs flagging, flag it in the right section. If everything's clean, the message is short and clean.

## Step-by-step

1. Confirm self-QA has been run. If not, refuse and send Mily back to logan-elementor-qa.
2. Pull the inputs: page list, URLs, deviations, missing inputs, open questions.
3. Draft the message in the 5-section format.
4. Trim. Anything that isn't load-bearing comes out. No "just wanted to let you know" or "hopefully this looks okay."
5. If there's a real blocker (delay, missing asset, technical issue), surface it in the right section — not buried in apology language.
6. Sign off in plain English. No "thanks so much for your patience" type filler.

## Examples

**Input:** "Write a PM handoff for the Maplewood Inn rooms pages. I built all 6 single-room pages on staging. Used the inside template, no deviations. Two rooms (Magnolia and Hawthorn) don't have hero photos yet — used placeholders. PM is Sam."

**Output:**

```
Hi Sam — Maplewood Inn rooms ready for review.

What was built:
- /rooms/birch — staging link
- /rooms/cedar — staging link
- /rooms/dogwood — staging link
- /rooms/elm — staging link
- /rooms/magnolia — staging link
- /rooms/hawthorn — staging link

Deviations: none. All 6 use the inside-template single-room pattern.

Missing inputs:
- Magnolia and Hawthorn don't have hero photos yet. Currently using placeholders.
  Both pages will need a quick swap when the photos come in.

Open questions:
- Anything from the client on rate display? Right now showing "from $X/night"
  matching the other rooms. Confirm if that's how they want it.

QA status: self-QA passed on all 6 pages (heading hierarchy, alt text, links,
mobile, brand consistency, page meta, booking path). Hero photo placeholders are
the only flagged item.

Ready when you are.
```

## Notes

- Self-QA is a prerequisite. If logan-elementor-qa hasn't been run, this skill should redirect Mily there first. Handing off something that hasn't been self-QA'd is the fastest way to lose PM trust.
- Keep it short. PMs read a lot of messages. Five sections, each as tight as possible.
- "Deviations" is the section PMs and leads care about most. If Mily diverged from the inside template, she needs a reason. "Client asked for X" or "image didn't fit the standard crop, used the alternate pattern." Document, don't apologize.
- "Missing inputs" means anything that affected the build that's outside Mily's control. Missing copy, missing images, ambiguous brief. State it once, factually.
- "Open questions" goes to the PM or the client (PM filters). Don't ask the lead in a PM handoff — that's a separate conversation.
- Things to leave out: emotional commentary ("hopefully this is okay"), apologies for normal time taken, defensive explanations, "let me know if you want me to change anything" (assumed — no need to say it).
- If there's a real delay or blocker, surface it early — not buried at the end. PMs need to act on problems within 1 day, not at the deadline.
- Response to PM feedback: acknowledge, clarify if needed, give an ETA, no defensiveness. That's a separate thread, not part of the initial handoff.
- The "I'm stuck" protocol (when Mily isn't actually ready to hand off): state what she tried, what didn't work, what she thinks the issue might be, what she needs. Send that to the lead, not to the PM in handoff format.
- Related skills: logan-elementor-qa (must pass first), logan-elementor-troubleshoot (if QA fails), logan-elementor-page-build (the build itself).
- Adam built this skill so Mily looks crisp in the most-read communication of her day. PMs notice clean handoffs. Clean handoffs travel.
