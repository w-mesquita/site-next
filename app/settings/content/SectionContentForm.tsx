"use client";

import { useSectionsContent } from "@/lib/sections-content-context";
import type { CtaContent, FeaturesContent, HeroContent, SectionTypeWithContent, ServicesContent, ServicesCardIconKey, ServicesCardItem, SlotContentKey } from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import { ColorPicker } from "@/components/ui/ColorPicker";
import Link from "next/link";

interface SectionContentFormProps {
  sectionType: SectionTypeWithContent;
  sectionLabel: string;
  /** Quando definido, edita o conteúdo deste slot (cada seção salva independente). */
  slotKey?: SlotContentKey;
  /** Quando definido com slotKey, exibe botão "Voltar à configuração da página" (ex.: /config/home). */
  backToConfigHref?: string;
}

const formSectionClass =
  "rounded-lg border p-6 border-[var(--color-border)] bg-[var(--color-surface)]";
const labelClass = "mb-1 block text-sm font-medium text-[var(--color-text)]";
const inputClass =
  "w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--color-border)]";

export function SectionContentForm({
  sectionType,
  sectionLabel,
  slotKey,
  backToConfigHref,
}: SectionContentFormProps) {
  const backToConfigLink =
    slotKey && backToConfigHref ? (
      <Link
        href={backToConfigHref}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
      >
        <BackIcon className="h-4 w-4" />
        Voltar à configuração da página
      </Link>
    ) : null;

  let form: React.ReactNode = null;
  if (sectionType === "hero") {
    form = <HeroContentForm sectionLabel={sectionLabel} slotKey={slotKey} />;
  } else if (sectionType === "cta") {
    form = <CtaContentForm sectionLabel={sectionLabel} slotKey={slotKey} />;
  } else if (sectionType === "features") {
    form = <FeaturesContentForm sectionLabel={sectionLabel} slotKey={slotKey} />;
  } else if (sectionType === "services") {
    form = <ServicesContentForm sectionLabel={sectionLabel} slotKey={slotKey} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      {backToConfigLink}
      {form}
    </div>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function CtaContentForm({
  sectionLabel,
  slotKey,
}: {
  sectionLabel: string;
  slotKey?: SlotContentKey;
}) {
  const { content, getContentForSlot, setContentForSlot, setCtaContent } = useSectionsContent();
  const cta: CtaContent = slotKey
    ? (getContentForSlot(slotKey, "cta") as CtaContent)
    : (content.cta ?? (getDefaultContentForSectionType("cta") as CtaContent));
  const setCta = slotKey
    ? (c: CtaContent) => setContentForSlot(slotKey, "cta", c)
    : setCtaContent;

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
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
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
              onChange={(e) => setCta({ ...cta, text: e.target.value })}
              className={inputClass}
              placeholder="Texto exibido na seção CTA."
            />
          </div>
          <ColorPicker
            id="cta-textColor"
            label="Cor do texto"
            value={cta.textColor ?? ""}
            onChange={(v) => setCta({ ...cta, textColor: v })}
            hint="Quando o fundo atrapalha a leitura, informe uma cor (ex.: #ffffff). Título e parágrafo usam essa cor; parágrafo com leve esmaecimento. Vazio = tema."
            placeholder="#ffffff (vazio = tema)"
          />
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
                setCta({
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
                setCta({
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
                setCta({ ...cta, backgroundImage: e.target.value })
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
                setCta({ ...cta, backgroundColor: e.target.value })
              }
              className={inputClass}
              placeholder="Ex.: #f5f5f5, var(--color-surface)"
            />
          </div>
          <ColorPicker
            id="cta-overlayColor"
            label="Cor de sobreposição (com transparência)"
            value={cta.overlayColor ?? ""}
            onChange={(v) => setCta({ ...cta, overlayColor: v })}
            withOpacity
            hint="Com imagem de fundo: sobrepõe a cor. Sem imagem: usa como cor de fundo. Deixe vazio para o padrão."
            placeholder="rgba ou #hex (vazio = padrão)"
          />
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

function FeaturesContentForm({
  sectionLabel,
  slotKey,
}: {
  sectionLabel: string;
  slotKey?: SlotContentKey;
}) {
  const { content, getContentForSlot, setContentForSlot, setFeaturesContent } = useSectionsContent();
  const features: FeaturesContent = slotKey
    ? (getContentForSlot(slotKey, "features") as FeaturesContent)
    : (content.features ?? (getDefaultContentForSectionType("features") as FeaturesContent));
  const setFeatures = slotKey
    ? (f: FeaturesContent) => setContentForSlot(slotKey, "features", f)
    : setFeaturesContent;

  function updateListItem(index: number, value: string) {
    const next = [...features.listItems];
    next[index] = value;
    setFeatures({ ...features, listItems: next });
  }

  function addListItem() {
    setFeatures({
      ...features,
      listItems: [...features.listItems, ""],
    });
  }

  function removeListItem(index: number) {
    const next = features.listItems.filter((_, i) => i !== index);
    setFeatures({ ...features, listItems: next });
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
              onChange={(e) => setFeatures({ ...features, badge: e.target.value })}
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
              onChange={(e) => setFeatures({ ...features, title: e.target.value })}
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
              onChange={(e) => setFeatures({ ...features, description: e.target.value })}
              className={inputClass}
              placeholder="Parágrafo descritivo da seção."
            />
          </div>
          <ColorPicker
            id="features-textColor"
            label="Cor do texto"
            value={features.textColor ?? ""}
            onChange={(v) => setFeatures({ ...features, textColor: v })}
            hint="Quando o fundo atrapalha a leitura, informe uma cor (ex.: #ffffff). Títulos usam essa cor; textos com leve esmaecimento. Vazio = tema."
            placeholder="#ffffff (vazio = tema)"
          />
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
                setFeatures({
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
                setFeatures({
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
            onChange={(e) => setFeatures({ ...features, imageSrc: e.target.value })}
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
                setFeatures({ ...features, backgroundImage: e.target.value })
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
                setFeatures({ ...features, backgroundColor: e.target.value })
              }
              className={inputClass}
              placeholder="Ex.: #fff, var(--color-background)"
            />
          </div>
          <ColorPicker
            id="features-overlayColor"
            label="Cor de sobreposição (com transparência)"
            value={features.overlayColor ?? ""}
            onChange={(v) => setFeatures({ ...features, overlayColor: v })}
            withOpacity
            hint="Com imagem de fundo: sobrepõe a cor. Sem imagem: usa como cor de fundo. Deixe vazio para o padrão."
            placeholder="rgba ou #hex (vazio = padrão)"
          />
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

const SERVICES_ICON_OPTIONS: { value: ServicesCardIconKey; label: string }[] = [
  { value: "gear", label: "Engrenagem" },
  { value: "mail", label: "E-mail" },
  { value: "headphones", label: "Fone" },
  { value: "bell", label: "Sino" },
  { value: "chart", label: "Gráfico" },
  { value: "palette", label: "Paleta" },
];

function ServicesContentForm({
  sectionLabel,
  slotKey,
}: {
  sectionLabel: string;
  slotKey?: SlotContentKey;
}) {
  const { content, getContentForSlot, setContentForSlot, setServicesContent } = useSectionsContent();
  const services: ServicesContent = slotKey
    ? (getContentForSlot(slotKey, "services") as ServicesContent)
    : (content.services ?? (getDefaultContentForSectionType("services") as ServicesContent));
  const setServices = slotKey
    ? (s: ServicesContent) => setContentForSlot(slotKey, "services", s)
    : setServicesContent;

  const cards = services.cards?.length ? services.cards : [{ icon: "gear" as const, title: "", message: "", highlighted: false }];

  function setCard(index: number, card: ServicesCardItem) {
    const next = [...cards];
    next[index] = card;
    setServices({ ...services, cards: next });
  }

  function addCard() {
    setServices({ ...services, cards: [...cards, { icon: "gear", title: "", message: "", highlighted: false }] });
  }

  function removeCard(index: number) {
    const next = cards.filter((_, i) => i !== index);
    setServices({ ...services, cards: next.length ? next : [{ icon: "gear", title: "", message: "", highlighted: false }] });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">
          Conteúdo: {sectionLabel}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Textos da seção e cards com ícone, título, mensagem e opção de destaque (cor e detalhe visual).
        </p>
      </div>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Textos da seção</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="services-badge" className={labelClass}>Tagline / Badge</label>
            <input
              id="services-badge"
              type="text"
              value={services.badge}
              onChange={(e) => setServices({ ...services, badge: e.target.value })}
              className={inputClass}
              placeholder="Ex.: Destaque opcional"
            />
          </div>
          <div>
            <label htmlFor="services-title" className={labelClass}>Título</label>
            <input
              id="services-title"
              type="text"
              value={services.title}
              onChange={(e) => setServices({ ...services, title: e.target.value })}
              className={inputClass}
              placeholder="Ex.: Save Time Managing Your Business..."
            />
          </div>
          <div>
            <label htmlFor="services-description" className={labelClass}>Descrição</label>
            <textarea
              id="services-description"
              rows={3}
              value={services.description}
              onChange={(e) => setServices({ ...services, description: e.target.value })}
              className={inputClass}
              placeholder="Parágrafo abaixo do título."
            />
          </div>
          <ColorPicker
            id="services-textColor"
            label="Cor do texto"
            value={services.textColor ?? ""}
            onChange={(v) => setServices({ ...services, textColor: v })}
            hint="Opcional. Deixe vazio para usar as cores do tema."
            placeholder="#hex (vazio = tema)"
          />
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Cards</h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Cada card: ícone, título, mensagem. Marque &quot;Destaque&quot; para aplicar cor de destaque e detalhe visual (como o card azul).
        </p>
        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text)]">Card {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="rounded px-2 py-1 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
                >
                  Remover
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Ícone</label>
                  <select
                    value={card.icon}
                    onChange={(e) => setCard(index, { ...card, icon: e.target.value as ServicesCardIconKey })}
                    className={inputClass}
                  >
                    {SERVICES_ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2 sm:items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={card.highlighted}
                      onChange={(e) => setCard(index, { ...card, highlighted: e.target.checked })}
                      className="rounded border-[var(--color-border)]"
                    />
                    <span className="text-sm font-medium text-[var(--color-text)]">Destaque (cor + detalhe)</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Título do card</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => setCard(index, { ...card, title: e.target.value })}
                  className={inputClass}
                  placeholder="Ex.: Product Management"
                />
              </div>
              <div className="mt-4">
                <label className={labelClass}>Mensagem</label>
                <textarea
                  rows={2}
                  value={card.message}
                  onChange={(e) => setCard(index, { ...card, message: e.target.value })}
                  className={inputClass}
                  placeholder="Descrição do serviço."
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCard}
            className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
          >
            + Adicionar card
          </button>
        </div>
      </section>

      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Fundo da seção</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="services-backgroundImage" className={labelClass}>Imagem de fundo</label>
            <input
              id="services-backgroundImage"
              type="text"
              value={services.backgroundImage ?? ""}
              onChange={(e) => setServices({ ...services, backgroundImage: e.target.value })}
              className={inputClass}
              placeholder="/bg.jpg ou URL"
            />
          </div>
          <div>
            <label htmlFor="services-backgroundColor" className={labelClass}>Cor de fundo</label>
            <input
              id="services-backgroundColor"
              type="text"
              value={services.backgroundColor ?? ""}
              onChange={(e) => setServices({ ...services, backgroundColor: e.target.value })}
              className={inputClass}
              placeholder="Ex.: #f8fafc, var(--color-surface)"
            />
          </div>
          <ColorPicker
            id="services-overlayColor"
            label="Cor de sobreposição"
            value={services.overlayColor ?? ""}
            onChange={(v) => setServices({ ...services, overlayColor: v })}
            withOpacity
            hint="Com imagem de fundo: overlay por cima. Vazio = padrão."
            placeholder="rgba ou #hex"
          />
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

function HeroContentForm({
  sectionLabel,
  slotKey,
}: {
  sectionLabel: string;
  slotKey?: SlotContentKey;
}) {
  const { content, getContentForSlot, setContentForSlot, setHeroContent } = useSectionsContent();
  const hero: HeroContent = slotKey
    ? (getContentForSlot(slotKey, "hero") as HeroContent)
    : (content.hero ?? (getDefaultContentForSectionType("hero") as HeroContent));
  const setHero = slotKey
    ? (h: HeroContent) => setContentForSlot(slotKey, "hero", h)
    : setHeroContent;

  const slides =
    hero.slides && hero.slides.length >= 3
      ? hero.slides
      : [
          { imageSrc: hero.imageSrc },
          { imageSrc: hero.imageSrc },
          { imageSrc: hero.imageSrc },
        ];

  function update<K extends keyof HeroContent>(field: K, value: HeroContent[K]) {
    setHero({ ...hero, [field]: value });
  }

  function updateSlideImage(index: 0 | 1 | 2, imageSrc: string) {
    const nextSlides = [...slides];
    nextSlides[index] = { imageSrc };
    setHero({ ...hero, slides: nextSlides });
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
          <ColorPicker
            id="hero-textColor"
            label="Cor do texto"
            value={hero.textColor ?? ""}
            onChange={(v) => update("textColor", v)}
            hint="Quando o fundo atrapalha a leitura, informe uma cor (ex.: #ffffff). Títulos usam essa cor; parágrafos usam a mesma com leve esmaecimento. Vazio = cor padrão do tema."
            placeholder="#ffffff (vazio = tema)"
          />
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
          <ColorPicker
            id="hero-overlayColor"
            label="Cor de sobreposição (com transparência)"
            value={hero.overlayColor ?? ""}
            onChange={(v) => update("overlayColor", v)}
            withOpacity
            hint="Com imagem de fundo: sobrepõe a cor. Sem imagem: usa como cor de fundo. Deixe vazio para o padrão."
            placeholder="rgba ou #hex (vazio = padrão)"
          />
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
