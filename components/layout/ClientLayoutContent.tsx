"use client";

import { HeaderSection, FooterSection } from "@/components/sections";
import { useSectionsConfig } from "@/lib/sections-config-context";

interface ClientLayoutContentProps {
  children: React.ReactNode;
}

export function ClientLayoutContent({ children }: ClientLayoutContentProps) {
  const { config } = useSectionsConfig();
  return (
    <>
      <HeaderSection variant={config.header} />
      {children}
      <FooterSection variant={config.footer} />
    </>
  );
}
