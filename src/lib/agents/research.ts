import { google } from "@ai-sdk/google";
import { generateText, CoreMessage, tool } from "ai";
import { z } from "zod";
import { createDocument } from "@/lib/supabase/documents";

export const RESEARCH_SYSTEM_PROMPT = `
Sen Tettech AI'ın Baş Araştırmacı (Research) ajanısın. 
Görevin, kullanıcının hedeflerini besleyecek veya sorduğu sorularla ilgili en net, en objektif ve en güncel bilgileri derlemek. 
Özetlerken akademik bir dil değil, kolay anlaşılır, hap bilgiler sunmalısın. Eğer yaptığın araştırma kullanıcı için ileride değerli olacak uzun ve yapısal bir belge (rapor, piyasa analizi) ise, "saveDocument" aracını (tool) kullanarak bu belgeyi doğrudan kullanıcının klasörlerine kaydet. Klasör seçerken: 'career', 'health', 'finance', 'personal' klasörlerinden birini seç.
`;

export async function runResearchAgent(messages: CoreMessage[], contextOverride?: string) {
  let promptMessages = [...messages];
  if (contextOverride) {
    promptMessages.push({
      role: "user",
      content: `ORKESTRATÖR YÖNLENDİRMESİ BAĞLAMI: ${contextOverride}`
    });
  }

  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: RESEARCH_SYSTEM_PROMPT,
    messages: promptMessages,
    tools: {
      saveDocument: tool({
        description: "Kullanıcının veritabanına önemli araştırma raporlarını kalıcı olarak kaydeder.",
        parameters: z.object({
          title: z.string().describe("Belgenin başlığı"),
          content: z.string().describe("Markdown formatında detaylı içerik"),
          folder: z.string().describe("Kaydedilecek klasör. Geçerli değerler: 'career', 'health', 'finance', 'personal', 'projects'"),
          tags: z.array(z.string()).describe("İlgili etiketler").optional(),
        }),
        execute: async ({ title, content, folder, tags }: { title: string, content: string, folder: string, tags?: string[] }) => {
          try {
            await createDocument(title, content, folder, tags);
            return { success: true, message: `Belge başarıyla '${folder}' klasörüne kaydedildi.` };
          } catch (error: any) {
            return { success: false, message: `Belge kaydedilemedi: ${error.message}` };
          }
        },
      }),
    },
    maxSteps: 3, // Allow the agent to call tool and then respond
  });
}
