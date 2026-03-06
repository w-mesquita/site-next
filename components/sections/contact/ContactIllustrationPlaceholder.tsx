"use client";

/**
 * Placeholder ilustrativo isométrico para a seção de contato quando nenhuma imagem é configurada.
 * Estilo: megafone, dispositivo e elementos de comunicação.
 */
export function ContactIllustrationPlaceholder() {
  return (
    <div
      className="relative flex aspect-square max-h-[380px] w-full max-w-md items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]"
      aria-hidden
    >
      <svg
        viewBox="0 0 280 240"
        className="h-full w-full p-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base/plano isométrico */}
        <path
          d="M40 180 L140 220 L240 180 L140 140 Z"
          fill="currentColor"
          className="text-[var(--color-primary)]"
          opacity={0.12}
        />
        {/* Smartphone */}
        <g transform="translate(100,80) rotate(-8)">
          <rect x="0" y="0" width="56" height="90" rx="6" fill="var(--color-background)" stroke="var(--color-border)" strokeWidth="2" />
          <rect x="6" y="8" width="44" height="64" rx="2" fill="var(--color-primary)" opacity={0.3} />
        </g>
        {/* Megafone */}
        <g transform="translate(130,60) rotate(5)">
          <path
            d="M0 40 L25 20 L25 60 Z"
            fill="var(--color-primary)"
            opacity={0.9}
          />
          <rect x="25" y="28" width="50" height="24" rx="4" fill="var(--color-primary)" opacity={0.85} />
          <ellipse cx="75" cy="40" rx="12" ry="18" fill="var(--color-primary)" opacity={0.7} />
        </g>
        {/* Envelope */}
        <g transform="translate(50,50)">
          <path
            d="M0 20 L30 0 L60 20 L30 40 Z"
            fill="var(--color-primary)"
            opacity={0.25}
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity={0.4}
          />
          <path d="M5 20 L30 38 L55 20" stroke="var(--color-background)" strokeWidth="2" fill="none" opacity={0.6} />
        </g>
        {/* Gráfico de barras */}
        <g transform="translate(180,150)">
          {[20, 35, 25, 45, 30].map((h, i) => (
            <rect
              key={i}
              x={i * 14}
              y={50 - h}
              width="10"
              height={h}
              rx="2"
              fill="var(--color-primary)"
              opacity={0.4 + (i % 3) * 0.15}
            />
          ))}
        </g>
        {/* Gráfico pizza */}
        <g transform="translate(55,155)">
          <circle cx="25" cy="25" r="22" fill="var(--color-primary)" opacity={0.2} stroke="var(--color-primary)" strokeOpacity={0.4} strokeWidth="1" />
          <path d="M25 25 L25 3 A22 22 0 0 1 45 22 Z" fill="var(--color-primary)" opacity={0.5} />
          <path d="M25 25 L45 22 A22 22 0 0 1 25 47 Z" fill="var(--color-primary)" opacity={0.35} />
        </g>
      </svg>
    </div>
  );
}
