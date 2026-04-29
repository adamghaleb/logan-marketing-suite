// Canned offline replies + greeting lines for the Bingus chat dock.
// Used as fallbacks when the /api/bingus/chat route is unreachable
// (404 = not wired yet, network error after retries, etc.) and for
// the initial greeting before the API has been called.
//
// Voice rules (per BINGUS.md):
// - calls her "Mily"
// - made by "Adam"
// - goofy + nerdy + earnest, reading glasses always on
// - one Bingus-ism at most when she's working

export interface BingusLine {
  readonly msg: string;
}

export const BINGUS_GREETINGS: readonly BingusLine[] = [
  {
    msg: "It is I, Bingus. I have brought you a small mouse and also some encouragement. What are we doing today, Mily?",
  },
  {
    msg: "morning Mily. brought you something. it's on your desk. what should we work on?",
  },
  {
    msg: "Hi Mily. I have been awake since 4am for no reason. How can I help you not have my schedule?",
  },
  {
    msg: "(deposits one (1) digital rat at your feet) — anyway. Hi Mily. What's the plan?",
  },
];

export const BINGUS_OFFLINE_FALLBACKS: readonly BingusLine[] = [
  {
    msg: "meow, my brain isn't plugged in yet — Adam's still wiring me up. try me again in a minute, Mily.",
  },
  {
    msg: "I do not know. I am a cat. Also Adam hasn't finished hooking up my brain yet. soon, Mily.",
  },
  {
    msg: "*stares at wall* …Adam's still wiring my brain. I'll be back, Mily. — Bingus",
  },
];

export const BINGUS_NETWORK_ERROR_FALLBACKS: readonly BingusLine[] = [
  {
    msg: "Mily, I tried three times. The network is being weird. Maybe try again in a sec? — Bingus",
  },
  {
    msg: "I retried. I retried again. I retried a third time. Still nothing. I am a cat and even I am a little annoyed. Try once more, Mily.",
  },
];

export const BINGUS_GENERIC_ERROR_FALLBACKS: readonly BingusLine[] = [
  {
    msg: "Something went sideways. I do not know what. I am a cat. Try again, Mily — Bingus",
  },
  {
    msg: "(Bingus blinks slowly, adjusts glasses) something broke. let's try once more, Mily.",
  },
];

export function pickRandomLine(lines: readonly BingusLine[]): BingusLine {
  if (lines.length === 0) {
    return { msg: "meow, Mily." };
  }
  const index = Math.floor(Math.random() * lines.length);
  return lines[index] ?? lines[0]!;
}

export function pickGreeting(): BingusLine {
  return pickRandomLine(BINGUS_GREETINGS);
}

export function pickOfflineFallback(): BingusLine {
  return pickRandomLine(BINGUS_OFFLINE_FALLBACKS);
}

export function pickNetworkErrorFallback(): BingusLine {
  return pickRandomLine(BINGUS_NETWORK_ERROR_FALLBACKS);
}

export function pickGenericErrorFallback(): BingusLine {
  return pickRandomLine(BINGUS_GENERIC_ERROR_FALLBACKS);
}
