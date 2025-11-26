"use client"

import React, { useEffect, useState, useRef } from 'react'

export function MouseInteraction() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([])
  const rippleIdRef = useRef(0)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      // Create ripple effect
      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      }
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
      }, 1000)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Outer Ring */}
        <div 
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
            isHovering 
              ? 'w-12 h-12 border-2 border-blue-400 bg-blue-400/10' 
              : 'w-8 h-8 border border-white/60'
          } ${isClicking ? 'scale-75' : 'scale-100'}`}
        />
        
        {/* Inner Dot */}
        <div 
          className={`absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
            isHovering ? 'bg-blue-400 scale-125' : 'bg-white scale-100'
          } ${isClicking ? 'scale-50' : ''}`}
        />

        {/* Cursor Glow */}
        {isHovering && (
          <div className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-md animate-pulse" />
        )}
      </div>

      {/* Mouse Trail Effect */}
      <div 
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x - 80,
          top: mousePosition.y - 80,
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovering ? 0.8 : 0.3
        }}
      >
        <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-pink-500/10 blur-xl" />
      </div>

      {/* Floating Orbital Particles */}
      {[...Array(4)].map((_, i) => {
        const angle = (Date.now() * 0.001 + i * Math.PI / 2) % (2 * Math.PI)
        const radius = isHovering ? 30 + i * 8 : 20 + i * 5
        const x = mousePosition.x + Math.cos(angle) * radius
        const y = mousePosition.y + Math.sin(angle) * radius
        
        return (
          <div
            key={i}
            className={`fixed pointer-events-none z-30 rounded-full transition-all duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-60'
            }`}
            style={{
              left: x - 2,
              top: y - 2,
              width: isHovering ? '6px' : '4px',
              height: isHovering ? '6px' : '4px',
              background: `hsl(${220 + i * 30}, 70%, 60%)`,
              boxShadow: `0 0 8px hsl(${220 + i * 30}, 70%, 60%)`,
              transform: `scale(${isClicking ? 0.5 : 1})`
            }}
          />
        )
      })}

      {/* Click Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-20 rounded-full border-2 border-blue-400/60"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: '50px',
            height: '50px',
            animation: 'ripple 1s ease-out forwards'
          }}
        />
      ))}

      {/* Ripple Animation Styles */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>

      {/* Magnetic Effect for Buttons */}
      <style jsx global>{`
        button, a, [role="button"] {
          position: relative;
          overflow: hidden;
        }
        
        button:hover::before, 
        a:hover::before, 
        [role="button"]:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: magneticPulse 0.6s ease-out;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes magneticPulse {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        /* Ensure content stays above the effect */
        button > *, 
        a > *, 
        [role="button"] > * {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  )
}

export default MouseInteraction
