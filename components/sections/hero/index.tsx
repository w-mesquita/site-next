"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { HeroContent } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import type { HeroVariant, SectionVariant } from "@/types/sections";
import { HeroV1 } from "./HeroV1";
import { HeroV2 } from "./HeroV2";
import { HeroV3 } from "./HeroV3";
import { SlideHero } from "./SlideHero";

const registry: Record<"v1" | "v2" | "slide", ComponentType<{ content?: HeroContent }>> = {
  v1: HeroV1,
  v2: HeroV2,
  slide: HeroV3,
};

export interface HeroSectionProps {
  /** Variante do hero; "v3" é tratado como "slide" (compatibilidade). */
  variant?: HeroVariant | SectionVariant;
  /** Chave do slot (pageId-index); quando definida, usa conteúdo próprio do slot. */
  slotKey?: string;
}

export function HeroSection({ variant = "v1", slotKey }: HeroSectionProps) {
  const { content, getContentForSlot } = useSectionsContent();
  const key: "v1" | "v2" | "slide" = variant === "v3" ? "slide" : (variant as HeroVariant);
  const Component = registry[key] ?? registry.v1;
  const heroContent: HeroContent = slotKey
  ? getContentForSlot(slotKey, "hero") as HeroContent
  : (content.hero ?? getDefaultContentForSectionType("hero") as HeroContent);
  return <Component content={heroContent} />;
}

export { HeroSectionFromConfig } from "./HeroSectionFromConfig";
export { HeroV1, HeroV2, HeroV3, SlideHero };
