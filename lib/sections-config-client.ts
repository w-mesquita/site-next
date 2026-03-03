import type {
  HeaderVariant,
  PageConfig,
  PageId,
  SectionsConfig,
} from "@/types/sections";
import { PAGE_IDS, getDefaultPagesConfig } from "@/types/sections";

const STORAGE_KEY = "sections-config";

const HEADER_FOOTER_VARIANTS: readonly HeaderVariant[] = ["v1", "v2", "v3"];

function isValidHeaderOrFooterVariant(value: unknown): value is HeaderVariant {
  return (
    typeof value === "string" &&
    HEADER_FOOTER_VARIANTS.includes(value as HeaderVariant)
  );
}

function isValidPageId(value: unknown): value is PageId {
  return typeof value === "string" && PAGE_IDS.includes(value as PageId);
}

function isPageConfig(raw: unknown): raw is PageConfig {
  if (!raw || typeof raw !== "object") return false;
  return Array.isArray((raw as Record<string, unknown>).pageSections);
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
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const header = isValidHeaderOrFooterVariant(parsed?.header)
      ? parsed.header
      : null;
    const footer = isValidHeaderOrFooterVariant(parsed?.footer)
      ? parsed.footer
      : null;
    if (header == null || footer == null) return null;

    const defaultPages = getDefaultPagesConfig();
    let pages: Record<PageId, PageConfig> = defaultPages;
    if (parsed.pages && typeof parsed.pages === "object") {
      const p = parsed.pages as Record<string, unknown>;
      for (const id of PAGE_IDS) {
        if (isPageConfig(p[id])) {
          pages = { ...pages, [id]: p[id] as PageConfig };
        }
      }
    }

    let enabledPages: PageId[] = [...PAGE_IDS];
    if (Array.isArray(parsed.enabledPages)) {
      enabledPages = parsed.enabledPages.filter(isValidPageId);
      if (enabledPages.length === 0) enabledPages = [...PAGE_IDS];
    }

    return {
      header,
      footer,
      enabledPages,
      pages,
    };
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
