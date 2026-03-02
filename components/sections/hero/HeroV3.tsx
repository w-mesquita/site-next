import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";

export interface HeroV3Props {
  content?: HeroContent;
}

export function HeroV3({ content: contentProp }: HeroV3Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const title = content.titleLine2 ? `${content.titleLine1} ${content.titleLine2}` : content.titleLine1;
  return (
    <section
      className="grid min-h-[60vh] place-items-center border-b border-[var(--color-border)] px-6 py-20"
      aria-label="Banner fullscreen"
    >
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl" style={{ color: "var(--color-text)" }}>
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl" style={{ color: "var(--color-text-muted)" }}>
          {content.description}
        </p>
      </div>
    </section>
  );
}
