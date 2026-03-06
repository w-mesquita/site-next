"use client";

import {
  SECTION_COMPONENTS,
  sectionAcceptsVariant,
} from "@/lib/page-sections-registry";
import { useSectionsConfig } from "@/lib/sections-config-context";
import type { PageId, PageSectionSlot } from "@/types/sections";

interface PageSectionsRendererProps {
  pageId: PageId;
}

export function PageSectionsRenderer({ pageId }: PageSectionsRendererProps) {
  const { config } = useSectionsConfig();
  const pageConfig = config.pages[pageId];
  const slots: PageSectionSlot[] = pageConfig?.pageSections ?? [];

  return (
    <>
      {slots.map((slot, index) => {
        if (slot.type === "none") return null;
        const Component = SECTION_COMPONENTS[slot.type as keyof typeof SECTION_COMPONENTS];
        if (!Component) return null;
        const slotKey = `${pageId}-${index}`;
        const content =
          sectionAcceptsVariant(slot.type) ? (
            <Component
              key={slotKey}
              variant={slot.variant ?? "v1"}
              slotKey={slotKey}
            />
          ) : (
            <Component key={slotKey} slotKey={slotKey} />
          );
        return (
          <section
            key={slotKey}
            id={`section-${index}`}
            aria-label={`Seção ${index + 1}`}
            style={{ scrollMarginTop: "61px" }}
          >
            {content}
          </section>
        );
      })}
    </>
  );
}
