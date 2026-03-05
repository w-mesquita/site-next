"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { FeaturesContent } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { FeaturesV1 } from "./FeaturesV1";
import { FeaturesV2 } from "./FeaturesV2";

const registry: Record<"v1" | "v2", ComponentType<{ content?: FeaturesContent }>> = {
  v1: FeaturesV1,
  v2: FeaturesV2,
};

export interface FeaturesSectionProps {
  variant?: SectionVariant;
}

export function FeaturesSection({ variant = "v1" }: FeaturesSectionProps) {
  const { content } = useSectionsContent();
  const key = variant === "v1" || variant === "v2" ? variant : "v1";
  const Component = registry[key] ?? registry.v1;
  return <Component content={content.features} />;
}

export { FeaturesV1, FeaturesV2 };
