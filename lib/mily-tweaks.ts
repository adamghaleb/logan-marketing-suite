export type MilyMode = "light" | "dark";

export interface MilyTweaks {
  readonly name: string;
  readonly fromName: string;
  readonly lavigoHue: number;
  readonly mode: MilyMode;
  readonly paperGrid: boolean;
  readonly bingusOn: boolean;
}

export const MILY_TWEAKS_DEFAULT: MilyTweaks = {
  name: "Mily",
  fromName: "Adam",
  lavigoHue: 292,
  mode: "light",
  paperGrid: true,
  bingusOn: true,
};

export const MILY_PAGE_TITLE = "mily.computer";
export const MILY_PLACEHOLDER_HEADING = "Mily's Home";
