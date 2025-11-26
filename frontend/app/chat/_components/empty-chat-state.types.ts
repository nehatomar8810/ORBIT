import { LucideIcon } from "lucide-react";

/**
 * Type definitions for EmptyChatState component
 */

export interface EmptyChatStateProps {
  connected: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  bgAccent: string;
  iconBg: string;
  borderHover: string;
}

export interface Suggestion {
  id: string;
  icon: LucideIcon;
  text: string;
  category: "Productivity" | "Communication" | "Memory" | "Automation";
  description: string;
  gradient: string;
}

export interface ConnectionStatus {
  connected: boolean;
  variant: "success" | "error";
  message: string;
  description?: string;
}

export type StyleVariant = "primary" | "secondary" | "success" | "error" | "warning";

export interface AnimationConfig {
  duration?: "fast" | "default" | "slow";
  type?: "fade" | "slide" | "scale" | "pulse";
  delay?: number;
}

export interface GradientConfig {
  from: string;
  to: string;
  direction?: "r" | "l" | "t" | "b" | "tr" | "tl" | "br" | "bl";
}

export interface SpacingConfig {
  padding?: "sm" | "md" | "lg" | "xl";
  margin?: "sm" | "md" | "lg" | "xl";
  gap?: "sm" | "md" | "lg" | "xl";
}

export interface BorderConfig {
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  width?: "thin" | "medium" | "thick";
  style?: "solid" | "dashed" | "dotted";
}

export interface TypographyConfig {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  tracking?: "tight" | "normal" | "wide" | "wider";
  leading?: "tight" | "normal" | "relaxed" | "loose";
}
