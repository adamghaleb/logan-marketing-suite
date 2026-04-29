"use client";

import { useEffect, useState } from "react";
import {
  TWEAKS_OPEN_FLAG,
  useTweaks,
  type DisplayFont,
} from "@/lib/use-tweaks";

const DISPLAY_FONT_OPTIONS: ReadonlyArray<{
  readonly value: DisplayFont;
  readonly label: string;
}> = [
  { value: "milkyway", label: "Milkyway" },
  { value: "talina", label: "Talina" },
  { value: "mochi", label: "Mochi" },
  { value: "mochi-extrude", label: "Mochi Extrude" },
];

const MODE_OPTIONS: ReadonlyArray<{
  readonly value: "light" | "dark";
  readonly label: string;
}> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const HUE_MIN = 0;
const HUE_MAX = 360;
const HUE_STEP = 1;

const PANEL_STYLE = `
  .tweaks-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.85);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .tweaks-head{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;user-select:none}
  .tweaks-head b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .tweaks-close{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px;line-height:1}
  .tweaks-close:hover{background:rgba(0,0,0,.06);color:#29261b}
  .tweaks-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0}
  .tweaks-row{display:flex;flex-direction:column;gap:5px}
  .tweaks-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .tweaks-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .tweaks-lbl>span:first-child{font-weight:500}
  .tweaks-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}
  .tweaks-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .tweaks-sect:first-child{padding-top:0}
  .tweaks-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .tweaks-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  .tweaks-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .tweaks-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer}
  .tweaks-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:pointer}
  .tweaks-seg{display:flex;padding:2px;border-radius:8px;background:rgba(0,0,0,.06)}
  .tweaks-seg button{appearance:none;flex:1;border:0;background:transparent;color:inherit;
    font:inherit;font-weight:500;min-height:22px;border-radius:6px;cursor:pointer;
    padding:4px 6px;line-height:1.2}
  .tweaks-seg button[aria-checked="true"]{background:rgba(255,255,255,.9);
    box-shadow:0 1px 2px rgba(0,0,0,.12)}
  .tweaks-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:pointer;padding:0}
  .tweaks-toggle[data-on="1"]{background:#34c759}
  .tweaks-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .tweaks-toggle[data-on="1"] i{transform:translateX(14px)}
`;

function shouldRenderPanel(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("tweaks") === "1") return true;
  try {
    return window.localStorage.getItem(TWEAKS_OPEN_FLAG) === "1";
  } catch {
    return false;
  }
}

export function TweaksPanel(): React.ReactElement | null {
  const { tweaks, setTweak, hydrated } = useTweaks();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(shouldRenderPanel());
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (typeof document === "undefined") return;
    document.body.dataset.mode = tweaks.mode;
    document.body.dataset.paperGrid = tweaks.paperGrid ? "1" : "0";
    document.body.dataset.bingusOn = tweaks.bingusOn ? "1" : "0";
    document.body.dataset.displayFont = tweaks.displayFont;
    document.documentElement.style.setProperty(
      "--lavigo-h",
      String(tweaks.lavigoHue),
    );
  }, [hydrated, tweaks]);

  if (!visible || !hydrated) return null;

  const handleClose = () => {
    setVisible(false);
    try {
      window.localStorage.removeItem(TWEAKS_OPEN_FLAG);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <style>{PANEL_STYLE}</style>
      <aside
        className="tweaks-panel"
        role="dialog"
        aria-label="Mily tweaks panel"
      >
        <div className="tweaks-head">
          <b>Mily tweaks</b>
          <button
            type="button"
            className="tweaks-close"
            aria-label="Close tweaks"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
        <div className="tweaks-body">
          <div className="tweaks-sect">Identity</div>

          <div className="tweaks-row">
            <div className="tweaks-lbl">
              <span>Name</span>
            </div>
            <input
              className="tweaks-field"
              type="text"
              value={tweaks.name}
              onChange={(event) => setTweak("name", event.target.value)}
            />
          </div>

          <div className="tweaks-row">
            <div className="tweaks-lbl">
              <span>From</span>
            </div>
            <input
              className="tweaks-field"
              type="text"
              value={tweaks.fromName}
              onChange={(event) => setTweak("fromName", event.target.value)}
            />
          </div>

          <div className="tweaks-sect">Theme</div>

          <div className="tweaks-row">
            <div className="tweaks-lbl">
              <span>Lavigo hue</span>
              <span className="tweaks-val">{tweaks.lavigoHue}°</span>
            </div>
            <input
              className="tweaks-slider"
              type="range"
              min={HUE_MIN}
              max={HUE_MAX}
              step={HUE_STEP}
              value={tweaks.lavigoHue}
              onChange={(event) =>
                setTweak("lavigoHue", Number(event.target.value))
              }
            />
          </div>

          <div className="tweaks-row">
            <div className="tweaks-lbl">
              <span>Mode</span>
            </div>
            <div className="tweaks-seg" role="radiogroup">
              {MODE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={tweaks.mode === option.value}
                  onClick={() => setTweak("mode", option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweaks-sect">Type</div>

          <div className="tweaks-row">
            <div className="tweaks-lbl">
              <span>Display font</span>
            </div>
            <select
              className="tweaks-field"
              value={tweaks.displayFont}
              onChange={(event) =>
                setTweak("displayFont", event.target.value as DisplayFont)
              }
            >
              {DISPLAY_FONT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="tweaks-sect">Effects</div>

          <div className="tweaks-row tweaks-row-h">
            <div className="tweaks-lbl">
              <span>Paper grid</span>
            </div>
            <button
              type="button"
              className="tweaks-toggle"
              data-on={tweaks.paperGrid ? "1" : "0"}
              role="switch"
              aria-checked={tweaks.paperGrid}
              aria-label="Toggle paper grid"
              onClick={() => setTweak("paperGrid", !tweaks.paperGrid)}
            >
              <i />
            </button>
          </div>

          <div className="tweaks-row tweaks-row-h">
            <div className="tweaks-lbl">
              <span>Bingus</span>
            </div>
            <button
              type="button"
              className="tweaks-toggle"
              data-on={tweaks.bingusOn ? "1" : "0"}
              role="switch"
              aria-checked={tweaks.bingusOn}
              aria-label="Toggle Bingus"
              onClick={() => setTweak("bingusOn", !tweaks.bingusOn)}
            >
              <i />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default TweaksPanel;
