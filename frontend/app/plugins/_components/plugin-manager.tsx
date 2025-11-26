"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Settings,
  Puzzle,
  Calendar,
  Mail,
  FileText,
  MessageSquare,
  Cloud,
  Smartphone,
  Code,
  DollarSign,
  MapPin,
  Palette,
  Heart,
  TrendingUp,
  Shield,
  Download,
  ExternalLink,
} from "lucide-react"

export function PluginManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("installed")

  const pluginCategories = [
    { value: "all", label: "All Categories", icon: Puzzle },
    { value: "productivity", label: "Productivity & Scheduling", icon: Calendar },
    { value: "communication", label: "Communication", icon: Mail },
    { value: "files", label: "Files & Cloud Storage", icon: Cloud },
    { value: "social", label: "Social Media", icon: Smartphone },
    { value: "knowledge", label: "Knowledge & Notes", icon: FileText },
    { value: "dev", label: "Dev Tools & Automation", icon: Code },
    { value: "finance", label: "Finance & Personal", icon: DollarSign },
    { value: "location", label: "Location & Maps", icon: MapPin },
    { value: "creativity", label: "Creativity Tools", icon: Palette },
    { value: "health", label: "Health & Wellness", icon: Heart },
  ]

  const installedPlugins = [
    {
      id: 1,
      name: "Google Calendar",
      description: "Schedule, reschedule, and manage calendar events",
      category: "productivity",
      version: "2.1.0",
      enabled: true,
      usage: 89,
      lastUsed: "2 hours ago",
      permissions: ["Read calendar", "Create events", "Send invitations"],
      icon: Calendar,
    },
    {
      id: 2,
      name: "Gmail",
      description: "Read, compose, and send emails automatically",
      category: "communication",
      version: "1.8.3",
      enabled: true,
      usage: 76,
      lastUsed: "30 minutes ago",
      permissions: ["Read emails", "Send emails", "Access contacts"],
      icon: Mail,
    },
    {
      id: 3,
      name: "Google Drive",
      description: "Search, read, and manage files in Google Drive",
      category: "files",
      version: "3.2.1",
      enabled: true,
      usage: 45,
      lastUsed: "1 day ago",
      permissions: ["Read files", "Write files", "Share files"],
      icon: Cloud,
    },
    {
      id: 4,
      name: "Notion",
      description: "Manage workspace, databases, and pages",
      category: "knowledge",
      version: "1.5.2",
      enabled: false,
      usage: 23,
      lastUsed: "3 days ago",
      permissions: ["Read pages", "Create pages", "Update databases"],
      icon: FileText,
    },
    {
      id: 5,
      name: "Slack",
      description: "Send messages and manage Slack workspace",
      category: "communication",
      version: "2.0.1",
      enabled: true,
      usage: 67,
      lastUsed: "1 hour ago",
      permissions: ["Send messages", "Read channels", "Manage files"],
      icon: MessageSquare,
    },
  ]

  const availablePlugins = [
    {
      id: 6,
      name: "Todoist",
      description: "Task management and productivity tracking",
      category: "productivity",
      version: "1.4.0",
      rating: 4.8,
      downloads: "10K+",
      icon: Calendar,
      featured: true,
    },
    {
      id: 7,
      name: "WhatsApp Business",
      description: "Send templated and direct WhatsApp messages",
      category: "communication",
      version: "2.1.5",
      rating: 4.6,
      downloads: "5K+",
      icon: Smartphone,
      featured: false,
    },
    {
      id: 8,
      name: "GitHub",
      description: "Manage repositories, issues, and pull requests",
      category: "dev",
      version: "3.0.2",
      rating: 4.9,
      downloads: "15K+",
      icon: Code,
      featured: true,
    },
    {
      id: 9,
      name: "Stripe",
      description: "Handle payments, invoices, and financial data",
      category: "finance",
      version: "1.7.3",
      rating: 4.7,
      downloads: "8K+",
      icon: DollarSign,
      featured: false,
    },
    {
      id: 10,
      name: "Canva",
      description: "Generate designs and visual content",
      category: "creativity",
      version: "2.3.1",
      rating: 4.5,
      downloads: "12K+",
      icon: Palette,
      featured: true,
    },
  ]

  const getCategoryIcon = (category: string) => {
    const cat = pluginCategories.find((c) => c.value === category)
    return cat ? cat.icon : Puzzle
  }

  const filteredInstalledPlugins = installedPlugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredAvailablePlugins = availablePlugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || plugin.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Plugin Manager</h1>
        <p className="text-gray-400 mt-1">Manage and configure your AI agent's capabilities</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search plugins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {pluginCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Plugin Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
          <TabsTrigger value="installed" className="text-slate-300 data-[state=active]:text-purple-900 data-[state=active]:bg-white">
            Installed Plugins ({installedPlugins.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="text-slate-300 data-[state=active]:text-purple-900 data-[state=active]:bg-white">
            Available Plugins ({availablePlugins.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="installed" className="space-y-4 mt-6">
          {filteredInstalledPlugins.map((plugin) => {
            const CategoryIcon = getCategoryIcon(plugin.category)
            return (
              <Card key={plugin.id} className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gray-800/30">
                        <plugin.icon className="h-6 w-6 text-gray-300" />
                      </div>
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          {plugin.name}
                          <Badge variant="outline" className="bg-slate-800/30 text-slate-300 border-slate-600">
                            v{plugin.version}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-1">{plugin.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-slate-400">Last used: {plugin.lastUsed}</span>
                          <span className="text-xs text-slate-400">Usage: {plugin.usage}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={plugin.enabled} className="data-[state=checked]:bg-gray-700" />
                      <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Usage This Month</span>
                        <span className="text-white">{plugin.usage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-gray-700 to-gray-900 h-2 rounded-full"
                          style={{ width: `${plugin.usage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300 mb-2">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {plugin.permissions.map((permission, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-slate-800/30 text-slate-300 border-slate-600"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAvailablePlugins.map((plugin) => {
              const CategoryIcon = getCategoryIcon(plugin.category)
              return (
                <Card key={plugin.id} className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-800/30">
                          <plugin.icon className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg flex items-center gap-2">
                            {plugin.name}
                            {plugin.featured && (
                              <Badge className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">Featured</Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${
                                    i < Math.floor(plugin.rating) ? "text-yellow-400" : "text-slate-600"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                              <span className="text-xs text-slate-400 ml-1">{plugin.rating}</span>
                            </div>
                            <span className="text-xs text-slate-400">{plugin.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm mb-4">{plugin.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-slate-800/30 text-slate-300 border-slate-600">
                        v{plugin.version}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Install
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Plugin Categories Overview */}
      <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Plugin Usage Analytics
          </CardTitle>
          <CardDescription className="text-gray-400">Overview of your plugin ecosystem performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-slate-400">Active Plugins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">89%</div>
              <div className="text-sm text-slate-400">Avg Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-sm text-slate-400">API Calls Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PluginManager
