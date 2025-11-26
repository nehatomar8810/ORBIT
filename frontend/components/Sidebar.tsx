"use client"

import { Bot, LayoutDashboard, MessageSquare, Brain, Puzzle, Settings, User, LogOut, Zap } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Conversations",
    url: "conversations",
    icon: MessageSquare,
  },
  {
    title: "Knowledge Base",
    url: "knowledge",
    icon: Brain,
  },
  {
    title: "Plugins",
    url: "plugins",
    icon: Puzzle,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-purple-800/30 bg-slate-950 backdrop-blur-xl">
      <SidebarHeader className="border-b border-purple-800/30 p-6 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">ORBIT</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-slate-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-200 text-xs uppercase tracking-wider font-medium mb-2 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <SidebarMenuButton asChild className="w-full text-white hover:text-white hover:bg-purple-800/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/40 data-[active=true]:to-blue-600/40 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/50 transition-all duration-200 px-3 py-2">
                    <a>
                      <LayoutDashboard className="h-4 w-4 mr-3" />
                      <span className="font-medium">Home</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/chat" passHref legacyBehavior>
                  <SidebarMenuButton asChild className="w-full text-white hover:text-white hover:bg-purple-800/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/40 data-[active=true]:to-blue-600/40 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/50 transition-all duration-200 px-3 py-2">
                    <a>
                      <Bot className="h-4 w-4 mr-3" />
                      <span className="font-medium">Chat</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/conversations" passHref legacyBehavior>
                  <SidebarMenuButton asChild className="w-full text-white hover:text-white hover:bg-purple-800/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/40 data-[active=true]:to-blue-600/40 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/50 transition-all duration-200 px-3 py-2">
                    <a>
                      <MessageSquare className="h-4 w-4 mr-3" />
                      <span className="font-medium">History</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/knowledge" passHref legacyBehavior>
                  <SidebarMenuButton asChild className="w-full text-white hover:text-white hover:bg-purple-800/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/40 data-[active=true]:to-blue-600/40 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/50 transition-all duration-200 px-3 py-2">
                    <a>
                      <Brain className="h-4 w-4 mr-3" />
                      <span className="font-medium">Knowledge Base</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/plugins" passHref legacyBehavior>
                  <SidebarMenuButton asChild className="w-full text-white hover:text-white hover:bg-purple-800/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-600/40 data-[active=true]:to-blue-600/40 data-[active=true]:text-white data-[active=true]:border data-[active=true]:border-purple-500/50 transition-all duration-200 px-3 py-2">
                    <a>
                      <Puzzle className="h-4 w-4 mr-3" />
                      <span className="font-medium">Plugins</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-purple-200 text-xs uppercase tracking-wider font-medium mb-2 px-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-white hover:text-white hover:bg-purple-800/40 transition-all duration-200 px-3 py-2">
                  <Zap className="h-4 w-4 mr-3" />
                  <span className="font-medium">Voice Command</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full text-white hover:text-white hover:bg-purple-800/40 transition-all duration-200 px-3 py-2">
                  <Settings className="h-4 w-4 mr-3" />
                  <span className="font-medium">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-800/30 p-4 bg-slate-950">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full text-white hover:text-white hover:bg-purple-800/40 transition-all duration-200 px-3 py-2">
              <User className="h-4 w-4 mr-3" />
              <span className="font-medium">Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full text-white hover:text-red-400 hover:bg-red-900/40 transition-all duration-200 px-3 py-2">
              <LogOut className="h-4 w-4 mr-3" />
              <span className="font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
