"use client";

import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";

export interface CtaV1Props {
  content?: CtaContent;
}

export function CtaV1({ content: contentProp }: CtaV1Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const bgColor = content.backgroundColor?.trim() || "var(--color-surface)";
  const bgImage = content.backgroundImage?.trim();

  return (
    <section
      className="relative py-16 md:py-20 text-center overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: "var(--color-text)",
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
      aria-label="Chamada para ação"
    >
      {bgImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "color-mix(in srgb, var(--color-background) 55%, transparent)",
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
          {content.title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg" style={{ color: "var(--color-text-muted)" }}>
          {content.text}
        </p>
        <Button href={content.action.href} variant="primary" size="md" className="mt-8">
          {content.action.label}
        </Button>
      </div>
    </section>
  );
}
