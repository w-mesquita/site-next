import type { SocialConfig } from "@/types/social";
import { DEFAULT_SOCIAL_CONFIG } from "@/types/social";
import { SOCIAL_NETWORKS } from "@/types/social";

const STORAGE_KEY = "social-config";

function parseStored(raw: string | null): SocialConfig | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<SocialConfig>;
    const result: SocialConfig = { ...DEFAULT_SOCIAL_CONFIG };
    for (const key of SOCIAL_NETWORKS) {
      const item = parsed?.[key];
      if (item && typeof item.enabled === "boolean" && typeof item.url === "string") {
        result[key] = { enabled: item.enabled, url: item.url };
      }
    }
    result.useCustomColor = typeof parsed?.useCustomColor === "boolean" ? parsed.useCustomColor : false;
    result.customColor = typeof parsed?.customColor === "string" ? parsed.customColor : "";
    return result;
  } catch {
    return null;
  }
}

/**
 * Lê a configuração de redes sociais do localStorage (apenas no client).
 */
export function getSocialConfigFromStorage(): SocialConfig | null {
  if (typeof window === "undefined") return null;
  return parseStored(localStorage.getItem(STORAGE_KEY));
}

/**
 * Salva a configuração de redes sociais no localStorage (apenas no client).
 */
export function setSocialConfigInStorage(config: SocialConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export { STORAGE_KEY };
