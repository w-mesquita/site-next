import fs from "node:fs";
import path from "node:path";
import type { SectionsConfig } from "@/types/sections";
import {
  DEFAULT_SECTIONS_CONFIG,
  SECTION_VARIANTS,
} from "@/types/sections";

function isValidVariant(value: unknown): value is SectionsConfig["header"] {
  return typeof value === "string" && SECTION_VARIANTS.includes(value as SectionsConfig["header"]);
}

/**
 * Retorna a configuração de variantes das seções.
 * Lê config/sections.json do disco a cada chamada, para alterações refletirem ao recarregar a página.
 */
export function getSectionsConfig(): SectionsConfig {
  const filePath = path.join(process.cwd(), "config", "sections.json");
  let raw: Partial<SectionsConfig> = {};
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    raw = JSON.parse(content) as Partial<SectionsConfig>;
  } catch {
    return DEFAULT_SECTIONS_CONFIG;
  }
  return {
    header: isValidVariant(raw?.header) ? raw.header : DEFAULT_SECTIONS_CONFIG.header,
    hero: isValidVariant(raw?.hero) ? raw.hero : DEFAULT_SECTIONS_CONFIG.hero,
    footer: isValidVariant(raw?.footer) ? raw.footer : DEFAULT_SECTIONS_CONFIG.footer,
  };
}
