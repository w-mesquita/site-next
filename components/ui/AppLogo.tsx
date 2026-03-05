"use client";

import { useGlobalConfig } from "@/lib/global-config-context";
import Link from "next/link";
import Image from "next/image";

interface AppLogoProps {
  /** Classe do link (ex.: "text-xl font-semibold") */
  className?: string;
  /** Alt text quando for imagem (logo do site) */
  alt?: string;
  /** Largura da imagem do logo */
  width?: number;
  /** Altura da imagem do logo */
  height?: number;
  /** Estilo do link (para cor do texto quando for "Logo") */
  style?: React.CSSProperties;
}

export function AppLogo({
  className = "",
  alt = "Logo",
  width = 120,
  height = 32,
  style,
}: AppLogoProps) {
  const { config } = useGlobalConfig();
  const logoUrl = config.logoUrl?.trim() || "";

  return (
    <Link href="/" className={className} style={style} title="Início">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={alt}
          width={width}
          height={height}
          className="h-8 w-auto object-contain md:h-9"
          unoptimized={logoUrl.startsWith("http")}
        />
      ) : (
        <span>Logo</span>
      )}
    </Link>
  );
}
