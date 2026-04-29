export interface PracticeBrief {
  readonly id: string;
  readonly title: string;
  readonly desc: string;
  readonly time: string;
  readonly done: boolean;
}

export const PRACTICE_BRIEFS: readonly PracticeBrief[] = [
  {
    id: "p1",
    title: "Redesign the homepage of a B&B you've never heard of",
    desc: "Pick one from a quiet town. 25 minutes. Don't use stock photos.",
    time: "25 min",
    done: true,
  },
  {
    id: "p2",
    title: "Make three logos for the same fictional inn",
    desc: "Wordmark, monogram, illustrative. Same brief, three voices.",
    time: "40 min",
    done: false,
  },
  {
    id: "p3",
    title: "Write the welcome email a guest gets the day before arrival",
    desc: "Friendly, useful, no jargon. Then design it.",
    time: "30 min",
    done: false,
  },
  {
    id: "p4",
    title: "Pick a color from a place you love. Build a palette around it",
    desc: "Use it on a real layout. Photo of breakfast, room interior, garden.",
    time: "20 min",
    done: false,
  },
  {
    id: "p5",
    title: "Rewrite a hotel's 'About' page like you actually like the place",
    desc: "No 'nestled', no 'luxurious'. Just real sentences a real person would say.",
    time: "20 min",
    done: false,
  },
];

export type PixelGrid = readonly (readonly (string | null)[])[];

export interface MouseCharacter {
  readonly id: string;
  readonly name: string;
  readonly note: string;
  readonly pixels: PixelGrid;
}

const MOUSE_GREY = "oklch(0.72 0.025 285)";
const MOUSE_DARK = "oklch(0.48 0.05 285)";
const MOUSE_PEACH = "oklch(0.84 0.07 55)";
const MOUSE_EYE = "oklch(0.22 0.04 285)";
const MOUSE_TAIL = "oklch(0.55 0.03 285)";
const MOUSE_CREAM = "oklch(0.92 0.02 80)";
const MOUSE_SAGE = "oklch(0.78 0.06 155)";
const MOUSE_LAVENDER = "oklch(0.84 0.07 290)";
const MOUSE_SHADOW = "oklch(0.55 0.04 285)";

const G = MOUSE_GREY;
const D = MOUSE_DARK;
const P = MOUSE_PEACH;
const E = MOUSE_EYE;
const T = MOUSE_TAIL;
const C = MOUSE_CREAM;
const S = MOUSE_SAGE;
const L = MOUSE_LAVENDER;
const H = MOUSE_SHADOW;
const _ = null;

const CHUBBY_GREY: PixelGrid = [
  [_, _, D, D, _, _, _, _, D, D, _, _, _, _],
  [_, D, P, D, _, _, _, _, D, P, D, _, _, _],
  [_, D, G, G, G, G, G, G, G, G, D, _, _, _],
  [D, G, G, E, G, G, G, G, E, G, G, D, _, _],
  [D, G, G, G, G, P, P, G, G, G, G, D, _, _],
  [D, G, G, G, G, G, G, G, G, G, G, D, _, _],
  [_, D, G, G, G, G, G, G, G, G, D, _, _, _],
  [_, _, D, G, G, G, G, G, G, D, T, T, _, _],
  [_, _, _, D, G, G, G, G, D, T, _, T, T, _],
  [_, _, _, _, D, D, D, D, _, _, _, _, T, T],
];

const FIELD_MOUSE: PixelGrid = [
  [_, _, D, D, _, _, _, D, D, _, _, _, _, _],
  [_, D, P, D, _, _, D, P, D, _, _, _, _, _],
  [_, D, G, G, G, G, G, G, D, _, _, _, _, _],
  [D, G, E, G, G, G, G, E, G, D, _, _, _, _],
  [D, G, G, G, P, P, G, G, G, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, D, _, _, _, _, _],
  [_, _, D, G, G, G, G, D, T, T, _, _, _, _],
  [_, _, _, D, G, G, D, _, _, T, T, _, _, _],
  [_, _, _, _, D, D, _, _, _, _, T, T, T, _],
];

const LIBRARY_MOUSE: PixelGrid = [
  [_, _, D, D, _, _, _, _, D, D, _, _, _, _],
  [_, D, P, D, _, _, _, D, P, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [D, G, G, C, E, C, C, E, C, G, D, _, _, _],
  [D, G, G, C, C, C, C, C, C, G, D, _, _, _],
  [D, G, G, G, G, P, P, G, G, G, D, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [_, _, D, G, G, G, G, G, D, T, _, _, _, _],
  [_, _, _, D, G, G, G, D, _, T, T, _, _, _],
  [_, _, _, _, D, D, D, _, _, _, T, T, T, _],
];

const DRAMATIC_MOUSE: PixelGrid = [
  [_, _, D, D, _, _, _, _, D, D, _, _, _, _],
  [_, D, L, D, _, _, _, D, L, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [D, G, E, E, G, G, G, E, E, G, D, _, _, _],
  [D, G, E, G, G, G, G, G, E, G, D, _, _, _],
  [D, G, G, G, P, P, P, G, G, G, D, _, _, _],
  [_, D, G, G, P, _, P, G, G, D, _, _, _, _],
  [_, _, D, G, G, P, G, G, D, T, _, _, _, _],
  [_, _, _, D, G, G, G, D, T, _, T, _, _, _],
  [_, _, _, _, D, D, D, _, _, T, _, T, T, _],
];

const SLEEPY_MOUSE: PixelGrid = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, D, D, _, _, _, _, D, D, _, _, _, _],
  [_, D, P, D, D, _, _, D, P, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [D, G, H, H, G, G, G, H, H, G, D, _, _, _],
  [D, G, G, G, G, P, G, G, G, G, D, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [_, _, D, G, G, G, G, G, D, T, _, _, _, _],
  [_, _, _, D, D, G, G, D, _, T, T, _, _, _],
  [_, _, _, _, _, D, D, _, _, _, T, T, T, _],
];

const GARDEN_MOUSE: PixelGrid = [
  [_, _, D, D, _, _, _, _, D, D, _, _, _, _],
  [_, D, S, D, _, _, _, D, S, D, _, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [D, G, G, E, G, G, G, E, G, G, D, _, _, _],
  [D, G, G, G, G, P, P, G, G, G, D, _, _, _],
  [_, D, G, G, G, G, G, G, G, D, _, _, _, _],
  [_, _, D, G, G, G, G, G, D, T, _, _, _, _],
  [_, _, _, D, G, G, G, D, _, T, T, _, _, _],
  [_, _, _, _, D, D, D, _, _, _, _, T, T, _],
  [_, _, S, _, _, _, _, _, S, _, _, _, _, S],
];

export const MICE: readonly MouseCharacter[] = [
  {
    id: "chubby-grey",
    name: "a chubby grey mouse",
    note: "i found him near the radiator. he's a little dusty but very brave.",
    pixels: CHUBBY_GREY,
  },
  {
    id: "field-mouse",
    name: "a tiny field mouse",
    note: "this one had a pinecone with him. i let him keep it.",
    pixels: FIELD_MOUSE,
  },
  {
    id: "library-mouse",
    name: "a polite library mouse",
    note: "smelled like paper. wore tiny glasses. you would've liked him.",
    pixels: LIBRARY_MOUSE,
  },
  {
    id: "dramatic-mouse",
    name: "a dramatic mouse",
    note: "he gasped when he saw me. very theatrical. 10/10.",
    pixels: DRAMATIC_MOUSE,
  },
  {
    id: "sleepy-mouse",
    name: "a sleepy mouse",
    note: "he was already napping when i found him. i didn't wake him. just brought him.",
    pixels: SLEEPY_MOUSE,
  },
  {
    id: "garden-mouse",
    name: "a quiet garden mouse",
    note: "he had a clover in his mouth. i think he was bringing it home.",
    pixels: GARDEN_MOUSE,
  },
];

export function getMouseForDay(date: Date = new Date()): {
  readonly mouse: MouseCharacter;
  readonly index: number;
} {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayIndex = Math.floor(date.getTime() / MS_PER_DAY) % MICE.length;
  const safeIndex = ((dayIndex % MICE.length) + MICE.length) % MICE.length;
  return { mouse: MICE[safeIndex], index: safeIndex };
}
