import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Bot, User, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface ChatMessage {
    role: "user" | "assistant" | "system"
    content: string
    timestamp: string
    type?: string
    execution_id?: string
    isToolMessage?: boolean
    isProcessing?: boolean
}

interface ChatMessageProps {
    message: ChatMessage
    index: number
}

export function ChatMessage({ message, index }: ChatMessageProps) {
    const isUser = message.role === "user"
    const isAssistant = message.role === "assistant" || message.role === "system"
    const isError = message.type === 'error'

    // Don't render empty processing messages
    if (message.isProcessing && !message.content) {
        return null
    }

    // Format timestamp
    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div
            className={cn(
                "flex items-start gap-3 group animate-in slide-in-from-bottom-2 duration-300",
                isUser ? "justify-end" : "justify-start"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Assistant Avatar */}
            {isAssistant && (
                <div className="relative flex-shrink-0">
                    <Avatar className="w-10 h-10 border-2 border-gray-600/30 group-hover:border-gray-500/50 transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-gray-700 to-slate-700">
                            <Bot className="w-5 h-5 text-white" />
                        </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-950 transition-colors",
                        message.isProcessing ? "bg-yellow-500 animate-pulse" : 
                        isError ? "bg-red-500" : "bg-green-500"
                    )}>
                        {message.isProcessing && (
                            <Loader2 className="w-2 h-2 text-white animate-spin absolute inset-0.5" />
                        )}
                        {isError && (
                            <AlertCircle className="w-2 h-2 text-white absolute inset-0.5" />
                        )}
                        {!message.isProcessing && !isError && (
                            <CheckCircle className="w-2 h-2 text-white absolute inset-0.5" />
                        )}
                    </div>
                </div>
            )}

            {/* Message Content */}
            <div
                className={cn(
                    "relative px-4 py-3 rounded-2xl max-w-lg break-words text-sm shadow-lg transition-all duration-200 group-hover:shadow-xl",
                    isUser
                        ? "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white ml-2 border border-blue-500/30 shadow-blue-500/20"
                        : isError
                        ? "bg-gradient-to-br from-red-800 via-red-700 to-red-800 text-red-100 mr-2 border border-red-600/30 shadow-red-900/50"
                        : message.isProcessing
                        ? "bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-800 text-yellow-100 mr-2 border border-yellow-600/30 shadow-yellow-900/50"
                        : "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 mr-2 border border-slate-600/30 shadow-slate-900/50"
                )}
            >
                <div className="relative z-10">
                    {message.content}
                    {message.isProcessing && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-yellow-600/30">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span className="text-xs opacity-75">Processing...</span>
                        </div>
                    )}
                </div>
                
                {/* Timestamp */}
                <div className={cn(
                    "text-xs opacity-60 mt-2",
                    isUser ? "text-blue-200" : "text-gray-300"
                )}>
                    {formatTime(message.timestamp)}
                </div>

                {/* Hover effect overlay */}
                <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    isUser 
                        ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20"
                        : "bg-gradient-to-br from-slate-500/20 to-slate-600/20"
                )}></div>
            </div>

            {/* User Avatar */}
            {isUser && (
                <div className="relative flex-shrink-0">
                    <Avatar className="w-10 h-10 border-2 border-gray-600/30 group-hover:border-gray-500/50 transition-colors">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                            <User className="w-5 h-5 text-white" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}
        </div>
    )
}