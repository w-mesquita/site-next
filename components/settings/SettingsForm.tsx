"use client";

import { useGlobalConfig } from "@/lib/global-config-context";
import { useSectionsConfig } from "@/lib/sections-config-context";
import { useSocialConfig } from "@/lib/social-config-context";
import { useWhatsAppConfig } from "@/lib/whatsapp-config-context";
import type { PageId, SectionVariant } from "@/types/sections";
import { PAGE_IDS, SECTION_VARIANT_LABELS } from "@/types/sections";
import type { SocialNetworkKey } from "@/types/social";
import { SOCIAL_NETWORKS } from "@/types/social";
import { DEFAULT_PRIMARY_COLOR } from "@/types/global-config";
import { ColorPicker } from "@/components/ui/ColorPicker";
import Link from "next/link";

const PAGE_LABELS: Record<PageId, string> = {
  home: "Home",
  contact: "Contato",
  about: "Sobre",
};

const SOCIAL_LABELS: Record<SocialNetworkKey, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function SettingsForm() {
  const { config: globalConfig, setPrimaryColor, setLogoUrl } = useGlobalConfig();
  const { config, setConfig } = useSectionsConfig();
  const { config: whatsappConfig, setConfig: setWhatsAppConfig } = useWhatsAppConfig();
  const { config: socialConfig, setConfig: setSocialConfig } = useSocialConfig();

  function handleChange(section: "header" | "footer", value: SectionVariant) {
    setConfig({ ...config, [section]: value });
  }

  function togglePage(pageId: PageId) {
    const enabled = config.enabledPages.includes(pageId);
    const enabledPages = enabled
      ? config.enabledPages.filter((p) => p !== pageId)
      : [...config.enabledPages, pageId];
    setConfig({ ...config, enabledPages });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          Configurações
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Altere as variantes do Header e do Footer e escolha as páginas exibidas. As preferências são salvas no navegador e
          aplicadas em todo o site.
        </p>
      </div>

      {/* Configurações globais */}
      <section
        className="rounded-lg border p-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        aria-labelledby="global-settings-heading"
      >
        <h2
          id="global-settings-heading"
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Configurações globais
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Cor primária e logo aplicados em todo o site. Salvos no navegador.
        </p>
        <div className="space-y-4">
          <ColorPicker
            id="settings-primary-color"
            label="Cor primária"
            value={globalConfig.primaryColor || DEFAULT_PRIMARY_COLOR}
            onChange={(v) => setPrimaryColor(v || DEFAULT_PRIMARY_COLOR)}
            placeholder="#2563eb"
          />
          <div>
            <label
              htmlFor="settings-logo-url"
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Logo (URL ou caminho)
            </label>
            <input
              id="settings-logo-url"
              type="text"
              value={globalConfig.logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="/logo.svg ou https://..."
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            />
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Deixe em branco para exibir o texto &quot;Logo&quot; no header e footer.
            </p>
          </div>
        </div>
      </section>

      {/* Header e Footer */}
      <section
        className="rounded-lg border p-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        aria-labelledby="header-footer-heading"
      >
        <h2
          id="header-footer-heading"
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Header e Footer
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="settings-header"
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Header
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <select
                id="settings-header"
                value={config.header}
                onChange={(e) => handleChange("header", e.target.value as SectionVariant)}
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] sm:w-auto"
                style={{ borderColor: "var(--color-border)" }}
              >
                {(["v1", "v2", "v3"] as const).map((v) => (
                  <option key={v} value={v}>
                    Variante {SECTION_VARIANT_LABELS[v]}
                  </option>
                ))}
              </select>
              <Link
                href="/settings/header"
                className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                Editar Header
              </Link>
            </div>
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Use &quot;Editar Header&quot; para top bar, menu com ícones, maiúsculas e modo landing.
            </p>
          </div>
          <div>
            <label
              htmlFor="settings-footer"
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Footer
            </label>
            <select
              id="settings-footer"
              value={config.footer}
              onChange={(e) => handleChange("footer", e.target.value as SectionVariant)}
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              {(["v1", "v2", "v3"] as const).map((v) => (
                <option key={v} value={v}>
                  Variante {SECTION_VARIANT_LABELS[v]}
                </option>
              ))}
            </select>
          </div>
        </form>
      </section>

      {/* Páginas */}
      <section
        className="rounded-lg border p-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        aria-labelledby="pages-heading"
      >
        <h2
          id="pages-heading"
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Páginas
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Marque as páginas que deseja exibir no site. Use o ícone de engrenagem para configurar as 7 seções do corpo de cada página.
        </p>
        <div className="space-y-3">
          {PAGE_IDS.map((pageId) => {
            const enabled = config.enabledPages.includes(pageId);
            return (
              <div
                key={pageId}
                className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
                style={{ borderColor: "var(--color-border)" }}
              >
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => togglePage(pageId)}
                    className="h-4 w-4 rounded border-[var(--color-border)]"
                    style={{ accentColor: "var(--color-primary)" }}
                  />
                  <span
                    className="font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {PAGE_LABELS[pageId]}
                  </span>
                </label>
                {enabled && (
                  <Link
                    href={`/config/${pageId}`}
                    className="rounded p-2 transition hover:bg-[var(--color-background)]"
                    title={`Configurar seções de ${PAGE_LABELS[pageId]}`}
                    style={{ color: "var(--color-text-muted)" }}
                    aria-label={`Configurar ${PAGE_LABELS[pageId]}`}
                  >
                    <SettingsIcon className="h-5 w-5" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Seção WhatsApp (plugin flutuante) */}
      <section
        className="rounded-lg border p-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        aria-labelledby="whatsapp-heading"
      >
        <h2
          id="whatsapp-heading"
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          WhatsApp (ícone flutuante)
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Exiba um ícone flutuante à direita da tela para contato via WhatsApp. Informe o número com
          DDI (ex: 5511999999999).
        </p>
        <div className="space-y-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={whatsappConfig.enabled}
              onChange={(e) =>
                setWhatsAppConfig({ ...whatsappConfig, enabled: e.target.checked })
              }
              className="h-4 w-4 rounded border-[var(--color-border)]"
              style={{ accentColor: "var(--color-primary)" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
              Ativar exibição do ícone
            </span>
          </label>
          <div>
            <label
              htmlFor="settings-whatsapp-phone"
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              Número (com DDI)
            </label>
            <input
              id="settings-whatsapp-phone"
              type="tel"
              value={whatsappConfig.phone}
              onChange={(e) =>
                setWhatsAppConfig({ ...whatsappConfig, phone: e.target.value })
              }
              placeholder="5511999999999"
              className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>
        </div>
      </section>

      {/* Seção Redes sociais (header e footer) */}
      <section
        className="rounded-lg border p-6"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        aria-labelledby="social-heading"
      >
        <h2
          id="social-heading"
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--color-text)" }}
        >
          Redes sociais
        </h2>
        <p className="mb-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Ícones exibidos no header e no footer. Ative e informe a URL de cada rede. Uma única cor personalizada (hex) aplica-se a todos os ícones quando marcado; desmarcado, cada um usa a cor padrão da marca.
        </p>
        <div className="space-y-4">
          {SOCIAL_NETWORKS.map((key) => (
            <div
              key={key}
              className="rounded-lg border p-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <label className="mb-3 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={socialConfig[key].enabled}
                  onChange={(e) =>
                    setSocialConfig({
                      ...socialConfig,
                      [key]: { ...socialConfig[key], enabled: e.target.checked },
                    })
                  }
                  className="h-4 w-4 rounded border-[var(--color-border)]"
                  style={{ accentColor: "var(--color-primary)" }}
                />
                <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                  {SOCIAL_LABELS[key]}
                </span>
              </label>
              <label htmlFor={`settings-social-${key}`} className="mb-1 block text-xs" style={{ color: "var(--color-text-muted)" }}>
                URL
              </label>
              <input
                id={`settings-social-${key}`}
                type="url"
                value={socialConfig[key].url}
                onChange={(e) =>
                  setSocialConfig({
                    ...socialConfig,
                    [key]: { ...socialConfig[key], url: e.target.value },
                  })
                }
                placeholder={`https://${key}.com/...`}
                className="w-full rounded-lg border bg-[var(--color-background)] px-4 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>
          ))}
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--color-border)" }}>
            <label className="mb-2 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={socialConfig.useCustomColor}
                onChange={(e) =>
                  setSocialConfig({ ...socialConfig, useCustomColor: e.target.checked })
                }
                className="h-4 w-4 rounded border-[var(--color-border)]"
                style={{ accentColor: "var(--color-primary)" }}
              />
              <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                Usar cor personalizada para todos os ícones (hex)
              </span>
            </label>
            {socialConfig.useCustomColor && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="settings-social-custom-color"
                  type="text"
                  value={socialConfig.customColor}
                  onChange={(e) =>
                    setSocialConfig({ ...socialConfig, customColor: e.target.value })
                  }
                  placeholder="#000000"
                  maxLength={7}
                  className="w-28 rounded-lg border bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  style={{ borderColor: "var(--color-border)" }}
                />
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  ex: #E4405F
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        As alterações são aplicadas imediatamente. No futuro, essas opções poderão vir de uma API.
      </p>

      <Link
        href="/"
        className="inline-block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
        style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
        }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
