import { Sparkles, Clock } from "lucide-react";

interface ValuePropositionProps {
  className?: string;
}

export function ValueProposition({ className = "" }: ValuePropositionProps) {
  return (
    <div className={`relative overflow-hidden p-10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-3xl border border-slate-700/30 backdrop-blur-xl max-w-4xl mb-16 shadow-2xl z-10 ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full translate-y-16 -translate-x-16"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-xl shadow-lg">
            <div className="bg-slate-900 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <h4 className="text-blue-300 font-bold text-xl tracking-tight">Why Choose ORBIT?</h4>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg font-light mb-6">
          The average knowledge worker switches between 9-11 applications daily, losing over 4 hours weekly to context switching and digital friction. 
          ORBIT eliminates this productivity drain by creating an intelligent, human-centric layer that unifies your entire digital workspace into one seamless conversation.
        </p>
        <div className="flex items-center gap-3 text-blue-400 font-medium">
          <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
            <Clock className="w-4 h-4" />
          </div>
          <span>Transform how you work with AI-powered productivity</span>
        </div>
      </div>
    </div>
  );
}
