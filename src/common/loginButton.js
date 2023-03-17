import React from 'react'

export const LoginButton = () => {
  return (
    <div className='flex items-center justify-center'>
        <button className='w-96 h-10 my-2 bg-red-400 text-white'
        onClick={() => alert('login')}
        > Login</button>
    </div>
  )
}
