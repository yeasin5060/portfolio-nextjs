import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <h2 className='text-4xl text-center font-bold text-gray-800 w-36 mx-auto mb-4 capitalize'>yeasin.dev</h2>
            <div className='w-max flex items-center mx-auto gap-2'>
                <Image className='w-6' src={assets.mail_icon} alt='not fount'/>
                yeasin.dev01@gmail.com
            </div>
        </div>
        <div className='text-center sm:flex items-baseline-last justify-between border-t border-gray-400 mx-[10%] mt-12 py-6 '>
            <p>@2026 Yeasin.dev All rights reserved</p>
            <ul className='flex items-center justify-center gap-10 mt-4 sm:mt-0'>
                <li><Link target='_blank' href='https://github.com/yeasin5060'>GitHub</Link></li>
                <li><Link target='_blank' href='https://www.linkedin.com/in/yeasin-munshi-aa7467288/'>Linkedin</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer