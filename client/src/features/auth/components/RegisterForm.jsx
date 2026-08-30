import React from 'react'

function RegisterForm() {

    const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} 
    className='w-full flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
            <label htmlFor="username" className='text-md'>User Name</label>
            <input 
            id='username'
            name='username'
            type="text" 
            className='px-2 py-1 border rounded-md outline-none border-neutral-300' placeholder='Enter User Name'/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-md'>Email</label>
            <input 
            id='email'
            name='email'
            type="email" 
            className='px-2 py-1 border rounded-md outline-none border-neutral-300' placeholder='Enter your email'/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-md'>Password</label>
            <input 
            id='password'
            name='password'
            type="password" 
            className='px-2 py-1 border rounded-md outline-none border-neutral-300' placeholder='Enter your password' />
        </div>
        
        <div className='flex flex-col gap-4'>
            <button className='px-2 py-1 bg-neutral-900 text-md text-white rounded-md cursor-pointer'>Register</button>
            <button className='p-2 py-1 border border-neutral-300 text-md rounded-md cursor-pointer'>Sign In with Google</button>
        </div>
    </form>
  )
}

export default RegisterForm