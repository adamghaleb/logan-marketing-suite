// Tests for the Bingus prompt assembler.
//
// Run with:  npx tsx --test lib/__tests__/bingus-prompt.test.ts
//
// Why tsx: Node 22's built-in --test runner can't load .ts directly without
// a TypeScript loader. tsx is the lightest option and is already on the box.

import test from "node:test";
import assert from "node:assert/strict";
import {
  assembleBingusPrompt,
  buildContentDigest,
  type BingusPromptInput,
} from "../bingus-prompt.ts";

const FAKE_BIBLE = "# BINGUS.md\n\nBingus is a goofy nerdy cat. Mily. Adam.";
const FAKE_TEMPLATE =
  "# Bingus System Prompt Template\n\nYou are Bingus. You serve Mily. Adam made you.";
const FAKE_DIGEST = "Skills: x. Playbook: y. Four-layer: z.";

function baseInput(
  overrides: Partial<BingusPromptInput> = {},
): BingusPromptInput {
  return {
    characterBible: FAKE_BIBLE,
    promptTemplate: FAKE_TEMPLATE,
    contentDigest: FAKE_DIGEST,
    mode: "casual",
    userMessage: "hi bingus",
    recentTurns: [],
    ...overrides,
  };
}

test("system prompt includes the character bible verbatim", () => {
  const result = assembleBingusPrompt(baseInput());
  assert.ok(
    result.system.includes("Bingus is a goofy nerdy cat. Mily. Adam."),
    "character bible body should be embedded in system prompt",
  );
  assert.ok(
    result.system.includes("Character Bible"),
    "character bible should be labeled as a section",
  );
});

test("system prompt includes the prompt template body", () => {
  const result = assembleBingusPrompt(baseInput());
  assert.ok(
    result.system.includes("You are Bingus. You serve Mily. Adam made you."),
    "template body should be embedded in system prompt",
  );
});

test("casual mode and locked-in mode produce different system prompts", () => {
  const casual = assembleBingusPrompt(baseInput({ mode: "casual" }));
  const lockedIn = assembleBingusPrompt(baseInput({ mode: "locked-in" }));
  assert.notEqual(casual.system, lockedIn.system);
  assert.ok(
    casual.system.includes("CASUAL MODE"),
    "casual prompt should label its mode",
  );
  assert.ok(
    lockedIn.system.includes("LOCKED-IN MODE"),
    "locked-in prompt should label its mode",
  );
});

test("Mily and Adam are capitalized in the assembled output", () => {
  const result = assembleBingusPrompt(baseInput());
  assert.ok(result.system.includes("Mily"));
  assert.ok(result.system.includes("Adam"));
  assert.ok(
    result.system.includes("**Mily**") && result.system.includes("**Adam**"),
    "name rules section should bold Mily and Adam",
  );
});

test("empty recentTurns produces messages array with just the user message", () => {
  const result = assembleBingusPrompt(baseInput({ recentTurns: [] }));
  assert.equal(result.messages.length, 1);
  assert.deepEqual(result.messages[0], { role: "user", content: "hi bingus" });
});

test("missing recentTurns (undefined) is treated as empty", () => {
  const input = baseInput();
  delete (input as Partial<BingusPromptInput>).recentTurns;
  const result = assembleBingusPrompt(input);
  assert.equal(result.messages.length, 1);
  assert.equal(result.messages[0].content, "hi bingus");
});

test("recentTurns are preserved and ordered before the new user message", () => {
  const result = assembleBingusPrompt(
    baseInput({
      recentTurns: [
        { role: "user", content: "earlier question" },
        { role: "assistant", content: "earlier reply from Bingus" },
      ],
      userMessage: "follow up",
    }),
  );
  assert.equal(result.messages.length, 3);
  assert.equal(result.messages[0].content, "earlier question");
  assert.equal(result.messages[1].content, "earlier reply from Bingus");
  assert.equal(result.messages[2].content, "follow up");
});

test("buildContentDigest returns a string containing all three parts", () => {
  const digest = buildContentDigest({
    skills: ["logan-elementor-page-build", "logan-copy-pass"],
    playbookTopics: ["Buttons", "Hero sections"],
    fourLayers: "Foundation, Patterns, Pages, Practice.",
  });
  assert.ok(digest.includes("logan-elementor-page-build"));
  assert.ok(digest.includes("Buttons"));
  assert.ok(digest.includes("Foundation, Patterns, Pages, Practice."));
  assert.ok(digest.includes("Skills installed (2)"));
  assert.ok(digest.includes("Playbook topics (2)"));
});

test("buildContentDigest handles empty inputs gracefully", () => {
  const digest = buildContentDigest({
    skills: [],
    playbookTopics: [],
    fourLayers: "",
  });
  assert.ok(digest.includes("none yet") || digest.includes("not loaded"));
  assert.equal(typeof digest, "string");
});

test("long content digests get truncated under the soft cap", () => {
  const longDigest = "x ".repeat(5000); // 10000 chars
  const result = assembleBingusPrompt(baseInput({ contentDigest: longDigest }));
  // The digest section in the system prompt should not contain the full 10000 chars.
  // Soft cap is 4000; section adds a header + truncation marker so total digest section is under ~4500.
  const digestStart = result.system.indexOf("## Suite Content Digest");
  assert.ok(digestStart >= 0);
  const digestSection = result.system.slice(digestStart);
  assert.ok(
    digestSection.length < longDigest.length,
    "digest section should be shorter than the raw input",
  );
  assert.ok(
    digestSection.includes("digest truncated"),
    "digest section should include the truncation marker",
  );
});

test("short content digests are NOT truncated", () => {
  const result = assembleBingusPrompt(baseInput());
  assert.ok(result.system.includes(FAKE_DIGEST));
  assert.ok(!result.system.includes("digest truncated"));
});

test("malformed recentTurns entries are filtered out", () => {
  const result = assembleBingusPrompt(
    baseInput({
      recentTurns: [
        { role: "user", content: "valid" },
        // @ts-expect-error testing runtime guard
        { role: "system", content: "should be dropped" },
        // @ts-expect-error testing runtime guard
        { role: "assistant", content: 42 },
      ],
    }),
  );
  // Only the valid turn + the new user message survive.
  assert.equal(result.messages.length, 2);
  assert.equal(result.messages[0].content, "valid");
});
