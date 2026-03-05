/**
 * Utilitários para cor de sobreposição (overlay) com opacidade.
 * Armazena como rgba(r,g,b,a) ou #RRGGBB (opaco).
 */

/** Converte hex (#RRGGBB ou #RGB) para rgba(r, g, b, alpha). */
export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace(/^#/, "");
  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (normalized.length === 6) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(0,0,0,${alpha})`;
}

/** Converte hex para valor aceito por input[type="color"] (#RRGGBB). */
export function toHexColor(hex: string): string {
  const h = hex.replace(/^#/, "");
  if (h.length === 6 && /^[0-9A-Fa-f]{6}$/.test(h)) return `#${h}`;
  if (h.length === 3 && /^[0-9A-Fa-f]{3}$/.test(h)) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return "#000000";
}

/** Extrai hex e opacidade de uma string overlay (rgba ou hex). */
export function parseOverlay(overlay: string | undefined): { hex: string; opacity: number } {
  if (!overlay?.trim()) return { hex: "#000000", opacity: 0.5 };
  const rgbaMatch = overlay.trim().match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10);
    const g = parseInt(rgbaMatch[2], 10);
    const b = parseInt(rgbaMatch[3], 10);
    const a = rgbaMatch[4] != null ? parseFloat(rgbaMatch[4]) : 1;
    const hex = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
    return { hex, opacity: Math.max(0, Math.min(1, a)) };
  }
  if (/^#[0-9A-Fa-f]{3,6}$/.test(overlay.trim())) {
    return { hex: toHexColor(overlay.trim()), opacity: 1 };
  }
  return { hex: "#000000", opacity: 0.5 };
}

/** Monta valor de overlay a partir de hex e opacidade (0–1). Se opacidade >= 1, retorna hex. */
export function buildOverlay(hex: string, opacity: number): string {
  const h = toHexColor(hex);
  if (opacity >= 1) return h;
  return hexToRgba(h, Math.max(0, Math.min(1, opacity)));
}
