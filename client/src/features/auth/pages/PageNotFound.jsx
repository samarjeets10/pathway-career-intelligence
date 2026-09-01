import NotFoundIcon from '../../../assets/notfoundicon.svg?react'

function PageNotFound() {
  return (
    <main className='h-screen w-full'>
        <div className='h-full w-full flex flex-col items-center justify-center'>
            <div>
                <NotFoundIcon className='size-80'/>
            </div>
            <div className='flex items-center justify-center flex-col gap-6'>
                <h2 className='text-3xl font-bold'>Oops... Wrong page</h2>
                <p className='text-md max-w-90 text-neutral-500 text-center'>Your are aming for a page, but unlished accent chios insted. Typical Pandora move</p>
                <button className='py-2 px-4 text-white bg-neutral-900 rounded-xl cursor-pointer'>Go Home</button>
            </div>
        </div>
    </main>
  )
}

export default PageNotFound