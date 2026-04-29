// POST /api/bingus/chat
//
// Server-side handler for the Bingus chat dock. Validates the body, assembles
// the system prompt via lib/bingus-prompt.ts (using BINGUS.md + BINGUS_PROMPT.md
// from disk), calls the Anthropic SDK with retry-with-backoff, and returns
// `{ message: string }`.
//
// Behavior contract (from issue #15):
// - Model: claude-haiku-4-5-20251001 (fast + cheap, right for a chat sidekick).
// - Retries: 3 attempts after the first, 1s/2s/4s + jitter, on 5xx + network
//   only. Never on 4xx. Reuses lib/retry-with-backoff.ts.
// - Validation: hand-rolled. Reject malformed bodies with 400.
// - Caps: message <= 4000 chars, recentTurns <= 20 entries (older truncated).
// - Missing ANTHROPIC_API_KEY returns a friendly fallback at status 200, never
//   500. Mily should never see a stack trace.
// - Mily and Adam are always capitalized in user-facing strings.
// - Runtime: nodejs (the Anthropic SDK requires Node).

import { promises as fs } from "node:fs";
import path from "node:path";
import Anthropic, { APIError } from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import {
  assembleBingusPrompt,
  buildContentDigest,
  type BingusPromptInput,
} from "@/lib/bingus-prompt";
import { retryWithBackoff } from "@/lib/retry-with-backoff";

export const runtime = "nodejs";

const MODEL_ID = "claude-haiku-4-5-20251001";
const MAX_OUTPUT_TOKENS = 1024;
const MAX_MESSAGE_CHARS = 4000;
const MAX_RECENT_TURNS = 20;

const MISSING_KEY_FALLBACK = "meow, Adam forgot to plug in my brain";
const GENERIC_FAILURE_FALLBACK =
  "meow. something went sideways on my end. try me again in a sec, Mily";

interface ParsedTurn {
  readonly role: "user" | "assistant";
  readonly content: string;
}

interface ParsedBody {
  readonly message: string;
  readonly mode: "casual" | "locked-in";
  readonly recentTurns: ParsedTurn[];
}

interface ValidationFailure {
  readonly ok: false;
  readonly error: string;
}

interface ValidationSuccess {
  readonly ok: true;
  readonly value: ParsedBody;
}

type ValidationResult = ValidationSuccess | ValidationFailure;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseTurn(raw: unknown): ParsedTurn | null {
  if (!isPlainObject(raw)) return null;
  const role = raw.role;
  const content = raw.content;
  if (role !== "user" && role !== "assistant") return null;
  if (typeof content !== "string") return null;
  return { role, content };
}

function validateBody(raw: unknown): ValidationResult {
  if (!isPlainObject(raw)) {
    return { ok: false, error: "body must be a JSON object" };
  }

  if (typeof raw.message !== "string") {
    return { ok: false, error: "message must be a string" };
  }
  const trimmed = raw.message.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "message must not be empty" };
  }
  const cappedMessage =
    trimmed.length > MAX_MESSAGE_CHARS
      ? trimmed.slice(0, MAX_MESSAGE_CHARS)
      : trimmed;

  let mode: "casual" | "locked-in" = "casual";
  if (raw.mode !== undefined) {
    if (raw.mode !== "casual" && raw.mode !== "locked-in") {
      return { ok: false, error: "mode must be 'casual' or 'locked-in'" };
    }
    mode = raw.mode;
  }

  let recentTurns: ParsedTurn[] = [];
  if (raw.recentTurns !== undefined) {
    if (!Array.isArray(raw.recentTurns)) {
      return { ok: false, error: "recentTurns must be an array" };
    }
    const parsed: ParsedTurn[] = [];
    for (const turn of raw.recentTurns) {
      const valid = parseTurn(turn);
      if (!valid) {
        return {
          ok: false,
          error: "recentTurns entries must be { role, content }",
        };
      }
      parsed.push(valid);
    }
    // Cap at the most recent N entries — older turns get dropped.
    recentTurns =
      parsed.length > MAX_RECENT_TURNS
        ? parsed.slice(parsed.length - MAX_RECENT_TURNS)
        : parsed;
  }

  return {
    ok: true,
    value: { message: cappedMessage, mode, recentTurns },
  };
}

let cachedPromptFiles: {
  readonly characterBible: string;
  readonly promptTemplate: string;
} | null = null;

async function loadPromptFiles(): Promise<{
  readonly characterBible: string;
  readonly promptTemplate: string;
}> {
  if (cachedPromptFiles) return cachedPromptFiles;

  const root = process.cwd();
  const [characterBible, promptTemplate] = await Promise.all([
    fs.readFile(path.join(root, "BINGUS.md"), "utf8"),
    fs.readFile(path.join(root, "BINGUS_PROMPT.md"), "utf8"),
  ]);

  cachedPromptFiles = { characterBible, promptTemplate };
  return cachedPromptFiles;
}

function buildDefaultDigest(): string {
  // Minimal digest until the MDX-driven build-time digest lands. Keeps Bingus
  // honest: he knows the suite shape but admits when he hasn't read a page.
  return buildContentDigest({
    skills: [
      "elementor-build",
      "copy-pass",
      "qa-page",
      "playbook-lookup",
      "client-brief",
      "site-audit",
      "image-prep",
      "launch-check",
      "claude-code-101",
    ],
    playbookTopics: [
      "components",
      "design tokens",
      "copy patterns",
      "QA checklist",
    ],
    fourLayers:
      "Layer 1 advice → Layer 2 templates → Layer 3 staging automation → Layer 4 MCP. Mily can stay on Layer 1 forever and be excellent.",
  });
}

function shouldRetryAnthropicError(error: unknown): boolean {
  // Network / unknown errors → retry. The SDK surfaces these as plain Errors
  // (no `status`) when the request never made it to Anthropic.
  if (!(error instanceof APIError)) return true;

  const status = error.status;
  if (typeof status !== "number") return true;

  // 4xx — never retry. 5xx — retry.
  return status >= 500 && status < 600;
}

interface BingusInput extends BingusPromptInput {}

async function callAnthropic(
  client: Anthropic,
  input: BingusInput,
): Promise<string> {
  const { system, messages } = assembleBingusPrompt(input);

  const response = await retryWithBackoff(
    () =>
      client.messages.create({
        model: MODEL_ID,
        max_tokens: MAX_OUTPUT_TOKENS,
        system,
        messages: messages.map((turn) => ({
          role: turn.role,
          content: turn.content,
        })),
      }),
    { shouldRetry: shouldRetryAnthropicError },
  );

  // Concatenate any text blocks. The SDK returns a list of content blocks; for
  // a plain chat call we expect one or more `text` blocks. Anything else gets
  // ignored, so a stray tool-use block doesn't break the response.
  const textChunks: string[] = [];
  for (const block of response.content) {
    if (block.type === "text" && typeof block.text === "string") {
      textChunks.push(block.text);
    }
  }
  const text = textChunks.join("").trim();
  if (text.length === 0) {
    return GENERIC_FAILURE_FALLBACK;
  }
  return text;
}

export async function POST(request: Request): Promise<Response> {
  let parsedJson: unknown;
  try {
    parsedJson = await request.json();
  } catch {
    return NextResponse.json(
      { error: "request body must be valid JSON" },
      { status: 400 },
    );
  }

  const validation = validateBody(parsedJson);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    // Missing key is an Adam problem, not a Mily problem. Friendly fallback,
    // status 200, no stack trace.
    return NextResponse.json(
      { message: MISSING_KEY_FALLBACK },
      { status: 200 },
    );
  }

  try {
    const { characterBible, promptTemplate } = await loadPromptFiles();
    const contentDigest = buildDefaultDigest();

    const client = new Anthropic({ apiKey });

    const message = await callAnthropic(client, {
      characterBible,
      promptTemplate,
      contentDigest,
      mode: validation.value.mode,
      userMessage: validation.value.message,
      recentTurns: validation.value.recentTurns,
    });

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    // Last-resort fallback. The retry helper already exhausted 5xx/network
    // attempts; anything else (4xx, malformed key, unexpected shape) lands
    // here. We log server-side and hand Mily a friendly line.
    console.error("[bingus/chat] failed to produce a reply:", error);
    return NextResponse.json(
      { message: GENERIC_FAILURE_FALLBACK },
      { status: 200 },
    );
  }
}
