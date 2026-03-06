"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "@/components/ui/AppLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SettingsLink } from "@/components/ui/SettingsLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderTopBar } from "./HeaderTopBar";
import { NavLinkIcon } from "./NavLinkIcon";
import type { HeaderContent, HeaderNavItem } from "@/types/header-config";
import { HEADER_SECTION_INDEX_TOP } from "@/types/header-config";
import type { NavLink } from "./navLinks";

function navItemsToLinks(items: HeaderNavItem[]): NavLink[] {
  return items.map(({ href, label }) => ({ href, label }));
}

export interface HeaderV3Props {
  headerContent: HeaderContent;
}

export function HeaderV3({ headerContent }: HeaderV3Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, item: HeaderNavItem) {
    if (!headerContent.isLanding || item.sectionIndex === undefined) return;
    if (item.sectionIndex === HEADER_SECTION_INDEX_TOP && isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (isHome && item.href.startsWith("/#section-")) {
      e.preventDefault();
      const id = item.href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {headerContent.topBar.visible && (
        <HeaderTopBar
          phone={headerContent.topBar.phone}
          email={headerContent.topBar.email}
          backgroundColor={headerContent.topBar.backgroundColor}
          textColor={headerContent.topBar.textColor}
          showSocial={headerContent.topBar.showSocial}
        />
      )}
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
            {!(headerContent.topBar.visible && headerContent.topBar.showSocial) && (
              <SocialLinks size="sm" />
            )}
            <ThemeToggle />
            <SettingsLink />
            <HeaderMobileMenu
              links={navItemsToLinks(headerContent.menuItems)}
              cta={headerContent.cta ?? undefined}
              isOpen={menuOpen}
              onOpen={() => setMenuOpen(true)}
              onClose={() => setMenuOpen(false)}
              alwaysShowHamburger
              landingScroll={headerContent.isLanding ? { menuItems: headerContent.menuItems, isHome } : undefined}
            />
          </div>
        </div>
      </header>
    </>
  );
}
