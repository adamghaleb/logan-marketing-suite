---
name: logan-staging-automation
description: Use this skill when Mily wants Claude to perform safe, staging-only WordPress operations — creating draft pages, uploading media, importing Elementor templates, or updating page metadata — through the WordPress REST API using a per-app Application Password. Triggers include "create a draft page on staging", "upload these images to staging", "import this template into staging", "set the meta on this draft", or any automation request against a WordPress site. Do NOT use this skill against production sites under any circumstances. Do NOT use it to publish pages, change settings, install plugins, edit users, or touch theme files. If a production URL is provided, refuse and ask for staging.
---

# Work on staging

## When to use this

Mily has a staging WordPress site set up for a Logan client and wants Claude to handle repetitive setup work — creating draft pages from a sitemap, uploading a batch of images, importing an Elementor template, or filling in page metadata — without her clicking through the admin. This skill uses the WordPress REST API and a one-app-only Application Password. It only creates drafts. It never publishes. It never touches production.

## Trigger phrases

- "create a draft page on staging"
- "upload these images to staging"
- "import this template into staging"
- "set the meta on this draft"
- "create draft pages from this sitemap"

## What you give Claude

- The staging site URL (must explicitly be staging — usually a subdomain like `staging.client.com` or a `loganmarketing.com` subdomain)
- A WordPress Application Password generated specifically for this skill (not the admin password)
- The username the password is tied to
- The operation: page list to draft, image folder to upload, template JSON to import, or metadata to set
- The target post type (usually `pages`, sometimes a custom post type)
- A confirmation that this is staging and that backups exist

## What Claude gives back

- A summary of what will happen before any request fires
- The actual API operations (POST to `/wp-json/wp/v2/pages`, POST to `/wp-json/wp/v2/media`, etc.)
- Each created/uploaded item's ID, URL, and current status (always `draft`)
- A clear pass/fail per operation with the error message if anything fails
- A final report Mily can paste into the PM handoff or her notes
- A reminder that nothing was published — every page is `draft` and needs human review

## Step-by-step

1. Verify the URL is staging. If it looks like production (no `staging`, `dev`, `test`, `loganmarketing.com` subdomain pattern, or explicit staging confirmation), STOP and ask Mily to confirm or provide the staging URL.
2. Confirm an Application Password is being used, not the admin password. Application Passwords are revocable, scoped, and meant for integrations.
3. Confirm the operation is one of the allowed types: create draft page, upload media, import Elementor template, set page metadata. Anything else (publish, delete, update plugins, edit settings, edit users, edit theme) is refused.
4. Show Mily the plan. List exactly what will be created/uploaded/updated, in order. Wait for confirmation if the batch is more than 5 operations.
5. Run the operations one at a time. After each, log the result. Stop on the first failure unless Mily said "continue past errors."
6. All pages created are `status: draft`. All media is uploaded but not attached to a published post. Templates are imported but the resulting page is `draft`.
7. End with the report: created IDs, URLs, status, errors, what's left to do (always: "human review and publish from the WP admin").

## Examples

**Input:** "Create draft pages on staging for the Maplewood Inn. Sitemap: Home, About, Rooms, Things to Do, Gallery, Contact. URL: https://maplewood-staging.loganmarketing.com. Application password: xxxx. Username: mily."

**Output:**

```
Plan:
- Verify URL: maplewood-staging.loganmarketing.com — looks like staging (subdomain
  pattern matches). Confirmed.
- Auth: Application Password for user "mily". Confirmed.
- Operation: create 6 draft pages.
- Status: every page will be created as `draft`. Nothing will be published.

Pages to create:
1. Home — slug: /home (or front page later)
2. About — slug: /about
3. Rooms — slug: /rooms
4. Things to Do — slug: /things-to-do
5. Gallery — slug: /gallery
6. Contact — slug: /contact

Confirm? Y/N

[on confirmation]

Created:
1. ID 12 — /home — draft — ok
2. ID 13 — /about — draft — ok
3. ID 14 — /rooms — draft — ok
4. ID 15 — /things-to-do — draft — ok
5. ID 16 — /gallery — draft — ok
6. ID 17 — /contact — draft — ok

Report:
- 6 draft pages created at maplewood-staging.loganmarketing.com
- All status: draft
- All require human review and publish from the WP admin
- Next: open each in the Elementor editor and apply the inside-template
```

## Notes

- Hard rule: production sites are off-limits. If Mily says "production", "live", or gives a URL that's the canonical client domain (no `staging`, `dev`, `test`, or `loganmarketing.com` subdomain), refuse. Ask for the staging URL. Ask Mily to confirm in writing that it's staging.
- Application Passwords: one per integration. Revocable. Stored in a password manager, not in code. Always over HTTPS. Never share with anyone, including the lead, except as a regenerated new password.
- Allowed operations: create draft page, upload media, import Elementor template, set draft page metadata (title, slug, featured image, meta description if Yoast/Rank Math). Everything else: refuse.
- Never publish. Every page created stays `draft` until a human reviews it in the WP admin and publishes manually. This is non-negotiable.
- Backups: confirm that staging backups exist before doing anything destructive (and "destructive" here means anything beyond create-draft and upload-media). If Mily says "no backups," stop and ask the lead.
- Errors: log every error with the API response body. Don't retry silently. Junior automation should fail loudly.
- Batch size: more than 5 operations gets a confirmation prompt. More than 20 in one go probably should be split into runs anyway.
- Media uploads: validate file size against the WP upload limit before posting. Compress images before upload (logan-hospitality-copy-seo and the suite playbook cover image patterns).
- Template imports: use Elementor's REST endpoint or the standard media upload + post-meta approach. Templates always come with the staging-first warning from logan-elementor-template-json.
- Related skills: logan-elementor-template-json (where the JSON comes from), logan-elementor-page-build (for what to do once the drafts exist), logan-elementor-qa (before any of these get published).
- Adam built this skill so Mily can skip the most boring repetitive setup work without ever risking a live client site. The hard rule is staging-only, draft-only.
