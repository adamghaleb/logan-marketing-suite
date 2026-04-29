import type { ComponentType } from "react";
import {
  SKILL_CARDS,
  SKILL_SLUGS,
  type SkillCard,
  type SkillSlug,
} from "@/lib/constants";

import LoganElementorPageBuild from "@/content/skills/logan-elementor-page-build.mdx";
import LoganComponentPicker from "@/content/skills/logan-component-picker.mdx";
import LoganHospitalityCopySeo from "@/content/skills/logan-hospitality-copy-seo.mdx";
import LoganFigmaHandoff from "@/content/skills/logan-figma-handoff.mdx";
import LoganElementorTroubleshoot from "@/content/skills/logan-elementor-troubleshoot.mdx";
import LoganElementorQa from "@/content/skills/logan-elementor-qa.mdx";
import LoganElementorTemplateJson from "@/content/skills/logan-elementor-template-json.mdx";
import LoganStagingAutomation from "@/content/skills/logan-staging-automation.mdx";
import LoganPmHandoff from "@/content/skills/logan-pm-handoff.mdx";

const SKILL_MDX_BY_SLUG: Readonly<Record<SkillSlug, ComponentType>> = {
  "logan-elementor-page-build": LoganElementorPageBuild,
  "logan-component-picker": LoganComponentPicker,
  "logan-hospitality-copy-seo": LoganHospitalityCopySeo,
  "logan-figma-handoff": LoganFigmaHandoff,
  "logan-elementor-troubleshoot": LoganElementorTroubleshoot,
  "logan-elementor-qa": LoganElementorQa,
  "logan-elementor-template-json": LoganElementorTemplateJson,
  "logan-staging-automation": LoganStagingAutomation,
  "logan-pm-handoff": LoganPmHandoff,
};

export function isSkillSlug(value: string): value is SkillSlug {
  return (SKILL_SLUGS as readonly string[]).includes(value);
}

export function getSkillCard(slug: SkillSlug): SkillCard {
  const card = SKILL_CARDS.find((entry) => entry.slug === slug);
  if (!card) {
    throw new Error(`No SKILL_CARDS entry for slug "${slug}"`);
  }
  return card;
}

export function getSkillMdx(slug: SkillSlug): ComponentType {
  return SKILL_MDX_BY_SLUG[slug];
}

export function getNextSkillCard(slug: SkillSlug): SkillCard | null {
  const index = SKILL_CARDS.findIndex((entry) => entry.slug === slug);
  if (index === -1 || index === SKILL_CARDS.length - 1) {
    return null;
  }
  return SKILL_CARDS[index + 1];
}
