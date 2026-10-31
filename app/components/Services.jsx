'use client'

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

/**
 * Services - Technical Capabilities & Core Offerings
 */
const Services = () => {
  const capabilities = [
    {
      title: 'Full-Stack Web Applications',
      tag: 'End-to-End',
      desc: 'Developing cohesive, production-grade applications using React, Next.js, Node.js, Express, and MongoDB with secure session/JWT authentication and database indexing.',
      icon: '⚡',
      technologies: ['React 19', 'Next.js App Router', 'Node.js', 'MongoDB Atlas'],
    },
    {
      title: 'Modern Frontend Engineering',
      tag: 'UI & Interactions',
      desc: 'Building responsive, accessible interfaces with fluid micro-interactions, spring physics, dynamic theme switching, and optimized Core Web Vitals.',
      icon: '🎨',
      technologies: ['Tailwind CSS', 'Framer Motion', 'TypeScript', 'Responsive Design'],
    },
    {
      title: 'Backend APIs & Real-Time Engines',
      tag: 'Architecture',
      desc: 'Designing clean RESTful API endpoints, WebSockets with Socket.IO for bi-directional live communication, and robust server middleware.',
      icon: '🛡️',
      technologies: ['Express.js', 'Socket.IO', 'REST Architecture', 'Mongoose ORM'],
    },
    {
      title: 'Database & State Systems',
      tag: 'Data Modeling',
      desc: 'Crafting normalized and aggregation-ready MongoDB schemas, Prisma ORM queries, global Redux Toolkit slices, and persistent client cache.',
      icon: '🗄️',
      technologies: ['MongoDB', 'PostgreSQL', 'Prisma', 'Redux Toolkit'],
    },
  ]

  return (
    <section id='services' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-20 sm:py-28 relative isolate overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='pointer-events-none absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 blur-3xl rounded-full -z-10' />

      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4'
        >
          <span>🛠️</span>
          <span>Core Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='section-heading'
        >
          What I Bring to the Table
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='section-description max-w-2xl mx-auto mt-4'
        >
          Delivering high-value software solutions from initial wireframes to production deployment, focused on reliability, performance, and maintainability.
        </motion.p>
      </div>

      {/* Service Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto'>
        {capabilities.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ y: -8 }}
            className='group p-7 sm:p-8 rounded-3xl border border-sky-200/80 dark:border-cyan-500/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-cyan-400 transition-all flex flex-col justify-between relative overflow-hidden'
          >
            {/* Top Glow bar */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity' />

            <div>
              <div className='flex items-center justify-between gap-4 mb-5'>
                <div className='w-13 h-13 rounded-2xl bg-cyan-400/10 dark:bg-cyan-400/15 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                  {service.icon}
                </div>
                <span className='px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-sky-200 dark:border-white/5'>
                  {service.tag}
                </span>
              </div>

              <h3 className='text-xl font-bold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-3'>
                {service.title}
              </h3>

              <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6'>
                {service.desc}
              </p>
            </div>

            <div>
              <div className='flex flex-wrap gap-2 pt-4 border-t border-sky-100 dark:border-white/10'>
                {service.technologies.map(t => (
                  <span
                    key={t}
                    className='px-2.5 py-1 rounded-lg text-[11px] font-medium bg-sky-50 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 border border-sky-200/50 dark:border-white/5'
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href='#contact'
                className='mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform'
              >
                <span>Discuss a project</span>
                <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
                  <path d='M5 12h14M12 5l7 7-7 7'/>
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Services