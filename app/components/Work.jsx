import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"

const Work = () => {
  return (
    <motion.div
        initial = {{opacity : 0}}
        whileInView={{opacity : 1}}
        transition={{duration : 1}}
        id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.3 , delay : 0.6}}
            className='text-center mb-2 text-lg fontOvo capitalize'>my portfolio</motion.h4>
        <motion.h2
            initial = {{y : -25 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='text-center text-5xl fontOvo capitalize'>my letest works</motion.h2>
        <motion.p
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>Welcome to my web development portfolio. I specialize in building full-stack web applications using modern technologies like the MERN stack, with a strong focus on performance, scalability, and user experience. I’m passionate about turning complex problems into simple, elegant solutions.</motion.p>

        <motion.div
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.9 , delay : 0.6}}
            className='grid grid-cols-4 my-10 gap-5'>
            {
                workData.map((project , index)=> (
                    <motion.div
                        whileHover={{scale : 1.05}}
                        transition={{duration : 0.3 }}
                        className='aspect-square bg-no-repeat bg-center bg-cover rounded-lg relative cursor-pointer group' key={index} style = {{backgroundImage : `url(${project.bgImage})`}}>
                        <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                            <div>
                                <h2 className='font-semibold'>{project.title}</h2>
                                <p className='text-sm text-gray-700'>{project.description}</p>
                            </div>
                            <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                                <Image className='w-5' src={assets.send_icon} alt='not fount'/>
                            </div>
                        </div>
                        <Link className='right-0 top-[-20px] absolute border border-gray-600 px-8 bg-gray-50 py-4 rounded-2xl flex items-center gap-2 text-sm mt-5' href={project.link}>
                            Live Link <Image className='w-4' src={assets.right_arrow} alt='not fount'/>
                        </Link>
                    </motion.div>
                ))
            }
        </motion.div>
        <motion.a
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 1.1 , delay : 0.6}}
            className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 my-20 mx-auto hover:bg-blue-100 duration-500' href=''>
            Show more <Image className='w-4' src={assets.right_arrow_bold} alt='not fount'/>
        </motion.a>
    </motion.div>
  )
}

export default Work