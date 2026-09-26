import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='h-screen sm:min-h-screen sm:h-full w-full'>
      <div className='w-full h-screen flex justify-center items-center'>

        <div className='w-full h-full py-4 px-6 flex flex-col justify-between items-center'>
          <div>
            <Link to="/"><h3 className='text-xl font-semibold'>Pathway.</h3></Link>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='text-center'>
              <h2 className='text-2xl font-semibold'>Create an Account</h2>
              <p className='text-sm text-neutral-400'>Enter your email and password to create your account.</p>
            </div>

            <RegisterForm />

          </div>

          <div>
            <p className='text-sm text-neutral-400'>Already have an account? <Link to="/login"><span className='font-semibold cursor-pointer text-md text-neutral-800'>Login</span></Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register