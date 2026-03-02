import type { Metadata } from "next";
import { getSectionsConfig } from "@/lib/sections-config";
import { ThemeProvider } from "@/lib/theme-context";
import { SectionsConfigProvider } from "@/lib/sections-config-context";
import { ClientLayoutContent } from "@/components/layout/ClientLayoutContent";
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
          <SectionsConfigProvider initialConfig={config}>
            <ClientLayoutContent>{children}</ClientLayoutContent>
          </SectionsConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
