import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Seccrets = () => {
  const navigate = useNavigate()
  const logOut = () => {
    navigate('/registerLogin')
  }
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  )
}

export default Seccrets