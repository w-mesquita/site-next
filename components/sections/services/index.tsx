"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { ServicesContent } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { ServicesV1 } from "./ServicesV1";
import { ServicesV2 } from "./ServicesV2";

const registry: Record<"v1" | "v2", ComponentType<{ content?: ServicesContent }>> = {
  v1: ServicesV1,
  v2: ServicesV2,
};

export interface ServicesSectionProps {
  variant?: SectionVariant;
  slotKey?: string;
}

export function ServicesSection({ variant = "v1", slotKey }: ServicesSectionProps) {
  const { content, getContentForSlot } = useSectionsContent();
  const key = variant === "v1" || variant === "v2" ? variant : "v1";
  const Component = registry[key] ?? registry.v1;
  const servicesContent: ServicesContent = slotKey
    ? (getContentForSlot(slotKey, "services") as ServicesContent)
    : (content.services ?? (getDefaultContentForSectionType("services") as ServicesContent));
  return <Component content={servicesContent} />;
}

export { ServicesV1, ServicesV2 };
export { ServiceCardIcon } from "./ServiceCardIcon";
