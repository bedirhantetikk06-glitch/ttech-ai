"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { 
  Settings2, User, Key, Bell, Shield, Wallet, 
  Calendar, Mail, FileText, CheckCircle2, XCircle, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

const INTEGRATIONS = [
  {
    id: "google_calendar",
    name: "Google Calendar",
    description: "Planlayıcı ajanın etkinlik ve zaman bloğu eklemesine izin verin.",
    icon: Calendar,
    color: "#4285F4",
    status: "connected",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Uygulayıcı ajanın sizin adınıza e-posta taslağı hazırlamasına izin verin.",
    icon: Mail,
    color: "#EA4335",
    status: "disconnected",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Araştırmacı ve Planlayıcı ajanların Notion içinde sayfa oluşturmasına izin verin.",
    icon: FileText,
    color: "#000000", // Will use white in dark mode
    status: "disconnected",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("integrations");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [connectedApps, setConnectedApps] = useState<Record<string, boolean>>({});
  const supabase = createClient();

  useEffect(() => {
    async function checkIntegrations() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_integrations")
        .select("provider")
        .eq("user_id", user.id);

      if (data) {
        const appsState: Record<string, boolean> = {};
        data.forEach((i: any) => appsState[i.provider] = true);
        setConnectedApps(appsState);
      }
    }
    checkIntegrations();
  }, [supabase]);

  const TABS = [
    { id: "account", label: "Hesap", icon: User },
    { id: "integrations", label: "Entegrasyonlar", icon: Key },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "billing", label: "Abonelik", icon: Wallet },
  ];

  const handleConnect = (id: string, currentStatus: string) => {
    if (connectedApps[id]) return; // connected

    setLoadingId(id);
    
    if (id === "google_calendar" || id === "google") {
      window.location.href = "/api/auth/google";
      return;
    }
    
    // Simulate others
    setTimeout(() => {
      setLoadingId(null);
      alert("Bu entegrasyon yakında eklenecek.");
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Nav for Settings */}
      <div className="w-full md:w-64 shrink-0 space-y-1">
        <div className="flex items-center gap-2 mb-6 px-2">
          <Settings2 className="w-6 h-6 text-brand-400" />
          <h1 className="text-2xl font-bold text-white">Ayarlar</h1>
        </div>

        <nav className="flex md:flex-col overflow-x-auto no-scrollbar gap-2 md:gap-1 pb-4 md:pb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                  isActive 
                    ? "bg-brand-500/10 text-white border border-brand-500/30" 
                    : "text-surface-400 hover:text-white hover:bg-surface-800"
                )}
              >
                <tab.icon className={cn("w-5 h-5", isActive ? "text-brand-400" : "")} />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {activeTab === "integrations" && (
            <motion.div
              key="integrations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Dış Entegrasyonlar</h2>
                <p className="text-surface-400 text-sm">
                  Tettech AI ajanlarının dış dünyada işlem yapabilmesi için gerekli izinleri yönetin.
                  Sadece yetki verdiğiniz ajanlar işlem yapabilir.
                </p>
              </div>

              <div className="grid gap-4">
                {INTEGRATIONS.map((app) => {
                  // We map google_calendar to 'google' for db provider matching
                  const providerKey = app.id === "google_calendar" ? "google" : app.id;
                  const isConnected = connectedApps[providerKey] === true;
                  const isLoading = loadingId === app.id;

                  return (
                    <div 
                      key={app.id} 
                      className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-surface-800 border border-white/10"
                        >
                          <app.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{app.name}</h3>
                            {isConnected && (
                              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sage-400 bg-sage-500/10 px-2 py-0.5 rounded-full border border-sage-500/20">
                                <CheckCircle2 className="w-3 h-3" /> Bağlı
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-surface-400">{app.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConnect(app.id, isConnected ? "connected" : "disconnected")}
                        disabled={isLoading || isConnected}
                        className={cn(
                          "shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                          isConnected 
                            ? "bg-surface-800 text-surface-400 cursor-default"
                            : "bg-white text-surface-950 hover:bg-surface-100 shadow-glow-sm"
                        )}
                      >
                        {isLoading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Bağlanıyor</>
                        ) : isConnected ? (
                          "Ayarları Düzenle"
                        ) : (
                          "Bağlan"
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5 mt-8">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-100 mb-1">Gizlilik Odaklı</h4>
                    <p className="text-xs text-emerald-400/80">
                      Tettech AI, verilerinizi sadece kendi hedefleriniz için kullanır. 
                      Yetki token'larınız yüksek şifrelemeyle saklanır ve 3. şahıslara satılmaz.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== "integrations" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-surface-800 flex items-center justify-center mb-4">
                <Settings2 className="w-8 h-8 text-surface-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Yakında Eklenecek</h3>
              <p className="text-surface-400 text-sm max-w-sm">
                Bu sekme şu anda geliştirme aşamasındadır. MVP sürümünde entegrasyonlar sekmesini test edebilirsiniz.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
