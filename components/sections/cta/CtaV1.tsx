"use client";

import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export interface CtaV1Props {
  content?: CtaContent;
}

export function CtaV1({ content: contentProp }: CtaV1Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-background) 55%, transparent)";
  const defaultBg = "var(--color-surface)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || defaultOverlay;
  const showTitle = hasContent(content.title);
  const showText = hasContent(content.text);
  const showAction = hasContent(content.action?.label);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.85 } : { color: "var(--color-text-muted)" };

  return (
    <section
      className="relative py-16 md:py-20 text-center overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor || "var(--color-text)",
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
          style={{ background: overlayStyle }}
          aria-hidden
        />
      )}
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6">
        {showTitle && (
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={titleStyle}>
            {content.title}
          </h2>
        )}
        {showText && (
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg" style={bodyStyle}>
            {content.text}
          </p>
        )}
        {showAction && (
          <Button href={content.action.href || "#"} variant="primary" size="md" className="mt-8">
            {content.action.label}
          </Button>
        )}
      </div>
    </section>
  );
}
