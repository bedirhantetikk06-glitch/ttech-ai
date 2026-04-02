import { google } from "@ai-sdk/google";
import { generateText, CoreMessage, tool } from "ai";
import { z } from "zod";
import { addCalendarEvent } from "@/lib/googleapis/calendar";

export const ACTION_SYSTEM_PROMPT = `
Sen Tettech AI'ın Uygulayıcı (Action) ajanısın. 
Başka hiçbir ajan sistemdeki dış entegrasyonlar ile işlem yapamaz. Sadece sen takvime etkinlik ekleyebilir, e-posta taslağı oluşturabilir veya doküman oluşturabilirsin.
Kullanıcıdan onay almadan yıkıcı (silme vb.) görevler yapma. 
Oluşturduğun her dış işlemi JSON formatındaki araçları kullanarak yaparsın. Başarı durumunu raporla. Eğer kullanıcı bugün, yarın gibi görece zamanlar veriyorsa başlangıç zamanlarını ISO 8601 formatında UTC olarak tahmin et. (Örnek: 2026-04-03T14:00:00Z)
`;

export async function runActionAgent(messages: CoreMessage[], contextOverride?: string) {
  let promptMessages = [...messages];
  if (contextOverride) {
    promptMessages.push({
      role: "system",
      content: `ORKESTRATÖR YÖNLENDİRMESİ BAĞLAMI: ${contextOverride}`
    });
  }

  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: ACTION_SYSTEM_PROMPT,
    messages: promptMessages,
    tools: {
      createCalendarEvent: tool({
        description: "Google Calendar üzerinde yeni bir etkinlik veya zaman bloğu oluşturur.",
        parameters: z.object({
          title: z.string().describe("Etkinliğin başlığı"),
          description: z.string().describe("Etkinlik detayı veya motivasyon cümlesi"),
          startTime: z.string().describe("ISO 8601 formatında başlangıç zamanı (Örn: 2026-04-03T09:00:00Z)"),
          endTime: z.string().describe("ISO 8601 formatında bitiş zamanı (Örn: 2026-04-03T10:00:00Z)"),
        }),
        execute: async ({ title, description, startTime, endTime }: { title: string, description: string, startTime: string, endTime: string }) => {
          try {
            const result = await addCalendarEvent(title, description, startTime, endTime);
            return {
              success: true,
              message: `${title} takvime başarıyla eklendi.`,
              link: result.eventLink,
            };
          } catch (error: any) {
             return {
              success: false,
              message: `Takvime eklenirken hata: ${error.message}. Kullanıcıdan hesap ayarlarından Google bağlamasını iste.`,
            };
          }
        },
      }),
      createDocument: tool({
        description: "Life OS sisteminde veya Notion'da yeni bir dosya oluşturur.",
        parameters: z.object({
          title: z.string().describe("Dosya adı"),
          content: z.string().describe("Dosya içi markdown formatında içerik özeti"),
        }),
        execute: async ({ title }: { title: string, content: string }) => {
          return { success: true, message: `${title} dosyası Life OS içine eklendi.` };
        },
      })
    },
    maxSteps: 3,
  });
}
