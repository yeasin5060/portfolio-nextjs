'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * ElasticAvatar
 * Interactive spring-mesh face deformation inspired by Javi Lopez (@rameerez).
 * Users can grab any part of the face, stretch it out elastically, and watch it
 * bounce back with realistic spring physics and playful reactions.
 */
const ElasticAvatar = ({
    imageSrc = '/_next/image?url=%2Fassets%2Fprofile-img.png&w=1080&q=75',
    rawImageSrc,
    size = 380,
    circleSize = 270,
}) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)

    // Physics & WebGL state stored in refs to avoid re-renders during 60/120fps animation
    const stateRef = useRef({
        gl: null,
        program: null,
        posBuffer: null,
        texCoordBuffer: null,
        indexBuffer: null,
        texture: null,
        uResolution: null,
        imageLoaded: false,
        imgElement: null,

        // Mesh grid
        gridX: 34,
        gridY: 34,
        numVertices: 0,
        indicesCount: 0,

        // Buffers
        origPos: null, // Float32Array [x0, y0, ...]
        currPos: null, // Float32Array [x, y, ...]
        velocities: null, // Float32Array [vx, vy, ...]
        targetPos: null, // Float32Array [tx, ty, ...]
        texCoords: null, // Float32Array [u, v, ...]

        // Interaction
        isDragging: false,
        grabX: 0,
        grabY: 0,
        currX: 0,
        currY: 0,
        hoverX: 0,
        hoverY: 0,
        isHovered: false,

        // Face bounds inside canvas
        faceRect: { x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0, r: 0 },

        // Physics constants
        stiffness: 0.24,
        damping: 0.74,
        influenceRadius: 0,

        // Animation frame
        animId: null,
        isSimulating: false,
    })

    // UI state for reactive tooltips & badges
    const [dragStats, setDragStats] = useState({ isDragging: false, dist: 0, phase: 'idle' })
    const [reaction, setReaction] = useState(null)
    const [soundEnabled, setSoundEnabled] = useState(false)
    const [accentColor, setAccentColor] = useState('cyan') // 'cyan' | 'orange' | 'violet'

    // Play procedural boing sound via Web Audio API
    const playBoingSound = useCallback((intensity = 1) => {
        if (!soundEnabled) return
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext
            if (!AudioCtx) return
            const ctx = new AudioCtx()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = 'sine'
            const baseFreq = 200 + Math.min(intensity, 2) * 90
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, ctx.currentTime + 0.08)
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 0.26)

            gain.gain.setValueAtTime(0.14, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)

            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.3)
        } catch (e) {
            // Audio context policy
        }
    }, [soundEnabled])

    // Initialize WebGL and Mesh
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const s = stateRef.current

        // Canvas dimensions & high DPI
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const width = size
        const height = size
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        const gl = canvas.getContext('webgl', {
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: false,
            premultipliedAlpha: true,
        })
        if (!gl) {
            console.warn('WebGL not supported for ElasticAvatar')
            return
        }
        s.gl = gl

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        // Compile Shaders
        const vsSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            uniform vec2 u_resolution;
            varying vec2 v_texCoord;
            void main() {
                vec2 zeroToOne = a_position / u_resolution;
                vec2 zeroToTwo = zeroToOne * 2.0;
                vec2 clipSpace = zeroToTwo - 1.0;
                gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `
        const fsSource = `
            precision mediump float;
            uniform sampler2D u_image;
            varying vec2 v_texCoord;
            void main() {
                gl_FragColor = texture2D(u_image, v_texCoord);
            }
        `

        const compileShader = (type, source) => {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vs = compileShader(gl.VERTEX_SHADER, vsSource)
        const fs = compileShader(gl.FRAGMENT_SHADER, fsSource)
        if (!vs || !fs) return

        const program = gl.createProgram()
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program))
            return
        }
        s.program = program
        gl.useProgram(program)

        s.uResolution = gl.getUniformLocation(program, 'u_resolution')
        gl.uniform2f(s.uResolution, width, height)

        // Setup 2D Mesh Grid
        const gx = s.gridX
        const gy = s.gridY
        const numVerts = gx * gy
        s.numVertices = numVerts

        // Face placement within canvas
        const faceW = width * 0.76
        const faceH = faceW * (992 / 1056) // profile-img aspect ratio
        const faceX = (width - faceW) / 2
        const faceY = (height - faceH) / 2 + 10
        s.faceRect = {
            x: faceX,
            y: faceY,
            w: faceW,
            h: faceH,
            cx: faceX + faceW / 2,
            cy: faceY + faceH / 2,
            r: Math.min(faceW, faceH) * 0.52,
        }
        s.influenceRadius = faceW * 0.58

        const origPos = new Float32Array(numVerts * 2)
        const currPos = new Float32Array(numVerts * 2)
        const targetPos = new Float32Array(numVerts * 2)
        const velocities = new Float32Array(numVerts * 2)
        const texCoords = new Float32Array(numVerts * 2)

        for (let ix = 0; ix < gx; ix++) {
            const u = ix / (gx - 1)
            const vx = faceX + u * faceW
            for (let iy = 0; iy < gy; iy++) {
                const v = iy / (gy - 1)
                const vy = faceY + v * faceH
                const idx = (ix * gy + iy) * 2

                origPos[idx] = vx
                origPos[idx + 1] = vy

                currPos[idx] = vx
                currPos[idx + 1] = vy

                targetPos[idx] = vx
                targetPos[idx + 1] = vy

                velocities[idx] = 0
                velocities[idx + 1] = 0

                texCoords[idx] = u
                texCoords[idx + 1] = v
            }
        }

        s.origPos = origPos
        s.currPos = currPos
        s.targetPos = targetPos
        s.velocities = velocities
        s.texCoords = texCoords

        // Triangle Indices
        const numQuads = (gx - 1) * (gy - 1)
        const indices = new Uint16Array(numQuads * 6)
        let ptr = 0
        for (let ix = 0; ix < gx - 1; ix++) {
            for (let iy = 0; iy < gy - 1; iy++) {
                const i0 = ix * gy + iy
                const i1 = (ix + 1) * gy + iy
                const i2 = ix * gy + (iy + 1)
                const i3 = (ix + 1) * gy + (iy + 1)

                indices[ptr++] = i0
                indices[ptr++] = i1
                indices[ptr++] = i2

                indices[ptr++] = i1
                indices[ptr++] = i3
                indices[ptr++] = i2
            }
        }
        s.indicesCount = indices.length

        // WebGL Buffers
        const posBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, currPos, gl.DYNAMIC_DRAW)
        s.posBuffer = posBuffer

        const posLoc = gl.getAttribLocation(program, 'a_position')
        gl.enableVertexAttribArray(posLoc)
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

        const texBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)
        s.texCoordBuffer = texBuffer

        const texLoc = gl.getAttribLocation(program, 'a_texCoord')
        gl.enableVertexAttribArray(texLoc)
        gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0)

        const indexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
        s.indexBuffer = indexBuffer

        // Load Avatar Image Texture
        const texture = gl.createTexture()
        s.texture = texture
        const img = new Image()
        const resolvedSrc = typeof imageSrc === 'object' && imageSrc?.src ? imageSrc.src : (rawImageSrc || imageSrc)
        if (typeof resolvedSrc === 'string' && (resolvedSrc.startsWith('http://') || resolvedSrc.startsWith('https://'))) {
            img.crossOrigin = 'anonymous'
        }
        img.src = resolvedSrc
        img.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
            s.imageLoaded = true
            s.imgElement = img
            triggerRender()
        }

        // Render one frame
        const render = () => {
            if (!s.gl || !s.imageLoaded) return

            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT)

            // Update vertex buffer with current mesh positions
            gl.bindBuffer(gl.ARRAY_BUFFER, s.posBuffer)
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, s.currPos)

            // Draw triangulated mesh
            gl.drawElements(gl.TRIANGLES, s.indicesCount, gl.UNSIGNED_SHORT, 0)
        }

        // Animation Loop with Spring Physics
        const stepPhysics = () => {
            const num = s.numVertices
            const orig = s.origPos
            const curr = s.currPos
            const target = s.targetPos
            const vel = s.velocities
            const k = s.stiffness
            const damp = s.damping

            let maxMotion = 0

            // If user is actively dragging, update targets with elastic falloff
            if (s.isDragging) {
                const gx = s.grabX
                const gy = s.grabY
                const cx = s.currX
                const cy = s.currY
                const rawDx = cx - gx
                const rawDy = cy - gy
                const rawDist = Math.hypot(rawDx, rawDy)

                // Elastic resistance limit so image doesn't fold inside out
                const R = s.influenceRadius
                const maxStretch = R * 1.5
                let scale = 1
                if (rawDist > maxStretch) {
                    scale = (maxStretch + (rawDist - maxStretch) * 0.28) / rawDist
                }
                const pullDx = rawDx * scale
                const pullDy = rawDy * scale

                for (let i = 0; i < num; i++) {
                    const idx = i * 2
                    const ox = orig[idx]
                    const oy = orig[idx + 1]
                    const dist = Math.hypot(ox - gx, oy - gy)

                    if (dist < R) {
                        const t = dist / R
                        // Smooth bi-quadratic falloff
                        const w = Math.pow(1 - t * t, 2)
                        target[idx] = ox + pullDx * w
                        target[idx + 1] = oy + pullDy * w
                    } else {
                        target[idx] = ox
                        target[idx + 1] = oy
                    }
                }
            } else {
                // Return all targets to rest position
                for (let i = 0; i < num; i++) {
                    const idx = i * 2
                    target[idx] = orig[idx]
                    target[idx + 1] = orig[idx + 1]
                }
            }

            // Spring-damper integration
            for (let i = 0; i < num; i++) {
                const idx = i * 2

                const fx = (target[idx] - curr[idx]) * k
                const fy = (target[idx + 1] - curr[idx + 1]) * k

                vel[idx] = (vel[idx] + fx) * damp
                vel[idx + 1] = (vel[idx + 1] + fy) * damp

                curr[idx] += vel[idx]
                curr[idx + 1] += vel[idx + 1]

                const speed = Math.hypot(vel[idx], vel[idx + 1])
                if (speed > maxMotion) maxMotion = speed
            }

            render()

            // Keep animating while dragging or until spring oscillations settle
            if (s.isDragging || maxMotion > 0.04) {
                s.animId = requestAnimationFrame(stepPhysics)
            } else {
                s.isSimulating = false
                s.animId = null
                // Snap exactly to rest when motion falls below threshold
                if (!s.isDragging) {
                    for (let i = 0; i < num * 2; i++) {
                        curr[i] = orig[i]
                        vel[i] = 0
                    }
                    render()
                }
            }
        }

        const triggerRender = () => {
            if (!s.isSimulating) {
                s.isSimulating = true
                s.animId = requestAnimationFrame(stepPhysics)
            }
        }

        s.triggerRender = triggerRender

        // Initial render
        render()

        return () => {
            if (s.animId) cancelAnimationFrame(s.animId)
            if (gl) {
                if (s.posBuffer) gl.deleteBuffer(s.posBuffer)
                if (s.texCoordBuffer) gl.deleteBuffer(s.texCoordBuffer)
                if (s.indexBuffer) gl.deleteBuffer(s.indexBuffer)
                if (s.texture) gl.deleteTexture(s.texture)
                if (s.program) gl.deleteProgram(s.program)
            }
        }
    }, [size, rawImageSrc, imageSrc])

    // Coordinate conversion from viewport to canvas coordinates
    const getCanvasCoords = useCallback((e) => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }
        const rect = canvas.getBoundingClientRect()
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY
        const x = (clientX - rect.left) * (size / rect.width)
        const y = (clientY - rect.top) * (size / rect.height)
        return { x, y }
    }, [size])

    // Drag start
    const handleStart = useCallback((e) => {
        const s = stateRef.current
        if (!s.imageLoaded) return

        const coords = getCanvasCoords(e)
        const dFromCenter = Math.hypot(coords.x - s.faceRect.cx, coords.y - s.faceRect.cy)

        // Only start drag if within or near face boundary
        if (dFromCenter > s.faceRect.r * 1.25) return

        if (e.cancelable) e.preventDefault()

        s.isDragging = true
        s.grabX = coords.x
        s.grabY = coords.y
        s.currX = coords.x
        s.currY = coords.y

        setDragStats({ isDragging: true, dist: 0, phase: 'pulling' })

        if (s.triggerRender) s.triggerRender()
    }, [getCanvasCoords])

    // Drag move
    const handleMove = useCallback((e) => {
        const s = stateRef.current
        const coords = getCanvasCoords(e)

        s.hoverX = coords.x
        s.hoverY = coords.y

        if (!s.isDragging) return
        if (e.cancelable) e.preventDefault()

        s.currX = coords.x
        s.currY = coords.y

        const dist = Math.hypot(coords.x - s.grabX, coords.y - s.grabY)
        setDragStats({ isDragging: true, dist, phase: 'pulling' })

        if (dist > 130) {
            setReaction('😱')
        } else if (dist > 70) {
            setReaction('😜')
        } else if (dist > 25) {
            setReaction('😆')
        }

        if (s.triggerRender) s.triggerRender()
    }, [getCanvasCoords])

    // Drag end & spring snap
    const handleEnd = useCallback(() => {
        const s = stateRef.current
        if (!s.isDragging) return

        const pullDist = Math.hypot(s.currX - s.grabX, s.currY - s.grabY)
        s.isDragging = false

        if (pullDist > 30) {
            playBoingSound(pullDist / 60)
            setReaction('🌀')
            setTimeout(() => setReaction(null), 1200)
        } else {
            setReaction(null)
        }

        setDragStats({ isDragging: false, dist: 0, phase: 'releasing' })

        if (s.triggerRender) s.triggerRender()
    }, [playBoingSound])

    // Global listeners for smooth dragging outside canvas
    useEffect(() => {
        const onGlobalMove = (e) => {
            if (stateRef.current.isDragging) handleMove(e)
        }
        const onGlobalUp = () => {
            if (stateRef.current.isDragging) handleEnd()
        }

        window.addEventListener('mousemove', onGlobalMove, { passive: false })
        window.addEventListener('mouseup', onGlobalUp)
        window.addEventListener('touchmove', onGlobalMove, { passive: false })
        window.addEventListener('touchend', onGlobalUp)

        return () => {
            window.removeEventListener('mousemove', onGlobalMove)
            window.removeEventListener('mouseup', onGlobalUp)
            window.removeEventListener('touchmove', onGlobalMove)
            window.removeEventListener('touchend', onGlobalUp)
        }
    }, [handleMove, handleEnd])

    // Playful jiggle when user clicks without dragging
    const handleQuickTap = () => {
        const s = stateRef.current
        if (!s.imageLoaded || s.isDragging) return

        // Inject gentle impulse into central vertices
        const cx = s.faceRect.cx
        const cy = s.faceRect.cy
        const num = s.numVertices
        for (let i = 0; i < num; i++) {
            const idx = i * 2
            const d = Math.hypot(s.origPos[idx] - cx, s.origPos[idx + 1] - cy)
            if (d < s.influenceRadius) {
                const impulse = (1 - d / s.influenceRadius) * 14
                s.velocities[idx] += (Math.random() - 0.5) * impulse
                s.velocities[idx + 1] += (Math.random() - 0.3) * impulse
            }
        }
        playBoingSound(0.8)
        setReaction('✨')
        setTimeout(() => setReaction(null), 1000)
        if (s.triggerRender) s.triggerRender()
    }

    // Color theme configuration
    const themes = {
        cyan: {
            circleBg: 'bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600',
            glow: 'shadow-[0_0_60px_rgba(6,182,212,0.45)]',
            ring: 'ring-cyan-400/80',
            reticle: '#06b6d4',
            accent: 'text-cyan-500',
        },
        orange: {
            circleBg: 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600',
            glow: 'shadow-[0_0_60px_rgba(249,115,22,0.45)]',
            ring: 'ring-orange-400/80',
            reticle: '#f97316',
            accent: 'text-orange-500',
        },
        violet: {
            circleBg: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500',
            glow: 'shadow-[0_0_60px_rgba(168,85,247,0.45)]',
            ring: 'ring-purple-400/80',
            reticle: '#a855f7',
            accent: 'text-purple-500',
        },
    }
    const currentTheme = themes[accentColor] || themes.cyan

    return (
        <div
            ref={containerRef}
            className='relative flex flex-col items-center justify-center select-none'
            style={{ width: `${size}px`, height: `${size + 50}px` }}
        >
            {/* Interactive Backdrop Circle (Face stretches OUTSIDE this circle like in Javi's video) */}
            <div
                className={`absolute rounded-full transition-all duration-700 pointer-events-none ${currentTheme.circleBg} ${currentTheme.glow}`}
                style={{
                    width: `${circleSize}px`,
                    height: `${circleSize}px`,
                    top: `${(size - circleSize) / 2 + 10}px`,
                    left: `${(size - circleSize) / 2}px`,
                }}
            >
                {/* Subtle inner concentric pulse */}
                <div className='absolute inset-2 rounded-full border border-white/20' />
                <div className='absolute inset-6 rounded-full border border-white/10' />
            </div>

            {/* Elastic WebGL Canvas */}
            <canvas
                ref={canvasRef}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
                onClick={handleQuickTap}
                onMouseEnter={() => { stateRef.current.isHovered = true }}
                onMouseLeave={() => { stateRef.current.isHovered = false }}
                className={`relative z-10 cursor-grab active:cursor-grabbing touch-none transition-transform duration-150 ${dragStats.isDragging ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.25))',
                }}
                aria-label='Interactive elastic face avatar. Click and drag to stretch the face.'
                role='img'
            />

            {/* Visual Grab Reticle (Anchor point & stretch line indicator like in the video) */}
            {dragStats.isDragging && (
                <svg
                    className='absolute inset-0 pointer-events-none z-20'
                    style={{ width: `${size}px`, height: `${size}px` }}
                >
                    {/* Tether line connecting grab anchor to current cursor */}
                    <line
                        x1={stateRef.current.grabX}
                        y1={stateRef.current.grabY}
                        x2={stateRef.current.currX}
                        y2={stateRef.current.currY}
                        stroke={currentTheme.reticle}
                        strokeWidth='2'
                        strokeDasharray='4 3'
                        opacity='0.75'
                    />
                    {/* Anchor point circle */}
                    <circle
                        cx={stateRef.current.grabX}
                        cy={stateRef.current.grabY}
                        r='5'
                        fill='white'
                        stroke={currentTheme.reticle}
                        strokeWidth='2.5'
                    />
                    {/* Current drag reticle */}
                    <circle
                        cx={stateRef.current.currX}
                        cy={stateRef.current.currY}
                        r={Math.min(18, 10 + dragStats.dist * 0.08)}
                        fill='none'
                        stroke='white'
                        strokeWidth='2'
                    />
                    <circle
                        cx={stateRef.current.currX}
                        cy={stateRef.current.currY}
                        r='3'
                        fill='white'
                    />
                </svg>
            )}

            {/* Dynamic Emoji Reaction Bubble */}
            <AnimatePresence>
                {reaction && (
                    <motion.div
                        initial={{ scale: 0, y: 10, opacity: 0 }}
                        animate={{ scale: 1.3, y: -20, opacity: 1 }}
                        exit={{ scale: 0.5, y: -40, opacity: 0 }}
                        transition={{ duration: 0.25, type: 'spring' }}
                        className='absolute z-30 top-4 right-12 text-4xl pointer-events-none filter drop-shadow-lg'
                    >
                        {reaction}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Playful Interactive Badge & Controls */}
            <div className='relative z-20 -mt-2 flex items-center gap-2'>
                <motion.div
                    animate={dragStats.isDragging ? { scale: 1.05 } : { scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg border border-sky-300/30 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-100'
                >
                    <span className='animate-pulse text-base'>
                        {dragStats.isDragging ? '🤏' : '✨'}
                    </span>
                    <span>
                        {dragStats.isDragging
                            ? dragStats.dist > 100
                                ? "Ouch! Don't pull so hard! 😜"
                                : "Stretching... Boing! 🌀"
                            : "Pull my face! It's elastic 🤏"}
                    </span>
                </motion.div>

                {/* Sound Toggle */}
                <button
                    onClick={() => setSoundEnabled((prev) => !prev)}
                    className={`p-1.5 rounded-full backdrop-blur-md border text-xs transition-colors shadow-sm ${soundEnabled ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400' : 'border-gray-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 text-gray-500 dark:text-gray-400'}`}
                    title={soundEnabled ? 'Mute boing sounds' : 'Enable playful boing sounds'}
                    aria-label={soundEnabled ? 'Mute boing sounds' : 'Enable playful boing sounds'}
                >
                    {soundEnabled ? '🔊' : '🔇'}
                </button>

                {/* Color Theme Selector (Cyan / Orange like video / Violet) */}
                <div className='flex items-center gap-1 p-1 rounded-full backdrop-blur-md border border-gray-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 shadow-sm'>
                    <button
                        onClick={() => setAccentColor('cyan')}
                        className={`w-3.5 h-3.5 rounded-full bg-cyan-500 transition-transform ${accentColor === 'cyan' ? 'scale-125 ring-2 ring-white shadow' : 'opacity-60 hover:opacity-100'}`}
                        title='Cyan accent'
                        aria-label='Cyan backdrop'
                    />
                    <button
                        onClick={() => setAccentColor('orange')}
                        className={`w-3.5 h-3.5 rounded-full bg-orange-500 transition-transform ${accentColor === 'orange' ? 'scale-125 ring-2 ring-white shadow' : 'opacity-60 hover:opacity-100'}`}
                        title='Orange accent (like video)'
                        aria-label='Orange backdrop'
                    />
                    <button
                        onClick={() => setAccentColor('violet')}
                        className={`w-3.5 h-3.5 rounded-full bg-purple-500 transition-transform ${accentColor === 'violet' ? 'scale-125 ring-2 ring-white shadow' : 'opacity-60 hover:opacity-100'}`}
                        title='Violet accent'
                        aria-label='Violet backdrop'
                    />
                </div>
            </div>
        </div>
    )
}

export default ElasticAvatar