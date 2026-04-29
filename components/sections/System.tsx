import type { CSSProperties } from "react";

interface Swatch {
  readonly name: string;
  readonly varName: string;
  readonly dark?: boolean;
}

const LAVIGO_SWATCHES: readonly Swatch[] = [
  { name: "50", varName: "--lovego-50" },
  { name: "100", varName: "--lovego-100" },
  { name: "200", varName: "--lovego-200" },
  { name: "400", varName: "--lovego-400", dark: true },
  { name: "600", varName: "--lovego-600", dark: true },
];

const NEIGHBOR_SWATCHES: readonly Swatch[] = [
  { name: "paper", varName: "--paper" },
  { name: "cream", varName: "--paper-2" },
  { name: "peach", varName: "--peach" },
  { name: "sage", varName: "--sage" },
  { name: "ink", varName: "--lovego-800", dark: true },
];

const paletteLabelStyle: CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: 10.5,
  color: "var(--ink-3)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  marginBottom: 10,
};

const paletteLabelStyleSecond: CSSProperties = {
  ...paletteLabelStyle,
  margin: "14px 0 10px",
  marginBottom: 10,
};

const paletteCaptionStyle: CSSProperties = {
  fontFamily: "var(--hand)",
  fontSize: 17,
  color: "var(--lovego-400)",
  marginTop: 14,
  lineHeight: 1.3,
};

function SwatchRow({ swatches }: { readonly swatches: readonly Swatch[] }) {
  return (
    <div className="swatch-row">
      {swatches.map((swatch) => (
        <div
          key={swatch.varName}
          className={swatch.dark ? "swatch dark" : "swatch"}
          style={{ background: `var(${swatch.varName})` }}
        >
          <span className="swatch-name">{swatch.name}</span>
        </div>
      ))}
    </div>
  );
}

export function System() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">iii.</span>
        <h2 className="section-title">the look of this place</h2>
        <span className="section-line" />
        <span className="section-tag">color &amp; type</span>
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
          <div style={paletteLabelStyle}>lavigo — the soul</div>
          <SwatchRow swatches={LAVIGO_SWATCHES} />
          <div style={paletteLabelStyleSecond}>warm neighbors</div>
          <SwatchRow swatches={NEIGHBOR_SWATCHES} />
          <div style={paletteCaptionStyle}>
            soft when it can be, deep when it has to be.
          </div>
        </div>
      </div>
    </section>
  );
}
