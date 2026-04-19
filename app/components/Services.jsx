import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Services = () => {
  return (
    <div id='services' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg fontOvo capitalize'>What i offer</h4>
        <h2 className='text-center text-5xl fontOvo capitalize'>my services</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>I am a MERN-Stack Developer from Dhaka , Bangladesh with 2+ years expreience in multiple companies lick Bzm , g8 Agency</p>

        <div className='grid grid-cols-4 gap-6 my-10'>
            {
                serviceData.map(({icon, link, title , description} , index)=> (
                    <div className='border border-gray-400 rounded-lg px-8 py-12 cursor-pointer hover:shadow-black hover:-translate-y-1 duration-500' key={index}>
                        <Image className='w-10' src={icon} alt='not fount'/>
                        <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
                        <p className='text-sm text-gray-600 leading-5'>{description}</p>
                        <Link className='flex items-center gap-2 text-sm mt-5' href={link}>
                            Read More <Image className='w-4' src={assets.right_arrow} alt='not fount'/>
                        </Link>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Services