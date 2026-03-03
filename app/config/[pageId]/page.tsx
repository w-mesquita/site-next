import type { PageId } from "@/types/sections";
import { PAGE_IDS } from "@/types/sections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageConfigClient } from "./PageConfigClient";

export const metadata: Metadata = {
  title: "Configurar página | Site Empresarial",
  description: "Configure as 5 seções do corpo da página.",
};

const PAGE_LABELS: Record<PageId, string> = {
  home: "Home",
  contact: "Contato",
  about: "Sobre",
};

interface PageProps {
  params: Promise<{ pageId: string }>;
}

export default async function PageConfigPage({ params }: PageProps) {
  const { pageId } = await params;
  if (!PAGE_IDS.includes(pageId as PageId)) notFound();
  const label = PAGE_LABELS[pageId as PageId];

  return (
    <main className="min-h-[calc(100dvh-64px)] px-6 py-12">
      <PageConfigClient pageId={pageId as PageId} pageLabel={label} />
    </main>
  );
}
