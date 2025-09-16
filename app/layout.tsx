"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/NavBar";
import { UserProvider } from "./store/UserContext";
import "./globals.css";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import SideBar from "@/components/SideBar/SideBar";
import { useState, useRef } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const sidebarRef = useRef<ImperativePanelHandle>(null);

  function toggleSidebar() {
    if (!sidebarRef.current) return;

    sidebarRef.current.resize(25); // same as your defaultSize
    setCollapsed(false);
    setShowCreate(true);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden flex flex-col`}
      >
        <UserProvider>
          <Navbar />
          <div className="flex-1 overflow-hidden flex">
            <ResizablePanelGroup direction="horizontal" className="flex h-full">
              <ResizablePanel
                ref={sidebarRef}
                className="bg-gray-800"
                defaultSize={25}
                minSize={18}
                maxSize={40}
                collapsible={true}
                collapsedSize={8}
                onResize={(size) => {
                  // Example threshold: if at collapsedSize (8), mark as collapsed
                  setCollapsed(size <= 8);
                  setShowCreate(size >= 25);
                }}
              >
                <div className="h-full px-2">
                  <SideBar
                    onShowSidebar={toggleSidebar}
                    collapsed={collapsed}
                    showCreate={showCreate}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle className="bg-gray-800 hover:bg-gray-500 transition-colors duration-150 w-0.5" />
              <ResizablePanel className="bg-gray-800">
                <div className="h-full px-2">{children}</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <div className="media-player bg-gray-800 h-24"></div>
        </UserProvider>
      </body>
    </html>
  );
}
