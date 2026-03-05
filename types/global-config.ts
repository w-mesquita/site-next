/**
 * Configurações globais da aplicação (cor primária, logo, etc.).
 * Alterações são persistidas no localStorage e aplicadas em tempo real.
 */

export interface GlobalConfig {
  /** Cor primária (hex, ex.: #2563eb). Hover/active/light são derivados em CSS. */
  primaryColor: string;
  /** URL ou caminho do logo (ex.: /logo.svg). Vazio = exibe texto "Logo". */
  logoUrl: string;
}

/** Valor padrão da cor primária (igual ao token inicial do tema). */
export const DEFAULT_PRIMARY_COLOR = "#2563eb";

export const DEFAULT_GLOBAL_CONFIG: GlobalConfig = {
  primaryColor: DEFAULT_PRIMARY_COLOR,
  logoUrl: "",
};
