'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"
import ElasticAvatar from './ElasticAvatar'

const Header = () => {
  return (
    <section id='top' className='relative isolate w-full max-w-7xl mx-auto min-h-[92svh] px-5 sm:px-8 lg:px-12 pt-28 pb-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14'>
        {/* Ambient background glows */}
        <motion.div
          aria-hidden='true'
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className='pointer-events-none absolute top-[18%] left-[2%] -z-10 h-64 w-64 rounded-full bg-sky-400/20 dark:bg-sky-500/15 blur-3xl'
        />
        <motion.div
          aria-hidden='true'
          animate={{ y: [0, 18, 0], x: [0, -14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className='pointer-events-none absolute bottom-[14%] right-[2%] -z-10 h-72 w-72 rounded-full bg-cyan-400/20 dark:bg-cyan-500/15 blur-3xl'
        />

        {/* Text Content Column */}
        <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 z-10'>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200/80 dark:border-sky-400/20 bg-sky-50/80 dark:bg-sky-950/40 text-sm font-medium text-cyan-700 dark:text-cyan-300'
          >
            <span>Hi, I'm Yeasin Munshi</span>
            <Image className='w-5' src={assets.hand_icon} alt='Waving hand' />
          </motion.div>

          <motion.h1
            initial={{ y: -25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className='max-w-3xl text-4xl sm:text-6xl lg:text-7xl leading-[1.08] fontOvo tracking-tight text-gray-950 dark:text-white'
          >
            MERN Stack Developer{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-300'>
              building for the web
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className='max-w-xl fontOutfit text-base sm:text-lg leading-7 text-gray-600 dark:text-gray-300'
          >
            I'm a developer based in Dhaka, Bangladesh, with 2+ years of experience building full-stack web applications. Feel free to interact with my avatar or explore my projects below!
          </motion.p>

          <motion.div
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className='flex flex-col sm:flex-row items-center gap-4 mt-3 w-full sm:w-auto'
          >
            <a
              className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium rounded-full flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all'
              href='#contact'
            >
              Let's talk <Image className='w-4' src={assets.right_arrow_white} alt='' />
            </a>

            <a
              className='w-full sm:w-auto px-8 py-3 border border-gray-300 dark:border-white/20 rounded-full flex items-center justify-center gap-2 font-medium hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-sky-400/10 text-gray-800 dark:text-gray-200 transition-colors'
              href='/yeasin munshi mern stack Developer resume new.pdf'
              download
            >
              Download CV <Image className='w-4' src={assets.download_icon} alt='' />
            </a>
          </motion.div>
        </div>

        {/* Interactive Elastic Avatar Column (Like in Javi's video) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
          className='flex-shrink-0 flex items-center justify-center order-first lg:order-last'
        >
          <ElasticAvatar
            imageSrc={assets.profile_img}
            size={360}
            circleSize={260}
          />
        </motion.div>
    </section>
  )
}

export default Header
