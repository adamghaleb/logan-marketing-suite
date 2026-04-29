export type MilyMode = "light" | "dark";

export type MilyDisplayFont = "milkyway" | "talina" | "mochi" | "mochi-extrude";

export interface MilyTweaks {
  readonly name: string;
  readonly fromName: string;
  readonly lavigoHue: number;
  readonly mode: MilyMode;
  readonly displayFont: MilyDisplayFont;
  readonly paperGrid: boolean;
  readonly bingusOn: boolean;
}

export const MILY_TWEAKS_DEFAULT: MilyTweaks = {
  name: "Mily",
  fromName: "Adam",
  lavigoHue: 292,
  mode: "dark",
  displayFont: "milkyway",
  paperGrid: true,
  bingusOn: true,
};

const DISPLAY_FONT_VARS: Record<MilyDisplayFont, string> = {
  milkyway: "var(--font-display)",
  talina: "var(--font-talina)",
  mochi: "var(--font-mochi)",
  "mochi-extrude": "var(--font-mochi-extrude)",
};

export function getDisplayFontVar(font: MilyDisplayFont): string {
  return DISPLAY_FONT_VARS[font];
}

export const MILY_PAGE_TITLE = "the Mily Suite — for Mily, by Adam";
export const MILY_PLACEHOLDER_HEADING = "Mily's Home";
