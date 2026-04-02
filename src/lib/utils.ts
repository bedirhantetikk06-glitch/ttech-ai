import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Az önce";
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHour < 24) return `${diffHour} saat önce`;
  if (diffDay < 7) return `${diffDay} gün önce`;
  return formatDate(d);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Life area colors
export const LIFE_AREA_COLORS = {
  career: { primary: "#6366f1", secondary: "#818cf8", bg: "rgba(99, 102, 241, 0.15)" },
  health: { primary: "#14b8a6", secondary: "#5eead4", bg: "rgba(20, 184, 166, 0.15)" },
  finance: { primary: "#f59e0b", secondary: "#fcd34d", bg: "rgba(245, 158, 11, 0.15)" },
  relationships: { primary: "#ec4899", secondary: "#f9a8d4", bg: "rgba(236, 72, 153, 0.15)" },
  personal: { primary: "#8b5cf6", secondary: "#c4b5fd", bg: "rgba(139, 92, 246, 0.15)" },
} as const;

export type LifeArea = keyof typeof LIFE_AREA_COLORS;

// Agent configurations
export const AGENTS = {
  orchestrator: {
    id: "orchestrator",
    name: "Tettech",
    nameEn: "Tettech",
    emoji: "🌐",
    color: "#6366f1",
    description: "Ana koordinatör",
  },
  research: {
    id: "research",
    name: "Araştırmacı",
    nameEn: "Research Agent",
    emoji: "🔍",
    color: "#14b8a6",
    description: "Veri toplama ve analiz",
  },
  planning: {
    id: "planning",
    name: "Planlayıcı",
    nameEn: "Planning Agent",
    emoji: "🗺️",
    color: "#8b5cf6",
    description: "Yol haritası oluşturma",
  },
  action: {
    id: "action",
    name: "Uygulayıcı",
    nameEn: "Action Agent",
    emoji: "⚡",
    color: "#f59e0b",
    description: "Görev yürütme",
  },
  tracking: {
    id: "tracking",
    name: "Takipçi",
    nameEn: "Tracking Agent",
    emoji: "📊",
    color: "#ec4899",
    description: "İlerleme takibi",
  },
  mirror: {
    id: "mirror",
    name: "Ayna",
    nameEn: "Mirror Agent",
    emoji: "🪞",
    color: "#34d399",
    description: "Gelecek benlik vizyonu",
  },
} as const;

export type AgentId = keyof typeof AGENTS;
