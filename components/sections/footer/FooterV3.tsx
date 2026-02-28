import Link from "next/link";

export function FooterV3() {
  return (
    <footer
      className="py-8"
      style={{ backgroundColor: "var(--color-background)", color: "#15803d" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <Link href="/" className="text-sm font-medium hover:no-underline" style={{ color: "#15803d" }}>
          Logo
        </Link>
        <nav className="flex gap-6 text-sm" aria-label="Links do rodapé">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="#contato" className="hover:underline">Contato</Link>
        </nav>
      </div>
      <p className="mx-auto mt-4 max-w-6xl px-4 text-center text-xs sm:px-6" style={{ color: "#15803d" }}>
        © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
