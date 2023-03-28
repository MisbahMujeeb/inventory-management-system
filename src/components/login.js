import React, { useState } from 'react'
import { LoginButton } from '../common/loginButton'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
    
    const [valuesForLogin, setValuesForLogin] = useState({email: "", password: "" });
    const navigate = useNavigate()

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
    
  const handleSubmitLogin = async (event) => {
     event.preventDefault()
  if( !valuesForLogin.email || !valuesForLogin.password){
   alert ('PLease fill all fields.')
  }else{
   try {
    console.log('setValuesForLogin before' ,valuesForLogin)

     const {data} = await axios.post("http://localhost:4000/login",
     { ...valuesForLogin},
     {withCredentials:true}
     )
     if (data) {
       // console.log('good')
       if (data.errors) {
         const {email , password} = data.errors;
         if (email) generateError(email);
         else if (password) generateError(password);
       } else {
         setValuesForLogin({email: "", password: "" });
          navigate("/");
       }
     }
     
   } catch (error) {
     console.log(error);
   }
  }
 }

  return (
    <div className={``}>
                <ToastContainer />
                  <p className='mb-4'>
                    Login to your Account.
                  </p>
                <form onSubmit={(e) => handleSubmitLogin(e)}>
                  <div className='mt-5'>
                    <input type="email"
                     placeholder='Enter Email'
                      maxLength={40}
                      name='email'
                        onChange={(e) =>
              setValuesForLogin({ ...valuesForLogin, email: e.target.value })
            }
                       className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400'
                        />
                  </div>
                  <div className='mt-5'>
                    <input type="password"
                     placeholder='Enter Password'
                      maxLength={20} 
                      name='password'
                        onChange={(e) =>
              setValuesForLogin({ ...valuesForLogin, password: e.target.value })
            }
                      className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400' />
                  </div>
                  <div className="mt-5">
                    <button type='submit' className="w-full bg-[#06AFA5] py-3 shadow-sm shadow-slate-500 text-center rounded-lg text-white">Login</button>
                  </div>
                </form>
                </div>
  )
}

export default Login