"use client";

import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";
import { CtaDefaultBackground } from "./CtaDefaultBackground";

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export interface CtaV3Props {
  content?: CtaContent;
}

export function CtaV3({ content: contentProp }: CtaV3Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-background) 50%, transparent)";
  const defaultBg = "var(--color-surface)";
  const hasCustomBg = Boolean(bgImage || content.backgroundColor?.trim() || overlayColor);
  const cardBgColor = bgImage
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
                  backgroundColor: cardBgColor,
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
              style={{ background: overlayStyle }}
              aria-hidden
            />
          )}
          {!hasCustomBg && <CtaDefaultBackground />}
          <div className="relative z-10">
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
              <Button href={content.action.href || "#"} variant="neutral" size="md" className="mt-8 border-[var(--color-primary)] text-[var(--color-primary)]">
                {content.action.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
