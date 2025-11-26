import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Loader2 } from "lucide-react"

export function TypingIndicator() {
    return (
        <div className="flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 border-2 border-gray-600/30">
                    <AvatarFallback className="bg-gradient-to-br from-gray-700 to-slate-700 text-white">
                        <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                </Avatar>
                {/* Status indicator with spinning loader */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-950 flex items-center justify-center">
                    <Loader2 className="w-2 h-2 text-white animate-spin" />
                </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 px-4 py-3 rounded-2xl border border-slate-600/30 shadow-lg max-w-lg">
                <div className="flex items-center gap-2">
                    {/* Typing animation dots */}
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-slate-400 text-sm ml-2">AI is thinking...</span>
                </div>
                
                {/* Subtle progress bar */}
                <div className="mt-2 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse w-2/3"></div>
                </div>
            </div>
        </div>
    )
}