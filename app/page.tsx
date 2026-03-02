import { HeroSectionFromConfig } from "@/components/sections/hero/HeroSectionFromConfig";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100dvh-64px)]">
      <HeroSectionFromConfig />
      <section className="px-6 py-12 text-center">
        <p className="text-[var(--color-text-muted)]">
          Edite esta página em <code className="rounded bg-[var(--color-surface)] px-2 py-1">app/page.tsx</code>.
        </p>
      </section>
    </main>
  );
}
