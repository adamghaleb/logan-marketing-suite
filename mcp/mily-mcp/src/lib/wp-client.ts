import { fetchWithRetry } from "./fetch-with-retry.js";

function buildAuthHeader(): Record<string, string> {
  const user = process.env.WP_USER ?? "";
  const pass = process.env.WP_APP_PASSWORD ?? "";
  if (!user || !pass) return {};
  const token = Buffer.from(`${user}:${pass}`, "utf8").toString("base64");
  return { Authorization: `Basic ${token}` };
}

function normalizeSiteUrl(siteUrl: string): string {
  const trimmed = siteUrl.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error(
      `siteUrl must start with http:// or https:// (got ${siteUrl})`,
    );
  }
  return trimmed;
}

export function buildRestUrl(siteUrl: string, path: string): string {
  const base = normalizeSiteUrl(siteUrl);
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

export async function wpGet<T>(siteUrl: string, path: string): Promise<T> {
  const url = buildRestUrl(siteUrl, path);
  const headers: Record<string, string> = {
    Accept: "application/json",
    "User-Agent": "mily-mcp/0.1 (read-only)",
    ...buildAuthHeader(),
  };
  try {
    const response = await fetchWithRetry(url, { method: "GET", headers });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `GET ${url} failed: ${response.status} ${body.slice(0, 200)}`,
      );
    }
    return (await response.json()) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`wpGet error for ${url}: ${message}`);
  }
}
