"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SECTION_COMPONENTS } from "@/lib/page-sections-registry";
import type { PageId } from "@/types/sections";
import type { SectionType, SectionVariant } from "@/types/sections";

/** Tamanho da "janela" da miniatura (px). */
const PREVIEW_VIEWPORT_WIDTH = 1000;
const PREVIEW_VIEWPORT_HEIGHT = 500;
/** Escala no desktop (resultado: 280x140px). */
const PREVIEW_SCALE_DESKTOP = 0.28;
const SM_BREAKPOINT = 640;

export interface SectionPreviewProps {
  type: SectionType;
  variant?: SectionVariant;
  pageId: PageId;
  slotIndex: number;
  className?: string;
}

/**
 * Prévia fiel da seção. No mobile usa 100% da largura do card; no desktop largura fixa.
 */
export function SectionPreview({
  type,
  variant,
  pageId,
  slotIndex,
  className = "",
}: SectionPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(PREVIEW_SCALE_DESKTOP);
  const [height, setHeight] = useState(PREVIEW_VIEWPORT_HEIGHT * PREVIEW_SCALE_DESKTOP);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      const isMobile = window.innerWidth < SM_BREAKPOINT;
      if (isMobile && w > 0) {
        const s = w / PREVIEW_VIEWPORT_WIDTH;
        setScale(s);
        setHeight(PREVIEW_VIEWPORT_HEIGHT * s);
      } else {
        setScale(PREVIEW_SCALE_DESKTOP);
        setHeight(PREVIEW_VIEWPORT_HEIGHT * PREVIEW_SCALE_DESKTOP);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  if (type === "none") return null;

  const Component = SECTION_COMPONENTS[type];
  if (!Component) return null;

  const slotKey = `${pageId}-${slotIndex}`;

  return (
    <div
      ref={containerRef}
      className={`shrink-0 overflow-hidden rounded border pointer-events-none w-full sm:w-[280px] ${className}`.trim()}
      style={{
        height: `${height}px`,
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-background)",
      }}
      title="Prévia da seção (conteúdo real)"
    >
      <div
        style={{
          width: PREVIEW_VIEWPORT_WIDTH,
          height: PREVIEW_VIEWPORT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
        }}
      >
        <Component
          variant={variant ?? "v1"}
          slotKey={slotKey}
        />
      </div>
    </div>
  );
}
