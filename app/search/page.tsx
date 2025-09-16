"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";
import SideBar from "@/components/SideBar/SideBar";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 1000);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!debouncedValue) return;

    const fetchTracks = async () => {
      const res = await fetch(`/api/search?q=${debouncedValue}`);

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    };

    fetchTracks();
  }, [debouncedValue]);

  return (
    <div className="max-w-7xl mx-auto my-4 rounded-lg">
      {/* <Input
        placeholder="Search for your favorite songs, artists, or albums"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>{JSON.stringify(result, null, 2)}</p> */}
    </div>
  );
}
