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
import AddItems from './AddItems'
import PurchaseItems from './purchaseItem'
import SellItems from './SelItems'
import MyStock from './myStock'
import Sales from './Sales'
import Stores from './Stores'
import ProductDEtails from './productDEtails'



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
        } else { 
          // toast(`HI ${data.user} ${data.uId}`, { theme: 'dark' })
         }
      }
    }
    varifyUser()
  }, [cookies, navigate, removeCookie])

  return (
    <>
      <ToastContainer />
      <div className='flex'>
      <Sidebar />      
        <div className="w-screen h-screen">
          <TopBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/PurchaseItems" element={<PurchaseItems />} />
            <Route path="/AddItems" element={<AddItems />} />
            <Route path="/MyStock" element={<MyStock />} />
            <Route path="/SellItems" element={<SellItems />} />
            <Route path="/productDetails" element={<ProductDEtails />} />
            <Route path='/Sales' element={<Sales />} />
            <Route path='/Stores' element={<Stores />} />

            {/* add your own routes here */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Main