import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";

export interface HeroV2Props {
  content?: HeroContent;
}

export function HeroV2({ content: contentProp }: HeroV2Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const title = content.titleLine2 ? `${content.titleLine1} ${content.titleLine2}` : content.titleLine1;
  const bgColor = content.backgroundColor?.trim() || "var(--color-surface)";
  const bgImage = content.backgroundImage?.trim();

  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center"
      style={{
        backgroundColor: bgColor,
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
      aria-label="Banner principal"
    >
      {/* Overlay esmaecida sobre a imagem de fundo para legibilidade do texto */}
      {bgImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `color-mix(in srgb, var(--color-background) 65%, transparent)`,
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10">
        <span className="mb-2 block text-2xl md:text-3xl lg:text-4xl">
          {content.titleLine1}
        </span>
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" style={{ color: "var(--color-text)" }}>
          {content.titleLine2}
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "var(--color-text-muted)" }}>
          {content.description}
        </p>
        <Button href={content.primaryAction.href} variant="primary" size="md" className="mt-8">
          {content.primaryAction.label}
        </Button>
      </div>
    </section>
  );
}
