import Link from "next/link";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tutorials — Logan Marketing toolkit",
};

export default async function TutorialsIndexPage() {
  const entries = await listContent("tutorials");

  return (
    <InnerPageShell
      eyebrow="ii. · tutorials"
      title="Step-by-step tutorials"
      intro="Four end-to-end walkthroughs of the most common first-week tasks. Mily can do these cold; Adam wrote them so you can follow along on real Logan work."
      breadcrumbs={[
        { label: "the toolkit", href: "/" },
        { label: "tutorials" },
      ]}
    >
      <div className="prose-list">
        {entries.map((entry, index) => (
          <article key={entry.slug} className="prose-row">
            <div className="prose-num">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="prose-title">
                <Link
                  href={`/tutorials/${entry.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {entry.title}
                </Link>
              </h3>
              {typeof entry.estimatedMinutes === "number" && (
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--lavigo-400)",
                    margin: "0 0 6px",
                  }}
                >
                  ~{entry.estimatedMinutes} min
                </div>
              )}
              <p className="prose-body">{entry.firstParagraph}</p>
              <Link
                href={`/tutorials/${entry.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--lavigo-400)",
                }}
              >
                start the tutorial →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </InnerPageShell>
  );
}
