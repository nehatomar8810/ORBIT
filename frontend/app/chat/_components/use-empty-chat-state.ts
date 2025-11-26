import { useMemo } from 'react';
import { 
  Brain, 
  Zap, 
  Shield, 
  Calendar, 
  Mail, 
  FileText 
} from "lucide-react";
import { Feature, Suggestion, ConnectionStatus } from './empty-chat-state.types';

/**
 * Custom hook for EmptyChatState component
 * Manages component data and derived state
 */
export const useEmptyChatState = () => {
  const features: Feature[] = useMemo(() => [
    {
      id: 'memory',
      icon: Brain,
      title: "Contextual Memory",
      description: "Remembers your preferences, past conversations, and work patterns to provide personalized assistance",
      gradient: "from-purple-500 to-violet-600",
      bgAccent: "from-purple-500/10 to-violet-500/5",
      iconBg: "bg-purple-500/20",
      borderHover: "hover:border-purple-500/40"
    },
    {
      id: 'workspace',
      icon: Zap,
      title: "Unified Workspace",
      description: "Access all your apps—email, calendar, docs, tasks—through one intelligent conversation",
      gradient: "from-amber-500 to-orange-500",
      bgAccent: "from-amber-500/10 to-orange-500/5",
      iconBg: "bg-amber-500/20",
      borderHover: "hover:border-amber-500/40"
    },
    {
      id: 'security',
      icon: Shield,
      title: "Secure & Private",
      description: "Your data stays protected with enterprise-grade security and local processing",
      gradient: "from-emerald-500 to-teal-500",
      bgAccent: "from-emerald-500/10 to-teal-500/5",
      iconBg: "bg-emerald-500/20",
      borderHover: "hover:border-emerald-500/40"
    }
  ], []);

  const suggestions: Suggestion[] = useMemo(() => [
    {
      id: 'schedule',
      icon: Calendar,
      text: "What's on my schedule today?",
      category: "Productivity",
      description: "Get a quick overview of your upcoming meetings and tasks",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: 'emails',
      icon: Mail,
      text: "Summarize my unread emails",
      category: "Communication",
      description: "Stay on top of important messages without opening your inbox",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      id: 'memory',
      icon: FileText,
      text: "Remind me what I committed to last Thursday",
      category: "Memory",
      description: "Recall important commitments and decisions from past conversations",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 'automation',
      icon: Brain,
      text: "Draft an email based on this doc and send it by 5PM",
      category: "Automation",
      description: "Create and schedule communications with context awareness",
      gradient: "from-indigo-500 to-purple-500"
    }
  ], []);

  const getConnectionStatus = (connected: boolean): ConnectionStatus => ({
    connected,
    variant: connected ? 'success' : 'error',
    message: connected 
      ? 'ORBIT is connected and ready to assist'
      : 'Connection Required',
    description: connected
      ? undefined
      : 'WebSocket server is not running on localhost:9000. Please ensure the server is started to begin your ORBIT experience.'
  });

  return {
    features,
    suggestions,
    getConnectionStatus
  };
};
