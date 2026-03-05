"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ButtonVariant = "primary" | "neutral" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white border-2 border-transparent hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] no-underline hover:no-underline active:no-underline focus:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  neutral:
    "bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] active:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] active:border-[var(--color-primary-active)] no-underline hover:no-underline active:no-underline focus:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
  inverse:
    "bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] active:bg-white/90 active:text-[var(--color-primary-active)] no-underline hover:no-underline active:no-underline focus:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface ButtonAsButton extends ButtonBaseProps, Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> {
  href?: never;
}

export interface ButtonAsLink extends ButtonBaseProps, Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    children,
    ...rest
  } = props;

  const baseClass =
    "inline-block rounded-md font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

  const combinedClass = [
    baseClass,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isLinkProps(props)) {
    const { href, ...linkRest } = props;
    return (
      <Link href={href} className={combinedClass} {...linkRest}>
        {children}
      </Link>
    );
  }

  // Neste ramo props é ButtonAsButton; rest contém apenas props nativas do button
  const buttonRest = rest as Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps>;
  const { type = "button", ...nativeButtonProps } = buttonRest;
  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClass}
      {...nativeButtonProps}
    >
      {children}
    </button>
  );
}
