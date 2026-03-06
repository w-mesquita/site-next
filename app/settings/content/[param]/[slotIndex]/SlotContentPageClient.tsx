"use client";

import { useSectionsConfig } from "@/lib/sections-config-context";
import type { PageId } from "@/types/sections";
import { PAGE_IDS } from "@/types/sections";
import { isSectionTypeWithContent } from "@/types/sections-content";
import { getSlotContentKey } from "@/types/sections-content";
import { notFound } from "next/navigation";
import { SectionContentForm } from "../../SectionContentForm";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  cta: "CTA",
  features: "Features",
  services: "Services",
  partners: "Partners",
  contact: "Contact",
};

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  contact: "Contato",
  about: "Sobre",
};

interface SlotContentPageClientProps {
  pageId: string;
  slotIndex: number;
}

export function SlotContentPageClient({ pageId, slotIndex }: SlotContentPageClientProps) {
  const { config } = useSectionsConfig();
  if (!PAGE_IDS.includes(pageId as PageId)) notFound();
  const pageConfig = config.pages[pageId as PageId];
  const slots = pageConfig?.pageSections ?? [];
  const slot = slots[slotIndex];
  if (!slot || slot.type === "none" || !isSectionTypeWithContent(slot.type)) notFound();
  const slotKey = getSlotContentKey(pageId, slotIndex);
  const sectionLabel = `${PAGE_LABELS[pageId] ?? pageId} – Slot ${slotIndex + 1} (${SECTION_LABELS[slot.type] ?? slot.type} ${slot.variant ?? "V1"})`;
  return (
    <SectionContentForm
      sectionType={slot.type}
      sectionLabel={sectionLabel}
      slotKey={slotKey}
      backToConfigHref={`/config/${pageId}`}
    />
  );
}
