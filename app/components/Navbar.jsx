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
            if (window.scrollY > 40) {
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
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 text-gray-900 dark:text-white ${isScroll ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-lg border-b border-sky-100/50 dark:border-white/5 py-3' : 'bg-transparent'}`}>
                <Link className='flex items-center group' href='#top' aria-label='Yeasin Munshi home'>
                    <span className='text-xl sm:text-2xl font-bold tracking-tight'>
                        yeasin<span className='text-cyan-500 group-hover:text-cyan-400 transition-colors'>.</span>dev
                    </span>
                </Link>

                <ul className='hidden lg:flex items-center gap-6 xl:gap-8 rounded-full px-8 xl:px-10 py-2.5 shadow-sm backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border border-sky-200/60 dark:border-white/10 text-sm font-medium'>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#top'>Home</Link>
                    </li>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#about'>About</Link>
                    </li>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#skills'>Tech Orbit</Link>
                    </li>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#services'>Services</Link>
                    </li>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#work'>Projects</Link>
                    </li>
                    <li>
                        <Link className='hover:text-cyan-500 transition-colors' href='#contact'>Contact</Link>
                    </li>
                </ul>

                <div className='flex items-center gap-3'>
                    {/* Theme Toggle */}
                    <button
                        className='rounded-full p-2.5 cursor-pointer transition-colors hover:bg-cyan-400/10 border border-transparent hover:border-cyan-400/20'
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

                    {/* Contact CTA */}
                    <Link
                        className='hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 border border-sky-300 dark:border-cyan-500/30 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-500/20'
                        href='#contact'
                    >
                        <span>Let's Talk</span>
                        <svg viewBox='0 0 24 24' className='w-3.5 h-3.5' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
                            <path d='M5 12h14M12 5l7 7-7 7'/>
                        </svg>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button
                        className='block lg:hidden ml-1 rounded-full p-2 hover:bg-cyan-400/10 transition-colors'
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

                {/* Mobile Menu Backdrop */}
                {isMenuOpen && (
                    <button
                        aria-label='Close navigation menu'
                        onClick={closeMenu}
                        className='fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden'
                    />
                )}

                {/* Mobile Slide-in Drawer */}
                <ul
                    id='mobile-navigation'
                    className={`flex lg:hidden flex-col gap-6 px-8 py-16 fixed right-0 top-0 bottom-0 w-[min(20rem,85vw)] z-50 h-dvh shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-slate-950 text-gray-900 dark:text-white border-l border-sky-100 dark:border-white/10`}
                    aria-hidden={!isMenuOpen}
                    inert={!isMenuOpen}
                >
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#top' onClick={closeMenu}>Home</Link></li>
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#about' onClick={closeMenu}>About</Link></li>
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#skills' onClick={closeMenu}>Tech Orbit</Link></li>
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#services' onClick={closeMenu}>Services</Link></li>
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#work' onClick={closeMenu}>Projects</Link></li>
                    <li><Link className='text-lg font-medium hover:text-cyan-500' href='#contact' onClick={closeMenu}>Contact</Link></li>
                    <li className='mt-4 border-t border-current/10 pt-6'>
                        <button
                            onClick={() => { toggleTheme(); closeMenu(); }}
                            className='text-sm text-cyan-600 dark:text-cyan-400 font-semibold'
                        >
                            {isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;