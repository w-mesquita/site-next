import type { HeroContent, CtaContent, FeaturesContent, SectionsContentConfig } from "@/types/sections-content";
import {
  DEFAULT_SECTIONS_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_CTA_CONTENT,
  DEFAULT_FEATURES_CONTENT,
} from "@/types/sections-content";
import fs from "node:fs";
import path from "node:path";

function parseHeroAction(raw: unknown): HeroContent["primaryAction"] {
  if (!raw || typeof raw !== "object") return DEFAULT_HERO_CONTENT.primaryAction;
  const o = raw as Record<string, unknown>;
  return {
    label: typeof o.label === "string" ? o.label : DEFAULT_HERO_CONTENT.primaryAction.label,
    href: typeof o.href === "string" ? o.href : DEFAULT_HERO_CONTENT.primaryAction.href,
  };
}

function parseHeroContent(raw: unknown): HeroContent {
  const def = DEFAULT_HERO_CONTENT;
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

function parseCtaAction(raw: unknown): CtaContent["action"] {
  if (!raw || typeof raw !== "object") return DEFAULT_CTA_CONTENT.action;
  const o = raw as Record<string, unknown>;
  return {
    label: typeof o.label === "string" ? o.label : DEFAULT_CTA_CONTENT.action.label,
    href: typeof o.href === "string" ? o.href : DEFAULT_CTA_CONTENT.action.href,
  };
}

function parseCtaContent(raw: unknown): CtaContent {
  const def = DEFAULT_CTA_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  return {
    title: typeof o.title === "string" ? o.title : def.title,
    text: typeof o.text === "string" ? o.text : def.text,
    action: parseCtaAction(o.action),
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
  };
}

function parseFeaturesAction(raw: unknown): FeaturesContent["primaryAction"] {
  if (!raw || typeof raw !== "object") return DEFAULT_FEATURES_CONTENT.primaryAction;
  const o = raw as Record<string, unknown>;
  return {
    label: typeof o.label === "string" ? o.label : DEFAULT_FEATURES_CONTENT.primaryAction.label,
    href: typeof o.href === "string" ? o.href : DEFAULT_FEATURES_CONTENT.primaryAction.href,
  };
}

function parseFeaturesContent(raw: unknown): FeaturesContent {
  const def = DEFAULT_FEATURES_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const rawList = o.listItems;
  const listItems = Array.isArray(rawList)
    ? rawList.filter((item): item is string => typeof item === "string")
    : def.listItems;
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    title: typeof o.title === "string" ? o.title : def.title,
    description: typeof o.description === "string" ? o.description : def.description,
    listItems: listItems.length > 0 ? listItems : def.listItems,
    primaryAction: parseFeaturesAction(o.primaryAction),
    imageSrc: typeof o.imageSrc === "string" ? o.imageSrc : def.imageSrc,
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : def.overlayColor ?? "",
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
    contentBySlot: {},
    hero: parseHeroContent(raw.hero),
    cta: parseCtaContent(raw.cta),
    features: parseFeaturesContent(raw.features),
  };
}
