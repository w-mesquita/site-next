"use client";

import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/types/sections-content";
import { DEFAULT_HERO_CONTENT } from "@/types/sections-content";
import { SlideHero } from "./SlideHero";

export interface HeroV3Props {
  content?: HeroContent;
}

function getSlides(content: HeroContent): { imageSrc: string }[] {
  if (content.slides && content.slides.length >= 3) {
    return content.slides.slice(0, 3);
  }
  return [
    { imageSrc: content.imageSrc },
    { imageSrc: content.imageSrc },
    { imageSrc: content.imageSrc },
  ];
}

export function HeroV3({ content: contentProp }: HeroV3Props) {
  const content = contentProp ?? DEFAULT_HERO_CONTENT;
  const slides = getSlides(content);

  return (
    <section
      className="relative min-h-[70vh] overflow-hidden"
      aria-label="Seção principal com slide"
    >
      <SlideHero slides={slides} />
      {/* Overlay escuro leve para contraste do texto */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, color-mix(in srgb, var(--color-background) 60%, transparent) 0%, color-mix(in srgb, var(--color-background) 30%, transparent) 70%)",
        }}
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[70vh] items-center px-4 py-24 md:px-6 lg:py-32">
        <div className="mx-auto w-full max-w-content">
          <div className="max-w-2xl space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-text-muted) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--color-text-muted) 20%, transparent)",
                color: "var(--color-text-muted)",
              }}
            >
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: "var(--color-text-muted)" }}
              />
              {content.badge}
            </div>

            <h1
              className="font-extrabold leading-tight tracking-tight"
              style={{ color: "var(--color-text)" }}
            >
              <span className="mb-2 block text-2xl md:text-3xl lg:text-4xl">
                {content.titleLine1}
              </span>
              <span className="mt-2 block text-5xl md:text-6xl lg:text-7xl lg:mt-4">
                {content.titleLine2}
              </span>
            </h1>

            <p
              className="max-w-lg text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--color-text-muted)" }}
            >
              {content.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={content.primaryAction.href} variant="primary" size="md">
                {content.primaryAction.label}
              </Button>
              <Button href={content.secondaryAction.href} variant="neutral" size="md">
                {content.secondaryAction.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
