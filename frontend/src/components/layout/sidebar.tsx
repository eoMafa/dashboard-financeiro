import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  return (
    <aside className="bg-card hidden min-h-screen w-64 min-w-64 flex-col border-r p-4 transition-colors md:flex">
      <SidebarContent />
    </aside>
  );
}
