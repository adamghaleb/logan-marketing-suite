# Mily Suite — coming-soon audit

**Date:** 2026-04-29
**Worktree:** `.claude/worktrees/agent-a8b2e0bc`
**Branch:** `main` HEAD
**Build:** `npx next build` PASSES (43 → 45 static + SSG paths after this audit)

---

## Summary

Mily Suite is in genuinely shippable shape. Almost every advertised feature
is fully wired with real content. The only loose ends were two routes
referenced from `content/install-guide.mdx` (`/claude-code-101` and
`/four-layers`) that had MDX content drafted but no `app/` route — meaning
those links 404&apos;d. Both are now stubbed as themed coming-soon pages so
the install-guide cross-links resolve cleanly.

No existing files were deleted. Underlying MDX in `content/claude-code-101/`
and `content/four-layers/` is preserved for future wiring.

---

## Per-route status

| Route                   | Status                | Note                                                                                                                                                                                                                            |
| ----------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (home)              | SHIPPED · NOT TOUCHED | Owned by restructure agent; do-not-touch list. Renders Hero/Cards/Practice/MouseOfTheDay/System/Footer/Bingus.                                                                                                                  |
| `/api/bingus/chat`      | SHIPPED · NOT TOUCHED | Wired to Anthropic SDK with retry-with-backoff, cap on message + recentTurns, friendly fallback when key missing. Real production handler. Bingus polish in flight elsewhere — do-not-touch.                                    |
| `/install-guide`        | SHIPPED · NOT TOUCHED | Just shipped per do-not-touch list. Real install-guide MDX (134 lines) plus a one-liner header.                                                                                                                                 |
| `/templates`            | SHIPPED · NOT TOUCHED | Just shipped per do-not-touch list.                                                                                                                                                                                             |
| `/playbook`             | SHIPPED               | Lists 12 real MDX entries (hero-block, welcome-card, rooms-grid, slow-fade-gallery, amenity-icons-row, booking-widget-strip, cta-banner, footer, local-area-map-block, newsletter-signup, press-strip, testimonial-pull-quote). |
| `/playbook/[slug]` × 12 | SHIPPED               | All 12 slugs prerender as SSG.                                                                                                                                                                                                  |
| `/dossier`              | SHIPPED               | Lists 7 real MDX entries (agency-profile, client-list, first-90-days, index, key-people, questions-for-them, voice-analysis).                                                                                                   |
| `/dossier/[slug]` × 7   | SHIPPED               | All 7 slugs prerender as SSG.                                                                                                                                                                                                   |
| `/tutorials`            | SHIPPED               | Lists 4 real walkthroughs with estimated minutes.                                                                                                                                                                               |
| `/tutorials/[slug]` × 4 | SHIPPED               | hero-from-figma, reusable-room-card, misaligned-section-mobile, page-meta-block.                                                                                                                                                |
| `/practice`             | SHIPPED               | Renders 3 real MDX sections (sample-brief, exercises, rubric) with anchor nav.                                                                                                                                                  |
| `/skills/[slug]` × 9    | SHIPPED · NOT TOUCHED | All 9 Logan skills (page-build, component-picker, hospitality-copy-seo, figma-handoff, troubleshoot, qa, template-json, staging-automation, pm-handoff). Toolkit restructure in flight elsewhere — do-not-touch.                |
| `/claude-code-101`      | STUBBED-COMING-SOON   | New route. Was 404 (only MDX in `content/claude-code-101/index.mdx`, no app route). `content/install-guide.mdx` line 68 + 132 link to it. Now renders themed coming-soon page. Underlying MDX preserved.                        |
| `/four-layers`          | STUBBED-COMING-SOON   | New route. Was 404 (only MDX in `content/four-layers/index.mdx`, no app route). `content/install-guide.mdx` line 133 links to it. Now renders themed coming-soon page. Underlying MDX preserved.                                |

---

## Infrastructure audited

- **`public/install.sh`** + **`scripts/install-mily-skills.sh`** — both 139 lines, real and runnable. Identical (intentionally — the public one is what the curl one-liner pulls).
- **`mcp/mily-mcp/`** — full MCP server present. `src/index.ts` (27 lines) starts a stdio server. `src/lib/` has elementor.ts, fetch-with-retry.ts, register.ts, tools.ts, wp-client.ts (~411 lines combined). Has its own `package.json`, `package-lock.json`, `README.md`, `.env.example`. Real implementation.
- **Bingus chat API** — `app/api/bingus/chat/route.ts` (282 lines) calls `claude-haiku-4-5-20251001` with retry-with-backoff, validation caps, and graceful fallbacks. Production-ready.
- **`lib/bingus-prompt.ts`, `lib/retry-with-backoff.ts`, `lib/skill-content.ts`, `lib/content.ts`, `lib/mily-data.ts`, `lib/mily-tweaks.ts`** — all real, tested utilities (`lib/__tests__/` exists).

---

## Files created

- `app/claude-code-101/page.tsx` — themed coming-soon stub.
- `app/four-layers/page.tsx` — themed coming-soon stub.
- `tasks/audit-coming-soon.md` — this report.

## Files modified

None. Audit was additive only (preserved all existing code, content, and routes).

## Files explicitly NOT touched (per instructions)

- `components/Bingus.tsx`, `components/BingusCat.tsx`, both `*.module.css`
- `components/sections/Cards.tsx`, `lib/constants.ts`, `app/skills/page.tsx` (no skills index page exists at that path either — handled by parent `/skills/[slug]` route)
- `app/templates/page.tsx`, `public/templates/*`
- `app/install-guide/page.tsx`, `scripts/smoke-test.sh`
- `app/page.tsx`, `app/layout.tsx`
- `vercel.json`, `next.config.mjs`, `package.json`, `package-lock.json`, `README.md`, `DECISIONS.md`

---

## Verify

```
npx next build       # passes, 45 routes
GET /claude-code-101 # renders coming-soon
GET /four-layers     # renders coming-soon
GET /install-guide   # internal links to /claude-code-101 and /four-layers no longer 404
```
