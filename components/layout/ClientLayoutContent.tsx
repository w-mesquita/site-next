"use client";

import { SiteLoadingPage } from "@/components/ui/SiteLoadingPage";
import { ServiceUnavailablePage } from "@/components/ui/ServiceUnavailablePage";
import { HeaderSection, FooterSection } from "@/components/sections";
import { useSectionsConfig } from "@/lib/sections-config-context";
import { useSectionsContent } from "@/lib/sections-content-context";

interface ClientLayoutContentProps {
  children: React.ReactNode;
}

export function ClientLayoutContent({ children }: ClientLayoutContentProps) {
  const configCtx = useSectionsConfig();
  const contentCtx = useSectionsContent();

  const loading = configCtx.apiLoading || contentCtx.apiLoading;
  const loadError =
    configCtx.apiLoadError || contentCtx.apiLoadError;
  const saveError =
    configCtx.apiSaveError ?? contentCtx.apiSaveError;
  const unavailable = loadError || saveError;
  const message =
    saveError ?? (loadError ? "Serviço indisponível. Entre em contato com o administrador." : null);

  const handleRetry = () => {
    configCtx.clearSaveError();
    contentCtx.clearSaveError();
  };

  if (loading) {
    return <SiteLoadingPage />;
  }

  if (unavailable && message) {
    return (
      <ServiceUnavailablePage
        message={message}
        showRetry={!!saveError}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <>
      <HeaderSection variant={configCtx.config.header} />
      {children}
      <FooterSection variant={configCtx.config.footer} />
    </>
  );
}
