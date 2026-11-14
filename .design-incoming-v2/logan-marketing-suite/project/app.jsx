// Logan Marketing Suite — root app
const { useState, useEffect, useMemo } = React;

function daysUntil(dateStr) {
  try {
    const target = new Date(dateStr + "T09:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ms = target - today;
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  } catch {
    return 0;
  }
}

const ACCENT_HUES = {
  ember: {
    accent: "oklch(0.62 0.16 45)",
    soft: "oklch(0.95 0.04 45)",
    ink: "oklch(0.42 0.14 45)",
  },
  rose: {
    accent: "oklch(0.62 0.18 20)",
    soft: "oklch(0.95 0.04 20)",
    ink: "oklch(0.45 0.16 20)",
  },
  sage: {
    accent: "oklch(0.55 0.12 160)",
    soft: "oklch(0.94 0.04 160)",
    ink: "oklch(0.4 0.1 160)",
  },
  ink: {
    accent: "oklch(0.32 0.02 80)",
    soft: "oklch(0.9 0.005 80)",
    ink: "oklch(0.18 0.012 80)",
  },
  iris: {
    accent: "oklch(0.55 0.16 285)",
    soft: "oklch(0.95 0.04 285)",
    ink: "oklch(0.4 0.14 285)",
  },
};

function App() {
  const [active, setActive] = useState("home");
  const [tweaks, setTweak] = window.useTweaks(window.__TWEAK_DEFAULTS);

  // Apply theme + density
  useEffect(() => {
    document.body.dataset.theme = tweaks.theme || "warm";
    document.body.dataset.density = tweaks.density || "default";
    const accent = ACCENT_HUES[tweaks.accent] || ACCENT_HUES.ember;
    document.body.style.setProperty("--accent", accent.accent);
    document.body.style.setProperty("--accent-soft", accent.soft);
    document.body.style.setProperty("--accent-ink", accent.ink);
  }, [tweaks.theme, tweaks.density, tweaks.accent]);

  const days = useMemo(
    () => daysUntil(tweaks.interviewDate),
    [tweaks.interviewDate],
  );

  // Cmd-K cycles sections (silly little touch)
  useEffect(() => {
    const order = [
      "home",
      "playbook",
      "dossier",
      "mcp",
      "skills",
      "install",
      "notes",
    ];
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const i = order.indexOf(active);
        setActive(order[(i + 1) % order.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="shell" data-screen-label={`Logan Suite — ${active}`}>
        <window.Sidebar
          active={active}
          setActive={setActive}
          daysToInterview={days}
        />
        <main className="main">
          <window.Topbar active={active} />
          {active === "home" && (
            <window.Home setActive={setActive} name={tweaks.girlfriendName} />
          )}
          {active === "playbook" && <window.Playbook />}
          {active === "dossier" && <window.Dossier />}
          {active === "mcp" && <window.MCP />}
          {active === "skills" && <window.Skills />}
          {active === "install" && <window.Install />}
          {active === "notes" && <window.Notes name={tweaks.girlfriendName} />}

          <footer className="footer">
            <div className="footer-note">
              Built late one night by {tweaks.yourName} for{" "}
              {tweaks.girlfriendName}, because she's about to go do the thing.
            </div>
            <div className="footer-meta">
              logan-marketing-suite · v0.4
              <br />
              localhost · private build
            </div>
          </footer>
        </main>
      </div>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Personal">
          <window.TweakText
            label="Her name"
            value={tweaks.girlfriendName}
            onChange={(v) => setTweak("girlfriendName", v)}
          />
          <window.TweakText
            label="Your name (signature)"
            value={tweaks.yourName}
            onChange={(v) => setTweak("yourName", v)}
          />
          <window.TweakText
            label="Interview date (YYYY-MM-DD)"
            value={tweaks.interviewDate}
            onChange={(v) => setTweak("interviewDate", v)}
          />
        </window.TweakSection>

        <window.TweakSection label="Look">
          <window.TweakRadio
            label="Theme"
            value={tweaks.theme}
            options={[
              { value: "warm", label: "Warm" },
              { value: "sage", label: "Sage" },
              { value: "rose", label: "Rose" },
              { value: "ink", label: "Ink" },
            ]}
            onChange={(v) => setTweak("theme", v)}
          />
          <window.TweakSelect
            label="Accent"
            value={tweaks.accent}
            options={[
              { value: "ember", label: "Ember (warm orange)" },
              { value: "rose", label: "Rose" },
              { value: "sage", label: "Sage green" },
              { value: "iris", label: "Iris purple" },
              { value: "ink", label: "Ink (monochrome)" },
            ]}
            onChange={(v) => setTweak("accent", v)}
          />
          <window.TweakRadio
            label="Density"
            value={tweaks.density}
            options={[
              { value: "tight", label: "Tight" },
              { value: "default", label: "Default" },
              { value: "comfy", label: "Comfy" },
            ]}
            onChange={(v) => setTweak("density", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
