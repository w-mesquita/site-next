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
  /** Caminho da imagem de destaque (Hero 1) */
  imageSrc: string;
  /** Imagens do slide (Hero V3); 3 itens */
  slides?: { imageSrc: string }[];
  /** Imagem de fundo (Hero 1 e 2); caminho ou URL */
  backgroundImage?: string;
  /** Cor de fundo (Hero 1 e 2); ex.: hex, rgb, ou var(--color-surface) */
  backgroundColor?: string;
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
  slides: [
    { imageSrc: "/slide1.jpg" },
    { imageSrc: "/slide2.jpg" },
    { imageSrc: "/slide3.jpg" },
  ],
  backgroundImage: "",
  backgroundColor: "",
};

/** Conteúdo parametrizável da seção CTA (título, texto, ação com link). */
export interface CtaAction {
  label: string;
  href: string;
}

export interface CtaContent {
  /** Título da CTA (ex.: "Boost Your Traffic With Us") */
  title: string;
  /** Texto/descrição da CTA */
  text: string;
  /** Ação principal (botão/link) */
  action: CtaAction;
  /** Imagem de fundo (V1/V2: seção; V3: dentro do card). Caminho ou URL. */
  backgroundImage?: string;
  /** Cor de fundo (V1/V2: seção; V3: dentro do card). Ex.: hex, rgb ou var(--color-surface). */
  backgroundColor?: string;
}

export const DEFAULT_CTA_CONTENT: CtaContent = {
  title: "Impulsione seu tráfego conosco",
  text: "Entre em contato ou saiba mais sobre nossos serviços. Estamos prontos para ajudar você a crescer.",
  action: { label: "Saiba mais", href: "#contato" },
  backgroundImage: "",
  backgroundColor: "",
};

/** Conteúdo da seção Features (tagline, título, descrição, lista editável, CTA, imagem). */
export interface FeaturesAction {
  label: string;
  href: string;
}

export interface FeaturesContent {
  /** Tagline/categoria (ex.: "Marketing Company") */
  badge: string;
  /** Título principal */
  title: string;
  /** Parágrafo descritivo */
  description: string;
  /** Itens da lista (com ícone de check) — editável pelo usuário */
  listItems: string[];
  /** Ação principal (botão) */
  primaryAction: FeaturesAction;
  /** Imagem/ilustração da seção (caminho ou URL) */
  imageSrc: string;
  /** Imagem de fundo da seção (opcional). */
  backgroundImage?: string;
  /** Cor de fundo da seção (opcional). */
  backgroundColor?: string;
  /** Cor da sobreposição (overlay) — aplicada sobre fundo ou imagem; use rgba/hex com opacidade. */
  overlayColor?: string;
}

export const DEFAULT_FEATURES_CONTENT: FeaturesContent = {
  badge: "Marketing Company",
  title: "Grow Your Online Business With Us & Make Success",
  description:
    "Too cultivated use solicitude frequently. Dashwood likewise up consider continue entrance ladyship oh. Wrong guest given purse power is no.",
  listItems: [
    "Expenses as material breeding insisted building to in.",
    "Continual so distrusts pronounce by unwilling listening.",
    "Thing do taste on we manor. Him had wound use found hoped.",
    "Of distrusts immediate enjoyment curiosity do.",
    "Marianne numerous saw thoughts the humoured.",
  ],
  primaryAction: { label: "Explore More", href: "#" },
  imageSrc: "",
  backgroundImage: "",
  backgroundColor: "",
  overlayColor: "",
};

export interface SectionsContentConfig {
  hero: HeroContent;
  cta: CtaContent;
  features: FeaturesContent;
}

export const DEFAULT_SECTIONS_CONTENT: SectionsContentConfig = {
  hero: DEFAULT_HERO_CONTENT,
  cta: DEFAULT_CTA_CONTENT,
  features: DEFAULT_FEATURES_CONTENT,
};

/** Tipos de seção que possuem página de configuração de conteúdo */
export const SECTION_TYPES_WITH_CONTENT = ["hero", "cta", "features"] as const;
export type SectionTypeWithContent = (typeof SECTION_TYPES_WITH_CONTENT)[number];

export function isSectionTypeWithContent(
  type: string
): type is SectionTypeWithContent {
  return SECTION_TYPES_WITH_CONTENT.includes(type as SectionTypeWithContent);
}
