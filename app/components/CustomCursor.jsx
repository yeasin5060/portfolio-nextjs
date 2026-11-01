'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

/**
 * CustomCursor - Premium Awwwards-inspired magnetic follower cursor
 * Only active on desktop pointers, disabled on touch and respects reduced motion.
 */
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check for touch device or reduced motion
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReducedMotion) return

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Check if hovering interactive element or avatar canvas
      const target = e.target
      if (target && target.closest && target.closest('canvas')) {
        setIsVisible(false)
        return
      }

      if (!isVisible) setIsVisible(true)
      const isInteractive = target && target.closest && target.closest('a, button, input, textarea, [role="button"]')
      setIsHoveringInteractive(!!isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Center sharp dot */}
      <motion.div
        aria-hidden='true'
        className='fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-difference'
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHoveringInteractive ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 450, mass: 0.1 }}
      />

      {/* Lagging magnetic glow aura */}
      <motion.div
        aria-hidden='true'
        className='fixed top-0 left-0 rounded-full border border-cyan-400/60 pointer-events-none z-[9998] backdrop-blur-[0.5px]'
        animate={{
          x: isHoveringInteractive ? mousePosition.x - 24 : mousePosition.x - 16,
          y: isHoveringInteractive ? mousePosition.y - 24 : mousePosition.y - 16,
          width: isHoveringInteractive ? 48 : 32,
          height: isHoveringInteractive ? 48 : 32,
          backgroundColor: isHoveringInteractive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.03)',
          borderColor: isHoveringInteractive ? 'rgba(6, 182, 212, 0.9)' : 'rgba(6, 182, 212, 0.4)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 220, mass: 0.2 }}
      />
    </>
  )
}

export default CustomCursor
