import type { Metadata } from "next";
import { getSectionsConfig } from "@/lib/sections-config";
import { HeaderSection, FooterSection } from "@/components/sections";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Home | Site Empresarial",
  description: "Site institucional com foco em SEO e escalabilidade.",
};

const themeScript = `
(function() {
  var t = localStorage.getItem('theme');
  var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSectionsConfig();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <HeaderSection variant={config.header} />
          {children}
          <FooterSection variant={config.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
