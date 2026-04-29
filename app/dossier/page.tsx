import Link from "next/link";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Logan Marketing dossier",
};

export default async function DossierIndexPage() {
  const entries = await listContent("dossier");

  return (
    <InnerPageShell
      eyebrow="v. · the dossier"
      title="The Logan Marketing dossier"
      intro="Everything Adam could pull together about Logan before Mily walked in — agency profile, voice, the cast of characters, a 90-day plan, and the questions to ask back. Read it as a primer, not a script."
      breadcrumbs={[{ label: "the toolkit", href: "/" }, { label: "dossier" }]}
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
                  href={`/dossier/${entry.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="prose-body">{entry.firstParagraph}</p>
              <Link
                href={`/dossier/${entry.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--lavigo-400)",
                }}
              >
                read this section →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </InnerPageShell>
  );
}
