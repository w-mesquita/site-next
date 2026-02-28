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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

      <>
        <div
          role="presentation"
          className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={onClose}
          aria-hidden
        />
        <aside
          className={`fixed right-0 top-0 z-[70] flex h-full w-[min(100%,280px)] flex-col border-l border-[var(--color-border)] transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundColor: "var(--header-bg)",
            color: "var(--header-text)",
          }}
          aria-label="Menu de navegação"
          aria-hidden={!isOpen}
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
    </>
  );
}
