"use client";

import { CtaSection } from "@/components/sections/cta";
import { FeaturesSection } from "@/components/sections/features";
import { HeroSection } from "@/components/sections/hero";
import type { SectionType, SectionVariant } from "@/types/sections";

/** Seções que aceitam variante (v1, v2, v3). */
const SECTIONS_WITH_VARIANT: SectionType[] = ["hero", "cta", "features"];

export function sectionAcceptsVariant(type: SectionType): boolean {
  return SECTIONS_WITH_VARIANT.includes(type);
}

export const SECTION_COMPONENTS: Record<
  Exclude<SectionType, "none">,
  React.ComponentType<{ variant?: SectionVariant; slotKey?: string }>
> = {
  hero: HeroSection,
  cta: CtaSection,
  features: FeaturesSection,
};
