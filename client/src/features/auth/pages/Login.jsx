import React from 'react'

function Login() {
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>

        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' placeholder='enter email address' />
          </div>

          <div className="password-group">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' placeholder='enter password' />
          </div>

          <button className='button primary-button'>Login</button>
        </form>
      </div>
    </main>
  )
}

export default Login