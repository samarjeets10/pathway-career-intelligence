import { Link } from 'react-router-dom'
import { CircleArrowRight } from 'lucide-react'
import ctaImage from "../assets/cta_sky.jpg"

function CtaSection() {
  return (
    <div className='w-full px-4 py-12 sm:px-12 lg:px-24 xl:px-40'>
        <div className='w-full min-h-120 bg-cover bg-center px-4 flex flex-col items-center justify-center text-center gap-6 rounded-xl' style={{backgroundImage: `url(${ctaImage})`}}>
            <h3 className='text-4xl font-semibold max-w-2xl'>Start with where you are. Find out what's next</h3>
            <Link to="/login"><button className='px-6 py-3 bg-neutral-800 text-neutral-100 rounded-full text-lg flex items-center gap-4'>Start analysing<CircleArrowRight /></button></Link>
        </div>
    </div>
  )
}

export default CtaSection