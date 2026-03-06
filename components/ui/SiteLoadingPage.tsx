"use client";

import "./SiteLoadingPage.css";

/**
 * Tela de carregamento exibida enquanto a API (config + conteúdo) ainda não respondeu.
 * Evita o "piscar" do conteúdo default do server antes dos dados da API.
 */
export function SiteLoadingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-background)] text-[var(--color-text)]"
      role="status"
      aria-live="polite"
      aria-label="Carregando"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="site-loading-loader" aria-hidden />
        <p className="text-sm text-[var(--color-text-muted)]">Carregando...</p>
      </div>
    </div>
  );
}
