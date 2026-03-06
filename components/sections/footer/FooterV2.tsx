import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { HeaderNavItem } from "@/types/header-config";

export interface FooterV2Props {
  menuItems: HeaderNavItem[];
  cta?: { label: string; href: string } | null;
}

export function FooterV2({ menuItems, cta }: FooterV2Props) {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-16"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <AppLogo className="text-lg font-semibold hover:no-underline" style={{ color: "var(--color-text)" }} />
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Descrição breve da empresa.
          </p>
          <SocialLinks size="md" className="mt-3" />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>Links</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {menuItems.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link href={item.href} className="hover:underline">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>Contato</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <li>
              <Link href={cta?.href ?? "#contato"} className="hover:underline">
                {cta?.label ?? "Fale conosco"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-content border-t border-[var(--color-border)] px-4 pt-8 text-center text-sm sm:px-6" style={{ color: "var(--color-text-muted)" }}>
        © {new Date().getFullYear()} Todos os direitos reservados.
      </div>
    </footer>
  );
}
