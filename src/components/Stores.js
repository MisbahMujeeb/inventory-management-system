import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { MongoServerError } from 'mongoose';

const Stores = () => {
  const [value, setValue] = useState({ storeName: '', storeLocation: '', userId: '' })
  const [stores, setStores] = useState([])
  const [userId, setUserId] = useState('')
  const [storeId, setStoreId] = useState('')
  const [isEdit, setIsEdited] = useState(false)
  const navigate = useNavigate()
  const [showModal, setShowModal] = React.useState(false);



  useEffect(() => {
    const varifyUser = async () => {
      const { data } = await axios.post(
        'http://localhost:4000/', {}, { withCredentials: true }
      )
      if (!data.status) {
        toast(`User id Not Found`, { theme: 'dark' })
      } else {
        setUserId(data.uId)
        setValue({ userId: data.uId })
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




  const EditStore = (store) => {
    setValue({
      storeName: store.storeName,
      storeLocation: store.storeLocation,
      _id: store._id
    });
    setShowModal(true)
    setIsEdited(true)
    setStoreId(store._id)
  }


  const AddStores = async (event) => {
    event.preventDefault();
      try {
        let data = null;
        if (isEdit) {
          console.log('edited');
          data = await axios.put(`http://localhost:4000/editStores/${storeId}`, { ...value });
        } else {
          data = await axios.post('http://localhost:4000/addStores', { ...value });
        }

        if (data.data.success) {
          toast.success(data.data.message);
          setValue({ storeName: '', storeLocation: '' });
          setShowModal(false)
          window.location.reload()

        } else {
          toast.error(data.data.message || 'Failed to add stores');
        }
      } catch (err) {
        if (err.code === 11000) {
          toast.error('The store already exists.'); // Show error toast for duplicate key error
        } else {
          console.log(err);
          toast.error('Failed to add store.'); // Show generic error toast
        }
      
    }

  }

  const closeFunction = () => {
    setShowModal(false)
    console.log('pressed')
    setIsEdited(false)
    setValue({ storeName: '', storeLocation: '', userId: '' })
  }

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-10 py-5 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Stores</h1>
          <button
            className="bg-slate-700 absolute right-6 top-6 text-white active:bg-slate-800-600 font-bold
             uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
              focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
          {showModal ? (
            <>
           
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none
                 focus:outline-none"
              >
                <div className="relative lg:w-1/3 my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                      {isEdit === true ? 'Edit Store' : 'Add Stores'}
                      </h3>
                    </div>
                    {/*body*/}
                    <form onSubmit={(event) => AddStores(event)} className="my-5 flex flex-wrap">
                      <div className="w-full  px-5">
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
                      <div className="w-full px-5">
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
                      <div className="flex items-center justify-end p-6 rounded-b">
                      <button
                        className="text-slate-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => closeFunction()}
                      >
                        Close
                      </button>
                      <button
                        className="bg-slate-500 text-white active:bg-slate-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                         {isEdit === true ? 'Edit Store' : 'Add Stores'}
                      </button>
                    </div>
                      <div>

                      </div>
                    </form>
                  
                  </div>
                </div>
                <ToastContainer />
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}


        </div>

        <table className="table-auto w-full text-center mt-7">
          <thead>
            <tr className="border-b-2">
              <th>S.No</th>
              <th>Store Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr className="border-b-2">
                <td>{index + 1}</td>
                <td>{store.storeName}</td>
                <td>{store.storeLocation}</td>
                <td>
                  <button onClick={() => EditStore(store)} className="bg-green-500 py-1 px-2 text-white m-1 rounded-md">
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