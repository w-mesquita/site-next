import type { SectionsContentConfig, HeroContent, CtaContent } from "@/types/sections-content";
import { DEFAULT_SECTIONS_CONTENT } from "@/types/sections-content";

const STORAGE_KEY = "sections-content";

function parseStoredHero(raw: unknown): HeroContent {
  const def = DEFAULT_SECTIONS_CONTENT.hero;
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
  };
}

function parseStoredCta(raw: unknown): CtaContent {
  const def = DEFAULT_SECTIONS_CONTENT.cta;
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

/**
 * Lê o conteúdo das seções do localStorage (apenas no client).
 */
export function getSectionsContentFromStorage(): SectionsContentConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      hero: parseStoredHero(parsed.hero),
      cta: parseStoredCta(parsed.cta),
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
