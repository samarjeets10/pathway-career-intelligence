import { Link } from 'react-router-dom'
// import { CircleArrowRight } from 'lucide-react'
// import ctaImage from "../assets/cta_sky.jpg"
import {
  ArrowUpRight,
  MoveUpRight
} from 'lucide-react'

function CtaSection() {
  return (
    <section className="bg-[#f8f8f6] pb-6 pt-8 sm:pb-8 px-4 sm:px-12 lg:px-24 xl:px-40">
      <div className="page-shell">
        <div className="closing-card relative overflow-hidden rounded-[2rem] bg-[#c8f36b] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-[4.5rem]">
          <div className="closing-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="relative z-10 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-[42rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800/15 bg-white/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-700"><MoveUpRight size={13} /> Your next chapter, considered</div>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1] tracking-tightest text-neutral-800 sm:text-5xl">A better next step starts with a clearer one.</h2>
              <p className="mt-4 max-w-[35rem] text-sm leading-[1.75] text-neutral-700">Bring your resume, a role you are curious about, and a little space to prepare. Pathway helps connect the rest.</p>
            </div>
            <a className="w-full flex items-center text-md gap-4 px-4 py-2 border border-neutral-600 rounded-full" href="#top">Back to the beginning <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection