/**
 * Styling utilities and constants for EmptyChatState component
 * Ensures consistent design patterns and maintainable code
 */

export const animations = {
  pulse: "animate-pulse",
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  scale: "hover:scale-[1.02]",
  translateX: "group-hover:translate-x-1",
  scaleOnHover: "group-hover:scale-150",
} as const;

export const gradients = {
  // Primary brand gradients
  primary: "from-blue-500 to-purple-600",
  primaryText: "from-blue-400 via-purple-400 to-indigo-400",
  
  // Feature-specific gradients
  memory: "from-purple-500 to-violet-600",
  workspace: "from-amber-500 to-orange-500",
  security: "from-emerald-500 to-teal-500",
  
  // Suggestion gradients
  productivity: "from-blue-500 to-indigo-500",
  communication: "from-cyan-500 to-blue-500",
  recall: "from-purple-500 to-pink-500",
  automation: "from-indigo-500 to-purple-500",
  
  // Background gradients
  cardBg: "from-slate-800/40 to-slate-900/40",
  cardBgHover: "from-slate-800/60 to-slate-900/60",
  heroBg: "from-slate-900/70 to-slate-800/70",
  
  // Accent gradients
  topBorder: "from-blue-500 via-purple-500 to-indigo-500",
  divider: "from-transparent via-blue-500 to-transparent",
  dividerSubtle: "from-transparent via-slate-600 to-transparent",
} as const;

export const colors = {
  // Text colors
  primary: "text-white",
  secondary: "text-slate-300",
  muted: "text-slate-400",
  accent: "text-blue-400",
  success: "text-emerald-400",
  error: "text-red-400",
  
  // Background colors
  cardBorder: "border-slate-700/50",
  cardBorderHover: "hover:border-slate-600/50",
  successBg: "bg-emerald-500/10",
  successBorder: "border-emerald-500/20",
  errorBg: "bg-red-500/5",
  errorBorder: "border-red-500/20",
} as const;

export const spacing = {
  sectionGap: "mb-16",
  largeSectionGap: "mb-20",
  cardPadding: "p-8",
  heroSpacing: "py-20 px-6",
  iconPadding: "p-4",
  badgePadding: "px-3 py-1",
} as const;

export const borderRadius = {
  card: "rounded-3xl",
  button: "rounded-2xl",
  icon: "rounded-xl",
  badge: "rounded-full",
  small: "rounded-lg",
} as const;

export const shadows = {
  card: "shadow-xl",
  hero: "shadow-2xl",
  cardHover: "hover:shadow-2xl hover:shadow-blue-500/5",
} as const;

export const transitions = {
  default: "transition-all duration-300",
  slow: "transition-all duration-500",
  fast: "transition-colors duration-200",
  transform: "transition-transform duration-500",
} as const;

export const typography = {
  heading: "font-bold tracking-tight",
  subheading: "font-medium tracking-wide",
  body: "font-light leading-relaxed",
  caption: "text-xs font-light",
  badge: "text-xs font-medium uppercase tracking-wider",
} as const;

// Utility functions
export const getFeatureStyles = (feature: string) => {
  const styleMap = {
    memory: {
      gradient: gradients.memory,
      bgAccent: "from-purple-500/10 to-violet-500/5",
      borderHover: "hover:border-purple-500/40",
    },
    workspace: {
      gradient: gradients.workspace,
      bgAccent: "from-amber-500/10 to-orange-500/5",
      borderHover: "hover:border-amber-500/40",
    },
    security: {
      gradient: gradients.security,
      bgAccent: "from-emerald-500/10 to-teal-500/5",
      borderHover: "hover:border-emerald-500/40",
    },
  };
  
  return styleMap[feature as keyof typeof styleMap] || styleMap.memory;
};

export const getSuggestionGradient = (category: string) => {
  const gradientMap = {
    Productivity: gradients.productivity,
    Communication: gradients.communication,
    Memory: gradients.recall,
    Automation: gradients.automation,
  };
  
  return gradientMap[category as keyof typeof gradientMap] || gradients.primary;
};
