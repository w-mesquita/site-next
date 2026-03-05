"use client";

import type { ServicesContent, ServicesCardItem } from "@/types/sections-content";
import { DEFAULT_SERVICES_CONTENT } from "@/types/sections-content";
import { ServiceCardIcon } from "./ServiceCardIcon";

export interface ServicesV1Props {
  content?: ServicesContent;
}

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function CardStandard({ item, index }: { item: ServicesCardItem; index: number }) {
  const titleStyle = { color: "var(--color-text)" };
  const bodyStyle = { color: "var(--color-text-muted)" };
  return (
    <article
      className="relative flex flex-col rounded-2xl border bg-[var(--color-background)] p-6 shadow-sm transition-shadow hover:shadow-md"
      style={{ borderColor: "var(--color-border)" }}
    >
      <ServiceCardIcon icon={item.icon} />
      <h3 className="mt-4 text-lg font-bold" style={titleStyle}>
        {item.title || `Serviço ${index + 1}`}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={bodyStyle}>
        {item.message || ""}
      </p>
    </article>
  );
}

function CardHighlighted({ item, index }: { item: ServicesCardItem; index: number }) {
  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-2xl p-6 text-white shadow-lg"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <ServiceCardIcon icon={item.icon} bgClassName="bg-white/20" className="text-white" />
      <h3 className="mt-4 text-lg font-bold text-white">
        {item.title || `Serviço ${index + 1}`}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/90">
        {item.message || ""}
      </p>
      {/* Ondas decorativas à direita */}
      <div className="absolute right-0 top-0 h-full w-20 opacity-20" aria-hidden>
        <svg viewBox="0 0 80 200" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0 40 Q20 20 40 40 T80 40 V200 H0 Z" fill="currentColor" />
          <path d="M0 80 Q20 60 40 80 T80 80 V200 H0 Z" fill="currentColor" />
          <path d="M0 120 Q20 100 40 120 T80 120 V200 H0 Z" fill="currentColor" />
        </svg>
      </div>
    </article>
  );
}

export function ServicesV1({ content: contentProp }: ServicesV1Props) {
  const content = contentProp ?? DEFAULT_SERVICES_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultBg = "var(--color-background)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || "color-mix(in srgb, var(--color-background) 70%, transparent)";
  const showBadge = hasContent(content.badge);
  const showTitle = hasContent(content.title);
  const showDescription = hasContent(content.description);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };
  const badgeStyle = textColor ? { color: textColor, opacity: 0.95 } : { color: "var(--color-primary)" };
  const cards = content.cards?.length ? content.cards : DEFAULT_SERVICES_CONTENT.cards;

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
      aria-label="Nossos serviços"
    >
      {bgImage && (
        <div className="absolute inset-0 z-[1]" style={{ background: overlayStyle }} aria-hidden />
      )}
      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-4 md:px-6">
        {/* Header */}
        <header className="mx-auto max-w-2xl text-center">
          {showBadge && (
            <p className="text-sm font-semibold uppercase tracking-wider" style={badgeStyle}>
              {content.badge}
            </p>
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

        {/* Grid de cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((item, index) =>
            item.highlighted ? (
              <CardHighlighted key={index} item={item} index={index} />
            ) : (
              <CardStandard key={index} item={item} index={index} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
