"use client";

import {
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SidebarContent } from "./sidebar-content";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";

export function Topbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function logout() {
    localStorage.removeItem("token");

    router.push("/login");
  }

  return (
    <header className="w-full h-20 border-b bg-card px-4 md:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-foreground">
              <Menu size={24} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-card p-0 w-64"
          >
            <div className="p-4">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="relative w-[220px] md:w-[350px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Search..."
            className="pl-10 bg-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative">
          <Bell className="text-muted-foreground" />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-muted text-foreground">
              AJ
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium text-foreground">
              Anderson Jr
            </p>

            <span className="text-xs text-muted-foreground">
              Administrator
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          className="text-muted-foreground hover:text-foreground"
        >
          {mounted &&
            (theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            ))}
        </button>

        <button
          onClick={logout}
          className="text-xs text-destructive hover:opacity-80"
        >
          Logout
        </button>
      </div>
    </header>
  );
}