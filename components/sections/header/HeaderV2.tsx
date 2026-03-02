"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SettingsLink } from "@/components/ui/SettingsLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { DEFAULT_NAV_LINKS, DEFAULT_CTA } from "./navLinks";

export function HeaderV2() {
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
      <div className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-semibold hover:no-underline">
          Logo
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex"
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

        <div className="flex items-center gap-2">
          <SocialLinks size="sm" />
          <ThemeToggle />
          <SettingsLink />
          <div className="hidden md:block">
            <Link
              href={DEFAULT_CTA.href}
              className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:no-underline"
            >
              {DEFAULT_CTA.label}
            </Link>
          </div>
          <HeaderMobileMenu
          links={DEFAULT_NAV_LINKS}
          cta={DEFAULT_CTA}
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
