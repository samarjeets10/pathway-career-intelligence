import React from 'react'

function Dashboard() {
  return (
    <div className='font-semibold'>
      <div className='flex items-center justify-between py-4 px-40'>
          <h2 className='text-2xl text-neutral-800'>Dashboard</h2>
          <button className='py-2 px-6 border border-neutral-600 text-neutral-800 rounded-full'>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard