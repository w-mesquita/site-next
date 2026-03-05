/**
 * Tipos para a configuração de variantes das seções do site.
 * Inclui config global (header, footer), páginas ativas e 7 slots por página.
 */

export type SectionVariant = "v1" | "v2" | "v3" | "slide";

export type HeaderVariant = "v1" | "v2" | "v3";
export type HeroVariant = "v1" | "v2" | "slide";
export type FooterVariant = "v1" | "v2" | "v3";

export const SECTION_VARIANTS: readonly SectionVariant[] = ["v1", "v2", "v3", "slide"];

/** Variantes disponíveis por tipo de seção (hero usa "slide" em vez de "v3"). */
export const HERO_VARIANTS: readonly HeroVariant[] = ["v1", "v2", "slide"];

/** Labels para exibição das variantes na UI. */
export const SECTION_VARIANT_LABELS: Record<SectionVariant, string> = {
  v1: "V1",
  v2: "V2",
  v3: "V3",
  slide: "Slide",
};

/** Tipos de seção que podem aparecer nos 7 slots do corpo da página. */
export type SectionType = "hero" | "cta" | "features" | "services" | "none";

/** Variantes disponíveis por tipo de seção (hero usa "Slide" em vez de "V3"). */
export function getVariantsForSectionType(type: SectionType): readonly SectionVariant[] {
  if (type === "hero") return HERO_VARIANTS;
  if (type === "cta") return ["v1", "v2", "v3"];
  if (type === "features") return ["v1", "v2"];
  if (type === "services") return ["v1", "v2"];
  return [];
}

export interface PageSectionSlot {
  type: SectionType;
  variant?: SectionVariant;
}

/** Identificador da página (rotas: home = /, contact = /contact, about = /about). */
export type PageId = "home" | "contact" | "about";

export const PAGE_IDS: readonly PageId[] = ["home", "contact", "about"];

export interface PageConfig {
  pageSections: PageSectionSlot[];
}

const DEFAULT_SLOTS: PageSectionSlot[] = [
  { type: "hero", variant: "v1" },
  { type: "none" },
  { type: "none" },
  { type: "none" },
  { type: "none" },
  { type: "none" },
  { type: "none" },
];

function defaultPageConfig(): PageConfig {
  return { pageSections: [...DEFAULT_SLOTS] };
}

export function getDefaultPagesConfig(): Record<PageId, PageConfig> {
  return {
    home: defaultPageConfig(),
    contact: defaultPageConfig(),
    about: defaultPageConfig(),
  };
}

export interface SectionsConfig {
  header: HeaderVariant;
  footer: FooterVariant;
  /** Páginas que o usuário escolheu exibir (checkboxes na config). */
  enabledPages: PageId[];
  /** Por página, os 7 slots de seção. */
  pages: Record<PageId, PageConfig>;
}

export const DEFAULT_SECTIONS_CONFIG: SectionsConfig = {
  header: "v1",
  footer: "v1",
  enabledPages: ["home", "contact", "about"],
  pages: getDefaultPagesConfig(),
};
