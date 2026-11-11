"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAuth } from "@/hooks/useAuth";

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth();

  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col items-stretch md:flex-row">
      <Sidebar />

      <section className="flex-1">
        <Topbar />

        <div className="p-8">{children}</div>
      </section>
    </main>
  );
}
