import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { HeaderNavItem } from "@/types/header-config";

export interface FooterV1Props {
  menuItems: HeaderNavItem[];
  cta?: { label: string; href: string } | null;
}

export function FooterV1({ menuItems }: FooterV1Props) {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center text-sm" style={{ color: "var(--color-text)" }}>
          <AppLogo className="font-semibold hover:no-underline" style={{ color: "var(--color-text)" }} />
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Links do rodapé">
            {menuItems.map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ))}
            <SocialLinks size="md" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
