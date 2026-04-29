import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The four layers of help · Mily Suite",
  description: "Coming soon.",
};

export default function FourLayersPage() {
  return (
    <main className="page">
      <section className="section">
        <div className="section-head">
          <span className="section-num">·</span>
          <h2 className="section-title">The four layers of help</h2>
          <span className="section-line" />
          <span className="section-tag">coming soon</span>
        </div>
        <p style={{ maxWidth: "50ch", color: "var(--ink-2)" }}>
          A simple way to think about how AI helps you build websites — from
          &ldquo;just give me advice&rdquo; up to &ldquo;live in Elementor with
          me.&rdquo;
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
