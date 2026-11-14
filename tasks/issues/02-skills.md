## What

Write 9 SKILL.md files in proper Claude Code skill format. Each skill is a self-contained instruction package an installer can drop into `~/.claude/skills/` and invoke by trigger phrase.

## Source files (read first)

- `SPEC_LOGAN_TOOLKIT.md` — original 6-skill spec
- `elementor-logan-marketing-ai-workflow-report.md` — 7-skill workflow report
- `content/skills/_overview.mdx` — plain-English summaries (already written; mirror their intent)
- `~/.claude/skills/skill-creator/AGENTS.md` if accessible, OR mimic the format of any existing SKILL.md in `~/.claude/skills/`

## Skills to write

Plain-English name → folder slug:

1. Build a page → `skills/logan-elementor-page-build/SKILL.md`
2. Pick the right section → `skills/logan-component-picker/SKILL.md`
3. Write copy + SEO meta → `skills/logan-hospitality-copy-seo/SKILL.md`
4. Read a Figma file → `skills/logan-figma-handoff/SKILL.md`
5. Fix something broken → `skills/logan-elementor-troubleshoot/SKILL.md`
6. Check my work → `skills/logan-elementor-qa/SKILL.md`
7. Make an Elementor template → `skills/logan-elementor-template-json/SKILL.md`
8. Work on staging → `skills/logan-staging-automation/SKILL.md`
9. Write a handoff → `skills/logan-pm-handoff/SKILL.md`

## SKILL.md template (each file)

```markdown
---
name: <slug>
description: <one-line trigger description; user-facing>
---

# <Plain-English Title>

## When to use this

<2-4 sentences in plain English>

## Trigger phrases

- "<phrase 1>"
- "<phrase 2>"

## What you give Claude

<inputs needed>

## What Claude gives back

<outputs>

## Step-by-step

1. <step>
2. <step>

## Examples

<one short worked example>

## Notes

<edge cases, hospitality-specific tips, links to related skills>
```

## Acceptance criteria

- [ ] All 9 directories exist under `skills/` with `SKILL.md` files
- [ ] Each SKILL.md has YAML frontmatter (`name`, `description`)
- [ ] Plain English first; no jargon at the top of any file
- [ ] Each skill ≤ 200 lines
- [ ] Hospitality voice (boutique inns, B&Bs, ranches, small hotels) — warm, unhurried
- [ ] Mily and Adam capitalized

## Batch

batch-1 (parallel with #1, #3, #4 — different directories, no overlap)
