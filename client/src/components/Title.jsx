import React from 'react'

function Title( {title, dec }) {
  return (
    <div className='text-center mb-6 flex flex-col items-center justify-center gap-2 '>
        <h2 className='text-3xl sm:4xl font-semibold text-eutral-800'>{title}</h2>
        <p className='text-sm max-w-sm text-neutral-400 font-normal'>{dec}</p>
    </div>
  )
}

export default Title