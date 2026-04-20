import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl mx-auto text-center h-screen mt-20 flex flex-col items-center justify-center gap-4'>
        <motion.div
          initial = {{scale : 0}}
          whileInView={{scale : 1}}
          transition={{duration : 0.8 , type : 'spring', stiffness : 100}}
        >
            <Image className='rounded-full w-32' src={assets.profile_img} alt='not fount'/>
        </motion.div>
        <motion.h3
          initial = {{y : -20 , opacity : 0}}
          whileInView={{y : 0 , opacity : 1}}
          transition={{duration : 0.8 , delay : 0.3}}
          className='flex items-end gap-2 text-xl md:text-2xl mb-3 fontOvo'>Hi! I'm Yeasin Munshi <Image className='w-6' src={assets.hand_icon} alt='not fount'/></motion.h3>
        <motion.h1
          initial = {{y : -30 , opacity : 0}}
          whileInView={{y : 0 , opacity : 1}}
          transition={{duration : 0.8 , delay : 0.5}}
          className='text-3xl sm:text-6xl lg:text-[66px] fontOvo'>MERN-Stack Developer based in Bangladesh</motion.h1>
        <motion.p
          initial = {{ opacity : 0}}
          whileInView={{opacity : 1}}
          transition={{duration : 0.6 , delay : 0.7}}
          className='max-w-2xl mx-auto fontOvo'>I am a MERN-Stack Developer from Dhaka , Bangladesh with 2+ years expreience in multiple companies lick Bzm , g8 Agency</motion.p>

          <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
            <motion.a
              initial = {{y : 30 , opacity : 0}}
              whileInView={{y : 0 , opacity : 1}}
              transition={{duration : 0.8 , delay : 1}}
              className='px-10 py-3 border border-white bg-black text-white rounded-full flex items-center gap-2'  href='#contact'>contact <Image className='w-4' src={assets.right_arrow_white} alt='not fount'/></motion.a>

            <motion.a
              initial = {{y : 30 , opacity : 0}}
              whileInView={{y : 0 , opacity : 1}}
              transition={{duration : 0.8 , delay : 1.2}}
              className='px-10 py-3 border border-gray-500 rounded-full flex items-center gap-2' href='/yeasin munshi mern stack Developer resume new.pdf' download>Download <Image className='w-4' src={assets.download_icon} alt='not fount'/></motion.a>
         </div>
    </div>
  )
}

export default Header