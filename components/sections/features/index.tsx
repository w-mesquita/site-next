"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { FeaturesContent } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { FeaturesV1 } from "./FeaturesV1";
import { FeaturesV2 } from "./FeaturesV2";

const registry: Record<"v1" | "v2", ComponentType<{ content?: FeaturesContent }>> = {
  v1: FeaturesV1,
  v2: FeaturesV2,
};

export interface FeaturesSectionProps {
  variant?: SectionVariant;
  /** Chave do slot (pageId-index); quando definida, usa conteúdo próprio do slot. */
  slotKey?: string;
}

export function FeaturesSection({ variant = "v1", slotKey }: FeaturesSectionProps) {
  const { content, getContentForSlot } = useSectionsContent();
  const key = variant === "v1" || variant === "v2" ? variant : "v1";
  const Component = registry[key] ?? registry.v1;
  const featuresContent: FeaturesContent = slotKey
  ? getContentForSlot(slotKey, "features") as FeaturesContent
  : (content.features ?? getDefaultContentForSectionType("features") as FeaturesContent);
  return <Component content={featuresContent} />;
}

export { FeaturesV1, FeaturesV2 };
