import React from "react";
import { Button } from "../ui/button";
import { Maximize2, Plus, UnfoldHorizontal } from "lucide-react";
import Library from "./Library";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const SideBar = ({
  collapsed,
  showCreate,
  onShowSidebar,
}: {
  collapsed: boolean;
  showCreate: boolean;
  onShowSidebar?: () => void;
}) => {
  return (
    <div className="bg-gray-900 h-full rounded-lg overflow-hidden flex flex-col">
      {collapsed && (
        <div className="flex items-center justify-center mx-auto mt-4 flex-col gap-4">
          <Button
            onClick={onShowSidebar}
            className="size-12 bg-gray-800 hover:bg-gray-600 cursor-pointer flex items-center"
          >
            <UnfoldHorizontal className="size-8 shrink-0" />
          </Button>
          <Button className="size-12 bg-gray-800 hover:bg-gray-600 cursor-pointer flex items-center rounded-full">
            <Plus className="size-8 shrink-0" />
          </Button>
        </div>
      )}
      {!collapsed && (
        <div className="flex items-center justify-between my-2 py-2 px-3">
          <span className="font-semibold text-white ml-2">Your Library</span>
          <div className="flex gap-2">
            <Button className="bg-gray-800 hover:bg-gray-600 cursor-pointer flex items-center gap-2">
              <Plus className="size-6 shrink-0" />
              {showCreate && <span className="hidden md:inline">Create</span>}
            </Button>
            <Maximize2
              className="w-10 h-10 p-2 text-gray-400 cursor-pointer rounded-full 
             hover:bg-gray-600 hover:text-white overflow-visible
             transition-colors duration-150 ease-in-out"
            />
          </div>
        </div>
      )}
      {!collapsed && (
        <ScrollArea className="px-4">
          <div className="flex gap-2 mb-3">
            <Button className="bg-gray-800 hover:bg-gray-600 cursor-pointer">
              Playlists
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-600 cursor-pointer">
              Podcasts
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-600 cursor-pointer">
              Albums
            </Button>
            <Button className="bg-gray-800 hover:bg-gray-600 cursor-pointer">
              Artists
            </Button>
          </div>
          <ScrollBar className="mx-4" orientation="horizontal" />
        </ScrollArea>
      )}
      <div
        className={`flex-1 overflow-hidden ${collapsed ? "mt-4" : "mt-2"} mb-4`}
      >
        <Library collapsed={collapsed} />
      </div>
    </div>
  );
};

export default SideBar;
