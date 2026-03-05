import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FooterV1() {
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
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="#contato" className="hover:underline">Contato</Link>
            <SocialLinks size="md" />
          </nav>
        </div>
      </div>
    </footer>
  );
}
