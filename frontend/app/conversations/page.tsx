"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { ConversationHistory } from "./_components/conversation-history"

export default function ConversationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <ConversationHistory />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
} 