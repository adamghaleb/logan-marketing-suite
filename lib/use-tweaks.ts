"use client";

import { useCallback, useEffect, useState } from "react";
import { MILY_TWEAKS_DEFAULT, type MilyTweaks } from "@/lib/mily-tweaks";

export type DisplayFont = "milkyway" | "talina" | "mochi" | "mochi-extrude";

export interface MilyTweaksExtended extends MilyTweaks {
  readonly displayFont: DisplayFont;
}

export const DISPLAY_FONT_DEFAULT: DisplayFont = "milkyway";

export const MILY_TWEAKS_EXTENDED_DEFAULT: MilyTweaksExtended = {
  ...MILY_TWEAKS_DEFAULT,
  displayFont: DISPLAY_FONT_DEFAULT,
};

export const TWEAKS_STORAGE_KEY = "mily_tweaks";
export const TWEAKS_OPEN_FLAG = "mily_tweaks_open";

export type TweakSetter = <K extends keyof MilyTweaksExtended>(
  key: K,
  value: MilyTweaksExtended[K],
) => void;

export interface UseTweaksResult {
  readonly tweaks: MilyTweaksExtended;
  readonly setTweak: TweakSetter;
  readonly hydrated: boolean;
}

function readStoredTweaks(): MilyTweaksExtended {
  if (typeof window === "undefined") return MILY_TWEAKS_EXTENDED_DEFAULT;
  try {
    const raw = window.localStorage.getItem(TWEAKS_STORAGE_KEY);
    if (!raw) return MILY_TWEAKS_EXTENDED_DEFAULT;
    const parsed = JSON.parse(raw) as Partial<MilyTweaksExtended>;
    return { ...MILY_TWEAKS_EXTENDED_DEFAULT, ...parsed };
  } catch {
    return MILY_TWEAKS_EXTENDED_DEFAULT;
  }
}

export function useTweaks(): UseTweaksResult {
  const [tweaks, setTweaks] = useState<MilyTweaksExtended>(
    MILY_TWEAKS_EXTENDED_DEFAULT,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTweaks(readStoredTweaks());
    setHydrated(true);
  }, []);

  const setTweak = useCallback<TweakSetter>((key, value) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(TWEAKS_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // localStorage may be unavailable (private mode, quota); fail soft.
        }
      }
      return next;
    });
  }, []);

  return { tweaks, setTweak, hydrated };
}
