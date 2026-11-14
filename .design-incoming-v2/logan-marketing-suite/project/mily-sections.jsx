// Mily's home — page sections
const { useState, useEffect } = React;

const TILES = [
  {
    id: "playbook",
    icon: "🪴",
    num: "i.",
    title: "The Logan Marketing playbook",
    desc: "How they actually work — their voice, who they hire, what day-1 looks like, what to ask in your first kickoff.",
    meta: "6 sections",
    tape: true,
  },
  {
    id: "patterns",
    icon: "✎",
    num: "ii.",
    title: "Pattern library",
    desc: "Reusable bits from past Logan sites — hero blocks, room cards, booking widgets, the slow-fade gallery.",
    meta: "6 patterns",
  },
  {
    id: "studies",
    icon: "❀",
    num: "iii.",
    title: "Color & type studies",
    desc: "Palettes that feel like a real place. Each starts with somewhere worth visiting.",
    meta: "4 studies",
    tape: true,
    tapePeach: true,
  },
  {
    id: "practice",
    icon: "✿",
    num: "iv.",
    title: "Practice briefs",
    desc: "Real-shaped prompts — redesign a B&B homepage, write a welcome email. Twenty to forty minutes each.",
    meta: "daily",
  },
  {
    id: "shelf",
    icon: "✦",
    num: "v.",
    title: "Reference shelf",
    desc: "Sites and books worth a slow look — Aesop, the Lake Sunapee Inn redesign, Bringhurst.",
    meta: "5 links",
  },
  {
    id: "notes",
    icon: "♡",
    num: "vi.",
    title: "Notes from Adam",
    desc: "For hard mornings, before a critique, when you feel behind, and always. Read one when you need it.",
    meta: "for you only",
    tape: true,
  },
];

const PRACTICE = [
  {
    id: "p1",
    title: "Redesign the homepage of a B&B you've never heard of",
    desc: "Pick one from a quiet town. 25 minutes. Don't use stock photos.",
    time: "25 min",
    done: true,
  },
  {
    id: "p2",
    title: "Make three logos for the same fictional inn",
    desc: "Wordmark, monogram, illustrative. Same brief, three voices.",
    time: "40 min",
    done: false,
  },
  {
    id: "p3",
    title: "Write the welcome email a guest gets the day before arrival",
    desc: "Friendly, useful, no jargon. Then design it.",
    time: "30 min",
    done: false,
  },
  {
    id: "p4",
    title: "Pick a color from a place you love. Build a palette around it",
    desc: "Use it on a real layout. Photo of breakfast, room interior, garden.",
    time: "20 min",
    done: false,
  },
];

function Hero({ name }) {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="head">
      <div>
        <div className="greeting-eyebrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4 L11 8 L15 9 L11 10 L10 14 L9 10 L5 9 L9 8 Z"
              fill="oklch(0.68 0.13 288)"
            />
          </svg>
          good morning, {name.toLowerCase()}
        </div>
        <h1 className="h1">
          your private toolkit for{" "}
          <span className="accent">Logan Marketing</span>.
        </h1>
        <p className="sub">
          everything I could think of to help you land softly into the new job —
          their playbook, patterns from their past sites, daily practice, and a
          goofy cat named Bingus who calls you {name}.
        </p>
      </div>
      <div className="today-card">
        <div className="today-label">today is</div>
        <div className="today-day">{dateStr}</div>
        <div className="today-week">a {dayName.toLowerCase()}</div>
      </div>
    </div>
  );
}

function Cards({ tiles, onOpen }) {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">i.</span>
        <h2 className="section-title">your toolkit</h2>
        <span className="section-line"></span>
        <span className="section-tag">six rooms, all yours</span>
      </div>
      <div className="cards">
        {tiles.map((t, i) => (
          <button
            key={t.id}
            className={`card ${t.tape ? "tape" : ""} ${t.tapePeach ? "tape-peach" : ""}`}
            onClick={() => onOpen && onOpen(t.id)}
          >
            <span className="card-num">{t.num}</span>
            <div className="card-icon">{t.icon}</div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <div className="card-meta">{t.meta}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

function MouseOfTheDay() {
  const today = new Date();
  const dayIdx = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % 5;
  const mice = [
    {
      name: "a chubby grey mouse",
      note: "i found him near the radiator. he's a little dusty but very brave.",
    },
    {
      name: "a tiny field mouse",
      note: "this one had a pinecone with him. i let him keep it.",
    },
    {
      name: "a polite library mouse",
      note: "smelled like paper. wore tiny glasses. you would've liked him.",
    },
    {
      name: "a dramatic mouse",
      note: "he gasped when he saw me. very theatrical. 10/10.",
    },
    {
      name: "a sleepy mouse",
      note: "he was already napping when i found him. i didn't wake him. just brought him.",
    },
  ];
  const m = mice[dayIdx];

  return (
    <div className="mouse-card">
      <div className="mouse-art">
        <window.PixelMouse />
      </div>
      <div className="mouse-text">
        <div className="mouse-eyebrow">today's gift, from Bingus —</div>
        <div className="mouse-title">{m.name}.</div>
        <div className="mouse-note">"{m.note}"</div>
      </div>
      <div className="mouse-stamp">
        no.
        <br />
        <span style={{ fontSize: 26, color: "var(--lovego-600)" }}>
          {String(dayIdx + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function Practice() {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mily-practice") || "null");
      if (saved) return saved;
    } catch (e) {}
    return PRACTICE;
  });
  useEffect(() => {
    localStorage.setItem("mily-practice", JSON.stringify(items));
  }, [items]);

  const toggle = (id) =>
    setItems(
      items.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );

  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">ii.</span>
        <h2 className="section-title">small practice</h2>
        <span className="section-line"></span>
        <span className="section-tag">no pressure, just reps</span>
      </div>
      <div className="practice-list">
        {items.map((it) => (
          <div
            key={it.id}
            className={`practice-row ${it.done ? "done" : ""}`}
            onClick={() => toggle(it.id)}
          >
            <span className="practice-check"></span>
            <div>
              <div className="practice-title">{it.title}</div>
              <div className="practice-desc">{it.desc}</div>
            </div>
            <span className="practice-pill">{it.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function System() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">iii.</span>
        <h2 className="section-title">the look of this place</h2>
        <span className="section-line"></span>
        <span className="section-tag">color & type</span>
      </div>
      <div className="system">
        <div className="type-card">
          <div className="type-sample">
            <div className="label">display · milkyway</div>
            <div className="glyph-display">your private toolkit.</div>
          </div>
          <div className="type-sample">
            <div className="label">headers · fredoka one</div>
            <div className="glyph-header">A small, soft place.</div>
          </div>
          <div className="type-sample">
            <div className="label">handwritten · caveat</div>
            <div className="glyph-hand">brought you something — </div>
          </div>
          <div className="type-sample">
            <div className="label">body · nunito</div>
            <div className="glyph-sans">
              Boutique websites for inns and bed-and-breakfasts. Warm,
              unhurried, made by hand.
            </div>
          </div>
        </div>
        <div className="palette-card">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              color: "var(--ink-3)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            lavigo — the soul
          </div>
          <div className="swatch-row">
            <div className="swatch" style={{ background: "var(--lovego-50)" }}>
              <span className="swatch-name">50</span>
            </div>
            <div className="swatch" style={{ background: "var(--lovego-100)" }}>
              <span className="swatch-name">100</span>
            </div>
            <div className="swatch" style={{ background: "var(--lovego-200)" }}>
              <span className="swatch-name">200</span>
            </div>
            <div
              className="swatch dark"
              style={{ background: "var(--lovego-400)" }}
            >
              <span className="swatch-name">400</span>
            </div>
            <div
              className="swatch dark"
              style={{ background: "var(--lovego-600)" }}
            >
              <span className="swatch-name">600</span>
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              color: "var(--ink-3)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: "14px 0 10px",
            }}
          >
            warm neighbors
          </div>
          <div className="swatch-row">
            <div className="swatch" style={{ background: "var(--paper)" }}>
              <span className="swatch-name">paper</span>
            </div>
            <div className="swatch" style={{ background: "var(--paper-2)" }}>
              <span className="swatch-name">cream</span>
            </div>
            <div className="swatch" style={{ background: "var(--peach)" }}>
              <span className="swatch-name">peach</span>
            </div>
            <div className="swatch" style={{ background: "var(--sage)" }}>
              <span className="swatch-name">sage</span>
            </div>
            <div
              className="swatch dark"
              style={{ background: "var(--lovego-800)" }}
            >
              <span className="swatch-name">ink</span>
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--hand)",
              fontSize: 17,
              color: "var(--lovego-400)",
              marginTop: 14,
              lineHeight: 1.3,
            }}
          >
            soft when it can be, deep when it has to be.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ name, fromName }) {
  return (
    <footer className="footer-note">
      <div className="line1">
        you are going to be so good
        <br />
        at this job.
      </div>
      <div className="line2">
        — for {name}, by {fromName}. always.
      </div>
      <div className="footer-meta">
        mily.computer · the Logan Marketing suite · v0.1
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero,
  Cards,
  MouseOfTheDay,
  Practice,
  System,
  Footer,
  TILES,
});
