import type {
  SectionsContentConfig,
  HeroContent,
  CtaContent,
  FeaturesContent,
  SlotContentEntry,
  SlotContentKey,
} from "@/types/sections-content";
import {
  DEFAULT_SECTIONS_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_CTA_CONTENT,
  DEFAULT_FEATURES_CONTENT,
} from "@/types/sections-content";

const STORAGE_KEY = "sections-content";

function parseStoredHero(raw: unknown): HeroContent {
  const def = DEFAULT_SECTIONS_CONTENT.hero ?? DEFAULT_HERO_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const parseAction = (a: unknown): HeroContent["primaryAction"] => {
    if (!a || typeof a !== "object") return def.primaryAction;
    const x = a as Record<string, unknown>;
    return {
      label: typeof x.label === "string" ? x.label : def.primaryAction.label,
      href: typeof x.href === "string" ? x.href : def.primaryAction.href,
    };
  };
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    titleLine1: typeof o.titleLine1 === "string" ? o.titleLine1 : def.titleLine1,
    titleLine2: typeof o.titleLine2 === "string" ? o.titleLine2 : def.titleLine2,
    description: typeof o.description === "string" ? o.description : def.description,
    primaryAction: parseAction(o.primaryAction),
    secondaryAction: parseAction(o.secondaryAction),
    imageSrc: typeof o.imageSrc === "string" ? o.imageSrc : def.imageSrc,
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : (def.backgroundImage ?? ""),
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : (def.backgroundColor ?? ""),
  };
}

function parseStoredCta(raw: unknown): CtaContent {
  const def = DEFAULT_SECTIONS_CONTENT.cta ?? DEFAULT_CTA_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const parseAction = (a: unknown): CtaContent["action"] => {
    if (!a || typeof a !== "object") return def.action;
    const x = a as Record<string, unknown>;
    return {
      label: typeof x.label === "string" ? x.label : def.action.label,
      href: typeof x.href === "string" ? x.href : def.action.href,
    };
  };
  return {
    title: typeof o.title === "string" ? o.title : def.title,
    text: typeof o.text === "string" ? o.text : def.text,
    action: parseAction(o.action),
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
  };
}

function parseStoredFeatures(raw: unknown): FeaturesContent {
  const def = DEFAULT_SECTIONS_CONTENT.features ?? DEFAULT_FEATURES_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const parseAction = (a: unknown): FeaturesContent["primaryAction"] => {
    if (!a || typeof a !== "object") return def.primaryAction;
    const x = a as Record<string, unknown>;
    return {
      label: typeof x.label === "string" ? x.label : def.primaryAction.label,
      href: typeof x.href === "string" ? x.href : def.primaryAction.href,
    };
  };
  const rawList = o.listItems;
  const listItems = Array.isArray(rawList)
    ? rawList.filter((item): item is string => typeof item === "string")
    : def.listItems;
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    title: typeof o.title === "string" ? o.title : def.title,
    description: typeof o.description === "string" ? o.description : def.description,
    listItems: listItems.length > 0 ? listItems : def.listItems,
    primaryAction: parseAction(o.primaryAction),
    imageSrc: typeof o.imageSrc === "string" ? o.imageSrc : def.imageSrc,
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : def.overlayColor ?? "",
  };
}

function parseSlotEntry(raw: unknown): SlotContentEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const t = o.type;
  if (t === "hero") return { type: "hero", content: parseStoredHero(o.content) };
  if (t === "cta") return { type: "cta", content: parseStoredCta(o.content) };
  if (t === "features") return { type: "features", content: parseStoredFeatures(o.content) };
  return null;
}

function parseContentBySlot(raw: unknown): Record<SlotContentKey, SlotContentEntry> {
  if (!raw || typeof raw !== "object") return {};
  const o = raw as Record<string, unknown>;
  const out: Record<string, SlotContentEntry> = {};
  for (const key of Object.keys(o)) {
    const entry = parseSlotEntry(o[key]);
    if (entry) out[key] = entry;
  }
  return out;
}

/**
 * Lê o conteúdo das seções do localStorage (apenas no client).
 * Suporta contentBySlot (por slot) e legado hero/cta/features.
 */
export function getSectionsContentFromStorage(): SectionsContentConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const contentBySlot = parseContentBySlot(parsed.contentBySlot);
    return {
      contentBySlot: Object.keys(contentBySlot).length > 0 ? contentBySlot : undefined,
      hero: parseStoredHero(parsed.hero),
      cta: parseStoredCta(parsed.cta),
      features: parseStoredFeatures(parsed.features),
    };
  } catch {
    return null;
  }
}

/**
 * Salva o conteúdo das seções no localStorage (apenas no client).
 */
export function setSectionsContentInStorage(content: SectionsContentConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export { STORAGE_KEY };
