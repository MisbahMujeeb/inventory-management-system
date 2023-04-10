import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const PurchaseItem = () => {
  const [showModal, setShowModal] = useState(false);
  const [productsName, setProductsName] = useState([]);
  const [userId, setUserId] = useState('')
  const [values , setValues] = useState({purchaseProductsId: '' , purchaseQuantity:'' ,purchasePrice : 0, purchaseDate : '' ,userId:''  })
  const [purchaseData, setPurchaseData] = useState([])
  const [isEdit, setIsEdited] = useState(false)
  const [purchaseItemId, setPurchaseItem] = useState('')



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
    fetchData()
  }, [userId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/fetchPurchaseItem/${userId}`)
        setPurchaseData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userId])
  
  
  const EditPurchaseItem = (purchaseItem) => {
    setValues({
    purchaseProductsId: purchaseItem.purchaseProductsId,
    purchaseQuantity: purchaseItem.purchaseQuantity,
    purchasePrice: purchaseItem.purchasePrice,
    purchaseDate: purchaseItem.purchaseDate,
    });
    setShowModal(true);
    setIsEdited(true);
    setPurchaseItem(purchaseItem._id);
    };

  const AddPurchaseDetails = async (event) => {
    event.preventDefault();
    try {
      let data = null;
      if (isEdit) {
        console.log('edited');
        data = await axios.put(`http://localhost:4000/editPurchaseItem/${purchaseItemId}`, { ...values });
      } else {
        data = await axios.post('http://localhost:4000/addPurchaseItem', { ...values });
     }

      if (data.data.success) {
        toast.success(data.data.message);
        setValues({purchaseProductsId: '' , purchaseQuantity:'' ,purchasePrice : 0, purchaseDate : '' ,userId:''  });
        setShowModal(false)
        window.location.reload()
      } else if (data.data.error && data.data.error.message === "The product already exists In Purchase List frontend.") {
        toast.error(data.data.error.message); // Show error toast for duplicate key error
      } else if (data.data.error) {
        toast.error(data.data.error.message || 'Failed to add product In Purchase List.'); // Show server error message
      } else {
        toast.error('Failed to add product In Purchase List.'); // Show generic error toast
      }
    } catch (error) {
      console.log(error.code)
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add Purchase.'); // Show generic error toast
      }
      // if(err.code === 11000){
      //   toast.error('Failed to do Purchase because it already present in list .please update previous.');
      // }else{
      //   toast.error('Failed to do Purchase.'); // Show generic error toast
      // }
  }
  }

  const DeletePurchaseItem = async (id) => {
    //  console.log('id', id);
    try {
      const { data } = await axios.delete(`http://localhost:4000/deletePurchaseItem/${id}`);
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
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Purchase Item</h1>
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
                      {isEdit === true ? 'Edit Purchase Detail' : 'Add Purchase Detail'}
                    </h3>
                  </div>
                  <form onSubmit={(event) => AddPurchaseDetails(event)}>
                  {/*body*/}
                  <div className="relative p-6 flex-auto ">
                    <div className='flex row'>
                      <div className='w-1/2 p-3'>
                        <label>Product Name</label>
                        <select
                          id="category"
                          name='purchaseProductsId'
                          value={values.purchaseProductsId}
                          className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          onChange={(e) =>
                            setValues({ ...values, purchaseProductsId: e.target.value })
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
                      <div className='w-1/2 p-3'>
                        <label>Quantity</label>
                        <input type="number" 
                        name='purchaseQuantity'
                        value={values.purchaseQuantity}
                        min={1} id="" 
                         onChange={(e) =>
                            setValues({ ...values, purchaseQuantity: e.target.value })
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
                        <label>Total Buying Price </label>
                        <input type="number"
                          value={values.purchasePrice}
                         onChange={(e) =>
                            setValues({ ...values, purchasePrice: e.target.value })
                          }
                         id="" name="purchasePrice" className="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-slate-500 focus:bg-white focus:ring-2
               focus:ring-slate-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                      </div>
                      <div className='w-1/2 p-3'>
                        <label>Buying Date</label>
                        <input type="date" id="" 
                          value={values.purchaseDate}
                        name="purchaseDate" 
                         onChange={(e) =>
                            setValues({ ...values, purchaseDate: e.target.value })
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
                      {isEdit === true ? 'Edit Purchase Detail' : 'Add Purchase Detail'}
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
              <th>Quantity</th>
              <th>Buying Price</th>
              <th>Buying Date</th>
              {/* <th>Description</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData && purchaseData.map((purchaseItem, index) => (
              <tr key={index} className='border-b-2'>
                <td>{index + 1}</td>
                {/* <td>{purchaseItem.purchaseProductsId}</td> */}
                <td>
                  {productsName.filter( p => p._id === purchaseItem.purchaseProductsId ).map(p => p.productName)}
                </td>
                <td>{purchaseItem.purchaseQuantity}</td>
                <td>{purchaseItem.purchasePrice}</td>
               <td>{purchaseItem.purchaseDate}</td>
                <td>
                  <button className='bg-green-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => EditPurchaseItem(purchaseItem)}>Edit</button>
                  <button className='bg-red-500 py-1 px-2 text-white m-1 rounded-md' onClick={() => DeletePurchaseItem(purchaseItem._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PurchaseItem