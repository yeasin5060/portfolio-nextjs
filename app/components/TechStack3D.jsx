'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { techStack, techStackCategories } from '../data/techStackData'

/**
 * TechStack3D - Awwwards-inspired 3D Interactive Sphere & Orbital Tech Showcase
 * Uses pure 3D mathematics and perspective projection on requestAnimationFrame.
 * Features:
 * - Fibonacci sphere distribution for uniform 3D spacing
 * - Interactive momentum drag & automatic orbital rotation
 * - Category filtering (Frontend, Backend, Database, Tools)
 * - Deep interactive inspection cards with official SVG icons
 * - High-DPI canvas & responsive touch handling
 */
const TechStack3D = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeTech, setActiveTech] = useState(techStack[0])
  const [isDragging, setIsDragging] = useState(false)
  const [viewMode, setViewMode] = useState('sphere') // 'sphere' | 'grid'

  const containerRef = useRef(null)
  const sphereRef = useRef({
    rotX: 0.15,
    rotY: 0.2,
    velX: 0.003,
    velY: 0.004,
    lastMouseX: 0,
    lastMouseY: 0,
    isInteracting: false,
    radius: 200,
    animId: null
  })

  // Filtered tech items
  const filteredTech = useMemo(() => {
    if (selectedCategory === 'All') return techStack
    return techStack.filter(item => item.category === selectedCategory)
  }, [selectedCategory])

  // Distribute items uniformly on a sphere using the Fibonacci lattice
  const sphereNodes = useMemo(() => {
    const total = filteredTech.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    return filteredTech.map((tech, i) => {
      // theta: azimuthal angle, phi: polar angle
      const theta = 2 * Math.PI * i / goldenRatio
      const phi = Math.acos(1 - 2 * (i + 0.5) / total)

      return {
        ...tech,
        // Normalized base coordinates on unit sphere
        bx: Math.sin(phi) * Math.cos(theta),
        by: Math.cos(phi),
        bz: Math.sin(phi) * Math.sin(theta),
        // Projected 3D coordinates
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        alpha: 1
      }
    })
  }, [filteredTech])

  const [projectedNodes, setProjectedNodes] = useState(sphereNodes)

  // 3D Rotation & Projection loop
  useEffect(() => {
    const s = sphereRef.current
    let mounted = true

    const updateProjection = () => {
      if (!mounted) return

      // Apply automatic slow rotation when not dragging
      if (!s.isInteracting) {
        s.rotY += s.velY
        s.rotX += s.velX
      }

      const cosX = Math.cos(s.rotX)
      const sinX = Math.sin(s.rotX)
      const cosY = Math.cos(s.rotY)
      const sinY = Math.sin(s.rotY)

      const focalLength = 360
      const radius = s.radius

      const updated = sphereNodes.map(node => {
        // Rotate around Y-axis
        const x1 = node.bx * cosY + node.bz * sinY
        const z1 = -node.bx * sinY + node.bz * cosY

        // Rotate around X-axis
        const y2 = node.by * cosX - z1 * sinX
        const z2 = node.by * sinX + z1 * cosX
        const x2 = x1

        // Scale by radius
        const worldX = x2 * radius
        const worldY = y2 * radius
        const worldZ = z2 * radius

        // Perspective projection
        const depth = focalLength / (focalLength + worldZ)
        const scale = Math.max(0.45, Math.min(1.4, depth))
        const alpha = Math.max(0.2, (worldZ + radius) / (2 * radius) * 0.8 + 0.2)

        return {
          ...node,
          x: worldX * depth,
          y: worldY * depth,
          z: worldZ,
          scale,
          alpha
        }
      })

      // Sort by depth (Z) so closer nodes render in front
      updated.sort((a, b) => a.z - b.z)
      setProjectedNodes(updated)

      s.animId = requestAnimationFrame(updateProjection)
    }

    s.animId = requestAnimationFrame(updateProjection)

    return () => {
      mounted = false
      if (s.animId) cancelAnimationFrame(s.animId)
    }
  }, [sphereNodes])

  // Mouse / Touch rotation control
  const handlePointerDown = (e) => {
    const s = sphereRef.current
    s.isInteracting = true
    setIsDragging(true)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    s.lastMouseX = clientX
    s.lastMouseY = clientY
  }

  const handlePointerMove = useCallback((e) => {
    const s = sphereRef.current
    if (!s.isInteracting) return

    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    const dx = clientX - s.lastMouseX
    const dy = clientY - s.lastMouseY

    s.rotY += dx * 0.007
    s.rotX -= dy * 0.007

    s.velY = dx * 0.001
    s.velX = -dy * 0.001

    s.lastMouseX = clientX
    s.lastMouseY = clientY
  }, [])

  const handlePointerUp = useCallback(() => {
    const s = sphereRef.current
    s.isInteracting = false
    setIsDragging(false)
    // Dampen velocity to smooth idle rotation
    s.velY = Math.sign(s.velY) * Math.min(Math.abs(s.velY), 0.006)
    s.velX = Math.sign(s.velX) * Math.min(Math.abs(s.velX), 0.004)
    if (Math.abs(s.velY) < 0.001) s.velY = 0.003
  }, [])

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

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
            className={`lg:col-span-8 relative h-[440px] sm:h-[500px] flex items-center justify-center select-none rounded-3xl border border-sky-200/60 dark:border-cyan-500/15 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden ${
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

            {/* 3D Projected Icons */}
            <div className='relative w-full h-full flex items-center justify-center pointer-events-none'>
              {projectedNodes.map((tech) => {
                const isSelected = activeTech?.name === tech.name
                return (
                  <div
                    key={tech.name}
                    onClick={() => setActiveTech(tech)}
                    className='pointer-events-auto absolute flex flex-col items-center justify-center group'
                    style={{
                      transform: `translate3d(${tech.x}px, ${tech.y}px, 0px) scale(${tech.scale})`,
                      zIndex: Math.round(tech.z + 300),
                      opacity: tech.alpha,
                      transition: isDragging ? 'none' : 'transform 0.05s linear',
                    }}
                  >
                    {/* Icon Card */}
                    <div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-2.5 flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 ring-2 ring-cyan-400/80 shadow-[0_0_24px_rgba(6,182,212,0.6)] bg-slate-900/90 scale-125'
                          : 'border-sky-300/40 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 hover:border-cyan-400 hover:scale-115 shadow-lg'
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 25px ${tech.color}40` : undefined,
                      }}
                      onMouseEnter={() => {
                        if (!isDragging) setActiveTech(tech)
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
