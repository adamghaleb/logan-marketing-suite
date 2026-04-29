import Link from "next/link";
import type { Metadata } from "next";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dossier · Mily Suite",
  description:
    "How Logan writes — tone, structure, and the do's and don'ts pulled from real pages.",
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

export default async function DossierIndexPage() {
  const entries = await listContent("dossier");

  return (
    <main className="page">
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
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section-head">
          <span className="section-num">v.</span>
          <h2 className="section-title">Logan voice dossier</h2>
          <span className="section-line" />
          <span className="section-tag">{entries.length} chapters</span>
        </div>
        <p
          style={{
            maxWidth: "55ch",
            color: "var(--ink-2)",
            marginBottom: 24,
          }}
        >
          How Logan writes — the tone, the structure, the do's and don'ts.
          Pulled from real pages they've shipped.
        </p>
        <div className="cards">
          {entries.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/dossier/${entry.slug}`}
              className="card"
            >
              <span className="card-num">{romanNumeral(i + 1)}</span>
              <h3>{entry.title}</h3>
              <p>{entry.firstParagraph}</p>
              <div className="card-meta">voice + tone</div>
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
