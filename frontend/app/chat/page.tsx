"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Chat } from "./_components/Chat"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements - Dark themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large ambient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gray-700/8 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-gray-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 via-transparent to-slate-900/20"></div>
      </div>

      {/* Main content with relative positioning to appear above background */}
      <div className="relative z-10">
        <SidebarProvider>
          <div className="flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <Chat />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}