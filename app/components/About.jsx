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
        id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.3}}
            className='text-center mb-2 text-lg fontOvo capitalize'>introduction</motion.h4>
        <motion.h2
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.5}}
            className='text-center text-5xl fontOvo capitalize'>about me</motion.h2>

        <motion.div 
            initial = {{ opacity : 0}}
            whileInView={{ opacity : 1}}
            transition={{duration : 0.8}}
            className='w-full flex flex-col lg:flex-row items-center gap-20 mt-20'>
            <motion.div
                initial = {{ opacity : 0 , scale : 0.9}}
                whileInView={{ opacity : 1 , scale : 1}}
                transition={{duration : 0.6}}
                className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image className='w-full rounded-3xl' src={assets.profile_img} alt='user-image'/>
            </motion.div>
            <motion.div
                initial = {{ opacity : 0}}
                whileInView={{ opacity : 1}}
                transition={{duration : 0.8 , delay : 0.6}}
                className='flex-1'>
                <p className='max-w-2xl mb-10 fontOvo'>I am an ecperienced MERN-Stack Developer with a decade of professional experties in the field.Throughout my career , I have had the privilege of collaborating with prestigious organizations, colloborating to thir success ang growth</p>

                <motion.ul 
                initial = {{ opacity : 0}}
                whileInView={{ opacity : 1}}
                transition={{duration : 0.8 , delay : 0.1}}
                className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                    {
                        infoList.map(({icon, iconDark, title , description} , index)=>(
                            <motion.li
                                whileHover={{scale : 1.05}}
                                className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[#cac4cc] hover:-translate-y-1 duration-500' key={index}>
                                <Image className='w-7 mt-3' src={icon} alt='not fount'/>
                                <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                                <p className='text-gray-600 text-sm'>{description}</p>
                            </motion.li>
                        ))
                    }
                </motion.ul>
                < motion.h4
                    initial = {{y : 20 , opacity : 0}}
                    whileInView={{y : 0 , opacity : 1}}
                    transition={{duration : 1.3, delay : 0.5}}
                    className='my-6 text-gray-700 fontOvo'>Tools I use</motion.h4>
                <motion.ul
                    initial = {{ opacity : 0}}
                    whileInView={{ opacity : 1}}
                    transition={{duration : 1.6 , delay : 0.6}}
                    className='flex items-center gap-3 sm:gap-5'>
                    {
                        toolsData.map((tool , index)=>(
                            <motion.li
                                whileHover={{scale : 1.1}}
                                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:bg-[#cac4cc] hover:-translate-y-1 duration-500 ' key={index}>
                                <Image className='w-5 sm:w-7' src={tool} alt='not fount'/>
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