"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function HeroV1() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      className="relative overflow-hidden px-4 py-24 md:px-6 lg:py-32"
      style={{ backgroundColor: "var(--color-surface)" }}
      aria-label="Seção principal"
    >
      {/* Decorative blur orbs */}
      <div
        className="absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-content gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
        {/* Texto e ações à esquerda */}
        <div className="max-w-2xl space-y-6">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-text-muted) 10%, transparent)",
              borderColor: "color-mix(in srgb, var(--color-text-muted) 20%, transparent)",
              color: "var(--color-text-muted)",
            }}
          >
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: "var(--color-text-muted)" }}
            />
            Destaque opcional
          </div>

          <h1
            className="font-extrabold leading-tight tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            <span className="mb-2 block text-2xl md:text-3xl lg:text-4xl">
              Bem-vindo ao seu site
            </span>
            <span className="mt-2 block text-5xl md:text-6xl lg:text-7xl lg:mt-4">
              Soluções que fazem sentido
            </span>
          </h1>

          <p
            className="max-w-lg text-lg leading-relaxed md:text-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            Estrutura base com Next.js, TypeScript, Tailwind e design tokens. Personalize o texto e a imagem ao lado.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#acao"
              className="inline-block rounded-md px-6 py-3 font-medium text-white hover:no-underline"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Saiba mais
            </Link>
            <Link
              href="#contato"
              className="inline-block rounded-md border px-6 py-3 font-medium hover:no-underline"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              Contato
            </Link>
          </div>
        </div>

        {/* Imagem à direita */}
        <div className="relative group">
          <div
            className="absolute inset-0 rounded-2xl opacity-20 blur-lg transition-opacity group-hover:opacity-30"
            style={{
              background: `linear-gradient(to right, var(--color-primary), var(--color-primary-light))`,
            }}
            aria-hidden
          />
          <div
            className="relative overflow-hidden rounded-2xl border shadow-2xl"
            style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}
          >
            {!imageError ? (
              <Image
                src="/hero-image.jpg"
                alt="Destaque visual do hero"
                width={800}
                height={500}
                className="h-auto w-full object-cover opacity-95 transition-opacity duration-500 hover:opacity-100"
                onError={() => setImageError(true)}
              />
            ) : null}
            <div
              className="min-h-[280px] items-center justify-center px-8 text-center"
              style={{
                display: imageError ? "flex" : "none",
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <span className="text-lg">
                Adicione uma imagem em{" "}
                <code className="rounded px-1" style={{ backgroundColor: "var(--color-border)" }}>
                  public/hero-image.jpg
                </code>{" "}
                para exibir aqui.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
