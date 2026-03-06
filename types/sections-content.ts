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
  /** Cor de sobreposição (com opacidade). Se imagem de fundo: overlay por cima; senão: usa como cor de fundo. Ex.: #000000 ou rgba(0,0,0,0.5) */
  overlayColor?: string;
  /** Cor do texto (títulos e corpo). Quando informada, substitui o tema; corpo usa a mesma cor com esmaecimento para contraste. Ex.: #ffffff */
  textColor?: string;
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
  overlayColor: "",
  textColor: "",
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
  /** Cor de sobreposição (com opacidade). Se imagem de fundo: overlay por cima; senão: usa como cor de fundo. */
  overlayColor?: string;
  /** Cor do texto (título e corpo). Quando informada, substitui o tema; corpo usa a mesma cor com esmaecimento. */
  textColor?: string;
}

export const DEFAULT_CTA_CONTENT: CtaContent = {
  title: "Impulsione seu tráfego conosco",
  text: "Entre em contato ou saiba mais sobre nossos serviços. Estamos prontos para ajudar você a crescer.",
  action: { label: "Saiba mais", href: "#contato" },
  backgroundImage: "",
  backgroundColor: "",
  overlayColor: "",
  textColor: "",
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
  /** Cor do texto (títulos e corpo). Quando informada, substitui o tema; corpo usa a mesma cor com esmaecimento. */
  textColor?: string;
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
  textColor: "",
};

/** Chave do ícone do card (seleção no painel de conteúdo). */
export type ServicesCardIconKey =
  | "gear"
  | "mail"
  | "headphones"
  | "bell"
  | "chart"
  | "palette";

export interface ServicesCardItem {
  icon: ServicesCardIconKey;
  title: string;
  message: string;
  /** Quando true, card em destaque: cor de fundo e detalhe visual (ex.: ondas). */
  highlighted: boolean;
}

/** Conteúdo da seção Services (cards com ícone, título, mensagem e opção de destaque). */
export interface ServicesContent {
  /** Tagline (ex.: "Our Services") */
  badge: string;
  /** Título principal da seção */
  title: string;
  /** Descrição/parágrafo abaixo do título */
  description: string;
  /** Lista de cards (ícone, título, mensagem, destacado) */
  cards: ServicesCardItem[];
  /** Imagem de fundo da seção (opcional). */
  backgroundImage?: string;
  /** Cor de fundo da seção (opcional). */
  backgroundColor?: string;
  /** Cor da sobreposição (overlay). */
  overlayColor?: string;
  /** Cor do texto (títulos e corpo). */
  textColor?: string;
}

export const DEFAULT_SERVICES_CONTENT: ServicesContent = {
  badge: "Destaque opcional",
  title: "Save Time Managing Your Business with Our Best Services",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  cards: [
    { icon: "gear", title: "Product Management", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: false },
    { icon: "mail", title: "Web & Mobile Development", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: false },
    { icon: "headphones", title: "Customer Support", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: false },
    { icon: "bell", title: "Human Resources", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: false },
    { icon: "chart", title: "Business Development", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: false },
    { icon: "palette", title: "Design & Creatives", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.", highlighted: true },
  ],
  backgroundImage: "",
  backgroundColor: "",
  overlayColor: "",
  textColor: "",
};

export interface PartnersLogoItem {
  logoSrc: string;
  alt?: string;
}

/** Conteúdo da seção Partners (logos de parceiros). */
export interface PartnersContent {
  /** Tagline (ex.: "Partnership") */
  badge: string;
  /** Título principal */
  title: string;
  /** Descrição/parágrafo */
  description: string;
  /** Lista de logos (URL ou caminho + alt opcional) */
  logos: PartnersLogoItem[];
  backgroundImage?: string;
  backgroundColor?: string;
  overlayColor?: string;
  textColor?: string;
}

export const DEFAULT_PARTNERS_CONTENT: PartnersContent = {
  badge: "Partnership",
  title: "Partner Companies",
  description:
    "Too cultivated use solicitude frequently. Dashwood likewise up consider continue entrance ladyship oh. Wrong guest given purse power is no.",
  logos: [
    { logoSrc: "", alt: "Parceiro 1" },
    { logoSrc: "", alt: "Parceiro 2" },
    { logoSrc: "", alt: "Parceiro 3" },
    { logoSrc: "", alt: "Parceiro 4" },
    { logoSrc: "", alt: "Parceiro 5" },
  ],
  backgroundImage: "",
  backgroundColor: "",
  overlayColor: "",
  textColor: "",
};

/** Chave do slot: pageId + índice (ex.: "home-0", "home-1"). Cada slot tem conteúdo independente. */
export type SlotContentKey = string;

/** Entrada de conteúdo por slot; o tipo indica qual conteúdo está armazenado. */
export type SlotContentEntry =
  | { type: "hero"; content: HeroContent }
  | { type: "cta"; content: CtaContent }
  | { type: "features"; content: FeaturesContent }
  | { type: "services"; content: ServicesContent }
  | { type: "partners"; content: PartnersContent };

/** Conteúdo editável por slot. Legado hero/cta/features mantido para migração. */
export interface SectionsContentConfig {
  /** Conteúdo por slot (pageId-sectionIndex). Prioridade sobre hero/cta/features. */
  contentBySlot?: Record<SlotContentKey, SlotContentEntry>;
  /** @deprecated Use contentBySlot; usado como fallback quando o slot ainda não foi editado. */
  hero?: HeroContent;
  /** @deprecated Use contentBySlot; usado como fallback quando o slot ainda não foi editado. */
  cta?: CtaContent;
  /** @deprecated Use contentBySlot; usado como fallback quando o slot ainda não foi editado. */
  features?: FeaturesContent;
  /** @deprecated Use contentBySlot; usado como fallback quando o slot ainda não foi editado. */
  services?: ServicesContent;
  /** @deprecated Use contentBySlot; usado como fallback quando o slot ainda não foi editado. */
  partners?: PartnersContent;
}

export const DEFAULT_SECTIONS_CONTENT: SectionsContentConfig = {
  contentBySlot: {},
  hero: DEFAULT_HERO_CONTENT,
  cta: DEFAULT_CTA_CONTENT,
  features: DEFAULT_FEATURES_CONTENT,
  services: DEFAULT_SERVICES_CONTENT,
  partners: DEFAULT_PARTNERS_CONTENT,
};

/** Gera a chave do slot para um par (pageId, sectionIndex). */
export function getSlotContentKey(pageId: string, sectionIndex: number): SlotContentKey {
  return `${pageId}-${sectionIndex}`;
}

/** Tipos de seção que possuem página de configuração de conteúdo */
export const SECTION_TYPES_WITH_CONTENT = ["hero", "cta", "features", "services", "partners"] as const;
export type SectionTypeWithContent = (typeof SECTION_TYPES_WITH_CONTENT)[number];

/** Retorna o conteúdo padrão para um tipo de seção. */
export function getDefaultContentForSectionType(
  type: SectionTypeWithContent
): HeroContent | CtaContent | FeaturesContent | ServicesContent | PartnersContent {
  switch (type) {
    case "hero":
      return DEFAULT_HERO_CONTENT;
    case "cta":
      return DEFAULT_CTA_CONTENT;
    case "features":
      return DEFAULT_FEATURES_CONTENT;
    case "services":
      return DEFAULT_SERVICES_CONTENT;
    case "partners":
      return DEFAULT_PARTNERS_CONTENT;
  }
}

export function isSectionTypeWithContent(
  type: string
): type is SectionTypeWithContent {
  return SECTION_TYPES_WITH_CONTENT.includes(type as SectionTypeWithContent);
}
