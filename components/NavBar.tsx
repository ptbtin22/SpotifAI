"use client";

import Image from "next/image";
import { useUser } from "@/app/store/UserContext";
import NavBarSkeleton from "./skeletons/NavBarSkeleton";

const Navbar = () => {
  const user = useUser();

  if (user === "loading") {
    return (
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-lg font-bold">Spotify</h1>
        <NavBarSkeleton />
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-bold">Spotify</h1>

      {user ? (
        <div className="flex items-center gap-3">
          <Image
            alt={user.display_name}
            src={user.images?.[0]?.url || "/default-profile.png"}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>{user.display_name}</span>
          <a
            href="/api/auth/logout"
            className="ml-3 px-3 py-1 bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </a>
        </div>
      ) : (
        <a
          href="/api/auth/login"
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Login with Spotify
        </a>
      )}
    </nav>
  );
};

export default Navbar;
