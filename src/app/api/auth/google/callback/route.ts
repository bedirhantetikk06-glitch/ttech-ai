import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/googleapis/calendar";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=Google yetkilendirmesi iptal edildi.`);
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login?error=Lütfen giriş yapın.`);
    }

    // Exchange the authorization code for an access token
    const { tokens } = await oauth2Client.getToken(code);
    
    // Check if integration exists, if so update, if not insert
    const { data: existing } = await supabase
      .from("user_integrations")
      .select("id")
      .eq("user_id", user.id)
      .eq("provider", "google")
      .single();

    if (existing) {
      await supabase
        .from("user_integrations")
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || undefined, // keeps old refresh token if not provided
          expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("user_integrations")
        .insert({
          user_id: user.id,
          provider: "google",
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expires_at: tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : null,
        });
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=Google Takvim başarıyla bağlandı!`);
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=Kimlik doğrulama sırasında bir hata oluştu.`);
  }
}
