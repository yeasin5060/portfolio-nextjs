'use client'

import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import About from './components/About'
import TechStack3D from './components/TechStack3D'
import Services from './components/Services'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

export default function Home() {
  return (
    <>
      {/* Desktop magnetic follower cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className='relative overflow-hidden'>
        <Header />
        <About />
        <TechStack3D />
        <Services />
        <Work />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}