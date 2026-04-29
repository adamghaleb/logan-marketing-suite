import type { Metadata } from "next";
import InstallGuideContent from "@/content/install-guide.mdx";

export const metadata: Metadata = {
  title: "Install guide — Mily Suite",
  description:
    "How to drop all 9 Mily skills onto your computer with one command, in plain English.",
};

const ONE_LINER =
  "curl -fsSL https://raw.githubusercontent.com/adamghaleb/logan-marketing-suite/main/public/install.sh | bash";

export default function InstallGuidePage() {
  return (
    <main className="page">
      <article className="install-guide">
        <header className="install-guide__intro">
          <p className="install-guide__eyebrow">For Mily, from Adam</p>
          <h1 className="install-guide__title">Install guide</h1>
          <p className="install-guide__lede">
            One paste, one Enter, and Claude Code picks up all 9 Logan skills.
            Hold here for a second, read what you&apos;re about to run, then go.
          </p>
        </header>

        <section
          className="install-guide__one-liner"
          aria-label="The one-liner"
        >
          <p className="install-guide__one-liner-label">
            Paste this into your terminal:
          </p>
          <pre className="install-guide__one-liner-code">
            <code>{ONE_LINER}</code>
          </pre>
          <p className="install-guide__one-liner-note">
            That&apos;s it. The full walkthrough below explains exactly what
            happens when you hit Enter, how to undo it, and what to try first.
          </p>
        </section>

        <section className="install-guide__body">
          <InstallGuideContent />
        </section>
      </article>
    </main>
  );
}
