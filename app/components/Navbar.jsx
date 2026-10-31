'use client'

import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const isCurrentDark = document.documentElement.classList.contains('dark');
        setIsDark(isCurrentDark);
    }, []);

    const toggleTheme = () => {
        const nextIsDark = !document.documentElement.classList.contains('dark');
        setIsDark(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);
        try {
            localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        } catch (e) {}
    };

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors text-gray-900 dark:text-white ${isScroll ? 'bg-white/80 dark:bg-[#11001F]/80 backdrop-blur-lg shadow-sm' : ''}`}>
                <Link className='flex items-center' href='#top' aria-label='Yeasin Munshi home'>
                    <span className='text-xl sm:text-2xl font-semibold tracking-tight'>yeasin<span className='text-cyan-500'>.</span>dev</span>
                </Link>

                <ul className='hidden lg:flex items-center gap-5 xl:gap-8 rounded-full px-8 xl:px-12 py-3 shadow-sm backdrop-blur-md bg-white/80 dark:bg-[#17253b]/90'>
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
                    <button
                        className='rounded-full p-2 cursor-pointer transition-colors hover:bg-cyan-400/10'
                        onClick={toggleTheme}
                        aria-label='Toggle light and dark mode'
                        title='Toggle theme'
                    >
                        {mounted ? (
                            isDark ? (
                                <svg aria-hidden='true' viewBox='0 0 24 24' className='w-5 h-5 text-yellow-300' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round'>
                                    <circle cx='12' cy='12' r='4' />
                                    <path d='M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42' />
                                </svg>
                            ) : (
                                <svg aria-hidden='true' viewBox='0 0 24 24' className='w-5 h-5 text-gray-700' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                                    <path d='M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z' />
                                </svg>
                            )
                        ) : (
                            <div className='w-5 h-5' />
                        )}
                    </button>
                    <Link
                        className='hidden lg:flex items-center gap-3 px-7 py-2.5 border rounded-full ml-4 fontOvo capitalize transition-all hover:-translate-y-0.5 border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-cyan-300/50 dark:bg-cyan-400/10 dark:hover:bg-cyan-400/20'
                        href='#contact'
                    >
                        contact
                        <Image className='w-3 dark:hidden' alt='contact' src={assets.arrow_icon} />
                        <Image className='w-3 hidden dark:block' alt='contact' src={assets.arrow_icon_dark} />
                    </Link>
                    <button
                        className='block lg:hidden ml-3 rounded-full p-2 hover:bg-cyan-400/10 transition-colors'
                        onClick={isMenuOpen ? closeMenu : openMenu}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls='mobile-navigation'
                    >
                        {isMenuOpen ? (
                            <svg aria-hidden='true' viewBox='0 0 24 24' className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                                <path d='m6 6 12 12M18 6 6 18' />
                            </svg>
                        ) : (
                            <>
                                <Image className='w-6 dark:hidden' src={assets.menu_black} alt='' />
                                <Image className='w-6 hidden dark:block' src={assets.menu_white} alt='' />
                            </>
                        )}
                    </button>
                </div>

                {isMenuOpen && (
                    <button
                        aria-label='Close navigation menu'
                        onClick={closeMenu}
                        className='fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden'
                    />
                )}
                <ul
                    id='mobile-navigation'
                    className={`flex lg:hidden flex-col gap-6 px-8 py-16 fixed right-0 top-0 bottom-0 w-[min(20rem,85vw)] z-50 h-dvh shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} bg-sky-50 text-gray-900 dark:bg-[#101c30] dark:text-white`}
                    aria-hidden={!isMenuOpen}
                    inert={!isMenuOpen}
                >
                    <li><Link className='fontOvo capitalize' href='#top' onClick={closeMenu}>Home</Link></li>
                    <li><Link className='fontOvo' href='#about' onClick={closeMenu}>About me</Link></li>
                    <li><Link className='fontOvo capitalize' href='#services' onClick={closeMenu}>Services</Link></li>
                    <li><Link className='fontOvo capitalize' href='#work' onClick={closeMenu}>My work</Link></li>
                    <li><Link className='fontOvo' href='#contact' onClick={closeMenu}>Contact me</Link></li>
                    <li className='mt-3 border-t border-current/15 pt-5'>
                        <button
                            onClick={() => { toggleTheme(); closeMenu(); }}
                            className='text-sm text-cyan-600 dark:text-cyan-300 font-medium'
                        >
                            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;