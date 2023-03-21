import React, { useState } from 'react'
import { LoginButton } from '../common/loginButton'

const LoginSignUp = () => {
  const [login, setLogin] = useState(true)
  const [registerName , setRegisterName] = useState('')
  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')

  const submitRegister = () => {
    if(!registerName || !registerEmail || !registerPassword){
      alert('Please Fill All the Fields.')
    }else{
      
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-800'>
    {/* Inner Container */}
      <div className="container mx-auto">
    {/* Inner Box */}
        <div className='flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto
         shadow-lg overflow-hidden '
         style={{height:480}}
         >
         {/* First Column Div */}
          <div className='bg-[#06AFA5] w-full lg:w-1/2 flex flex-col items-center justify-center p-12' >
            <h1 className='text-white text-3xl mb-4 text-center'>Inventory Management System</h1>
            <p className='text-white'>The Inventory Management System can be used to track
              the inventory of a single store, or to manage the distribution of stock between
              several stores of a larger franchise. </p>
          </div>
            {/*End of First Column Div */}
              {/* Second Column Div */}
          <div className='w-full lg:w-1/2 px-12 py-10 '>
            <div className="flex flex-row mb-2">
              <h2 className={`text-2xl mb-4 mr-5 cursor-pointer  pb-1 ${!login && 'border-b-2 border-[#06AFA5]' } `} onClick={() => setLogin(false)}>Register</h2>
              <h2 className={`text-2xl mb-4 cursor-pointer  pb-1 ${login && 'border-b-2 border-[#06AFA5]' } `} onClick={() => setLogin(true)}>Login</h2>
            </div>
            {/* login Sign Up Conditional Rendering */}
            {!login ?
              (
                <div className={``}>
                  <p className='mb-4'>
                    Create your account.It's free and only take a minute.
                  </p>
                  <form action="#" className='duration-700'>
                    <div className='mt-5'>
                      <input type="text"
                       placeholder='Enter Name' maxLength={20} 
                       onChange={(text) => setRegisterName(text)}
                       className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                    </div>
                    <div className='mt-5'>
                      <input type="email"
                       placeholder='Enter Email'
                        maxLength={20}
                        onChange={(text) => setRegisterEmail(text)}
                         className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                    </div>
                    <div className='mt-5'>
                      <input type="password"
                       placeholder='Enter Password'
                        maxLength={20} 
                        onChange={(text) => setRegisterPassword(text)}
                        className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                    </div>
                    <div class="mt-5">
                      <button onClick={submitRegister} class="w-full bg-[#06AFA5] py-3 text-center shadow-sm shadow-slate-500 rounded-lg text-white">Register Now</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className={``}>
                  <p className='mb-4'>
                    Login to your Account.
                  </p>
                <form action="#">
                  <div className='mt-5'>
                    <input type="email" placeholder='Enter Email' maxLength={20} className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                  </div>
                  <div className='mt-5'>
                    <input type="password" placeholder='Enter Password' maxLength={20} className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                  </div>
                  <div class="mt-5">
                    <button class="w-full bg-[#06AFA5] py-3 shadow-sm shadow-slate-500 text-center rounded-lg text-white">Login</button>
                  </div>
                </form>
                </div>
              )
            }
          </div>
             {/*End of Second Column Div */}
        </div>
          {/*End Inner Box */}
      </div>
       {/*End of Inner Container */}
    </div>
    //   <div className='h-screen w-screen justify-center flex bg-[url("./assets/cover.jpg")] bg-no-repeat bg-cover'>
    // </div>


  )
}

export default LoginSignUp