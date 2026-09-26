import { useState } from 'react'
import { Link } from 'react-router-dom'
function Navbar() {

  

  return (
    <div className='flex justify-between items-center p-4 sm:px-12 lg:px-24 xl:40 sticky top-0 z-20 backdrop-blur-2xl font-medium bg-white/50'>
          <h2 className='text-2xl font-semibold'>Pathway.</h2>

        <div className='hidden h-full lg:flex items-center justify-between gap-12 px-6 py-2 bg-neutral-100 rounded-xl'>
            <a href="#features" className='text-sm font-normal text-neutral-800'><span>How it works?</span></a>
            <a href="#pricing" className='text-sm font-normal text-neutral-800'><span>Features</span></a>
            <a href="#about" className='text-sm font-normal text-neutral-800'><span>Product</span></a>
            <a href="#contact" className='text-sm font-normal text-neutral-800'><span>Resources</span></a>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <Link to="/register"><button className='px-6 py-2 bg-neutral-800 text-white/90 rounded-full cursor-pointer active:bg-transparent active:border active:text-neutral-800 active:border-neutral-800'>get started</button></Link>
          <Link to="/login"><button className='px-4 py-2 border border-neutral-400 rounded-full text-neutral-800 cursor-pointer active:bg-neutral-800 active:text-neutral-100'>Login</button></Link>
        </div>
    </div>
  )
}

export default Navbar