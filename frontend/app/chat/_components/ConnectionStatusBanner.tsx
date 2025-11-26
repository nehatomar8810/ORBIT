import { CheckCircle, AlertCircle } from "lucide-react";
import { ConnectionStatus } from "./empty-chat-state.types";

interface ConnectionStatusBannerProps {
  status: ConnectionStatus;
  className?: string;
}

export function ConnectionStatusBanner({ status, className = "" }: ConnectionStatusBannerProps) {
  const { connected, variant, message, description } = status;

  const variantStyles = {
    success: {
      container: "bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20",
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      pulse: "bg-emerald-400",
      textColor: "text-emerald-300",
      descriptionColor: "text-emerald-200/80"
    },
    error: {
      container: "bg-gradient-to-r from-red-500/5 to-red-600/5 border-red-500/20",
      icon: <AlertCircle className="w-6 h-6 text-red-400" />,
      pulse: "bg-red-500",
      textColor: "text-red-300",
      descriptionColor: "text-red-200/80"
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={`mb-16 p-6 ${styles.container} border rounded-2xl backdrop-blur-sm max-w-2xl shadow-xl z-10 relative ${className}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className="relative">
          {styles.icon}
          <div className={`absolute -top-1 -right-1 w-3 h-3 ${styles.pulse} rounded-full animate-pulse`}></div>
        </div>
        <p className={`${styles.textColor} font-semibold text-lg`}>{message}</p>
      </div>
      {description && (
        <p className={`${styles.descriptionColor} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  );
}
