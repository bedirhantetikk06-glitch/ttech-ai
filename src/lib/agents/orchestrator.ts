import { google } from "@ai-sdk/google";
import { generateText, tool, CoreMessage } from "ai";
import { z } from "zod";

// --- ORCHESTRATOR AGENT ---
// Niyeti analiz eder ve doğru alt ajana yönlendirir veya kendisi cevaplar.

export const ORCHESTRATOR_SYSTEM_PROMPT = `
Sen Tettech AI'ın Baş Orkestratör ajanısın. Görevin, kullanıcının niyetini anlamak ve gerektiğinde bu niyeti 5 uzman ajanından birine yönlendirmek veya temel sohbet/koordinasyon işlemlerini kendin halletmektir.
Empatik, profesyonel ama samimi bir Türk yaşam koçu gibi konuşursun. Kısa ve öz ol.

Uzman Ajanların:
1. "Araştırmacı" (Research): Veri toplama, analiz, internette pazar arama, makale bulma.
2. "Planlayıcı" (Planning): 30/90/365 günlük somut yol haritaları oluşturma, hedef belirleme.
3. "Uygulayıcı" (Action): Takvime etkinlik ekleme, e-posta taslağı yazma, entegrasyon tetikleme. (Şu an simülasyon modunda)
4. "Takipçi" (Tracking): İlerleme metriklerini analiz etme, hesap sorma, empati kurarak motivasyon sağlama.
5. "Ayna" (Mirror): Vizyon oluşturma, kullanıcının gelecekte hedefine ulaşmış halini betimleme.

Görevin:
Eğer kullanıcı belirgin bir uzmanlık istiyorsa (örn. "Bana bir yazılım öğrenme planı çıkar"), 'routeToAgent' aracını (tool) kullanarak isteği ilgili ajana yönlendir.
Aksi takdirde, kullanıcıya doğrudan destek ol veya onu yönlendirmek için kısa bir tavsiye ver.
`;

export async function runOrchestrator(messages: CoreMessage[]) {
  // In a full implementation, we process the state graph. Here we use function calling as routing.
  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: ORCHESTRATOR_SYSTEM_PROMPT,
    messages,
    tools: {
      routeToAgent: tool({
        description: "Kullanıcının isteğini çözmek için en uygun uzman ajana yönlendirir.",
        parameters: z.object({
          agentId: z.enum(["research", "planning", "action", "tracking", "mirror"]).describe("Yönlendirilecek ajanın ID'si."),
          context: z.string().describe("Ajana aktarılacak özet bağlam veya kullanıcının net isteği."),
        }),
        execute: async ({ agentId, context }) => {
          // In actual flow, this triggers the specific agent module.
          return {
            status: "routed",
            agentId,
            message: `${agentId} ajanı devreye alındı. Bağlam: ${context}`,
          };
        },
      }),
    },
    maxSteps: 2, // Allow it to call the routing tool and then generate a final response.
  });
}
