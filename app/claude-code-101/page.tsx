import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code 101 · Mily Suite",
  description: "Coming soon.",
};

export default function ClaudeCode101Page() {
  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <span className="section-num">·</span>
          <h2 className="section-title">Claude Code 101</h2>
          <span className="section-line" />
          <span className="section-tag">coming soon</span>
        </div>
        <p style={{ maxWidth: "50ch", color: "var(--ink-2)" }}>
          A plain-English primer on Claude Code — what it is, why it&apos;s the
          home for the Mily skills, and how to drive it on day one.
        </p>
        <p
          style={{
            maxWidth: "50ch",
            color: "var(--ink-3)",
            fontSize: "0.95rem",
          }}
        >
          Check back — Adam&apos;s still cooking this one.
        </p>
      </section>
    </main>
  );
}
