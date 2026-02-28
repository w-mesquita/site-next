import Link from "next/link";

export function FooterV1() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-12"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center text-sm" style={{ color: "var(--color-text)" }}>
          <Link href="/" className="font-semibold hover:no-underline" style={{ color: "var(--color-text)" }}>
            Logo
          </Link>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
          <nav className="flex gap-6" aria-label="Links do rodapé">
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="#contato" className="hover:underline">Contato</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
