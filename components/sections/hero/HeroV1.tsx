export function HeroV1() {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-24 text-center"
      aria-label="Seção principal"
    >
      <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl" style={{ color: "var(--color-text)" }}>
        Bem-vindo ao seu site
      </h1>
      <p className="mt-4 max-w-2xl text-lg md:text-xl" style={{ color: "var(--color-text-muted)" }}>
        Estrutura base com Next.js, TypeScript, Tailwind e design tokens.
      </p>
    </section>
  );
}
