import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { getContentEntry, listContent } from "@/lib/content";

interface TutorialPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const entries = await listContent("tutorials");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: TutorialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry("tutorials", slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.title} — Logan tutorials`,
    description: entry.firstParagraph,
  };
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { slug } = await params;
  const entry = await getContentEntry("tutorials", slug);
  if (!entry) notFound();

  const all = await listContent("tutorials");
  const Mdx = (await import(`@/content/tutorials/${entry.slug}.mdx`)).default;

  const subtitle =
    typeof entry.estimatedMinutes === "number"
      ? `Roughly ${entry.estimatedMinutes} minutes, start to finish.`
      : undefined;

  return (
    <InnerPageShell
      eyebrow="ii. · tutorials"
      title={entry.title}
      intro={subtitle}
      breadcrumbs={[
        { label: "the toolkit", href: "/" },
        { label: "tutorials", href: "/tutorials" },
        { label: entry.title },
      ]}
      sidebar={all.map((item) => ({
        label: item.title,
        href: `/tutorials/${item.slug}`,
        active: item.slug === entry.slug,
      }))}
    >
      <Mdx />
    </InnerPageShell>
  );
}
