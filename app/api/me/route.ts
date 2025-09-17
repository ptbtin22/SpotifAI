import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let accessToken = req.cookies.get("spotify_access_token")?.value;
  let refreshToken = req.cookies.get("spotify_refresh_token")?.value;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // helper to call Spotify API
  const fetchProfile = async (token: string) =>
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

  // 1. Try with current access token
  let resp = await fetchProfile(accessToken);

  // 2. If token expired (401), try refresh
  if (resp.status === 401 && refreshToken) {
    const refreshResp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }),
    });

    const refreshData = await refreshResp.json();

    if (!refreshResp.ok) {
      return NextResponse.json(refreshData, { status: refreshResp.status });
    }

    // update access token
    accessToken = refreshData.access_token;

    //  store new refresh token if returned
    if (refreshData.refresh_token) {
      refreshToken = refreshData.refresh_token;
    }

    // retry Spotify API with fresh access token
    resp = await fetchProfile(accessToken!);

    // update cookies
    const res = NextResponse.json(await resp.json());
    res.cookies.set("spotify_access_token", accessToken!, {
      httpOnly: true,
      path: "/",
      maxAge: refreshData.expires_in, // seconds
    });
    if (refreshToken) {
      res.cookies.set("spotify_refresh_token", refreshToken, {
        httpOnly: true,
        path: "/",
      });
    }
    return res;
  }

  if (!resp.ok) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: resp.status }
    );
  }

  const data = await resp.json();

  // 3. Normal case: return data, keep current cookies
  return NextResponse.json(data);
}
