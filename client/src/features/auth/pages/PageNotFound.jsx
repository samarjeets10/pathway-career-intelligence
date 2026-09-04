import NotFoundIcon from '../../../assets/notfoundicon.svg?react'
import { Link } from 'react-router'

function PageNotFound() {
  return (
    <main className='h-screen w-full'>
        <div className='h-full w-full px-4 flex flex-col items-center justify-center'>
            <div>
                <NotFoundIcon className='size-80'/>
            </div>
            <div className='flex items-center justify-center flex-col gap-4'>
                <h2 className='text-3xl font-bold text-center'>Well, this is awkward.</h2>
                <p className='text-md max-w-120 text-neutral-500 text-center'>You were aiming for a specific page, but the universe (and our servers) had other plans. Let's get you back on track.</p>
                <Link to="/"><button className='py-2 px-4 text-white text-sm bg-neutral-900 rounded-xl cursor-pointer'>Go Home</button></Link>
            </div>
        </div>
    </main>
  )
}

export default PageNotFound