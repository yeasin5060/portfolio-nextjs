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
        id='work' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-12 sm:py-16 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.3 , delay : 0.6}}
            className='section-kicker text-center mb-3'>Selected work</motion.h4>
        <motion.h2
            initial = {{y : -25 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='section-heading text-center'>Recent projects</motion.h2>
        <motion.p
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='section-description text-center max-w-2xl mx-auto mt-5 mb-12'>A selection of full-stack projects focused on useful features, responsive design, and a smooth user experience.</motion.p>

        <motion.div
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.9 , delay : 0.6}}
            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 my-10 gap-5'>
            {
                workData.map((project , index)=> (
                    <motion.article
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        className={`aspect-square bg-no-repeat bg-center bg-cover rounded-2xl relative group overflow-hidden ring-1 ring-sky-300/30 hover:ring-cyan-400/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 ${project.bgImage ? '' : 'bg-gradient-to-br ' + project.coverGradient}`}
                        key={index}
                        style={project.bgImage ? { backgroundImage: `url(${project.bgImage})` } : undefined}>
                        {!project.bgImage && <div aria-hidden='true' className='absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/90'>
                            <span className='text-6xl font-semibold tracking-tight opacity-90'>{project.coverMark}</span>
                            <span className='text-[10px] sm:text-xs tracking-[0.18em] text-center px-3'>{project.coverLabel}</span>
                            <span className='absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15' />
                            <span className='absolute -right-5 -top-5 h-28 w-28 rounded-full border border-white/10' />
                        </div>}
                        <div className='bg-white/95 dark:bg-[#21102d]/95 dark:text-white w-10/12 rounded-xl absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg'>
                            <div>
                                <h2 className='font-semibold'>{project.title}</h2>
                                <p className='text-sm text-gray-600 dark:text-gray-300'>{project.description}</p>
                            </div>
                            <div className='border rounded-full border-sky-500/50 w-9 aspect-square flex items-center justify-center group-hover:bg-cyan-100 dark:group-hover:bg-cyan-300/20 transition'>
                                <Image className='w-5' src={assets.send_icon} alt=''/>
                            </div>
                        </div>
                        {project.link ? (
                            <Link target='_blank' rel='noreferrer' aria-label={`View ${project.title}`} className='absolute right-4 top-4 border border-sky-200/70 px-4 bg-slate-950/75 text-white py-2 rounded-full flex items-center gap-2 text-sm backdrop-blur-sm' href={project.link}>
                                View project <Image className='w-4' src={assets.right_arrow} alt=''/>
                            </Link>
                        ) : (
                            <span className='absolute right-4 top-4 border border-white/20 px-3 bg-slate-950/50 text-white py-1.5 rounded-full text-xs backdrop-blur-sm'>Case study soon</span>
                        )}
                    </motion.article>
                ))
            }
        </motion.div>
        <motion.a
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 1.1 , delay : 0.6}}
            className='w-max flex items-center justify-center gap-2 text-blue-700 dark:text-sky-200 border border-sky-300 dark:border-sky-200/30 rounded-full py-3 px-8 my-12 sm:my-16 mx-auto hover:bg-sky-100 dark:hover:bg-sky-400/10 duration-300' href='#contact'>
            Start a conversation <Image className='w-4' src={assets.right_arrow_bold} alt=''/>
        </motion.a>
    </motion.div>
  )
}

export default Work
