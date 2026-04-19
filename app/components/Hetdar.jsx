import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Hetdar = () => {
  return (
    <div>
        <div>
            <Image className='rounded-full w-32' src={assets.profile_img} alt='not fount'/>
        </div>
        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 fontOvo'>Hi! I'm Yeasin Munshi <Image className='w-6' src={assets.hand_icon} alt='not fount'/></h3>
        <h1 className='text-3xl sm:text-6xl lg:text-[66px] fontOvo'>MERN-Stack Developer based in Bangladesh</h1>
    </div>
  )
}

export default Hetdar