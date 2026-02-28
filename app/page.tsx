import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-64px)]">
        <section
          className="flex flex-col items-center justify-center px-6 py-24 text-center"
          aria-label="Seção principal"
        >
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Bem-vindo ao seu site
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
            Estrutura base com Next.js, TypeScript, Tailwind e design tokens.
            Edite esta página em <code className="rounded bg-[var(--color-surface)] px-2 py-1">app/page.tsx</code>.
          </p>
        </section>
      </main>
    </>
  );
}
