import React from 'react'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const navigate = useNavigate()
  const logOut = () => {
    navigate('/registerLogin')
  }
  return (
    <div className='bg-gray-200 h-16 grid'>
      <button onClick={logOut} className='justify-self-end mr-8'>Log out</button>
    </div>
  )
}

export default TopBar