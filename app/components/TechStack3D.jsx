'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { techStack, techStackCategories } from '../data/techStackData'

/**
 * TechStack3D - Ultra-Smooth 60/120FPS 3D Tech Orbit Sphere
 * Optimized with Direct DOM Ref Updates (Zero React Re-render Lag on Animation Loop)
 * Features:
 * - Direct GPU-accelerated translate3d compositing (bypasses React state overhead)
 * - True momentum physics with exponential inertia decay (friction = 0.92)
 * - Pointer capture handling for flawless mouse/touch dragging without jitter
 * - Intelligent hover slowdown for effortless micro-inspection
 * - Category filtering (All, Frontend, Backend, Database, Tools)
 * - Interactive Tech Spotlight Card & Responsive Grid Fallback
 */
const TechStack3D = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTechName, setSelectedTechName] = useState(techStack[0].name)
  const [isDragging, setIsDragging] = useState(false)
  const [viewMode, setViewMode] = useState('sphere') // 'sphere' | 'grid'

  const containerRef = useRef(null)
  const nodeRefs = useRef([])
  const isDraggingRef = useRef(false)
  const isHoveredRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0.001, y: 0.0025 })
  const rotRef = useRef({ x: 0.15, y: 0.2 })
  const animFrameRef = useRef(null)

  // Filtered tech items
  const filteredTech = useMemo(() => {
    if (selectedCategory === 'All') return techStack
    return techStack.filter(item => item.category === selectedCategory)
  }, [selectedCategory])

  // Declarative active tech resolution (No setState inside useEffect)
  const activeTech = useMemo(() => {
    const found = filteredTech.find(t => t.name === selectedTechName)
    return found || filteredTech[0] || techStack[0]
  }, [filteredTech, selectedTechName])

  // Distribute items uniformly on a sphere using the Fibonacci lattice
  const sphereNodes = useMemo(() => {
    const total = filteredTech.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    return filteredTech.map((tech, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total)

      return {
        ...tech,
        bx: Math.sin(phi) * Math.cos(theta),
        by: Math.cos(phi),
        bz: Math.sin(phi) * Math.sin(theta),
      }
    })
  }, [filteredTech])

  // High-Performance 3D Projection Loop (Direct DOM Updates - Zero React Re-rendering lag)
  useEffect(() => {
    if (viewMode !== 'sphere') return

    let isRunning = true

    const update3DPositions = () => {
      if (!isRunning) return

      const rot = rotRef.current
      const vel = velRef.current
      const container = containerRef.current

      // Calculate responsive radius based on container width
      const width = container ? container.clientWidth : 500
      const radius = width < 500 ? 140 : width < 768 ? 175 : 210
      const focalLength = 380

      // Physics momentum update
      if (!isDraggingRef.current) {
        // Integrate angular velocity
        rot.y += vel.y
        rot.x += vel.x

        // Smoothly damp velocity back into ambient orbital drift
        const targetIdleY = isHoveredRef.current ? 0.0006 : 0.0025
        const targetIdleX = isHoveredRef.current ? 0.0003 : 0.001

        vel.y = vel.y * 0.92 + targetIdleY * 0.08
        vel.x = vel.x * 0.92 + targetIdleX * 0.08
      }

      const cosX = Math.cos(rot.x)
      const sinX = Math.sin(rot.x)
      const cosY = Math.cos(rot.y)
      const sinY = Math.sin(rot.y)

      // Direct element updates
      const totalNodes = sphereNodes.length
      for (let i = 0; i < totalNodes; i++) {
        const node = sphereNodes[i]
        const el = nodeRefs.current[i]
        if (!el) continue

        // Rotate around Y-axis
        const x1 = node.bx * cosY + node.bz * sinY
        const z1 = -node.bx * sinY + node.bz * cosY

        // Rotate around X-axis
        const y2 = node.by * cosX - z1 * sinX
        const z2 = node.by * sinX + z1 * cosX
        const x2 = x1

        // World coordinates scaled by radius
        const worldX = x2 * radius
        const worldY = y2 * radius
        const worldZ = z2 * radius

        // Perspective depth calculation
        const depth = focalLength / (focalLength + worldZ)
        const scale = Math.max(0.55, Math.min(1.28, depth * 0.95))
        const alpha = Math.max(0.2, Math.min(1, (worldZ + radius) / (2 * radius) * 0.78 + 0.22))
        const zIndex = Math.round(worldZ + 400)

        const px = worldX * depth
        const py = worldY * depth

        // Directly mutate GPU transform & opacity (never causes React render lag)
        el.style.transform = `translate3d(${px}px, ${py}px, 0px) scale(${scale})`
        el.style.zIndex = zIndex
        el.style.opacity = alpha
      }

      animFrameRef.current = requestAnimationFrame(update3DPositions)
    }

    animFrameRef.current = requestAnimationFrame(update3DPositions)

    return () => {
      isRunning = false
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [sphereNodes, viewMode])

  // Mouse & Touch Pointer Handlers with PointerCapture for ultra-smooth drag
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}

    isDraggingRef.current = true
    setIsDragging(true)
    lastPosRef.current = { x: e.clientX, y: e.clientY }
    velRef.current = { x: 0, y: 0 }
  }

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - lastPosRef.current.x
    const dy = e.clientY - lastPosRef.current.y
    lastPosRef.current = { x: e.clientX, y: e.clientY }

    // Direct responsive angle modification
    rotRef.current.y += dx * 0.005
    rotRef.current.x -= dy * 0.005

    // Track smooth velocity
    velRef.current.y = dx * 0.0028
    velRef.current.x = -dy * 0.0028
  }

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    try {
      if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    } catch (_) {}
  }

  return (
    <section id='skills' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-20 sm:py-28 relative isolate overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-teal-400/5 blur-3xl rounded-full -z-10' />

      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-12 sm:mb-16'>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4'
        >
          <span className='w-2 h-2 rounded-full bg-cyan-400 animate-ping' />
          Interactive 3D Tech Orbit
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='section-heading'
        >
          Technologies &amp; Tools
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='section-description max-w-2xl mx-auto mt-4'
        >
          An interactive visualization of my core stack. Drag the 3D sphere to rotate, hover on any technology to explore technical details, or switch to grid view.
        </motion.p>

        {/* View Mode & Filter Controls */}
        <div className='flex flex-wrap items-center justify-center gap-3 mt-8'>
          {/* Category Tabs */}
          <div className='inline-flex p-1 rounded-full border border-sky-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm'>
            {techStackCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3D vs Grid Toggle */}
          <div className='inline-flex p-1 rounded-full border border-sky-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm'>
            <button
              onClick={() => setViewMode('sphere')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'sphere'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title='3D Sphere View'
            >
              <span>🌐</span> 3D Sphere
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              title='Grid Cards View'
            >
              <span>▦</span> Grid
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      {viewMode === 'sphere' ? (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto'>
          {/* 3D Rotating Sphere Stage */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => {
              isHoveredRef.current = true
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false
            }}
            className={`lg:col-span-8 relative h-[440px] sm:h-[500px] flex items-center justify-center select-none rounded-3xl border border-sky-200/60 dark:border-cyan-500/15 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden touch-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* Ambient Orbital Rings */}
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
              <div className='w-[380px] h-[380px] rounded-full border border-cyan-400/15 animate-[spin_40s_linear_infinite]' />
              <div className='w-[280px] h-[280px] rounded-full border border-blue-400/10 animate-[spin_25s_linear_infinite_reverse]' />
              <div className='w-[160px] h-[160px] rounded-full border border-teal-400/10' />
            </div>

            {/* Hint Badge */}
            <div className='pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/60 text-cyan-300 text-[11px] font-medium backdrop-blur-md border border-cyan-400/20'>
              <span>🖱️ Drag to rotate sphere &bull; Click to inspect</span>
            </div>

            {/* 3D Projected Icons Container */}
            <div className='relative w-full h-full flex items-center justify-center pointer-events-none'>
              {sphereNodes.map((tech, index) => {
                const isSelected = activeTech?.name === tech.name
                return (
                  <div
                    key={tech.name}
                    ref={(el) => {
                      nodeRefs.current[index] = el
                    }}
                    onClick={() => setSelectedTechName(tech.name)}
                    className='pointer-events-auto absolute flex flex-col items-center justify-center group'
                    style={{
                      willChange: 'transform, opacity',
                      transform: 'translate3d(0, 0, 0) scale(1)',
                      backfaceVisibility: 'hidden',
                      transition: 'none',
                    }}
                  >
                    {/* Icon Card */}
                    <div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-2.5 flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 ring-2 ring-cyan-400/80 shadow-[0_0_24px_rgba(6,182,212,0.6)] bg-slate-900/95 scale-125'
                          : 'border-sky-300/40 dark:border-white/10 bg-white/90 dark:bg-slate-900/85 hover:border-cyan-400 hover:scale-115 shadow-md hover:shadow-cyan-500/20'
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 25px ${tech.color}40` : undefined,
                      }}
                      onMouseEnter={() => {
                        if (!isDraggingRef.current) setSelectedTechName(tech.name)
                      }}
                    >
                      <div className='w-full h-full flex items-center justify-center'>
                        {tech.icon}
                      </div>
                    </div>

                    {/* Floating Name Label */}
                    <span
                      className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap backdrop-blur-md transition-opacity pointer-events-none ${
                        isSelected
                          ? 'bg-cyan-500 text-white opacity-100 shadow'
                          : 'bg-slate-950/70 text-gray-200 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Tech Spotlight Card */}
          <div className='lg:col-span-4'>
            <AnimatePresence mode='wait'>
              {activeTech && (
                <motion.div
                  key={activeTech.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className='p-6 sm:p-7 rounded-3xl border border-sky-200 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl relative overflow-hidden'
                >
                  {/* Accent Top Border Glow */}
                  <div
                    className='absolute top-0 left-0 right-0 h-1.5 transition-colors'
                    style={{ backgroundColor: activeTech.color }}
                  />

                  <div className='flex items-center gap-4 mb-5'>
                    <div
                      className='w-14 h-14 rounded-2xl p-3 flex items-center justify-center shadow-lg border border-white/10'
                      style={{ backgroundColor: `${activeTech.color}15` }}
                    >
                      {activeTech.icon}
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                          {activeTech.name}
                        </h3>
                        <span className='px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/15 text-cyan-600 dark:text-cyan-300'>
                          {activeTech.level}
                        </span>
                      </div>
                      <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>
                        {activeTech.category} &bull; {activeTech.experience} Experience
                      </p>
                    </div>
                  </div>

                  <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5'>
                    {activeTech.description}
                  </p>

                  <div className='flex items-center justify-between pt-4 border-t border-sky-100 dark:border-white/10 text-xs'>
                    <span className='text-gray-500 dark:text-gray-400'>Production Readiness</span>
                    <span className='font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5'>
                      <span className='w-2 h-2 rounded-full bg-emerald-500' /> Verified Skill
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Categorized Grid View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto'
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className='p-4 rounded-2xl border border-sky-200 dark:border-cyan-500/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-cyan-400 transition-all cursor-pointer flex flex-col items-center text-center group'
            >
              <div className='w-12 h-12 rounded-xl p-2.5 flex items-center justify-center bg-gray-100 dark:bg-slate-800/60 group-hover:scale-110 transition-transform mb-3'>
                {tech.icon}
              </div>
              <h4 className='font-bold text-sm text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors'>
                {tech.name}
              </h4>
              <span className='text-[11px] text-gray-500 dark:text-gray-400 mt-0.5'>
                {tech.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

export default TechStack3D
