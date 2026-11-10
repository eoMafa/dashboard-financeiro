import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside
      className="
        hidden md:flex flex-col
        w-64 min-w-64
        min-h-screen
        bg-card
        border-r
        p-4
        transition-colors
      "
    >
      <SidebarContent />
    </aside>
  );
}