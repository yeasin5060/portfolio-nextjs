'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from 'motion/react'

/**
 * About Section - Premium Recruiter-Focused Story & Verified Stats
 */
const About = () => {
  const verifiedStats = [
    { label: 'Hands-on Experience', value: '2+', suffix: 'Years', desc: 'Building full-stack MERN & Next.js web applications' },
    { label: 'Completed Projects', value: '11+', suffix: 'Apps', desc: 'From real-time chats to eCommerce & enterprise ERPs' },
    { label: 'Tech Stack & Tools', value: '20+', suffix: 'Tools', desc: 'Proficient in modern frontend, backend & dev tools' },
    { label: 'Code Quality', value: '100%', suffix: '', desc: 'Commitment to clean architecture & accessibility' },
  ]

  const pillars = [
    {
      title: 'Problem-Solving Mindset',
      desc: 'Approaching challenges methodically—breaking complex requirements into modular, scalable, and testable components.',
      icon: '🧠',
    },
    {
      title: 'Architecting for Scale',
      desc: 'Designing backend APIs, database schemas, and state architectures that remain maintainable and fast as user loads grow.',
      icon: '⚡',
    },
    {
      title: 'Obsession with User Experience',
      desc: 'Crafting fluid micro-interactions, responsive layouts, and accessible interfaces that delight users on every device.',
      icon: '✨',
    },
  ]

  const education = [
    {
      degree: 'Bachelor of Business Administration (BBA)',
      institution: 'Habibullah Bahar College',
      location: 'Dhaka, Bangladesh',
      duration: '04/2023 – Present',
      highlight: 'Combining business acumen with modern software engineering principles.',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Kabirajpur Saifuddin Degree College',
      location: 'Dhaka, Bangladesh',
      duration: '05/2022 – 07/2023',
      highlight: 'Strong academic foundation with passion for technology and computer science.',
    },
  ]

  return (
    <section id='about' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-20 sm:py-28 relative isolate overflow-hidden'>
      {/* Background radial accent */}
      <div className='pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-3xl rounded-full -z-10' />

      {/* Section Header */}
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4'
        >
          <span>👤</span>
          <span>Engineering Journey</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='section-heading'
        >
          About Yeasin Munshi
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='section-description max-w-2xl mx-auto mt-4'
        >
          A dedicated MERN Stack &amp; Full Stack Developer based in Dhaka, Bangladesh, driven by curiosity, engineering discipline, and a deep love for web craftsmanship.
        </motion.p>
      </div>

      {/* Verified Stats Counter Grid */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 max-w-6xl mx-auto'>
        {verifiedStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className='p-6 rounded-3xl border border-sky-200/80 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg relative overflow-hidden group'
          >
            <div className='absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-all' />
            <div className='text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-300 mb-1'>
              {stat.value}
            </div>
            <div className='text-sm font-semibold text-gray-900 dark:text-white mb-1.5'>
              {stat.label}
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400 leading-relaxed'>
              {stat.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Split Narrative & Engineering Pillars */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto mb-20'>
        {/* Profile Card & Bio Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='lg:col-span-6 flex flex-col gap-6'
        >
          <div className='relative rounded-3xl p-6 sm:p-8 border border-sky-200/80 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-cyan-400/80 shadow-md'>
                <Image
                  src={assets.profile_img}
                  alt='Yeasin Munshi'
                  fill
                  sizes='64px'
                  className='object-cover'
                />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>Yeasin Munshi</h3>
                <p className='text-xs text-cyan-600 dark:text-cyan-400 font-medium'>
                  MERN Stack &bull; Next.js Specialist
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className='space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed'>
              <p>
                My journey began with a relentless drive to understand how modern internet applications work under the hood. Over the last <strong>2+ years</strong>, I have immersed myself in full-stack JavaScript/TypeScript engineering.
              </p>
              <p>
                I thrive in the space where creative design intersects with robust backend logic—building complete web products including high-volume eCommerce systems, real-time chat platforms with WebSockets, and database-driven portals with seamless authentication.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Engineering Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='lg:col-span-6 flex flex-col gap-4'
        >
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
            <span>🚀</span> Core Engineering Philosophy
          </h3>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ x: 6 }}
              className='p-5 rounded-2xl border border-sky-200/60 dark:border-white/10 bg-white/60 dark:bg-slate-900/50 backdrop-blur-md shadow-sm hover:border-cyan-400/60 transition-all flex items-start gap-4'
            >
              <div className='text-2xl p-2.5 rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 flex-shrink-0'>
                {pillar.icon}
              </div>
              <div>
                <h4 className='font-bold text-base text-gray-900 dark:text-white mb-1'>
                  {pillar.title}
                </h4>
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed'>
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Verified Education Timeline */}
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h3 className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2'>
            <span>🎓</span> Education &amp; Academic Background
          </h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className='p-6 rounded-3xl border border-sky-200/80 dark:border-cyan-500/15 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-md relative'
            >
              <span className='inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-400/15 text-cyan-600 dark:text-cyan-300 mb-3'>
                {edu.duration}
              </span>
              <h4 className='text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1'>
                {edu.degree}
              </h4>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                {edu.institution}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mb-3'>
                {edu.location}
              </p>
              <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-sky-100 dark:border-white/10 pt-3'>
                {edu.highlight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About