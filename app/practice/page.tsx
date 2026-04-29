import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { PracticeChecklist } from "@/components/PracticeChecklist";
import { PRACTICE_PHASES as PHASES } from "@/lib/practice-phases";

export const metadata: Metadata = {
  title: "Practice — get this job",
  description:
    "A four-phase plan to land the Logan Marketing role and run it well from day one.",
};

export default function PracticePage() {
  return (
    <InnerPageShell
      eyebrow="ii. · job-prep roadmap"
      title="Get this job"
      intro="Mily, this is a four-phase plan to land the Logan Marketing role and run it well from day one. Work it in order — prepare, take the interview, secure the offer, then build the remote setup that makes the rest of the work easy. Check things off as you go; the boxes save on this device."
      breadcrumbs={[
        { label: "the toolkit", href: "/" },
        { label: "get this job" },
      ]}
    >
      <nav
        aria-label="Phases"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 32,
          fontFamily: "var(--mono)",
          fontSize: 11,
        }}
      >
        {PHASES.map((phase) => (
          <a
            key={phase.slug}
            href={`#${phase.slug}`}
            style={{
              padding: "6px 12px",
              borderRadius: 99,
              border: "1px dashed var(--line)",
              color: "var(--lavigo-400)",
              textDecoration: "none",
            }}
          >
            {phase.num} {phase.title.toLowerCase()}
          </a>
        ))}
      </nav>

      <div className="cards" style={{ marginBottom: 36 }}>
        {PHASES.map((phase) => (
          <a
            key={`card-${phase.slug}`}
            href={`#${phase.slug}`}
            className="card tape"
          >
            <span className="card-num">{phase.num}</span>
            <h3>{phase.title.toLowerCase()}</h3>
            <p>{phase.description}</p>
            <div className="card-meta">
              <span>{phase.items.length} tasks</span>
              <span aria-hidden="true">·</span>
              <span>jump to phase →</span>
            </div>
          </a>
        ))}
      </div>

      {PHASES.map((phase) => (
        <section
          key={phase.slug}
          id={phase.slug}
          style={{
            background: "var(--paper-2)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: "26px 28px",
            marginBottom: 28,
            scrollMarginTop: 24,
          }}
        >
          <div
            className="section-head"
            style={{ marginBottom: 14, marginTop: 0 }}
          >
            <span className="section-num">{phase.num}</span>
            <h2 className="section-title">{phase.title.toLowerCase()}</h2>
            <span className="section-line" />
            <span className="section-tag">{phase.items.length} tasks</span>
          </div>
          <p
            style={{
              maxWidth: 640,
              fontFamily: "var(--sans)",
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: "0 0 4px",
            }}
          >
            {phase.intro}
          </p>
          <PracticeChecklist id={phase.slug} items={phase.items} />
        </section>
      ))}
    </InnerPageShell>
  );
}
