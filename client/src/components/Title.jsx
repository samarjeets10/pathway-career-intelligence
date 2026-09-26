import React from 'react'

function Title( {title, dec }) {
  return (
    <div className='w-full flex flex-col px-4 py-8 gap-8 sm:px-12 lg:px-24 xl:px-40 md:flex-row items-baseline justify-between'>
      <h2 className='text-4xl font-semibold text-neutral-800'>{title}</h2>
      <p className='text-sm text-neutral-500 md:text-right'>{dec}</p>
    </div>
  )
}

export default Title