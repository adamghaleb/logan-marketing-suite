# mily-mcp

A read-only MCP (Model Context Protocol) server that lets Claude Code inspect a WordPress / Elementor site without changing anything.

This is **Layer 1** of the Mily MCP plan: read, look, summarize. There are no tools here that create, update, or delete content. Future layers (drafts, controlled edits, guarded publishing) live in separate releases and will be opt-in.

## What it does

It exposes five tools to an MCP-aware client:

| Tool                | What it returns                                                                 |
| ------------------- | ------------------------------------------------------------------------------- |
| `wp_site_info`      | Site name/description/URL and the REST API namespaces from `/wp-json/`.         |
| `wp_list_pages`     | A list of pages (id, slug, title, status, link).                                |
| `wp_page`           | The full payload of one page, including `meta._elementor_data` when present.    |
| `elementor_inspect` | A summarized Elementor tree: sections, columns, widgets, and per-widget counts. |
| `wp_media_search`   | Media library matches for a search string (id, title, URL, alt text, size).     |

Every call goes over HTTPS to the WordPress REST API using a per-user **Application Password**. Network calls retry with exponential backoff on `5xx`/network failures only — never on `4xx`. There are no `POST`, `PUT`, `PATCH`, or `DELETE` calls anywhere in the codebase.

## Install

```bash
cd mcp/mily-mcp
npm install
npm run build
```

This produces an executable `dist/index.js`.

Set credentials by copying `.env.example` to `.env` and filling in:

```bash
WP_USER=your.wp.username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
MILY_MCP_LOG_LEVEL=info
```

## Wire it into Claude Code

Add the server to your Claude Code MCP config (e.g. `~/.config/claude-code/mcp.json` or your `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mily-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/mcp/mily-mcp/dist/index.js"],
      "env": {
        "WP_USER": "your.wp.username",
        "WP_APP_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx",
        "MILY_MCP_LOG_LEVEL": "info"
      }
    }
  }
}
```

Restart Claude Code. The five tools will appear under the `mily-mcp` namespace.

## Safety stance: the four-layer system

The Mily MCP plan grows in four layers, not all at once:

1. **Layer 1 — Read-only inspection (this release).** List, fetch, parse. No mutation possible because no mutation code exists.
2. **Layer 2 — Draft creation (staging only).** Create draft pages, upload media, import templates into the Elementor library on a staging site.
3. **Layer 3 — Controlled edits (staging only).** Update draft content, set SEO meta, mutate Elementor page data, run audits. All staging.
4. **Layer 4 — Production-aware (only after staging is proven).** Guarded publishing, rollback snapshots, PM handoff.

The reason this server starts read-only is that any credential capable of mutating WordPress can also break it. WP MCP tooling can in principle create, modify, and delete pages, plugins, themes, and settings if given broad scopes. We refuse to go there before the workflow is observed end-to-end. Future write tools will live behind explicit flags, target staging by default, and ship in a separate package.

If you need to walk through what the AI is doing on a site, point it at `wp_list_pages` + `elementor_inspect` and read the JSON. That is the entire surface area today.

<details>
<summary>How to create a WordPress Application Password</summary>

1. Log in to WordPress admin as the user the AI should act as. Use a low-privilege role when possible (Editor or a custom read-mostly role).
2. Go to **Users → Profile** (or **Users → All Users → Edit** for that user).
3. Scroll to **Application Passwords**.
4. Type a name like `mily-mcp (read-only)` and click **Add New Application Password**.
5. Copy the generated 24-character password (with spaces). WordPress will not show it again.
6. Put the username in `WP_USER` and the generated password in `WP_APP_PASSWORD` in your `.env` or MCP config.
7. To revoke access at any time, return to the same screen and click **Revoke** next to the entry. This kills only this integration; it does not change the user's main password.

Application Passwords require HTTPS by default and are scoped to REST API requests only. They are revocable, rotatable, and auditable — which is why they are the right choice for any AI integration.

</details>

## Development

```bash
npm run dev          # tsx watch run
npm run typecheck    # strict TS check, no emit
npm run build        # compile + chmod +x dist/index.js
npm run start        # run the compiled server over stdio
```

## Files

```
src/
  index.ts                # MCP server, tool registration
  lib/
    fetch-with-retry.ts   # 3 retries, 1s/2s/4s + jitter, 5xx + network only
    wp-client.ts          # GET-only WP REST helper, basic auth from env
    elementor.ts          # _elementor_data parser + tree summarizer
    tools.ts              # one function per registered tool
```

No write methods exist in any file. Verify with:

```bash
grep -RnE "method:\s*['\"](POST|PUT|PATCH|DELETE)" src
```
