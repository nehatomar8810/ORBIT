import { MessageCircle, Orbit, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatHeaderProps {
    connected: boolean
    sidebarOpen?: boolean
    onToggleSidebar?: () => void
}

export function ChatHeader({ connected, sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
    return (
        <div className="relative z-10 border-b border-gray-800/50 bg-gray-900/80 backdrop-blur-xl sticky top-0">
            <div className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
                {/* Logo and Title */}
                <div className="flex items-center gap-3">
                    
                </div>

                {/* Right Side - Connection Status and Controls */}
                <div className="flex items-center gap-3">
                    {/* Activity Toggle Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                            "bg-gray-800/50 text-gray-300 border border-gray-700/50",
                            "hover:bg-gray-700/60 hover:text-white hover:border-gray-600/60",
                            sidebarOpen && "bg-blue-600/20 border-blue-500/30 text-blue-400"
                        )}
                        onClick={onToggleSidebar}
                    >
                        <Activity className="w-4 h-4" />
                        <span>{sidebarOpen ? "Hide Activity" : "Show Activity"}</span>
                    </Button>

                    {/* Connection Status */}
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-200",
                        connected 
                            ? "bg-green-500/10 border-green-500/30 text-green-400 shadow-green-500/20" 
                            : "bg-red-500/10 border-red-500/30 text-red-400 shadow-red-500/20"
                    )}>
                        <div className={cn(
                            "w-2 h-2 rounded-full transition-all duration-200",
                            connected ? "bg-green-400 animate-pulse shadow-sm shadow-green-400/50" : "bg-red-400"
                        )}></div>
                        <span>{connected ? "Connected" : "Disconnected"}</span>
                    </div>
                </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        </div>
    )
}