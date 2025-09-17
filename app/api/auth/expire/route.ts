// app/api/auth/expire/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse.json({
    message: "Access token expired (simulated)",
  });

  // overwrite the spotify_access_token with an empty value + short expiry
  res.cookies.set("spotify_access_token", "", {
    httpOnly: true,
    maxAge: 0, // expire immediately
    path: "/",
  });

  return res;
}
