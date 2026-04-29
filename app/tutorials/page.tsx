import Link from "next/link";
import type { Metadata } from "next";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tutorials · Mily Suite",
  description:
    "Step-by-step walkthroughs for the work you'll do most often on the job at Logan Marketing.",
};

const ROMAN: ReadonlyArray<string> = [
  "i.",
  "ii.",
  "iii.",
  "iv.",
  "v.",
  "vi.",
  "vii.",
  "viii.",
  "ix.",
  "x.",
  "xi.",
  "xii.",
  "xiii.",
  "xiv.",
  "xv.",
];

function romanNumeral(n: number): string {
  return ROMAN[n - 1] ?? `${n}.`;
}

export default async function TutorialsIndexPage() {
  const entries = await listContent("tutorials");

  return (
    <main className="page">
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section-head">
          <span className="section-num">ii.</span>
          <h2 className="section-title">Tutorials</h2>
          <span className="section-line" />
          <span className="section-tag">{entries.length} walkthroughs</span>
        </div>
        <p
          style={{
            maxWidth: "55ch",
            color: "var(--ink-2)",
            marginBottom: 24,
          }}
        >
          Step-by-step walkthroughs for the things you'll do most often on the
          job. Read once, build once, you've got it.
        </p>
        <div className="cards">
          {entries.map((entry, i) => {
            const meta =
              typeof entry.estimatedMinutes === "number"
                ? `${entry.estimatedMinutes} min`
                : "guided practice";
            return (
              <Link
                key={entry.slug}
                href={`/tutorials/${entry.slug}`}
                className="card"
              >
                <span className="card-num">{romanNumeral(i + 1)}</span>
                <h3>{entry.title}</h3>
                <p>{entry.firstParagraph}</p>
                <div className="card-meta">{meta}</div>
              </Link>
            );
          })}
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
