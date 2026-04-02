# Tettech AI — "Hayatını Yeniden İnşa Et"

Tettech AI, kariyer, sağlık, finans, ilişkiler ve kişisel gelişim hedeflerinizi yönetmek için tasarlanmış, 5 uzman ajandan (Research, Planning, Action, Tracking, Mirror) ve 1 Ana Orkestratörden oluşan çoklu ajan (multi-agent) destekli kişisel bir yaşam koçluğu platformudur.

![Tettech AI Platform](public/noise.png) *Görsel temsilidir*

## Özellikler

- 🌟 **Tekil Sohbet Arayüzü (Single Chat Interface):** Tüm uzman ajanlarla tek bir ekrandan konuşabilirsiniz.
- 🧠 **Çoklu Ajan (Multi-Agent) Mimarisi:** Vercel AI SDK entegrasyonu ile Orkestratör gelen niyeti analiz eder ve doğru ajana paslar.
- 📂 **Life OS:** Tüm planların, makalelerin ve araştırma notlarının tutulduğu dosya yönetim sistemi.
- 📊 **Yaşam Alanı Dengesi:** Günlük görevler (streaks) ve radar modeli üzerinden analiz.
- ⚡ **Tamamen Türkçe ve Empatik:** Hedef kitlesi olan Türk kullanıcılarına profesyonel ama empatik yaklaşır.
- 🔐 **Premium Deneyim:** Glassmorphism, yumuşak animasyonlar (Framer Motion) ve kusursuz Light/Dark mod.

## Kurulum ve Çalıştırma

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
- Node.js (v18+)
- npm veya pnpm
- Supabase Hesabı (Veritabanı ve Auth için)
- Google Gemini API Anahtarı (Agent'lar için)

### 2. Bağımlılıkları Yükleyin

Proje dizininde standart npm yüklemesini çalıştırın:
```bash
npm install
```

### 3. Çevresel Değişkenler
Ana dizindeki `.env.example` dosyasını `.env.local` olarak kopyalayın ve kendi API anahtarlarınızı girin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

## Proje Yapısı

- `src/app`: Next.js 15 App router yapısı (Açılış sayfası, Dashboard, Auth).
- `src/components`: UI ve Dashboard bileşenleri (DashboardShell, Agent UI).
- `src/lib/agents`: Orkestratör ve 5 farklı Uzman Ajanın Vercel AI konfigurasyonları, System Prompt'ları.
- `src/lib/supabase`: Next.js uyumlu, middleware tabanlı yetkilendirme dosyaları.

## Teknoloji Yığını
- **Frontend Core**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Animations**: Framer Motion
- **Database & Auth**: Supabase
- **AI Core**: Vercel AI SDK, `@ai-sdk/google` (Gemini 1.5 Pro)

---
*Tettech AI - Karar Yorgunluğuna Son Verin.*
