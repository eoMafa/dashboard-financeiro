"use client";

import { Bell, Search, Menu, Moon, Sun } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SidebarContent } from "./sidebar-content";

import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { api } from "@/services/api";

type Usuario = {
  id: string;
  name: string;
  email: string;
};

function iniciais(nome: string) {
  const palavras = nome.split(" ").slice(0, 2);
  const letras = palavras.map((palavra) => palavra[0]);
  return letras.join("").toUpperCase();
}

export function Topbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    api
      .get<Usuario>("/users/me")
      .then((resposta) => setUsuario(resposta.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  function logout() {
    localStorage.removeItem("token");

    router.push("/login");
  }

  return (
    <header className="bg-card flex h-20 w-full items-center justify-between border-b px-4 transition-colors md:px-8">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-foreground md:hidden">
              <Menu size={24} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-card w-64 p-0">
            <div className="p-4">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>

        <div className="relative w-[220px] md:w-[350px]">
          <Search
            size={18}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />

          <Input placeholder="Search..." className="bg-muted pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="relative">
          <Bell className="text-muted-foreground" />

          <span className="bg-primary absolute -top-1 -right-1 h-2 w-2 rounded-full" />
        </button>

        <div className="hidden items-center gap-3 sm:flex">
          <Avatar>
            <AvatarFallback className="bg-muted text-foreground">
              {usuario ? iniciais(usuario.name) : ""}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-foreground text-sm font-medium">
              {usuario?.name}
            </p>

            <span className="text-muted-foreground text-xs">
              {usuario?.email}
            </span>
          </div>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Sun size={18} className="hidden dark:block" />
          <Moon size={18} className="dark:hidden" />
        </button>

        <button
          onClick={logout}
          className="text-destructive text-xs hover:opacity-80"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
