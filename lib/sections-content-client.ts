import type {
  SectionsContentConfig,
  HeroContent,
  CtaContent,
  FeaturesContent,
  ServicesContent,
  ServicesCardItem,
  ServicesCardIconKey,
  PartnersContent,
  PartnersLogoItem,
  SlotContentEntry,
  SlotContentKey,
} from "@/types/sections-content";
import {
  DEFAULT_SECTIONS_CONTENT,
  DEFAULT_HERO_CONTENT,
  DEFAULT_CTA_CONTENT,
  DEFAULT_FEATURES_CONTENT,
  DEFAULT_SERVICES_CONTENT,
  DEFAULT_PARTNERS_CONTENT,
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
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : (def.overlayColor ?? ""),
    textColor: typeof o.textColor === "string" ? o.textColor : (def.textColor ?? ""),
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
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : def.overlayColor ?? "",
    textColor: typeof o.textColor === "string" ? o.textColor : def.textColor ?? "",
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
    textColor: typeof o.textColor === "string" ? o.textColor : def.textColor ?? "",
  };
}

const SERVICES_ICON_KEYS: ServicesCardIconKey[] = ["gear", "mail", "headphones", "bell", "chart", "palette"];

function parseCardItem(raw: unknown): ServicesCardItem {
  const def = DEFAULT_SERVICES_CONTENT.cards[0];
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const icon = typeof o.icon === "string" && SERVICES_ICON_KEYS.includes(o.icon as ServicesCardIconKey)
    ? (o.icon as ServicesCardIconKey)
    : def.icon;
  return {
    icon,
    title: typeof o.title === "string" ? o.title : def.title,
    message: typeof o.message === "string" ? o.message : def.message,
    highlighted: typeof o.highlighted === "boolean" ? o.highlighted : def.highlighted,
  };
}

function parseStoredServices(raw: unknown): ServicesContent {
  const def = DEFAULT_SECTIONS_CONTENT.services ?? DEFAULT_SERVICES_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const rawCards = o.cards;
  const cards = Array.isArray(rawCards)
    ? rawCards.map((c) => parseCardItem(c)).filter(Boolean)
    : def.cards;
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    title: typeof o.title === "string" ? o.title : def.title,
    description: typeof o.description === "string" ? o.description : def.description,
    cards: cards.length > 0 ? cards : def.cards,
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : def.overlayColor ?? "",
    textColor: typeof o.textColor === "string" ? o.textColor : def.textColor ?? "",
  };
}

function parseLogoItem(raw: unknown): PartnersLogoItem {
  const def = DEFAULT_PARTNERS_CONTENT.logos[0];
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  return {
    logoSrc: typeof o.logoSrc === "string" ? o.logoSrc : def.logoSrc,
    alt: typeof o.alt === "string" ? o.alt : def.alt,
  };
}

function parseStoredPartners(raw: unknown): PartnersContent {
  const def = DEFAULT_SECTIONS_CONTENT.partners ?? DEFAULT_PARTNERS_CONTENT;
  if (!raw || typeof raw !== "object") return def;
  const o = raw as Record<string, unknown>;
  const rawLogos = o.logos;
  const logos = Array.isArray(rawLogos)
    ? rawLogos.map((l) => parseLogoItem(l)).filter(Boolean)
    : def.logos;
  return {
    badge: typeof o.badge === "string" ? o.badge : def.badge,
    title: typeof o.title === "string" ? o.title : def.title,
    description: typeof o.description === "string" ? o.description : def.description,
    logos: logos.length > 0 ? logos : def.logos,
    backgroundImage: typeof o.backgroundImage === "string" ? o.backgroundImage : def.backgroundImage ?? "",
    backgroundColor: typeof o.backgroundColor === "string" ? o.backgroundColor : def.backgroundColor ?? "",
    overlayColor: typeof o.overlayColor === "string" ? o.overlayColor : def.overlayColor ?? "",
    textColor: typeof o.textColor === "string" ? o.textColor : def.textColor ?? "",
  };
}

function parseSlotEntry(raw: unknown): SlotContentEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const t = o.type;
  if (t === "hero") return { type: "hero", content: parseStoredHero(o.content) };
  if (t === "cta") return { type: "cta", content: parseStoredCta(o.content) };
  if (t === "features") return { type: "features", content: parseStoredFeatures(o.content) };
  if (t === "services") return { type: "services", content: parseStoredServices(o.content) };
  if (t === "partners") return { type: "partners", content: parseStoredPartners(o.content) };
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
      services: parseStoredServices(parsed.services),
      partners: parseStoredPartners(parsed.partners),
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
