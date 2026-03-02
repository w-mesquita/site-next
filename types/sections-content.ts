/**
 * Tipos para o conteúdo editável das seções.
 * Cada tipo de seção (hero, cta, etc.) pode definir seus próprios campos.
 * As variantes consomem apenas o que precisam para o layout.
 */

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroContent {
  /** Texto do badge/destaque (ex.: "Destaque opcional") */
  badge: string;
  /** Primeira linha do título */
  titleLine1: string;
  /** Segunda linha do título */
  titleLine2: string;
  /** Parágrafo/descrição */
  description: string;
  /** Ação principal (ex.: Saiba mais) */
  primaryAction: HeroAction;
  /** Ação secundária (ex.: Contato) */
  secondaryAction: HeroAction;
  /** Caminho da imagem (ex.: /hero-image.jpg) */
  imageSrc: string;
}

export const DEFAULT_HERO_CONTENT: HeroContent = {
  badge: "Destaque opcional",
  titleLine1: "Bem-vindo ao seu site",
  titleLine2: "Soluções que fazem sentido",
  description:
    "Estrutura base com Next.js, TypeScript, Tailwind e design tokens. Personalize o texto e a imagem ao lado.",
  primaryAction: { label: "Saiba mais", href: "#acao" },
  secondaryAction: { label: "Contato", href: "#contato" },
  imageSrc: "/hero-image.jpg",
};

export interface SectionsContentConfig {
  hero: HeroContent;
}

export const DEFAULT_SECTIONS_CONTENT: SectionsContentConfig = {
  hero: DEFAULT_HERO_CONTENT,
};

/** Tipos de seção que possuem página de configuração de conteúdo */
export const SECTION_TYPES_WITH_CONTENT = ["hero"] as const;
export type SectionTypeWithContent = (typeof SECTION_TYPES_WITH_CONTENT)[number];

export function isSectionTypeWithContent(
  type: string
): type is SectionTypeWithContent {
  return SECTION_TYPES_WITH_CONTENT.includes(type as SectionTypeWithContent);
}
