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

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();

        if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
        } else {
        console.log("Error", data);
        setResult(data.message);
        }
    };
  return (
    <motion.div
        initial = {{opacity : 0}}
        whileInView={{opacity : 1}}
        transition={{duration : 1}}
        id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto]'>
        <motion.h4
            initial = {{y : -20 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.3 , delay : 0.6}}
            className='text-center mb-2 text-lg fontOvo capitalize'>Contact with me</motion.h4>
        <motion.h2 
            initial = {{y : -25 , opacity : 0}}
            whileInView={{y : 0 , opacity : 1}}
            transition={{duration : 0.5 , delay : 0.6}}
            className='text-center text-5xl fontOvo capitalize'>Get in touch</motion.h2>
        <motion.p
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.7 , delay : 0.5}}
            className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>I'd love to hear from you! If you have any questions,comments or feedback please use the form below</motion.p>

        <motion.form
            initial = {{opacity : 0}}
            whileInView={{opacity : 1}}
            transition={{duration : 0.9 , delay : 0.5}}
            onSubmit={onSubmit} className='max-w-2xl mx-auto'>
            <div className='grid grid-cols-2 gap-2 my-10 mb-8'>
                <motion.input 
                    initial = {{ x :-50 ,opacity : 0}}
                    whileInView={{ x : 0 ,opacity : 1}}
                    transition={{duration : 1.1 , delay : 0.5}}
                    className='flex-1 outline-none p-3 border-[0.5px] border-gray-400 rounded-md bg-white' type="text" placeholder='Enter your name' name='name' required/>
                <motion.input 
                    initial = {{ x : 50 ,opacity : 0}}
                    whileInView={{ x : 0 ,opacity : 1}}
                    transition={{duration : 1.1 , delay : 0.5}}
                    className='flex-1 outline-none p-3 border-[0.5px] border-gray-400 rounded-md bg-white' type="email" placeholder='Enter your email' name='email' required/>
            </div>
            <motion.textarea  
                initial = {{ y : 100 ,opacity : 0}}
                whileInView={{ y : 0 ,opacity : 1}}
                transition={{duration : 1.3 , delay : 0.6}}
                className='w-full outline-none p-4 border-[0.5px] border-gray-400 rounded-md bg-white mb-6' rows='6' placeholder='Enter your message' name='message'></motion.textarea>
            <motion.button
                whileHover={{scale : 1.05}}
                transition={{duration : 0.3 }}
                className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500' type='submit'>Submit now<Image className='w-4' src={assets.right_arrow_white} alt='not fount'/></motion.button>
            <p className='mt-4'>{result}</p>
        </motion.form>
    </motion.div>
  )
}

export default Contact