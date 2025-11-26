"use client"

import { useEffect, useState } from "react"
import { Loader2, Wrench, Cog, CheckCircle, MessageCircle, Activity, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatHeader } from "./ChatHeader"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"
import { cn } from "@/lib/utils"

interface WebSocketMessage {
  type: string
  timestamp: string
  execution_id?: string
  data: {
    message?: string
    tool_name?: string
    description?: string
    step?: number
    total_steps?: number
    status?: string
    result?: string
    execution_completed?: boolean
  }
}

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  type?: string
  execution_id?: string
  isToolMessage?: boolean
  isProcessing?: boolean
  timeline?: TimelineItem[]
}

interface TimelineItem {
  type: string
  content: string
  timestamp: string
  icon: React.ReactNode
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentExecutionId, setCurrentExecutionId] = useState<string | null>(null)
  const [currentTimeline, setCurrentTimeline] = useState<TimelineItem[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [allTimelineItems, setAllTimelineItems] = useState<TimelineItem[]>([])

  // WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:9000/ws')

    websocket.onopen = () => {
      console.log('Connected to WebSocket')
      setConnected(true)
      setWs(websocket)
    }

    websocket.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data)
      console.log('Received message:', message)
      handleWebSocketMessage(message)
    }

    websocket.onclose = () => {
      console.log('WebSocket connection closed')
      setConnected(false)
      setWs(null)
    }

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
      setConnected(false)
    }

    return () => {
      websocket.close()
    }
  }, [])

  const handleWebSocketMessage = (wsMessage: WebSocketMessage) => {
    const { type, data, timestamp, execution_id } = wsMessage

    switch (type) {
      case 'user_input':
        // Clear previous timeline items when new chat begins
        setAllTimelineItems([])

        // Add user message
        const userMessage: ChatMessage = {
          role: 'user',
          content: data.message || '',
          timestamp,
          type,
          execution_id
        }
        setMessages(prev => [...prev, userMessage])

        // Start processing with a new execution
        setCurrentExecutionId(execution_id || null)
        setCurrentTimeline([])
        setIsProcessing(true)
        setIsTyping(true)

        // Add initial processing message
        const processingMessage: ChatMessage = {
          role: 'assistant',
          content: 'Processing...',
          timestamp,
          type: 'processing',
          execution_id,
          isProcessing: true,
          timeline: []
        }
        setMessages(prev => [...prev, processingMessage])
        break

      case 'agent_thinking':
        break
      case 'tool_called':
      case 'tool_executing':
      case 'tool_result':
        // Update timeline and current processing message
        const timelineItem: TimelineItem = {
          type,
          content: formatTimelineContent(type, data),
          timestamp,
          icon: getTimelineIcon(type)
        }

        setCurrentTimeline(prev => [...prev, timelineItem])
        setAllTimelineItems(prev => [...prev, timelineItem])

        // Update the processing message content
        const currentContent = getCurrentProcessingContent(type, data)
        setMessages(prev => prev.map(msg =>
          msg.execution_id === execution_id && msg.isProcessing
            ? { ...msg, content: currentContent, timeline: [...currentTimeline, timelineItem] }
            : msg
        ))
        break

      case 'agent_response':
        // Replace processing message with final response
        setMessages(prev => prev.map(msg =>
          msg.execution_id === execution_id && msg.isProcessing
            ? {
              ...msg,
              content: data.message || '',
              isProcessing: false,
              type: 'agent_response',
              timeline: currentTimeline
            }
            : msg
        ))

        // Clear processing state
        setIsProcessing(false)
        setIsTyping(false)
        setCurrentExecutionId(null)
        setCurrentTimeline([])
        break

      case 'error':
        // Replace processing message with error
        setMessages(prev => prev.map(msg =>
          msg.execution_id === execution_id && msg.isProcessing
            ? {
              ...msg,
              content: `Error: ${data.message}`,
              isProcessing: false,
              type: 'error',
              timeline: currentTimeline
            }
            : msg
        ))

        // Clear processing state
        setIsProcessing(false)
        setIsTyping(false)
        setCurrentExecutionId(null)
        setCurrentTimeline([])
        break
    }
  }

  const formatTimelineContent = (type: string, data: any): string => {
    switch (type) {
      case 'agent_thinking':
        return data.message || 'Analyzing your request...'
      case 'tool_called':
        return `Preparing to execute ${data.tool_name || 'tool'}`
      case 'tool_executing':
        return `Running ${data.tool_name || 'operation'}...`
      case 'tool_result':
        // Format the result more professionally
        if (data.result) {
          try {
            const result = typeof data.result === 'string' ? JSON.parse(data.result) : data.result
            if (result.status === 'success') {
              if (result.count !== undefined) {
                return `Successfully retrieved ${result.count} ${result.count === 1 ? 'item' : 'items'}`
              }
              if (result.emails && Array.isArray(result.emails)) {
                return `Found ${result.emails.length} email${result.emails.length === 1 ? '' : 's'}`
              }
              return `${data.tool_name} executed successfully`
            } else if (result.error) {
              return `${data.tool_name} failed: ${result.error}`
            }
          } catch (e) {
            // If parsing fails, show a generic success message
            return `${data.tool_name} completed successfully`
          }
        }
        return `${data.tool_name || 'Operation'} completed`
      default:
        return 'Processing...'
    }
  }

  const getCurrentProcessingContent = (type: string, data: any): string => {
    switch (type) {
      case 'agent_thinking':
        return 'Thinking...'
      case 'tool_called':
        return `Calling ${data.tool_name}...`
      case 'tool_executing':
        return `Executing ${data.tool_name}...`
      case 'tool_result':
        return `Completing ${data.tool_name}...`
      default:
        return 'Processing...'
    }
  }

  const getTimelineIcon = (type: string): React.ReactNode => {
    switch (type) {
      case 'agent_thinking':
        return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
      case 'tool_called':
        return <Wrench className="w-4 h-4 text-blue-400" />
      case 'tool_executing':
        return <Cog className="w-4 h-4 text-yellow-400 animate-spin" />
      case 'tool_result':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <MessageCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const handleSend = () => {
    if (!input.trim() || !ws || !connected || isProcessing) return

    const message = {
      type: 'user_message',
      content: input.trim()
    }

    ws.send(JSON.stringify(message))
    setInput("")
    setIsProcessing(true)
  }

  const clearTimeline = () => {
    setAllTimelineItems([])
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (!ws || !connected || isProcessing) return
    
    setInput(suggestion)
    
    // Send the suggestion immediately
    const message = {
      type: 'user_message',
      content: suggestion
    }

    ws.send(JSON.stringify(message))
    setInput("")
    setIsProcessing(true)
  }

  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      {/* Main Chat Area */}
      <div className={cn(
        "flex flex-col transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-2/3" : "w-full"
      )}>
        <ChatHeader 
          connected={connected} 
          sidebarOpen={sidebarOpen} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <ChatMessages 
          messages={messages} 
          isTyping={isTyping} 
          connected={connected} 
          onSuggestionClick={handleSuggestionClick}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          isProcessing={isProcessing}
          connected={connected}
          onSend={handleSend}
        />
      </div>

      {/* Activity Sidebar */}
      <div className={cn(
        "bg-gray-900/95 border-l border-gray-700/50 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden",
        sidebarOpen ? "w-1/3" : "w-0"
      )}>
        {sidebarOpen && (
          <div className="flex flex-col h-full p-4 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-300" />
                <h2 className="text-lg font-semibold text-white">Agent Activity</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearTimeline}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                  disabled={allTimelineItems.length === 0}
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Activity Timeline */}
            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {allTimelineItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No activity yet</p>
                    <p className="text-gray-600 text-xs mt-1">Agent actions will appear here</p>
                  </div>
                ) : (
                  allTimelineItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30 animate-in slide-in-from-bottom duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="mt-1 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-200 mb-1 break-words">
                          {item.content}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            {allTimelineItems.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-700/30">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{allTimelineItems.length} actions recorded</span>
                  {isProcessing && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
