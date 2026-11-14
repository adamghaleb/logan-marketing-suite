// Mily's home — root app with routing + dark mode
const { useState, useEffect } = React;

function App() {
  const [tweaks, setTweak] = window.useTweaks(window.__MILY_TWEAKS);
  const [route, setRoute] = useState("home");

  // Hue
  useEffect(() => {
    const h = tweaks.lavigoHue || 290;
    const root = document.documentElement;
    root.style.setProperty("--lovego-50", `oklch(0.96 0.022 ${h})`);
    root.style.setProperty("--lovego-100", `oklch(0.92 0.04 ${h})`);
    root.style.setProperty("--lovego-200", `oklch(0.84 0.07 ${h})`);
    root.style.setProperty("--lovego-400", `oklch(0.68 0.13 ${h})`);
    root.style.setProperty("--lovego-600", `oklch(0.48 0.16 ${h - 3})`);
    root.style.setProperty("--lovego-800", `oklch(0.28 0.13 ${h - 6})`);
    root.style.setProperty("--paper-grid", `oklch(0.92 0.018 ${h})`);
  }, [tweaks.lavigoHue]);

  // Mode
  useEffect(() => {
    document.body.dataset.mode = tweaks.mode || "light";
  }, [tweaks.mode]);

  // Display font
  useEffect(() => {
    const map = {
      gloock: "'Gloock', 'Times New Roman', serif",
      mochi: "'Mochi Boom', 'Gloock', sans-serif",
      mochiExt: "'Mochi Boom Extrude', 'Mochi Boom', sans-serif",
      milkyway: "'Milkyway', 'Gloock', sans-serif",
      talina: "'Talina', 'Gloock', serif",
    };
    const stack = map[tweaks.displayFont] || map.gloock;
    document.documentElement.style.setProperty("--display", stack);
  }, [tweaks.displayFont]);

  // Paper grid
  useEffect(() => {
    document.body.style.backgroundImage = tweaks.paperGrid
      ? "radial-gradient(circle at 1px 1px, var(--paper-grid) 1.2px, transparent 1.2px)"
      : "none";
  }, [tweaks.paperGrid]);

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const toggleMode = () =>
    setTweak("mode", tweaks.mode === "dark" ? "light" : "dark");

  return (
    <>
      <div className="page" data-screen-label={`Logan suite — ${route}`}>
        <div className="urlbar">
          <span>
            <span className="urlbar-dot"></span>mily<b>.computer</b>
          </span>
          <span style={{ color: "var(--ink-4)", marginLeft: 8 }}>
            · the Logan Marketing suite, by {tweaks.fromName}
          </span>
          <button className="mode-toggle" onClick={toggleMode}>
            {tweaks.mode === "dark" ? "☾ dark" : "☀ light"}
          </button>
        </div>

        {route === "home" ? (
          <>
            <window.Hero name={tweaks.name} />
            <window.MouseOfTheDay />
            <window.Cards tiles={window.TILES} onOpen={setRoute} />
            <window.Practice />
            <window.System />
            <window.Footer name={tweaks.name} fromName={tweaks.fromName} />
          </>
        ) : (
          <window.InnerPage
            id={route}
            onBack={() => setRoute("home")}
            name={tweaks.name}
          />
        )}
      </div>

      {tweaks.bingusOn && <window.Bingus />}

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Personal">
          <window.TweakText
            label="Her name"
            value={tweaks.name}
            onChange={(v) => setTweak("name", v)}
          />
          <window.TweakText
            label="Your name"
            value={tweaks.fromName}
            onChange={(v) => setTweak("fromName", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Mode">
          <window.TweakRadio
            label="Theme"
            value={tweaks.mode}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
            onChange={(v) => setTweak("mode", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Type">
          <window.TweakSelect
            label="Display font"
            value={tweaks.displayFont}
            options={[
              { value: "gloock", label: "Gloock (default)" },
              { value: "mochi", label: "Mochi Boom" },
              { value: "mochiExt", label: "Mochi Boom Extrude" },
              { value: "milkyway", label: "Milkyway" },
              { value: "talina", label: "Talina" },
            ]}
            onChange={(v) => setTweak("displayFont", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Lavigo">
          <window.TweakSlider
            label="Hue"
            value={tweaks.lavigoHue}
            min={260}
            max={320}
            step={1}
            onChange={(v) => setTweak("lavigoHue", v)}
          />
        </window.TweakSection>
        <window.TweakSection label="Atmosphere">
          <window.TweakToggle
            label="Paper grid"
            value={tweaks.paperGrid}
            onChange={(v) => setTweak("paperGrid", v)}
          />
          <window.TweakToggle
            label="Bingus"
            value={tweaks.bingusOn}
            onChange={(v) => setTweak("bingusOn", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("mily-root")).render(<App />);
