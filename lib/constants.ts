export const SITE_NAME = "Mily";
export const FROM_NAME = "Adam";
export const SITE_TAGLINE = "the Logan Marketing Suite";

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

export interface ToolkitCategory {
  readonly num: string;
  readonly title: string;
  readonly description: string;
  readonly meta: string;
  readonly route?: string;
  readonly comingSoon?: boolean;
  readonly tape?: boolean;
  readonly tapePeach?: boolean;
}

export const TOOLKIT_CATEGORIES: readonly ToolkitCategory[] = [
  {
    num: "i.",
    title: "Claude Code skills",
    description:
      "Nine custom skills that drop into Claude Code. Page builds, component picking, Figma → Elementor, QA passes.",
    meta: "9 skills",
    route: "/skills",
    tape: true,
  },
  {
    num: "ii.",
    title: "Get this job",
    description:
      "A four-phase plan: prep the interview, take the interview, secure the offer, build the remote setup. Open it for the full checklist.",
    meta: "4-phase roadmap",
    route: "/practice",
    tape: true,
    tapePeach: true,
  },
  {
    num: "iii.",
    title: "Tutorials",
    description:
      "Step-by-step walkthroughs for the things you'll do most often: hero builds, room cards, mobile fixes, page meta.",
    meta: "guided practice",
    route: "/tutorials",
  },
  {
    num: "iv.",
    title: "Playbook",
    description:
      "Logan's section library. The patterns Logan ships over and over — open one, see what makes it Logan.",
    meta: "section patterns",
    route: "/playbook",
    tape: true,
  },
  {
    num: "v.",
    title: "Templates",
    description:
      "Three example boutique-inn pages, fully built. Click into any preview to see the structural pattern.",
    meta: "Elementor mocks",
    route: "/templates",
  },
  {
    num: "vi.",
    title: "Logan voice dossier",
    description:
      "How Logan writes — tone, structure, do's and don'ts, before-and-afters from real pages.",
    meta: "voice + tone",
    route: "/dossier",
  },
  {
    num: "vii.",
    title: "MCP server",
    description:
      "Direct staging WordPress ops from Claude — drafts only, never production.",
    meta: "coming soon",
    comingSoon: true,
  },
];

export const SKILL_CARDS: readonly SkillCard[] = [
  {
    slug: "logan-elementor-page-build",
    route: SKILL_ROUTES["logan-elementor-page-build"],
    num: "i.",
    title: "Brief → page sections",
    description:
      "A brief in, a section-by-section build plan out. Hero, intro blocks, CTA, mobile pass, end-of-page QA — built around Logan's inside template.",
    meta: "page builder",
    tape: true,
  },
  {
    slug: "logan-component-picker",
    route: SKILL_ROUTES["logan-component-picker"],
    num: "ii.",
    title: "Component picker",
    description:
      "Paste a chunk of copy, get the exact Logan section to use. Walks you out of blank-page paralysis without overthinking it.",
    meta: "copy → component",
  },
  {
    slug: "logan-hospitality-copy-seo",
    route: SKILL_ROUTES["logan-hospitality-copy-seo"],
    num: "iii.",
    title: "Hospitality copy & SEO",
    description:
      "Innkeeper voice — the porch, the breakfast, the dog. Plus meta titles, descriptions, alt text, and FAQs in Logan's tone.",
    meta: "voice + meta",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "logan-figma-handoff",
    route: SKILL_ROUTES["logan-figma-handoff"],
    num: "iv.",
    title: "Figma → Elementor",
    description:
      "Turns the lead designer's Figma file into Elementor steps. What to ask before you start, what to figure out, what not to redesign.",
    meta: "Figma to Elementor",
  },
  {
    slug: "logan-elementor-troubleshoot",
    route: SKILL_ROUTES["logan-elementor-troubleshoot"],
    num: "v.",
    title: "Elementor troubleshooter",
    description:
      "Symptom → cause → fix walkthroughs for the breakage you'll actually hit — column overflows, mobile spacing, font swaps, plugin conflicts.",
    meta: "diagnose & fix",
  },
  {
    slug: "logan-elementor-qa",
    route: SKILL_ROUTES["logan-elementor-qa"],
    num: "vi.",
    title: "Pre-handoff QA pass",
    description:
      "Audits headings, alt text, link integrity, mobile layout, brand consistency, and page meta. Returns pass/fail with concrete notes.",
    meta: "QA checklist",
    tape: true,
  },
  {
    slug: "logan-elementor-template-json",
    route: SKILL_ROUTES["logan-elementor-template-json"],
    num: "vii.",
    title: "Elementor template JSON",
    description:
      "Generates a valid Elementor `.json` you can import. Modern flex containers, Logan-shaped defaults, staging-first workflow baked in.",
    meta: "importable JSON",
  },
  {
    slug: "logan-staging-automation",
    route: SKILL_ROUTES["logan-staging-automation"],
    num: "viii.",
    title: "Staging WordPress ops",
    description:
      "Safe REST/CLI ops on a staging WordPress site. Drafts only, never auto-publishes, refuses to touch production no matter how nicely you ask.",
    meta: "drafts on staging",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "logan-pm-handoff",
    route: SKILL_ROUTES["logan-pm-handoff"],
    num: "ix.",
    title: "PM handoff message",
    description:
      "Tight, structured handoff — what was built, what changed from spec, what's missing, what you're unsure of. No defensive padding.",
    meta: "handoff note",
  },
];
