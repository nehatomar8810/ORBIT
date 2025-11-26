import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./ChatMessage"
import { TypingIndicator } from "./TypingIndicator"
import { EmptyChatState } from "./EmptyChatState"

interface TimelineItem {
    type: string
    content: string
    timestamp: string
    icon: React.ReactNode
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

interface ChatMessagesProps {
    messages: ChatMessage[]
    isTyping: boolean
    connected: boolean
    onSuggestionClick?: (suggestion: string) => void
}

export function ChatMessages({ messages, isTyping, connected, onSuggestionClick }: ChatMessagesProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    // Scroll to bottom on new message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
        }
    }, [messages])

    return (
        <div className="flex-1 overflow-hidden relative z-10 px-4">
            <ScrollArea className="h-full">
                <div className="flex flex-col gap-6 py-4 min-h-full">
                    {messages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                            <EmptyChatState connected={connected} onSuggestionClick={onSuggestionClick} />
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <ChatMessage key={idx} message={msg} index={idx} />
                            ))}
                            {isTyping && <TypingIndicator />}
                        </>
                    )}
                    {/* Scroll anchor element */}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>
        </div>
    )
}