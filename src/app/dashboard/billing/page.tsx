"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { 
  CreditCard, CheckCircle2, Zap, ShieldCheck, 
  ArrowRight, Download, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("free");
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function checkPlan() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("subscriptions").select("plan_tier, status").eq("user_id", user.id).single();
      if (data && data.status === "active") {
        setPlan(data.plan_tier);
      }
      setIsLoadingPlan(false);
    }
    checkPlan();
  }, [supabase]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      // In real scenario, priceId comes from a constant mapping
      const priceId = isAnnual ? "price_annual_mock" : "price_monthly_mock";
      
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Beklenmeyen hata");
        setLoading(false);
      }
    } catch(err) {
      alert("Hata oluştu.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Abonelik & Faturalandırma</h1>
        <p className="text-surface-400">Planınızı yönetin, limitlerinizi inceleyin ve fatura geçmişinize bakın.</p>
      </div>

      {/* Current Plan Overview */}
      <div className="glass-card rounded-3xl p-1 border border-white/5 bg-surface-900 flex flex-col md:flex-row">
        {/* Left Side: Current Status */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <div className="text-xs text-surface-400 font-medium">Mevcut Planınız</div>
              <div className="text-xl font-bold text-white flex items-center gap-2 capitalize">
                {isLoadingPlan ? "Yükleniyor..." : `${plan} Plan`}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-800 text-surface-400 border border-surface-700">
                  AKTİF
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-surface-300">Aylık Ajana Danışma Hakkı</span>
                <span className="text-white font-medium">3 / 10 kullanıldı</span>
              </div>
              <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-brand-500" style={{ width: '30%' }} />
              </div>
            </div>
          </div>
          
          <p className="text-xs text-surface-500 flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            Ücretsiz planı zaman sınırı olmadan sonsuza kadar kullanabilirsiniz.
          </p>
        </div>

        {/* Right Side: Upgrade CTA */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Sınırları Kaldırın
            </h3>
            <p className="text-sm text-surface-300 mb-6 leading-relaxed">
              Premium'a geçerek 5 ajanın da tam kapasitesini açın, dış dünyayla entegre olun ve hayatınızın kontrolünü tamamen elinize alın.
            </p>
            
            {plan === "free" ? (
              <button 
                onClick={handleUpgrade}
                disabled={loading}
                className="btn-glow w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Premium'a Yükselt <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            ) : (
               <button 
                disabled
                className="w-full py-3.5 rounded-xl text-brand-300 bg-brand-500/10 font-bold flex items-center justify-center gap-2 cursor-default"
              >
                Şu an Premium'dasınız 🎉
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards (Inline for easy reading) */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Planlar</h2>
          
          {/* Toggle */}
           <div className="flex items-center bg-surface-800 rounded-full p-1 border border-white/5">
            <button 
              onClick={() => setIsAnnual(false)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                !isAnnual ? "bg-surface-700 text-white shadow-sm" : "text-surface-400 hover:text-white"
              )}
            >
              Aylık
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1",
                isAnnual ? "bg-surface-700 text-white shadow-sm" : "text-surface-400 hover:text-white"
              )}
            >
              Yıllık <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded-full border border-emerald-500/20">%20 İndirim</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-6 border border-white/5">
             <div className="text-surface-400 text-sm font-medium mb-1">Başlangıç</div>
             <div className="text-3xl font-black text-white mb-6">₺0</div>
             
             <div className="space-y-3">
                {[
                  "Günde 10 ajana danışma hakkı",
                  "Temel planlama özellikleri",
                  "2 yaşam alanı takibi",
                  "Sohbet geçmişi (Sadece 7 gün)",
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-surface-300">
                    <CheckCircle2 className="w-4 h-4 text-surface-500 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
          </div>
          
          {/* Card 2 */}
          <div className="rounded-2xl p-6 border border-brand-500/30 relative"
               style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(20, 184, 166, 0.05))" }}>
             <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full gradient-bg text-white">
                ÖNERİLEN
             </div>
             <div className="text-brand-300 text-sm font-medium mb-1">Premium</div>
             <div className="text-3xl font-black text-white mb-1">
               {isAnnual ? "₺239" : "₺299"}
               <span className="text-sm font-medium text-surface-500">/ay</span>
             </div>
             <div className="text-xs text-surface-400 mb-6 h-4">
               {isAnnual && "Yıllık ₺2868 olarak faturalandırılır"}
             </div>
             
             <div className="space-y-3">
                {[
                  "Sınırsız ajana danışma",
                  "Tüm ajanlara anında erişim",
                  "Google, Notion, Mail entegrasyonu",
                  "Sınırsız arşiv ve hafıza (Life OS)",
                  "Ayna Ajanı (Gelecek Vizyonu)",
                  "Öncelikli destek",
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-surface-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>

      {/* Invoice History Mock */}
      <div className="pt-6 border-t border-white/5">
        <h2 className="text-lg font-bold text-white mb-4">Fatura Geçmişi</h2>
        <div className="glass-card rounded-xl border border-white/5 flex flex-col items-center justify-center py-12">
          <Clock className="w-10 h-10 text-surface-600 mb-3" />
          <div className="text-surface-400 text-sm font-medium">Henüz bir fatura geçmişiniz bulunmuyor.</div>
        </div>
      </div>
    </div>
  );
}
