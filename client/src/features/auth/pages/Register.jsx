import RegisterForm from '../components/RegisterForm'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  return (
    <main className='h-screen sm:min-h-screen sm:h-full w-full'>
      <div className='w-full h-full flex justify-center items-center'>

        <div className='w-full h-full py-4 px-6 flex flex-col gap-12 justify-between items-center'>
          <div>
            <h3 className='text-xl font-bold'>Pathway</h3>
          </div>

          <div className='flex flex-col gap-12'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>Create an Account</h2>
              <p className='text-sm'>Enter your email and password to create your account</p>
            </div>

            <RegisterForm />

          </div>

          <div>
            <p className='text-sm'>Already have an account? <Link to="/login"><span className='font-bold cursor-pointer'>Login</span></Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register