import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
    const sideMenuRef = useRef();
    const [isScroll , setIsScroll] = useState(false);
    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)'
    }

    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)'
    }

    useEffect (()=>{
        window.addEventListener('scroll' , ()=>{
            if(scrollY > 50){
                setIsScroll(true);
            }else{
                setIsScroll(false);
            }
        })
    },[])
  return (
   <>
   <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
    <Image className='w-full' src={assets.header_bg_color} alt='not fount'/>
   </div>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm" : ""}`}>
        <Link className='flex items-center justify' href='#top'>
            <Image alt='not fount' className='w-28 rounded-full cursor-pointer mr-14' src={assets.profile_img}/>
            <h2 className='text-[20px] sm:text-[20px] lg:text-[30px] fontOvo'>yeasin.dev</h2>
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
            <button className='cursor-pointer'>
                <Image className='w-6' src={assets.moon_icon} alt='not fount'/>
            </button>
            <Link className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 fontOvo capitalize' href='#contact'>contact <Image className='w-3' alt='not fount' src={assets.arrow_icon}/></Link>
            <button className='block md:hidden ml-3' onClick={openMenu}>
                <Image className='w-6' src={assets.menu_black} alt='not fount'/>
            </button>
        </div>

        {/* ------------- Mobile menu ----------*/}
        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 px-20 py-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500'>
            <div className='absolute right-6 top-6' onClick={closeMenu}>
                <Image className='w-6 cursor-pointer' src={assets.close_black} alt = 'not fount'/>
            </div>

            <li>
                <Link className='fontOvo capitalize' href='#top' onClick={closeMenu}>home</Link>
            </li>
            <li>
               <Link className='fontOvo' href='#about' onClick={closeMenu}>About me</Link>
            </li>
            <li>
                 <Link className='fontOvo capitalize' href='#services' onClick={closeMenu}>services</Link>
            </li>
            <li>
                <Link className='fontOvo capitalize' href='#work' onClick={closeMenu}>my work</Link>
            </li>
            <li>
                <Link className='fontOvo' href='#contact' onClick={closeMenu}>Contact me</Link>
            </li>
        </ul>
    </nav>
   </>
  )
}

export default Navbar