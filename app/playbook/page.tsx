import Link from "next/link";
import type { Metadata } from "next";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Playbook · Mily Suite",
  description:
    "The patterns Logan Marketing ships over and over — copy, hierarchy, and the way each section reads.",
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

export default async function PlaybookIndexPage() {
  const entries = await listContent("playbook");

  return (
    <main className="page">
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section-head">
          <span className="section-num">iii.</span>
          <h2 className="section-title">Logan playbook</h2>
          <span className="section-line" />
          <span className="section-tag">{entries.length} patterns</span>
        </div>
        <p
          style={{
            maxWidth: "55ch",
            color: "var(--ink-2)",
            marginBottom: 24,
          }}
        >
          Logan ships these patterns over and over. Open one, see what makes it
          Logan-shaped — copy length, photography, hierarchy, the way a CTA
          reads.
        </p>
        <div className="cards">
          {entries.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/playbook/${entry.slug}`}
              className="card"
            >
              <span className="card-num">{romanNumeral(i + 1)}</span>
              <h3>{entry.title}</h3>
              <p>{entry.firstParagraph}</p>
              <div className="card-meta">section pattern</div>
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
