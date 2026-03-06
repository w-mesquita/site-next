"use client";

import Link from "next/link";

const MESSAGE = "Serviço indisponível. Entre em contato com o administrador.";

interface ServiceUnavailablePageProps {
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function ServiceUnavailablePage({
  message = MESSAGE,
  showRetry = false,
  onRetry,
}: ServiceUnavailablePageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-background)] text-[var(--color-text)]"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center max-w-md">
        <p className="text-6xl md:text-8xl font-bold text-[var(--color-text-muted)] select-none tabular-nums">
          503
        </p>
        <h1 className="mt-4 text-xl md:text-2xl font-semibold text-[var(--color-text)]">
          Serviço indisponível
        </h1>
        <p className="mt-2 text-[var(--color-text-muted)]">{message}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
            >
              Tentar novamente
            </button>
          )}
          <Link
            href="/"
            className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[var(--color-text)] font-medium hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
