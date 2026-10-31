'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'

/**
 * Footer - Premium modern minimalist footer
 */
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='border-t border-sky-200/80 dark:border-white/10 bg-white/40 dark:bg-slate-950/60 backdrop-blur-xl relative overflow-hidden'>
      <div className='max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-sky-100 dark:border-white/5'>
          {/* Brand */}
          <div className='text-center md:text-left'>
            <Link href='#top' className='inline-block mb-2'>
              <span className='text-2xl font-bold tracking-tight text-gray-950 dark:text-white'>
                yeasin<span className='text-cyan-500'>.</span>dev
              </span>
            </Link>
            <p className='text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-sm'>
              MERN Stack &bull; Full Stack Developer crafting scalable, high-performance web applications.
            </p>
          </div>

          {/* Quick Links */}
          <ul className='flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <li><Link href='#about' className='hover:text-cyan-500 transition-colors'>About</Link></li>
            <li><Link href='#skills' className='hover:text-cyan-500 transition-colors'>Tech Orbit</Link></li>
            <li><Link href='#services' className='hover:text-cyan-500 transition-colors'>Services</Link></li>
            <li><Link href='#work' className='hover:text-cyan-500 transition-colors'>Projects</Link></li>
            <li><Link href='#contact' className='hover:text-cyan-500 transition-colors'>Contact</Link></li>
          </ul>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className='p-3 rounded-full border border-sky-200 dark:border-white/10 hover:border-cyan-400 bg-white/80 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition-all shadow-sm'
            title='Scroll to top'
            aria-label='Back to top of page'
          >
            <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
              <path d='M12 19V5M5 12l7-7 7 7'/>
            </svg>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400'>
          <p>&copy; {new Date().getFullYear()} Yeasin Munshi. Built with Next.js, React 19 &amp; Tailwind CSS.</p>

          <div className='flex items-center gap-6'>
            <Link
              href='https://github.com/yeasin5060'
              target='_blank'
              rel='noreferrer'
              className='hover:text-cyan-500 transition-colors'
            >
              GitHub
            </Link>
            <Link
              href='https://www.linkedin.com/in/yeasin-munshi-aa7467288/'
              target='_blank'
              rel='noreferrer'
              className='hover:text-cyan-500 transition-colors'
            >
              LinkedIn
            </Link>
            <a
              href='mailto:yeasin.dev01@gmail.com'
              className='hover:text-cyan-500 transition-colors'
            >
              yeasin.dev01@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer