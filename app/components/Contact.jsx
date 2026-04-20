import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

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
    <div id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto]'>
        <h4 className='text-center mb-2 text-lg fontOvo capitalize'>Contact with me</h4>
        <h2 className='text-center text-5xl fontOvo capitalize'>Get in touch</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 fontOvo'>I'd love to hear from you! If you have any questions,comments or feedback please use the form below</p>

        <form onSubmit={onSubmit} className='max-w-2xl mx-auto'>
            <div className='grid grid-cols-2 gap-2 my-10 mb-8'>
                <input className='flex-1 outline-none p-3 border-[0.5px] border-gray-400 rounded-md bg-white' type="text" placeholder='Enter your name' name='name' required/>
                <input className='flex-1 outline-none p-3 border-[0.5px] border-gray-400 rounded-md bg-white' type="email" placeholder='Enter your email' name='email' required/>
            </div>
            <textarea className='w-full outline-none p-4 border-[0.5px] border-gray-400 rounded-md bg-white mb-6' rows='6' placeholder='Enter your message' name='message'></textarea>
            <button className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500' type='submit'>Submit now<Image className='w-4' src={assets.right_arrow_white} alt='not fount'/></button>
            <p className='mt-4'>{result}</p>
        </form>
    </div>
  )
}

export default Contact