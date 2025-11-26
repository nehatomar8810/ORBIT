import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, Send, Loader2, Mic, MicOff, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

// TypeScript declarations for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition
        webkitSpeechRecognition: typeof SpeechRecognition
    }
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    start(): void
    stop(): void
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
    resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string
}

interface SpeechRecognitionResultList {
    length: number
    [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
    length: number
    isFinal: boolean
    [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
}

declare var SpeechRecognition: {
    prototype: SpeechRecognition
    new(): SpeechRecognition
}

interface ChatInputProps {
    input: string
    setInput: (value: string) => void
    isProcessing: boolean
    connected: boolean
    onSend: () => void
}

export function ChatInput({ input, setInput, isProcessing, connected, onSend }: ChatInputProps) {
    const [isListening, setIsListening] = useState(false)
    const [speechSupported, setSpeechSupported] = useState(false)
    const recognitionRef = useRef<SpeechRecognition | null>(null)

    // Check for speech recognition support on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
            setSpeechSupported(!!SpeechRecognition)
            
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition()
                recognition.continuous = true
                recognition.interimResults = true
                recognition.lang = 'en-US'
                
                recognition.onstart = () => {
                    setIsListening(true)
                }
                
                recognition.onend = () => {
                    setIsListening(false)
                }
                
                recognition.onresult = (event: SpeechRecognitionEvent) => {
                    let finalTranscript = ''
                    let interimTranscript = ''
                    
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        const transcript = event.results[i][0].transcript
                        if (event.results[i].isFinal) {
                            finalTranscript += transcript
                        } else {
                            interimTranscript += transcript
                        }
                    }
                    
                    if (finalTranscript) {
                        setInput(input + finalTranscript)
                    }
                }
                
                recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                    console.error('Speech recognition error:', event.error)
                    setIsListening(false)
                }
                
                recognitionRef.current = recognition
            }
        }
        
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const toggleVoiceInput = () => {
        if (!recognitionRef.current || !speechSupported) return
        
        if (isListening) {
            recognitionRef.current.stop()
        } else {
            recognitionRef.current.start()
        }
    }
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    const canSend = input.trim() && !isProcessing && connected

    return (
        <div className="relative z-10 p-6 bg-transparent backdrop-blur-xl border-t border-gray-800/30">
            <div className="flex items-end gap-4 max-w-4xl mx-auto">
                {/* Input Area */}
                <div className="relative flex-1">
                    <div className="relative">
                        <Input
                            className={cn(
                                "bg-gray-800/40 border-gray-700/40 text-white placeholder:text-gray-400",
                                "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50",
                                "transition-all duration-200 pr-12 py-4 text-base rounded-2xl backdrop-blur-sm",
                                "resize-none min-h-[3rem] max-h-32",
                                !connected && "opacity-50 cursor-not-allowed"
                            )}
                            placeholder={
                                !connected 
                                    ? "Connecting to server..." 
                                    : isProcessing 
                                    ? "AI is processing..." 
                                    : "Type your message..."
                            }
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleInputKeyDown}
                            autoFocus
                            autoComplete="off"
                            disabled={isProcessing || !connected}
                        />
                        
                        {/* Input icon */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                    </div>
                    
                    {/* Character count for longer messages */}
                    {input.length > 100 && (
                        <div className="text-xs text-gray-500 mt-1 text-right">
                            {input.length} characters
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Attachment button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-3 rounded-2xl transition-all duration-200"
                        disabled={!connected}
                        title="Attach file"
                    >
                        <Paperclip className="w-5 h-5" />
                    </Button>

                    {/* Voice input button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "p-3 rounded-2xl transition-all duration-200",
                            isListening 
                                ? "text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20" 
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                            !speechSupported && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!connected || !speechSupported}
                        onClick={toggleVoiceInput}
                        title={
                            !speechSupported 
                                ? "Voice input not supported in this browser" 
                                : isListening 
                                ? "Stop voice input" 
                                : "Start voice input"
                        }
                    >
                        {isListening ? (
                            <MicOff className="w-5 h-5 animate-pulse" />
                        ) : (
                            <Mic className="w-5 h-5" />
                        )}
                    </Button>

                    {/* Send button */}
                    <Button
                        type="submit"
                        className={cn(
                            "px-6 py-3 rounded-2xl font-medium transition-all duration-200 min-w-[100px]",
                            canSend
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl border border-blue-500/30 hover:border-blue-400/50"
                                : "bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/30"
                        )}
                        disabled={!canSend}
                        onClick={onSend}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Send
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-between mt-4 max-w-4xl mx-auto">
                {/* Connection Status */}
                <div className={cn(
                    "flex items-center gap-2 text-xs",
                    connected ? "text-green-400" : "text-red-400"
                )}>
                    <div className={cn(
                        "w-2 h-2 rounded-full",
                        connected ? "bg-green-400 animate-pulse" : "bg-red-400"
                    )}></div>
                    <span>{connected ? "Connected" : "Disconnected"}</span>
                </div>

                {/* Processing Status */}
                {isProcessing && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        AI is working on your request...
                    </div>
                )}

                {/* Keyboard shortcut hint */}
                {!isProcessing && connected && (
                    <div className="text-xs text-gray-500">
                        Press <kbd className="px-1 py-0.5 bg-gray-700/50 rounded text-xs">Enter</kbd> to send
                    </div>
                )}
            </div>
        </div>
    )
}