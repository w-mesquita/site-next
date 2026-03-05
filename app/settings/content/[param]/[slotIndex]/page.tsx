import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SlotContentPageClient } from "./SlotContentPageClient";

export const metadata: Metadata = {
  title: "Conteúdo do slot | Site Empresarial",
  description: "Edite o conteúdo desta seção (cada slot salva independente).",
};

interface PageProps {
  params: Promise<{ param: string; slotIndex: string }>;
}

export default async function SlotContentPage({ params }: PageProps) {
  const { param: pageId, slotIndex } = await params;
  const index = parseInt(slotIndex, 10);
  if (!Number.isInteger(index) || index < 0 || index > 6) notFound();
  return (
    <main className="min-h-[calc(100dvh-64px)] px-6 py-12">
      <SlotContentPageClient pageId={pageId} slotIndex={index} />
    </main>
  );
}
