import type { WhatsAppConfig } from "@/types/whatsapp";
import { DEFAULT_WHATSAPP_CONFIG } from "@/types/whatsapp";

const STORAGE_KEY = "whatsapp-config";

function parseStored(raw: string | null): WhatsAppConfig | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<WhatsAppConfig>;
    if (typeof parsed?.enabled !== "boolean") return null;
    const phone = typeof parsed?.phone === "string" ? parsed.phone : "";
    return { enabled: parsed.enabled, phone };
  } catch {
    return null;
  }
}

/**
 * Lê a configuração do WhatsApp do localStorage (apenas no client).
 */
export function getWhatsAppConfigFromStorage(): WhatsAppConfig | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return parseStored(raw);
}

/**
 * Salva a configuração do WhatsApp no localStorage (apenas no client).
 */
export function setWhatsAppConfigInStorage(config: WhatsAppConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Retorna apenas os dígitos do número (para montar o link wa.me).
 */
export function normalizePhoneForWa(phone: string): string {
  return phone.replace(/\D/g, "");
}

export { STORAGE_KEY, DEFAULT_WHATSAPP_CONFIG };
