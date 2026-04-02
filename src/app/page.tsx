"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Play,
  Star,
} from "lucide-react";
import { AGENTS, LIFE_AREA_COLORS } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const FEATURES = [
  {
    icon: Brain,
    title: "5 Uzman AI Ajan",
    description: "Araştırma, planlama, uygulama, takip ve ayna ajanları senkronize çalışır.",
    color: "#6366f1",
  },
  {
    icon: Target,
    title: "Kişisel Yol Haritası",
    description: "30 / 90 / 365 günlük gerçekçi hedefler ve adım adım aksiyon planları.",
    color: "#14b8a6",
  },
  {
    icon: TrendingUp,
    title: "Yaşam Alanı Takibi",
    description: "Kariyer, sağlık, finans, ilişkiler ve kişisel gelişiminde ilerleni izle.",
    color: "#8b5cf6",
  },
  {
    icon: Zap,
    title: "Derin Entegrasyonlar",
    description: "Google Calendar, Gmail, Notion ve Google Sheets ile otomatik senkronizasyon.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Türkçe & Güvenli",
    description: "Verileriniz Türkiye'de saklanır, tamamen şifreli ve gizlilik odaklı.",
    color: "#ec4899",
  },
  {
    icon: Sparkles,
    title: "Gelecek Benlik Vizyonu",
    description: "Ayna Ajan ile hedeflerine ulaştığında nasıl görüneceğini hayal et.",
    color: "#34d399",
  },
];

const TESTIMONIALS = [
  {
    name: "Ahmet K.",
    role: "Yazılım Girişimcisi",
    content: "3 ayda startupımı kurdum. Tettech'in planlama ajanı olmadan bu kadar hızlı olmazdı.",
    rating: 5,
  },
  {
    name: "Zeynep M.",
    role: "Kariyer Koçu",
    content: "Müşterilerime de önereceğim. Empati düzeyi ve kişiselleştirme inanılmaz.",
    rating: 5,
  },
  {
    name: "Mert B.",
    role: "Sağlık Uzmanı",
    content: "Hem kilo verme hedefimi hem de uzmanlık sınavımı aynı anda takip ettim.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-950 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Tettech AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-surface-400 hover:text-white transition-colors">
              Özellikler
            </a>
            <a href="#agents" className="text-sm text-surface-400 hover:text-white transition-colors">
              Ajanlar
            </a>
            <a href="#pricing" className="text-sm text-surface-400 hover:text-white transition-colors">
              Fiyatlandırma
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-surface-400 hover:text-white transition-colors hidden sm:block"
            >
              Giriş Yap
            </Link>
            <Link
              href="/auth/signup"
              className="btn-glow px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Türkiye&apos;nin İlk Çok-Ajanlı Yaşam Asistanı
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
            >
              Hayatını{" "}
              <span className="gradient-text">Yeniden</span>
              <br />
              İnşa Et
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed"
            >
              5 uzman yapay zeka ajanından oluşan ekibinle kariyer, sağlık, finans ve
              kişisel gelişiminde somut adımlar at. Karar yorgunluğuna son ver.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/auth/signup"
                className="btn-glow flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white w-full sm:w-auto justify-center"
              >
                Hemen Başla — Ücretsiz
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-surface-300 hover:text-white border border-white/10 hover:border-white/20 transition-all w-full sm:w-auto justify-center">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                </div>
                Demo İzle
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-6 text-sm text-surface-500"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-400" />
                Kredi kartı gerekmez
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-400" />
                14 gün ücretsiz premium
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage-400" />
                Türkçe destek
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Visual — Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-brand-gradient-subtle rounded-3xl blur-3xl scale-105" />
            <div className="glass-card rounded-3xl p-6 border border-white/10 relative">
              {/* Mock chat interface */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Tettech AI</div>
                  <div className="text-xs text-sage-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
                    5 ajan aktif
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="message-ai">
                  <p className="text-surface-200">
                    Merhaba! Ben Tettech 👋 Bugün sana nasıl yardımcı olabilirim? Kariyer hedeflerin, sağlık rutinin veya finansal planın hakkında konuşabiliriz.
                  </p>
                </div>

                <div className="message-user">
                  <p>Softawre engineering pozisyonuna geçmek istiyorum. 6 ay içinde hazır olabilir miyim?</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-surface-500 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(139, 92, 246, 0.2)" }}>
                      🗺️
                    </span>
                    Planlayıcı çalışıyor...
                  </div>
                  <div className="message-ai">
                    <p className="text-surface-200">
                      Kesinlikle! 6 ay çok makul. Hemen bir yol haritası çıkarayım:
                    </p>
                    <div className="mt-3 space-y-2">
                      {["Ay 1-2: Python & Veri Yapıları temelleri", "Ay 3-4: Web geliştirme & proje portföyü", "Ay 5-6: Mülakat hazırlığı & iş başvuruları"].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-surface-300">
                          <CheckCircle2 className="w-4 h-4 text-sage-400 mt-0.5 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-center gap-2 ml-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: "rgba(99, 102, 241, 0.2)" }}>🔍</span>
                  <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                  <span className="text-xs text-surface-500">Araştırmacı ajan kaynaklar buluyor...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Her şey bir yerde
            </h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              Dağınık araçlara veda et. Tettech AI tüm yaşam koçluğunu tek platformda toplar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover rounded-2xl p-6 group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-surface-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/3 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              5 Uzman Ajan, 1 Ekip
            </h2>
            <p className="text-surface-400 text-lg max-w-2xl mx-auto">
              Her ajan kendi alanında uzman. Birlikte çalışarak sana özel bir yol haritası oluşturuyorlar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(AGENTS).filter(a => a.id !== "orchestrator").map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/8 group hover:border-white/15 transition-all duration-300"
                style={{ "--agent-color": agent.color } as React.CSSProperties}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="text-2xl w-12 h-12 flex items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${agent.color}20` }}
                  >
                    {agent.emoji}
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `${agent.color}20`,
                      color: agent.color,
                      border: `1px solid ${agent.color}40`
                    }}
                  >
                    {agent.nameEn}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                <p className="text-surface-400 text-sm">{agent.description}</p>
              </motion.div>
            ))}

            {/* Orchestrator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl p-6 relative overflow-hidden col-span-1 md:col-span-2 lg:col-span-3"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(20, 184, 166, 0.15))",
                border: "1px solid rgba(99, 102, 241, 0.3)",
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(99, 102, 241, 0.2)" }}>
                  🌐
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">Tettech — Baş Orkestratör</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      Orchestrator
                    </span>
                  </div>
                  <p className="text-surface-400">
                    Tüm ajanları koordine eder, kullanıcı niyetini analiz eder ve doğru uzmanı devreye sokar. Tek chat arayüzünüzde 5 ajanın gücünü birleştirir.
                  </p>
                </div>
                <Link
                  href="/auth/signup"
                  className="btn-glow shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white flex items-center gap-2"
                >
                  Hemen Dene <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life Areas */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hayatının Tüm Alanları
            </h2>
            <p className="text-surface-400 text-lg">
              Dengeli bir yaşam için 5 temel alana odaklan.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { key: "career", label: "Kariyer", desc: "İş, terfi, girişim" },
              { key: "health", label: "Sağlık", desc: "Fitness, beslenme, uyku" },
              { key: "finance", label: "Finans", desc: "Birikim, yatırım" },
              { key: "relationships", label: "İlişkiler", desc: "Aile, arkadaş, ağ" },
              { key: "personal", label: "Kişisel", desc: "Öğrenme, hobiler" },
            ].map((area, i) => {
              const color = LIFE_AREA_COLORS[area.key as keyof typeof LIFE_AREA_COLORS];
              return (
                <motion.div
                  key={area.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 text-center group hover:scale-105 transition-transform duration-300 cursor-default col-span-1"
                  style={{ borderColor: `${color.primary}30` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl"
                    style={{ backgroundColor: color.bg, border: `1px solid ${color.primary}40` }}
                  >
                    {["💼", "💪", "💰", "❤️", "✨"][i]}
                  </div>
                  <div className="text-sm font-bold text-white">{area.label}</div>
                  <div className="text-xs text-surface-500 mt-1">{area.desc}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Kullanıcılar ne diyor?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-surface-300 text-sm leading-relaxed mb-4">&quot;{t.content}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-surface-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Basit Fiyatlandırma
            </h2>
            <p className="text-surface-400 text-lg">
              Ücretsiz başla, büyüdükçe yükselt.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 border border-white/10"
            >
              <div className="text-surface-400 text-sm font-medium mb-2">Ücretsiz</div>
              <div className="text-5xl font-black text-white mb-1">₺0</div>
              <div className="text-surface-500 text-sm mb-8">Sonsuza kadar ücretsiz</div>

              <div className="space-y-3 mb-8">
                {[
                  "Günde 10 mesaj",
                  "Temel planlama",
                  "2 yaşam alanı takibi",
                  "Sohbet geçmişi (7 gün)",
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-surface-300">
                    <CheckCircle2 className="w-4 h-4 text-sage-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href="/auth/signup"
                className="block text-center py-3.5 px-6 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
              >
                Ücretsiz Başla
              </Link>
            </motion.div>

            {/* Premium */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(20, 184, 166, 0.1))",
                border: "1px solid rgba(99, 102, 241, 0.4)",
              }}
            >
              <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full gradient-bg text-white">
                EN POPÜLER
              </div>
              <div className="text-brand-300 text-sm font-medium mb-2">Premium</div>
              <div className="text-5xl font-black text-white mb-1">₺299</div>
              <div className="text-surface-500 text-sm mb-8">aylık · KDV dahil</div>

              <div className="space-y-3 mb-8">
                {[
                  "Sınırsız mesaj",
                  "5 uzman ajan tam erişim",
                  "Tüm yaşam alanları",
                  "Google Calendar, Gmail, Notion entegrasyonu",
                  "WhatsApp bildirimleri",
                  "Ayna Ajan (Gelecek Benlik)",
                  "7/24 öncelikli destek",
                  "Sınırsız sohbet geçmişi",
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-surface-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                href="/auth/signup"
                className="btn-glow block text-center py-3.5 px-6 rounded-xl text-white font-bold"
              >
                14 Gün Ücretsiz Dene
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(20, 184, 166, 0.15))",
            border: "1px solid rgba(99, 102, 241, 0.3)",
          }}
        >
          <div className="absolute inset-0 bg-brand-gradient-subtle" />
          <div className="relative">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Bugün Başla
            </h2>
            <p className="text-surface-300 text-lg mb-8 max-w-xl mx-auto">
              Hayalindeki hayatın 5 ajan ötende. Kredi kartı gerektirmiyor, anında başlayabilirsin.
            </p>
            <Link
              href="/auth/signup"
              className="btn-glow inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-lg font-bold text-white"
            >
              Ücretsiz Hesap Oluştur
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold">Tettech AI</span>
          </div>
          <div className="text-surface-500 text-sm">
            © {new Date().getFullYear()} Tettech AI. Tüm hakları saklıdır.
          </div>
          <div className="flex gap-6 text-sm text-surface-400">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Şartlar</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
