import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { listContent } from "@/lib/content";
import SampleBrief from "@/content/practice/sample-brief.mdx";
import Exercises from "@/content/practice/exercises.mdx";
import Rubric from "@/content/practice/rubric.mdx";

export const metadata: Metadata = {
  title: "Practice — Logan Marketing toolkit",
};

export default async function PracticePage() {
  const entries = await listContent("practice");
  const sectionStyle = {
    background: "var(--paper-2)",
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: "26px 28px",
    marginBottom: 28,
  } as const;
  const sectionMap = {
    "sample-brief": SampleBrief,
    exercises: Exercises,
    rubric: Rubric,
  } as const;

  return (
    <InnerPageShell
      eyebrow="iv. · daily reps"
      title="Practice briefs"
      intro="Real-shaped prompts. Twenty to forty minutes each. Done is better than perfect; perfect is the wrong target anyway. Mily, work through these in order — sample brief first, then exercises, then run yourself through the rubric."
      breadcrumbs={[{ label: "the toolkit", href: "/" }, { label: "practice" }]}
    >
      <nav
        aria-label="Practice sections"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 28,
          fontFamily: "var(--mono)",
          fontSize: 11,
        }}
      >
        {entries.map((entry) => (
          <a
            key={entry.slug}
            href={`#${entry.slug}`}
            style={{
              padding: "6px 12px",
              borderRadius: 99,
              border: "1px dashed var(--line)",
              color: "var(--lavigo-400)",
              textDecoration: "none",
            }}
          >
            {entry.title}
          </a>
        ))}
      </nav>

      {entries.map((entry) => {
        const Component =
          sectionMap[entry.slug as keyof typeof sectionMap] ?? null;
        if (!Component) return null;
        return (
          <section
            key={entry.slug}
            id={entry.slug}
            style={sectionStyle}
            className="mdx-body"
          >
            <h2
              className="prose-title"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                margin: "0 0 16px",
                color: "var(--lavigo-800)",
              }}
            >
              {entry.title}
            </h2>
            <Component />
          </section>
        );
      })}
    </InnerPageShell>
  );
}
