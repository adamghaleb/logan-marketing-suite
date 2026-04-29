# The Mily Suite

> Built by Adam, for Mily. Bingus lives here.

A personal web suite Mily uses as her home base for her junior designer role at Logan Marketing. It includes:

- **Bingus** — her goofy nerdy cat assistant who lives in a chat bubble
- **Skills** — 9 custom Claude Code skills installable from this repo
- **Logan Playbook** — searchable component patterns for hospitality sites
- **Tutorials** — plain-English Elementor + Claude Code walkthroughs
- **Page Builder Console** — 3-tab tool (Recipe / Copy+SEO / QA)
- **Mock pages** — swappable Elementor template previews
- **Staging Sandbox** — safe automation walkthrough
- **MCP server** — direct Claude → Elementor connection (Phase 3)

## Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Language | TypeScript                      |
| Frontend | Next.js 15                      |
| Styling  | Tailwind v4 + shadcn/ui         |
| Content  | MDX                             |
| AI       | Anthropic API (Claude Opus 4.6) |
| Deploy   | Vercel                          |

## Getting started

This repo is in pre-scaffold state. The Next.js app gets built once Claude Design returns the visual system. All foundational content (skills, playbook, tutorials, character bible) is being written in parallel.

See `tasks/todo.md` for current state.

## Documents

| File                                              | Purpose                                              |
| ------------------------------------------------- | ---------------------------------------------------- |
| `BINGUS.md`                                       | Bingus character bible — voice, modes, sample lines  |
| `tasks/todo.md`                                   | Implementation plan and phase tracking               |
| `DECISIONS.md`                                    | Architectural decision log                           |
| `ROADMAP.md`                                      | High-level project roadmap                           |
| `ROUNDTABLE.md`                                   | Thinking framework for architecture decisions        |
| `CLAUDE.md`                                       | Project rules and stack preferences                  |
| `SPEC_LOGAN_TOOLKIT.md`                           | Original toolkit spec (content source)               |
| `elementor-logan-marketing-ai-workflow-report.md` | Research report — the spine of the four-layer system |

## Status

**Current version:** V1 — Phase 0 in progress (foundation content)
