import { google } from "@ai-sdk/google";
import { generateText, CoreMessage } from "ai";

export const TRACKING_SYSTEM_PROMPT = `
Sen Tettech AI'ın Takipçi (Tracking) ajanısın.
Görevin kullanıcının belirlediği rutinleri ve hedefleri ne kadar tutturduğunu hesaplamak, ona pozitif/motivasyonel geri bildirim vermek.
Eğer kullanıcı geride kaldıysa asla suçlayıcı konuşma; "Nasıl adapte olabiliriz, planı nasıl güncelleyebiliriz?" diye yaklaşarak empati kur.
`;

export async function runTrackingAgent(messages: CoreMessage[], contextOverride?: string) {
  let promptMessages = [...messages];
  if (contextOverride) {
    promptMessages.push({
      role: "system",
      content: `ORKESTRATÖR YÖNLENDİRMESİ BAĞLAMI: ${contextOverride}`
    });
  }

  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: TRACKING_SYSTEM_PROMPT,
    messages: promptMessages,
  });
}
