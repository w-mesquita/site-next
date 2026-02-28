export function HeroV3() {
  return (
    <section
      className="grid min-h-[60vh] place-items-center border-b border-[var(--color-border)] px-6 py-20"
      aria-label="Banner fullscreen"
    >
      <div className="max-w-3xl text-center">
<h1 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ color: "var(--color-text)" }}>
        Título impactante
        </h1>
        <p className="mt-6 text-lg" style={{ color: "var(--color-text-muted)" }}>
          Subtítulo ou descrição curta. Layout limpo e direto.
        </p>
      </div>
    </section>
  );
}
