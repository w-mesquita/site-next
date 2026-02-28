import type { Metadata } from "next";
import { getSectionsConfig } from "@/lib/sections-config";
import { HeaderSection, FooterSection } from "@/components/sections";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Home | Site Empresarial",
  description: "Site institucional com foco em SEO e escalabilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSectionsConfig();
  return (
    <html lang="pt-BR">
      <body>
        <HeaderSection variant={config.header} />
        {children}
        <FooterSection variant={config.footer} />
      </body>
    </html>
  );
}
