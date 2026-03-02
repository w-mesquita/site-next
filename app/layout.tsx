import type { Metadata } from "next";
import { getSectionsConfig } from "@/lib/sections-config";
import { getSectionsContent } from "@/lib/sections-content";
import { ThemeProvider } from "@/lib/theme-context";
import { SectionsConfigProvider } from "@/lib/sections-config-context";
import { SectionsContentProvider } from "@/lib/sections-content-context";
import { WhatsAppConfigProvider } from "@/lib/whatsapp-config-context";
import { SocialConfigProvider } from "@/lib/social-config-context";
import { ClientLayoutContent } from "@/components/layout/ClientLayoutContent";
import { WhatsAppFloat } from "@/components/widgets";
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
  const initialContent = getSectionsContent();
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
