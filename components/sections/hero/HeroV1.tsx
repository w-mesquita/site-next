export function HeroV1() {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-24 text-center"
      aria-label="Seção principal"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: "#0f172a" }}>
        Bem-vindo ao seu site
      </h1>
      <p className="mt-4 max-w-2xl text-lg" style={{ color: "#64748b" }}>
        Estrutura base com Next.js, TypeScript, Tailwind e design tokens.
      </p>
    </section>
  );
}
