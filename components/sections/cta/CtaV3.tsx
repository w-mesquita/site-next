"use client";

import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";
import Link from "next/link";
import { CtaDefaultBackground } from "./CtaDefaultBackground";

export interface CtaV3Props {
  content?: CtaContent;
}

export function CtaV3({ content: contentProp }: CtaV3Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const hasCustomBg = Boolean(content.backgroundImage?.trim() || content.backgroundColor?.trim());
  const bgColor = content.backgroundColor?.trim() || "var(--color-surface)";
  const bgImage = content.backgroundImage?.trim();

  return (
    <section
      className="py-16 md:py-20"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
      aria-label="Chamada para ação"
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <div
          className="relative rounded-xl overflow-hidden p-8 md:p-10 text-center"
          style={{
            ...(hasCustomBg
              ? {
                  backgroundColor: bgColor,
                  ...(bgImage && {
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }),
                }
              : {}),
          }}
        >
          {hasCustomBg && bgImage && (
            <div
              className="absolute inset-0 z-[1] rounded-xl"
              style={{
                background: "color-mix(in srgb, var(--color-background) 50%, transparent)",
              }}
              aria-hidden
            />
          )}
          {!hasCustomBg && <CtaDefaultBackground />}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {content.title}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg" style={{ color: "var(--color-text-muted)" }}>
              {content.text}
            </p>
            <Link
              href={content.action.href}
              className="mt-8 inline-block rounded-md border-2 px-6 py-3 font-medium transition-colors"
              style={{
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
            >
              {content.action.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
