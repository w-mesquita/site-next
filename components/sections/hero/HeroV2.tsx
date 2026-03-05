import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export interface HeroV2Props {
  content?: HeroContent;
}

export function HeroV2({ content: contentProp }: HeroV2Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultOverlay = "color-mix(in srgb, var(--color-background) 65%, transparent)";
  const defaultBg = "var(--color-surface)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || defaultOverlay;
  const showTitleLine1 = hasContent(content.titleLine1);
  const showTitleLine2 = hasContent(content.titleLine2);
  const showTitle = showTitleLine1 || showTitleLine2;
  const showDescription = hasContent(content.description);
  const showPrimaryAction = hasContent(content.primaryAction?.label);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.85 } : { color: "var(--color-text-muted)" };

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
      {/* Overlay sobre a imagem de fundo (cor configurável com transparência) */}
      {bgImage && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: overlayStyle }}
          aria-hidden
        />
      )}

      <div className="relative z-10">
        {showTitle && (
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" style={titleStyle}>
            {showTitleLine1 && (
              <span className="mb-2 block text-2xl md:text-3xl lg:text-4xl">
                {content.titleLine1}
              </span>
            )}
            {showTitleLine2 && content.titleLine2}
          </h1>
        )}
        {showDescription && (
          <p className="mt-6 max-w-2xl text-lg md:text-xl" style={bodyStyle}>
            {content.description}
          </p>
        )}
        {showPrimaryAction && (
          <Button href={content.primaryAction.href || "#"} variant="primary" size="md" className="mt-8">
            {content.primaryAction.label}
          </Button>
        )}
      </div>
    </section>
  );
}
