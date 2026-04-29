interface HeroProps {
  readonly name: string;
}

const DATE_LOCALE = "en-US";

function formatToday(now: Date): { dateStr: string; dayName: string } {
  const dateStr = now.toLocaleDateString(DATE_LOCALE, {
    month: "long",
    day: "numeric",
  });
  const dayName = now.toLocaleDateString(DATE_LOCALE, { weekday: "long" });
  return { dateStr, dayName };
}

export function Hero({ name }: HeroProps) {
  const { dateStr, dayName } = formatToday(new Date());
  const greetingName = name.toLowerCase();

  return (
    <div className="head">
      <div>
        <div className="greeting-eyebrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4 L11 8 L15 9 L11 10 L10 14 L9 10 L5 9 L9 8 Z"
              fill="oklch(0.68 0.13 288)"
            />
          </svg>
          good morning, {greetingName}
        </div>
        <h1 className="h1">
          your private toolkit for{" "}
          <span className="accent">Logan Marketing</span>.
        </h1>
        <p className="sub">
          everything I could think of to help you land softly into the new job —
          their playbook, patterns from their past sites, daily practice, and a
          goofy cat named Bingus who calls you {name}.
        </p>
      </div>
      <div className="today-card">
        <div className="today-label">today is</div>
        <div className="today-day">{dateStr}</div>
        <div className="today-week">a {dayName.toLowerCase()}</div>
      </div>
    </div>
  );
}
