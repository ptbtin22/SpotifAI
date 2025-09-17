"use client";

import Image from "next/image";
import { useUser } from "./store/UserContext";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <div className="rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500 p-4">
      <div className="mx-2 lg:mx-4 flex gap-2">
        <Button className="cursor-pointer bg-white hover:bg-gray-200 text-black rounded-4xl">
          All
        </Button>
        <Button className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white rounded-4xl">
          Music
        </Button>
        <Button className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white rounded-4xl">
          Podcasts
        </Button>
      </div>

      {/* Top Tracks Section */}
      <section className="mx-2 lg:mx-4">
        <div className="mt-8 flex flex-col">
          <h2 className="text-gray-300 text-xs font-light leading-tight">
            Your favorite tracks over the last 6 months.
          </h2>
          <h1 className="text-white text-xl lg:text-2xl font-bold leading-tight">
            Top Tracks
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 w-full">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md overflow-hidden cursor-pointer transition-colors duration-150"
            >
              <Image
                className="shadow-lg shadow-black/50 w-[50px] h-[50px] lg:w-[64px] lg:h-[64px]"
                src={
                  "https://i.scdn.co/image/ab67616d0000b2736cfd9a7353f98f5165ea6160"
                }
                alt="Artwork"
                width={64}
                height={64}
              />
              <h1 className="font-medium text-white text-sm truncate mr-2">
                Impossible
              </h1>
            </div>
          ))}
        </div>
      </section>

      {/* New Release */}
      <section>
        <div className="ml-2 lg:ml-4 mt-8 flex flex-col">
          <h2 className="text-gray-300 text-xs font-light leading-tight">
            Brand new music from artists you love and follow. Listen now.
          </h2>
          <h1 className="text-white text-xl lg:text-2xl font-bold leading-tight">
            New Releases
          </h1>
        </div>

        {/* New Release list */}
        <div className="mt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-950 hover:scrollbar-thumb-gray-500 w-full">
          <div className="inline-flex gap-4 max-w-full">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col hover:bg-white/5 rounded-lg transition-colors duration-150 cursor-pointer p-2 lg:p-4 w-[140px] sm:w-[160px] lg:w-[180px] h-[220px] lg:h-[250px]"
              >
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    className="shadow-lg shadow-black/50 rounded-md"
                    src="https://i.scdn.co/image/ab67616d0000b273072e9faef2ef7b6db63834a3"
                    alt="Artwork"
                    fill
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                  />
                </div>

                <p className="font-medium text-white text-xs sm:text-sm line-clamp-2 break-words leading-tight">
                  ASTROWORLD
                </p>
                <h2 className="mt-1 text-gray-400 text-xs sm:text-sm truncate">
                  Travis Scott
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
