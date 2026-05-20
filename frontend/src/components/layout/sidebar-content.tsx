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
        <h1 className="text-2xl font-bold text-black dark:text-white mb-10 transition-colors">
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
        <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-colors">
          <p className="text-sm font-medium text-black dark:text-white">
            FinDashboard Pro
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
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
            ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </button>
  );
}