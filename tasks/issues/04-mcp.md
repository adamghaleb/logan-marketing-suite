## What

Scaffold the read-only first version of the Mily MCP (Model Context Protocol) server. This is a Node TypeScript MCP server that exposes WordPress / Elementor inspection tools. Start with read-only — no writes, no destructive operations. Future batches add controlled write paths.

## Source files (read first)

- `elementor-logan-marketing-ai-workflow-report.md` — section on MCP control layer + risk guardrails
- `SPEC_LOGAN_TOOLKIT.md` — toolkit context

## Files to create

### `mcp/mily-mcp/package.json`

- `name: "mily-mcp"`, `type: "module"`, `bin: { "mily-mcp": "dist/index.js" }`
- Deps: `@modelcontextprotocol/sdk`, `zod`, `dotenv`
- Dev deps: `typescript`, `tsx`, `@types/node`
- Scripts: `dev`, `build`, `start`

### `mcp/mily-mcp/tsconfig.json`

Standard ESM tsconfig, target ES2022, outDir `dist`.

### `mcp/mily-mcp/src/index.ts`

MCP server with these read-only tools:

- `wp_site_info({ siteUrl })` — returns WP version, theme, active plugins (via REST `/wp-json/`)
- `wp_list_pages({ siteUrl, perPage })` — returns page IDs/titles/slugs
- `wp_page({ siteUrl, id })` — returns full page payload including `meta._elementor_data` if present
- `elementor_inspect({ siteUrl, id })` — returns parsed Elementor JSON tree (sections/columns/widgets) for a page
- `wp_media_search({ siteUrl, query, perPage })` — returns media library matches

All tools require a `siteUrl`. Application Passwords supplied via env vars `WP_USER` + `WP_APP_PASSWORD`. NO write tools in this scaffold.

### `mcp/mily-mcp/README.md`

Plain-English: what this server does, how to install it, how to wire it into Claude Code, what the four-layer system says about safety, and a `<details>` block with the Application Password setup walkthrough.

### `mcp/mily-mcp/.env.example`

`WP_USER=`, `WP_APP_PASSWORD=`, `MILY_MCP_LOG_LEVEL=info`

## Acceptance criteria

- [ ] `cd mcp/mily-mcp && npm install && npm run build` succeeds
- [ ] `dist/index.js` is executable
- [ ] Server registers all 5 read-only tools with valid Zod schemas
- [ ] All HTTP calls have retry with exponential backoff (3 retries: 1s → 2s → 4s with jitter; retry 5xx + network errors only) per CLAUDE.md
- [ ] All async ops have try/catch
- [ ] No write/delete operations anywhere in the code
- [ ] README explains the read-only-first principle and the staging-only stance for future write tools

## Batch

batch-1 (parallel with #1, #2, #3 — different directories, no overlap)
