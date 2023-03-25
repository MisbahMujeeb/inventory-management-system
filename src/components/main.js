import React, { useEffect } from 'react'
import {
  useNavigate, BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Dashboard from './Dashboard'
import Sidebar from './sidebar'
import TopBar from './topbar'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


const Main = () => {
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies([])
  useEffect(() => {
    const varifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/registerLogin')
      } else {
        const { data } = await axios.post(
          'http://localhost:4000/', {}, { withCredentials: true }
        )
        if (!data.status) {
          removeCookie('jwt')
          navigate('/registerLogin')
        } else { toast(`HI ${data.user}`, { theme: 'dark' }) }
      }
    }
    varifyUser()
  }, [cookies, navigate, removeCookie])

  return (
    <>
      <ToastContainer />
      <div className='flex'>
      <Sidebar />      
        <div className=" text-2xl font-semibold flex-1 h-screen">
          <TopBar />
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default Main