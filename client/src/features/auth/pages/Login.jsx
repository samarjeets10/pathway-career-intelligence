import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

function Login() {

  return (
    <main className='h-screen w-full'>
      <div className='w-full h-full flex justify-center items-center'>

        <div className='w-full h-full py-4 px-6 flex flex-col gap-4 justify-between items-center'>
          <div>
            <Link to="/"><h3 className='text-xl font-semibold'>Pathway.</h3></Link>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='text-center'>
              <h2 className='text-3xl font-semibold'>Welcome Back</h2>
              <p className='text-sm mt-1 text-neutral-400'>Enter your email and password to access your account</p>
            </div>

            <LoginForm />

          </div>

          <div>
            <p className='text-sm text-neutral-400'>Don't have an account? <Link to="/register"><span className='font-semibold text-neutral-800 cursor-pointer'>Sign In</span></Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login