export const SITE_NAME = "Mily";
export const FROM_NAME = "Adam";
export const SITE_DOMAIN = "mily.computer";
export const SITE_TAGLINE = "the Logan Marketing suite";

export type SkillSlug =
  | "layout-fundamentals"
  | "tone-and-voice"
  | "wordpress-and-elementor"
  | "accessibility-basics"
  | "responsive-design"
  | "design-systems-on-a-budget"
  | "content-and-seo"
  | "performance-and-images"
  | "handoff-and-feedback";

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
  "layout-fundamentals": "/skills/layout-fundamentals",
  "tone-and-voice": "/skills/tone-and-voice",
  "wordpress-and-elementor": "/skills/wordpress-and-elementor",
  "accessibility-basics": "/skills/accessibility-basics",
  "responsive-design": "/skills/responsive-design",
  "design-systems-on-a-budget": "/skills/design-systems-on-a-budget",
  "content-and-seo": "/skills/content-and-seo",
  "performance-and-images": "/skills/performance-and-images",
  "handoff-and-feedback": "/skills/handoff-and-feedback",
};

export const SKILL_CARDS: readonly SkillCard[] = [
  {
    slug: "layout-fundamentals",
    route: SKILL_ROUTES["layout-fundamentals"],
    num: "i.",
    icon: "🪴",
    title: "Layout fundamentals",
    description:
      "Grids, rhythm, whitespace. The bones every Logan Marketing page sits on before color or copy ever shows up.",
    meta: "8 lessons",
    tape: true,
  },
  {
    slug: "tone-and-voice",
    route: SKILL_ROUTES["tone-and-voice"],
    num: "ii.",
    icon: "✎",
    title: "Tone & voice",
    description:
      "Warm, specific, observational. How Logan writes about innkeepers, breakfast, and the dog — and how to match it.",
    meta: "voice guide",
  },
  {
    slug: "wordpress-and-elementor",
    route: SKILL_ROUTES["wordpress-and-elementor"],
    num: "iii.",
    icon: "❀",
    title: "WordPress & Elementor",
    description:
      "The stack Logan ships on. Page builds, templates, the parts you'll touch day one without breaking the theme.",
    meta: "5 walkthroughs",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "accessibility-basics",
    route: SKILL_ROUTES["accessibility-basics"],
    num: "iv.",
    icon: "✿",
    title: "Accessibility basics",
    description:
      "Contrast, focus states, alt text. Small habits that keep boutique sites usable for actual humans.",
    meta: "checklist",
  },
  {
    slug: "responsive-design",
    route: SKILL_ROUTES["responsive-design"],
    num: "v.",
    icon: "✦",
    title: "Responsive design",
    description:
      "Phone-first thinking for hospitality clients. Where layouts collapse cleanly and where they need care.",
    meta: "patterns",
  },
  {
    slug: "design-systems-on-a-budget",
    route: SKILL_ROUTES["design-systems-on-a-budget"],
    num: "vi.",
    icon: "♡",
    title: "Design systems on a budget",
    description:
      "Tiny token sets, two type scales, a real palette. Just enough system to make a small studio fast.",
    meta: "starter kit",
    tape: true,
  },
  {
    slug: "content-and-seo",
    route: SKILL_ROUTES["content-and-seo"],
    num: "vii.",
    icon: "✱",
    title: "Content & SEO",
    description:
      "Structured copy that ranks without sounding like it's trying. Heads, meta, and what to ask the innkeeper.",
    meta: "field notes",
  },
  {
    slug: "performance-and-images",
    route: SKILL_ROUTES["performance-and-images"],
    num: "viii.",
    icon: "❖",
    title: "Performance & images",
    description:
      "Real photos, sized right. Lazy-loading, srcset, and the small habits that keep boutique sites fast.",
    meta: "image cookbook",
    tape: true,
    tapePeach: true,
  },
  {
    slug: "handoff-and-feedback",
    route: SKILL_ROUTES["handoff-and-feedback"],
    num: "ix.",
    icon: "✉",
    title: "Handoff & feedback",
    description:
      "Sending work, taking notes, surviving critique. How to ship to a senior designer and grow from the response.",
    meta: "templates",
  },
];
