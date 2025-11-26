"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Clock, MessageSquare, Zap, TrendingUp, Calendar, Mail, FileText, Users, Mic } from "lucide-react"
import { useState } from "react"

export function HomePage() {
  const [isListening, setIsListening] = useState(false)

  const metrics = [
    {
      title: "Commands Today",
      value: "47",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-400",
    },
    {
      title: "Tasks Completed",
      value: "23",
      change: "+8%",
      icon: Activity,
      color: "text-green-400",
    },
    {
      title: "Time Saved",
      value: "2.4h",
      change: "+15%",
      icon: Clock,
      color: "text-purple-400",
    },
    {
      title: "Active Plugins",
      value: "12",
      change: "+2",
      icon: Zap,
      color: "text-orange-400",
    },
  ]

  const recentActivity = [
    {
      action: "Scheduled meeting with team",
      time: "2 minutes ago",
      plugin: "Google Calendar",
      status: "completed",
    },
    {
      action: "Sent email summary to client",
      time: "5 minutes ago",
      plugin: "Gmail",
      status: "completed",
    },
    {
      action: "Created task in project board",
      time: "12 minutes ago",
      plugin: "Notion",
      status: "completed",
    },
    {
      action: "Generated weekly report",
      time: "1 hour ago",
      plugin: "Google Docs",
      status: "completed",
    },
  ]

  const quickActions = [
    { title: "Schedule Meeting", icon: Calendar, color: "bg-blue-600" },
    { title: "Send Email", icon: Mail, color: "bg-green-600" },
    { title: "Create Document", icon: FileText, color: "bg-purple-600" },
    { title: "Team Update", icon: Users, color: "bg-orange-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsListening(!isListening)}
            className={`${
              isListening
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
            }`}
          >
            <Mic className="h-4 w-4 mr-2" />
            {isListening ? "Stop Listening" : "Voice Command"}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <p className="text-xs text-green-400 mt-1">{metric.change} from yesterday</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">Latest actions performed by your AI agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="bg-gray-800/30 text-gray-300">
                        {activity.plugin}
                      </Badge>
                      <span className="text-xs text-slate-400">{activity.time}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-800/30 text-green-300">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-400">Common tasks you can trigger</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gray-800/30 border-slate-700 hover:bg-slate-700/50 text-white"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends */}
      <Card className="bg-gray-900/50 border-gray-800/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            Usage Trends
          </CardTitle>
          <CardDescription className="text-gray-400">Your productivity metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Daily Commands</span>
                <span className="text-white">47/60</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Task Completion Rate</span>
                <span className="text-white">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Plugin Utilization</span>
                <span className="text-white">12/15</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage
