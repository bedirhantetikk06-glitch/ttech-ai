"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  LayoutDashboard,
  MessageSquare,
  Target,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
  user: User;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navigation = [
    { name: "Sohbet", href: "/dashboard/chat", icon: MessageSquare },
    { name: "Genel Bakış", href: "/dashboard", icon: LayoutDashboard },
    { name: "Hedefler", href: "/dashboard/goals", icon: Target },
    { name: "Life OS", href: "/dashboard/os", icon: FolderOpen },
  ];

  const bottomNav = [
    { name: "Premium", href: "/dashboard/billing", icon: CreditCard },
    { name: "Ayarlar", href: "/dashboard/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Tettech AI</span>
        </Link>

        {/* User Card */}
        <div className="glass-card rounded-xl p-4 flex items-center gap-3 mb-8 border border-white/5">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white shrink-0">
            {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {user.user_metadata?.full_name || "Kullanıcı"}
            </div>
            <div className="text-xs text-brand-400 truncate">
              Ücretsiz Plan
            </div>
          </div>
        </div>

        <nav className="space-y-1.5">
          <div className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2 px-2">
            Ana Menü
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) && item.href !== "/dashboard";
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "nav-item",
                  isActive ? "active" : ""
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-brand-400" : "text-surface-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1.5 border-t border-white/5">
        {bottomNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            className="nav-item group"
          >
            <item.icon className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
            {item.name}
          </Link>
        ))}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="nav-item w-full text-left text-red-400/80 hover:text-red-400 hover:bg-red-400/10"
        >
          <LogOut className="w-5 h-5" />
          {isSigningOut ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-surface-900/50 backdrop-blur-xl border-r border-white/5 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="md:hidden fixed top-0 inset-x-0 h-16 bg-surface-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 -mr-2 text-surface-400 hover:text-white"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <aside className="relative flex flex-col w-72 max-w-[80%] h-full bg-surface-900 border-r border-white/5 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
