# DECISIONS.md

A living log of significant architectural and design decisions. Newest entries at the top.

When making a decision worth logging, add an entry with the date, what was decided, and why in one line.

---

## 2026-04-29

**Bingus character locked.** Goofy nerdy cat. Calls her Mily. Sprinkled-but-rare "It is I, Bingus." Mildly chaotic allowed. Admits cat-ness when he doesn't know things. Two modes: casual (full Bingus) and locked-in (one Bingus-ism, then crisp help). All voice rules in `BINGUS.md`.

## 2026-04-29

**Final skill set: 9 skills.** Merged the spec's 6 junior-rampup skills with the research report's 7 workflow skills. Plain-English names lead, technical names follow. Each skill has a technical `SKILL.md` and a plain-English MDX wrapper.

## 2026-04-29

**Monorepo for the suite.** Single GitHub repo holds the Next.js website, the 9 skills, the MCP server, and all content. One install path, one source of truth. Public GitHub so Mily can install skills via curl-and-clone.

## 2026-04-29

**Stack: Next.js 15 + Tailwind v4 + MDX + shadcn/ui.** Per `CLAUDE.md` defaults. MDX for content so docs feel like product. Deploy target: Vercel.

## 2026-04-29

**Bingus = Anthropic API call from server-side Next.js route.** API key never touches the client. System prompt assembled from `BINGUS.md` + a digest of the suite's content (4-layer, playbook, skills overview).

## 2026-04-29

**Four-layer ladder is the spine of the suite.** From research report. Layer 1 (advice) → Layer 2 (templates) → Layer 3 (staging automation) → Layer 4 (MCP). Mily can stay on Layer 1 forever and be excellent. Higher layers are opt-in, gated, and explained in plain English with collapsible technical detail.

## 2026-04-29

**Accessibility-first in content design.** Every technical concept has a plain-English version on top and a `<details>` collapsible "how it actually works" beneath. Skill descriptions, install steps, layer explanations all follow this pattern.
