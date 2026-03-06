"use client";

import Link from "next/link";
import { useSectionsConfig } from "@/lib/sections-config-context";
import type { PageId, PageSectionSlot, SectionType, SectionVariant } from "@/types/sections";
import { getVariantsForSectionType, SECTION_VARIANT_LABELS } from "@/types/sections";
import { sectionAcceptsVariant } from "@/lib/page-sections-registry";
import { isSectionTypeWithContent } from "@/types/sections-content";
import { SectionPreview } from "./SectionPreview";

const SECTION_TYPE_OPTIONS: { value: SectionType; label: string }[] = [
  { value: "none", label: "Nenhuma" },
  { value: "hero", label: "Hero" },
  { value: "cta", label: "CTA" },
  { value: "features", label: "Features" },
  { value: "services", label: "Services" },
  { value: "partners", label: "Partners" },
  { value: "contact", label: "Contact" },
];

interface PageConfigClientProps {
  pageId: PageId;
  pageLabel: string;
}

export function PageConfigClient({ pageId, pageLabel }: PageConfigClientProps) {
  const { config, setConfig } = useSectionsConfig();
  const pageConfig = config.pages[pageId];
  const slots: PageSectionSlot[] = pageConfig?.pageSections ?? [];

  function setSlot(index: number, slot: PageSectionSlot) {
    const newSlots = [...slots];
    while (newSlots.length <= index) newSlots.push({ type: "none" });
    newSlots[index] = slot;
    while (newSlots.length < 7) newSlots.push({ type: "none" });
    const pageSections = newSlots.slice(0, 7);
    setConfig({
      ...config,
      pages: { ...config.pages, [pageId]: { pageSections } },
    });
  }

  function setSlotType(index: number, type: SectionType) {
    const current = slots[index] ?? { type: "none" };
    if (type === "none") {
      setSlot(index, { type: "none" });
      return;
    }
    const defaultVariant = type === "hero" ? "v1" : (current.variant ?? "v1");
    setSlot(index, {
      type,
      variant: sectionAcceptsVariant(type) ? defaultVariant : undefined,
    });
  }

  function setSlotVariant(index: number, variant: SectionVariant) {
    const current = slots[index] ?? { type: "none" };
    setSlot(index, { ...current, variant });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1
        className="text-2xl font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        Configurar: {pageLabel}
      </h1>
      <p
        className="text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        Selecione o tipo de seção e a variante (quando houver) para cada um dos 7
        slots do corpo da página.
      </p>

      <section
        className="rounded-lg border p-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="space-y-6">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => {
            const slot = slots[index] ?? { type: "none" as const };
            const hasVariant = slot.type !== "none" && sectionAcceptsVariant(slot.type);
            return (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-stretch sm:flex-nowrap"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="min-w-0 flex-1">
                  <h3
                    className="mb-3 font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    Seção {index + 1}
                  </h3>
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="min-w-[140px]">
                      <label
                        htmlFor={`slot-${index}-type`}
                        className="mb-1 block text-xs font-medium"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        Tipo
                      </label>
                      <select
                        id={`slot-${index}-type`}
                        value={slot.type}
                        onChange={(e) =>
                          setSlotType(index, e.target.value as SectionType)
                        }
                        className="w-full rounded-lg border bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        {SECTION_TYPE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {hasVariant && (
                      <div className="min-w-[100px]">
                        <label
                          htmlFor={`slot-${index}-variant`}
                          className="mb-1 block text-xs font-medium"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          Variante
                        </label>
                        <select
                          id={`slot-${index}-variant`}
                          value={
                            slot.type === "hero" && slot.variant === "v3"
                              ? "slide"
                              : (slot.variant ?? "v1")
                          }
                          onChange={(e) =>
                            setSlotVariant(
                              index,
                              e.target.value as SectionVariant
                            )
                          }
                          className="w-full rounded-lg border bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                          style={{ borderColor: "var(--color-border)" }}
                        >
                          {getVariantsForSectionType(slot.type).map((v) => (
                            <option key={v} value={v}>
                              {SECTION_VARIANT_LABELS[v]}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                {slot.type !== "none" && (
                  <div className="relative flex w-full items-center justify-center sm:w-auto sm:justify-end sm:ml-auto">
                    <SectionPreview
                      type={slot.type}
                      variant={slot.variant}
                      pageId={pageId}
                      slotIndex={index}
                    />
                    {isSectionTypeWithContent(slot.type) && (
                      <Link
                        href={`/settings/content/${pageId}/${index}`}
                        className="absolute right-2 top-2 z-10 rounded-md p-1.5 shadow-sm transition hover:opacity-90 pointer-events-auto"
                        style={{
                          backgroundColor: "var(--color-background)",
                          color: "var(--color-text)",
                          border: "1px solid var(--color-border)",
                        }}
                        title={`Editar conteúdo do slot ${index + 1}`}
                        aria-label={`Editar conteúdo slot ${index + 1}`}
                      >
                        <ContentConfigIcon className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Link
        href="/settings"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
        }}
      >
        Voltar à configuração
      </Link>
    </div>
  );
}

function ContentConfigIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
      />
    </svg>
  );
}
