export const SITE_NAME = "Mily";
export const FROM_NAME = "Adam";
export const SITE_DOMAIN = "mily.computer";
export const SITE_TAGLINE = "the Logan Marketing suite";

export type SkillSlug =
  | "logan-elementor-page-build"
  | "logan-component-picker"
  | "logan-hospitality-copy-seo"
  | "logan-figma-handoff"
  | "logan-elementor-troubleshoot"
  | "logan-elementor-qa"
  | "logan-elementor-template-json"
  | "logan-staging-automation"
  | "logan-pm-handoff";

export interface SkillCard {
  readonly slug: SkillSlug;
  readonly route: string;
  readonly num: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly meta: string;
  readonly tape?: boolean;
  readonly tapePeach?: boolean;
}

export const SKILL_ROUTES: Readonly<Record<SkillSlug, string>> = {
  "logan-elementor-page-build": "/skills/logan-elementor-page-build",
  "logan-component-picker": "/skills/logan-component-picker",
  "logan-hospitality-copy-seo": "/skills/logan-hospitality-copy-seo",
  "logan-figma-handoff": "/skills/logan-figma-handoff",
  "logan-elementor-troubleshoot": "/skills/logan-elementor-troubleshoot",
  "logan-elementor-qa": "/skills/logan-elementor-qa",
  "logan-elementor-template-json": "/skills/logan-elementor-template-json",
  "logan-staging-automation": "/skills/logan-staging-automation",
  "logan-pm-handoff": "/skills/logan-pm-handoff",
};

export const SKILL_SLUGS: readonly SkillSlug[] = [
  "logan-elementor-page-build",
  "logan-component-picker",
  "logan-hospitality-copy-seo",
  "logan-figma-handoff",
  "logan-elementor-troubleshoot",
  "logan-elementor-qa",
  "logan-elementor-template-json",
  "logan-staging-automation",
  "logan-pm-handoff",
];

export const SKILL_CARDS: readonly SkillCard[] = [
  {
    slug: "logan-elementor-page-build",
    route: SKILL_ROUTES["logan-elementor-page-build"],
    num: "i.",
    icon: "🪴",
    title: "Build a page",
    description:
      "Section-by-section build plan from a brief. Hero, intro, content blocks, CTA, QA at the end. Tailored to Logan's inside template.",
    meta: "page-build skill",
    tape: true,
  },
  {
    slug: "logan-component-picker",
    route: SKILL_ROUTES["logan-component-picker"],
    num: "ii.",
    icon: "✎",
    title: "Pick the right section",
    description:
      "A short Q&A that names the exact Logan component for the chunk of copy in front of you. Walks you out of blank-page paralysis.",
    meta: "component picker",
  },
  {
    slug: "logan-hospitality-copy-seo",
    route: SKILL_ROUTES["logan-hospitality-copy-seo"],
    num: "iii.",
    icon: "❀",
    title: "Write copy + SEO meta",
    description:
      "Hospitality voice for Logan clients — innkeepers, breakfast, the dog. Plus meta titles, descriptions, alt text, FAQ ideas.",
    meta: "voice + meta",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "logan-figma-handoff",
    route: SKILL_ROUTES["logan-figma-handoff"],
    num: "iv.",
    icon: "✿",
    title: "Read a Figma file",
    description:
      "Turns a lead designer's Figma file into Elementor steps. What to ask, what to figure out, what not to redesign.",
    meta: "Figma → Elementor",
  },
  {
    slug: "logan-elementor-troubleshoot",
    route: SKILL_ROUTES["logan-elementor-troubleshoot"],
    num: "v.",
    icon: "✦",
    title: "Fix something broken",
    description:
      "Calm symptom → diagnosis → fix walkthroughs for the Elementor problems you'll actually hit. Ordered by frequency.",
    meta: "troubleshoot",
  },
  {
    slug: "logan-elementor-qa",
    route: SKILL_ROUTES["logan-elementor-qa"],
    num: "vi.",
    icon: "♡",
    title: "Check my work",
    description:
      "Pre-handoff audit. Headings, alt text, links, mobile layout, brand consistency, page meta. Pass / fail with notes.",
    meta: "QA pass",
    tape: true,
  },
  {
    slug: "logan-elementor-template-json",
    route: SKILL_ROUTES["logan-elementor-template-json"],
    num: "vii.",
    icon: "✱",
    title: "Make an Elementor template",
    description:
      "Generates a valid Elementor `.json` template you can import. Modern flexbox containers. Always import to staging first.",
    meta: "template JSON",
  },
  {
    slug: "logan-staging-automation",
    route: SKILL_ROUTES["logan-staging-automation"],
    num: "viii.",
    icon: "❖",
    title: "Work on staging",
    description:
      "Safe REST/CLI ops on a staging WordPress site. Drafts only, never auto-publishes, refuses to touch production.",
    meta: "staging only",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "logan-pm-handoff",
    route: SKILL_ROUTES["logan-pm-handoff"],
    num: "ix.",
    icon: "✉",
    title: "Write a handoff",
    description:
      "Short, structured PM handoff message. What was built, deviations, missing inputs, open questions. No defensive language.",
    meta: "handoff message",
  },
];
