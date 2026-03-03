"use client";

import { useSectionsContent } from "@/lib/sections-content-context";
import type { HeroContent, SectionTypeWithContent } from "@/types/sections-content";
import Link from "next/link";

interface SectionContentFormProps {
  sectionType: SectionTypeWithContent;
  sectionLabel: string;
}

export function SectionContentForm({
  sectionType,
  sectionLabel,
}: SectionContentFormProps) {
  if (sectionType === "hero") {
    return <HeroContentForm sectionLabel={sectionLabel} />;
  }
  return null;
}

function HeroContentForm({ sectionLabel }: { sectionLabel: string }) {
  const { content, setHeroContent } = useSectionsContent();
  const hero = content.hero;

  function update<K extends keyof HeroContent>(field: K, value: HeroContent[K]) {
    setHeroContent({ ...hero, [field]: value });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Conteúdo: {sectionLabel}
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Este conteúdo é usado pelas variantes do Hero (V1, V2, V3). Cada
          variante usa apenas os campos que o layout exige.
        </p>
      </div>

      <section
        className="rounded-lg border p-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Textos
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="hero-badge"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Badge / Destaque
            </label>
            <input
              id="hero-badge"
              type="text"
              value={hero.badge}
              onChange={(e) => update("badge", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
              placeholder="Ex.: Destaque opcional"
            />
          </div>
          <div>
            <label
              htmlFor="hero-titleLine1"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Título (linha 1)
            </label>
            <input
              id="hero-titleLine1"
              type="text"
              value={hero.titleLine1}
              onChange={(e) => update("titleLine1", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>
          <div>
            <label
              htmlFor="hero-titleLine2"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Título (linha 2)
            </label>
            <input
              id="hero-titleLine2"
              type="text"
              value={hero.titleLine2}
              onChange={(e) => update("titleLine2", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>
          <div>
            <label
              htmlFor="hero-description"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Descrição / Parágrafo
            </label>
            <textarea
              id="hero-description"
              rows={3}
              value={hero.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>
        </div>
      </section>

      <section
        className="rounded-lg border p-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Ações (botões/links)
        </h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="hero-primary-label"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Ação principal (texto)
              </label>
              <input
                id="hero-primary-label"
                type="text"
                value={hero.primaryAction.label}
                onChange={(e) =>
                  update("primaryAction", {
                    ...hero.primaryAction,
                    label: e.target.value,
                  })
                }
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>
            <div>
              <label
                htmlFor="hero-primary-href"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Ação principal (link)
              </label>
              <input
                id="hero-primary-href"
                type="text"
                value={hero.primaryAction.href}
                onChange={(e) =>
                  update("primaryAction", {
                    ...hero.primaryAction,
                    href: e.target.value,
                  })
                }
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
                placeholder="#acao"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="hero-secondary-label"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Ação secundária (texto)
              </label>
              <input
                id="hero-secondary-label"
                type="text"
                value={hero.secondaryAction.label}
                onChange={(e) =>
                  update("secondaryAction", {
                    ...hero.secondaryAction,
                    label: e.target.value,
                  })
                }
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>
            <div>
              <label
                htmlFor="hero-secondary-href"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Ação secundária (link)
              </label>
              <input
                id="hero-secondary-href"
                type="text"
                value={hero.secondaryAction.href}
                onChange={(e) =>
                  update("secondaryAction", {
                    ...hero.secondaryAction,
                    href: e.target.value,
                  })
                }
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
                placeholder="#contato"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="rounded-lg border p-6"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Imagem
        </h2>
        <div>
          <label
            htmlFor="hero-imageSrc"
            className="mb-1 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            Caminho da imagem (ex.: /hero-image.jpg)
          </label>
          <input
            id="hero-imageSrc"
            type="text"
            value={hero.imageSrc}
            onChange={(e) => update("imageSrc", e.target.value)}
            className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            style={{ borderColor: "var(--color-border)" }}
            placeholder="/hero-image.jpg"
          />
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Coloque o arquivo em <code className="rounded px-1" style={{ backgroundColor: "var(--color-border)" }}>public/</code> e use o caminho começando com /.
          </p>
        </div>
      </section>

      <Link
        href="/settings"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
        }}
      >
        Voltar às configurações
      </Link>
    </div>
  );
}
