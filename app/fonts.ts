import localFont from "next/font/local";
import { Caveat, JetBrains_Mono, Nunito } from "next/font/google";

export const milkywayFont = localFont({
  src: "../public/fonts/Milkyway-DEMO.ttf",
  variable: "--display",
  display: "swap",
  weight: "400",
});

export const caveatFont = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--hand",
  display: "swap",
});

export const nunitoFont = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--sans",
  display: "swap",
});

export const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--mono",
  display: "swap",
});

export const AMP_FONT_STACK =
  '"Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif';
