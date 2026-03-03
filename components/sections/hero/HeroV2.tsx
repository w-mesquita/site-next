import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";
import Link from "next/link";

export interface HeroV2Props {
  content?: HeroContent;
}

export function HeroV2({ content: contentProp }: HeroV2Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const title = content.titleLine2 ? `${content.titleLine1} ${content.titleLine2}` : content.titleLine1;
  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[var(--color-surface)] px-6 py-24 text-center"
      aria-label="Banner principal"
    >
      <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" style={{ color: "var(--color-text)" }}>
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: "var(--color-text-muted)" }}>
        {content.description}
      </p>
      <Link
        href={content.primaryAction.href}
        className="mt-8 inline-block rounded-md bg-[var(--color-primary)] px-6 py-3 font-medium text-white hover:no-underline"
      >
        {content.primaryAction.label}
      </Link>
    </section>
  );
}
