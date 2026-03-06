import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isSectionTypeWithContent, SECTION_TYPES_WITH_CONTENT } from "@/types/sections-content";
import { SectionContentForm } from "../SectionContentForm";

export const metadata: Metadata = {
  title: "Conteúdo da seção | Site Empresarial",
  description: "Edite o conteúdo exibido nas seções do site.",
};

const SECTION_LABELS: Record<(typeof SECTION_TYPES_WITH_CONTENT)[number], string> = {
  hero: "Hero",
  cta: "CTA",
  features: "Features",
  services: "Services",
  partners: "Partners",
  contact: "Contact",
};

interface PageProps {
  params: Promise<{ param: string }>;
}

export default async function LegacySectionContentPage({ params }: PageProps) {
  const { param: sectionType } = await params;
  if (!isSectionTypeWithContent(sectionType)) notFound();
  const label = SECTION_LABELS[sectionType];
  return (
    <main className="min-h-[calc(100dvh-64px)] px-6 py-12">
      <SectionContentForm sectionType={sectionType} sectionLabel={label} />
    </main>
  );
}
