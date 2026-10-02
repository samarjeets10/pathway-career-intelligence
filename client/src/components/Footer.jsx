import React from 'react'
import { Mail }from "lucide-react"

function Footer() {
  return (
    <div className='w-full py-6 min-h-80 mt-12 bg-neutral-900 text-neutral-100'>
        <div className='py-12 px-4 sm:px-12 lg:px-24 xl:px-40 flex flex-col lg:flex-row justify-between gap-8'>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold max-w-sm'>Lat's Build Your Future with Pathway.</h1>

            <div className='p-2 mt-2 w-fit border-2 border-neutral-600 flex items-center gap-8 justify-between rounded-full'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-full border-2 border-neutral-400'><Mail size={14} /></div>
                <input type="text" placeholder='Enter your email' className='text-sm outline-none max-w-2xl' />
              </div>

              <button className='text-sm font-semibold bg-neutral-100 text-neutral-800 px-8 py-2 border rounded-full cursor-pointer active:bg-neutral-800 active:text-neutral-100 active:border active:border-neutral-400'>Send</button>
            </div>
            <p className='text-xs text-neutral-600'>By Subscribing you agree to with our <span className='text-neutral-400 border-b-1 border-neutral-400 cursor-pointer'>Privacy Policy</span></p>
          </div>

          <div className='w-full lg:w-1/2 grid gap-4 gird-cols-1 sm:grid-cols-2'>
            <div className='flex flex-col gap-2'>
              <h4 className='text-md text-neutral-100'>Location</h4>
              <p className='text-sm text-neutral-400 max-w-2xs'>Fintech HQ Innovation Park, Global Financial Disteict</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h4 className='text-md text-neutral-100'>Contact Us</h4>
              <p className='text-sm text-neutral-400 w-2xs'>+91 9766159602</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h4 className='text-md text-neutral-100'>Email</h4>
              <p className='text-sm text-neutral-400 w-2xs'>samarsabale1021@gmail.com</p>
            </div>

            <div className='flex flex-col gap-2'>
              <h4 className='text-md text-neutral-100'>Github</h4>
              <p className='text-sm text-neutral-400 w-2xs'>github.com/samarjeets10</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer