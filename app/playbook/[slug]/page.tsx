import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { getContentEntry, listContent } from "@/lib/content";

interface PlaybookEntryPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const entries = await listContent("playbook");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: PlaybookEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry("playbook", slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.title} — Logan playbook`,
    description: entry.firstParagraph,
  };
}

export default async function PlaybookEntryPage({
  params,
}: PlaybookEntryPageProps) {
  const { slug } = await params;
  const entry = await getContentEntry("playbook", slug);
  if (!entry) notFound();

  const all = await listContent("playbook");

  const Mdx = (await import(`@/content/playbook/${entry.slug}.mdx`)).default;

  return (
    <InnerPageShell
      eyebrow="i. · the playbook"
      title={entry.title}
      breadcrumbs={[
        { label: "the toolkit", href: "/" },
        { label: "playbook", href: "/playbook" },
        { label: entry.title },
      ]}
      sidebar={all.map((item) => ({
        label: item.title,
        href: `/playbook/${item.slug}`,
        active: item.slug === entry.slug,
      }))}
    >
      <Mdx />
    </InnerPageShell>
  );
}
