"use client";

import { Button } from "@/components/ui/Button";
import type { CtaContent } from "@/types/sections-content";
import { DEFAULT_CTA_CONTENT } from "@/types/sections-content";

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export interface CtaV2Props {
  content?: CtaContent;
}

export function CtaV2({ content: contentProp }: CtaV2Props) {
  const content = contentProp ?? DEFAULT_CTA_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-primary) 70%, transparent)";
  const defaultBg = "var(--color-primary)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || defaultOverlay;
  const showTitle = hasContent(content.title);
  const showText = hasContent(content.text);
  const showAction = hasContent(content.action?.label);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "#fff" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.85 } : { color: "#fff", opacity: 0.9 };

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor || "#fff",
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
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6 flex flex-col md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="text-center md:text-left">
          {showTitle && (
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl" style={titleStyle}>
              {content.title}
            </h2>
          )}
          {showText && (
            <p className="mt-4 max-w-xl text-base md:text-lg" style={bodyStyle}>
              {content.text}
            </p>
          )}
        </div>
        {showAction && (
          <div className="mt-8 flex justify-center md:mt-0 md:justify-end md:flex-shrink-0">
            <Button href={content.action.href || "#"} variant="inverse" size="md">
              {content.action.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
