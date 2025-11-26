import { Sparkles } from "lucide-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  return (
    <div className={`text-center space-y-4 z-10 relative ${className}`}>
      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1 max-w-32"></div>
        <div className="flex items-center gap-2 text-slate-400 font-medium text-sm tracking-wide">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-lg">
            <div className="bg-slate-900 p-1 rounded-lg">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          ORBIT AI • Personal Assistant • v1.0
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1 max-w-32"></div>
      </div>
      <div className="text-xs text-slate-500 font-light">
        Powered by advanced language models and enterprise-grade security
      </div>
    </div>
  );
}
