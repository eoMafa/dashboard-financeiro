import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 p-4">
      <h1 className="text-2xl font-bold text-white mb-10">
        FinDashboard
      </h1>

      <nav className="space-y-3">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarItem icon={<Wallet size={18} />} label="Wallet" />
        <SidebarItem icon={<CreditCard size={18} />} label="Cards" />
        <SidebarItem icon={<BarChart3 size={18} />} label="Analytics" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-3 w-full text-zinc-300 hover:text-white hover:bg-zinc-900 transition p-3 rounded-xl">
      {icon}
      <span>{label}</span>
    </button>
  );
}