import type {
  HeaderVariant,
  PageConfig,
  PageId,
  PageSectionSlot,
  SectionType,
  SectionVariant,
  SectionsConfig,
} from "@/types/sections";
import {
  DEFAULT_SECTIONS_CONFIG,
  PAGE_IDS,
  SECTION_VARIANTS,
  getDefaultPagesConfig,
} from "@/types/sections";
import fs from "node:fs";
import path from "node:path";

const VALID_SECTION_TYPES: SectionType[] = ["hero", "cta", "none"];

const HEADER_FOOTER_VARIANTS: readonly HeaderVariant[] = ["v1", "v2", "v3"];

function isValidHeaderOrFooterVariant(value: unknown): value is HeaderVariant {
  return (
    typeof value === "string" &&
    HEADER_FOOTER_VARIANTS.includes(value as HeaderVariant)
  );
}

function isValidVariant(value: unknown): value is SectionVariant {
  return typeof value === "string" && SECTION_VARIANTS.includes(value as SectionVariant);
}

function isValidSectionType(value: unknown): value is SectionType {
  return typeof value === "string" && VALID_SECTION_TYPES.includes(value as SectionType);
}

function isValidPageId(value: unknown): value is PageId {
  return typeof value === "string" && PAGE_IDS.includes(value as PageId);
}

function parseSlot(raw: unknown): PageSectionSlot {
  if (!raw || typeof raw !== "object") return { type: "none" };
  const o = raw as Record<string, unknown>;
  const type = isValidSectionType(o.type) ? o.type : "none";
  const slot: PageSectionSlot = { type };
  if (type !== "none" && isValidVariant(o.variant)) {
    slot.variant = o.variant;
  }
  return slot;
}

function parsePageSections(raw: unknown): PageSectionSlot[] {
  if (!Array.isArray(raw)) return [...DEFAULT_SECTIONS_CONFIG.pages.home.pageSections];
  const slots = raw.map(parseSlot);
  while (slots.length < 5) slots.push({ type: "none" });
  return slots.slice(0, 5);
}

function parsePageConfig(raw: unknown): PageConfig {
  if (!raw || typeof raw !== "object") return { pageSections: [...DEFAULT_SECTIONS_CONFIG.pages.home.pageSections] };
  const o = raw as Record<string, unknown>;
  return { pageSections: parsePageSections(o.pageSections) };
}

function parsePages(raw: unknown): Record<PageId, PageConfig> {
  const defaultPages = getDefaultPagesConfig();
  if (!raw || typeof raw !== "object") return defaultPages;
  const o = raw as Record<string, unknown>;
  const result = { ...defaultPages };
  for (const id of PAGE_IDS) {
    if (o[id] != null) {
      result[id] = parsePageConfig(o[id]);
    }
  }
  return result;
}

function parseEnabledPages(raw: unknown): PageId[] {
  if (!Array.isArray(raw)) return [...PAGE_IDS];
  return raw.filter(isValidPageId);
}

/**
 * Retorna a configuração de seções.
 * Lê config/sections.json e mescla com defaults.
 */
export function getSectionsConfig(): SectionsConfig {
  const filePath = path.join(process.cwd(), "config", "sections.json");
  let raw: Record<string, unknown> = {};
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    raw = JSON.parse(content) as Record<string, unknown>;
  } catch {
    return DEFAULT_SECTIONS_CONFIG;
  }

  const header = isValidHeaderOrFooterVariant(raw?.header)
    ? raw.header
    : DEFAULT_SECTIONS_CONFIG.header;
  const footer = isValidHeaderOrFooterVariant(raw?.footer)
    ? raw.footer
    : DEFAULT_SECTIONS_CONFIG.footer;
  const enabledPages = parseEnabledPages(raw?.enabledPages);
  const pages = parsePages(raw?.pages);

  return {
    header,
    footer,
    enabledPages,
    pages,
  };
}
