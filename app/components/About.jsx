import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const About = () => {
  return (
    <motion.div
        initial = {{opacity : 0}}
        whileInView={{opacity : 1}}
        transition={{duration : 1}}
        id='about' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-12 sm:py-16 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.3}}
            className='section-kicker text-center mb-3'>A little about me</motion.h4>
        <motion.h2
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.5}}
            className='section-heading text-center'>About me</motion.h2>
        <div className='flex justify-center'>
            <p className='section-description text-center max-w-2xl mb-8 mt-6 mx-auto'>
             I'm a MERN Stack Developer with 2+ years of experience building responsive, full-stack applications. I enjoy turning complex requirements into clear, reliable products.
            </p>
        </div>

        <motion.div 
            initial = {{ opacity : 0}}
            whileInView={{ opacity : 1}}
            transition={{duration : 0.8}}
            className='w-full flex flex-col xl:flex-row items-center gap-10 xl:gap-16 mt-12 sm:mt-16'>
            <motion.div
                initial = {{ opacity : 0 , scale : 0.9}}
                whileInView={{ opacity : 1 , scale : 1}}
                transition={{duration : 0.6}}
                className='w-64 sm:w-80 rounded-3xl max-w-none p-2 border border-sky-200 dark:border-sky-300/20 bg-white/60 dark:bg-white/[0.03] shadow-xl shadow-sky-900/5'>
                <Image className='w-full rounded-2xl' src={assets.profile_img} alt='Portrait of Yeasin Munshi'/>
            </motion.div>
            <motion.div
                initial = {{ opacity : 0}}
                whileInView={{ opacity : 1}}
                transition={{duration : 0.8 , delay : 0.6}}
                className='flex-1'>
                <motion.ul 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto'
                >
                {
                    infoList.map(({ icon, title, description, backend }, index) => (
                        <motion.li
                            whileHover={{ y: -4 }}
                            key={index}
                            className='w-full border border-sky-200 dark:border-sky-300/20 bg-white/70 dark:bg-white/[0.04] rounded-xl p-5 sm:p-6 cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-300/60 hover:bg-sky-50 dark:hover:bg-sky-400/10 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10'
                        >
                            <Image className='w-7 mb-3' src={icon} alt='' />

                            <h3 className='mb-2 font-semibold text-gray-800 dark:text-gray-100'>
                                {title}
                            </h3>

                            <p className='text-gray-600 dark:text-gray-300 text-sm break-words'>
                                {description}
                            </p>

                            <p className='text-gray-500 dark:text-gray-400 text-sm mt-2'>
                                {backend}
                            </p>
                        </motion.li>
                    ))
                }
                </motion.ul>
                < motion.h4
                    initial = {{y : 20 , opacity : 0}}
                    whileInView={{y : 0 , opacity : 1}}
                    transition={{duration : 1.3, delay : 0.5}}
                    className='section-kicker my-6'>Tools I use</motion.h4>
                <motion.ul
                    initial = {{ opacity : 0}}
                    whileInView={{ opacity : 1}}
                    transition={{duration : 1.6 , delay : 0.6}}
                    className='flex flex-wrap items-center gap-3 sm:gap-5'>
                    {
                        toolsData.map((tool , index)=>(
                            <motion.li
                                whileHover={{scale : 1.1}}
                                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-sky-200 dark:border-sky-300/25 bg-white/70 dark:bg-white/[0.04] rounded-lg cursor-pointer hover:bg-cyan-100 dark:hover:bg-cyan-300/10 hover:-translate-y-1 duration-300 ' key={index}>
                                <Image className='w-5 sm:w-7' src={tool} alt=''/>
                            </motion.li>
                        ))
                    }
                </motion.ul>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default About
