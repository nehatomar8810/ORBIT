"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import HomePage from "./home/_components/home-page"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950">
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 p-6">
            <HomePage />
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}
