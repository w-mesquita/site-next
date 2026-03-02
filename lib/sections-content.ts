import fs from "node:fs";
import path from "node:path";
import type { SectionsContentConfig, HeroContent } from "@/types/sections-content";
import { DEFAULT_SECTIONS_CONTENT } from "@/types/sections-content";

function parseHeroAction(raw: unknown): HeroContent["primaryAction"] {
  if (!raw || typeof raw !== "object") return DEFAULT_SECTIONS_CONTENT.hero.primaryAction;
  const o = raw as Record<string, unknown>;
  return {
    label: typeof o.label === "string" ? o.label : DEFAULT_SECTIONS_CONTENT.hero.primaryAction.label,
    href: typeof o.href === "string" ? o.href : DEFAULT_SECTIONS_CONTENT.hero.primaryAction.href,
  };
}

function parseHeroContent(raw: unknown): HeroContent {
  const def = DEFAULT_SECTIONS_CONTENT.hero;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    titleLine1: typeof o.titleLine1 === "string" ? o.titleLine1 : def.titleLine1,
    titleLine2: typeof o.titleLine2 === "string" ? o.titleLine2 : def.titleLine2,
    description: typeof o.description === "string" ? o.description : def.description,
    primaryAction: parseHeroAction(o.primaryAction),
    secondaryAction: parseHeroAction(o.secondaryAction),
    imageSrc: typeof o.imageSrc === "string" ? o.imageSrc : def.imageSrc,
  };
}

/**
 * Retorna o conteúdo das seções (server-side).
 * Lê config/sections-content.json e mescla com defaults.
 */
export function getSectionsContent(): SectionsContentConfig {
  const filePath = path.join(process.cwd(), "config", "sections-content.json");
  let raw: Record<string, unknown> = {};
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    raw = JSON.parse(content) as Record<string, unknown>;
  } catch {
    return DEFAULT_SECTIONS_CONTENT;
  }
  return {
    hero: parseHeroContent(raw.hero),
  };
}
