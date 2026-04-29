import Link from "next/link";
import { PracticeChecklist } from "@/components/PracticeChecklist";
import { PRACTICE_PHASES } from "@/lib/practice-phases";

export function Practice() {
  const firstPhase = PRACTICE_PHASES[0];

  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">ii.</span>
        <h2 className="section-title">checklist</h2>
        <span className="section-line" />
        <span className="section-tag">phase 01 · prep the interview</span>
      </div>
      <p
        style={{
          fontFamily: "var(--sans)",
          fontSize: 15.5,
          lineHeight: 1.6,
          color: "var(--ink-2)",
          margin: "0 0 6px",
          maxWidth: 640,
        }}
      >
        The first phase of <strong>get this job</strong> — checks save on this
        device and stay synced with the full roadmap.
      </p>
      <PracticeChecklist id={firstPhase.slug} items={firstPhase.items} />
      <div style={{ marginTop: 14 }}>
        <Link
          href={`/practice#${firstPhase.slug}`}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--lavigo-400)",
            textDecoration: "none",
            borderBottom: "1px dashed var(--lavigo-200)",
            paddingBottom: 1,
          }}
        >
          view the full four-phase roadmap →
        </Link>
      </div>
    </section>
  );
}
