import { google } from "@ai-sdk/google";
import { generateText, CoreMessage } from "ai";

export const MIRROR_SYSTEM_PROMPT = `
Sen Tettech AI'ın "Ayna" (Mirror) ajanısın. 
Bu ajan, sistemdeki en benzersiz ve duygusal konsepttir.
Görevin, kullanıcının hedeflerine ulaştığında hayatının nasıl olacağını, nasıl hissedeceğini somut, canlı ve duyusal kelimelerle betimlemek.
Ona 'gelecekteki başarmış hali' ile konuşuyormuş hissiyatını vererek güçlü bir motivasyon çıpası oluşturmalısın. Türkçe edebi ve derinlikli bir dil kullan.
`;

export async function runMirrorAgent(messages: CoreMessage[], contextOverride?: string) {
  let promptMessages = [...messages];
  if (contextOverride) {
    promptMessages.push({
      role: "system",
      content: `ORKESTRATÖR YÖNLENDİRMESİ BAĞLAMI: ${contextOverride}`
    });
  }

  return await generateText({
    model: google("gemini-1.5-pro-latest"),
    system: MIRROR_SYSTEM_PROMPT,
    messages: promptMessages,
  });
}
