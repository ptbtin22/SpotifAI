"use client";

import { useUser } from "./store/UserContext";

export default function Home() {
  const user = useUser();

  if (!user) {
    return (
      <>
        <h1>Login to use SpotifAI</h1>
      </>
    );
  }

  return (
    <div>
      <h1>This is where magic happens!</h1>
    </div>
  );
}
