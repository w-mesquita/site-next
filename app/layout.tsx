import type { Metadata } from "next";
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
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
