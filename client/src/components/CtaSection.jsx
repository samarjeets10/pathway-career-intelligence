import { Link } from 'react-router-dom'
import { CircleArrowRight } from 'lucide-react'
import ctaImage from "../assets/cta_sky.jpg"

function CtaSection() {
  return (
    <div className='w-full px-4 py-12 sm:px-12 lg:px-24 xl:px-40'>
        <div className='w-full min-h-120 bg-cover bg-center px-4 flex flex-col items-center justify-center text-center gap-6 rounded-xl' style={{backgroundImage: `url(${ctaImage})`}}>
            <div className='px-4 py-2 border border-neutral-200 rounded-full'>
              <p className='text-sm text-neutral-200'>A Considered Next Step</p>
            </div>
            <h3 className='text-4xl sm:text-5xl font-bold max-w-md'>See the work behind the match.</h3>
            <p className='text-sm text-neutral-800 max-w-md'>Explore the example above to see how role requirements turn into visible evidence and practical next steps.</p>

            <Link to="/login"><button className='px-6 py-3 bg-neutral-800 text-neutral-100 rounded-full text-lg flex items-center gap-4'>Return to sample analysis<CircleArrowRight /></button></Link>
        </div>
    </div>
  )
}

export default CtaSection