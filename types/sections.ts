/**
 * Tipos para a configuração de variantes das seções do site.
 * Ao adicionar nova seção: incluir chave em SectionsConfig e tipo de variante.
 */

export type SectionVariant = "v1" | "v2" | "v3";

export type HeaderVariant = SectionVariant;
export type HeroVariant = SectionVariant;
export type FooterVariant = SectionVariant;

export const SECTION_VARIANTS: readonly SectionVariant[] = ["v1", "v2", "v3"];

export interface SectionsConfig {
  header: HeaderVariant;
  hero: HeroVariant;
  footer: FooterVariant;
}

export const DEFAULT_SECTIONS_CONFIG: SectionsConfig = {
  header: "v1",
  hero: "v1",
  footer: "v1",
};
