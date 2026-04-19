import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl mx-auto text-center h-screen flex flex-col items-center justify-center gap-4'>
        <div>
            <Image className='rounded-full w-32' src={assets.profile_img} alt='not fount'/>
        </div>
        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 fontOvo'>Hi! I'm Yeasin Munshi <Image className='w-6' src={assets.hand_icon} alt='not fount'/></h3>
        <h1 className='text-3xl sm:text-6xl lg:text-[66px] fontOvo'>MERN-Stack Developer based in Bangladesh</h1>
        <p className='max-w-2xl mx-auto fontOvo'>I am a MERN-Stack Developer from Dhaka , Bangladesh with 2+ years expreience in multiple companies lick Bzm , g8 Agency</p>

        <div className='flex flex-col md:flex-row items-center gap-4 mt-4'>
            <Link className='px-10 py-3 border border-white bg-black text-white rounded-full flex items-center gap-2'  href='#contact'>contact <Image className='w-4' src={assets.right_arrow_white} alt='not fount'/></Link>

            <Link className='px-10 py-3 border border-gray-500 rounded-full flex items-center gap-2' href='/yeasin munshi mern stack Developer resume new.pdf' download>Download <Image className='w-4' src={assets.download_icon} alt='not fount'/></Link>
        </div>
    </div>
  )
}

export default Header