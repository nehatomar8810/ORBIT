/**
 * Export all EmptyChatState related components and utilities
 */

// Main component
export { EmptyChatState } from './EmptyChatState';

// Sub-components
export { HeroSection } from './HeroSection';
export { ConnectionStatusBanner } from './ConnectionStatusBanner';
export { FeatureGrid } from './FeatureGrid';
export { SuggestionGrid } from './SuggestionGrid';
export { ValueProposition } from './ValueProposition';
export { Footer } from './Footer';

// Hook and utilities
export { useEmptyChatState } from './use-empty-chat-state';

// Types
export type {
  EmptyChatStateProps,
  Feature,
  Suggestion,
  ConnectionStatus,
  StyleVariant,
  AnimationConfig,
  GradientConfig,
  SpacingConfig,
  BorderConfig,
  TypographyConfig
} from './empty-chat-state.types';

// Style utilities
export * from './empty-chat-state.styles';
