import Link from "next/link";

export function FooterV2() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-16"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Link href="/" className="text-lg font-semibold hover:no-underline" style={{ color: "#1e40af" }}>
            Logo
          </Link>
          <p className="mt-2 text-sm" style={{ color: "#1e40af" }}>
            Descrição breve da empresa.
          </p>
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "#1e40af" }}>Links</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "#1e40af" }}>
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li><Link href="#sobre" className="hover:underline">Sobre</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold" style={{ color: "#1e40af" }}>Contato</h3>
          <ul className="mt-2 space-y-2 text-sm" style={{ color: "#1e40af" }}>
            <li><Link href="#contato" className="hover:underline">Fale conosco</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--color-border)] px-4 pt-8 text-center text-sm sm:px-6" style={{ color: "#1e40af" }}>
        © {new Date().getFullYear()} Todos os direitos reservados.
      </div>
    </footer>
  );
}
