/**
 * Configuração editável do header (top bar, menu, modo landing).
 */

export type HeaderNavIconKey =
  | "home"
  | "globe"
  | "file"
  | "cart"
  | "rss"
  | "envelope"
  | "none";

/** Item do menu: label + ícone; em modo site normal usa href; em modo landing pode usar sectionIndex (scroll na home). */
export interface HeaderNavItem {
  label: string;
  icon: HeaderNavIconKey;
  /** Link ao clicar (usado quando não é landing ou quando sectionIndex não está definido). */
  href: string;
  /**
   * Em modo landing: índice da seção da home (0–6) para onde rolar ao clicar,
   * ou -2 para "topo da página" (scroll para o início do site, incluindo top bar).
   */
  sectionIndex?: number;
}

/** Valor usado em sectionIndex para "rolar ao topo da página" (início do site). */
export const HEADER_SECTION_INDEX_TOP = -2;

export interface HeaderTopBarConfig {
  visible: boolean;
  phone: string;
  email: string;
  /** Cor de fundo (vazio = usa padrão do tema, ex.: cor primária). */
  backgroundColor: string | null;
  /** Cor do texto e ícones (vazio = padrão, ex.: branco). */
  textColor: string | null;
  /** Exibir ícones das redes sociais na top bar. Se false, redes só no header. */
  showSocial: boolean;
}

export interface HeaderCtaConfig {
  label: string;
  href: string;
}

export interface HeaderContent {
  /** Exibir faixa superior com telefone, e-mail e opcionalmente redes sociais. */
  topBar: HeaderTopBarConfig;
  /** Itens do menu (label, ícone, href e opcionalmente sectionIndex para landing). */
  menuItems: HeaderNavItem[];
  /** Texto do menu em maiúsculas. */
  menuUppercase: boolean;
  /** Site em modo landing: itens podem rolar para seções da home. */
  isLanding: boolean;
  /** Botão CTA no header (ex.: "Fale conosco", "Get a Quote"). Opcional. */
  cta: HeaderCtaConfig | null;
}

const DEFAULT_MENU_ITEMS: HeaderNavItem[] = [
  { label: "Início", icon: "home", href: "/" },
  { label: "Contato", icon: "envelope", href: "/contact" },
];

export const DEFAULT_HEADER_CONTENT: HeaderContent = {
  topBar: {
    visible: false,
    phone: "",
    email: "",
    backgroundColor: null,
    textColor: null,
    showSocial: false,
  },
  menuItems: DEFAULT_MENU_ITEMS,
  menuUppercase: false,
  isLanding: false,
  cta: { label: "Fale conosco", href: "/contact" },
};

export const HEADER_NAV_ICON_LABELS: Record<HeaderNavIconKey, string> = {
  home: "Início (casa)",
  globe: "Globo",
  file: "Páginas (documento)",
  cart: "Loja (carrinho)",
  rss: "Blog (RSS)",
  envelope: "Contato (envelope)",
  none: "Sem ícone",
};
