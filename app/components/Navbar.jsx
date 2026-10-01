'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [isScroll , setIsScroll] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const dark = savedTheme ? savedTheme === 'dark' : true;
        setIsDark(dark);
        document.documentElement.classList.toggle('dark', dark);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !isDark;
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    };
    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    useEffect (()=>{
        const handleScroll = () => {
            if(scrollY > 50){
                setIsScroll(true);
            }else{
                setIsScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[])
  return (
   <>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors ${isDark ? 'text-white' : 'text-gray-900'} ${isScroll ? (isDark ? 'bg-[#11001F]/80 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-lg shadow-sm') : ''}`}>
        <Link className='flex items-center' href='#top' aria-label='Yeasin Munshi home'>
            <span className='text-xl sm:text-2xl font-semibold tracking-tight'>yeasin<span className='text-cyan-500'>.</span>dev</span>
        </Link>

        <ul className={`hidden lg:flex items-center gap-5 xl:gap-8 rounded-full px-8 xl:px-12 py-3 shadow-sm backdrop-blur-md ${isDark ? 'bg-[#17253b]/90' : 'bg-white/80'}`}>
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
            <button className='rounded-full p-2 cursor-pointer transition-colors hover:bg-cyan-400/10' onClick={toggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
                {isDark ? (
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round'>
                        <circle cx='12' cy='12' r='4' /><path d='M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42' />
                    </svg>
                ) : (
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z' />
                    </svg>
                )}
            </button>
            <Link className={`hidden lg:flex items-center gap-3 px-7 py-2.5 border rounded-full ml-4 fontOvo capitalize transition-all hover:-translate-y-0.5 ${isDark ? 'border-cyan-300/50 bg-cyan-400/10 hover:bg-cyan-400/20' : 'border-blue-300 bg-blue-50 hover:bg-blue-100'}`} href='#contact'>contact <Image className='w-3' alt='contact' src={isDark ? assets.arrow_icon_dark : assets.arrow_icon}/></Link>
            <button className='block lg:hidden ml-3 rounded-full p-2 hover:bg-cyan-400/10 transition-colors' onClick={isMenuOpen ? closeMenu : openMenu} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMenuOpen} aria-controls='mobile-navigation'>
                {isMenuOpen ? (
                    <svg aria-hidden='true' viewBox='0 0 24 24' className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                        <path d='m6 6 12 12M18 6 6 18' />
                    </svg>
                ) : <Image className='w-6' src={isDark ? assets.menu_white : assets.menu_black} alt='' />}
            </button>
        </div>

        {isMenuOpen && <button aria-label='Close navigation menu' onClick={closeMenu} className='fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden' />}
        <ul id='mobile-navigation' className={`flex lg:hidden flex-col gap-6 px-8 py-16 fixed right-0 top-0 bottom-0 w-[min(20rem,85vw)] z-50 h-dvh shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-[#101c30] text-white' : 'bg-sky-50 text-gray-900'}`} aria-hidden={!isMenuOpen} inert={!isMenuOpen}>
            <li><Link className='fontOvo capitalize' href='#top' onClick={closeMenu}>Home</Link></li>
            <li><Link className='fontOvo' href='#about' onClick={closeMenu}>About me</Link></li>
            <li><Link className='fontOvo capitalize' href='#services' onClick={closeMenu}>Services</Link></li>
            <li><Link className='fontOvo capitalize' href='#work' onClick={closeMenu}>My work</Link></li>
            <li><Link className='fontOvo' href='#contact' onClick={closeMenu}>Contact me</Link></li>
            <li className='mt-3 border-t border-current/15 pt-5'><button onClick={() => { toggleTheme(); closeMenu(); }} className='text-sm text-cyan-600 dark:text-cyan-300'>{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</button></li>
        </ul>
    </nav>
   </>
  )
}

export default Navbar
