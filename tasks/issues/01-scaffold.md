## What

Scaffold the Next.js 15 app and port the design system from the Claude Design handoff so the site builds successfully with empty placeholder content. Subsequent agents will fill in components and pages on top of this foundation.

## Source files (read first)

- `.design-incoming/logan-marketing-suite/project/Mily's Home.html` — root entry, defines `__MILY_TWEAKS` global
- `.design-incoming/logan-marketing-suite/project/mily-styles.css` — main stylesheet (port verbatim)
- `.design-incoming/logan-marketing-suite/project/mily-inner.css` — inner page styles
- `.design-incoming/logan-marketing-suite/project/mily-app.jsx` — root App component (for reference only — do NOT port routing/state yet)
- `tasks/plan.md` — swarm plan
- `BINGUS.md` — character bible
- `CLAUDE.md` — project rules

## Files to create

- `package.json` — Next.js 15, React 19, TypeScript 5, Tailwind v4, `@anthropic-ai/sdk`, `@next/mdx`. Scripts: dev, build, start, lint.
- `tsconfig.json` — strict, `paths: { "@/*": ["./*"] }`
- `next.config.mjs` — basic, MDX support
- `postcss.config.mjs` — Tailwind v4 + autoprefixer
- `tailwind.config.ts` — minimal; lovego CSS variables already live in globals.css
- `app/layout.tsx` — root html/body, attach Google Fonts (Caveat, Nunito, JetBrains Mono) via `next/font/google`, attach Milkyway via `next/font/local` from `public/fonts/Milkyway-DEMO.ttf`, attach Helvetica Neue via `next/font/local` if available else system fallback. Set CSS variables `--display`, `--hand`, `--sans`, `--mono`, `--amp` on `<body>`. Default `data-mode` and `data-grid` attributes per `__MILY_TWEAKS`. Import `./globals.css`.
- `app/page.tsx` — placeholder homepage that renders an `<h1>` with the page heading from the design (so build succeeds). Other agents replace this in Batch 2.
- `app/globals.css` — verbatim port of `mily-styles.css`. Replace any `Gloock` references with `var(--display)` (Milkyway). Add `@import "tailwindcss";` at the top. Keep all OKLCH variables, `.page`, `.urlbar`, `.head`, `.h1`, `.today-card`, `.cards`, `.card`, `.tape`, `.mouse-card`, `.practice-list`, `.system`, `.swatch-row`, `.bingus-wrap`, `@keyframes wag`, etc. The ampersand glyph in headings should swap to `--amp` (Helvetica Neue) using `font-family: var(--display); & { font-family: var(--amp); }` selectors as appropriate — apply via a small `.amp { font-family: var(--amp); }` utility class instead of CSS hackery.
- `app/styles/inner.css` — verbatim port of `mily-inner.css` (imported only by inner pages later)
- `.env.example` — add `ANTHROPIC_API_KEY=` line if not present
- `README.md` — leave existing

## Acceptance criteria

- [ ] `npm install` completes
- [ ] `npx next build` succeeds with zero errors
- [ ] `app/globals.css` is a faithful port of `mily-styles.css` (lovego palette, paper bg, fonts wired through CSS variables)
- [ ] Milkyway loads via `next/font/local` from `public/fonts/Milkyway-DEMO.ttf` and is exposed as `--display`
- [ ] Helvetica Neue is exposed as `--amp` (system font is fine on macOS, fallback safe elsewhere)
- [ ] `app/page.tsx` is a placeholder — DO NOT build the full homepage; that is Batch 2
- [ ] All small files; no file over ~150 lines

## Batch

batch-1 (parallel with #2, #3, #4 — fully independent, no file overlap)
