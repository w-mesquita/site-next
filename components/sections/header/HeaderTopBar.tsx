"use client";

import { SocialLinks } from "@/components/ui/SocialLinks";

export interface HeaderTopBarProps {
  phone: string;
  email: string;
  /** Cor de fundo (vazio = padrão do tema). */
  backgroundColor?: string | null;
  /** Cor do texto e ícones (vazio = padrão). */
  textColor?: string | null;
  /** Exibir ícones das redes sociais na top bar. */
  showSocial?: boolean;
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export function HeaderTopBar({
  phone,
  email,
  backgroundColor = null,
  textColor = null,
  showSocial = false,
}: HeaderTopBarProps) {
  const hasPhone = phone.trim().length > 0;
  const hasEmail = email.trim().length > 0;
  const hasAny = hasPhone || hasEmail || showSocial;

  if (!hasAny) return null;

  const bg = backgroundColor?.trim() || "var(--color-primary)";
  const fg = textColor?.trim() || "white";

  return (
    <div
      className="flex items-center justify-between px-4 py-2 text-sm md:px-6"
      style={{ backgroundColor: bg, color: fg }}
      aria-label="Contato e redes sociais"
    >
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        {hasPhone && (
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="inline-flex items-center gap-2 opacity-95 hover:opacity-100"
            style={{ color: fg }}
          >
            <PhoneIcon className="h-4 w-4 flex-shrink-0" />
            <span>{phone}</span>
          </a>
        )}
        {hasEmail && (
          <a
            href={`mailto:${email.trim()}`}
            className="inline-flex items-center gap-2 opacity-95 hover:opacity-100"
            style={{ color: fg }}
          >
            <EmailIcon className="h-4 w-4 flex-shrink-0" />
            <span>{email.trim()}</span>
          </a>
        )}
      </div>
      {showSocial && (
        <div className="flex items-center gap-2 [&_a]:opacity-90 [&_a:hover]:opacity-100" style={{ color: fg }}>
          <SocialLinks size="sm" overrideColor={fg} />
        </div>
      )}
    </div>
  );
}
