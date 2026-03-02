"use client";

import { HeroSection } from "@/components/sections";
import { useSectionsConfig } from "@/lib/sections-config-context";

export function HeroSectionFromConfig() {
  const { config } = useSectionsConfig();
  return <HeroSection variant={config.hero} />;
}
