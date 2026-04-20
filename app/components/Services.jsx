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
        id='services' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.3}}
            className='text-center mb-2 text-lg fontOvo capitalize'>What i offer</motion.h4>
        <motion.h2
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='text-center text-5xl fontOvo capitalize'>my services</motion.h2>
        <motion.p
             initial = {{ opacity : 0}}
            whileInView={{ opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>I am a MERN-Stack Developer from Dhaka , Bangladesh with 2+ years expreience in multiple companies lick Bzm , g8 Agency</motion.p>

        <motion.div
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.9 , delay : 0.6}}
            className='grid grid-cols-4 gap-6 my-10'>
            {
                serviceData.map(({icon, link, title , description} , index)=> (
                    <motion.div
                        whileHover={{scale : 1.05}}
                        className='border border-gray-400 rounded-lg px-8 py-12 cursor-pointer hover:shadow-black hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000]' key={index}>
                        <Image className='w-10' src={icon} alt='not fount'/>
                        <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
                        <p className='text-sm text-gray-600 leading-5'>{description}</p>
                        <Link className='flex items-center gap-2 text-sm mt-5' href={link}>
                            Read More <Image className='w-4' src={assets.right_arrow} alt='not fount'/>
                        </Link>
                    </motion.div>
                ))
            }
        </motion.div>
    </motion.div>
  )
}

export default Services