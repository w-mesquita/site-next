import Link from "next/link";

export function HeaderV3() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)]"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--header-bg)",
        color: "#15803d",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-semibold hover:no-underline">
          Logo
        </Link>
        <nav className="flex items-center gap-6" aria-label="Navegação principal">
          <Link href="/" className="text-sm font-medium opacity-90 hover:opacity-100 hover:no-underline">
            Início
          </Link>
          <Link
            href="#contato"
            className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:no-underline"
          >
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}
