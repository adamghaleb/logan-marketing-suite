"use client";

import { useEffect, useState } from "react";
import { MICE, getMouseForDay } from "@/lib/mily-data";
import { PixelMouse } from "@/components/PixelMouse";

export interface MouseOfTheDayClientProps {
  readonly initialIndex: number;
}

export function MouseOfTheDayClient({
  initialIndex,
}: MouseOfTheDayClientProps) {
  const [index, setIndex] = useState<number>(initialIndex);

  useEffect(() => {
    const { index: clientIndex } = getMouseForDay(new Date());
    if (clientIndex !== initialIndex) setIndex(clientIndex);
  }, [initialIndex]);

  const mouse = MICE[index] ?? MICE[0];
  const displayNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="mouse-card">
      <div className="mouse-art">
        <PixelMouse pixels={mouse.pixels} title={mouse.name} />
      </div>
      <div className="mouse-text">
        <div className="mouse-eyebrow">today&apos;s gift, from Bingus —</div>
        <div className="mouse-title">{mouse.name}.</div>
        <div className="mouse-note">&ldquo;{mouse.note}&rdquo;</div>
      </div>
      <div className="mouse-stamp">
        no.
        <br />
        <span style={{ fontSize: 26, color: "var(--lovego-600)" }}>
          {displayNumber}
        </span>
      </div>
    </div>
  );
}
