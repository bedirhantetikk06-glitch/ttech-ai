"use client";

import { motion } from "framer-motion";
import { 
  Target, Zap, Calendar, TrendingUp, ChevronRight, CheckCircle2, Circle
} from "lucide-react";
import { LIFE_AREA_COLORS } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Güncel Durum</h1>
          <p className="text-surface-400">Hayatının 5 temel alanındaki genel ilerlemen.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-xs text-surface-400 font-medium">Seri</div>
              <div className="text-lg font-bold text-white">12 Gün</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Tasks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 lg:col-span-2 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-400" />
              Bugünün Aksiyonları
            </h2>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-brand-500/10 text-brand-400">
              3/5 Tamamlandı
            </span>
          </div>
          
          <div className="space-y-3">
            {[
              { title: "React dökümantasyonunu oku", area: "career", done: true },
              { title: "45 dk yürüyüş", area: "health", done: true },
              { title: "Bütçe tablosunu güncelle", area: "finance", done: true },
              { title: "Mentor ile görüşme", area: "career", done: false },
              { title: "İspanyolca kelime tekrarı", area: "personal", done: false },
            ].map((task, i) => {
              const color = LIFE_AREA_COLORS[task.area as keyof typeof LIFE_AREA_COLORS];
              return (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${task.done ? 'bg-surface-800/30' : 'bg-surface-800/80 hover:bg-surface-700/80'}`}>
                  <button className="shrink-0 transition-transform active:scale-95">
                    {task.done ? (
                      <CheckCircle2 className="w-6 h-6 text-sage-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-surface-500" />
                    )}
                  </button>
                  <div className={`flex-1 text-sm ${task.done ? 'text-surface-500 line-through' : 'text-surface-200'}`}>
                    {task.title}
                  </div>
                  <div 
                    className="shrink-0 w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: color.primary }} 
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Life Areas Mini Radar (Placeholder for actual chart) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sage-400" />
              Denge
            </h2>
          </div>
          
          <div className="flex-1 flex flex-col justify-center space-y-4">
             {Object.entries({
               "Kariyer": 85,
               "Sağlık": 60,
               "Finans": 75,
               "İlişkiler": 90,
               "Kişisel": 55
             }).map(([name, score], i) => (
               <div key={name}>
                 <div className="flex justify-between text-xs mb-1.5">
                   <span className="text-surface-300">{name}</span>
                   <span className="text-white font-medium">{score}%</span>
                 </div>
                 <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${score}%` }}
                     transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                     className="h-full rounded-full gradient-bg"
                   />
                 </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Active Goals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Aktif Hedefler</h2>
          <button className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors">
            Tümünü Gör <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Senior Developer Pozisyonu", area: "career", progress: 65, daysLeft: 45 },
            { title: "Acil Durum Fonu ($5000)", area: "finance", progress: 40, daysLeft: 120 },
            { title: "Yarı Maraton", area: "health", progress: 80, daysLeft: 14 },
          ].map((goal, i) => {
            const color = LIFE_AREA_COLORS[goal.area as keyof typeof LIFE_AREA_COLORS];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="glass-card-hover rounded-2xl p-6 border border-white/5 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mb-3"
                    style={{ backgroundColor: color.bg, border: `1px solid ${color.primary}40` }}
                  >
                    <Target className="w-5 h-5" style={{ color: color.primary }} />
                  </div>
                  <span className="text-xs font-medium text-surface-400 bg-surface-800 px-2.5 py-1 rounded-full">
                    {goal.daysLeft} gün kaldı
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-white mb-4 line-clamp-2 min-h-[48px]">
                  {goal.title}
                </h3>
                
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-surface-400">İlerleme</span>
                    <span className="text-white font-medium">{goal.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${goal.progress}%`, backgroundColor: color.primary }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
