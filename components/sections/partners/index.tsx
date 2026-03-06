"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { PartnersContent } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { PartnersV1 } from "./PartnersV1";
import { PartnersV2 } from "./PartnersV2";

const registry: Record<"v1" | "v2", ComponentType<{ content?: PartnersContent }>> = {
  v1: PartnersV1,
  v2: PartnersV2,
};

export interface PartnersSectionProps {
  variant?: SectionVariant;
  slotKey?: string;
}

export function PartnersSection({ variant = "v1", slotKey }: PartnersSectionProps) {
  const { content, getContentForSlot } = useSectionsContent();
  const key = variant === "v1" || variant === "v2" ? variant : "v1";
  const Component = registry[key] ?? registry.v1;
  const partnersContent: PartnersContent = slotKey
    ? (getContentForSlot(slotKey, "partners") as PartnersContent)
    : (content.partners ?? (getDefaultContentForSectionType("partners") as PartnersContent));
  return <Component content={partnersContent} />;
}

export { PartnersV1, PartnersV2 };
