import type { Metadata } from "next";
import { InnerPageShell } from "@/components/InnerPageShell";
import { PracticeChecklist } from "@/components/PracticeChecklist";

export const metadata: Metadata = {
  title: "Practice — get this job",
  description:
    "A four-phase plan to land the Logan Marketing role and run it well from day one.",
};

interface PracticePhase {
  readonly slug: string;
  readonly num: string;
  readonly title: string;
  readonly description: string;
  readonly intro: string;
  readonly items: ReadonlyArray<string>;
}

const PHASES: ReadonlyArray<PracticePhase> = [
  {
    slug: "01-prepare-for-the-interview",
    num: "01.",
    title: "Prepare for the interview",
    description:
      "Show up knowing more about Logan than the other candidates do.",
    intro:
      "The interview is won before you join the call. Spend a few hours learning their voice, build a thing you can point at, and arrive rested.",
    items: [
      "Read everything Logan publishes (their site, blog, social) — note the voice",
      "Pick one Logan-style page (a real inn site they shipped) and rebuild it in your dev environment as a portfolio piece",
      "Prep three STAR stories (Situation/Task/Action/Result) — design problem you owned, scope creep you handled, time you said no to a bad request",
      "Write five thoughtful questions for them — about the team, their process, what good looks like 90 days in",
      "Outline a 30/60/90 plan in your head (what you'd own first, what you'd ship, what you'd ask)",
      "Sleep 8 hours the night before. No exceptions.",
    ],
  },
  {
    slug: "02-take-the-interview",
    num: "02.",
    title: "Take the interview",
    description: "Run the call like someone who already has the job.",
    intro:
      "Once the call starts, your job is to be curious, calm, and specific. Lead with questions, reference real work, and follow up the same day.",
    items: [
      "Test your camera, mic, light, and internet 30 minutes before the call",
      "Have a glass of water and a notebook visible (signals prepared, not nervous)",
      "Lead with curiosity, not credentials — ask before you tell",
      "Reference the portfolio piece you built; offer to share screen if they're curious",
      "Ask one question they probably haven't been asked today (something specific about their process)",
      "Send a thank-you email within 4 hours referencing one specific thing from the conversation",
    ],
  },
  {
    slug: "03-secure-the-job",
    num: "03.",
    title: "Secure the job",
    description: "Negotiate like you've done this before, because you have.",
    intro:
      "An offer is the start of the negotiation, not the end. Pause, do your homework, and ask for something besides salary.",
    items: [
      'Don\'t accept the first number — pause, say "let me think about that overnight"',
      "Research their range publicly (Glassdoor, LinkedIn, Levels.fyi for marketing roles in your city)",
      "Ask for the top of the range when you counter — they'll meet in the middle",
      "Negotiate one thing besides salary: start date, equipment budget, a learning stipend, or extra PTO",
      "Get the offer in writing before resigning anywhere",
      "Set start date 2 weeks out minimum — give yourself recovery time",
    ],
  },
  {
    slug: "04-best-remote-setup",
    num: "04.",
    title: "Best remote setup",
    description: "Build the room and the calendar that make the work easy.",
    intro:
      "Remote work rewards people who design their environment on purpose. Set up the desk, the camera, the calendar, and the shutdown ritual once — then live there.",
    items: [
      'Desk that fits a 27" monitor, your laptop on a stand, and a notebook with room to write',
      "Window light to your left or right (never behind you on camera, never directly behind your screen)",
      "A real microphone — Shure MV7 or a clip-on lav. Built-in laptop mics make you sound junior",
      "Camera at eye level — books or a stand under the laptop, not below the chin",
      'Calendar discipline: no meetings before 10am, focus blocks marked "DESIGN — DO NOT BOOK"',
      "One Slack/Teams notification rule: only @mentions break focus. Channels stay silent until you check them",
      "End-of-day shutdown ritual: close all tabs, write tomorrow's three priorities, walk away",
    ],
  },
];

export default function PracticePage() {
  return (
    <InnerPageShell
      eyebrow="iv. · job-prep plan"
      title="Practice — get this job"
      intro="Mily, this is a four-phase plan to land the Logan Marketing role and run it well from day one. Work it in order — prepare, take the interview, secure the offer, then build the remote setup that makes the rest of the work easy. Check things off as you go; the boxes save on this device."
      breadcrumbs={[{ label: "the toolkit", href: "/" }, { label: "practice" }]}
    >
      <nav
        aria-label="Phases"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 32,
          fontFamily: "var(--mono)",
          fontSize: 11,
        }}
      >
        {PHASES.map((phase) => (
          <a
            key={phase.slug}
            href={`#${phase.slug}`}
            style={{
              padding: "6px 12px",
              borderRadius: 99,
              border: "1px dashed var(--line)",
              color: "var(--lavigo-400)",
              textDecoration: "none",
            }}
          >
            {phase.num} {phase.title.toLowerCase()}
          </a>
        ))}
      </nav>

      <div className="cards" style={{ marginBottom: 36 }}>
        {PHASES.map((phase) => (
          <a
            key={`card-${phase.slug}`}
            href={`#${phase.slug}`}
            className="card tape"
          >
            <span className="card-num">{phase.num}</span>
            <h3>{phase.title.toLowerCase()}</h3>
            <p>{phase.description}</p>
            <div className="card-meta">
              <span>{phase.items.length} tasks</span>
              <span aria-hidden="true">·</span>
              <span>jump to phase →</span>
            </div>
          </a>
        ))}
      </div>

      {PHASES.map((phase) => (
        <section
          key={phase.slug}
          id={phase.slug}
          style={{
            background: "var(--paper-2)",
            border: "1px solid var(--line)",
            borderRadius: 14,
            padding: "26px 28px",
            marginBottom: 28,
            scrollMarginTop: 24,
          }}
        >
          <div
            className="section-head"
            style={{ marginBottom: 14, marginTop: 0 }}
          >
            <span className="section-num">{phase.num}</span>
            <h2 className="section-title">{phase.title.toLowerCase()}</h2>
            <span className="section-line" />
            <span className="section-tag">{phase.items.length} tasks</span>
          </div>
          <p
            style={{
              maxWidth: 640,
              fontFamily: "var(--sans)",
              fontSize: 15.5,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: "0 0 4px",
            }}
          >
            {phase.intro}
          </p>
          <PracticeChecklist id={phase.slug} items={phase.items} />
        </section>
      ))}
    </InnerPageShell>
  );
}
