import Link from "next/link";
import { SKILL_CARDS, type SkillCard } from "@/lib/constants";

function cardClassName(card: SkillCard): string {
  const parts = ["card"];
  if (card.tape) parts.push("tape");
  if (card.tapePeach) parts.push("tape-peach");
  return parts.join(" ");
}

export function Cards() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">i.</span>
        <h2 className="section-title">your toolkit</h2>
        <span className="section-line" />
        <span className="section-tag">nine Claude skills, Logan-shaped</span>
      </div>
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
    </section>
  );
}
