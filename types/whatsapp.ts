/**
 * Configuração do widget flutuante do WhatsApp (plugin).
 * Parametrizável na tela de configurações.
 */

export interface WhatsAppConfig {
  /** Exibir o ícone flutuante */
  enabled: boolean;
  /** Número para o link wa.me (apenas dígitos, com DDI ex: 5511999999999) */
  phone: string;
}

export const DEFAULT_WHATSAPP_CONFIG: WhatsAppConfig = {
  enabled: false,
  phone: "",
};
