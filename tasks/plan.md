# The Mily Suite — Swarm Plan

A swarm-orchestrated build of The Mily Suite (a private toolkit for Mily, starting at Logan Marketing). Implementation derives from the Claude Design handoff: `.design-incoming/logan-marketing-suite/project/Mily's Home.html` plus its imports (`mily-app.jsx`, `mily-sections.jsx`, `mily-bingus.jsx`, `mily-pages.jsx`, `mily-styles.css`, `mily-inner.css`).

## Tech baseline

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (utility coexistence — design CSS stays verbatim)
- Custom OKLCH "lovego" palette + paper-grid background (port `mily-styles.css` 1:1)
- Fonts: **Milkyway DEMO** as the display face (replaces Gloock), **Helvetica Neue** for the ampersand glyph, **Caveat** (handwritten), **Nunito** (body), **JetBrains Mono** (mono)
- Bingus chat: server-side `/api/bingus/chat` route → Anthropic SDK, system prompt built from `BINGUS.md` + suite content digest
- Vercel deploy

## Batches

### Batch 1 — Independent foundations (4 agents, parallel)

| #   | Issue                                            | Files                                                                                                                                                                                                                                                                                                                                             | Depends |
| --- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 1   | Next.js scaffold + design system port            | `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx` (placeholder), `app/globals.css` (verbatim port of mily-styles.css with Milkyway swapped for Gloock), `app/styles/inner.css` (verbatim port of mily-inner.css), `public/fonts/Milkyway-DEMO.ttf` already present | none    |
| 2   | 9 SKILL.md files (technical, Claude Code format) | `skills/logan-elementor-page-build/SKILL.md` and 8 siblings per `SPEC_LOGAN_TOOLKIT.md`                                                                                                                                                                                                                                                           | none    |
| 3   | Logan playbook + tutorials + practice MDX        | `content/playbook/*.mdx` (12 patterns from research report), `content/tutorials/*.mdx` (4 starter), `content/practice/*.mdx`                                                                                                                                                                                                                      | none    |
| 4   | MCP server skeleton                              | `mcp/mily-mcp/package.json`, `mcp/mily-mcp/src/index.ts`, `mcp/mily-mcp/README.md` (read-only tools first)                                                                                                                                                                                                                                        | none    |

### Batch 2 — Mily's Home composition (3 agents, parallel — depends on #1)

| #   | Issue                       | Files                                                                                                                                                                                     |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | Section components          | `components/UrlBar.tsx`, `components/Hero.tsx`, `components/Cards.tsx`, `components/System.tsx`, `components/Footer.tsx`, `lib/constants.ts` (TILES array)                                |
| 6   | Practice + Mouse of the Day | `components/Practice.tsx` (with localStorage), `components/MouseOfTheDay.tsx`, `components/PixelMouse.tsx`, add PRACTICE + MICE to `lib/constants.ts` (separate file: `lib/mily-data.ts`) |
| 7   | Bingus                      | `components/Bingus.tsx` (client, localStorage day tracking), `components/BingusCat.tsx` (SVG with wagging tail keyframe), `lib/bingus-lines.ts`                                           |

### Batch 3 — Backend + inner pages + plain-English wrappers (3 agents, parallel)

| #   | Issue                                        | Files                                                                                                                                                                                |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 8   | Bingus API route                             | `app/api/bingus/chat/route.ts`, `lib/bingus-prompt.ts` (assembles system prompt from BINGUS.md + suite content digest), `.env.example` updated with ANTHROPIC_API_KEY                |
| 9   | Inner pages                                  | `app/playbook/page.tsx`, `app/patterns/page.tsx`, `app/studies/page.tsx`, `app/practice/page.tsx`, `app/shelf/page.tsx`, `app/notes/page.tsx`, content sourced from `mily-pages.jsx` |
| 10  | Plain-English skill wrappers + install guide | `content/skills/<slug>.mdx` × 9 (plain-English on top, `<details>` collapsibles for technical depth), `content/install-guide.mdx`, `scripts/install-mily-skills.sh`                  |

### Batch 4 — Polish

| #   | Issue                            | Files                                                                    |
| --- | -------------------------------- | ------------------------------------------------------------------------ |
| 11  | Mock Elementor template previews | `public/templates/*.html` static demos, `app/templates/page.tsx` browser |
| 12  | Final QA + Vercel deploy config  | `vercel.json`, README badges, smoke test script                          |

## Tracking

Issue #13 — Swarm tracker (links all of the above; updated after each batch).

## Rules

- Each agent runs in an isolated worktree; merge into `main` after batch completes.
- Build check (`npx next build`) between batches.
- Components stay <150 lines; long ones split.
- All async ops have try/catch + error UI.
- Plain-English first; technical detail in `<details>`.
- Mily + Adam capitalized everywhere.
