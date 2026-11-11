"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight } from "lucide-react";

export function SidebarContent() {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div>
        <h1 className="text-foreground mb-10 text-2xl font-bold transition-colors">
          FinDashboard
        </h1>

        <nav className="space-y-3">
          <SidebarItem
            href="/"
            icon={<LayoutDashboard size={18} />}
            label="Visão geral"
            active={pathname === "/"}
          />

          <SidebarItem
            href="/transacoes"
            icon={<ArrowLeftRight size={18} />}
            label="Transações"
            active={pathname === "/transacoes"}
          />
        </nav>
      </div>

      <div className="mt-auto pt-6">
        <div className="bg-muted rounded-2xl border p-4 transition-colors">
          <p className="text-foreground text-sm font-medium">
            FinDashboard Pro
          </p>

          <p className="text-muted-foreground mt-1 text-xs">
            Controle financeiro inteligente
          </p>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-xl p-3 font-medium transition-all ${
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      } `}
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}
