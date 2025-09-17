const LibraryItemSkeleton = ({ collapsed }: { collapsed?: boolean }) => {
  return (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center" : ""
      } gap-3 p-2 mx-3 rounded-md`}
    >
      {/* Artwork placeholder */}
      <div
        className={`${
          collapsed ? "w-[50px] h-[50px]" : "w-[64px] h-[64px]"
        } bg-gray-700 animate-pulse rounded-md`}
      ></div>

      {!collapsed && (
        <div className="flex flex-col gap-2 flex-1 max-w-[200px]">
          {/* Title placeholder */}
          <div className="h-4 bg-gray-600 animate-pulse rounded w-3/4"></div>
          {/* Artist placeholder */}
          <div className="h-3 bg-gray-600 animate-pulse rounded w-1/2"></div>
        </div>
      )}
    </div>
  );
};

export default LibraryItemSkeleton;
