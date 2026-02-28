export interface NavLink {
  href: string;
  label: string;
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "#contato", label: "Contato" },
];

export const DEFAULT_CTA = { href: "#contato", label: "Fale conosco" };
