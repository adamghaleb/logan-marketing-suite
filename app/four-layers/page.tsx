import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";

export const metadata: Metadata = {
  title: "The four layers of help · Mily Suite",
  description:
    'A simple way to think about how AI can help you build websites — from "give me advice" all the way to "just do it for me."',
};

export default async function FourLayersPage() {
  const Mdx = (await import("@/content/four-layers/index.mdx")).default;
  return (
    <InnerPageShell
      eyebrow="primer · the four layers"
      title="The four layers of help"
      breadcrumbs={[{ label: "home", href: "/" }, { label: "the four layers" }]}
    >
      <Mdx />
    </InnerPageShell>
  );
}
