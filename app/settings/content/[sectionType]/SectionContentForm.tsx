"use client";

import { useSectionsContent } from "@/lib/sections-content-context";
import type { HeroContent, SectionTypeWithContent } from "@/types/sections-content";
import Link from "next/link";

interface SectionContentFormProps {
  sectionType: SectionTypeWithContent;
  sectionLabel: string;
}

const formSectionClass =
  "rounded-lg border p-6 border-[var(--color-border)] bg-[var(--color-surface)]";
const labelClass = "mb-1 block text-sm font-medium text-[var(--color-text)]";
const inputClass =
  "w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--color-border)]";

export function SectionContentForm({
  sectionType,
  sectionLabel,
}: SectionContentFormProps) {
  if (sectionType === "hero") {
    return <HeroContentForm sectionLabel={sectionLabel} />;
  }
  if (sectionType === "cta") {
    return <CtaContentForm sectionLabel={sectionLabel} />;
  }
  if (sectionType === "features") {
    return <FeaturesContentForm sectionLabel={sectionLabel} />;
  }
  return null;
}

function CtaContentForm({ sectionLabel }: { sectionLabel: string }) {
  const { content, setCtaContent } = useSectionsContent();
  const cta = content.cta;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Conteúdo: {sectionLabel}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Título, texto e ação (botão/link) usados pelas variantes da seção CTA (V1, V2, V3).
        </p>
      </div>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Textos
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="cta-title" className={labelClass}>
              Título
            </label>
            <input
              id="cta-title"
              type="text"
              value={cta.title}
              onChange={(e) => setCtaContent({ ...cta, title: e.target.value })}
              className={inputClass}
              placeholder="Ex.: Impulsione seu tráfego conosco"
            />
          </div>
          <div>
            <label htmlFor="cta-text" className={labelClass}>
              Texto / Descrição
            </label>
            <textarea
              id="cta-text"
              rows={3}
              value={cta.text}
              onChange={(e) => setCtaContent({ ...cta, text: e.target.value })}
              className={inputClass}
              placeholder="Texto exibido na seção CTA."
            />
          </div>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Ação (botão/link)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="cta-action-label" className={labelClass}>
              Texto do botão
            </label>
            <input
              id="cta-action-label"
              type="text"
              value={cta.action.label}
              onChange={(e) =>
                setCtaContent({
                  ...cta,
                  action: { ...cta.action, label: e.target.value },
                })
              }
              className={inputClass}
              placeholder="Ex.: Saiba mais"
            />
          </div>
          <div>
            <label htmlFor="cta-action-href" className={labelClass}>
              Link (URL)
            </label>
            <input
              id="cta-action-href"
              type="text"
              value={cta.action.href}
              onChange={(e) =>
                setCtaContent({
                  ...cta,
                  action: { ...cta.action, href: e.target.value },
                })
              }
              className={inputClass}
              placeholder="#contato ou /contato"
            />
          </div>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Fundo
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          V1 e V2: aplicado ao fundo da seção. V3: aplicado dentro do card. Deixe em branco no V3 para usar o padrão com detalhes em SVG.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="cta-backgroundImage" className={labelClass}>
              Imagem de fundo
            </label>
            <input
              id="cta-backgroundImage"
              type="text"
              value={cta.backgroundImage ?? ""}
              onChange={(e) =>
                setCtaContent({ ...cta, backgroundImage: e.target.value })
              }
              className={inputClass}
              placeholder="/cta-bg.jpg ou URL"
            />
          </div>
          <div>
            <label htmlFor="cta-backgroundColor" className={labelClass}>
              Cor de fundo
            </label>
            <input
              id="cta-backgroundColor"
              type="text"
              value={cta.backgroundColor ?? ""}
              onChange={(e) =>
                setCtaContent({ ...cta, backgroundColor: e.target.value })
              }
              className={inputClass}
              placeholder="Ex.: #f5f5f5, var(--color-surface)"
            />
          </div>
        </div>
      </section>

      <Link
        href="/settings"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 bg-[var(--color-primary)] text-white"
      >
        Voltar às configurações
      </Link>
    </div>
  );
}

function FeaturesContentForm({ sectionLabel }: { sectionLabel: string }) {
  const { content, setFeaturesContent } = useSectionsContent();
  const features = content.features;

  function updateListItem(index: number, value: string) {
    const next = [...features.listItems];
    next[index] = value;
    setFeaturesContent({ ...features, listItems: next });
  }

  function addListItem() {
    setFeaturesContent({
      ...features,
      listItems: [...features.listItems, ""],
    });
  }

  function removeListItem(index: number) {
    const next = features.listItems.filter((_, i) => i !== index);
    setFeaturesContent({ ...features, listItems: next });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Conteúdo: {sectionLabel}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          V1: texto à esquerda, imagem à direita. V2: imagem à esquerda, texto e lista à direita. Tagline, título, descrição, lista editável e botão.
        </p>
      </div>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Textos
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="features-badge" className={labelClass}>
              Tagline / Categoria
            </label>
            <input
              id="features-badge"
              type="text"
              value={features.badge}
              onChange={(e) => setFeaturesContent({ ...features, badge: e.target.value })}
              className={inputClass}
              placeholder="Ex.: Marketing Company"
            />
          </div>
          <div>
            <label htmlFor="features-title" className={labelClass}>
              Título
            </label>
            <input
              id="features-title"
              type="text"
              value={features.title}
              onChange={(e) => setFeaturesContent({ ...features, title: e.target.value })}
              className={inputClass}
              placeholder="Ex.: Grow Your Online Business With Us & Make Success"
            />
          </div>
          <div>
            <label htmlFor="features-description" className={labelClass}>
              Descrição
            </label>
            <textarea
              id="features-description"
              rows={3}
              value={features.description}
              onChange={(e) => setFeaturesContent({ ...features, description: e.target.value })}
              className={inputClass}
              placeholder="Parágrafo descritivo da seção."
            />
          </div>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Lista de itens (com ícone de check)
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Adicione ou remova itens. Cada item aparece com um check ao lado.
        </p>
        <div className="space-y-3">
          {features.listItems.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateListItem(index, e.target.value)}
                className={inputClass + " flex-1"}
                placeholder={`Item ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeListItem(index)}
                className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addListItem}
            className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
          >
            + Adicionar item
          </button>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Ação (botão)
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="features-action-label" className={labelClass}>
              Texto do botão
            </label>
            <input
              id="features-action-label"
              type="text"
              value={features.primaryAction.label}
              onChange={(e) =>
                setFeaturesContent({
                  ...features,
                  primaryAction: { ...features.primaryAction, label: e.target.value },
                })
              }
              className={inputClass}
              placeholder="Ex.: Explore More"
            />
          </div>
          <div>
            <label htmlFor="features-action-href" className={labelClass}>
              Link (URL)
            </label>
            <input
              id="features-action-href"
              type="text"
              value={features.primaryAction.href}
              onChange={(e) =>
                setFeaturesContent({
                  ...features,
                  primaryAction: { ...features.primaryAction, href: e.target.value },
                })
              }
              className={inputClass}
              placeholder="# ou /contato"
            />
          </div>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Imagem da seção
        </h2>
        <div>
          <label htmlFor="features-imageSrc" className={labelClass}>
            Caminho ou URL da ilustração/imagem
          </label>
          <input
            id="features-imageSrc"
            type="text"
            value={features.imageSrc}
            onChange={(e) => setFeaturesContent({ ...features, imageSrc: e.target.value })}
            className={inputClass}
            placeholder="/features-illustration.jpg ou URL"
          />
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
          Fundo e sobreposição
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Imagem e/ou cor de fundo; opcionalmente uma cor de sobreposição (ex.: rgba(0,0,0,0.3)) aplicada por cima.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="features-backgroundImage" className={labelClass}>
              Imagem de fundo
            </label>
            <input
              id="features-backgroundImage"
              type="text"
              value={features.backgroundImage ?? ""}
              onChange={(e) =>
                setFeaturesContent({ ...features, backgroundImage: e.target.value })
              }
              className={inputClass}
              placeholder="/bg.jpg ou URL"
            />
          </div>
          <div>
            <label htmlFor="features-backgroundColor" className={labelClass}>
              Cor de fundo
            </label>
            <input
              id="features-backgroundColor"
              type="text"
              value={features.backgroundColor ?? ""}
              onChange={(e) =>
                setFeaturesContent({ ...features, backgroundColor: e.target.value })
              }
              className={inputClass}
              placeholder="Ex.: #fff, var(--color-background)"
            />
          </div>
          <div>
            <label htmlFor="features-overlayColor" className={labelClass}>
              Cor da sobreposição (overlay)
            </label>
            <input
              id="features-overlayColor"
              type="text"
              value={features.overlayColor ?? ""}
              onChange={(e) =>
                setFeaturesContent({ ...features, overlayColor: e.target.value })
              }
              className={inputClass}
              placeholder="Ex.: rgba(0,0,0,0.2) ou transparent"
            />
          </div>
        </div>
      </section>

      <Link
        href="/settings"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 bg-[var(--color-primary)] text-white"
      >
        Voltar às configurações
      </Link>
    </div>
  );
}

function HeroContentForm({ sectionLabel }: { sectionLabel: string }) {
  const { content, setHeroContent } = useSectionsContent();
  const hero = content.hero;

  const slides =
    hero.slides && hero.slides.length >= 3
      ? hero.slides
      : [
          { imageSrc: hero.imageSrc },
          { imageSrc: hero.imageSrc },
          { imageSrc: hero.imageSrc },
        ];

  function update<K extends keyof HeroContent>(field: K, value: HeroContent[K]) {
    setHeroContent({ ...hero, [field]: value });
  }

  function updateSlideImage(index: 0 | 1 | 2, imageSrc: string) {
    const nextSlides = [...slides];
    nextSlides[index] = { imageSrc };
    setHeroContent({ ...hero, slides: nextSlides });
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
          Imagem destaque mostrada no Hero 1
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
          Fundo (Hero 1 e 2)
        </h2>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Imagem ou cor de fundo da seção Hero 1 e Hero 2. Deixe em branco para
          usar o padrão do tema.
        </p>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="hero-backgroundImage"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Imagem de fundo
            </label>
            <input
              id="hero-backgroundImage"
              type="text"
              value={hero.backgroundImage ?? ""}
              onChange={(e) => update("backgroundImage", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
              placeholder="/bg.jpg ou URL"
            />
          </div>
          <div>
            <label
              htmlFor="hero-backgroundColor"
              className="mb-1 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Cor de fundo
            </label>
            <input
              id="hero-backgroundColor"
              type="text"
              value={hero.backgroundColor ?? ""}
              onChange={(e) => update("backgroundColor", e.target.value)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
              placeholder="Ex.: #f0f0f0, rgb(240,240,240), var(--color-surface)"
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
          Imagens do slide (Hero V3)
        </h2>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Três imagens para o carrossel do Hero V3. Coloque os arquivos em{" "}
          <code className="rounded px-1" style={{ backgroundColor: "var(--color-border)" }}>public/</code> e use o caminho começando com /.
        </p>
        <div className="space-y-4">
          {([0, 1, 2] as const).map((i) => (
            <div key={i}>
              <label
                htmlFor={`hero-slide-${i}`}
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--color-text)" }}
              >
                Imagem slide {i + 1}
              </label>
              <input
                id={`hero-slide-${i}`}
                type="text"
                value={slides[i].imageSrc}
                onChange={(e) => updateSlideImage(i, e.target.value)}
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
                placeholder={i === 0 ? "/slide1.jpg" : `/slide${i + 1}.jpg`}
              />
            </div>
          ))}
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
