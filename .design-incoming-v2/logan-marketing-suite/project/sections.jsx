// Section components for Logan Marketing Suite
const { useState, useEffect, useMemo } = React;

// ---------- Sidebar ----------
function Sidebar({ active, setActive, daysToInterview }) {
  const items = [
    { id: "home", label: "Home", count: "" },
    { id: "playbook", label: "Playbook", count: "06" },
    { id: "dossier", label: "Dossier", count: "" },
    { id: "mcp", label: "MCP Server", count: "04" },
    { id: "skills", label: "Skills", count: "05" },
    { id: "install", label: "Install", count: "" },
    { id: "notes", label: "Notes", count: "♡" },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">L</div>
        <div className="brand-text">
          <div className="brand-name">Logan Suite</div>
          <div className="brand-sub">Built for Sam · v0.4</div>
        </div>
      </div>

      <div className="nav-group">
        <div className="nav-label">Workspace</div>
        {items.map((it) => (
          <button
            key={it.id}
            className={`nav-item ${active === it.id ? "active" : ""}`}
            onClick={() => setActive(it.id)}
          >
            <span className="nav-dot"></span>
            <span>{it.label}</span>
            {it.count && <span className="nav-count">{it.count}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="sidebar-foot-label">Interview in</div>
        <div className="sidebar-foot-val">
          {daysToInterview}{" "}
          <span style={{ fontSize: 13, color: "var(--ink-3)" }}>days</span>
        </div>
        <div className="sidebar-foot-cap">You've got this. Truly.</div>
      </div>
    </aside>
  );
}

// ---------- Topbar ----------
function Topbar({ active, onTweaks }) {
  const labels = {
    home: "Home",
    playbook: "Interview Playbook",
    dossier: "Logan Marketing Dossier",
    mcp: "MCP Server",
    skills: "Custom Skills",
    install: "Install Guide",
    notes: "Notes from me",
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span>Suite</span>
        <span style={{ color: "var(--ink-4)" }}>/</span>
        <span className="topbar-crumb">{labels[active]}</span>
      </div>
      <div className="topbar-right">
        <span className="pill">
          <span className="pill-dot"></span>MCP online
        </span>
        <span className="pill mono">⌘K</span>
      </div>
    </div>
  );
}

// ---------- Home ----------
function Home({ setActive, name }) {
  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">A private hub · made for {name}</div>
        <h1 className="hero-h1">
          Everything you need to walk into <em>Logan Marketing</em> like you
          already work there.
        </h1>
        <p className="hero-sub">
          A playbook, a research dossier, a small toolkit of MCP tools and
          Claude skills built around their voice — wired together so you can
          prep fast and walk in calm.
        </p>

        <div className="hero-meta">
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Sections</div>
            <div className="hero-meta-val">06</div>
            <div className="hero-meta-cap">Hub modules</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">MCP tools</div>
            <div className="hero-meta-val">04</div>
            <div className="hero-meta-cap">3 ready · 1 draft</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Skills</div>
            <div className="hero-meta-val">05</div>
            <div className="hero-meta-cap">Claude skills bundled</div>
          </div>
          <div className="hero-meta-cell">
            <div className="hero-meta-label">Last updated</div>
            <div className="hero-meta-val serif">Today</div>
            <div className="hero-meta-cap">04:12 by Alex</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="s-head">
          <div className="s-head-left">
            <span className="s-num">§ 01</span>
            <h2 className="s-title">Quick launch</h2>
          </div>
          <span className="s-sub">Pick up where you left off</span>
        </div>
        <div className="grid-3">
          {window.TILES.map((t) => (
            <button key={t.id} className="tile" onClick={() => setActive(t.id)}>
              <div className="tile-top">
                <div className="tile-icon">{t.icon}</div>
                <div className="tile-tag mono">{t.tag}</div>
              </div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <div className="tile-cta">
                <span>{t.cta}</span>
                <span className="tile-cta-arrow">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

// ---------- Playbook ----------
function Playbook() {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("logan-playbook") || "null",
      );
      if (saved) return saved;
    } catch (e) {}
    return window.PLAYBOOK;
  });

  useEffect(() => {
    localStorage.setItem("logan-playbook", JSON.stringify(items));
  }, [items]);

  const toggle = (id) => {
    setItems(
      items.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );
  };
  const doneCount = items.filter((i) => i.done).length;
  const totalMin = items.reduce((s, i) => s + parseInt(i.time), 0);

  return (
    <section className="section">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 01 · Playbook</span>
          <h2 className="s-title">Interview Playbook</h2>
        </div>
        <span className="s-sub mono">
          {doneCount}/{items.length} · ≈ {totalMin} min
        </span>
      </div>

      <div className="grid-12">
        <div className="card">
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`pb-row ${it.done ? "done" : ""}`}
              onClick={() => toggle(it.id)}
            >
              <span className="pb-num mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pb-check"></span>
              <div className="pb-body">
                <div className="pb-title serif">{it.title}</div>
                <div className="pb-desc">{it.desc}</div>
              </div>
              <span className="pb-meta">{it.time}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              }}
            >
              The three stories
            </div>
            <ol
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 13.5,
                lineHeight: 1.7,
                color: "var(--ink-2)",
              }}
            >
              <li>
                <b style={{ color: "var(--ink)" }}>Campaign you led.</b> Numbers
                in. Audience first.
              </li>
              <li>
                <b style={{ color: "var(--ink)" }}>Launch you saved.</b> What
                broke, what you did, what shipped.
              </li>
              <li>
                <b style={{ color: "var(--ink)" }}>Team moment.</b> Hire,
                mentor, or hard call.
              </li>
            </ol>
          </div>
          <div className="card" style={{ background: "var(--bg-2)" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 10,
              }}
            >
              Five questions to bring
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "var(--ink-2)",
              }}
            >
              <li>What does a "great fit" hire look like at month six?</li>
              <li>Which client engagement are you proudest of, and why?</li>
              <li>How do strategy and creative decide who owns what?</li>
              <li>
                What's the most useful piece of feedback the team gave you last
                quarter?
              </li>
              <li>Where would you want me spending my first 30 days?</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Dossier ----------
function Dossier() {
  return (
    <section className="section section-narrow">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 02 · Research</span>
          <h2 className="s-title">Logan Marketing, decoded</h2>
        </div>
        <span className="s-sub">Read on the train. Forget the rest.</span>
      </div>

      <div className="dossier-grid">
        {window.DOSSIER.map((d, i) => (
          <div className="dossier-cell" key={i}>
            <div className="dossier-label">{d.label}</div>
            <div className={`dossier-val ${d.serif ? "serif" : ""}`}>
              {d.val}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }} className="grid-2">
        <div className="card">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            People you'll meet
          </div>
          {[
            [
              "AL",
              "Founder / strategy lead",
              "Reads everything. Asks the second question, not the first.",
            ],
            [
              "JM",
              "Head of creative",
              "Writer. Loves a tight headline. Allergic to jargon.",
            ],
            [
              "RS",
              "Growth director",
              "Numbers, but quietly. Ask about retention, not acquisition.",
            ],
          ].map(([init, role, tip]) => (
            <div
              key={init}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: "1px dashed var(--line)",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "var(--bg-3)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--serif)",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {init}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{role}</div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "var(--ink-3)",
                    marginTop: 2,
                  }}
                >
                  {tip}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            Phrases they use (and you should)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              "audience truth",
              "earned attention",
              "category-defining",
              "creative through-line",
              "build for repeat",
              "moment, not message",
              "tone before tactic",
              "long-form social",
            ].map((p) => (
              <span
                key={p}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  padding: "5px 10px",
                  background: "var(--bg-2)",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  color: "var(--ink-2)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 12.5,
              color: "var(--ink-3)",
              fontStyle: "italic",
            }}
          >
            Don't force these. One or two, naturally placed, is enough.
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- MCP ----------
function MCP() {
  return (
    <section className="section">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 03 · Tooling</span>
          <h2 className="s-title">MCP Server</h2>
        </div>
        <span className="s-sub mono">logan-mcp · localhost:3344</span>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {window.MCP_TOOLS.map((t) => (
          <div className="mcp-card" key={t.id}>
            <div className="mcp-head">
              <div>
                <div className="mcp-name serif">{t.name}</div>
                <div className="mcp-id">{t.id}</div>
              </div>
              <span
                className={`mcp-status ${t.status === "draft" ? "draft" : ""}`}
              >
                {t.status === "ready" ? "● ready" : "○ draft"}
              </span>
            </div>
            <div className="mcp-desc">{t.desc}</div>
            <div className="mcp-tools">
              {t.tools.map((tool) => (
                <span key={tool} className="mcp-tool">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          Quick test — try a tool from your terminal
        </div>
        <CodeBlock
          code={`$ curl -s http://localhost:3344/tools/brand_voice_check \\
    -d '{"draft": "We launched a new line. It is good."}' | jq

{
  "score": 31,
  "feedback": [
    "Lead with audience, not product.",
    "Name a moment, not a feature.",
    "Replace 'good' with a verb."
  ],
  "rewrite": "For the people already loyal to the routine — a new chapter, on the same shelf."
}`}
        />
      </div>
    </section>
  );
}

// ---------- Skills ----------
function Skills() {
  return (
    <section className="section section-narrow">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 04 · Tooling</span>
          <h2 className="s-title">Custom Cloud Skills</h2>
        </div>
        <span className="s-sub">Loaded into Claude. Invoke by name.</span>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {window.SKILLS.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr auto",
              alignItems: "center",
              gap: 16,
              padding: "18px 20px",
              borderBottom:
                i < window.SKILLS.length - 1
                  ? "1px solid var(--line-2)"
                  : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-4)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  lineHeight: 1.2,
                }}
              >
                {s.name}
              </div>
              <div
                style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 3 }}
              >
                {s.desc}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                className="mono"
                style={{ fontSize: 11, color: "var(--ink-4)" }}
              >
                {s.lines} lines
              </span>
              <button
                className="btn"
                style={{ padding: "5px 10px", fontSize: 12 }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }} className="card">
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 12,
          }}
        >
          How to call one
        </div>
        <CodeBlock
          code={`# In any Claude conversation:
> Use the campaign-brief-drafter skill.
  Input: "skincare brand entering men's grooming, $80 SRP, fall launch"

# Or from CLI with the bundled wrapper:
$ logan-skills run campaign-brief-drafter \\
    --input "skincare brand entering men's grooming..."`}
        />
      </div>
    </section>
  );
}

// ---------- Install ----------
function Install() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Clone the suite", time: "30s" },
    { title: "Install the MCP server", time: "60s" },
    { title: "Register skills with Claude", time: "30s" },
    { title: "Verify everything's wired up", time: "20s" },
  ];

  const code = [
    `$ git clone git@github.com:alex/logan-marketing-suite.git
$ cd logan-marketing-suite`,
    `$ cd mcp-server
$ pnpm install
$ pnpm dev
# → MCP listening on localhost:3344`,
    `$ cd ../skills
$ ./register.sh
# → 5 skills registered with Claude
#   ✓ campaign-brief-drafter
#   ✓ deck-polish-pass
#   ✓ audience-snapshot
#   ✓ launch-day-checklist
#   ✓ post-mortem-composer`,
    `$ logan-suite doctor

✓ MCP server reachable at localhost:3344
✓ 4/4 tools responding
✓ 5/5 skills registered
✓ Brand voice profile loaded (logan-v2.json)
✓ You're ready. Go make her proud.`,
  ];

  return (
    <section className="section section-narrow">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 05 · Setup</span>
          <h2 className="s-title">Install in four steps</h2>
        </div>
        <span className="s-sub mono">≈ 2 min total</span>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="btn"
            style={{
              background: step === i ? "var(--ink)" : "var(--bg)",
              color: step === i ? "var(--bg)" : "var(--ink-2)",
              borderColor: step === i ? "var(--ink)" : "var(--line)",
              fontSize: 12.5,
            }}
          >
            <span className="mono" style={{ fontSize: 10.5, opacity: 0.7 }}>
              0{i + 1}
            </span>
            {s.title}
          </button>
        ))}
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 14,
          }}
        >
          <div className="serif" style={{ fontSize: 20 }}>
            {steps[step].title}
          </div>
          <div
            className="mono"
            style={{ fontSize: 11.5, color: "var(--ink-3)" }}
          >
            ≈ {steps[step].time}
          </div>
        </div>
        <CodeBlock code={code[step]} />
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            ← Back
          </button>
          <button
            className="btn btn-primary"
            disabled={step === steps.length - 1}
            onClick={() => setStep(step + 1)}
          >
            Next step →
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Notes ----------
function Notes({ name }) {
  const [idx, setIdx] = useState(0);
  return (
    <section className="section section-narrow">
      <div className="s-head">
        <div className="s-head-left">
          <span className="s-num">§ 06 · From me</span>
          <h2 className="s-title">A few things, before you go in</h2>
        </div>
      </div>

      <div className="note">
        <div className="note-body">
          {window.QUOTES[idx]}
          <div className="note-sig">— Alex · for {name}</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 14,
          justifyContent: "center",
        }}
      >
        {window.QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: i === idx ? "var(--accent)" : "var(--line)",
              transition: "background .15s",
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 36 }} className="grid-2">
        <div className="card">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            Remember
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--ink-2)",
            }}
          >
            <li>
              You don't have to know everything. You have to be the person they
              want to find out things <em>with</em>.
            </li>
            <li>
              If you don't know an answer, say so, and say what you'd do to find
              out.
            </li>
            <li>Slow down by half. The pause is the confidence.</li>
            <li>
              You've already done the work. Today is just the part where they
              get to meet you.
            </li>
          </ul>
        </div>
        <div className="card" style={{ background: "var(--bg-2)" }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            After it's done
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)" }}>
            Text me one word about how it went. We'll get dinner regardless. I'm
            proud of you for going for the thing you actually want — that was
            the hard part, and you've already done it.
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Code block ----------
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <pre className="code">
      <button className="code-copy" onClick={onCopy}>
        {copied ? "copied" : "copy"}
      </button>
      {code}
    </pre>
  );
}

Object.assign(window, {
  Sidebar,
  Topbar,
  Home,
  Playbook,
  Dossier,
  MCP,
  Skills,
  Install,
  Notes,
});
