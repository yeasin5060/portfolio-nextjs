import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "motion/react"

const Contact = () => {

    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "35ab33c0-b024-4152-a46f-be46e8266f96");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setResult("Thanks for reaching out. I'll be in touch soon.");
                event.target.reset();
            } else {
                setResult(data.message || "Your message could not be sent. Please try again.");
            }
        } catch {
            setResult("Connection error. Please try again in a moment.");
        }
    };
  return (
    <motion.div
        initial = {{opacity : 0}}
        whileInView={{opacity : 1}}
        transition={{duration : 1}}
        id='contact' className='w-full px-5 sm:px-8 lg:px-[8%] xl:px-[12%] py-12 sm:py-16 scroll-mt-20'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.3 , delay : 0.6}}
            className='section-kicker text-center mb-3'>Contact</motion.h4>
        <motion.h2 
            initial = {{y : -25 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='section-heading text-center'>Let's work together</motion.h2>
        <motion.p
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='section-description text-center max-w-2xl mx-auto mt-5 mb-12'>Have a project in mind? Send a note and I'll get back to you as soon as I can.</motion.p>

        <motion.form
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.9 , delay : 0.5}}
            onSubmit={onSubmit} aria-busy={result === 'Sending....'} className='max-w-2xl mx-auto rounded-3xl border border-sky-200 dark:border-sky-300/20 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md p-5 sm:p-8 shadow-xl shadow-sky-500/10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 mb-8'>
                <motion.input 
                    initial = {{ x :-50 ,opacity : 0}}
                    whileInView={{ x : 0 ,opacity : 1}}
                    transition={{duration : 1.1 , delay : 0.5}}
                    className='min-w-0 flex-1 outline-none p-3 border border-sky-200 dark:border-sky-200/20 rounded-xl bg-white/80 dark:bg-[#101c30] text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20' type="text" placeholder='Enter your name' aria-label='Your name' name='name' required/>
                <motion.input 
                    initial = {{ x : 50 ,opacity : 0}}
                    whileInView={{ x : 0 ,opacity : 1}}
                    transition={{duration : 1.1 , delay : 0.5}}
                    className='min-w-0 flex-1 outline-none p-3 border border-sky-200 dark:border-sky-200/20 rounded-xl bg-white/80 dark:bg-[#101c30] text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20' type="email" placeholder='Enter your email' aria-label='Your email address' name='email' required/>
            </div>
            <motion.textarea  
                initial = {{ y : 100 ,opacity : 0}}
                whileInView={{ y : 0 ,opacity : 1}}
                transition={{duration : 1.3 , delay : 0.6}}
                className='w-full outline-none p-4 border border-sky-200 dark:border-sky-200/20 rounded-xl bg-white/80 dark:bg-[#101c30] text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 mb-6' rows='6' placeholder='Write your message' aria-label='Your message' name='message'></motion.textarea>
            <motion.button
                whileHover={{scale : 1.05}}
                transition={{duration : 0.3 }}
                className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full mx-auto hover:shadow-lg hover:shadow-cyan-500/30 duration-300 disabled:cursor-wait disabled:opacity-60' type='submit' disabled={result === 'Sending....'}>{result === 'Sending....' ? 'Sending...' : 'Send message'}<Image className='w-4' src={assets.right_arrow_white} alt=''/></motion.button>
            <p aria-live='polite' className='mt-4 text-center text-blue-700 dark:text-sky-200'>{result}</p>
        </motion.form>
    </motion.div>
  )
}

export default Contact
