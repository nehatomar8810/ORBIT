"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { KnowledgeBase } from "./_components/knowledge-base"

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <KnowledgeBase />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
} 