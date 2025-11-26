import { ArrowRight } from "lucide-react";
import { Suggestion } from "./empty-chat-state.types";

interface SuggestionGridProps {
  suggestions: Suggestion[];
  connected: boolean;
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

export function SuggestionGrid({ 
  suggestions, 
  connected, 
  onSuggestionClick, 
  className = "" 
}: SuggestionGridProps) {
  return (
    <div className={`w-full max-w-5xl mb-20 z-10 relative ${className}`}>
      <div className="text-center mb-12">
        <h3 className="text-white font-bold text-3xl mb-4 tracking-tight">Get Started with ORBIT</h3>
        <p className="text-slate-400 text-lg font-light">Try these sample requests or simply speak naturally to your assistant</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className="group relative overflow-hidden p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-800/60 hover:to-slate-900/60 rounded-2xl border border-slate-700/30 text-left transition-all duration-300 hover:transform hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 backdrop-blur-xl disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={() => onSuggestionClick?.(suggestion.text)}
            disabled={!connected}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative flex items-start gap-6">
              <div className={`bg-gradient-to-br ${suggestion.gradient} p-1 rounded-xl shadow-lg flex-shrink-0`}>
                <div className="bg-slate-900 p-3 rounded-xl">
                  <suggestion.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-slate-200 group-hover:text-white transition-colors font-medium text-lg leading-tight">
                    {suggestion.text}
                  </p>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 flex-shrink-0" />
                </div>
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs text-blue-400 font-medium uppercase tracking-wider bg-blue-500/10 rounded-full border border-blue-500/20">
                    {suggestion.category}
                  </span>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
