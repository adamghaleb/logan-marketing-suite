import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  wpSiteInfo,
  wpListPages,
  wpPage,
  elementorInspect,
  wpMediaSearch,
} from "./tools.js";

const SiteUrl = z
  .string()
  .url()
  .describe("Base WordPress site URL, e.g. https://example.com");

const PerPage = z
  .number()
  .int()
  .min(1)
  .max(100)
  .describe("Number of items per page (1-100).");

const PageId = z.number().int().positive();

function ok(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  };
}

function fail(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return {
    isError: true,
    content: [{ type: "text" as const, text: `mily-mcp error: ${message}` }],
  };
}

async function safeRun<T>(fn: () => Promise<T>) {
  try {
    return ok(await fn());
  } catch (error) {
    return fail(error);
  }
}

function registerSiteInfo(server: McpServer) {
  server.registerTool(
    "wp_site_info",
    {
      title: "WordPress Site Info",
      description:
        "Read-only: fetch /wp-json/ root and return site metadata + REST namespaces.",
      inputSchema: { siteUrl: SiteUrl },
    },
    async ({ siteUrl }) => safeRun(() => wpSiteInfo(siteUrl)),
  );
}

function registerListPages(server: McpServer) {
  server.registerTool(
    "wp_list_pages",
    {
      title: "List WordPress Pages",
      description: "Read-only: list pages with id, slug, title, status, link.",
      inputSchema: {
        siteUrl: SiteUrl,
        perPage: PerPage.default(20).optional(),
      },
    },
    async ({ siteUrl, perPage }) =>
      safeRun(() => wpListPages(siteUrl, perPage ?? 20)),
  );
}

function registerPage(server: McpServer) {
  server.registerTool(
    "wp_page",
    {
      title: "Get WordPress Page",
      description:
        "Read-only: fetch a single page including meta._elementor_data when present.",
      inputSchema: { siteUrl: SiteUrl, id: PageId },
    },
    async ({ siteUrl, id }) => safeRun(() => wpPage(siteUrl, id)),
  );
}

function registerElementorInspect(server: McpServer) {
  server.registerTool(
    "elementor_inspect",
    {
      title: "Inspect Elementor Tree",
      description:
        "Read-only: parse a page's _elementor_data into a summarized section/column/widget tree with widget counts.",
      inputSchema: { siteUrl: SiteUrl, id: PageId },
    },
    async ({ siteUrl, id }) => safeRun(() => elementorInspect(siteUrl, id)),
  );
}

function registerMediaSearch(server: McpServer) {
  server.registerTool(
    "wp_media_search",
    {
      title: "Search WordPress Media",
      description:
        "Read-only: search the media library by query string, returning id, title, source URL, mime, alt text, dimensions.",
      inputSchema: {
        siteUrl: SiteUrl,
        query: z.string().min(1),
        perPage: PerPage.default(20).optional(),
      },
    },
    async ({ siteUrl, query, perPage }) =>
      safeRun(() => wpMediaSearch(siteUrl, query, perPage ?? 20)),
  );
}

export function registerTools(server: McpServer) {
  registerSiteInfo(server);
  registerListPages(server);
  registerPage(server);
  registerElementorInspect(server);
  registerMediaSearch(server);
}
