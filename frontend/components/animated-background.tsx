"use client"

import React from 'react'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced Gradient Orbs with Movement */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-32 w-[30rem] h-[30rem] bg-gradient-to-br from-purple-500/12 to-pink-500/8 rounded-full blur-3xl animate-float-reverse"></div>
      <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-orange-500/6 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-tr from-cyan-500/12 to-blue-500/8 rounded-full blur-3xl animate-float-slower"></div>
      
      {/* Enhanced Floating Particles with Better Movement */}
      <div className="absolute inset-0">
        {/* Glowing Particles */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-400/40 rounded-full shadow-lg shadow-blue-400/20 animate-float-particle"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full shadow-lg shadow-purple-400/25 animate-float-particle-reverse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-pink-400/35 rounded-full shadow-lg shadow-pink-400/20 animate-float-particle-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full shadow-lg shadow-cyan-400/30 animate-float-particle-fast"></div>
        
        {/* Twinkling Stars */}
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-blue-300/60 rounded-full animate-twinkle"></div>
        <div className="absolute top-3/4 right-1/5 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/5 right-1/2 w-1 h-1 bg-pink-300/55 rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-1/6 left-3/4 w-0.5 h-0.5 bg-cyan-300/70 rounded-full animate-twinkle"></div>
        <div className="absolute top-1/6 left-2/3 w-0.5 h-0.5 bg-blue-200/80 rounded-full animate-twinkle-slower"></div>
        <div className="absolute bottom-1/5 left-1/2 w-1 h-1 bg-purple-200/60 rounded-full animate-twinkle-fast"></div>
        <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-pink-200/50 rounded-full animate-twinkle"></div>
        <div className="absolute bottom-2/3 right-1/6 w-0.5 h-0.5 bg-cyan-200/75 rounded-full animate-twinkle-slow"></div>
      </div>

      {/* Enhanced Orbital System */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Outer Orbit with Glow */}
        <div className="absolute w-[32rem] h-[32rem] rounded-full animate-orbit-slow">
          <div className="w-full h-full border border-blue-500/15 rounded-full shadow-lg shadow-blue-500/5"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400/80 rounded-full shadow-lg shadow-blue-400/40 animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-cyan-400/70 rounded-full shadow-md shadow-cyan-400/35"></div>
        </div>
        
        {/* Middle Orbit */}
        <div className="absolute w-80 h-80 rounded-full animate-orbit-reverse">
          <div className="w-full h-full border border-purple-500/12 rounded-full shadow-md shadow-purple-500/4"></div>
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400/85 rounded-full shadow-lg shadow-purple-400/45 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pink-400/75 rounded-full shadow-sm shadow-pink-400/35"></div>
        </div>
        
        {/* Inner Orbit */}
        <div className="absolute w-52 h-52 rounded-full animate-orbit-fast">
          <div className="w-full h-full border border-pink-500/10 rounded-full shadow-sm shadow-pink-500/3"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-pink-400/90 rounded-full shadow-md shadow-pink-400/50 animate-pulse-fast"></div>
        </div>
        
        {/* Central Hub */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/15 rounded-full animate-pulse-gentle border border-white/10 shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-2 bg-gradient-to-tr from-white/20 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Shooting Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-40 h-1 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transform rotate-45 animate-shooting-star"></div>
        <div className="absolute bottom-1/3 right-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent transform -rotate-45 animate-shooting-star-reverse"></div>
        <div className="absolute top-2/3 left-1/4 w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent transform rotate-12 animate-shooting-star-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-28 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent transform -rotate-12 animate-shooting-star-fast"></div>
      </div>

      {/* Enhanced Data Nodes */}
      <div className="absolute top-1/5 left-1/6 animate-float-node">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500/25 rounded-full animate-pulse-node border border-blue-500/40 shadow-lg shadow-blue-500/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-ping-slow"></div>
          <div className="absolute -top-1 -left-1 w-6 h-6 border border-blue-400/20 rounded-full animate-pulse-ring"></div>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 right-1/5 animate-float-node-reverse">
        <div className="relative">
          <div className="w-5 h-5 bg-purple-500/20 rounded-full animate-pulse-node border border-purple-500/35 shadow-lg shadow-purple-500/15"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400/70 rounded-full animate-ping-slower"></div>
          <div className="absolute -top-1.5 -left-1.5 w-8 h-8 border border-purple-400/15 rounded-full animate-pulse-ring-slow"></div>
        </div>
      </div>

      <div className="absolute top-1/3 right-1/4 animate-float-node-slow">
        <div className="relative">
          <div className="w-3 h-3 bg-pink-500/22 rounded-full animate-pulse-node border border-pink-500/38 shadow-md shadow-pink-500/18"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pink-400/85 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -left-1 w-5 h-5 border border-pink-400/25 rounded-full animate-pulse-ring-fast"></div>
        </div>
      </div>

      {/* Enhanced Connection Network */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="enhanced-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="enhanced-line-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="enhanced-line-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
            <stop offset="25%" stopColor="#EC4899" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.2" />
            <stop offset="75%" stopColor="#EC4899" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <line x1="15%" y1="25%" x2="85%" y2="75%" stroke="url(#enhanced-line-1)" strokeWidth="1.5" className="animate-data-flow" />
        <line x1="75%" y1="15%" x2="25%" y2="85%" stroke="url(#enhanced-line-2)" strokeWidth="1" className="animate-data-flow-reverse" />
        <line x1="5%" y1="65%" x2="65%" y2="35%" stroke="url(#enhanced-line-3)" strokeWidth="0.8" className="animate-data-flow-slow" />
        <line x1="40%" y1="10%" x2="90%" y2="40%" stroke="url(#enhanced-line-1)" strokeWidth="0.6" className="animate-data-flow-fast" />
        <line x1="10%" y1="90%" x2="60%" y2="60%" stroke="url(#enhanced-line-2)" strokeWidth="0.7" className="animate-data-flow" />
      </svg>

      {/* Subtle Animated Grid */}
      <div className="absolute inset-0 opacity-3 animate-grid-pulse">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.15) 1px, transparent 0),
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 60px 60px'
        }}></div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vw] h-32 bg-gradient-to-b from-blue-500/5 to-transparent animate-ambient-glow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/8 to-transparent animate-ambient-glow-slow"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
          50% { transform: translateY(-10px) translateX(-5px) rotate(-0.5deg); }
          75% { transform: translateY(-15px) translateX(15px) rotate(0.5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(15px) translateX(-10px) rotate(-1deg); }
          50% { transform: translateY(8px) translateX(5px) rotate(0.5deg); }
          75% { transform: translateY(12px) translateX(-15px) rotate(-0.5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-8px) translateX(8px) rotate(0.3deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-5px) translateX(-5px) rotate(-0.2deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-15px) translateX(8px) scale(1.1); }
          66% { transform: translateY(-8px) translateX(-12px) scale(0.9); }
        }
        @keyframes float-particle-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(12px) translateX(-8px) scale(0.9); }
          66% { transform: translateY(6px) translateX(10px) scale(1.1); }
        }
        @keyframes float-particle-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); }
          50% { transform: translateY(-10px) translateX(5px) scale(1.05) rotate(180deg); }
        }
        @keyframes float-particle-fast {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-8px) translateX(4px) scale(1.2); }
          50% { transform: translateY(-3px) translateX(-6px) scale(0.8); }
          75% { transform: translateY(-12px) translateX(8px) scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes twinkle-fast {
          0%, 100% { opacity: 0.4; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes twinkle-slower {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes orbit-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbit-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        @keyframes shooting-star {
          0% { opacity: 0; transform: translateX(-100px) rotate(45deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(100px) rotate(45deg); }
        }
        @keyframes shooting-star-reverse {
          0% { opacity: 0; transform: translateX(100px) rotate(-45deg); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-100px) rotate(-45deg); }
        }
        @keyframes shooting-star-slow {
          0% { opacity: 0; transform: translateX(-80px) rotate(12deg); }
          50% { opacity: 0.8; }
          100% { opacity: 0; transform: translateX(80px) rotate(12deg); }
        }
        @keyframes shooting-star-fast {
          0% { opacity: 0; transform: translateX(-120px) rotate(-12deg); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translateX(120px) rotate(-12deg); }
        }
        @keyframes float-node {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-6px) translateX(3px); }
        }
        @keyframes float-node-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(4px) translateX(-3px); }
        }
        @keyframes float-node-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-3px) translateX(2px); }
        }
        @keyframes pulse-node {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes pulse-ring-slow {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes pulse-ring-fast {
          0% { transform: scale(0.7); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 0; }
        }
        @keyframes data-flow {
          0% { stroke-dasharray: 0 20; }
          100% { stroke-dasharray: 20 0; }
        }
        @keyframes data-flow-reverse {
          0% { stroke-dasharray: 20 0; }
          100% { stroke-dasharray: 0 20; }
        }
        @keyframes data-flow-slow {
          0% { stroke-dasharray: 0 15; }
          100% { stroke-dasharray: 15 0; }
        }
        @keyframes data-flow-fast {
          0% { stroke-dasharray: 0 10; }
          100% { stroke-dasharray: 10 0; }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.05; }
        }
        @keyframes ambient-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes ambient-glow-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 15s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 6s ease-in-out infinite; }
        .animate-float-particle-reverse { animation: float-particle-reverse 7s ease-in-out infinite; }
        .animate-float-particle-slow { animation: float-particle-slow 9s ease-in-out infinite; }
        .animate-float-particle-fast { animation: float-particle-fast 4s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-twinkle-slow { animation: twinkle-slow 4s ease-in-out infinite; }
        .animate-twinkle-fast { animation: twinkle-fast 2s ease-in-out infinite; }
        .animate-twinkle-slower { animation: twinkle-slower 5s ease-in-out infinite; }
        .animate-orbit-slow { animation: orbit-slow 40s linear infinite; }
        .animate-orbit-reverse { animation: orbit-reverse 30s linear infinite; }
        .animate-orbit-fast { animation: orbit-fast 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 6s ease-in-out infinite; }
        .animate-shooting-star { animation: shooting-star 8s ease-in-out infinite; }
        .animate-shooting-star-reverse { animation: shooting-star-reverse 10s ease-in-out infinite; }
        .animate-shooting-star-slow { animation: shooting-star-slow 12s ease-in-out infinite; }
        .animate-shooting-star-fast { animation: shooting-star-fast 6s ease-in-out infinite; }
        .animate-float-node { animation: float-node 5s ease-in-out infinite; }
        .animate-float-node-reverse { animation: float-node-reverse 6s ease-in-out infinite; }
        .animate-float-node-slow { animation: float-node-slow 8s ease-in-out infinite; }
        .animate-pulse-node { animation: pulse-node 3s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-ping-slower { animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
        .animate-pulse-ring-slow { animation: pulse-ring-slow 3s ease-out infinite; }
        .animate-pulse-ring-fast { animation: pulse-ring-fast 1.5s ease-out infinite; }
        .animate-data-flow { animation: data-flow 4s ease-in-out infinite; }
        .animate-data-flow-reverse { animation: data-flow-reverse 5s ease-in-out infinite; }
        .animate-data-flow-slow { animation: data-flow-slow 6s ease-in-out infinite; }
        .animate-data-flow-fast { animation: data-flow-fast 3s ease-in-out infinite; }
        .animate-grid-pulse { animation: grid-pulse 8s ease-in-out infinite; }
        .animate-ambient-glow { animation: ambient-glow 10s ease-in-out infinite; }
        .animate-ambient-glow-slow { animation: ambient-glow-slow 15s ease-in-out infinite; }
      `}</style>
    </div>
  )
}

export default AnimatedBackground
