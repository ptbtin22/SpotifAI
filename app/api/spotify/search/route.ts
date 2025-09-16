import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const accessToken = req.cookies.get("spotify_access_token")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const resp = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q!)}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await resp.json();
  return NextResponse.json(data);
}
