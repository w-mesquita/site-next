"use client";

import { useSectionsConfig } from "@/lib/sections-config-context";
import type { HeaderContent, HeaderNavItem, HeaderNavIconKey } from "@/types/header-config";
import { DEFAULT_HEADER_CONTENT, HEADER_NAV_ICON_LABELS, HEADER_SECTION_INDEX_TOP } from "@/types/header-config";
import type { PageId, SectionType } from "@/types/sections";
import { PAGE_IDS, SECTION_VARIANT_LABELS } from "@/types/sections";
import { ColorPicker } from "@/components/ui/ColorPicker";
import Link from "next/link";

const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  cta: "CTA",
  features: "Features",
  services: "Services",
  partners: "Partners",
  contact: "Contact",
  none: "—",
};

const PAGE_HREF: Record<PageId, string> = { home: "/", contact: "/contact", about: "/about" };
const PAGE_LABELS_MENU: Record<PageId, string> = { home: "Início", contact: "Contato", about: "Sobre" };
const CUSTOM_HREF_VALUE = "__custom__";

const formSectionClass = "rounded-lg border p-6 border-[var(--color-border)] bg-[var(--color-surface)]";
const labelClass = "mb-1 block text-sm font-medium text-[var(--color-text)]";
const inputClass = "w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--color-border)]";

export function HeaderConfigForm() {
  const { config, setConfig } = useSectionsConfig();
  const headerContent: HeaderContent = config.headerContent ?? DEFAULT_HEADER_CONTENT;
  const homeSlots = config.pages?.home?.pageSections ?? [];

  function setHeaderContent(next: HeaderContent) {
    setConfig({ ...config, headerContent: next });
  }

  function setTopBar(partial: Partial<HeaderContent["topBar"]>) {
    setHeaderContent({ ...headerContent, topBar: { ...headerContent.topBar, ...partial } });
  }

  function setMenuItem(index: number, item: HeaderNavItem) {
    const menuItems = [...headerContent.menuItems];
    menuItems[index] = item;
    setHeaderContent({ ...headerContent, menuItems });
  }

  function addMenuItem() {
    setHeaderContent({
      ...headerContent,
      menuItems: [...headerContent.menuItems, { label: "Novo", icon: "none", href: "#" }],
    });
  }

  function removeMenuItem(index: number) {
    const menuItems = headerContent.menuItems.filter((_, i) => i !== index);
    setHeaderContent({ ...headerContent, menuItems: menuItems.length ? menuItems : [{ label: "Início", icon: "home", href: "/" }] });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text)]">Editar Header</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Top bar, itens do menu (com ícones e opção de rolar para seções na home), texto em maiúsculas e botão CTA.
        </p>
      </div>

      {/* Top bar */}
      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Faixa superior (Top bar)</h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Faixa acima do header com telefone, e-mail e opcionalmente ícones de redes sociais.
        </p>
        <label className="mb-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={headerContent.topBar.visible}
            onChange={(e) => setTopBar({ visible: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--color-border)]"
            style={{ accentColor: "var(--color-primary)" }}
          />
          <span className="text-sm font-medium text-[var(--color-text)]">Exibir top bar</span>
        </label>
        {headerContent.topBar.visible && (
          <div className="space-y-4">
            <div>
              <label htmlFor="header-topbar-phone" className={labelClass}>Telefone</label>
              <input
                id="header-topbar-phone"
                type="text"
                value={headerContent.topBar.phone}
                onChange={(e) => setTopBar({ phone: e.target.value })}
                className={inputClass}
                placeholder="+55 (11) 99999-9999"
              />
            </div>
            <div>
              <label htmlFor="header-topbar-email" className={labelClass}>E-mail</label>
              <input
                id="header-topbar-email"
                type="text"
                value={headerContent.topBar.email}
                onChange={(e) => setTopBar({ email: e.target.value })}
                className={inputClass}
                placeholder="contato@exemplo.com"
              />
            </div>
            <ColorPicker
              id="header-topbar-bg"
              label="Cor de fundo"
              value={headerContent.topBar.backgroundColor ?? ""}
              onChange={(v) => setTopBar({ backgroundColor: v?.trim() ? v : null })}
              placeholder="Vazio = padrão do tema"
            />
            <ColorPicker
              id="header-topbar-text"
              label="Cor do texto e ícones"
              value={headerContent.topBar.textColor ?? ""}
              onChange={(v) => setTopBar({ textColor: v?.trim() ? v : null })}
              placeholder="Vazio = padrão"
            />
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={headerContent.topBar.showSocial}
                onChange={(e) => setTopBar({ showSocial: e.target.checked })}
                className="h-4 w-4 rounded border-[var(--color-border)]"
                style={{ accentColor: "var(--color-primary)" }}
              />
              <span className="text-sm font-medium text-[var(--color-text)]">Exibir ícones das redes sociais na top bar</span>
            </label>
            <p className="text-xs text-[var(--color-text-muted)]">Se desmarcado, as redes sociais ficam apenas no header principal.</p>
          </div>
        )}
      </section>

      {/* Aparência do menu */}
      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Aparência do menu</h2>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={headerContent.menuUppercase}
            onChange={(e) => setHeaderContent({ ...headerContent, menuUppercase: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--color-border)]"
            style={{ accentColor: "var(--color-primary)" }}
          />
          <span className="text-sm font-medium text-[var(--color-text)]">Texto do menu em MAIÚSCULAS</span>
        </label>
      </section>

      {/* Itens do menu */}
      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Itens do menu</h2>
        <label className="mb-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={headerContent.isLanding}
            onChange={(e) => setHeaderContent({ ...headerContent, isLanding: e.target.checked })}
            className="h-4 w-4 rounded border-[var(--color-border)]"
            style={{ accentColor: "var(--color-primary)" }}
          />
          <span className="text-sm font-medium text-[var(--color-text)]">Site em modo landing (links podem rolar para seções da home)</span>
        </label>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          {headerContent.isLanding
            ? "Com modo landing ativo, escolha a seção da home para onde cada item deve rolar, ou use URL."
            : "Label, ícone e destino: página (Início, Contato, Sobre) ou URL customizada."}
        </p>
        <div className="space-y-6">
          {headerContent.menuItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text)]">Item {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  className="rounded px-2 py-1 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
                >
                  Remover
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => setMenuItem(index, { ...item, label: e.target.value })}
                    className={inputClass}
                    placeholder="Ex.: Início"
                  />
                </div>
                <div>
                  <label className={labelClass}>Ícone</label>
                  <select
                    value={item.icon}
                    onChange={(e) => setMenuItem(index, { ...item, icon: e.target.value as HeaderNavIconKey })}
                    className={inputClass}
                  >
                    {(Object.keys(HEADER_NAV_ICON_LABELS) as HeaderNavIconKey[]).map((key) => (
                      <option key={key} value={key}>{HEADER_NAV_ICON_LABELS[key]}</option>
                    ))}
                  </select>
                </div>
              </div>
              {headerContent.isLanding ? (
                <div className="mt-4 space-y-2">
                  <label className={labelClass}>Na home: rolar para seção ou link</label>
                  <select
                    value={item.sectionIndex ?? -1}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      const sectionIndex = v === HEADER_SECTION_INDEX_TOP ? HEADER_SECTION_INDEX_TOP : (v >= 0 && v <= 6 ? v : undefined);
                      const href = sectionIndex === HEADER_SECTION_INDEX_TOP ? "/" : (sectionIndex !== undefined ? `/#section-${sectionIndex}` : item.href);
                      setMenuItem(index, { ...item, sectionIndex, href });
                    }}
                    className={inputClass}
                  >
                    <option value={-1}>Usar URL abaixo (não rolar)</option>
                    <option value={HEADER_SECTION_INDEX_TOP}>Topo da página (início do site)</option>
                    {homeSlots.slice(0, 7).map((slot, i) => (
                      <option key={i} value={i}>
                        Seção {i} ({SECTION_TYPE_LABELS[slot?.type ?? "none"]} {slot?.variant ? SECTION_VARIANT_LABELS[slot.variant] : ""})
                      </option>
                    ))}
                  </select>
                  <div>
                    <label className={labelClass}>URL (quando não for rolar)</label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => setMenuItem(index, { ...item, href: e.target.value })}
                      className={inputClass}
                      placeholder="/ ou /contact"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <label className={labelClass}>Destino</label>
                  <select
                    value={PAGE_IDS.some((id) => PAGE_HREF[id] === item.href) ? item.href : CUSTOM_HREF_VALUE}
                    onChange={(e) => {
                      const v = e.target.value;
                      const href = v === CUSTOM_HREF_VALUE ? item.href : v;
                      setMenuItem(index, { ...item, href });
                    }}
                    className={inputClass}
                  >
                    {PAGE_IDS.map((id) => (
                      <option key={id} value={PAGE_HREF[id]}>{PAGE_LABELS_MENU[id]}</option>
                    ))}
                    <option value={CUSTOM_HREF_VALUE}>URL customizada</option>
                  </select>
                  {(PAGE_IDS.every((id) => PAGE_HREF[id] !== item.href) || item.href === "" || item.href.startsWith("/#")) && (
                    <div>
                      <label className={labelClass}>URL customizada</label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => setMenuItem(index, { ...item, href: e.target.value })}
                        className={inputClass}
                        placeholder="/outra-pagina ou https://..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMenuItem}
            className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
          >
            + Adicionar item
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className={formSectionClass}>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Botão CTA</h2>
        <label className="mb-4 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={headerContent.cta !== null}
            onChange={(e) =>
              setHeaderContent({
                ...headerContent,
                cta: e.target.checked ? { label: "Fale conosco", href: "/contact" } : null,
              })
            }
            className="h-4 w-4 rounded border-[var(--color-border)]"
            style={{ accentColor: "var(--color-primary)" }}
          />
          <span className="text-sm font-medium text-[var(--color-text)]">Exibir botão CTA no header</span>
        </label>
        {headerContent.cta && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Texto do botão</label>
              <input
                type="text"
                value={headerContent.cta.label}
                onChange={(e) =>
                  setHeaderContent({ ...headerContent, cta: { ...headerContent.cta!, label: e.target.value } })
                }
                className={inputClass}
                placeholder="Fale conosco"
              />
            </div>
            <div>
              <label className={labelClass}>URL</label>
              <input
                type="text"
                value={headerContent.cta.href}
                onChange={(e) =>
                  setHeaderContent({ ...headerContent, cta: { ...headerContent.cta!, href: e.target.value } })
                }
                className={inputClass}
                placeholder="/contact"
              />
            </div>
          </div>
        )}
      </section>

      <Link
        href="/settings"
        className="inline-block rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        Voltar às configurações
      </Link>
    </div>
  );
}
