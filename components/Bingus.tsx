"use client";

// Bingus chat dock — bottom-right floating UI for talking to Bingus,
// Mily's goofy nerdy reading-glasses-wearing cat assistant.
//
// Hard rules:
// - All animations live in BingusCat.module.css and Bingus.module.css (CSS keyframes only).
// - Always calls her "Mily" (capitalized).
// - POST /api/bingus/chat (route lands in Batch 3) wrapped in fetchWithRetry.
// - On 404 (route missing) we surface a friendly canned line, not an error.
// - On network error after 3 retries we surface a different canned line.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  BINGUS_GENERIC_ERROR_FALLBACKS,
  pickGreeting,
  pickGenericErrorFallback,
  pickNetworkErrorFallback,
  pickOfflineFallback,
} from "@/lib/bingus-lines";
import { fetchWithRetry } from "@/lib/fetch-retry";
import { MILY_TWEAKS_DEFAULT } from "@/lib/mily-tweaks";
import BingusCat from "./BingusCat";
import styles from "./Bingus.module.css";

const CHAT_ENDPOINT = "/api/bingus/chat";

interface ChatMessage {
  readonly id: string;
  readonly role: "user" | "bingus";
  readonly content: string;
  readonly variant?: "normal" | "fallback" | "error";
}

interface BingusChatResponse {
  readonly message: string;
}

function makeMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isBingusChatResponse(value: unknown): value is BingusChatResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (value as { message: unknown }).message === "string"
  );
}

async function postBingusMessage(userMessage: string): Promise<{
  readonly outcome: "ok" | "missing-route" | "network-error" | "bad-response";
  readonly message: string;
}> {
  try {
    const response = await fetchWithRetry(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (response.status === 404) {
      return { outcome: "missing-route", message: pickOfflineFallback().msg };
    }

    if (!response.ok) {
      return {
        outcome: "bad-response",
        message: pickGenericErrorFallback().msg,
      };
    }

    const payload = (await response.json().catch(() => null)) as unknown;
    if (!isBingusChatResponse(payload)) {
      return {
        outcome: "bad-response",
        message: pickGenericErrorFallback().msg,
      };
    }

    return { outcome: "ok", message: payload.message };
  } catch {
    return {
      outcome: "network-error",
      message: pickNetworkErrorFallback().msg,
    };
  }
}

interface BingusProps {
  readonly bingusOn?: boolean;
}

export default function Bingus({
  bingusOn = MILY_TWEAKS_DEFAULT.bingusOn,
}: BingusProps) {
  const initialGreeting = useMemo<ChatMessage>(
    () => ({
      id: "greeting",
      role: "bingus",
      content: pickGreeting().msg,
      variant: "normal",
    }),
    [],
  );

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = useState(true);
  const [isPetting, setIsPetting] = useState(false);
  const [hearts, setHearts] = useState<
    ReadonlyArray<{ id: string; x: number; delay: number }>
  >([]);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, isSending]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isSending) return;

      const userMessage: ChatMessage = {
        id: makeMessageId(),
        role: "user",
        content: trimmed,
      };
      setMessages((previous) => [...previous, userMessage]);
      setInput("");
      setIsSending(true);

      const result = await postBingusMessage(trimmed);

      const variant: ChatMessage["variant"] =
        result.outcome === "ok"
          ? "normal"
          : result.outcome === "missing-route"
            ? "fallback"
            : "error";

      const bingusReply: ChatMessage = {
        id: makeMessageId(),
        role: "bingus",
        content: result.message,
        variant,
      };
      setMessages((previous) => [...previous, bingusReply]);
      setIsSending(false);
    },
    [input, isSending],
  );

  const handleShoo = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCatClick = useCallback(() => {
    setOpen(true);
    setIsPetting(true);
    const burst = Array.from({ length: 5 }, () => ({
      id: makeMessageId(),
      x: Math.round((Math.random() - 0.5) * 36),
      delay: Math.round(Math.random() * 140),
    }));
    setHearts((previous) => [...previous, ...burst]);
    const burstIds = new Set(burst.map((h) => h.id));
    window.setTimeout(() => {
      setHearts((previous) => previous.filter((h) => !burstIds.has(h.id)));
    }, 1100);
    window.setTimeout(() => {
      setIsPetting(false);
    }, 900);
  }, []);

  if (!bingusOn) return null;

  const catState: "idle" | "talking" | "petting" = isPetting
    ? "petting"
    : isSending
      ? "talking"
      : "idle";

  return (
    <div className={styles.wrap} aria-live="polite">
      {open && (
        <div className={styles.bubble} role="dialog" aria-label="Bingus chat">
          <div className={styles.header}>
            <span className={styles.statusDot} aria-hidden="true" />
            Bingus
            <span className={styles.role}>your cat</span>
            <button
              type="button"
              className={styles.shoo}
              onClick={handleShoo}
              aria-label="Hide Bingus"
            >
              shoo
            </button>
          </div>

          <div className={styles.log} ref={logRef}>
            {messages.map((message) => {
              const messageClass =
                message.role === "user"
                  ? `${styles.message} ${styles.userMessage}`
                  : message.variant === "error"
                    ? `${styles.message} ${styles.bingusMessage} ${styles.errorMessage}`
                    : `${styles.message} ${styles.bingusMessage}`;
              return (
                <div key={message.id} className={messageClass}>
                  {message.content}
                </div>
              );
            })}
            {isSending && (
              <div className={`${styles.message} ${styles.bingusMessage}`}>
                <span className={styles.thinking}>
                  <span className={styles.thinkingDot} />
                  <span
                    className={`${styles.thinkingDot} ${styles.thinkingDotTwo}`}
                  />
                  <span
                    className={`${styles.thinkingDot} ${styles.thinkingDotThree}`}
                  />
                  <span>Bingus is thinking…</span>
                </span>
              </div>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="say hi to Bingus"
              aria-label="Message Bingus"
              disabled={isSending}
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.send}
              disabled={isSending || input.trim().length === 0}
            >
              send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={styles.cat}
        onClick={handleCatClick}
        aria-label={open ? "Pet Bingus" : "Wake Bingus up"}
      >
        <BingusCat state={catState} />
        {hearts.map((heart) => (
          <svg
            key={heart.id}
            className={styles.heart}
            style={{
              left: `calc(50% + ${heart.x}px)`,
              animationDelay: `${heart.delay}ms`,
            }}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              d="M 8 14 C 8 11, 4 9, 4 5 C 4 2, 7 1, 8 4 C 9 1, 12 2, 12 5 C 12 9, 8 11, 8 14 Z"
              fill="oklch(0.7 0.18 18)"
            />
          </svg>
        ))}
      </button>
    </div>
  );
}

// Re-export fallback array so callers / tests can introspect it without
// importing from lib directly.
export { BINGUS_GENERIC_ERROR_FALLBACKS };
