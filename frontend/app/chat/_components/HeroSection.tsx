import { Sparkles, Mic, MessageSquare } from "lucide-react";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className={`relative mb-16 z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl scale-150 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-slate-900/70 to-slate-800/70 p-16 rounded-3xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl inline-block shadow-2xl">
            <div className="bg-slate-900 p-4 rounded-2xl">
              <Sparkles className="w-16 h-16 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16 space-y-6 z-10 relative">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
              ORBIT
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-24 animate-pulse"></div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Personal AI Assistant
              <MessageSquare className="w-4 h-4" />
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-24 animate-pulse"></div>
          </div>
        </div>
        <p className="text-slate-300 text-xl max-w-4xl leading-relaxed font-light">
          Transform your digital workflow with an intelligent assistant that unifies email, calendar, documents, and tasks into one seamless conversation.{' '}
          <span className="text-blue-400 font-medium">Reclaim up to 40% of your productive time.</span>
        </p>
      </div>
    </>
  );
}
