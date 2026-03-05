"use client";

export interface SkeletonProps {
  /** Classes adicionais (ex.: para arredondamento ou tamanho do container) */
  className?: string;
}

/**
 * Skeleton com efeito shimmer (faixa de luz passando) para indicar carregamento.
 * Mantém dimensões estáveis para reduzir CLS.
 */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer ${className}`}
      aria-hidden
    />
  );
}
