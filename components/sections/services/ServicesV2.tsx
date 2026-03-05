"use client";

import type { ServicesContent, ServicesCardItem } from "@/types/sections-content";
import { DEFAULT_SERVICES_CONTENT } from "@/types/sections-content";
import { ServiceCardIcon } from "./ServiceCardIcon";

export interface ServicesV2Props {
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
      className="relative flex gap-4 rounded-xl border-l-4 bg-[var(--color-background)] p-6 shadow-sm transition-shadow hover:shadow-md"
      style={{
        borderColor: "var(--color-primary)",
        borderLeftColor: "var(--color-primary)",
      }}
    >
      <ServiceCardIcon icon={item.icon} />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold" style={titleStyle}>
          {item.title || `Serviço ${index + 1}`}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={bodyStyle}>
          {item.message || ""}
        </p>
      </div>
    </article>
  );
}

function CardHighlighted({ item, index }: { item: ServicesCardItem; index: number }) {
  return (
    <article
      className="relative flex gap-4 overflow-hidden rounded-xl border-l-4 border-white/30 bg-[var(--color-primary)] p-6 text-white shadow-lg"
    >
      <ServiceCardIcon icon={item.icon} bgClassName="bg-white/20" className="text-white flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-white">
          {item.title || `Serviço ${index + 1}`}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          {item.message || ""}
        </p>
      </div>
      {/* Ondas decorativas */}
      <div className="absolute -right-4 top-1/2 h-24 w-24 -translate-y-1/2 opacity-25" aria-hidden>
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
          <path d="M0 50 Q25 30 50 50 T100 50 Q75 70 50 50 T0 50Z" />
          <path d="M0 50 Q25 40 50 50 T100 50 Q75 60 50 50 T0 50Z" opacity="0.7" />
          <path d="M0 50 Q25 60 50 50 T100 50 Q75 40 50 50 T0 50Z" opacity="0.4" />
        </svg>
      </div>
    </article>
  );
}

export function ServicesV2({ content: contentProp }: ServicesV2Props) {
  const content = contentProp ?? DEFAULT_SERVICES_CONTENT;
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
