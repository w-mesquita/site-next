"use client";

import { useSectionsConfig } from "@/lib/sections-config-context";
import type { SectionVariant } from "@/types/sections";
import { SECTION_VARIANTS } from "@/types/sections";
import Link from "next/link";

const LABELS: Record<"header" | "hero" | "footer", string> = {
  header: "Header",
  hero: "Hero",
  footer: "Footer",
};

export function SettingsForm() {
  const { config, setConfig } = useSectionsConfig();

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
