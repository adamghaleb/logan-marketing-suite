import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SKILL_SLUGS } from "@/lib/constants";
import {
  getNextSkillCard,
  getSkillCard,
  getSkillMdx,
  isSkillSlug,
} from "@/lib/skill-content";
import { SkillPageShell } from "@/components/SkillPageShell";

interface SkillPageParams {
  readonly slug: string;
}

interface SkillPageProps {
  readonly params: Promise<SkillPageParams>;
}

export function generateStaticParams(): readonly SkillPageParams[] {
  return SKILL_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isSkillSlug(slug)) {
    return { title: "Skill not found — Mily" };
  }
  const card = getSkillCard(slug);
  return {
    title: `${card.title} — Mily skill`,
    description: card.description,
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  if (!isSkillSlug(slug)) {
    notFound();
  }

  const card = getSkillCard(slug);
  const nextCard = getNextSkillCard(slug);
  const SkillMdx = getSkillMdx(slug);

  return (
    <SkillPageShell card={card} nextCard={nextCard}>
      <SkillMdx />
    </SkillPageShell>
  );
}
