import { Link } from 'react-router-dom'
// import { CircleArrowRight } from 'lucide-react'
// import ctaImage from "../assets/cta_sky.jpg"
import {
  ArrowUpRight,
  MoveUpRight
} from 'lucide-react'

function CtaSection() {
  return (
//     <div className='w-full px-4 py-12 sm:px-12 lg:px-24 xl:px-40'>
//         <div className='w-full min-h-120 bg-cover bg-center px-4 flex flex-col items-center justify-center text-center gap-6 rounded-xl' style={{backgroundImage: `url(${ctaImage})`}}>
//             <div className='px-4 py-2 border border-neutral-200 rounded-full'>
//               <p className='text-sm text-neutral-200'>A Considered Next Step</p>
//             </div>
//             <h3 className='text-4xl sm:text-5xl font-bold max-w-md'>See the work behind the match.</h3>
//             <p className='text-sm text-neutral-800 max-w-md'>Explore the example above to see how role requirements turn into visible evidence and practical next steps.</p>
// 
//             <Link to="/login"><button className='px-6 py-3 bg-neutral-800 text-neutral-100 rounded-full text-lg flex items-center gap-4'>Return to sample analysis<CircleArrowRight /></button></Link>
//         </div>
//     </div>

    <section className="bg-[#f8f8f6] pb-6 pt-8 sm:pb-8 px-4 sm:px-12 lg:24">
      <div className="page-shell">
        <div className="closing-card relative overflow-hidden rounded-[2rem] bg-[#c8f36b] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-[4.5rem]">
          <div className="closing-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-[42rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800/15 bg-white/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-700"><MoveUpRight size={13} /> Your next chapter, considered</div>
              <h2 className="mt-5 font-display text-[2.65rem] font-bold leading-[1] tracking-tightest text-neutral-800 sm:text-[3.7rem]">A better next step starts with a clearer one.</h2>
              <p className="mt-4 max-w-[35rem] text-sm leading-[1.75] text-neutral-700">Bring your resume, a role you are curious about, and a little space to prepare. Pathway helps connect the rest.</p>
            </div>
            <a className="button-dark w-full flex items-center gap-4 px-4 py-2 border border-neutral-600 rounded-full" href="#top">Back to the beginning <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection