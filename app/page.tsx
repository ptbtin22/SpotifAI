"use client";

import { useUser } from "./store/UserContext";

export default function Home() {
  const user = useUser();

  if (!user) {
    return (
      <div className="">
        <h1>Login to use SpotifAI</h1>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-900 h-full overflow-hidden">
      {/* Content here */}
    </div>
  );
}
