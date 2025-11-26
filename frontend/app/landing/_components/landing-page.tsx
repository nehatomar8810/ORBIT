"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrbitLogo } from "@/components/orbit-logo"
import { AnimatedBackground } from "@/components/animated-background"
import { MouseInteraction } from "@/components/mouse-interaction"
import { 
  ArrowRight, 
  Mic, 
  Brain, 
  Zap, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  MessageSquare,
  Calendar,
  Mail,
  FileText,
  Smartphone,
  Eye,
  Heart,
  Target,
  Bot
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: Mic,
      title: "Voice & Text Input",
      description: "Talk or type naturally. ORBIT converts speech and documents into actionable insights."
    },
    {
      icon: Brain,
      title: "Contextual Memory",
      description: "Remembers your preferences, routines, and past interactions for personalized assistance."
    },
    {
      icon: Zap,
      title: "Intent Recognition",
      description: "Understands complex requests and breaks them into actionable sub-tasks automatically."
    },
    {
      icon: CheckCircle,
      title: "Tool Orchestration",
      description: "Seamlessly coordinates across Gmail, Calendar, Docs, and other apps you use daily."
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Boosts Productivity",
      description: "Save hours monthly by eliminating app-switching and automating routine tasks.",
      color: "text-green-400"
    },
    {
      icon: Eye,
      title: "Accessible for Everyone",
      description: "Voice and text interfaces support users with different abilities and tech experience.",
      color: "text-blue-400"
    },
    {
      icon: Heart,
      title: "Less Stress, More Focus",
      description: "Reduce mental load and digital fatigue with one unified interface for everything.",
      color: "text-purple-400"
    }
  ]

  const statistics = [
    { value: "1,200", label: "Daily Context Switches", sublabel: "Average per worker" },
    { value: "4+", label: "Hours Lost Weekly", sublabel: "To app switching" },
    { value: "40%", label: "Productive Time Lost", sublabel: "To task fragmentation" },
    { value: "59", label: "Minutes Daily", sublabel: "Searching for information" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-950 relative">
      {/* Mouse Interaction Effects */}
      <MouseInteraction />
      
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Header */}
      <header className="border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <OrbitLogo size="md" animate={true} />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/20">
            Personal Voice-Integrated Assistant
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Your Digital Life,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              One Conversation
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            ORBIT eliminates digital fragmentation by centralizing emails, docs, chats, calendars, and tasks 
            into one conversational interface. No more app-hopping. Just ask, and move forward.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Mic className="mr-2 h-5 w-5 group-hover:animate-pulse relative z-10" />
              <span className="relative z-10 font-semibold">Try Voice Command</span>
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 backdrop-blur-sm bg-white/5">
                <ArrowRight className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            The Digital Fragmentation Problem
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Today's digital workers are overwhelmed by fragmented tools—email, chats, calendars, documents, 
            and task apps spread across platforms. This constant context-switching is costing you more than you think.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statistics.map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">{stat.value}</div>
                <div className="text-sm md:text-base font-semibold text-gray-300 mb-2 tracking-wide uppercase">{stat.label}</div>
                <div className="text-xs md:text-sm text-gray-500 font-medium">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg md:text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Research shows workers switch apps up to <span className="text-blue-400 font-bold text-xl md:text-2xl">1,200 times daily</span>, 
            with some switching <span className="text-purple-400 font-bold text-xl md:text-2xl">3,600+ times in a single day</span>. 
            This digital friction causes lost productivity, stress, and burnout.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            How ORBIT Solves This
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            ORBIT creates a human-centric layer over your digital tools, enabling natural language interaction 
            with all your apps through one unified interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-white text-lg md:text-xl font-semibold tracking-tight">
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7 mr-3 text-blue-400" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Examples */}
        <div className="bg-gray-900/30 rounded-xl p-8 border border-gray-800">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center tracking-tight">
            See ORBIT in Action
          </h3>
          
          {/* Example Conversations */}
          <div className="space-y-8">
            {/* Example 1: Meeting Management */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm md:text-base text-blue-400 font-semibold tracking-wide uppercase">Meeting Management</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-black font-bold">You</span>
                  </div>
                  <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-500/30">
                    <p className="text-white font-medium leading-relaxed">"Schedule a team standup for tomorrow at 10 AM and send calendar invites to the development team"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <p className="text-gray-200 mb-2 font-medium leading-relaxed">I'll help you schedule that meeting. Let me:</p>
                    <ul className="text-sm text-gray-300 space-y-1 font-light leading-relaxed">
                      <li>✓ Check team availability for tomorrow 10 AM</li>
                      <li>✓ Create "Team Standup" event in Google Calendar</li>
                      <li>✓ Add Google Meet link automatically</li>
                      <li>✓ Send invites to: Alex, Sarah, Mike, and Jessica</li>
                    </ul>
                    <p className="text-green-400 text-sm mt-2 font-semibold tracking-wide">Meeting scheduled successfully! All team members have been notified.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Email & Document Workflow */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm md:text-base text-green-400 font-semibold tracking-wide uppercase">Email & Document Workflow</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-black font-bold">You</span>
                  </div>
                  <div className="bg-green-600/20 rounded-lg p-3 border border-green-500/30">
                    <p className="text-white font-medium leading-relaxed">"Take the project proposal from my Google Drive and email a summary to the client with next steps"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <p className="text-gray-200 mb-2 font-medium leading-relaxed">I found the "Q3 Website Redesign Proposal" in your Drive. Here's what I'll do:</p>
                    <ul className="text-sm text-gray-300 space-y-1 mb-3 font-light leading-relaxed">
                      <li>✓ Extracted key points from 12-page proposal</li>
                      <li>✓ Created executive summary highlighting:</li>
                      <li className="ml-4">• Timeline: 8-week implementation</li>
                      <li className="ml-4">• Budget: $45,000</li>
                      <li className="ml-4">• Key features: Mobile-first design, CMS integration</li>
                      <li>✓ Drafted professional email to client@company.com</li>
                    </ul>
                    <div className="bg-gray-800 rounded p-3 text-sm text-gray-300 mb-2 font-light">
                      <strong className="text-white font-semibold">Email Preview:</strong><br />
                      "Hi Sarah, I hope this email finds you well. I've attached a summary of our website redesign proposal..."
                    </div>
                    <p className="text-green-400 text-sm font-semibold tracking-wide">Email sent successfully with proposal summary attached!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Context & Memory */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-purple-400 font-medium">Contextual Memory</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-black font-bold">You</span>
                  </div>
                  <div className="bg-purple-600/20 rounded-lg p-3 border border-purple-500/30">
                    <p className="text-white">"What did I commit to in last week's client call?"</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                    <p className="text-gray-200 mb-2">Based on your calendar and notes from July 2nd call with Acme Corp:</p>
                    <ul className="text-sm text-gray-300 space-y-1 mb-3">
                      <li>✓ Deliver wireframes by July 10th (due tomorrow!)</li>
                      <li>✓ Set up staging environment for testing</li>
                      <li>✓ Schedule follow-up demo for July 15th</li>
                      <li>✓ Provide cost estimate for additional features</li>
                    </ul>
                    <p className="text-orange-400 text-sm font-medium">⚠️ Reminder: Wireframes deadline is tomorrow. Would you like me to check the current status?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Command Examples */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-6 text-center tracking-tight">Try These Quick Commands</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer">
                <MessageSquare className="h-5 w-5 text-blue-400 mb-2" />
                <p className="text-sm text-gray-300 italic font-light leading-relaxed">"Summarize today's meetings"</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors cursor-pointer">
                <Calendar className="h-5 w-5 text-green-400 mb-2" />
                <p className="text-sm text-gray-300 italic">"Block 2 hours for deep work tomorrow"</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors cursor-pointer">
                <Mail className="h-5 w-5 text-purple-400 mb-2" />
                <p className="text-sm text-gray-300 italic">"Send weekly update to my team"</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-orange-500/50 transition-colors cursor-pointer">
                <FileText className="h-5 w-5 text-orange-400 mb-2" />
                <p className="text-sm text-gray-300 italic">"Create agenda for client meeting"</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-pink-500/50 transition-colors cursor-pointer">
                <Brain className="h-5 w-5 text-pink-400 mb-2" />
                <p className="text-sm text-gray-300 italic">"What's on my plate this week?"</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <Zap className="h-5 w-5 text-cyan-400 mb-2" />
                <p className="text-sm text-gray-300 italic">"Remind me to follow up in 3 days"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Impact */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-white">Transform Your</span>
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h2>
          <p className="text-xl text-gray-300/90 max-w-4xl mx-auto font-light leading-relaxed">
            ORBIT delivers significant productivity and quality-of-life improvements across three key areas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className={`h-6 w-6 text-white`} />
                  </div>
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300/90 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-500 hover:scale-105 group">
            <Target className="h-16 w-16 text-green-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Up to 40% More Productive Time</h3>
            <p className="text-gray-300/90 text-center leading-relaxed">By reducing tool-switching and context recovery</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:scale-105 group">
            <Brain className="h-16 w-16 text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Minimize Cognitive Overload</h3>
            <p className="text-gray-300/90 text-center leading-relaxed">Caused by scattered platforms and interfaces</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:scale-105 group">
            <Heart className="h-16 w-16 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Focus on Meaningful Work</h3>
            <p className="text-gray-300/90 text-center leading-relaxed">Rather than managing tools and interfaces</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-12 border border-blue-500/20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Ready to Unify Your Digital Life?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Join the revolution against digital fragmentation. Experience the power of 
            conversational computing with ORBIT.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Launch Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="group relative overflow-hidden border-2 border-gradient-to-r from-green-500 to-emerald-500 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 hover:text-white hover:border-green-400 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Mic className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              <span className="relative z-10 font-semibold">Try Voice Demo</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              <OrbitLogo size="lg" className="justify-center mb-2" />
            </h3>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Your personal voice-integrated assistant for a unified digital experience.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/chat" className="text-gray-400 hover:text-white transition-colors font-medium">
                Chat
              </Link>
              <Link href="/knowledge" className="text-gray-400 hover:text-white transition-colors font-medium">
                Knowledge
              </Link>
              <Link href="/plugins" className="text-gray-400 hover:text-white transition-colors font-medium">
                Plugins
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
