import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';


const Dashboard = () => {
  const [productInStock, setProductInStock] = useState(0)
  const [productOutOfStock, setProductOutOfStock] = useState(0)
  const [productStockPrice, setProductStockPrice] = useState(0)


  const [userId, setUserId] = useState('')

  useEffect(() => {
    const varifyUser = async () => {
      const { data } = await axios.post(
        'http://localhost:4000/', {}, { withCredentials: true }
      )
      if (!data.status) {
        toast(`User id Not Found`, { theme: 'dark' })
      } else {
        setUserId(data.uId)
      }
    }
    varifyUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchProducts/${userId}`)
        // const { dataTwo } = await axios.get(`http://localhost:4000/fetchSales/${userId}`)

        // In Stock Product
        const quantities = data.map(product => product.productQuantity)
        const totalQuantity = quantities.reduce((acc, quantity) => acc + quantity, 0)
        setProductInStock(totalQuantity)

        // Out of Stock Product
        const outOfStock = data.filter(product => product.productQuantity === 0)
        const outOfStockQuantity = outOfStock.length
        setProductOutOfStock(outOfStockQuantity)

        // In Stock Product
        // const totalStockPrice = dataTwo.map(product => product.salesPrice)
        // const totalStockPrices = totalStockPrice.reduce((acc, price) => acc + price, 0)
        // setProductStockPrice(totalStockPrices)


      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [userId])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchSales/${userId}`)

        // In Stock Product
        const totalStockPrice = data.map(product => product.salesPrice)
        const totalStockPrices = totalStockPrice.reduce((acc, price) => acc + price, 0)
        setProductStockPrice(totalStockPrices)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userId])

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-10 py-5 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Dashboard</h1>
        </div>
        <div className='flex row'>
          <div className='bg-gray-300 w-1/3 p-5 ml-0 m-4 rounded-md shadow-md'>
            <h1 className='text-lg font-bold'>Total Item In Stock</h1>
            <h1 className=' font-semibold'>{productInStock}</h1>
          </div>
          <div className='bg-gray-300 w-1/3 p-5 ml-0 m-4 rounded-md shadow-md'>
            <h1 className='text-lg font-bold'>Out Of Stock Item</h1>
            <h1 className=' font-semibold'>{productOutOfStock}</h1>
          </div>
          <div className='bg-gray-300 w-1/3 p-5 ml-0 m-4 rounded-md shadow-md'>
            <h1 className='text-lg font-bold'>Total Sale</h1>
            <h1 className=' font-semibold'>Rs: {productStockPrice}</h1>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Dashboard