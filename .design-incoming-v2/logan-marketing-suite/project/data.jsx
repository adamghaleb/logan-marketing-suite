// Content for Logan Marketing Suite hub
// All copy is fictional and tailored — replace if her real interview brief comes in.

const PLAYBOOK = [
  {
    id: "research",
    title: "Decode the Logan Marketing brief",
    desc: "Read every page on their site. Note three campaigns you'd cite in conversation. Pull the founders' LinkedIn for vocabulary you'll mirror.",
    time: "45 min",
    done: true,
  },
  {
    id: "voice",
    title: "Internalize their brand voice",
    desc: "Run their last 6 social posts through the brand-voice MCP. Save the tone profile. Practice rewriting one in their style.",
    time: "30 min",
    done: true,
  },
  {
    id: "case",
    title: "Build a 'first 90 days' plan",
    desc: "One slide. Three priorities, each with a metric. Lead with audience, not channel.",
    time: "60 min",
    done: false,
  },
  {
    id: "story",
    title: "Sharpen your three stories",
    desc: "One campaign you led, one launch you saved, one hire/team moment. Each ≤ 90 seconds, with a number in it.",
    time: "30 min",
    done: false,
  },
  {
    id: "questions",
    title: "Prepare 5 questions for them",
    desc: "Two strategic, two team/culture, one weird-but-good. Avoid anything answerable from the careers page.",
    time: "20 min",
    done: false,
  },
  {
    id: "logistics",
    title: "Logistics, the night before",
    desc: "Outfit, charger, water, route. Lay out the laptop. Bookmark this hub on your phone — refresh once on the train.",
    time: "10 min",
    done: false,
  },
];

const TILES = [
  {
    id: "playbook",
    icon: "P",
    tag: "01 / Playbook",
    title: "Interview Playbook",
    desc: "A six-step prep sequence with timing, talking points, and the three stories you'll lean on.",
    cta: "Open playbook",
  },
  {
    id: "dossier",
    icon: "D",
    tag: "02 / Research",
    title: "Logan Marketing Dossier",
    desc: "Everything we found on the agency, their clients, and the people you'll meet in the room.",
    cta: "Read dossier",
  },
  {
    id: "mcp",
    icon: "M",
    tag: "03 / Tooling",
    title: "MCP Server",
    desc: "Custom Model Context Protocol server with brand-voice, competitor scan, and content calendar tools.",
    cta: "View server",
  },
  {
    id: "skills",
    icon: "S",
    tag: "04 / Tooling",
    title: "Custom Cloud Skills",
    desc: "Five Claude skills tuned for marketing work — from campaign briefs to deck cleanup to launch checklists.",
    cta: "Browse skills",
  },
  {
    id: "install",
    icon: "I",
    tag: "05 / Setup",
    title: "Install Guide",
    desc: "Copy-paste setup for the MCP server and skills. Works on her laptop in under five minutes.",
    cta: "Run setup",
  },
  {
    id: "notes",
    icon: "♡",
    tag: "06 / From me",
    title: "Notes from your biggest fan",
    desc: "A few things I want you to remember when you walk in. Read this last.",
    cta: "Open note",
  },
];

const DOSSIER = [
  { label: "Agency", val: "Logan Marketing", serif: true },
  {
    label: "Specialty",
    val: "Brand-led growth for category-defining consumer companies.",
  },
  {
    label: "Notable clients",
    val: "Mid-market DTC, hospitality, and lifestyle brands. Roughly 25–30 active accounts.",
  },
  { label: "Team size", val: "≈ 40 across strategy, creative, and growth." },
  {
    label: "Voice",
    val: "Confident, observational, lightly editorial. Long-form captions. Earnest, not ironic.",
  },
  {
    label: "What they value",
    val: "Strategists who lead with audience insight, not channel mechanics. Crisp writing. Strong opinions, lightly held.",
  },
];

const MCP_TOOLS = [
  {
    name: "brand_voice_check",
    id: "logan-mcp/voice",
    desc: "Score any draft against Logan's tone profile. Returns a 0–100 alignment score and three specific edits.",
    tools: [
      "score(draft)",
      "rewrite(draft, target='logan')",
      "extract_profile(urls[])",
    ],
    status: "ready",
  },
  {
    name: "competitor_radar",
    id: "logan-mcp/radar",
    desc: "Pulls the last 30 days of campaigns and earned media for any competitor set. Clusters by theme.",
    tools: ["scan(brands[])", "themes(window='30d')", "diff(brand_a, brand_b)"],
    status: "ready",
  },
  {
    name: "calendar_planner",
    id: "logan-mcp/calendar",
    desc: "Generates a 6-week content calendar from a positioning brief. Integrates moments, holidays, launches.",
    tools: ["plan(brief, weeks=6)", "rebalance()", "export(format='ics')"],
    status: "ready",
  },
  {
    name: "brief_to_deck",
    id: "logan-mcp/deck",
    desc: "Turns a creative brief into a 10-slide pitch outline with three concept directions, ready for Figma.",
    tools: ["outline(brief)", "concept(direction)", "headline_pass(deck)"],
    status: "draft",
  },
];

const SKILLS = [
  {
    name: "Campaign Brief Drafter",
    desc: "Takes a one-paragraph idea, returns a tight, agency-ready creative brief.",
    lines: 142,
  },
  {
    name: "Deck Polish Pass",
    desc: "Reviews a slide deck for headline strength, slide rhythm, and weakest cuts.",
    lines: 211,
  },
  {
    name: "Audience Snapshot",
    desc: "Builds a one-page audience profile from a positioning statement.",
    lines: 98,
  },
  {
    name: "Launch Day Checklist",
    desc: "Generates a customized launch checklist with owner roles and time blocks.",
    lines: 76,
  },
  {
    name: "Post-Mortem Composer",
    desc: "Walks through a campaign retro and outputs a clean two-page memo.",
    lines: 124,
  },
];

const QUOTES = [
  "You are exactly the kind of person they should be lucky to hire.",
  "If you walk in like you already work there, the rest is just paperwork.",
  "Calm hands, warm voice, real opinions. That's the whole job.",
];

Object.assign(window, { PLAYBOOK, TILES, DOSSIER, MCP_TOOLS, SKILLS, QUOTES });
