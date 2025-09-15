import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;

  if (accessToken) {
    redirect("/"); // already logged in → go home
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Login with Spotify</h1>
      <a href="/api/auth/login">
        <Button className="cursor-pointer">Login with Spotify</Button>
      </a>
    </div>
  );
}
