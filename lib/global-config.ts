import type { GlobalConfig } from "@/types/global-config";
import { DEFAULT_GLOBAL_CONFIG } from "@/types/global-config";
import fs from "node:fs";
import path from "node:path";

function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Retorna a configuração global (server-side).
 * Lê config/global.json e mescla com defaults.
 */
export function getGlobalConfig(): GlobalConfig {
  const filePath = path.join(process.cwd(), "config", "global.json");
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const raw = JSON.parse(content) as Record<string, unknown>;
    const primaryColor =
      typeof raw.primaryColor === "string" && isValidHex(raw.primaryColor)
        ? raw.primaryColor
        : DEFAULT_GLOBAL_CONFIG.primaryColor;
    const logoUrl =
      typeof raw.logoUrl === "string" ? raw.logoUrl : DEFAULT_GLOBAL_CONFIG.logoUrl;
    return { primaryColor, logoUrl };
  } catch {
    return DEFAULT_GLOBAL_CONFIG;
  }
}
