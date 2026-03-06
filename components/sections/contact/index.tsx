"use client";

import type { ComponentType } from "react";
import { useSectionsContent } from "@/lib/sections-content-context";
import type { ContactContent } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import type { SectionVariant } from "@/types/sections";
import { ContactV1 } from "./ContactV1";
import { ContactV2 } from "./ContactV2";

const registry: Record<"v1" | "v2", ComponentType<{ content?: ContactContent }>> = {
  v1: ContactV1,
  v2: ContactV2,
};

export interface ContactSectionProps {
  variant?: SectionVariant;
  slotKey?: string;
}

export function ContactSection({ variant = "v1", slotKey }: ContactSectionProps) {
  const { content, getContentForSlot } = useSectionsContent();
  const key = variant === "v1" || variant === "v2" ? variant : "v1";
  const Component = registry[key] ?? registry.v1;
  const contactContent: ContactContent = slotKey
    ? (getContentForSlot(slotKey, "contact") as ContactContent)
    : (content.contact ?? (getDefaultContentForSectionType("contact") as ContactContent));
  return <Component content={contactContent} />;
}

export { ContactV1, ContactV2 };
export { ContactIllustrationPlaceholder } from "./ContactIllustrationPlaceholder";
