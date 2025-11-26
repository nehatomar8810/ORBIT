import React from 'react'

interface OrbitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
  animate?: boolean
}

export function OrbitLogo({ 
  size = 'md', 
  className = '', 
  showText = true, 
  animate = false 
}: OrbitLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <svg 
          viewBox="0 0 100 100" 
          className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="center-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Glow */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="url(#glow)" 
            className={animate ? 'animate-pulse' : ''}
          />

          {/* Outer Orbit Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            fill="none" 
            stroke="url(#orbit-gradient)" 
            strokeWidth="2"
            strokeDasharray="4 4"
            className={animate ? 'animate-spin' : ''}
            style={animate ? { animationDuration: '8s' } : {}}
          />

          {/* Middle Orbit Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="25" 
            fill="none" 
            stroke="url(#orbit-gradient)" 
            strokeWidth="1.5"
            strokeOpacity="0.7"
            strokeDasharray="2 3"
            className={animate ? 'animate-spin' : ''}
            style={animate ? { animationDuration: '6s', animationDirection: 'reverse' } : {}}
          />

          {/* Inner Orbit Ring */}
          <circle 
            cx="50" 
            cy="50" 
            r="15" 
            fill="none" 
            stroke="url(#orbit-gradient)" 
            strokeWidth="1"
            strokeOpacity="0.5"
            className={animate ? 'animate-spin' : ''}
            style={animate ? { animationDuration: '4s' } : {}}
          />

          {/* Central Core */}
          <circle 
            cx="50" 
            cy="50" 
            r="8" 
            fill="url(#center-gradient)"
            className={animate ? 'animate-pulse' : ''}
          />

          {/* Core Highlight */}
          <circle 
            cx="47" 
            cy="47" 
            r="3" 
            fill="#FFFFFF"
            fillOpacity="0.6"
          />

          {/* Orbital Objects */}
          <circle 
            cx="85" 
            cy="50" 
            r="2.5" 
            fill="#60A5FA"
            className={animate ? 'animate-pulse' : ''}
          />
          <circle 
            cx="25" 
            cy="30" 
            r="2" 
            fill="#A78BFA"
            className={animate ? 'animate-pulse' : ''}
            style={animate ? { animationDelay: '0.5s' } : {}}
          />
          <circle 
            cx="70" 
            cy="25" 
            r="1.5" 
            fill="#EC4899"
            className={animate ? 'animate-pulse' : ''}
            style={animate ? { animationDelay: '1s' } : {}}
          />
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-white tracking-tight leading-none`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              ORBIT
            </span>
          </h1>
          {size === 'xl' && (
            <p className="text-xs text-gray-400 font-light tracking-wider uppercase mt-1">
              Voice-Integrated Assistant
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default OrbitLogo
