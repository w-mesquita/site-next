"use client";

export function CtaV1() {
  return (
    <section
      className="py-12 text-center"
      style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}
    >
      <div className="mx-auto max-w-content px-6">
        <h2 className="text-2xl font-semibold md:text-3xl">Chame para ação</h2>
        <p className="mt-2 text-[var(--color-text-muted)]">
          Entre em contato ou saiba mais sobre nossos serviços.
        </p>
      </div>
    </section>
  );
}
