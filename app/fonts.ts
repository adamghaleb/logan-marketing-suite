import localFont from "next/font/local";
import { Caveat, JetBrains_Mono, Nunito } from "next/font/google";

export const milkywayFont = localFont({
  src: "../public/fonts/Milkyway.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "400",
  fallback: ["Gloock", "Times New Roman", "serif"],
});

export const talinaFont = localFont({
  src: "../public/fonts/Talina.otf",
  variable: "--font-talina",
  display: "swap",
  weight: "400",
  fallback: ["Gloock", "Times New Roman", "serif"],
});

export const mochiBoomFont = localFont({
  src: "../public/fonts/MochiBoom.ttf",
  variable: "--font-mochi",
  display: "swap",
  weight: "400",
  fallback: ["Nunito", "system-ui", "sans-serif"],
});

export const mochiBoomExtrudeFont = localFont({
  src: "../public/fonts/MochiBoomExtrude.ttf",
  variable: "--font-mochi-extrude",
  display: "swap",
  weight: "400",
  fallback: ["Nunito", "system-ui", "sans-serif"],
});

export const fredokaFont = localFont({
  src: "../public/fonts/Fredoka.ttf",
  variable: "--font-fredoka",
  display: "swap",
  weight: "400",
  fallback: ["Nunito", "system-ui", "sans-serif"],
});

export const fredokaDingbatsFont = localFont({
  src: "../public/fonts/FredokaDingbats.ttf",
  variable: "--font-fredoka-dingbats",
  display: "swap",
  weight: "400",
  fallback: ["Nunito", "system-ui", "sans-serif"],
});

export const caveatFont = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
  fallback: ["cursive"],
});

export const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const fontVars = [
  milkywayFont.variable,
  talinaFont.variable,
  mochiBoomFont.variable,
  mochiBoomExtrudeFont.variable,
  fredokaFont.variable,
  fredokaDingbatsFont.variable,
  caveatFont.variable,
  nunitoFont.variable,
  jetBrainsMonoFont.variable,
].join(" ");

export const AMP_FONT_STACK =
  '"Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif';
