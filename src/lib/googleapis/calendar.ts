import { google } from "googleapis";
import { createClient } from "@/lib/supabase/server";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
);

export async function getGoogleCalendarClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Fetch token from integrations table
  const { data: integration, error } = await supabase
    .from("user_integrations")
    .select("*")
    .eq("user_id", user.id)
    .eq("provider", "google")
    .single();

  if (error || !integration || !integration.access_token) {
    throw new Error("Google Calendar integration not found or unauthorized");
  }

  // Set credentials
  oauth2Client.setCredentials({
    access_token: integration.access_token,
    refresh_token: integration.refresh_token,
    expiry_date: integration.expires_at ? new Date(integration.expires_at).getTime() : null,
  });

  // Handle token refresh if expired (googleapis handles this automatically if refresh_token is present)
  // But we might want to listen to token event to save the newly refreshed token
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      const updates: any = {
        access_token: tokens.access_token,
        updated_at: new Date().toISOString(),
      };
      if (tokens.refresh_token) updates.refresh_token = tokens.refresh_token;
      if (tokens.expiry_date) updates.expires_at = new Date(tokens.expiry_date).toISOString();

      await supabase
        .from("user_integrations")
        .update(updates)
        .eq("user_id", user.id)
        .eq("provider", "google");
    }
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function addCalendarEvent(title: string, description: string, startTime: string, endTime: string) {
  try {
    const calendar = await getGoogleCalendarClient();
    const event = {
      summary: title,
      description,
      start: {
        dateTime: startTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return { success: true, eventLink: response.data.htmlLink };
  } catch (err: any) {
    console.error("Calendar Insert Error:", err);
    throw new Error("Takvim etkinliği oluşturulamadı. Lütfen Google yetkilendirmenizi kontrol edin.");
  }
}
