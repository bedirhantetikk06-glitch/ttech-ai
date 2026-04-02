import { google } from "@ai-sdk/google";
import { generateText, CoreMessage, tool } from "ai";
import { z } from "zod";
import { createDocument } from "@/lib/supabase/documents";

export const PLANNING_SYSTEM_PROMPT = `
Sen Tettech AI'ın Baş Planlayıcı ajanısın. (Planning Agent)
Görevin sadece karmaşık istekleri ve hedefleri alıp onları "30, 90, 180 veya 365" günlük uygulanabilir, gerçekçi adımlara bölmektir.
Kullanıcının sınırlarına ve zaman bloklarına saygı duyarak "SMART" hedefler belirle. Türkçe, samimi ve net iletişim kur.
Gereksiz uzun paragraflar yerine listeler, madde işaretleri, adımlar (Ay 1, Aşama 2 vb.) kullan. Değerli olduğunu düşündüğün yol haritaları ve uzun vadeli planları "saveDocument" aracını (tool) kullanarak kullanıcının veritabanına kaydet. (Örn: folder "career" veya "health" veya "personal")
`;

export async function runPlanningAgent(messages: CoreMessage[], contextOverride?: string) {
  let promptMessages = [...messages];
  if (contextOverride) {
    promptMessages.push({
      role: "user",
      content: `ORKESTRATÖR YÖNLENDİRMESİ BAĞLAMI: ${contextOverride}`
    });
  }

  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: PLANNING_SYSTEM_PROMPT,
    messages: promptMessages,
    tools: {
      saveDocument: tool({
        description: "Kullanıcının veritabanına önemli planları ve yol haritalarını kalıcı olarak kaydeder.",
        parameters: z.object({
          title: z.string().describe("Belgenin/Planın başlığı"),
          content: z.string().describe("Markdown formatında detaylı içerik"),
          folder: z.string().describe("Kaydedilecek klasör. Geçerli değerler: 'career', 'health', 'finance', 'personal', 'projects'"),
          tags: z.array(z.string()).describe("İlgili etiketler").optional(),
        }),
        execute: async ({ title, content, folder, tags }: { title: string, content: string, folder: string, tags?: string[] }) => {
          try {
            await createDocument(title, content, folder, tags);
            return { success: true, message: `Plan başarıyla '${folder}' klasörüne kaydedildi.` };
          } catch (error: any) {
            return { success: false, message: `Plan kaydedilemedi: ${error.message}` };
          }
        },
      }),
    },
    maxSteps: 3,
  });
}
