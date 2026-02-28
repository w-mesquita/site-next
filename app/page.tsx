import { getSectionsConfig } from "@/lib/sections-config";
import { HeroSection } from "@/components/sections";

export default function HomePage() {
  const config = getSectionsConfig();
  return (
    <main className="min-h-[calc(100dvh-64px)]">
      <HeroSection variant={config.hero} />
      <section className="px-6 py-12 text-center">
        <p className="text-[var(--color-text-muted)]">
          Edite esta página em <code className="rounded bg-[var(--color-surface)] px-2 py-1">app/page.tsx</code>.
        </p>
      </section>
    </main>
  );
}
