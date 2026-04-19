import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg fontOvo capitalize'>introduction</h4>
        <h2 className='text-center text-5xl fontOvo capitalize'>about me</h2>

        <div className='w-full flex flex-col lg:flex-row items-center gap-20 mt-20'>
            <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image className='w-full rounded-3xl' src={assets.profile_img} alt='user-image'/>
            </div>
            <div className='flex-1'>
                <p className='max-w-2xl mb-10 fontOvo'>I am an ecperienced MERN-Stack Developer with a decade of professional experties in the field.Throughout my career , I have had the privilege of collaborating with prestigious organizations, colloborating to thir success ang growth</p>

                <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                    {
                        infoList.map(({icon, iconDark, title , description} , index)=>(
                            <li className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-[#cac4cc] hover:-translate-y-1 duration-500' key={index}>
                                <Image className='w-7 mt-3' src={icon} alt='not fount'/>
                                <h3 className='my-4 font-semibold text-gray-700'>{title}</h3>
                                <p className='text-gray-600 text-sm'>{description}</p>
                            </li>
                        ))
                    }
                </ul>
                <h4 className='my-6 text-gray-700 fontOvo'>Tools I use</h4>
                <ul className='flex items-center gap-3 sm:gap-5'>
                    {
                        toolsData.map((tool , index)=>(
                            <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:bg-[#cac4cc] hover:-translate-y-1 duration-500 ' key={index}>
                                <Image className='w-5 sm:w-7' src={tool} alt='not fount'/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default About