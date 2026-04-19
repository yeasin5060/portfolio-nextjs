import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Work = () => {
  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg fontOvo capitalize'>my portfolio</h4>
        <h2 className='text-center text-5xl fontOvo capitalize'>my letest works</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>Welcome to my web development portfolio. I specialize in building full-stack web applications using modern technologies like the MERN stack, with a strong focus on performance, scalability, and user experience. I’m passionate about turning complex problems into simple, elegant solutions.</p>

        <div className='grid grid-cols-4 my-10 gap-5'>
            {
                workData.map((project , index)=> (
                    <div className='aspect-square bg-no-repeat bg-center bg-cover rounded-lg relative cursor-pointer group' key={index} style = {{backgroundImage : `url(${project.bgImage})`}}>
                        <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                            <div>
                                <h2 className='font-semibold'>{project.title}</h2>
                                <p className='text-sm text-gray-700'>{project.description}</p>
                            </div>
                            <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                                <Image className='w-5' src={assets.send_icon} alt='not fount'/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <Link className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 my-20 mx-auto hover:bg-blue-100 duration-500' href=''>
            Show more <Image className='w-4' src={assets.right_arrow_bold} alt='not fount'/>
        </Link>
    </div>
  )
}

export default Work