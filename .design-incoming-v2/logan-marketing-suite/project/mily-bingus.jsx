// Bingus — the goofy nerdy cat assistant
// Lives bottom-right. Has personality. Calls her Mily.

const { useState, useEffect, useRef } = React;

const BINGUS_LINES = [
  {
    msg: "morning Mily. brought you something. 🐭 it's on your desk.",
    actions: ["thank you", "what is it?"],
  },
  {
    msg: "i don't know what 'kerning' means but i think it's when letters hold paws.",
    actions: ["close enough", "explain better?"],
  },
  {
    msg: "you got this. inns and B&Bs are basically just big cozy houses for tired humans, which is my whole specialty.",
    actions: ["true", "tell me more"],
  },
  {
    msg: "fun fact: the word 'pixel' was almost called 'pel'. i looked it up. you're welcome.",
    actions: ["wow", "another?"],
  },
  {
    msg: "if you're stuck on a layout, try squinting. i squint at everything. it works 60% of the time, every time.",
    actions: ["I'll try", "you're weird"],
  },
  {
    msg: "remember: the client doesn't always know what they want. but they know how they want to feel. that's your job. (i think. i'm a cat.)",
    actions: ["that's actually good", "are you sure you're a cat"],
  },
  {
    msg: "Adam asked me to remind you that you are very good at this. and that you're loved. ♡",
    actions: ["♡", "tell him hi"],
  },
];

function BingusCat() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Sparkles */}
      <text
        className="sparkle"
        x="14"
        y="20"
        fontSize="10"
        fill="oklch(0.62 0.13 290)"
      >
        ✦
      </text>
      <text
        className="sparkle s2"
        x="82"
        y="22"
        fontSize="8"
        fill="oklch(0.62 0.13 290)"
      >
        ✦
      </text>
      <text
        className="sparkle s3"
        x="78"
        y="62"
        fontSize="9"
        fill="oklch(0.62 0.13 290)"
      >
        ♡
      </text>

      {/* Tail */}
      <path
        className="tail"
        d="M 70 70 Q 88 60 86 42 Q 85 32 78 30"
        fill="none"
        stroke="oklch(0.48 0.16 285)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Body */}
      <ellipse cx="50" cy="64" rx="26" ry="22" fill="oklch(0.68 0.13 288)" />

      {/* Head */}
      <circle cx="50" cy="42" r="22" fill="oklch(0.68 0.13 288)" />

      {/* Ears */}
      <path d="M 32 30 L 28 14 L 42 24 Z" fill="oklch(0.48 0.16 285)" />
      <path d="M 68 30 L 72 14 L 58 24 Z" fill="oklch(0.48 0.16 285)" />
      <path d="M 33 27 L 32 20 L 38 25 Z" fill="oklch(0.84 0.07 55)" />
      <path d="M 67 27 L 68 20 L 62 25 Z" fill="oklch(0.84 0.07 55)" />

      {/* Eyes — nerdy round glasses */}
      <circle
        cx="42"
        cy="42"
        r="6.5"
        fill="white"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1.5"
      />
      <circle
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
      {/* Pupils */}
      <circle cx="42" cy="43" r="2" fill="oklch(0.22 0.04 285)" />
      <circle cx="58" cy="43" r="2" fill="oklch(0.22 0.04 285)" />
      <circle cx="42.6" cy="42.4" r="0.7" fill="white" />
      <circle cx="58.6" cy="42.4" r="0.7" fill="white" />

      {/* Nose */}
      <path d="M 48 49 L 52 49 L 50 52 Z" fill="oklch(0.62 0.13 45)" />

      {/* Mouth — little smile */}
      <path
        d="M 50 52 Q 47 56 44 54"
        fill="none"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 50 52 Q 53 56 56 54"
        fill="none"
        stroke="oklch(0.28 0.13 282)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

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

      {/* Little paws */}
      <ellipse cx="38" cy="84" rx="6" ry="3.5" fill="oklch(0.48 0.16 285)" />
      <ellipse cx="62" cy="84" rx="6" ry="3.5" fill="oklch(0.48 0.16 285)" />
    </svg>
  );
}

function PixelMouse() {
  // Tiny pixel mouse — Bingus's gift of the day
  const px = (x, y, c, s = 4) => (
    <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s} fill={c} />
  );
  const G = "oklch(0.72 0.025 285)"; // gray body
  const D = "oklch(0.48 0.05 285)"; // darker outline
  const P = "oklch(0.84 0.07 55)"; // peach ear inside / nose
  const E = "oklch(0.22 0.04 285)"; // eye
  const T = "oklch(0.55 0.03 285)"; // tail
  return (
    <svg viewBox="0 0 56 44" width="56" height="44" shapeRendering="crispEdges">
      {/* row 0 ears tops */}
      {px(2, 2, D)}
      {px(3, 2, D)}
      {px(8, 2, D)}
      {px(9, 2, D)}
      {px(1, 3, D)}
      {px(2, 3, P)}
      {px(3, 3, D)}
      {px(8, 3, D)}
      {px(9, 3, P)}
      {px(10, 3, D)}
      {/* head */}
      {px(2, 4, D)}
      {px(3, 4, G)}
      {px(4, 4, G)}
      {px(5, 4, G)}
      {px(6, 4, G)}
      {px(7, 4, G)}
      {px(8, 4, G)}
      {px(9, 4, D)}
      {px(1, 5, D)}
      {px(2, 5, G)}
      {px(3, 5, G)}
      {px(4, 5, E)}
      {px(5, 5, G)}
      {px(6, 5, G)}
      {px(7, 5, E)}
      {px(8, 5, G)}
      {px(9, 5, G)}
      {px(10, 5, D)}
      {px(1, 6, D)}
      {px(2, 6, G)}
      {px(3, 6, G)}
      {px(4, 6, G)}
      {px(5, 6, P)}
      {px(6, 6, P)}
      {px(7, 6, G)}
      {px(8, 6, G)}
      {px(9, 6, G)}
      {px(10, 6, D)}
      {px(2, 7, D)}
      {px(3, 7, G)}
      {px(4, 7, G)}
      {px(5, 7, G)}
      {px(6, 7, G)}
      {px(7, 7, G)}
      {px(8, 7, G)}
      {px(9, 7, D)}
      {/* body */}
      {px(3, 8, D)}
      {px(4, 8, G)}
      {px(5, 8, G)}
      {px(6, 8, G)}
      {px(7, 8, G)}
      {px(8, 8, D)}
      {px(4, 9, D)}
      {px(5, 9, G)}
      {px(6, 9, G)}
      {px(7, 9, D)}
      {/* tail curling right */}
      {px(8, 9, T)}
      {px(9, 9, T)}
      {px(10, 9, T)}
      {px(11, 9, T)}
      {px(12, 9, T)}
      {px(12, 8, T)}
      {px(13, 8, T)}
    </svg>
  );
}

function Bingus() {
  const [idx, setIdx] = useState(() => {
    // Start with morning gift if it's their first visit today
    const today = new Date().toDateString();
    const last = localStorage.getItem("bingus-last-day");
    if (last !== today) {
      localStorage.setItem("bingus-last-day", today);
      return 0;
    }
    // Otherwise random
    return Math.floor(Math.random() * BINGUS_LINES.length);
  });
  const [open, setOpen] = useState(true);
  const line = BINGUS_LINES[idx];

  const next = () => setIdx((idx + 1) % BINGUS_LINES.length);

  return (
    <div className="bingus-wrap">
      {open && (
        <div className="bingus-bubble" key={idx}>
          <div className="bingus-name">
            <span className="bingus-status-dot"></span>
            Bingus
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "var(--ink-4)",
                marginLeft: "auto",
                letterSpacing: "0.04em",
              }}
            >
              your cat
            </span>
          </div>
          <div className="bingus-msg">{line.msg}</div>
          <div className="bingus-actions">
            {line.actions.map((a, i) => (
              <button key={i} className="bingus-action" onClick={next}>
                {a}
              </button>
            ))}
            <button
              className="bingus-action"
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto",
                background: "transparent",
                border: "1px dashed var(--line)",
              }}
            >
              shoo
            </button>
          </div>
        </div>
      )}
      <div
        className="bingus-cat"
        onClick={() => {
          setOpen(true);
          next();
        }}
      >
        <BingusCat />
      </div>
    </div>
  );
}

Object.assign(window, { Bingus, BingusCat, PixelMouse, BINGUS_LINES });
