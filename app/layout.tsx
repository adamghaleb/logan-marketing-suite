import type { Metadata } from "next";
import type { ReactNode, CSSProperties } from "react";
import { AMP_FONT_STACK, fontVars } from "./fonts";
import {
  MILY_PAGE_TITLE,
  MILY_TWEAKS_DEFAULT,
  getDisplayFontVar,
} from "@/lib/mily-tweaks";
import "./globals.css";

export const metadata: Metadata = {
  title: MILY_PAGE_TITLE,
  description: "The Mily Suite — a private toolkit for Mily.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { mode, paperGrid, lavigoHue, displayFont } = MILY_TWEAKS_DEFAULT;
  const bodyStyle = {
    "--amp": AMP_FONT_STACK,
    "--lavigo-h": String(lavigoHue),
    "--display": getDisplayFontVar(displayFont),
  } as CSSProperties;
  return (
    <html lang="en" className={fontVars}>
      <body
        data-mode={mode}
        data-display={displayFont}
        data-paper-grid={paperGrid ? "1" : "0"}
        style={bodyStyle}
      >
        {children}
      </body>
    </html>
  );
}
