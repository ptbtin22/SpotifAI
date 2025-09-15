import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const resp = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: resp.status }
    );
  }

  const data = await resp.json();
  return NextResponse.json(data);
}
