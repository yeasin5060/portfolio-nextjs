'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'

/**
 * Contact - Premium Recruiter & Client Communication Hub
 * Features:
 * - Direct Web3Forms submission with status handling
 * - Quick-copy email button with visual confirmation
 * - Direct GitHub & LinkedIn profiles
 * - Animated success & error states
 */
const Contact = () => {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('yeasin.dev01@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatus({ state: 'loading', message: 'Sending message...' })

    const form = event.target
    const formData = new FormData(form)
    formData.append('access_key', '35ab33c0-b024-4152-a46f-be46e8266f96')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your message has been sent successfully. I will get back to you within 24 hours.',
        })
        form.reset()
      } else {
        setStatus({
          state: 'error',
          message: data.message || 'Something went wrong. Please try again or reach out directly via email.',
        })
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'Network error. Please check your connection or email me at yeasin.dev01@gmail.com.',
      })
    }
  }

  return (
    <section id='contact' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-20 sm:py-28 relative isolate overflow-hidden'>
      {/* Background Glows */}
      <div className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-teal-400/5 blur-3xl rounded-full -z-10' />

      {/* Header */}
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-300/40 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md text-cyan-600 dark:text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4'
        >
          <span>📬</span>
          <span>Get in Touch</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='section-heading'
        >
          Let&apos;s Build Something Exceptional
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='section-description max-w-2xl mx-auto mt-4'
        >
          Whether you&apos;re looking for a full-stack engineer for your team, have an exciting freelance project, or just want to chat tech—my inbox is always open.
        </motion.p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start'>
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='lg:col-span-5 flex flex-col gap-5'
        >
          {/* Email Direct Card */}
          <div className='p-6 rounded-3xl border border-sky-200/80 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg relative overflow-hidden'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300'>
                Direct Email
              </span>
              <button
                onClick={copyEmail}
                className='text-xs px-2.5 py-1 rounded-full border border-sky-200 dark:border-white/10 bg-sky-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition-colors'
              >
                {copiedEmail ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <a
              href='mailto:yeasin.dev01@gmail.com'
              className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors block break-all'
            >
              yeasin.dev01@gmail.com
            </a>
            <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>
              Typically responds within 24 hours.
            </p>
          </div>

          {/* Social Profiles Card */}
          <div className='p-6 rounded-3xl border border-sky-200/80 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg'>
            <h3 className='text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300 mb-4'>
              Professional Profiles
            </h3>
            <div className='flex flex-col gap-3'>
              <Link
                href='https://github.com/yeasin5060'
                target='_blank'
                rel='noreferrer'
                className='flex items-center justify-between p-3.5 rounded-2xl border border-sky-200/60 dark:border-white/10 bg-sky-50/50 dark:bg-slate-800/40 hover:border-cyan-400 dark:hover:border-cyan-400/50 transition-all group'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center'>
                    <svg viewBox='0 0 24 24' className='w-5 h-5 fill-current'>
                      <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z'/>
                    </svg>
                  </div>
                  <div>
                    <div className='text-sm font-bold text-gray-900 dark:text-white'>GitHub</div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>@yeasin5060</div>
                  </div>
                </div>
                <span className='text-xs text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform'>
                  &rarr;
                </span>
              </Link>

              <Link
                href='https://www.linkedin.com/in/yeasin-munshi-aa7467288/'
                target='_blank'
                rel='noreferrer'
                className='flex items-center justify-between p-3.5 rounded-2xl border border-sky-200/60 dark:border-white/10 bg-sky-50/50 dark:bg-slate-800/40 hover:border-cyan-400 dark:hover:border-cyan-400/50 transition-all group'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center'>
                    <svg viewBox='0 0 24 24' className='w-5 h-5 fill-current'>
                      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'/>
                    </svg>
                  </div>
                  <div>
                    <div className='text-sm font-bold text-gray-900 dark:text-white'>LinkedIn</div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>Yeasin Munshi</div>
                  </div>
                </div>
                <span className='text-xs text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform'>
                  &rarr;
                </span>
              </Link>
            </div>
          </div>

          {/* Location Badge */}
          <div className='p-5 rounded-3xl border border-sky-200/80 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md flex items-center gap-3'>
            <span className='text-2xl'>📍</span>
            <div>
              <div className='text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold'>
                Location &amp; Timezone
              </div>
              <div className='text-sm font-bold text-gray-900 dark:text-white'>
                Dhaka, Bangladesh &bull; GMT+6
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='lg:col-span-7'
        >
          <form
            onSubmit={onSubmit}
            className='p-7 sm:p-9 rounded-3xl border border-sky-200/80 dark:border-cyan-500/20 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl space-y-5'
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                  Your Name
                </label>
                <input
                  type='text'
                  name='name'
                  required
                  placeholder='John Doe'
                  className='w-full px-4 py-3.5 rounded-2xl border border-sky-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                  Your Email
                </label>
                <input
                  type='email'
                  name='email'
                  required
                  placeholder='john@example.com'
                  className='w-full px-4 py-3.5 rounded-2xl border border-sky-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                Subject
              </label>
              <input
                type='text'
                name='subject'
                required
                placeholder='Project Inquiry / Opportunity'
                className='w-full px-4 py-3.5 rounded-2xl border border-sky-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider'>
                Your Message
              </label>
              <textarea
                name='message'
                required
                rows='5'
                placeholder='Tell me about your project, timeline, or requirements...'
                className='w-full px-4 py-3.5 rounded-2xl border border-sky-200 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all resize-y'
              ></textarea>
            </div>

            <button
              type='submit'
              disabled={status.state === 'loading'}
              className='w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait'
            >
              {status.state === 'loading' ? (
                <>
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg viewBox='0 0 24 24' className='w-4 h-4' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round'>
                    <path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z'/>
                  </svg>
                </>
              )}
            </button>

            {/* Status Feedback Message */}
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-medium ${
                    status.state === 'success'
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                      : status.state === 'error'
                      ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                      : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact