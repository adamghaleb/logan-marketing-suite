import Link from "next/link";

export const metadata = {
  title: "Templates · Mily Suite",
  description:
    "Three example boutique-inn pages built the way Logan Marketing typically builds them — sections, containers, and copy hierarchy you can lift directly.",
};

interface TemplatePreview {
  readonly slug: string;
  readonly num: string;
  readonly title: string;
  readonly description: string;
  readonly meta: string;
  readonly file: string;
}

const TEMPLATE_PREVIEWS: ReadonlyArray<TemplatePreview> = [
  {
    slug: "inn-homepage",
    num: "01.",
    title: "inn homepage",
    description:
      "Hero, intro split, three-room grid, CTA band, and footer — the bones of a coastal B&B home page.",
    meta: "hero · intro · rooms · cta · footer",
    file: "/templates/inn-homepage.html",
  },
  {
    slug: "rooms-detail",
    num: "02.",
    title: "rooms detail",
    description:
      "Single-room landing: gallery grid, amenities list, sticky booking widget, FAQ, and a closing CTA.",
    meta: "gallery · amenities · booking · faq",
    file: "/templates/rooms-detail.html",
  },
  {
    slug: "contact-stay",
    num: "03.",
    title: "contact & plan a stay",
    description:
      "Contact form, info-card stack, map block, and a three-up section for directions, parking, and check-in.",
    meta: "form · info · map · three-up",
    file: "/templates/contact-stay.html",
  },
];

export default function TemplatesPage() {
  return (
    <main className="page">
      <section className="section" style={{ marginTop: 0 }}>
        <div className="section-head">
          <span className="section-num">iv.</span>
          <h2 className="section-title">template previews</h2>
          <span className="section-line" />
          <span className="section-tag">three boutique-inn pages</span>
        </div>

        <p className="sub" style={{ maxWidth: 640, marginBottom: 14 }}>
          Three example pages built the way Logan typically builds them. Click
          into any preview to see the structural pattern — sections, containers,
          and copy hierarchy you can lift directly into Elementor.
        </p>
        <p className="sub" style={{ maxWidth: 640, marginBottom: 32 }}>
          These are static mocks for a fictional inn (Cedar &amp; Salt Inn,
          Camden, Maine). The shape is what matters; the copy is just to show
          the voice.
        </p>

        <div className="cards">
          {TEMPLATE_PREVIEWS.map((preview) => (
            <a
              key={preview.slug}
              href={preview.file}
              target="_blank"
              rel="noopener noreferrer"
              className="card tape"
            >
              <span className="card-num">{preview.num}</span>
              <div className="card-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--lavigo-600)" }}
                >
                  <rect x="3" y="3" width="16" height="16" rx="2" />
                  <path d="M3 8h16" />
                  <path d="M8 19V8" />
                </svg>
              </div>
              <h3>{preview.title}</h3>
              <p>{preview.description}</p>
              <div className="card-meta">
                <span>{preview.meta}</span>
                <span aria-hidden="true">·</span>
                <span>open preview →</span>
              </div>
            </a>
          ))}
        </div>

        <p
          style={{
            marginTop: 36,
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--ink-3)",
            letterSpacing: "0.04em",
          }}
        >
          previews open in a new tab — they're plain HTML, no framework, just
          the structural pattern Mily and the page-build skill produce.
        </p>

        <p style={{ marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 14 }}>
            ← back to the suite
          </Link>
        </p>
      </section>
    </main>
  );
}
