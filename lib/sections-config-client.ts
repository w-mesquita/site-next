import type {
  HeaderVariant,
  PageConfig,
  PageId,
  SectionsConfig,
} from "@/types/sections";
import { PAGE_IDS, getDefaultPagesConfig } from "@/types/sections";
import type { HeaderContent, HeaderNavItem } from "@/types/header-config";
import { DEFAULT_HEADER_CONTENT } from "@/types/header-config";

const STORAGE_KEY = "sections-config";

const HEADER_FOOTER_VARIANTS: readonly HeaderVariant[] = ["v1", "v2", "v3"];

const NAV_ICON_KEYS = ["home", "globe", "file", "cart", "rss", "envelope", "none"] as const;

function parseHeaderNavItem(raw: unknown): HeaderNavItem {
  const def = DEFAULT_HEADER_CONTENT.menuItems[0];
  if (!raw || typeof raw !== "object") return { ...def };
  const o = raw as Record<string, unknown>;
  const icon = typeof o.icon === "string" && NAV_ICON_KEYS.includes(o.icon as typeof NAV_ICON_KEYS[number])
    ? (o.icon as HeaderNavItem["icon"])
    : def.icon;
  const sectionIndex = typeof o.sectionIndex === "number" && o.sectionIndex >= -2 && o.sectionIndex <= 6
    ? o.sectionIndex
    : undefined;
  return {
    label: typeof o.label === "string" ? o.label : def.label,
    icon,
    href: typeof o.href === "string" ? o.href : def.href,
    ...(sectionIndex !== undefined && { sectionIndex }),
  };
}

function parseHeaderContent(raw: unknown): HeaderContent {
  if (!raw || typeof raw !== "object") return DEFAULT_HEADER_CONTENT;
  const o = raw as Record<string, unknown>;
  const topBarRaw = o.topBar;
  const tb = topBarRaw && typeof topBarRaw === "object" ? (topBarRaw as Record<string, unknown>) : null;
  const topBar: HeaderContent["topBar"] = tb
    ? {
        visible: typeof tb.visible === "boolean" ? (tb.visible as boolean) : DEFAULT_HEADER_CONTENT.topBar.visible,
        phone: typeof tb.phone === "string" ? (tb.phone as string) : DEFAULT_HEADER_CONTENT.topBar.phone,
        email: typeof tb.email === "string" ? (tb.email as string) : DEFAULT_HEADER_CONTENT.topBar.email,
        backgroundColor: tb.backgroundColor === null || (typeof tb.backgroundColor === "string" && tb.backgroundColor.trim() === "")
          ? null
          : typeof tb.backgroundColor === "string" ? (tb.backgroundColor as string) : null,
        textColor: tb.textColor === null || (typeof tb.textColor === "string" && tb.textColor.trim() === "")
          ? null
          : typeof tb.textColor === "string" ? (tb.textColor as string) : null,
        showSocial: typeof tb.showSocial === "boolean" ? (tb.showSocial as boolean) : DEFAULT_HEADER_CONTENT.topBar.showSocial,
      }
    : DEFAULT_HEADER_CONTENT.topBar;
  const menuItemsRaw = o.menuItems;
  const menuItems = Array.isArray(menuItemsRaw)
    ? menuItemsRaw.map(parseHeaderNavItem).filter(Boolean)
    : DEFAULT_HEADER_CONTENT.menuItems;
  const ctaRaw = o.cta;
  const cta = ctaRaw && typeof ctaRaw === "object" && ctaRaw !== null
    ? {
        label: typeof (ctaRaw as Record<string, unknown>).label === "string" ? (ctaRaw as Record<string, unknown>).label as string : DEFAULT_HEADER_CONTENT.cta!.label,
        href: typeof (ctaRaw as Record<string, unknown>).href === "string" ? (ctaRaw as Record<string, unknown>).href as string : DEFAULT_HEADER_CONTENT.cta!.href,
      }
    : (o.cta === null ? null : DEFAULT_HEADER_CONTENT.cta);
  return {
    topBar,
    menuItems: menuItems.length > 0 ? menuItems : DEFAULT_HEADER_CONTENT.menuItems,
    menuUppercase: typeof o.menuUppercase === "boolean" ? o.menuUppercase : DEFAULT_HEADER_CONTENT.menuUppercase,
    isLanding: typeof o.isLanding === "boolean" ? o.isLanding : DEFAULT_HEADER_CONTENT.isLanding,
    cta,
  };
}

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

    const headerContent = parsed.headerContent !== undefined
      ? parseHeaderContent(parsed.headerContent)
      : undefined;

    return {
      header,
      footer,
      ...(headerContent && { headerContent }),
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
