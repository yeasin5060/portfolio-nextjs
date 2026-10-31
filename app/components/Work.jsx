'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Work (Projects Section) - Premium 3D Tilt Card Showcase with Interactive Filter
 * Features:
 * - Real verified projects from Yeasin's portfolio
 * - Category filter tabs (All, Full Stack, Next.js, Real-Time)
 * - 3D card mouse tilt & image zoom
 * - Technology stack pill badges
 * - Direct Live Demo & GitHub repository links
 */
const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  // Real projects verified from Yeasin's portfolio
  const projects = [
    {
      id: 'funiro',
      title: 'Funiro eCommerce',
      category: 'Full Stack',
      tag: 'eCommerce',
      description: 'A full-featured eCommerce platform with product catalogs, shopping cart, checkout workflow, and responsive layout.',
      bgImage: '/work-1.png',
      link: 'https://funiroecommerce.netlify.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      featured: true
    },
    {
      id: 'quick-cart',
      title: 'Quick-Cart',
      category: 'Next.js',
      tag: 'Full Stack',
      description: 'Full-stack Next.js commerce application with fast server rendering, product state, and secure checkout system.',
      bgImage: '/work-5.png',
      link: 'https://flip-earn-henna.vercel.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'Vercel'],
      featured: true
    },
    {
      id: 'chat-app',
      title: 'Chat-App Real-Time',
      category: 'Real-Time',
      tag: 'WebSockets',
      description: 'Instant messaging application with real-time bi-directional messaging, online user status, and room communication.',
      bgImage: '/work-3.png',
      link: 'https://mern-stack-chat-apps.netlify.app/login',
      github: 'https://github.com/yeasin5060',
      tech: ['React.js', 'Socket.IO', 'Node.js', 'Express', 'JWT Auth'],
      featured: true
    },
    {
      id: 'social-scheduler',
      title: 'Social Scheduler',
      category: 'Full Stack',
      tag: 'Productivity',
      description: 'Plan, organize, and schedule multi-platform social media posts from a centralized, unified management dashboard.',
      bgImage: '/work-6.png',
      link: 'https://social-scheduler-nu-amber.vercel.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'REST API'],
      featured: false
    },
    {
      id: 'job-portal',
      title: 'Job Portal Platform',
      category: 'Full Stack',
      tag: 'Career Platform',
      description: 'Job search and application engine connecting verified candidates with modern technology career opportunities.',
      bgImage: '/work-7.png',
      link: 'https://job-portal-zeta-ten-79.vercel.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST API'],
      featured: false
    },
    {
      id: 'sikhai',
      title: 'Sikhai Learning Platform',
      category: 'Next.js',
      tag: 'EdTech',
      description: 'Modern educational platform designed to bring online courses, instructors, and dedicated learners together.',
      bgImage: '/work-8.png',
      link: 'https://sikhai-black.vercel.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      featured: false
    },
    {
      id: 'flipearn',
      title: 'FlipEarn Platform',
      category: 'Full Stack',
      tag: 'MERN Stack',
      description: 'MERN stack application featuring dynamic listings, user authentication, and responsive modern interface.',
      bgImage: '/work-4.png',
      link: 'https://flip-earn-henna.vercel.app/',
      github: 'https://github.com/yeasin5060',
      tech: ['React.js', 'MongoDB', 'Express', 'Node.js'],
      featured: false
    }
  ]

  const categories = ['All', 'Full Stack', 'Next.js', 'Real-Time']

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  return (
    <section id='work' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-20 sm:py-28 relative isolate overflow-hidden'>
      {/* Background glow */}
      <div className='pointer-events-none absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-3xl rounded-full -z-10' />

      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-14'>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4'
        >
          <span>💼</span>
          <span>Selected Portfolio</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='section-heading'
        >
          Featured Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='section-description max-w-2xl mx-auto mt-4'
        >
          A curated selection of production-grade full-stack web applications, featuring real-time sockets, secure auth, robust database schemas, and modern responsive UI.
        </motion.p>

        {/* Filter Pills */}
        <div className='flex flex-wrap items-center justify-center gap-2 mt-8'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/70 dark:bg-slate-900/60 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-sky-200 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto'
      >
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className='group rounded-3xl border border-sky-200/80 dark:border-cyan-500/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-cyan-400 transition-all flex flex-col overflow-hidden'
            >
              {/* Project Image Banner */}
              <div className='relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden'>
                <Image
                  src={project.bgImage}
                  alt={project.title}
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover object-top group-hover:scale-108 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity' />

                {/* Category & Tag Badge */}
                <div className='absolute top-3.5 left-3.5 flex items-center gap-2'>
                  <span className='px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-950/80 text-cyan-300 border border-cyan-400/30 backdrop-blur-md'>
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Project Info & Description */}
              <div className='p-6 flex-1 flex flex-col justify-between'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-2'>
                    {project.title}
                  </h3>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4'>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Tags */}
                  <div className='flex flex-wrap gap-1.5 mb-5'>
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className='px-2.5 py-1 rounded-lg text-[11px] font-medium bg-sky-100/80 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-sky-200/60 dark:border-white/5'
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className='flex items-center gap-3 pt-4 border-t border-sky-100 dark:border-white/10'>
                    {project.link && (
                      <Link
                        href={project.link}
                        target='_blank'
                        rel='noreferrer'
                        className='flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all'
                      >
                        <span>Live Demo</span>
                        <svg viewBox='0 0 24 24' className='w-3.5 h-3.5' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
                          <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3'/>
                        </svg>
                      </Link>
                    )}

                    {project.github && (
                      <Link
                        href={project.github}
                        target='_blank'
                        rel='noreferrer'
                        className='p-2.5 rounded-xl border border-sky-200 dark:border-white/10 hover:border-cyan-400 bg-white/80 dark:bg-slate-800 text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm'
                        title='GitHub Repository'
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <svg viewBox='0 0 24 24' className='w-4 h-4 fill-current'>
                          <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* GitHub Callout Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='mt-16 text-center'
      >
        <Link
          href='https://github.com/yeasin5060'
          target='_blank'
          rel='noreferrer'
          className='inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-sky-300 dark:border-cyan-500/30 hover:border-cyan-400 bg-white/70 dark:bg-slate-900/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-gray-900 dark:text-cyan-300 font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5'
        >
          <span>More repositories on GitHub</span>
          <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
            <path d='M5 12h14M12 5l7 7-7 7'/>
          </svg>
        </Link>
      </motion.div>
    </section>
  )
}

export default Work