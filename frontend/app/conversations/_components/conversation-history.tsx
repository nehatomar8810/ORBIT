"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MessageSquare,
  Clock,
  User,
  Bot,
  Calendar,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function ConversationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const conversations = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30",
      userMessage: "Schedule a meeting with the marketing team for tomorrow at 2 PM",
      agentResponse:
        "I've scheduled a meeting with the marketing team for January 16th at 2:00 PM. The calendar invite has been sent to all team members.",
      commandType: "scheduling",
      plugin: "Google Calendar",
      status: "completed",
      actions: ["Created calendar event", "Sent invitations", "Set reminder"],
    },
    {
      id: 2,
      timestamp: "2024-01-15 13:45",
      userMessage: "Send an email to John about the project update",
      agentResponse:
        "I've composed and sent an email to John with the latest project update. The email includes the current progress, upcoming milestones, and any blockers.",
      commandType: "communication",
      plugin: "Gmail",
      status: "completed",
      actions: ["Composed email", "Attached project summary", "Sent email"],
    },
    {
      id: 3,
      timestamp: "2024-01-15 12:20",
      userMessage: "Create a new task in our project board for the UI redesign",
      agentResponse:
        "I've created a new task titled \"UI Redesign\" in your project board. It's been assigned to the design team with a high priority level.",
      commandType: "productivity",
      plugin: "Notion",
      status: "completed",
      actions: ["Created task", "Set priority", "Assigned team"],
    },
    {
      id: 4,
      timestamp: "2024-01-15 11:15",
      userMessage: "Generate a summary of last week's sales data",
      agentResponse:
        "I've analyzed last week's sales data and generated a comprehensive summary. The report shows a 15% increase in revenue compared to the previous week.",
      commandType: "analytics",
      plugin: "Google Sheets",
      status: "completed",
      actions: ["Analyzed data", "Generated report", "Created visualizations"],
    },
    {
      id: 5,
      timestamp: "2024-01-15 10:30",
      userMessage: "Book a flight to New York for next Monday",
      agentResponse:
        "I found several flight options to New York for Monday. However, I need your preference for departure time and airline to complete the booking.",
      commandType: "travel",
      plugin: "Travel API",
      status: "pending",
      actions: ["Searched flights", "Compared prices", "Awaiting confirmation"],
    },
  ]

  const getCommandIcon = (type: string) => {
    switch (type) {
      case "scheduling":
        return Calendar
      case "communication":
        return Mail
      case "productivity":
        return FileText
      case "analytics":
        return MessageSquare
      case "travel":
        return Clock
      default:
        return MessageSquare
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-800/30 text-green-300"
      case "pending":
        return "bg-yellow-800/30 text-yellow-300"
      case "failed":
        return "bg-red-800/30 text-red-300"
      default:
        return "bg-slate-800/30 text-slate-300"
    }
  }

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.userMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.agentResponse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || conv.commandType === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Conversation History</h1>
        <p className="text-gray-400 mt-1">Review and search through your AI agent interactions</p>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="scheduling">Scheduling</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="type">By Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Conversations */}
      <div className="space-y-4">
        {filteredConversations.map((conversation) => {
          const CommandIcon = getCommandIcon(conversation.commandType)
          return (
            <Card key={conversation.id} className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-800/30">
                      <CommandIcon className="h-4 w-4 text-gray-300" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">{conversation.timestamp}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="bg-blue-800/30 text-blue-300">
                          {conversation.plugin}
                        </Badge>
                        <Badge className={getStatusColor(conversation.status)}>{conversation.status}</Badge>
                      </div>
                    </div>
                  </div>
                  {conversation.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Message */}
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-blue-800/30">
                    <User className="h-3 w-3 text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-300 text-sm font-medium">You</p>
                    <p className="text-white mt-1">{conversation.userMessage}</p>
                  </div>
                </div>

                {/* Agent Response */}
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-gray-800/30">
                    <Bot className="h-3 w-3 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm font-medium">AI Agent</p>
                    <p className="text-white mt-1">{conversation.agentResponse}</p>
                  </div>
                </div>

                {/* Actions Taken */}
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <p className="text-slate-300 text-sm font-medium mb-2">Actions Performed:</p>
                  <div className="flex flex-wrap gap-2">
                    {conversation.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-700/30 text-slate-300 border-slate-600">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredConversations.length === 0 && (
        <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No conversations found</h3>
            <p className="text-slate-400">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ConversationHistory
