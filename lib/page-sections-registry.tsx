"use client";

import { CtaSection } from "@/components/sections/cta";
import { HeroSection } from "@/components/sections/hero";
import type { SectionType, SectionVariant } from "@/types/sections";

/** Seções que aceitam variante (v1, v2, v3). */
const SECTIONS_WITH_VARIANT: SectionType[] = ["hero"];

export function sectionAcceptsVariant(type: SectionType): boolean {
  return SECTIONS_WITH_VARIANT.includes(type);
}

export const SECTION_COMPONENTS: Record<Exclude<SectionType, "none">, React.ComponentType<{ variant?: SectionVariant }>> = {
  hero: HeroSection as React.ComponentType<{ variant?: SectionVariant }>,
  cta: CtaSection as React.ComponentType<{ variant?: SectionVariant }>,
};
