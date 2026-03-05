import type { GlobalConfig } from "@/types/global-config";
import { DEFAULT_GLOBAL_CONFIG } from "@/types/global-config";

const STORAGE_KEY = "global-config";

function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

export function getGlobalConfigFromStorage(): GlobalConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const primaryColor =
      typeof parsed.primaryColor === "string" && isValidHex(parsed.primaryColor)
        ? parsed.primaryColor
        : DEFAULT_GLOBAL_CONFIG.primaryColor;
    const logoUrl =
      typeof parsed.logoUrl === "string" ? parsed.logoUrl : DEFAULT_GLOBAL_CONFIG.logoUrl;
    return { primaryColor, logoUrl };
  } catch {
    return null;
  }
}

export function setGlobalConfigInStorage(config: GlobalConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export { STORAGE_KEY };
