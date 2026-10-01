import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'motion/react'

const Footer = () => {
  return (
    <motion.footer initial={{opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.6}} className='mt-12 sm:mt-20 border-t border-sky-200 dark:border-sky-200/15 bg-gradient-to-b from-transparent to-sky-100/60 dark:to-sky-950/20 pt-10'>
        <div className='text-center'>
            <h2 className='text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 w-48 mx-auto mb-4 capitalize'>yeasin.dev</h2>
            <div className='max-w-full flex flex-wrap items-center justify-center mx-auto gap-2 px-4'>
                <Image className='w-6' src={assets.mail_icon} alt=''/>
                <a className='hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors' href='mailto:yeasin.dev01@gmail.com'>yeasin.dev01@gmail.com</a>
            </div>
        </div>
        <div className='text-center sm:flex items-baseline-last justify-between border-t border-sky-200 dark:border-sky-200/15 mx-5 sm:mx-[8%] mt-8 sm:mt-12 py-6 '>
            <p>@2026 Yeasin.dev All rights reserved</p>
            <ul className='flex items-center justify-center gap-10 mt-4 sm:mt-0'>
                <li><Link className='hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors' target='_blank' rel='noreferrer' href='https://github.com/yeasin5060'>GitHub</Link></li>
                <li><Link className='hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors' target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/yeasin-munshi-aa7467288/'>Linkedin</Link></li>
            </ul>
        </div>
    </motion.footer>
  )
}

export default Footer
