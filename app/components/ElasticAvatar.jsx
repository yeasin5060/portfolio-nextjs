'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { createPlushie } from './plushie'

/**
 * Yeasin Munshi Authentic Expression Textures
 * High-resolution cutouts corresponding to the interactive plushie engine:
 * - smile: resting confident smile
 * - ouch: teeth clenched, eyes grimacing in pain (pulled / held)
 * - dizzy: winking with tongue sticking out (released & wobbling)
 * - shock: mouth wide open in "O", eyes wide (tapped / startled)
 */
const YEASIN_FACES = {
    smile: '/face/yeasin-smile.png',
    ouch: '/face/yeasin-ouch.png',
    dizzy: '/face/yeasin-dizzy.png',
    shock: '/face/yeasin-shock.png',
}

const REACTIONS = {
    hovered: ['smile'],
    held: ['ouch', 'shock'],
    pulled: ['ouch', 'shock'],
    tapped: ['shock'],
    dazed: ['dizzy', 'ouch'],
}

/**
 * ElasticAvatar - 1:1 Authentic Javi Lopez (@rameerez) Interactive Elastic Plushie Avatar
 * Driven by the exact wave-equation physics engine from the video, featuring Yeasin Munshi.
 *
 * Capabilities matching the video:
 * - Continuous wave-equation skin physics (ü = c²∇²u − ω²·u − γ·u̇ + ν∇²u̇)
 * - Organic soft-neck head sway and tilt towards mouse/touch drag
 * - Real-time expression switching: pull = ouch grimace, release = dizzy tongue-out wobble, tap = shock
 * - Fake 3D lighting relief computed from mesh normal and skin slope
 * - Circular frame clipping (bust fits circular badge, head pops out at the top)
 * - Authentic circular glass reticle tracking the pointer (exact match to video frames 00:04 & 00:06)
 * - Signature vibrant orange circular backdrop badge (#F05523)
 * - Procedural Web Audio API boing synthesizer with pitch tied to stretch distance
 * - Full desktop & touch screen mobile support
 */
const ElasticAvatar = ({
    size = 400,
}) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [isReady, setIsReady] = useState(false)
    const [reticle, setReticle] = useState({ visible: false, x: 0, y: 0 })

    // Procedural Web Audio boing synthesizer
    const playBoingSound = useCallback((intensity = 1) => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext
            if (!AudioCtx) return
            const ctx = new AudioCtx()
            if (ctx.state === 'suspended') {
                ctx.resume()
            }
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = 'sine'
            const baseFreq = 180 + Math.min(intensity, 2.5) * 85
            osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.3, ctx.currentTime + 0.07)
            osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.75, ctx.currentTime + 0.24)

            gain.gain.setValueAtTime(0.12, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26)

            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 0.28)
        } catch (_) {}
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        let plushInstance = null
        let isGrabbing = false

        const handlePointerMove = (e) => {
            if (!isGrabbing) return
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setReticle({ visible: true, x, y })
        }

        const handlePointerUp = () => {
            if (isGrabbing) {
                isGrabbing = false
                setReticle({ visible: false, x: 0, y: 0 })
            }
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true })
        window.addEventListener('pointerup', handlePointerUp, { passive: true })
        window.addEventListener('pointercancel', handlePointerUp, { passive: true })

        // Initialize the exact Plushie physics engine from the video
        createPlushie(canvas, {
            faces: YEASIN_FACES,
            reactions: REACTIONS,
            frame: { kind: 'circle', x: 0.50, y: 0.55, r: 0.44 },
            pad: 0.22,
            wobble: 2.3,
            damping: 0.14,
            flesh: 0.35,
            grabRadius: 0.09,
            maxPull: 0.60,
            sway: 1.15,
            relief: 1.1,
            neck: { x: 0.5, y: 0.8 },
        })
            .then((plush) => {
                plushInstance = plush
                setIsReady(true)

                plush.on('grab', () => {
                    isGrabbing = true
                })

                plush.on('release', ({ pulled, cancelled }) => {
                    isGrabbing = false
                    setReticle({ visible: false, x: 0, y: 0 })
                    if (!cancelled && pulled > 0.04) {
                        playBoingSound(pulled * 3.5)
                    }
                })

                plush.on('tap', () => {
                    playBoingSound(0.85)
                })
            })
            .catch((err) => {
                console.warn('Plushie initialization warning:', err)
            })

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
            if (plushInstance) {
                try {
                    plushInstance.destroy()
                } catch (_) {}
            }
        }
    }, [playBoingSound])

    // Geometry matching the WebGL circle frame for the vibrant orange backdrop
    const circleDiameter = Math.round(size * 0.61)
    const circleLeft = Math.round(size * 0.5 - circleDiameter * 0.5)
    const circleTop = Math.round(size * 0.535 - circleDiameter * 0.5)

    return (
        <div
            ref={containerRef}
            className='relative flex items-center justify-center select-none overflow-visible'
            style={{ width: `${size}px`, height: `${size}px` }}
        >
            {/* Iconic Vibrant Orange Circular Backdrop Badge (Exact match to video) */}
            <div
                className='absolute rounded-full pointer-events-none'
                style={{
                    width: `${circleDiameter}px`,
                    height: `${circleDiameter}px`,
                    left: `${circleLeft}px`,
                    top: `${circleTop}px`,
                    backgroundColor: '#F05523',
                    boxShadow: '0 20px 50px rgba(240, 85, 35, 0.40), inset 0 2px 6px rgba(255, 255, 255, 0.3)',
                }}
            />

            {/* Static high-res placeholder image while WebGL textures prepare */}
            {!isReady && (
                <Image
                    src='/face/yeasin-smile.png'
                    alt='Yeasin Munshi'
                    width={circleDiameter}
                    height={circleDiameter}
                    priority
                    className='absolute pointer-events-none z-10 rounded-full transition-opacity duration-300'
                    style={{
                        width: `${circleDiameter}px`,
                        height: `${circleDiameter}px`,
                        left: `${circleLeft}px`,
                        top: `${circleTop}px`,
                        objectFit: 'cover',
                        objectPosition: 'center top',
                    }}
                />
            )}

            {/* Authentic Elastic Plushie Canvas */}
            <canvas
                ref={canvasRef}
                className='relative z-20 touch-none cursor-grab active:cursor-grabbing transition-transform duration-100'
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.22))',
                }}
                aria-label='Interactive elastic avatar of Yeasin Munshi. Pull, stretch, or tap the face.'
                role='img'
            />

            {/* Authentic Circular Glass Reticle (Exact match to video frames 00:04 & 00:06) */}
            {reticle.visible && (
                <svg
                    className='absolute inset-0 pointer-events-none z-30 overflow-visible'
                    style={{ width: `${size}px`, height: `${size}px` }}
                >
                    {/* Outer translucent glass ring */}
                    <circle
                        cx={reticle.x}
                        cy={reticle.y}
                        r={13}
                        fill='rgba(255, 255, 255, 0.45)'
                        stroke='rgba(0, 0, 0, 0.6)'
                        strokeWidth='1.5'
                    />
                    {/* Center precision target dot */}
                    <circle
                        cx={reticle.x}
                        cy={reticle.y}
                        r={2.5}
                        fill='rgba(0, 0, 0, 0.85)'
                    />
                </svg>
            )}
        </div>
    )
}

export default ElasticAvatar