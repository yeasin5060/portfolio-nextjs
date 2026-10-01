import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Header = () => {
  return (
    <section id='top' className='relative isolate w-full max-w-6xl mx-auto text-center min-h-[90svh] px-5 sm:px-8 pt-28 pb-20 flex flex-col items-center justify-center gap-5 sm:gap-6'>
        <motion.div aria-hidden='true' animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className='pointer-events-none absolute top-[22%] left-[5%] -z-10 h-40 w-40 rounded-full bg-sky-400/20 dark:bg-sky-500/15 blur-3xl' />
        <motion.div aria-hidden='true' animate={{ y: [0, 16, 0], x: [0, -12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className='pointer-events-none absolute bottom-[18%] right-[2%] -z-10 h-48 w-48 rounded-full bg-cyan-400/20 dark:bg-cyan-500/15 blur-3xl' />
        <motion.div
          initial = {{scale : 0}}
          whileInView={{scale : 1}}
          transition={{duration : 0.8 , type : 'spring', stiffness : 100}}
        >
            <Image className='rounded-full w-28 sm:w-32 ring-2 ring-cyan-400/80 ring-offset-4 ring-offset-white dark:ring-offset-[#11001F] shadow-[0_12px_40px_#0891b233]' src={assets.profile_img} alt='Yeasin Munshi'/>
        </motion.div>
        <motion.p
          initial = {{y : -20 , opacity : 0}}
          whileInView={{y : 0 , opacity : 1}}
          transition={{duration : 0.8 , delay : 0.3}}
          className='flex items-end gap-2 text-lg sm:text-xl mb-1 fontOvo text-gray-700 dark:text-gray-200'>Hi, I'm Yeasin Munshi <Image className='w-6' src={assets.hand_icon} alt=''/></motion.p>
        <motion.h1
          initial = {{y : -30 , opacity : 0}}
          whileInView={{y : 0 , opacity : 1}}
          transition={{duration : 0.8 , delay : 0.5}}
          className='max-w-5xl text-4xl sm:text-6xl lg:text-7xl leading-[1.08] fontOvo tracking-tight'>MERN Stack Developer <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400'>building for the web</span></motion.h1>
        <motion.p
          initial = {{ opacity : 0}}
          whileInView={{opacity : 1}}
          transition={{duration : 0.6 , delay : 0.7}}
          className='max-w-2xl mx-auto fontOutfit text-base sm:text-lg leading-7 text-gray-600 dark:text-gray-300'>I'm a developer based in Dhaka, Bangladesh, with 2+ years of experience building full-stack web applications.</motion.p>

          <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
            <motion.a
              initial = {{y : 30 , opacity : 0}}
              whileInView={{y : 0 , opacity : 1}}
              transition={{duration : 0.8 , delay : 1}}
              className='px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all' href='#contact'>Let's talk <Image className='w-4' src={assets.right_arrow_white} alt=''/></motion.a>

            <motion.a
              initial = {{y : 30 , opacity : 0}}
              whileInView={{y : 0 , opacity : 1}}
              transition={{duration : 0.8 , delay : 1.2}}
              className='px-8 py-3 border border-gray-300 dark:border-white/20 rounded-full flex items-center gap-2 hover:border-cyan-500 hover:bg-sky-50 dark:hover:bg-sky-400/10 transition-colors' href='/yeasin munshi mern stack Developer resume new.pdf' download>Download CV <Image className='w-4' src={assets.download_icon} alt=''/></motion.a>
         </div>
    </section>
  )
}

export default Header
