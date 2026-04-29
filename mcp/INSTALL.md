# Wiring Mily's MCP server into Claude

Mily ships with a small **MCP server** (`mily-mcp`) that lets Claude Code or
Claude Desktop _look at_ a WordPress / Elementor site. This guide is the plain
English version. The exact JSON snippet lives next door in
[`example-claude-desktop-config.json`](./example-claude-desktop-config.json).

## What this does, in one paragraph

Claude needs a polite way to read your WordPress site so Mily can answer
questions like "what pages do I have?" or "what's on the rooms page?" The MCP
server is that polite way. It logs in over HTTPS using a per-app password,
asks WordPress for the data, and hands the answer back to Claude. **It cannot
write, publish, or delete anything** — it's read-only by design (Layer 1 of
the four-layer plan in `elementor-logan-marketing-ai-workflow-report.md`).

## Before you start

You need three things:

1. **A WordPress user** Mily can act as. Use a low-privilege role (Editor or
   custom read-mostly) when you can.
2. **A WordPress Application Password** for that user (see "Make an Application
   Password" below).
3. **Claude Code or Claude Desktop** installed on your machine, with config
   you're allowed to edit.

## The two-minute version

1. Open the right config file:
   - **Claude Desktop (macOS)** —
     `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Claude Desktop (Windows)** —
     `%APPDATA%\Claude\claude_desktop_config.json`
   - **Claude Code** — `~/.config/claude-code/mcp.json` (or wherever your
     Claude Code install keeps its MCP config).
2. Merge in the `mily-mcp` block from
   [`example-claude-desktop-config.json`](./example-claude-desktop-config.json).
   If the file already has an `mcpServers` object, just add the `mily-mcp` key
   inside it — don't replace the whole file.
3. Replace `<your wp user>` and `<application password>` with the real values.
4. Restart Claude. You should see five new tools under the `mily-mcp`
   namespace: `wp_site_info`, `wp_list_pages`, `wp_page`, `elementor_inspect`,
   `wp_media_search`.

That's it. If Mily can read your site, it can answer site questions in
context. If it can't, it'll tell you.

## What permissions Mily actually needs

Mily only ever calls the WordPress REST API in **read mode**. Concretely:

- `GET /wp-json/` — discover REST namespaces
- `GET /wp-json/wp/v2/pages` — list pages
- `GET /wp-json/wp/v2/pages/<id>` — read one page (including
  `meta._elementor_data` when present)
- `GET /wp-json/wp/v2/media` — search the media library

There are no `POST`, `PUT`, `PATCH`, or `DELETE` calls anywhere in `mily-mcp`
today. If you give Mily an Application Password tied to an Editor-level user,
that's already more than enough; an Author or custom read-only role works too.

## Make an Application Password

1. Log in to WordPress admin as the user Mily should act as.
2. Go to **Users → Profile** (or **Users → All Users → Edit** for that user).
3. Scroll to **Application Passwords**.
4. Name it something honest like `mily-mcp (read-only)`.
5. Click **Add New Application Password**.
6. Copy the password WordPress shows you — it's only shown once.
7. Paste it into the `WP_APP_PASSWORD` field in your Claude config.

Application Passwords are **per-app, revocable, and scoped to the REST API**.
That's the whole point — they're safer than handing Mily your real WordPress
password.

## If something feels off, revoke it

If Adam, the client, or you ever feel unsure about what Mily is doing on a
site, **just revoke the Application Password**. WordPress lets you kill any
single Application Password without touching the user's actual login or any
other tool's password.

1. Log in to WordPress admin.
2. Go to **Users → Profile** (same place you created it).
3. Scroll to **Application Passwords**.
4. Find the row labeled `mily-mcp (read-only)` (or whatever you named it).
5. Click **Revoke**.

The next time Claude tries to call WordPress through `mily-mcp`, it will get a
clean `401 Unauthorized`. No data leaks, no writes, no surprises. You can
issue a new password later if you want Mily back.

<details>
<summary>Technical details (config layout, env vars, transport)</summary>

- **Transport** — `mily-mcp` speaks MCP over **stdio**. Claude launches the
  process, reads/writes JSON-RPC framed messages, and shuts it down on exit.
- **Command** — `npx -y mily-mcp` pulls and runs the published binary. If you
  prefer a local checkout, swap to `node /absolute/path/to/mcp/mily-mcp/dist/index.js`.
- **Env vars** — only two are required: `WP_USER` and `WP_APP_PASSWORD`. An
  optional `MILY_MCP_LOG_LEVEL` (`silent` | `info` | `debug`) controls
  stderr logging.
- **Retries** — every WordPress call retries 3 times with exponential backoff
  on 5xx and network errors, never on 4xx (matches the project-wide rule in
  `CLAUDE.md`).
- **Read-only guarantee** — there's literally no mutating code path in the
  server. Future write tooling will live in a separate package and require
  explicit opt-in.

</details>
