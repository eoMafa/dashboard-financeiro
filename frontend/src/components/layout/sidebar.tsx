import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex flex-col
        w-64 min-w-64
        min-h-screen
        bg-white dark:bg-zinc-950
        border-r border-zinc-200 dark:border-zinc-800
        p-4
        transition-colors
      "
    >
      <SidebarContent />
    </aside>
  );
}