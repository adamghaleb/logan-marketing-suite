import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

export interface ContentFrontmatter {
  readonly title: string;
  readonly slug: string;
  readonly order?: number;
  readonly estimatedMinutes?: number;
  readonly summary?: string;
}

export interface ContentEntry {
  readonly slug: string;
  readonly title: string;
  readonly order?: number;
  readonly estimatedMinutes?: number;
  readonly summary?: string;
  readonly firstParagraph: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function parseFrontmatter(raw: string): {
  data: Record<string, string | number>;
  body: string;
} {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: raw };
  }
  const yaml = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const data: Record<string, string | number> = {};
  for (const line of yaml.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }
  return { data, body };
}

function extractFirstParagraph(body: string): string {
  const lines = body.split("\n");
  const paragraphs: string[] = [];
  let current: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("<") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("```")
    ) {
      if (current.length > 0) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }
    current.push(trimmed);
  }
  if (current.length > 0) paragraphs.push(current.join(" "));
  const first = paragraphs[0] ?? "";
  return first.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}

function compareEntries(a: ContentEntry, b: ContentEntry): number {
  const aHas = typeof a.order === "number";
  const bHas = typeof b.order === "number";
  if (aHas && bHas) return (a.order as number) - (b.order as number);
  if (aHas) return -1;
  if (bHas) return 1;
  return a.title.localeCompare(b.title);
}

export async function listContent(collection: string): Promise<ContentEntry[]> {
  const dir = path.join(CONTENT_ROOT, collection);
  const files = await readdir(dir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file): Promise<ContentEntry> => {
        const raw = await readFile(path.join(dir, file), "utf8");
        const { data, body } = parseFrontmatter(raw);
        const fallbackSlug = file.replace(/\.mdx$/, "");
        return {
          slug: typeof data.slug === "string" ? data.slug : fallbackSlug,
          title: typeof data.title === "string" ? data.title : fallbackSlug,
          order: typeof data.order === "number" ? data.order : undefined,
          estimatedMinutes:
            typeof data.estimatedMinutes === "number"
              ? data.estimatedMinutes
              : undefined,
          summary: typeof data.summary === "string" ? data.summary : undefined,
          firstParagraph: extractFirstParagraph(body),
        };
      }),
  );
  return entries.sort(compareEntries);
}

export async function getContentEntry(
  collection: string,
  slug: string,
): Promise<ContentEntry | null> {
  const all = await listContent(collection);
  return all.find((entry) => entry.slug === slug) ?? null;
}
