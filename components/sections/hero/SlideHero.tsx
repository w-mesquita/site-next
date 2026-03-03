"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTO_PLAY_INTERVAL_MS = 5000;

export interface SlideHeroProps {
  /** Lista de slides (imagens); uso típico: 3 itens */
  slides: { imageSrc: string }[];
}

export function SlideHero({ slides }: SlideHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = Math.max(1, slides.length);
  const index = currentIndex % count;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % count);
    }, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  if (!slides.length) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-label="Carrossel de imagens do hero"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${index * (100 / count)}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0 overflow-hidden"
            style={{ width: `${100 / count}%` }}
          >
            <Image
              src={slide.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
