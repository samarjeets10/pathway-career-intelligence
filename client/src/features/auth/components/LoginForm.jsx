import React from 'react'

function LoginForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

  return (
    <form onSubmit={handleSubmit}
    className='w-full flex flex-col gap-6'>
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
            <button className='px-2 py-1 bg-neutral-900 text-md text-white rounded-md cursor-pointer'>Login</button>
            <button className='p-2 py-1 border border-neutral-300 text-md rounded-md cursor-pointer'>Sign In with Google</button>
        </div>
    </form>
  )
}

export default LoginForm