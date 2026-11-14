// Inner pages for each tile in the Logan Marketing toolkit
const { useState: useStateP, useEffect: useEffectP } = React;

const PLAYBOOK_CONTENT = {
  intro:
    "Everything you need to know about how Logan Marketing actually works — distilled from their site, their case studies, and the kind of clients they take on.",
  sections: [
    {
      title: "How they describe themselves",
      body: "A boutique studio building unhurried websites for inns, B&Bs, and small hospitality brands. They lean on real photography, slow type, and warm voice. No stock anything.",
    },
    {
      title: "Who hires them",
      body: "Owner-operated inns, family-run B&Bs, small hotel groups under 12 rooms, the occasional restaurant. Budgets are real but modest. Timelines are gentle.",
    },
    {
      title: "Their voice",
      body: "Warm, specific, observational. Long-form captions. They name the innkeepers. They write about breakfast and the dog. Avoid 'experiences' and 'destinations' — say what actually happens there.",
    },
    {
      title: "What they value in a junior designer",
      body: "Taste. Patience. Care with photographs. Willingness to write copy when the client can't. Comfort with a small team where everyone touches everything.",
    },
    {
      title: "Tools you'll see day one",
      body: "Figma, Webflow, Notion, Slack. They handcraft most layouts in Webflow rather than templating. Photo retouching in Lightroom, light Photoshop.",
    },
    {
      title: "First 30 days",
      body: "You'll shadow on two active builds, take ownership of components on a third, and probably write the welcome email for one project. Ask to sit in on the kickoff call.",
    },
  ],
};

const PATTERNS = [
  {
    name: "Hero — image with overlapping caption",
    note: "Big photo, single caption set in the serif, slightly off-grid. Used on most home pages.",
  },
  {
    name: "Room card",
    note: "Photo, room name in serif, two lines of plain prose, rate in mono. No 'Book now' button — just a link.",
  },
  {
    name: "Booking widget — light",
    note: "Three fields. No dropdowns where possible. Submit button labeled 'Check availability', not 'Book'.",
  },
  {
    name: "Slow-fade gallery",
    note: "5–7 images, fade transitions, no arrows. Auto-advances slowly. The rare Logan flourish.",
  },
  {
    name: "Innkeeper letter block",
    note: "A signed paragraph from the owner. Handwritten signature SVG. Always above the contact form.",
  },
  {
    name: "Footer with map",
    note: "Tiny illustrated map of where the inn is, hand-drawn or topographic. Not Google Maps.",
  },
];

const STUDIES = [
  {
    name: "Coastal Maine, October",
    chips: ["#3a4d5c", "#c9b89a", "#7a3e2c", "#f1ece2"],
    note: "Slate, oat, brick, fog. For sites that smell like wet leaves.",
  },
  {
    name: "Vermont in late spring",
    chips: ["#5a7a4e", "#e8d9b8", "#3d2e1f", "#fbf7ee"],
    note: "Moss, butter, walnut, paper. Soft, never neon.",
  },
  {
    name: "A blue door in Charleston",
    chips: ["#3a5a8c", "#f3e9d4", "#a86c4d", "#1c1a18"],
    note: "Indigo, magnolia, terracotta, ink. Carries serif type beautifully.",
  },
  {
    name: "The high desert at dusk",
    chips: ["#8b5a3c", "#d4a574", "#3c2e26", "#ebd9c0"],
    note: "Adobe, golden hour, deep brown, sand. Pair with thin sans for contrast.",
  },
];

const REFS = [
  {
    title: "Aesop",
    url: "aesop.com",
    note: "The patron saint of restraint. Look at how they write about a single hand cream.",
  },
  {
    title: "The Lake Sunapee Inn redesign",
    url: "logan-marketing.com/work/lake-sunapee",
    note: "Logan's own. Study the room-card spacing and the gallery pacing.",
  },
  {
    title: "It's Nice That — hospitality issue",
    url: "itsnicethat.com/...",
    note: "Three articles about boutique hotel brand systems. Bookmark the McKinley piece.",
  },
  {
    title: "Working Not Working — small studios",
    url: "workingnotworking.com/studios",
    note: "Filter by under-10-person studios. Logan-shaped.",
  },
  {
    title: "On Web Typography — Robert Bringhurst translated",
    url: "book",
    note: "Read the chapter on rhythm. Twice.",
  },
];

const NOTES = [
  {
    date: "for hard mornings",
    body: "You don't have to be the best junior designer they've ever hired. You have to be the one who keeps showing up curious. That's a much smaller bar, and it's the one that actually matters.",
  },
  {
    date: "before a critique",
    body: "Your taste is good. I've watched it for years. When someone gives you feedback that stings, write it down before you respond. Sleep on it. The good notes survive the night.",
  },
  {
    date: "when you feel behind",
    body: "You are not behind. You're just earlier in a long thing. Every senior designer you admire was, at some point, exactly where you are, googling something embarrassing.",
  },
  {
    date: "always",
    body: "I love you. I'm proud of you for going for the job you actually wanted, and I'm proud of you for the version of you who gets to do this work.",
  },
];

function PageShell({ title, eyebrow, onBack, children }) {
  return (
    <div className="page-inner" data-screen-label={`Logan suite — ${title}`}>
      <button className="back-link" onClick={onBack}>
        <span
          style={{
            fontFamily: "var(--hand)",
            fontSize: 22,
            color: "var(--lovego-400)",
          }}
        >
          ←
        </span>
        <span>back to the toolkit</span>
      </button>
      <div className="inner-eyebrow">{eyebrow}</div>
      <h1 className="inner-h1">{title}</h1>
      {children}
    </div>
  );
}

function PlaybookPage({ onBack }) {
  return (
    <PageShell
      title="The Logan Marketing playbook"
      eyebrow="i. · the playbook"
      onBack={onBack}
    >
      <p className="inner-intro">{PLAYBOOK_CONTENT.intro}</p>
      <div className="prose-list">
        {PLAYBOOK_CONTENT.sections.map((s, i) => (
          <article key={i} className="prose-row">
            <div className="prose-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <h3 className="prose-title">{s.title}</h3>
              <p className="prose-body">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function PatternsPage({ onBack }) {
  return (
    <PageShell
      title="Pattern library"
      eyebrow="ii. · components"
      onBack={onBack}
    >
      <p className="inner-intro">
        Reusable pieces from past Logan sites. Borrow what fits the project —
        never paste the whole library.
      </p>
      <div className="pattern-grid">
        {PATTERNS.map((p, i) => (
          <div key={i} className="pattern-card">
            <div className="pattern-preview" data-kind={i % 3}></div>
            <h3 className="pattern-name">{p.name}</h3>
            <p className="pattern-note">{p.note}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function StudiesPage({ onBack }) {
  return (
    <PageShell
      title="Color & type studies"
      eyebrow="iii. · palettes from places"
      onBack={onBack}
    >
      <p className="inner-intro">
        Each palette starts with a real place. Pick one, drop it on a layout,
        see what survives.
      </p>
      <div className="studies-list">
        {STUDIES.map((s, i) => (
          <article key={i} className="study-card">
            <div className="study-chips">
              {s.chips.map((c, j) => (
                <div key={j} className="study-chip" style={{ background: c }}>
                  <span>{c}</span>
                </div>
              ))}
            </div>
            <h3 className="study-name">{s.name}</h3>
            <p className="study-note">{s.note}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function PracticePage({ onBack }) {
  const Practice = window.Practice;
  return (
    <PageShell
      title="Practice briefs"
      eyebrow="iv. · daily reps"
      onBack={onBack}
    >
      <p className="inner-intro">
        Real-shaped prompts. Twenty to forty minutes each. Done is better than
        perfect; perfect is the wrong target anyway.
      </p>
      <Practice />
    </PageShell>
  );
}

function ShelfPage({ onBack }) {
  return (
    <PageShell
      title="Reference shelf"
      eyebrow="v. · saved & loved"
      onBack={onBack}
    >
      <p className="inner-intro">
        Sites and books worth a slow look. Not for inspiration-scrolling — for
        studying.
      </p>
      <div className="shelf-list">
        {REFS.map((r, i) => (
          <a
            key={i}
            className="shelf-row"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <div className="shelf-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="shelf-body">
              <div className="shelf-title">{r.title}</div>
              <div className="shelf-url">{r.url}</div>
              <div className="shelf-note">{r.note}</div>
            </div>
            <span className="shelf-go">↗</span>
          </a>
        ))}
      </div>
    </PageShell>
  );
}

function NotesPage({ onBack, name }) {
  const [open, setOpen] = useStateP(0);
  return (
    <PageShell
      title={`Notes for ${name}`}
      eyebrow="vi. · for you only"
      onBack={onBack}
    >
      <p className="inner-intro">
        Read one when you need it. They don't go anywhere.
      </p>
      <div className="notes-list">
        {NOTES.map((n, i) => (
          <article
            key={i}
            className={`note-card ${open === i ? "open" : ""}`}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <div className="note-head">
              <span className="note-date">— {n.date}</span>
              <span className="note-toggle">
                {open === i ? "close" : "open"}
              </span>
            </div>
            {open === i && <div className="note-body">{n.body}</div>}
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function InnerPage({ id, onBack, name }) {
  if (id === "playbook") return <PlaybookPage onBack={onBack} />;
  if (id === "patterns") return <PatternsPage onBack={onBack} />;
  if (id === "studies") return <StudiesPage onBack={onBack} />;
  if (id === "practice") return <PracticePage onBack={onBack} />;
  if (id === "shelf") return <ShelfPage onBack={onBack} />;
  if (id === "notes") return <NotesPage onBack={onBack} name={name} />;
  return null;
}

Object.assign(window, { InnerPage });
