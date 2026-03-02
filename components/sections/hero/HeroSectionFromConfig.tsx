"use client";

import { HeroSection } from "@/components/sections/hero";
import { useSectionsConfig } from "@/lib/sections-config-context";

/** Renderiza Hero com variante v1. Preferir PageSectionsRenderer para páginas configuráveis. */
export function HeroSectionFromConfig() {
  const { config } = useSectionsConfig();
  const variant = config.pages?.home?.pageSections?.[0]?.type === "hero"
    ? (config.pages.home.pageSections[0].variant ?? "v1")
    : "v1";
  return <HeroSection variant={variant} />;
}
