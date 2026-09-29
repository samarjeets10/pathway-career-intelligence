import React from 'react'
import { Mail }from "lucide-react"

function Footer() {
  return (
    <div className='w-full py-6 min-h-80 mt-12 bg-neutral-800 text-neutral-100'>
        <div className='py-12 px-4 sm:px-12 lg:px-24 xl:px-40 flex flex-col lg:flex-row justify-between gap-4'>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <h1 className='text-4xl font-semibold max-w-sm'>Lat's Build Your Future with Pathway.</h1>

            <div className='p-2 mt-2 w-fit border-2 border-neutral-600 flex items-center gap-8 justify-between rounded-full'>
              <div className='flex items-center gap-2'>
                <div className='p-2 rounded-full border-2 border-neutral-400'><Mail size={14} /></div>
                <input type="text" placeholder='Enter your email' className='text-sm outline-none max-w-2xl' />
              </div>

              <button className='text-sm font-semibold bg-neutral-100 text-neutral-800 px-8 py-2 border rounded-full cursor-pointer active:bg-neutral-800 active:text-neutral-100 active:border active:border-neutral-400'>Send</button>
            </div>
          </div>

          <div className='w-full lg:w-1/2'>

          </div>
        </div>
    </div>
  )
}

export default Footer