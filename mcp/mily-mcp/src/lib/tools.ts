import { wpGet } from "./wp-client.js";
import { parseElementorData, type ElementorTreeSummary } from "./elementor.js";

interface WpRoot {
  name?: string;
  description?: string;
  url?: string;
  home?: string;
  gmt_offset?: number;
  timezone_string?: string;
  namespaces?: string[];
  site_logo?: number;
  site_icon?: number;
  _meta?: Record<string, unknown>;
}

interface WpPageMeta {
  _elementor_data?: unknown;
  _elementor_edit_mode?: unknown;
  [key: string]: unknown;
}

interface WpPage {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  link: string;
  type: string;
  meta?: WpPageMeta;
  template?: string;
  modified_gmt?: string;
}

interface WpMediaItem {
  id: number;
  slug: string;
  title: { rendered: string };
  source_url: string;
  mime_type: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export async function wpSiteInfo(siteUrl: string) {
  const root = await wpGet<WpRoot>(siteUrl, "/wp-json/");
  return {
    name: root.name ?? null,
    description: root.description ?? null,
    url: root.url ?? null,
    home: root.home ?? null,
    timezone: root.timezone_string ?? null,
    gmtOffset: root.gmt_offset ?? null,
    namespaces: root.namespaces ?? [],
    siteLogoId: root.site_logo ?? null,
    siteIconId: root.site_icon ?? null,
    note: "WP REST root only exposes namespaces. Theme/plugin lists require admin endpoints we do not query in read-only Layer 1.",
  };
}

export async function wpListPages(siteUrl: string, perPage: number) {
  const path = `/wp-json/wp/v2/pages?per_page=${perPage}&_fields=id,slug,title,status,link`;
  const pages = await wpGet<WpPage[]>(siteUrl, path);
  return pages.map((page) => ({
    id: page.id,
    slug: page.slug,
    title: page.title?.rendered ?? "",
    status: page.status,
    link: page.link,
  }));
}

export async function wpPage(siteUrl: string, id: number) {
  const path = `/wp-json/wp/v2/pages/${id}?context=edit`;
  return wpGet<WpPage>(siteUrl, path);
}

export interface ElementorInspectResult {
  pageId: number;
  pageTitle: string;
  summary: ElementorTreeSummary;
}

export async function elementorInspect(
  siteUrl: string,
  id: number,
): Promise<ElementorInspectResult> {
  const page = await wpPage(siteUrl, id);
  const raw = page.meta?._elementor_data;
  const summary = parseElementorData(raw ?? null);
  return {
    pageId: page.id,
    pageTitle: page.title?.rendered ?? "",
    summary,
  };
}

export async function wpMediaSearch(
  siteUrl: string,
  query: string,
  perPage: number,
) {
  const encoded = encodeURIComponent(query);
  const path = `/wp-json/wp/v2/media?search=${encoded}&per_page=${perPage}&_fields=id,slug,title,source_url,mime_type,alt_text,media_details`;
  const items = await wpGet<WpMediaItem[]>(siteUrl, path);
  return items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered ?? "",
    sourceUrl: item.source_url,
    mimeType: item.mime_type,
    altText: item.alt_text ?? "",
    width: item.media_details?.width ?? null,
    height: item.media_details?.height ?? null,
  }));
}
