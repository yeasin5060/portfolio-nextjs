import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
   <>
   <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
    <Image className='w-full' src={assets.header_bg_color} alt='not fount'/>
   </div>
    <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between'>
        <Link className='flex items-center justify' href='#top'>
            <Image alt='not fount' className='w-28 cursor-pointer mr-14' src={assets.logo}/>
            <h2>yeasin.dev</h2>
        </Link>

        <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50'>
            <li>
                <Link className='fontOvo capitalize' href='#top'>home</Link>
            </li>
            <li>
               <Link className='fontOvo' href='#about'>About me</Link>
            </li>
            <li>
                 <Link className='fontOvo capitalize' href='#services'>services</Link>
            </li>
            <li>
                <Link className='fontOvo capitalize' href='#work'>my work</Link>
            </li>
            <li>
                <Link className='fontOvo' href='#contact'>Contact me</Link>
            </li>
        </ul>
        
        <div className='flex items-center gap-4'>
            <button>
                <Image className='w-6' src={assets.moon_icon} alt='not fount'/>
            </button>
            <Link className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 fontOvo capitalize' href='#contact'>contact <Image className='w-3' alt='not fount' src={assets.arrow_icon}/></Link>
            <button className='block md:hidden ml-3'>
                <Image className='w-6' src={assets.menu_black} alt='not fount'/>
            </button>
        </div>

        {/* ------------- Mobail menu ----------*/}
    </nav>
   </>
  )
}

export default Navbar