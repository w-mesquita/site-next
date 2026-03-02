import type { SectionsConfig } from "@/types/sections";
import {
  DEFAULT_SECTIONS_CONFIG,
  SECTION_VARIANTS,
} from "@/types/sections";

const STORAGE_KEY = "sections-config";

function isValidVariant(value: unknown): value is SectionsConfig["header"] {
  return typeof value === "string" && SECTION_VARIANTS.includes(value as SectionsConfig["header"]);
}

/**
 * Lê a configuração de seções do localStorage (apenas no client).
 * Retorna null se não houver valor válido.
 */
export function getSectionsConfigFromStorage(): SectionsConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SectionsConfig>;
    const header = isValidVariant(parsed?.header) ? parsed.header : null;
    const hero = isValidVariant(parsed?.hero) ? parsed.hero : null;
    const footer = isValidVariant(parsed?.footer) ? parsed.footer : null;
    if (header && hero && footer) {
      return { header, hero, footer };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Salva a configuração de seções no localStorage (apenas no client).
 */
export function setSectionsConfigInStorage(config: SectionsConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export { STORAGE_KEY };
