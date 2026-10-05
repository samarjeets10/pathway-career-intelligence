import React from 'react'

function SolutionSection() {
  return (
    <div className='w-full px-4 py-12 sm:px-12 lg:px-24 xl:px-40 flex  gap-8'>
        <div className='w-full p-6 bg-neutral-800 border border-neutral-200 rounded-xl flex flex-col gap-12'>
            <div>
                <span className='text-2xl text-neutral-200 font-semibold'>01</span>
            </div>
            <div className='flex flex-col gap-8'>
                <h3 className='text-2xl text-neutral-200 font-semibold'>Start with the real role</h3>
                <p className='text-sm text-neutral-400 sm:max-w-xl'>Add a target job description and the resume version you want to assess. No broad career quiz, no generic profile.</p>
            </div>
        </div>

        <div className='w-full p-6 bg-neutral-800 border border-neutral-200 rounded-xl flex gap-12'>
            <div>
                <span className='text-2xl text-neutral-200 font-semibold'>02</span>
            </div>
            <div className='flex flex-col gap-8'>
                <h3 className='text-2xl text-neutral-200 font-semibold'>See the evidence clearly</h3>
                <p className='text-sm text-neutral-400 sm:max-w-xl'>Review role requirements alongside the skills and experience your resume actually demonstrates.</p>
            </div>
        </div>

        <div className='w-full p-6 bg-neutral-800 border border-neutral-200 rounded-xl flex gap-12'>
            <div>
                <span className='text-2xl text-neutral-200 font-semibold'>03</span>
            </div>
            <div className='flex flex-col gap-8'>
                <h3 className='text-2xl text-neutral-200 font-semibold'>Choose your next step</h3>
                <p className='text-sm text-neutral-400 sm:max-w-xl'>Strengthen a bullet, build a missing skill, or practice for the interview. Your plan is specific to this role.</p>
            </div>
        </div>
        
    </div>
  )
}

export default SolutionSection