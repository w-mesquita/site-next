/**
 * Tipos para a configuração de variantes das seções do site.
 * Inclui config global (header, footer), páginas ativas e 5 slots por página.
 */

export type SectionVariant = "v1" | "v2" | "v3";

export type HeaderVariant = SectionVariant;
export type HeroVariant = SectionVariant;
export type FooterVariant = SectionVariant;

export const SECTION_VARIANTS: readonly SectionVariant[] = ["v1", "v2", "v3"];

/** Tipos de seção que podem aparecer nos 5 slots do corpo da página. */
export type SectionType = "hero" | "cta" | "none";

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
  /** Por página, os 5 slots de seção. */
  pages: Record<PageId, PageConfig>;
}

export const DEFAULT_SECTIONS_CONFIG: SectionsConfig = {
  header: "v1",
  footer: "v1",
  enabledPages: ["home", "contact", "about"],
  pages: getDefaultPagesConfig(),
};
