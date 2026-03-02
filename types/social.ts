/**
 * Configuração dos links de redes sociais (exibidos no header e footer).
 * Parametrizável na tela de configurações.
 */

export interface SocialNetworkItem {
  enabled: boolean;
  url: string;
}

export interface SocialConfig {
  instagram: SocialNetworkItem;
  facebook: SocialNetworkItem;
  linkedin: SocialNetworkItem;
  /** Se true, todos os ícones usam customColor (hex); se false, cada um usa a cor padrão da marca */
  useCustomColor: boolean;
  /** Cor dos ícones em hexadecimal (ex: #FF0000). Aplica a todos quando useCustomColor é true */
  customColor: string;
}

export const DEFAULT_SOCIAL_CONFIG: SocialConfig = {
  instagram: { enabled: false, url: "" },
  facebook: { enabled: false, url: "" },
  linkedin: { enabled: false, url: "" },
  useCustomColor: false,
  customColor: "",
};

export const SOCIAL_NETWORKS = ["instagram", "facebook", "linkedin"] as const;
export type SocialNetworkKey = (typeof SOCIAL_NETWORKS)[number];
