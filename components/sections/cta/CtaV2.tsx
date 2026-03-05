"use client";

import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";

export interface CtaV2Props {
  content?: CtaContent;
}

export function CtaV2({ content: contentProp }: CtaV2Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const bgColor = content.backgroundColor?.trim() || "var(--color-primary)";
  const bgImage = content.backgroundImage?.trim();

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: "#fff",
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
            background: "color-mix(in srgb, var(--color-primary) 70%, transparent)",
          }}
          aria-hidden
        />
      )}
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6 flex flex-col md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 max-w-xl opacity-90 text-base md:text-lg">
            {content.text}
          </p>
        </div>
        <div className="mt-8 flex justify-center md:mt-0 md:justify-end md:flex-shrink-0">
          <Button href={content.action.href} variant="inverse" size="md">
            {content.action.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
