import Link from "next/link";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FooterV2() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-16"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="text-lg font-semibold hover:no-underline" style={{ color: "var(--color-text)" }}>
            Logo
          </Link>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Descrição breve da empresa.
          </p>
          <SocialLinks size="md" className="mt-3" />
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>Links</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li><Link href="#sobre" className="hover:underline">Sobre</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "var(--color-text)" }}>Contato</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <li><Link href="#contato" className="hover:underline">Fale conosco</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--color-border)] px-4 pt-8 text-center text-sm sm:px-6" style={{ color: "var(--color-text-muted)" }}>
        © {new Date().getFullYear()} Todos os direitos reservados.
      </div>
    </footer>
  );
}
