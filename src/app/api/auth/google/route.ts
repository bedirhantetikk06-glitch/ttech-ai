import { NextResponse } from "next/server";
import { oauth2Client } from "@/lib/googleapis/calendar";

export async function GET() {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
    prompt: 'consent' // Forces consent screen to get refresh token
  });

  return NextResponse.redirect(authorizationUrl);
}
