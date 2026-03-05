"use client";

import type { FeaturesContent } from "@/types/sections-content";
import { DEFAULT_FEATURES_CONTENT } from "@/types/sections-content";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

export interface FeaturesV2Props {
  content?: FeaturesContent;
}

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export function FeaturesV2({ content: contentProp }: FeaturesV2Props) {
  const content = contentProp ?? DEFAULT_FEATURES_CONTENT;
  const [imageError, setImageError] = useState(false);
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-background) 65%, transparent)";
  const defaultBg = "var(--color-background)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || defaultOverlay;
  const hasImageSrc = Boolean(content.imageSrc?.trim());
  const showImage = hasImageSrc && !imageError;
  const showBadge = hasContent(content.badge);
  const showTitle = hasContent(content.title);
  const showDescription = hasContent(content.description);
  const listItemsWithContent = (content.listItems ?? []).filter((item) => hasContent(item));
  const showList = listItemsWithContent.length > 0;
  const showPrimaryAction = hasContent(content.primaryAction?.label);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.85 } : { color: "var(--color-text-muted)" };
  const badgeStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };

  return (
    <section
      className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24 lg:py-28"
      style={{
        backgroundColor: bgColor,
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
      aria-label="Recursos e destaque"
    >
      {/* Overlay sobre imagem de fundo (cor configurável com transparência) */}
      {bgImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: overlayStyle }}
          aria-hidden
        />
      )}
      <div
        className={`relative z-10 mx-auto grid max-w-[var(--content-max-width)] gap-10 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16`}
      >
        {showImage && (
          <div className="relative order-2 flex justify-center lg:order-1 lg:justify-start">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl">
              <Image
                src={content.imageSrc}
                alt=""
                fill
                className="object-cover object-center"
                onError={() => setImageError(true)}
                unoptimized={content.imageSrc.startsWith("http")}
              />
            </div>
          </div>
        )}
        <div
          className={`max-w-xl space-y-6 ${showImage ? "order-1 lg:order-2" : ""}`}
        >
          {showBadge && (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: textColor ? "color-mix(in srgb, currentColor 15%, transparent)" : "color-mix(in srgb, var(--color-text-muted) 10%, transparent)",
                borderColor: textColor ? "color-mix(in srgb, currentColor 25%, transparent)" : "color-mix(in srgb, var(--color-text-muted) 20%, transparent)",
                ...badgeStyle,
              }}
            >
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: "currentColor" }}
                aria-hidden
              />
              {content.badge}
            </div>
          )}
          {showTitle && (
            <h2
              className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
              style={titleStyle}
            >
              {content.title}
            </h2>
          )}
          {showDescription && (
            <p
              className="text-lg leading-relaxed"
              style={bodyStyle}
            >
              {content.description}
            </p>
          )}
          {showList && (
            <ul className="space-y-3">
              {listItemsWithContent.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base"
                  style={bodyStyle}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {showPrimaryAction && (
            <div className="pt-2">
              <Button href={content.primaryAction.href || "#"} variant="primary" size="md">
                {content.primaryAction.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
