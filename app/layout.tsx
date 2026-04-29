import type { Metadata } from "next";
import type { ReactNode, CSSProperties } from "react";
import {
  AMP_FONT_STACK,
  caveatFont,
  jetBrainsMonoFont,
  milkywayFont,
  nunitoFont,
} from "./fonts";
import { MILY_PAGE_TITLE, MILY_TWEAKS_DEFAULT } from "@/lib/mily-tweaks";
import "./globals.css";

export const metadata: Metadata = {
  title: MILY_PAGE_TITLE,
  description: "The Mily Suite — a private toolkit for Mily.",
};

const FONT_VAR_CLASSES = [
  milkywayFont.variable,
  caveatFont.variable,
  nunitoFont.variable,
  jetBrainsMonoFont.variable,
].join(" ");

const ampStyle = { "--amp": AMP_FONT_STACK } as CSSProperties;

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { mode, paperGrid } = MILY_TWEAKS_DEFAULT;
  return (
    <html lang="en" className={FONT_VAR_CLASSES}>
      <body
        data-mode={mode}
        data-grid={paperGrid ? "on" : "off"}
        style={ampStyle}
      >
        {children}
      </body>
    </html>
  );
}
