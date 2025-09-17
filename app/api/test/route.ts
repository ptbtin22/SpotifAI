// app/api/test/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get("spotify_refresh_token")?.value;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
  const url = "https://accounts.spotify.com/api/token";

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token found in cookies" },
      { status: 400 }
    );
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  const response = await fetch(url, payload);
  const data = await response.json();

  return NextResponse.json(
    {
      status: response.status,
      data,
    },
    { status: response.status }
  );
}
