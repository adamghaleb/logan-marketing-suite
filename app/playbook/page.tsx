import Link from "next/link";
import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { listContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Logan Marketing playbook",
};

export default async function PlaybookIndexPage() {
  const entries = await listContent("playbook");

  return (
    <InnerPageShell
      eyebrow="i. · the playbook"
      title="The Logan Marketing playbook"
      intro="Twelve patterns Mily will see again and again on Logan builds — what each one is, when to use it, and what makes it Logan-shaped. Adam wrote these to feel like a senior designer leaning over your shoulder."
      breadcrumbs={[{ label: "the toolkit", href: "/" }, { label: "playbook" }]}
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
                  href={`/playbook/${entry.slug}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="prose-body">{entry.firstParagraph}</p>
              <Link
                href={`/playbook/${entry.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--lavigo-400)",
                }}
              >
                read the entry →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </InnerPageShell>
  );
}
