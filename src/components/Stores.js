import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { MongoServerError } from 'mongoose';

const Stores = () => {
  const [value , setValue] = useState({ storeName : '', storeLocation : '' , userId:''})
  const [stores, setStores] = useState([])
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    const varifyUser = async () => {
        const { data } = await axios.post(
          'http://localhost:4000/', {}, { withCredentials: true }
        )
        if (!data.status) {
          toast(`User id Not Found`, { theme: 'dark' })
        } else { 
          setUserId(data.uId)
          setValue({userId: data.uId })
      }
    }
    varifyUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId)
        const { data } = await axios.get(`http://localhost:4000/fetchStores/${userId}`)
        setStores(data)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(stores)
    fetchData()
  }, [userId])


  const DeleteStores = async (id) => {
    console.log('id', id);
    try {
      const { data } = await axios.delete(`http://localhost:4000/deleteStores/${id}`);
        setStores(data)
      window.location.reload()
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };







  const AddStores = async (event) => {
    event.preventDefault();
    if (!value.storeName || !value.storeLocation) {
      toast.error('Please fill out all fields');
    } else {
      try {
        let data = null;
        // if (productId) {
        //   console.log('edited');
        //   data = await axios.put(`http://localhost:4000/editProduct/${productId}`, { ...products });
        // } else {
          data = await axios.post('http://localhost:4000/addStores', { ...value });
        // }
  
        if (data.data.success) {
          toast.success(data.data.message);
          setValue({ storeName: '', storeLocation: '' });
          window.location.reload()

        } else {
          toast.error(data.data.message || 'Failed to add stores');
        }
      } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
          // If the error is a duplicate key error, show a user-friendly error message
          const duplicateKey = error.keyValue.productName;
          toast.error(`Error: A product with the name "${duplicateKey}" already exists.`);
        } else {
          // If the error is not a duplicate key error, show a generic error message
          toast.error("An error occurred while inserting the document:", error);
        }
      }
    }
  }
  return (
<section className="text-gray-600 body-font relative">
  <ToastContainer />
  <div className="container px-10 py-5 mx-auto">
    <div className="flex flex-col w-full">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Stores</h1>
      <form onSubmit={(event) => AddStores(event)} className="my-5 flex flex-wrap">
        <div className="w-full md:w-1/3 p-3">
          <label>Store Name</label>
          <input
            type="text"
            placeholder="Enter Store Name"
            maxLength={40}
            value={value.storeName}
            name="storeName"
            onChange={(e) =>
              setValue({ ...value, storeName: e.target.value })
            }
            className="block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400"
          />
        </div>
        <div className="w-full md:w-1/3 p-3">
          <label>Store Location</label>
          <input
            type="text"
            placeholder="Enter Location"
            maxLength={40}
            value={value.storeLocation}
            name="storeLocation"
            onChange={(e) =>
              setValue({ ...value, storeLocation: e.target.value })
            }
            className="block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400"
          />
        </div>
        <div className="w-full md:w-1/3 p-3 flex justify-center md:justify-start">
          <button
            type="submit"
            className="flex text-white w-full mt-6 justify-center bg-slate-700 border-0 py-2 px-8 focus:outline-none hover:bg-slate-800 rounded text-lg mb-3"
            onClick={() => console.log("ok")}
          >
            Add Stores
          </button>
        </div>
        <div></div>
      </form>
    </div>

    <table className="table-auto w-full text-center ">
      <thead>
        <tr className="border-b-2">
          <th>S.No</th>
          <th>Store Name</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((store , index) => (
          <tr className="border-b-2">
          <td>{index + 1}</td>
          <td>{store.storeName}</td>
          <td>{store.storeLocation}</td>
          <td>
            <button className="bg-green-500 py-1 px-2 text-white m-1 rounded-md">
              Edit
            </button>
            <button onClick={() => DeleteStores(store._id)} className="bg-red-500 py-1 px-2 text-white m-1 rounded-md">
              Delete
            </button>
          </td>
        </tr>
        ))}
       
      </tbody>
    </table>
  </div>
</section>


   
  )
}

export default Stores