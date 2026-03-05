"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppLogo } from "@/components/ui/AppLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SettingsLink } from "@/components/ui/SettingsLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { DEFAULT_NAV_LINKS } from "./navLinks";

export function HeaderV3() {
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
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6">
        <AppLogo className="text-xl font-semibold hover:no-underline" style={{ color: "var(--header-text)" }} />

        <div className="flex items-center gap-2">
          <SocialLinks size="sm" />
          <ThemeToggle />
          <SettingsLink />
          <HeaderMobileMenu
          links={DEFAULT_NAV_LINKS}
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          alwaysShowHamburger
          />
        </div>
      </div>
    </header>
  );
}
