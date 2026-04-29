import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";

export const metadata: Metadata = {
  title: "Claude Code 101 · Mily Suite",
  description:
    "What Claude Code is, what it can do, what it can't do — explained for a smart person who isn't into the technical side.",
};

export default async function ClaudeCode101Page() {
  const Mdx = (await import("@/content/claude-code-101/index.mdx")).default;
  return (
    <InnerPageShell
      eyebrow="primer · claude code 101"
      title="Claude Code 101"
      breadcrumbs={[{ label: "home", href: "/" }, { label: "claude code 101" }]}
    >
      <Mdx />
    </InnerPageShell>
  );
}
