"use client";

import { SettingsLink } from "@/components/ui/SettingsLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { DEFAULT_CTA, DEFAULT_NAV_LINKS } from "./navLinks";

export function HeaderV2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[var(--color-border)] shadow-md py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
      style={{
        color: "var(--header-text)",
        ...(isScrolled && { backgroundColor: "var(--header-bg-scrolled)" }),
      }}
    >
      <div className="relative mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6">
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
