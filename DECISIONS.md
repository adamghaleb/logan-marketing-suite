# DECISIONS.md

A living log of significant architectural and design decisions. Newest entries at the top.

When making a decision worth logging, add an entry with the date, what was decided, and why in one line.

---

## 2026-04-29

**Drop the fake `mily.computer` domain; tagline-only URL bar.** The site lives at `logan-marketing-suite.vercel.app` for now — no custom domain purchased. Removed `SITE_DOMAIN` from `lib/constants.ts`, rewrote `components/sections/UrlBar.tsx` to render only "the Logan Marketing Suite, by Adam", and updated `MILY_PAGE_TITLE` to "the Mily Suite — for Mily, by Adam". The install one-liner now points at `logan-marketing-suite.vercel.app/install.sh` (served from `public/install.sh`).

**Sharper, specific card copy. No emojis anywhere on the site.** Mily is an experienced designer who has used Claude — the original "Build a page" / "Check my work" / "Work on staging" copy was too generic and faintly condescending. Rewrote all 9 skill cards with concrete titles ("Component picker", "Figma → Elementor", "Pre-handoff QA pass", "Staging WordPress ops", etc.) and meta tags that name the actual artifact each skill produces. Dropped `SkillCard.icon` entirely — no emoji glyphs in cards, headers, footers, or content MDX. Decoration uses typographic dingbats (`·`, `→`, `—`) only.

## 2026-04-29

**Bingus chat model: `claude-haiku-4-5-20251001`.** Haiku is fast + cheap, the right fit for a chat sidekick that needs to feel snappy and not burn tokens. Configured in `app/api/bingus/chat/route.ts` (closes #15).

**Serve `/install.sh` as a static `public/` asset (Option A).** Copied `scripts/install-mily-skills.sh` to `public/install.sh` and removed the `/install.sh → /scripts/install-mily-skills.sh` rewrite from `vercel.json`. `scripts/` isn't a public dir under Next.js, so the original rewrite would 404 in production. Static `public/` is the simplest path: zero rewrites, plain-text `Content-Type` set in `vercel.json`, curl-pipe-bash works on the production domain. The script in `scripts/` stays the source of truth for local use; `public/install.sh` is its deployed copy.

**MDX rendering for inner pages: `@next/mdx`.** Picked `@next/mdx` over `next-mdx-remote` for the 9 `/skills/<slug>` pages (and any future MDX-rendered routes from parallel agents). Reasons: it's already in `package.json` and wired in `next.config.mjs`; MDX files compile at build time into native React server components (zero client bundle); `<details>` / `<summary>` flow through as plain HTML with no extra rehype config; static-import map keyed by slug stays easy for TypeScript and `generateStaticParams`. Slug → MDX module map lives in `lib/skill-content.ts`.

**Skill slugs realigned to MDX filenames.** `lib/constants.ts` previously used marketing-style slugs (`layout-fundamentals`, `tone-and-voice`, …) that didn't map to anything in `content/skills/`. Realigned `SkillSlug`, `SKILL_ROUTES`, and `SKILL_CARDS` to the canonical `logan-*` slugs (matching the 9 MDX wrappers and `_overview.mdx`'s "Open the skill" links). Card titles, descriptions, and ordering match the canonical numbering in `_overview.mdx`. `Cards.tsx` is unchanged — it just walks the new slugs.

## 2026-04-29

**v2 design migration: multi-font + dark default + Lavigo.** Wired all 6 local fonts (Milkyway, Talina, Mochi Boom, Mochi Boom Extrude, Fredoka, Fredoka Dingbats) plus 3 Google fonts via `next/font` with `--font-*` variables. Dark mode is the new default. Renamed the canonical palette to `--lavigo-*` (driven by `--lavigo-h: 292`); kept `--lovego-*` as aliases so existing inner.css selectors keep working until they're migrated. Mid-headers (.section-title, .card h3, .practice-title, .mouse-title) now use `var(--header)` (Fredoka One); only the hero h1 keeps `var(--display)` (Milkyway). `.h1 .accent` is no longer italic. Display font is swappable via `data-display` on `<body>` (milkyway | talina | mochi | mochi-extrude).

## 2026-04-29

**Scaffold port: Milkyway swaps in for Gloock as `--display`.** Per the design handoff direction, the local Milkyway-DEMO.ttf becomes the display face exposed via `next/font/local`. Helvetica Neue is exposed as `--amp` through a system-font stack (set inline on `<body>`) so the ampersand glyph works on macOS without a bundled file and degrades gracefully elsewhere. Tailwind v4 wired via `@tailwindcss/postcss`; `globals.css` keeps the design CSS verbatim and just adds `@import "tailwindcss";` at the top plus a small `.amp` utility.

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
