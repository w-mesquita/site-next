import type { Metadata } from "next";
import { SettingsForm } from "@/components/settings/SettingsForm";

export const metadata: Metadata = {
  title: "Configurações | Site Empresarial",
  description: "Configure as variantes de Header, Hero e Footer do site.",
};

export default function SettingsPage() {
  return (
    <main className="min-h-[calc(100dvh-64px)] px-6 py-12">
      <SettingsForm />
    </main>
  );
}
