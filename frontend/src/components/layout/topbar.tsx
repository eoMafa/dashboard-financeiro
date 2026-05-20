"use client";
import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function Topbar() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");

    router.push("/login");
  }
  return (
    <header className="w-full h-20 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between">
      <div className="relative w-[350px]">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <Input
          placeholder="Search..."
          className="pl-10 bg-zinc-900 border-zinc-800 text-white"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell className="text-zinc-400" />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
        </button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-orange-500 text-black">
              AJ
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium text-white">
              Anderson Jr
            </p>

            <span className="text-xs text-zinc-400">
              Administrator
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}