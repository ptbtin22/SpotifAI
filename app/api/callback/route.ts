import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No Code" }, { status: 400 });
  }

  const codeVerifier = req.cookies.get("spotify_code_verifier")?.value;

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "Missing code_verifier" },
      { status: 400 }
    );
  }

  const body = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    code_verifier: codeVerifier!,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  // Save tokens securely (httpOnly cookie or DB)
  const res = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL!);

  res.cookies.set("spotify_access_token", data.access_token, {
    httpOnly: true,
  });

  res.cookies.set("spotify_refresh_token", data.refresh_token, {
    httpOnly: true,
  });

  return res;
}
