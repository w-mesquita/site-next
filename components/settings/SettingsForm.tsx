"use client";

import { useSectionsConfig } from "@/lib/sections-config-context";
import { useWhatsAppConfig } from "@/lib/whatsapp-config-context";
import { useSocialConfig } from "@/lib/social-config-context";
import type { SectionVariant } from "@/types/sections";
import type { SocialNetworkKey } from "@/types/social";
import { SOCIAL_NETWORKS } from "@/types/social";
import { SECTION_VARIANTS } from "@/types/sections";
import Link from "next/link";

const LABELS: Record<"header" | "hero" | "footer", string> = {
  header: "Header",
  hero: "Hero",
  footer: "Footer",
};

const SOCIAL_LABELS: Record<SocialNetworkKey, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

export function SettingsForm() {
  const { config, setConfig } = useSectionsConfig();
  const { config: whatsappConfig, setConfig: setWhatsAppConfig } = useWhatsAppConfig();
  const { config: socialConfig, setConfig: setSocialConfig } = useSocialConfig();

  function handleChange(section: "header" | "hero" | "footer", value: SectionVariant) {
    setConfig({ ...config, [section]: value });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
          Configurações
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Altere as variantes do Header, Hero e Footer. As preferências são salvas no navegador e
          aplicadas em todo o site.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {(["header", "hero", "footer"] as const).map((section) => (
          <div key={section}>
            <label
              htmlFor={`settings-${section}`}
              className="mb-2 block text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              {LABELS[section]}
            </label>
            <select
              id={`settings-${section}`}
              value={config[section]}
              onChange={(e) => handleChange(section, e.target.value as SectionVariant)}
              className="w-full rounded-lg border bg-[var(--color-surface)] px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              {SECTION_VARIANTS.map((v) => (
                <option key={v} value={v}>
                  Variante {v.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        ))}
      </form>

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
