# the Mily Suite

A nine-skill toolkit for Mily, built around how Logan Marketing actually ships boutique-inn websites with WordPress + Elementor.

## What's inside

The home page surfaces nine Claude Code skills, each tuned to one part of the Logan workflow:

- **Build a page** — Section-by-section build plan from a brief. Hero, intro, content blocks, CTA, QA at the end. Tailored to Logan's inside template.
- **Pick the right section** — A short Q&A that names the exact Logan component for the chunk of copy in front of you. Walks you out of blank-page paralysis.
- **Write copy + SEO meta** — Hospitality voice for Logan clients — innkeepers, breakfast, the dog. Plus meta titles, descriptions, alt text, FAQ ideas.
- **Read a Figma file** — Turns a lead designer's Figma file into Elementor steps. What to ask, what to figure out, what not to redesign.
- **Fix something broken** — Calm symptom → diagnosis → fix walkthroughs for the Elementor problems you'll actually hit. Ordered by frequency.
- **Check my work** — Pre-handoff audit. Headings, alt text, links, mobile layout, brand consistency, page meta. Pass / fail with notes.
- **Make an Elementor template** — Generates a valid Elementor `.json` template you can import. Modern flexbox containers. Always import to staging first.
- **Work on staging** — Safe REST/CLI ops on a staging WordPress site. Drafts only, never auto-publishes, refuses to touch production.
- **Write a handoff** — Short, structured PM handoff message. What was built, deviations, missing inputs, open questions. No defensive language.

## Live site

https://logan-marketing-suite.vercel.app

## Install the Claude skills

```bash
curl -fsSL https://logan-marketing-suite.vercel.app/install.sh | bash
```

The installer drops all nine skills into `~/.claude/skills/` so Claude Code picks the right one automatically when you describe what you're doing.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs on port 3000 — open http://localhost:3000.

## Stack

- Next.js 15 (App Router, React 19)
- Tailwind v4 via `@tailwindcss/postcss`
- MDX through `@next/mdx` for skill pages and content
- TypeScript end to end
- shadcn-style components, hand-rolled in `components/`
- Anthropic Claude `haiku-4-5` powers the Bingus chat sidekick

## Project structure

```
app/         Next.js routes — home, /skills/<slug>, /api/bingus/chat
components/  UI building blocks and page sections (Hero, Cards, UrlBar, Bingus, ...)
content/     MDX content — skill wrappers, overview, playbook entries
lib/         Constants, skill-content map, design tweaks, shared types
public/      Static assets — fonts, install.sh, images
scripts/     Source of truth for installer and local dev scripts
```

## Architecture decisions

See [`DECISIONS.md`](./DECISIONS.md) for the running log of architectural and design choices, newest entries on top.

## License

MIT
