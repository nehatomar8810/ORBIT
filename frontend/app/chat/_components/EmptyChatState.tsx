import { MessageCircle, Orbit, Wifi, WifiOff, Zap, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyChatStateProps {
    connected: boolean
    onSuggestionClick?: (suggestion: string) => void
}

export function EmptyChatState({ connected, onSuggestionClick }: EmptyChatStateProps) {
    const suggestions = [
        "Check my Gmail inbox",
        "What's on my task list today?",
        "Send a WhatsApp message",
        "Create a new note in Notion",
        "What's the weather like?",
        "Help me organize my schedule"
    ]

    const features = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "Smart Conversations",
            description: "Natural language processing for intelligent responses"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Quick Actions",
            description: "Execute tasks across multiple platforms instantly"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Secure & Private",
            description: "Your data stays protected with enterprise-grade security"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Always Available",
            description: "24/7 assistance whenever you need it"
        }
    ]

    return (
        <div className="flex flex-col items-center justify-center min-h-full text-center py-8 px-6 max-w-4xl mx-auto overflow-y-auto">
            {/* Hero Section */}
            <div className="mb-8">
                <div className="relative mb-6">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

                    {/* Logo container */}
                    <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-blue-500/30 backdrop-blur-md shadow-2xl">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-md animate-pulse"></div>
                                <Orbit className="relative w-16 h-16 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2 tracking-wide">
                                Welcome to ORBIT
                            </h1>
                            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-4"></div>
                        </div>
                    </div>
                </div>
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                    Your intelligent AI assistant that seamlessly connects to your digital ecosystem
                </p>
                <p className="text-sm text-gray-500 mt-2 max-w-lg">
                    Experience the future of personal productivity with advanced AI capabilities
                </p>
            </div>

            {/* Connection Status */}
            <div className={cn(
                "inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-medium border backdrop-blur-md mb-8 shadow-lg transition-all duration-300",
                connected 
                    ? "bg-green-500/15 border-green-400/40 text-green-300 shadow-green-500/20"
                    : "bg-red-500/15 border-red-400/40 text-red-300 shadow-red-500/20 animate-pulse"
            )}>
                {connected ? (
                    <>
                        <div className="relative">
                            <Wifi className="w-5 h-5" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <span className="font-semibold">Connected and ready</span>
                    </>
                ) : (
                    <>
                            <WifiOff className="w-5 h-5 animate-bounce" />
                            <span className="font-semibold">Connecting to server...</span>
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1 h-1 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                    </>
                )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-3xl">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group p-5 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 rounded-xl backdrop-blur-md hover:bg-gradient-to-br hover:from-gray-700/50 hover:to-gray-800/50 hover:border-gray-600/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                    >
                        <div className="text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300 group-hover:scale-110 transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-white font-semibold mb-2 text-base group-hover:text-blue-100 transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Suggestions - Show regardless of connection status */}
            <div className="w-full max-w-3xl mb-8">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Try asking me:</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {suggestions.map((suggestion, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={cn(
                                "group text-left justify-start bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-700/40 text-gray-300 transition-all duration-300 p-4 h-auto text-sm rounded-xl backdrop-blur-md hover:shadow-lg",
                                connected 
                                    ? "hover:bg-gradient-to-r hover:from-gray-700/40 hover:to-gray-800/40 hover:border-gray-600/60 hover:text-white cursor-pointer hover:scale-105 hover:shadow-blue-500/10" 
                                    : "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => connected && onSuggestionClick?.(suggestion)}
                            disabled={!connected}
                        >
                            <MessageCircle className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0 group-hover:text-blue-300 transition-colors duration-300" />
                            <span className="leading-relaxed">{suggestion}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/20 border border-gray-700/30 rounded-full backdrop-blur-sm">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-400 text-sm font-medium">Powered by advanced AI</span>
                    </div>
                    <div className="w-px h-4 bg-gray-600"></div>
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-purple-400" />
                        <span className="text-gray-500 text-sm">Connected to Gmail, Tasks, WhatsApp & More</span>
                    </div>
                </div>
            </div>
        </div>
    )
}