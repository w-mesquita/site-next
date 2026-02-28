import Link from "next/link";

export function HeaderV2() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--color-surface)",
        color: "#1e40af",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 sm:px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:no-underline">
          Logo
        </Link>
      </div>
    </header>
  );
}
