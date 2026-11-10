import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

export function SidebarContent() {
  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-10 transition-colors">
          FinDashboard
        </h1>

        <nav className="space-y-3">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
          />

          <SidebarItem
            icon={<Wallet size={18} />}
            label="Wallet"
          />

          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Cards"
          />

          <SidebarItem
            icon={<BarChart3 size={18} />}
            label="Analytics"
          />

          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>
      </div>

      <div className="mt-auto pt-6">
        <div className="bg-muted border rounded-2xl p-4 transition-colors">
          <p className="text-sm font-medium text-foreground">
            FinDashboard Pro
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            Controle financeiro inteligente
          </p>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`
        flex items-center gap-3
        w-full
        transition-all
        p-3
        rounded-xl
        cursor-pointer
        font-medium

        ${
          active
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}