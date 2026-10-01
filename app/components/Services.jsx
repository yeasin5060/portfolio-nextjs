import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"

const Services = () => {
  return (
    <motion.div
        initial = {{opacity : 0}}
        whileInView={{opacity : 1}}
        transition={{duration : 1}}
        id='services' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-12 sm:py-16 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.3}}
            className='section-kicker text-center mb-3'>What I do</motion.h4>
        <motion.h2
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='section-heading text-center'>Services</motion.h2>
        <motion.p
             initial = {{ opacity : 0}}
            whileInView={{ opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='section-description text-center max-w-2xl mx-auto mt-5 mb-12'>I build thoughtful web experiences, from polished interfaces to dependable backend systems.</motion.p>

        <motion.div
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.9 , delay : 0.6}}
            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-10'>
            {
                serviceData.map(({icon, link, title , description} , index)=> (
                    <motion.div
            whileHover={{ y: -5 }}
                        className='group border border-sky-200 dark:border-sky-300/20 bg-white/70 dark:bg-white/[0.04] rounded-2xl px-6 py-8 cursor-pointer hover:border-cyan-400 dark:hover:border-cyan-300/50 duration-300 hover:shadow-xl hover:shadow-cyan-500/10' key={index}>
                        <Image className='w-10' src={icon} alt=''/>
                        <h3 className='text-lg my-4 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors'>{title}</h3>
                        <p className='text-sm text-gray-600 dark:text-gray-300 leading-5'>{description}</p>
                        <Link className='flex items-center gap-2 text-sm mt-5 text-blue-600 dark:text-cyan-300' href={link}>
                            Discuss a project <Image className='w-4' src={assets.right_arrow} alt=''/>
                        </Link>
                    </motion.div>
                ))
            }
        </motion.div>
    </motion.div>
  )
}

export default Services
