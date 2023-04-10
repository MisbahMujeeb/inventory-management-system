import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Sales = () => {
  const [showModal, setShowModal] = useState(false);
  const [productsName, setProductsName] = useState([]);
  const [storeName, setStoreName] = useState([]);
  const [userId, setUserId] = useState('')
  const [values , setValues] = useState({salesProductsId: '' ,salesStoreId: '' , salesQuantity:'' ,salesPrice : 0, salesDate : '' ,userId:''  })
  const [salesData, setSalesData] = useState([])
  const [isEdit, setIsEdited] = useState(false)
  const [salesItemId, setSalesItem] = useState('')



  useEffect(() => {
    const varifyUser = async () => {
      const { data } = await axios.post(
        'http://localhost:4000/', {}, { withCredentials: true }
      )
      if (!data.status) {
        toast(`User id Not Found`, { theme: 'dark' })
      } else {
        setUserId(data.uId)
        setValues({userId: data.uId})
      }
    }
    varifyUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchProducts/${userId}`)
        setProductsName(data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchStoresData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchStores/${userId}`)
        setStoreName(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStoresData()
    fetchData()
  }, [userId])

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchSales/${userId}`)
        setSalesData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userId])
  
  
  const EditSalesItem = (salesItem) => {
    setValues({
    salesProductsId: salesItem.salesProductsId,
    salesStoreId: salesItem.salesStoreId,
    salesQuantity: salesItem.salesQuantity,
    salesPrice: salesItem.salesPrice,
    salesDate: salesItem.salesDate,
    });
    setShowModal(true);
    setIsEdited(true);
    setSalesItem(salesItem._id);
    };

  const AddSalesDetails = async (event) => {
    event.preventDefault();
    try {
      let data = null;
      if (isEdit) {
        console.log('edited');
        data = await axios.put(`http://localhost:4000/editSales/${salesItemId}`, { ...values });
      } else {
        data = await axios.post('http://localhost:4000/addSales', { ...values });
     }

      if (data.data.success) {
        toast.success(data.data.message);
        setValues({salesProductsId: '',salesStoreId:'' , salesQuantity:'' ,salesPrice : 0, salesDate : '' ,userId:''  });
        setShowModal(false)
        window.location.reload()

      } else {
        toast.error(data.data.message || 'Failed to add sales');
      }
    } catch (err) {
        toast.error('Failed to do sales.'); // Show generic error toast
    
  }


  }


  const DeleteSalesItem = async (id) => {
    //  console.log('id', id);
    try {
      const { data } = await axios.delete(`http://localhost:4000/deleteSales/${id}`);
      //    setProducts(data)
      window.location.reload()
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <section className="text-gray-600 body-font relative">
      <div className="container align-middle px-5 py-5 mx-auto">
        <div className="flex flex-col w-full ">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Sales</h1>
        </div>

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
              <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {isEdit === true ? 'Edit sales Detail' : 'Add sales Detail'}
                    </h3>
                  </div>
                  <form onSubmit={(event) => AddSalesDetails(event)}>
                  {/*body*/}
                  <div className="relative p-6 flex-auto ">
                  <div className='flex row'>
                      <div className='w-full p-3'>
                        <label>Product Name</label>
                        <select
                          id="category"
                          name='salesProductsId'
                          value={values.salesProductsId}
                          className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          onChange={(e) =>
                            setValues({ ...values, salesProductsId: e.target.value })
                          }
                        >
                          <option>Select Product</option>
                          {productsName.map((element) => {
                            return (
                              <option value={element._id}>{element.productName}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <div className='flex row'>
                      <div className='w-1/2 p-3'>
                        <label>Store Name</label>
                        <select
                          name='salesStoreId'
                          value={values.salesStoreId}
                          className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          onChange={(e) =>
                            setValues({ ...values, salesStoreId: e.target.value })
                          }
                        >
                          <option>Select Store</option>
                          {storeName.map((element) => {
                            return (
                              <option value={element._id}>{element.storeName}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className='w-1/2 p-3'>
                        <label>Quantity</label>
                        <input type="number" 
                        name='salesQuantity'
                        value={values.salesQuantity}
                        min={0} id="" 
                         onChange={(e) =>
                            setValues({ ...values, salesQuantity: e.target.value })
                          }
                           className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                      </div>
                    </div>
                    <div className='flex row'>
                      <div className='w-1/2 p-3'>
                        <label>Sale Price</label>
                        <input type="number"
                          value={values.salesPrice}
                         onChange={(e) =>
                            setValues({ ...values, salesPrice: e.target.value })
                          }
                         id="" name="salesPrice" className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                      </div>
                      <div className='w-1/2 p-3'>
                        <label>Sale Date</label>
                        <input type="date" id="" 
                          value={values.salesDate}
                        name="salesDate" 
                         onChange={(e) =>
                            setValues({ ...values, salesDate: e.target.value })
                          }
                         className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-slate-500 text-white active:bg-slate-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      {isEdit === true ? 'Edit sales Detail' : 'Add sales Detail'}
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {/* Fetch Items */}
        <table className="table-auto w-full text-center mt-5 ">
          <thead>
            <tr className='border-b-2'>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Store Name</th>
              <th>Quantity</th>
              <th>Buying Price</th>
              <th>Buying Date</th>
              {/* <th>Description</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData && salesData.map((salesItem, index) => (
              <tr key={index} className='border-b-2'>
                <td>{index + 1}</td>
                {/* <td>{salesItem.salesProductsId}</td> */}
                <td>
                  {productsName.filter( p => p._id === salesItem.salesProductsId ).map(p => p.productName)}
                </td>
                <td>
                  {storeName.filter( p => p._id === salesItem.salesStoreId ).map(p => p.storeName)}
                </td>
                <td>{salesItem.salesQuantity}</td>
                <td>{salesItem.salesPrice}</td>
               <td>{salesItem.salesDate}</td>
                <td>
                  <button className='bg-green-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => EditSalesItem(salesItem)}>Edit</button>
                  <button className='bg-red-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => DeleteSalesItem(salesItem._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Sales