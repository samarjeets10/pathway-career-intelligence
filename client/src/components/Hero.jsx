import HeroImage from "../assets/Rectangle 3.svg"
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-neutral-800'>

        <div className='w-full flex items-center justify-center'>
            <div className='text-center px-6 py-1 border border-neutral-300 rounded-full flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-green-400'></span>
                <p className='text-neutral-400 text-sm'>Powered by Groq AI</p>
            </div>
        </div>

        <h1 className='text-5xl font-semibold leading-[56px]'>The Multi-Accounting Browser <br /> Build on top of Safari's Core</h1>

        <p className='text-sm font-normal text-neutral-500 max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum provident, consequuntur vitae iusto esse maxime.</p>

        <div className='flex items-center justify-center gap-2'>
            <Link to='/register'><button className='px-6 py-2 text-md bg-neutral-800 text-neutral-100 rounded-full cursor-pointer'>started for free</button></Link>
            <button className='px-4 py-2 border border-neutral-400 rounded-full text-neutral-800 cursor-pointer active:bg-neutral-800 active:text-neutral-100'>watch a demo</button>
        </div>

        <div className='mt-8'>
            <img src={HeroImage} alt="image" className='w-full max-w-6xl' />
        </div>

    </div>
  )
}

export default Hero