"use client";

import type { FeaturesContent } from "@/types/sections-content";
import { DEFAULT_FEATURES_CONTENT } from "@/types/sections-content";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";

export interface FeaturesV1Props {
  content?: FeaturesContent;
}

export function FeaturesV1({ content: contentProp }: FeaturesV1Props) {
  const content = contentProp ?? DEFAULT_FEATURES_CONTENT;
  const [imageError, setImageError] = useState(false);
  const bgColor = content.backgroundColor?.trim() || "var(--color-background)";
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const hasImageSrc = Boolean(content.imageSrc?.trim());
  const showImage = hasImageSrc && !imageError;

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
      {bgImage && overlayColor && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: overlayColor }}
          aria-hidden
        />
      )}
      {!bgImage && overlayColor && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: overlayColor }}
          aria-hidden
        />
      )}
      <div
        className={`relative z-10 mx-auto grid max-w-[var(--content-max-width)] gap-10 px-4 md:px-6 lg:grid-cols-2 lg:items-center lg:gap-16`}
      >
        <div className="max-w-xl space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-text-muted) 10%, transparent)",
              borderColor: "color-mix(in srgb, var(--color-text-muted) 20%, transparent)",
              color: "var(--color-text-muted)",
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: "var(--color-text-muted)" }}
              aria-hidden
            />
            {content.badge}
          </div>
          <h2
            className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
            style={{ color: "var(--color-text)" }}
          >
            {content.title}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {content.description}
          </p>
          {content.listItems.length > 0 && (
            <ul className="space-y-3">
              {content.listItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base"
                  style={{ color: "var(--color-text-muted)" }}
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
          <div className="pt-2">
            <Button href={content.primaryAction.href} variant="primary" size="md">
              {content.primaryAction.label}
            </Button>
          </div>
        </div>
        {showImage && (
          <div className="relative flex justify-center lg:justify-end">
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
      </div>
    </section>
  );
}
