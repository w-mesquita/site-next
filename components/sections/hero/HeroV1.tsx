"use client";

import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export interface HeroV1Props {
  content?: HeroContent;
}

export function HeroV1({ content: contentProp }: HeroV1Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const [imageError, setImageError] = useState(false);

  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-background) 65%, transparent)";
  const defaultBg = "var(--color-surface)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || defaultOverlay;
  const hasImageSrc = Boolean(content.imageSrc?.trim());
  const showImage = hasImageSrc && !imageError;
  const showBadge = hasContent(content.badge);
  const showTitleLine1 = hasContent(content.titleLine1);
  const showTitleLine2 = hasContent(content.titleLine2);
  const showTitle = showTitleLine1 || showTitleLine2;
  const showDescription = hasContent(content.description);
  const showPrimaryAction = hasContent(content.primaryAction?.label);
  const showSecondaryAction = hasContent(content.secondaryAction?.label);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.85 } : { color: "var(--color-text-muted)" };
  const badgeStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };

  return (
    <section
      className="relative overflow-hidden px-4 py-24 md:px-6 lg:py-32"
      style={{
        backgroundColor: bgColor,
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
      aria-label="Seção principal"
    >
      {/* Overlay sobre a imagem de fundo (cor configurável com transparência) */}
      {bgImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: overlayStyle }}
          aria-hidden
        />
      )}

      {/* Decorative blur orbs — por cima do overlay e da imagem */}
      <div
        className="absolute -right-20 -top-20 z-[2] h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -left-20 z-[2] h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto grid max-w-content gap-12 px-4 md:px-6 lg:items-center ${showImage ? "lg:grid-cols-2" : ""}`}
      >
        {/* Texto e ações à esquerda */}
        <div className="max-w-2xl space-y-6">
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
              />
              {content.badge}
            </div>
          )}

          {showTitle && (
            <h1
              className="font-extrabold leading-tight tracking-tight"
              style={titleStyle}
            >
              {showTitleLine1 && (
                <span className="mb-2 block text-2xl md:text-3xl lg:text-4xl">
                  {content.titleLine1}
                </span>
              )}
              {showTitleLine2 && (
                <span className="mt-2 block text-5xl md:text-6xl lg:text-7xl lg:mt-4">
                  {content.titleLine2}
                </span>
              )}
            </h1>
          )}

          {showDescription && (
            <p
              className="max-w-lg text-lg leading-relaxed md:text-xl"
              style={bodyStyle}
            >
              {content.description}
            </p>
          )}

          {(showPrimaryAction || showSecondaryAction) && (
            <div className="flex flex-wrap gap-4 pt-2">
              {showPrimaryAction && (
                <Button href={content.primaryAction.href || "#"} variant="primary" size="md">
                  {content.primaryAction.label}
                </Button>
              )}
              {showSecondaryAction && (
                <Button href={content.secondaryAction.href || "#"} variant="neutral" size="md">
                  {content.secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Imagem à direita — só exibe se houver imageSrc e a imagem carregar */}
        {showImage && (
          <div className="relative group">
            <div
              className="absolute inset-0 rounded-2xl opacity-20 blur-lg transition-opacity group-hover:opacity-30"
              style={{
                background: `linear-gradient(to right, var(--color-primary), var(--color-primary-light))`,
              }}
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-2xl border shadow-2xl"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}
            >
              <Image
                src={content.imageSrc}
                alt=""
                width={800}
                height={500}
                className="h-auto w-full object-cover opacity-95 transition-opacity duration-500 hover:opacity-100"
                onError={() => setImageError(true)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
