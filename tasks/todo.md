# Mily Suite — Implementation Plan

> Built by Adam, for Mily. Bingus lives here.

The suite has two surfaces:

1. **The website** — a deployed Next.js app Mily browses (her home base)
2. **The skill repository** — a public GitHub folder of installable Claude Code skills

Both ship from this single repo (monorepo).

---

## Skill set (final, 9 skills)

Merged from the original spec + the research report. Plain-English names lead, technical names follow.

| Plain-English name             | Technical name                  | What it does                                                                      |
| ------------------------------ | ------------------------------- | --------------------------------------------------------------------------------- |
| **Build a page**               | `logan-elementor-page-build`    | Turns a page brief into Elementor build steps using Logan's component library     |
| **Pick the right section**     | `logan-component-picker`        | Asks a few questions, returns the exact Logan components to use for a page type   |
| **Write copy + SEO meta**      | `logan-hospitality-copy-seo`    | Writes hospitality-voice copy, headings, meta titles, meta descriptions, alt text |
| **Read a Figma file**          | `logan-figma-handoff`           | Translates a Figma file from the lead designer into Elementor steps               |
| **Fix something broken**       | `logan-elementor-troubleshoot`  | Common Elementor problems with symptom → diagnosis → fix                          |
| **Check my work**              | `logan-elementor-qa`            | Pre-handoff QA audit (mobile, links, alt text, headings, brand consistency)       |
| **Make an Elementor template** | `logan-elementor-template-json` | Generates importable Elementor JSON templates (Phase 3 use)                       |
| **Work on staging**            | `logan-staging-automation`      | Safe REST/CLI operations on a staging WordPress site (Phase 3)                    |
| **Write a handoff**            | `logan-pm-handoff`              | Structured handoff message for the project manager                                |

---

## Phase plan

### Phase 0 — Foundation (in progress)

- [x] Directory structure
- [x] `BINGUS.md` character bible
- [x] `tasks/todo.md` (this file)
- [x] `DECISIONS.md` populated with key choices
- [x] `README.md` updated
- [x] `content/four-layers/index.mdx` — 4-layer system explainer (simple + deep)
- [x] `content/claude-code-101/index.mdx` — what Claude Code is, in plain English
- [x] `content/skills/_overview.mdx` — plain-English skills landing
- [ ] All 9 `skills/*/SKILL.md` files written
- [ ] All 9 `content/skills/*.mdx` plain-English wrappers
- [ ] `content/playbook/` — 12 Logan component entries
- [ ] `content/tutorials/` — 4 Elementor starter tutorials
- [ ] `content/practice/` — sample brief + exercises + rubric
- [ ] `scripts/install-mily-skills.sh` + `content/install-guide.mdx`

### Phase 1 — Backend + Bingus

- [ ] Next.js 15 + Tailwind v4 + MDX scaffold (after design returns)
- [ ] `/api/bingus/chat` route — server-side Anthropic proxy with BINGUS.md as system prompt
- [ ] Bingus floating bubble component (after design)
- [ ] `/bingus` dedicated chat page (after design)
- [ ] Bubble grid homepage (after design)
- [ ] Apply Claude Design tokens (after design)

### Phase 2 — Page Builder Console

- [ ] `/page-builder` 3-tab tool: Recipe / Copy+SEO / QA
- [ ] Each tab calls Anthropic via `/api/page-builder/[tab]/route.ts`
- [ ] Save sessions to local storage so Mily can come back to drafts

### Phase 3 — MCP server + staging automation

- [ ] `/mcp/mily-mcp/` — TypeScript MCP server exposing `pick_component`, `audit_page`, `generate_alt_text`, `generate_seo_meta` as tools
- [ ] One-button install JSON snippet for Claude Code config
- [ ] Staging-only WordPress REST API tools (gated, with App Password)
- [ ] `content/staging-sandbox/` — full walkthrough for setting up local WP + staging

### Phase 4 — Mock pages + polish

- [ ] 3-4 mock B&B template previews (swappable)
- [ ] Personal note from Adam on homepage
- [ ] Bingus character art (real, hand-drawn, vectorized)
- [ ] Signature element (TBD by design)
- [ ] Vercel deploy + custom domain

---

## Decisions still open

1. **Domain** — Vercel preview URL or custom (e.g., `mily.adamfadi.com`)?
2. **Bingus model** — Opus 4.6 always, or fall back to Haiku 4.5 for chitchat?
3. **MCP scope on launch** — read-only inspection only, or include draft-creation from day one?

These don't block progress. Defaults: Vercel preview for now, Opus always, read-only MCP at launch.
