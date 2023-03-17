import React from 'react'
import { LoginButton } from '../common/loginButton'

const Login = () => {
    return (
        <div className='h-screen w-screen justify-center flex bg-[url("./assets/cover.jpg")] bg-no-repeat bg-cover'>
        <div className='bg-opacity-40 bg-black h-3/4 w-1/3 place-self-center'>
          <div className='flex flex-nowrap m-5'>
            <a href='' onClick={() => alert('hi')}>
              <h1 className='text-white text-xl m-5 border-b-2 border-red-400 pb-1'>Login</h1>
            </a>
            <a href='' onClick={() => alert('hi')}>
              <h1 className='text-white text-xl m-5'>Register</h1>
            </a>
          </div>
          <div className=''>
            <div className='m-10'>
                <div className='mb-9'>
                    <h1 className='text-white'>Email</h1>
                    <input type={'text'} placeholder='Enter Email' className='bg-transparent border-b-2 py-2 w-96' />
                </div>
                <div className='mb-9'>
                    <h1 className='text-white'>Password</h1>
                    <input type={'password'} placeholder='Enter Email' className='bg-transparent border-b-2 py-2 w-96' />
                </div>
            </div>
            <LoginButton />
        </div>
        
        </div>
      </div>
  
      
    )
}

export default Login