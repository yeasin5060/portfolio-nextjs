'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import ElasticAvatar from './ElasticAvatar'

/**
 * Header (Hero Section) - Premium Awwwards-inspired Developer Hero
 * Features:
 * - Animated role badge & availability indicator
 * - Magnetic animated CTA buttons
 * - Direct GitHub & LinkedIn cards
 * - Floating technology pills with authentic SVG icons
 * - Interactive Elastic Avatar from previous enhancement
 */
const Header = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('yeasin.dev01@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <section id='top' className='relative isolate w-full max-w-7xl mx-auto min-h-[94svh] px-5 sm:px-8 lg:px-12 pt-32 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 overflow-hidden'>
      {/* Dynamic Animated Ambient Background Glows */}
      <motion.div
        aria-hidden='true'
        animate={{ y: [0, -20, 0], x: [0, 16, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className='pointer-events-none absolute top-[15%] left-[2%] -z-10 h-80 w-80 rounded-full bg-cyan-500/15 dark:bg-cyan-500/20 blur-[100px]'
      />
      <motion.div
        aria-hidden='true'
        animate={{ y: [0, 24, 0], x: [0, -18, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className='pointer-events-none absolute bottom-[10%] right-[5%] -z-10 h-96 w-96 rounded-full bg-blue-600/15 dark:bg-blue-500/20 blur-[120px]'
      />
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]' />

      {/* Left Column: Bio & Calls to Action */}
      <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-5 z-10 max-w-2xl'>
        {/* Availability Status Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 dark:bg-emerald-500/10 backdrop-blur-md shadow-sm'
        >
          <span className='relative flex h-2.5 w-2.5'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'></span>
          </span>
          <span className='text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide uppercase'>
            Available for New Projects
          </span>
        </motion.div>

        {/* Name & Role Reveal */}
        <div>
          <motion.p
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className='text-base sm:text-lg font-medium text-cyan-600 dark:text-cyan-400 tracking-wide mb-1'
          >
            Hello World, I'm
          </motion.p>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className='text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 dark:text-white leading-[1.08]'
          >
            Yeasin Munshi
          </motion.h1>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className='text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2 tracking-tight'
          >
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300'>
              MERN Stack &amp; Full Stack Developer
            </span>
          </motion.h2>
        </div>

        {/* Short Recruiter-Focused Pitch */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className='text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-normal'
        >
          Specializing in architecting scalable, high-performance web applications with{' '}
          <strong className='text-gray-900 dark:text-white font-medium'>React.js, Next.js, Node.js, Express, and MongoDB</strong>.
          Passionate about clean architecture, snappy micro-interactions, and resilient systems.
        </motion.p>

        {/* Action Buttons & Quick Copy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className='flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2 w-full sm:w-auto'
        >
          {/* View Projects CTA */}
          <Link
            href='#work'
            className='px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-full flex items-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all text-sm sm:text-base'
          >
            <span>Explore Projects</span>
            <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
              <path d='M5 12h14M12 5l7 7-7 7'/>
            </svg>
          </Link>

          {/* Download Resume Button */}
          <a
            href='/yeasin munshi mern stack Developer resume new.pdf'
            download
            className='px-7 py-3.5 border border-sky-300 dark:border-white/15 hover:border-cyan-400 bg-white/70 dark:bg-slate-900/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-gray-900 dark:text-white font-medium rounded-full flex items-center gap-2.5 backdrop-blur-md shadow-sm transition-all text-sm sm:text-base hover:-translate-y-0.5'
          >
            <Image className='w-4 h-4' src={assets.download_icon} alt='' />
            <span>Download Resume</span>
          </a>

          {/* Quick Copy Email */}
          <button
            onClick={copyEmail}
            className='px-4 py-3.5 rounded-full border border-sky-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2 transition-all'
            title='Copy email address'
          >
            <span>{copiedEmail ? '✓ Copied!' : '📋 Copy Email'}</span>
          </button>
        </motion.div>

        {/* Social Links & Verified Profiles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className='flex items-center justify-center lg:justify-start gap-4 pt-2 text-sm text-gray-500 dark:text-gray-400'
        >
          <span className='font-medium text-xs tracking-wider uppercase'>Connect:</span>

          <Link
            href='https://github.com/yeasin5060'
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400/60 bg-white/60 dark:bg-slate-900/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm'
          >
            <svg viewBox='0 0 24 24' className='w-4 h-4 fill-current'>
              <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/>
            </svg>
            <span>GitHub</span>
          </Link>

          <Link
            href='https://www.linkedin.com/in/yeasin-munshi-aa7467288/'
            target='_blank'
            rel='noreferrer'
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400/60 bg-white/60 dark:bg-slate-900/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm'
          >
            <svg viewBox='0 0 24 24' className='w-4 h-4 fill-current'>
              <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/>
            </svg>
            <span>LinkedIn</span>
          </Link>
        </motion.div>
      </div>

      {/* Right Column: Interactive Elastic Avatar + Floating Tech Badges */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
        className='relative flex-shrink-0 flex items-center justify-center order-first lg:order-last'
      >
        {/* Floating tech badge 1: React */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute -top-3 -left-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-cyan-400/40 shadow-lg text-xs font-semibold text-gray-800 dark:text-cyan-300'
        >
          <span className='w-2 h-2 rounded-full bg-cyan-400 animate-ping' />
          <span>React 19 &bull; Next.js</span>
        </motion.div>

        {/* Floating tech badge 2: Node & Mongo */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className='absolute -bottom-2 -right-4 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-emerald-400/40 shadow-lg text-xs font-semibold text-gray-800 dark:text-emerald-300'
        >
          <span className='w-2 h-2 rounded-full bg-emerald-400' />
          <span>Node.js &bull; MongoDB</span>
        </motion.div>

        {/* The Interactive Elastic Avatar Canvas */}
        <ElasticAvatar
          imageSrc={assets.profile_img}
          size={370}
          circleSize={265}
        />
      </motion.div>
    </section>
  )
}

export default Header