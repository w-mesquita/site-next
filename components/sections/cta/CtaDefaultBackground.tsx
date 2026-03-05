"use client";

/**
 * Fundo padrão com cor primary e bolhas em SVG para a CTA V3 (sem background customizado).
 * Tamanhos bem variados, das maiores (~320px) às menores (~80px).
 */
export function CtaDefaultBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-xl"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-primary) 14%, var(--color-surface))",
      }}
      aria-hidden
    >
      {/* Topo: esquerda, bem grande */}
      <svg
        className="absolute -left-16 -top-16 h-[320px] w-[320px] opacity-[0.11]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Meio-esquerda, grande */}
      <svg
        className="absolute -left-4 top-1/3 h-[240px] w-[240px] -translate-y-1/2 opacity-[0.08]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Topo: direita, média */}
      <svg
        className="absolute right-4 top-0 h-[180px] w-[180px] opacity-[0.07]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Centro-direita */}
      <svg
        className="absolute right-0 top-1/2 h-[140px] w-[140px] -translate-y-1/2 opacity-[0.06]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Baixo: direita, bem grande */}
      <svg
        className="absolute -bottom-20 -right-12 h-[280px] w-[280px] opacity-[0.10]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Baixo: esquerda, média-grande */}
      <svg
        className="absolute bottom-0 left-8 h-[200px] w-[200px] opacity-[0.07]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Centro: bolha média */}
      <svg
        className="absolute left-1/3 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      {/* Variadas: tamanhos entre 80 e 120px */}
      <svg
        className="absolute left-1/4 top-12 h-[100px] w-[100px] opacity-[0.18]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      <svg
        className="absolute right-24 top-1/4 h-[90px] w-[90px] opacity-[0.14]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      <svg
        className="absolute bottom-16 left-1/3 h-[120px] w-[120px] opacity-[0.16]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      <svg
        className="absolute right-1/4 bottom-12 h-[80px] w-[80px] opacity-[0.12]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      <svg
        className="absolute left-16 bottom-1/3 h-[110px] w-[110px] opacity-[0.13]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
      <svg
        className="absolute right-12 top-1/2 h-[95px] w-[95px] -translate-y-1/2 opacity-[0.10]"
        style={{ color: "var(--color-primary)" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
}
