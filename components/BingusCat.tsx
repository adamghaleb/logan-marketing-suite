// BingusCat — the goofy nerdy pixel cat with reading glasses.
// Pure SVG sprite. All animations are CSS keyframes (see BingusCat.module.css).
// No requestAnimationFrame, no JS timers.

import styles from "./BingusCat.module.css";

export type BingusCatState = "idle" | "talking" | "petting";

interface BingusCatProps {
  readonly state?: BingusCatState;
  readonly title?: string;
}

export function BingusCat({
  state = "idle",
  title = "Bingus, your cat",
}: BingusCatProps) {
  const isPetting = state === "petting";
  return (
    <svg
      className={styles.cat}
      data-state={state}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      {/* Tail */}
      <path
        className={styles.tail}
        d="M 70 70 Q 88 60 86 42 Q 85 32 78 30"
        fill="none"
        stroke="oklch(0.48 0.16 285)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Body */}
      <ellipse
        className={styles.body}
        cx="50"
        cy="64"
        rx="26"
        ry="22"
        fill="oklch(0.68 0.13 288)"
      />

      {/* Head */}
      <circle cx="50" cy="42" r="22" fill="oklch(0.68 0.13 288)" />

      {/* Ears */}
      <path d="M 32 30 L 28 14 L 42 24 Z" fill="oklch(0.48 0.16 285)" />
      <path d="M 68 30 L 72 14 L 58 24 Z" fill="oklch(0.48 0.16 285)" />
      <path d="M 33 27 L 32 20 L 38 25 Z" fill="oklch(0.84 0.07 55)" />
      <path d="M 67 27 L 68 20 L 62 25 Z" fill="oklch(0.84 0.07 55)" />

      {/* Reading glasses — round nerdy lenses, always on */}
      <g className={styles.glasses}>
        <circle
          className={styles.eye}
          cx="42"
          cy="42"
          r="6.5"
          fill="white"
          stroke="oklch(0.28 0.13 282)"
          strokeWidth="1.5"
        />
        <circle
          className={`${styles.eye} ${styles.eyeRight}`}
          cx="58"
          cy="42"
          r="6.5"
          fill="white"
          stroke="oklch(0.28 0.13 282)"
          strokeWidth="1.5"
        />
        <line
          x1="48.5"
          y1="42"
          x2="51.5"
          y2="42"
          stroke="oklch(0.28 0.13 282)"
          strokeWidth="1.5"
        />
      </g>

      {/* Open-eye pupils + catchlights (hidden when petting) */}
      {!isPetting && (
        <>
          <circle cx="42" cy="43" r="2" fill="oklch(0.22 0.04 285)" />
          <circle cx="58" cy="43" r="2" fill="oklch(0.22 0.04 285)" />
          <circle cx="42.6" cy="42.4" r="0.7" fill="white" />
          <circle cx="58.6" cy="42.4" r="0.7" fill="white" />
        </>
      )}

      {/* Happy closed-eye arcs while being pet */}
      {isPetting && (
        <g className={styles.happyEyes}>
          <path
            d="M 38 43 Q 42 39 46 43"
            fill="none"
            stroke="oklch(0.22 0.04 285)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 54 43 Q 58 39 62 43"
            fill="none"
            stroke="oklch(0.22 0.04 285)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Nose */}
      <path d="M 48 49 L 52 49 L 50 52 Z" fill="oklch(0.62 0.13 45)" />

      {/* Mouth — talking flap when not petting, soft smile when petting */}
      {!isPetting && (
        <>
          <path
            className={styles.mouthLeft}
            d="M 50 52 Q 47 56 44 54"
            fill="none"
            stroke="oklch(0.28 0.13 282)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className={styles.mouthRight}
            d="M 50 52 Q 53 56 56 54"
            fill="none"
            stroke="oklch(0.28 0.13 282)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
      {isPetting && (
        <path
          d="M 44 53 Q 50 59 56 53"
          fill="none"
          stroke="oklch(0.28 0.13 282)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}

      {/* Whiskers */}
      <line
        x1="32"
        y1="49"
        x2="22"
        y2="47"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="32"
        y1="51"
        x2="22"
        y2="52"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="68"
        y1="49"
        x2="78"
        y2="47"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="68"
        y1="51"
        x2="78"
        y2="52"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Paws */}
      <ellipse cx="38" cy="84" rx="6" ry="3.5" fill="oklch(0.48 0.16 285)" />
      <ellipse cx="62" cy="84" rx="6" ry="3.5" fill="oklch(0.48 0.16 285)" />
    </svg>
  );
}

export default BingusCat;
