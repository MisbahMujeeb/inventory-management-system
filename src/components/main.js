import React from 'react'
import Dashboard from './Dashboard'
import Sidebar from './sidebar'
import TopBar from './topbar'

const Main = () => {
  return (
   <div className='flex'>
  <Sidebar />
  <div className=" text-2xl font-semibold flex-1 h-screen">
  <TopBar />
  <Dashboard />
  </div>
 </div>
  )
}

export default Main