import { NextResponse } from "next/server";
import { generateRandomString, sha256, base64encode } from "@/app/lib/pkce";

export async function GET() {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const scope = "user-read-email user-read-private";
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI!;
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }).toString();

  // Set cookie securely
  const res = NextResponse.redirect(authUrl.toString());
  res.cookies.set("spotify_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  return res;
}
