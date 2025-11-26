"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { PluginManager } from "./_components/plugin-manager"

export default function PluginsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <PluginManager />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
} 