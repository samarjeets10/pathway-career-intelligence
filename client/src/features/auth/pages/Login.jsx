import LoginForm from '../components/LoginForm'
import { useNavigate, Link } from 'react-router'

function Login() {

  return (
    <main className='h-screen w-full'>
      <div className='w-full h-full flex justify-center items-center'>

        <div className='w-full h-full py-4 px-6 flex flex-col gap-4 justify-between items-center'>
          <div>
            <h3 className='text-xl font-bold'>Pathway</h3>
          </div>

          <div className='flex flex-col gap-12'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>Welcome Back</h2>
              <p className='text-sm'>Enter your email and password to access your account</p>
            </div>

            <LoginForm />

          </div>

          <div>
            <p className='text-sm'>Don't have an account? <Link to="/register"><span className='font-bold cursor-pointer'>Sign In</span></Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login