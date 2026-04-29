import Link from "next/link";
import { TOOLKIT_CATEGORIES, type ToolkitCategory } from "@/lib/constants";

function cardClassName(category: ToolkitCategory): string {
  const parts = ["card"];
  if (category.comingSoon) parts.push("card-soon");
  if (category.tape) parts.push("tape");
  if (category.tapePeach) parts.push("tape-peach");
  return parts.join(" ");
}

function CardBody({ category }: { readonly category: ToolkitCategory }) {
  return (
    <>
      <span className="card-num">{category.num}</span>
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <div className="card-meta">{category.meta}</div>
      {category.comingSoon ? (
        <span className="card-soon-pill">coming soon</span>
      ) : null}
    </>
  );
}

export function Cards() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">i.</span>
        <h2 className="section-title">your toolkit</h2>
        <span className="section-line" />
        <span className="section-tag">seven ways in</span>
      </div>
      <div className="cards">
        {TOOLKIT_CATEGORIES.map((category) => {
          if (category.comingSoon || !category.route) {
            return (
              <div key={category.title} className={cardClassName(category)}>
                <CardBody category={category} />
              </div>
            );
          }
          return (
            <Link
              key={category.title}
              href={category.route}
              className={cardClassName(category)}
            >
              <CardBody category={category} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
