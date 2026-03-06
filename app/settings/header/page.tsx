import type { Metadata } from "next";
import { HeaderConfigForm } from "@/components/settings/HeaderConfigForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editar Header | Configurações",
  description: "Configure a top bar, o menu e o modo landing do header.",
};

export default function SettingsHeaderPage() {
  return (
    <main className="min-h-[calc(100dvh-64px)] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/settings"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface)]"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Voltar às configurações
        </Link>
        <HeaderConfigForm />
      </div>
    </main>
  );
}
