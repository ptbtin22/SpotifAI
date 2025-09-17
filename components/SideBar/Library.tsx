"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import type { RecentlyPlayedItem } from "@/app/types";
import Image from "next/image";
import LibraryItemSkeleton from "../skeletons/LibraryItemSkeleton";

const Library = ({ collapsed }: { collapsed: boolean }) => {
  const [library, setLibrary] = useState<RecentlyPlayedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecents = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/spotify/recents");
        if (response.ok) {
          const data = await response.json();
          setLibrary(data.items || []);
        }
      } catch (error) {
        console.error("Error fetching recents:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecents();
  }, []);

  return (
    <ScrollArea className="h-full">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <LibraryItemSkeleton key={i} collapsed={collapsed} />
          ))
        : library.map((item) => (
            <LibraryItem
              key={item.track.id + item.played_at}
              collapsed={collapsed}
              item={item}
            />
          ))}
    </ScrollArea>
  );
};

export default Library;

const LibraryItem = ({
  item,
  collapsed,
}: {
  item: RecentlyPlayedItem;
  collapsed: boolean;
}) => {
  const coverUrl = item.track.album.images[0]?.url || "/default.png";
  const title = item.track.name;
  const artist = item.track.artists.map((a) => a.name).join(", ");

  return (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center" : ""
      } gap-3 p-2 mx-3 hover:bg-gray-800 rounded-md cursor-pointer`}
    >
      {/* Artwork */}
      <Image
        src={coverUrl}
        alt={title}
        width={collapsed ? 50 : 64}
        height={collapsed ? 50 : 64}
        className="object-cover rounded-md"
      />

      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="text-white text-sm font-medium truncate">{title}</div>
          <div className="text-gray-400 text-xs truncate">{artist}</div>
        </div>
      )}
    </div>
  );
};
