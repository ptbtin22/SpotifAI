import React from "react";

const NavBarSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-gray-600" />

      {/* Text placeholders */}
      <div className="flex flex-col gap-1">
        <div className="h-4 w-24 bg-gray-600 rounded" />
        <div className="h-3 w-16 bg-gray-700 rounded" />
      </div>

      {/* Logout button placeholder */}
      <div className="ml-3 h-8 w-20 bg-gray-500 rounded" />
    </div>
  );
};

export default NavBarSkeleton;
