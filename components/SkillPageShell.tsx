import Link from "next/link";
import type { ReactNode } from "react";
import type { SkillCard } from "@/lib/constants";
import "@/app/styles/inner.css";

interface SkillPageShellProps {
  readonly card: SkillCard;
  readonly nextCard: SkillCard | null;
  readonly children: ReactNode;
}

export function SkillPageShell({
  card,
  nextCard,
  children,
}: SkillPageShellProps) {
  return (
    <main className="page">
      <div
        className="page-inner"
        data-screen-label={`Mily suite — ${card.title}`}
      >
        <Link href="/" className="back-link">
          <span
            style={{
              fontFamily: "var(--hand)",
              fontSize: 22,
              color: "var(--lavigo-400)",
              lineHeight: 1,
            }}
          >
            ←
          </span>
          <span>back to the toolkit</span>
        </Link>

        <div className="inner-eyebrow">
          {card.num} · {card.meta}
        </div>
        <h1 className="inner-h1">{card.title}</h1>
        <p className="inner-intro">{card.description}</p>

        <article className="skill-mdx">{children}</article>

        {nextCard ? (
          <Link href={nextCard.route} className="skill-next">
            <span className="skill-next-label">next skill</span>
            <span className="skill-next-title">
              {nextCard.num} {nextCard.title}
            </span>
            <span className="skill-next-arrow">→</span>
          </Link>
        ) : (
          <Link href="/" className="skill-next">
            <span className="skill-next-label">that's the last one</span>
            <span className="skill-next-title">back to the toolkit</span>
            <span className="skill-next-arrow">→</span>
          </Link>
        )}
      </div>
    </main>
  );
}
