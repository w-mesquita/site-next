"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { CtaContent } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { CtaV1 } from "./CtaV1";
import { CtaV2 } from "./CtaV2";
import { CtaV3 } from "./CtaV3";

const registry: Record<"v1" | "v2" | "v3", ComponentType<{ content?: CtaContent }>> = {
  v1: CtaV1,
  v2: CtaV2,
  v3: CtaV3,
};

export interface CtaSectionProps {
  variant?: SectionVariant;
}

export function CtaSection({ variant = "v1" }: CtaSectionProps) {
  const { content } = useSectionsContent();
  const key = (variant === "v1" || variant === "v2" || variant === "v3" ? variant : "v1") as "v1" | "v2" | "v3";
  const Component = registry[key] ?? registry.v1;
  return <Component content={content.cta} />;
}

export { CtaV1, CtaV2, CtaV3 };
