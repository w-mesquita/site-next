import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FooterV3() {
  return (
    <footer
      className="py-8"
      style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}
    >
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <AppLogo className="text-sm font-medium hover:no-underline" style={{ color: "var(--color-text)" }} />
        <div className="flex flex-wrap items-center justify-center gap-6">
          <nav className="flex gap-6 text-sm" aria-label="Links do rodapé">
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="#contato" className="hover:underline">Contato</Link>
          </nav>
          <SocialLinks size="md" />
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-content px-4 text-center text-xs sm:px-6" style={{ color: "var(--color-text-muted)" }}>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
