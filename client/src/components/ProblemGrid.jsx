import React from 'react'
import Puzzle from '../assets/puzzle.svg'
import Target from "../assets/target.svg"
import Compass from '../assets/compass.svg'

function ProblemGrid() {
  return (
    <div className='flex flex-col gap-4 md:flex-row px-4 py-6 md:py-8 sm:px-12 lg:px-24 xl:px-40'>
        <div className='flex flex-col gap-4 w-full md:w-1/2'>
            <div className='h-50 w-full flex flex-col justify-between p-6 rounded-xl border border-neutral-300'>
                <img src={Puzzle} alt="puzzle" className='h-8 w-8' />

                <div>
                  <h3 className='text-2xl font-semibold'>Too much information</h3>
                  <p className='text-sm text-neutral-400 mt-2'>Your skills, projects, and job requirements are scattered. Assembling them into a complete picture shouldn't be a struggle.</p>
                </div>
            </div>
            
            <div className='h-50 w-full flex flex-col justify-between p-6 rounded-xl border border-neutral-300'>
                <img src={Target} alt="target" className='h-8 w-10' />
                <div>
                  <h3 className='text-2xl font-semibold'>Unclear gaps</h3>
                  <p className='text-sm text-neutral-400 mt-2'>Job requirements are explicit; your readiness isn't. Dissecting what you match versus what you're missing is still guesswork.</p>
                </div>
            </div>
        </div>

        <div className='w-full min-h-80 md:w-1/2 bg-neutral-800 rounded-xl p-6 flex flex-col  justify-between'>
            <img src={Compass} alt="compass" className='h-12 w-12' />

            <div>
              <h3 className='text-3xl font-semibold text-neutral-100'>Unfocused Upskilling</h3>
              <p className='text-sm text-neutral-400 mt-2'>You spend weeks studying blindly—never knowing which skills actually move you closer to getting hired.</p>
            </div>
        </div>
    </div>
  )
}

export default ProblemGrid