import Link from "next/link";

export function HeroV2() {
  return (
    <section
      className="relative flex min-h-[70vh] flex-col items-center justify-center bg-[var(--color-surface)] px-6 py-24 text-center"
      aria-label="Banner principal"
    >
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" style={{ color: "var(--color-text)" }}>
        Destaque sua marca
      </h1>
      <p className="mt-6 max-w-2xl text-lg" style={{ color: "var(--color-text-muted)" }}>
        Hero com chamada para ação em destaque.
      </p>
      <Link
        href="#acao"
        className="mt-8 inline-block rounded-md bg-[var(--color-primary)] px-6 py-3 font-medium text-white hover:no-underline"
      >
        Saiba mais
      </Link>
    </section>
  );
}
