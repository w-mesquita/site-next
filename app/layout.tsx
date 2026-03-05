import { ClientLayoutContent } from "@/components/layout/ClientLayoutContent";
import { WhatsAppFloat } from "@/components/widgets";
import { getGlobalConfig } from "@/lib/global-config";
import { getSectionsConfig } from "@/lib/sections-config";
import { SectionsConfigProvider } from "@/lib/sections-config-context";
import { getSectionsContent } from "@/lib/sections-content";
import { SectionsContentProvider } from "@/lib/sections-content-context";
import { GlobalConfigProvider } from "@/lib/global-config-context";
import { SocialConfigProvider } from "@/lib/social-config-context";
import { ThemeProvider } from "@/lib/theme-context";
import { WhatsAppConfigProvider } from "@/lib/whatsapp-config-context";
import type { Metadata } from "next";
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

/** CSS crítico para o elemento LCP (título do hero) — permite pintar antes do CSS principal carregar e reduz atraso de renderização. */
const criticalLcpCss = `
[data-hero-lcp] {
  display: block;
  margin-top: 0.5rem;
  font-size: clamp(1.875rem, 5vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--color-text);
}
@media (min-width: 768px) {
  [data-hero-lcp] { font-size: clamp(2.25rem, 5vw, 4.5rem); }
}
@media (min-width: 1024px) {
  [data-hero-lcp] { font-size: clamp(3rem, 4vw, 4.5rem); margin-top: 1rem; }
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getSectionsConfig();
  const initialContent = getSectionsContent();
  const globalConfig = getGlobalConfig();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <style dangerouslySetInnerHTML={{ __html: criticalLcpCss }} />
        {/* Pré-conexão com a origem do site (opcional): defina NEXT_PUBLIC_SITE_ORIGIN ex.: https://gestly.netlify.app */}
        {process.env.NEXT_PUBLIC_SITE_ORIGIN ? (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SITE_ORIGIN} />
        ) : null}
      </head>
      <body>
        <ThemeProvider>
          <GlobalConfigProvider initialConfig={globalConfig}>
          <SectionsConfigProvider initialConfig={config}>
            <SectionsContentProvider initialContent={initialContent}>
              <WhatsAppConfigProvider>
                <SocialConfigProvider>
                  <ClientLayoutContent>{children}</ClientLayoutContent>
                  <WhatsAppFloat />
                </SocialConfigProvider>
              </WhatsAppConfigProvider>
            </SectionsContentProvider>
          </SectionsConfigProvider>
          </GlobalConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
