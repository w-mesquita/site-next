"use client";

import Image from "next/image";
import type { PartnersContent, PartnersLogoItem } from "@/types/sections-content";
import { DEFAULT_PARTNERS_CONTENT } from "@/types/sections-content";

export interface PartnersV2Props {
  content?: PartnersContent;
}

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function PartnerLogo({ item, index }: { item: PartnersLogoItem; index: number }) {
  const src = item.logoSrc?.trim();
  if (!src) {
    return (
      <div
        className="flex h-14 w-28 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-hidden
      >
        <span className="text-xs text-[var(--color-text-muted)]">Logo {index + 1}</span>
      </div>
    );
  }
  return (
    <div className="relative flex h-14 w-28 flex-shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 transition-shadow hover:shadow-md">
      <Image
        src={src}
        alt={item.alt ?? `Parceiro ${index + 1}`}
        width={112}
        height={56}
        className="max-h-12 w-full object-contain object-center opacity-85 transition-opacity hover:opacity-100"
        unoptimized={src.startsWith("http")}
      />
    </div>
  );
}

export function PartnersV2({ content: contentProp }: PartnersV2Props) {
  const content = contentProp ?? DEFAULT_PARTNERS_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultBg = "var(--color-surface)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || "color-mix(in srgb, var(--color-background) 65%, transparent)";
  const showBadge = hasContent(content.badge);
  const showTitle = hasContent(content.title);
  const showDescription = hasContent(content.description);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };
  const badgeStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };
  const logos = content.logos?.length ? content.logos : DEFAULT_PARTNERS_CONTENT.logos;

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
      aria-label="Parceiros"
    >
      {bgImage && (
        <div className="absolute inset-0 z-[1]" style={{ background: overlayStyle }} aria-hidden />
      )}
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-4 md:px-6">
        <header className="mx-auto max-w-2xl text-center">
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
            <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl" style={titleStyle}>
              {content.title}
            </h2>
          )}
          {showDescription && (
            <p className="mt-4 text-lg leading-relaxed" style={bodyStyle}>
              {content.description}
            </p>
          )}
        </header>

        <div className="mt-12 grid grid-cols-2 place-items-center gap-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 md:gap-10">
          {logos.map((item, index) => (
            <PartnerLogo key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
