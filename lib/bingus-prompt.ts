// Pure-function assembler for the Bingus system prompt.
// No I/O, no fetch, no SDK. The caller is responsible for loading
// BINGUS.md and BINGUS_PROMPT.md from disk and passing them in.

export interface BingusPromptInput {
  characterBible: string;
  promptTemplate: string;
  contentDigest: string;
  mode: "casual" | "locked-in";
  userMessage: string;
  recentTurns?: { role: "user" | "assistant"; content: string }[];
}

export interface AssembledPrompt {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
}

export interface ContentDigestParts {
  skills: string[];
  playbookTopics: string[];
  fourLayers: string;
}

const CONTENT_DIGEST_SOFT_CAP = 4000;
const SECTION_DIVIDER = "\n\n---\n\n";

const MODE_BLURB: Record<BingusPromptInput["mode"], string> = {
  casual:
    'CASUAL MODE. Mily is in chat-mode, not work-mode. Full Bingus is welcome — offerings, tail flicks, light bits, "It is I, Bingus" sparingly. Stay warm and short. Real reassurance underneath the cat stuff.',
  "locked-in":
    "LOCKED-IN MODE. Mily is working on something specific. One Bingus-ism at the start or end at most, then crisp clean help. Numbered steps. Be specific. Cat stays in the room, stops performing.",
};

function truncateDigest(digest: string, cap: number): string {
  if (digest.length <= cap) return digest;
  const head = digest.slice(0, cap);
  const lastBreak = Math.max(head.lastIndexOf("\n"), head.lastIndexOf(". "));
  const cutAt = lastBreak > cap * 0.6 ? lastBreak : cap;
  return (
    head.slice(0, cutAt).trimEnd() +
    "\n\n[…digest truncated for prompt budget…]"
  );
}

function formatModeSection(mode: BingusPromptInput["mode"]): string {
  return `## Current mode\n\n${MODE_BLURB[mode]}`;
}

function formatCharacterBibleSection(bible: string): string {
  const trimmed = bible.trim();
  return `## Character Bible (BINGUS.md, verbatim)\n\n${trimmed}`;
}

function formatDigestSection(digest: string): string {
  const truncated = truncateDigest(digest.trim(), CONTENT_DIGEST_SOFT_CAP);
  return `## Suite Content Digest\n\n${truncated}`;
}

function formatNameRules(): string {
  return [
    "## Name capitalization",
    "",
    "Always write **Mily** with a capital M. Always write **Adam** with a capital A. These are proper names. Lowercased forms are wrong.",
  ].join("\n");
}

export function assembleBingusPrompt(
  input: BingusPromptInput,
): AssembledPrompt {
  const sections = [
    input.promptTemplate.trim(),
    formatCharacterBibleSection(input.characterBible),
    formatModeSection(input.mode),
    formatDigestSection(input.contentDigest),
    formatNameRules(),
  ];

  const system = sections.join(SECTION_DIVIDER).trim();

  const recent = (input.recentTurns ?? []).filter(
    (turn) =>
      turn &&
      (turn.role === "user" || turn.role === "assistant") &&
      typeof turn.content === "string",
  );

  const messages: AssembledPrompt["messages"] = [
    ...recent.map((turn) => ({ role: turn.role, content: turn.content })),
    { role: "user" as const, content: input.userMessage },
  ];

  return { system, messages };
}

export function buildContentDigest(parts: ContentDigestParts): string {
  const skillsLine =
    parts.skills.length > 0
      ? `**Skills installed (${parts.skills.length})**: ${parts.skills.join(", ")}`
      : "**Skills installed**: none yet.";

  const playbookLine =
    parts.playbookTopics.length > 0
      ? `**Playbook topics (${parts.playbookTopics.length})**: ${parts.playbookTopics.join(", ")}`
      : "**Playbook topics**: none yet.";

  const fourLayersLine =
    parts.fourLayers.trim().length > 0
      ? `**Four-layer system**: ${parts.fourLayers.trim()}`
      : "**Four-layer system**: not loaded.";

  return [skillsLine, playbookLine, fourLayersLine].join("\n\n");
}
