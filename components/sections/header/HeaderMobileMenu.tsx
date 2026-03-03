"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { NavLink } from "./navLinks";

interface HeaderMobileMenuProps {
  links: NavLink[];
  cta?: { href: string; label: string };
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  /** Se true, o botão hamburger fica sempre visível (ex.: Header V3) */
  alwaysShowHamburger?: boolean;
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function HeaderMobileMenu({
  links,
  cta,
  isOpen,
  onClose,
  onOpen,
  alwaysShowHamburger = false,
}: HeaderMobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      // Salva a posição atual do scroll
      const scrollY = window.scrollY;
      
      // Bloqueia rolagem no body e html
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overflowX = "hidden";
      document.documentElement.style.overflowY = "hidden";

      // Previne rolagem via touch em dispositivos móveis (exceto dentro do menu)
      const preventScroll = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        // Permite rolagem dentro do menu (nav com overflow-auto)
        const isInsideMenu = target.closest('aside[aria-label="Menu de navegação"]');
        if (!isInsideMenu) {
          e.preventDefault();
        }
      };
      
      // Previne rolagem com wheel (exceto dentro do menu)
      const preventWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        // Permite rolagem dentro do menu
        const isInsideMenu = target.closest('aside[aria-label="Menu de navegação"]');
        if (!isInsideMenu) {
          e.preventDefault();
        }
      };
      
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("wheel", preventWheel, { passive: false });

      return () => {
        // Remove listeners
        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("wheel", preventWheel);
        
        // Restaura estilos
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.overflowX = "";
        document.documentElement.style.overflowY = "";
        
        // Restaura posição do scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        className={
          alwaysShowHamburger
            ? "flex p-2"
            : "flex p-2 md:hidden"
        }
        style={{ color: "var(--header-text)" }}
      >
        <HamburgerIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          <div
            role="presentation"
            className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 opacity-100"
            onClick={onClose}
            aria-hidden
          />
          <aside
            className="fixed right-0 top-0 z-[70] flex h-full w-[min(100%,280px)] flex-col border-l border-[var(--color-border)] transition-transform duration-300 ease-out translate-x-0"
            style={{
              backgroundColor: "var(--header-bg)",
              color: "var(--header-text)",
            }}
            aria-label="Menu de navegação"
            aria-hidden={false}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
              <span className="text-sm font-medium">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="p-2"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-auto px-4 py-6" aria-label="Links do menu">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="rounded-md px-3 py-2 text-base font-medium hover:bg-[var(--color-surface)]"
                >
                  {label}
                </Link>
              ))}
            </nav>
            {cta && (
              <div className="border-t border-[var(--color-border)] p-4">
                <Link
                  href={cta.href}
                  onClick={onClose}
                  className="block w-full rounded-md bg-[var(--color-primary)] py-3 text-center font-medium text-white hover:no-underline"
                >
                  {cta.label}
                </Link>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}
