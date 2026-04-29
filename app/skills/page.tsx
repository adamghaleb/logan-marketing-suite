import Link from "next/link";
import { SKILL_CARDS, type SkillCard } from "@/lib/constants";

export const metadata = {
  title: "Claude Code skills · Mily Suite",
  description: "Nine custom Claude Code skills, Logan-shaped.",
};

function cardClassName(card: SkillCard): string {
  const parts = ["card"];
  if (card.tape) parts.push("tape");
  if (card.tapePeach) parts.push("tape-peach");
  return parts.join(" ");
}

export default function SkillsIndexPage() {
  return (
    <main className="page">
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section-head">
          <span className="section-num">i.</span>
          <h2 className="section-title">Claude Code skills</h2>
          <span className="section-line" />
          <span className="section-tag">nine Claude skills, Logan-shaped</span>
        </div>

        <p className="sub" style={{ maxWidth: 640, marginBottom: 14 }}>
          Nine custom Claude Code skills you install into your own Claude Code —
          each one scoped to Logan Marketing's WordPress and Elementor workflow.
        </p>
        <p className="sub" style={{ maxWidth: 640, marginBottom: 32 }}>
          Drop them in once and Claude knows your section library, your QA
          checklist, your handoff format, and the inside template you build
          everything off of. Click any skill to see what it does, when to reach
          for it, and how it behaves in practice.
        </p>

        <div className="cards">
          {SKILL_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={card.route}
              className={cardClassName(card)}
            >
              <span className="card-num">{card.num}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="card-meta">{card.meta}</div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 36 }}>
          <Link href="/" style={{ fontSize: 14 }}>
            ← back to the suite
          </Link>
        </p>
      </section>
    </main>
  );
}
