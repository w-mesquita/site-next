"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { DEFAULT_NAV_LINKS } from "./navLinks";

export function HeaderV1() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)]"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--header-bg)",
        color: "var(--header-text)",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-semibold hover:no-underline">
          Logo
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Navegação principal"
          >
            {DEFAULT_NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium opacity-90 hover:opacity-100 hover:no-underline"
              >
                {label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <HeaderMobileMenu
            links={DEFAULT_NAV_LINKS}
            isOpen={menuOpen}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
