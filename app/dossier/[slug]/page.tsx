import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { getContentEntry, listContent } from "@/lib/content";

interface DossierPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const entries = await listContent("dossier");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: DossierPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry("dossier", slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.title} — Logan dossier`,
    description: entry.firstParagraph,
  };
}

export default async function DossierEntryPage({ params }: DossierPageProps) {
  const { slug } = await params;
  const entry = await getContentEntry("dossier", slug);
  if (!entry) notFound();

  const all = await listContent("dossier");
  const Mdx = (await import(`@/content/dossier/${entry.slug}.mdx`)).default;

  return (
    <InnerPageShell
      eyebrow="v. · the dossier"
      title={entry.title}
      breadcrumbs={[
        { label: "the toolkit", href: "/" },
        { label: "dossier", href: "/dossier" },
        { label: entry.title },
      ]}
      sidebar={all.map((item) => ({
        label: item.title,
        href: `/dossier/${item.slug}`,
        active: item.slug === entry.slug,
      }))}
    >
      <Mdx />
    </InnerPageShell>
  );
}
