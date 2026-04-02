"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { 
  Folder, FileText, Search, Plus, Filter, 
  ChevronRight, MoreHorizontal, Calendar, 
  Map, FileCheck, BrainCircuit
} from "lucide-react";
import { LIFE_AREA_COLORS } from "@/lib/utils";

// Note: Directory counts will be calculated later or remain static for now
const DIRECTORIES = [
  { id: "career", name: "Kariyer", count: 12, icon: "💼" },
  { id: "health", name: "Sağlık & Fitness", count: 8, icon: "💪" },
  { id: "finance", name: "Finans", count: 15, icon: "💰" },
  { id: "relationships", name: "İlişkiler", count: 3, icon: "❤️" },
  { id: "personal", name: "Kişisel Gelişim", count: 24, icon: "✨" },
];

const getFileIcon = (folder: string) => {
  switch (folder) {
    case "career": return <Map className="w-5 h-5" />;
    case "finance": return <FileCheck className="w-5 h-5" />;
    case "health": return <BrainCircuit className="w-5 h-5" />;
    default: return <FileText className="w-5 h-5" />;
  }
};

export default function LifeOSPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchDocuments() {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDocuments(data);
      }
      setLoading(false);
    }
    fetchDocuments();
  }, [supabase]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Life OS</h1>
          <p className="text-surface-400">Ajanların ürettiği tüm planlar, raporlar ve belgelerin merkezi arşivi.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input 
              type="text" 
              placeholder="Dosya veya klasör ara..." 
              className="bg-surface-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500/50 w-full md:w-64"
            />
          </div>
          <button className="btn-glow p-2 rounded-xl text-white">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Directory Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Yaşam Alanları</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DIRECTORIES.map((dir, i) => {
            const color = LIFE_AREA_COLORS[dir.id as keyof typeof LIFE_AREA_COLORS];
            const isActive = activeFolder === dir.id;
            
            return (
              <motion.button
                key={dir.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveFolder(isActive ? null : dir.id)}
                className={`glass-card rounded-2xl p-4 text-left transition-all duration-300 border ${
                  isActive ? 'border-brand-500/50 shadow-glow-sm' : 'border-white/5 hover:border-white/15'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: color.bg, border: `1px solid ${color.primary}40` }}
                  >
                    {dir.icon}
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-surface-500" />
                </div>
                <h3 className="font-semibold text-white truncate">{dir.name}</h3>
                <p className="text-xs text-surface-400 mt-1">{dir.count} dosya</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {activeFolder ? `${DIRECTORIES.find(d => d.id === activeFolder)?.name} Dosyaları` : "Son İşlemler"}
          </h2>
          <button className="text-sm text-surface-400 hover:text-white flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" /> Filtrele
          </button>
        </div>

        <div className="glass-card rounded-2xl border border-white/5 overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-sm text-surface-400">
                  <th className="px-6 py-4 font-medium">İsim</th>
                  <th className="px-6 py-4 font-medium hidden sm:table-cell">Alan</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Oluşturan Ajan</th>
                  <th className="px-6 py-4 font-medium text-right">Tarih</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.filter(f => !activeFolder || f.folder === activeFolder).map((file) => {
                  const areaColor = LIFE_AREA_COLORS[file.folder as keyof typeof LIFE_AREA_COLORS] || LIFE_AREA_COLORS.personal;
                  
                  return (
                    <tr key={file.id} className="group hover:bg-surface-800/30 transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center shrink-0 group-hover:bg-brand-500/10 group-hover:text-brand-400 transition-colors text-surface-400 border border-white/5 group-hover:border-brand-500/30">
                            {getFileIcon(file.folder)}
                          </div>
                          <span className="font-medium text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                            {file.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span 
                          className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: areaColor.bg, color: areaColor.secondary, border: `1px solid ${areaColor.primary}40` }}
                        >
                          {DIRECTORIES.find(d => d.id === file.folder)?.name || file.folder}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-surface-800 flex items-center justify-center text-xs">
                            🤖
                          </div>
                          <span className="text-sm text-surface-300 capitalize">AI Ajanı</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm text-surface-400 whitespace-nowrap">
                          {formatDistanceToNow(new Date(file.created_at), { addSuffix: true, locale: tr })}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {loading && (
              <div className="p-12 text-center text-surface-400 flex flex-col items-center justify-center">
                <BrainCircuit className="w-8 h-8 animate-pulse mb-4 text-brand-500" />
                <p>Belgeler yükleniyor...</p>
              </div>
            )}

            {!loading && documents.filter(f => !activeFolder || f.folder === activeFolder).length === 0 && (
              <div className="p-12 text-center text-surface-400">
                <Folder className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Bu alanda henüz bir dosya bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
