import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';


const MyStock = () => {
  const [products, setProducts] = useState([])
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  const DeleteItem = async (id) => {
    console.log('id', id);
    try {
      const { data } = await axios.delete(`http://localhost:4000/deleteProduct/${id}`);
      //    setProducts(data)
      window.location.reload()
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };


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
      console.log(userId)
      const { data } = await axios.get(`http://localhost:4000/fetchProducts/${userId}`)
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData()
}, [userId])




  return (
    <section className="text-gray-600 body-font relative">
      <ToastContainer />
      <div className="container px-10 py-5 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">My Stock</h1>
          <button type='button' className="flex text-white w-40 justify-center bg-slate-700 border-0 py-2 px-8 focus:outline-none hover:bg-slate-800 rounded text-lg mb-3" onClick={() => navigate("/AddItems")} >Add Items</button>
        </div>

        <table className="table-auto w-full text-center ">
          <thead>
            <tr className='border-b-2'>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              {/* <th>Manufacturer</th> */}
              {/* <th>Description</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className='border-b-2'>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.productQuantity}</td>
                <td>{product.productPrice}</td>
                {/* <td>{product.productManufacturer}</td>
                <td>{product.productDescription > 25 ? product.productDescription : product.productDescription.slice(0,25)+' ... ' }</td> */}
                <td>
                  <button className='bg-blue-500 py-1 px-2 text-white m-1 rounded-md' >Detail</button>
                  <button className='bg-green-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => navigate('/AddItems', { state: { product } })}>Edit</button>
                  <button className='bg-red-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => DeleteItem(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyStock
