import { PRACTICE_BRIEFS } from "@/lib/mily-data";

const PRACTICE_DAILY_COUNT = 4;

function pickDailyBriefs(date: Date = new Date()) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayIndex = Math.floor(date.getTime() / MS_PER_DAY);
  const total = PRACTICE_BRIEFS.length;
  if (total === 0) return [];
  const count = Math.min(PRACTICE_DAILY_COUNT, total);
  const start = ((dayIndex % total) + total) % total;
  const rotated: typeof PRACTICE_BRIEFS = Array.from(
    { length: count },
    (_, offset) => PRACTICE_BRIEFS[(start + offset) % total],
  );
  return rotated;
}

export interface PracticeProps {
  readonly today?: Date;
}

export function Practice({ today }: PracticeProps = {}) {
  const items = pickDailyBriefs(today);

  return (
    <section className="section">
      <div className="section-head">
        <span className="section-num">ii.</span>
        <h2 className="section-title">small practice</h2>
        <span className="section-line"></span>
        <span className="section-tag">no pressure, just reps</span>
      </div>
      <div className="practice-list">
        {items.map((it) => (
          <div key={it.id} className={`practice-row ${it.done ? "done" : ""}`}>
            <span className="practice-check"></span>
            <div>
              <div className="practice-title">{it.title}</div>
              <div className="practice-desc">{it.desc}</div>
            </div>
            <span className="practice-pill">{it.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
