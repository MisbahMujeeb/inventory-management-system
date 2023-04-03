import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { MongoServerError } from 'mongoose';



const AddItems = () => {
  const [isEdit, setEdit] = useState(false)
  const location = useLocation();
  const product = location.state?.product;
  const productId = product?._id;

  const navigate = useNavigate()



  // const [products, setProducts] = useState({ productName: '', productQuantity: 1, productManufacturer: "", productDescription: "" });
  const [products, setProducts] = useState(productId ? { 
    productName: product.productName,
    productQuantity: 1, // default quantity set to 10
    productPrice: product.productPrice, 
    productManufacturer: product.productManufacturer,
    productDescription: product.productDescription,
    userId: product.userId,
  } : { 
    productName: '', 
    productQuantity: 1, 
    productPrice:'',
    productManufacturer: "", 
    productDescription: "", 
    userId: '' 
  });



    useEffect(() => {
      const varifyUser = async () => {
          const { data } = await axios.post(
            'http://localhost:4000/', {}, { withCredentials: true }
          )
          if (!data.status) {
            toast(`User id Not Found`, { theme: 'dark' })
          } else { 
            setProducts({userId: data.uId , productQuantity:1 })
        }
      }
      varifyUser()
    }, [])

    const HandleSubmit = async (event) => {
  
      event.preventDefault();
      if (!products.productName || !products.productManufacturer || !products.productDescription) {
        toast.error('Please fill out all fields');
      } else {
        try {
          
          let data = null;
          if (productId) {
            console.log('edited');
            data = await axios.put(`http://localhost:4000/editProduct/${productId}`, { ...products });
          } else {
            data = await axios.post('http://localhost:4000/addProducts', { ...products });
          }
    
          if (data.data.success) {
            toast.success(data.data.message);
            setProducts({ productName: '', productQuantity: 1,productPrice:'', productManufacturer: '', productDescription: '' });
            navigate('/MyStock')
          } else {
            toast.error(data.data.message || 'Failed to add product');
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
          // console.log(error);
          // toast.error('Failed to add product');
        }
      }
    };
    


  


  useEffect(() => {
    if (productId) {
      setEdit(true)
    } else {
      setEdit(false)
    }
  }, [])



  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col w-full text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            {isEdit == true ? 'Edit Items' : 'Add Items'}

          </h1>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div >
            <form onSubmit={(e) => HandleSubmit(e)} className="flex flex-wrap -m-2">
              <ToastContainer />
              
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">Name</label>
                  <input type={'text'}
                    placeholder='Enter Name'
                    maxLength={40}
                    name='productName'
                    // value={products.productName}
                    value={products.productName}
                    
                    onChange={(e) =>
                      setProducts({ ...products, productName: e.target.value })
                    }
                    className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400'
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">Manufacturer</label>
                  <input type={'text'}
                    placeholder='Enter Manufacturer'
                    maxLength={40}
                    // value={products.productManufacturer}
                    value={products.productManufacturer}
                    name='productManufacturer'
                    onChange={(e) =>
                      setProducts({ ...products, productManufacturer: e.target.value })
                    }
                    className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400'
                  />
                </div>
             
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">Price</label>
                  <input type={'number'}
                    placeholder='Enter Price'
                    maxLength={40}
                    // value={products.productManufacturer}
                    value={products.productPrice}
                    name='productManufacturer'
                    onChange={(e) =>
                      setProducts({ ...products, productPrice: e.target.value })
                    }
                    className='block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400'
                  />
                </div>
                </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">Description</label>
                  <textarea id="message"
                    //  value={products.productDescription}
                    value={ products.productDescription}

                    onChange={(e) =>
                      setProducts({ ...products, productDescription: e.target.value })
                    }
                    name="message" className="block rounded-lg bg-gray-100 w-full p-2.5 border border-gray-400"></textarea>
                </div>
              </div>
              {/* <div className="p-2 w-full  ">
                <button type='submit' className="flex text-white mx-auto bg-slate-700 border-0 py-2 px-8
          focus:outline-none hover:bg-slate-800 rounded text-lg">Submit</button>

              </div> */}
              <div className="p-2 w-full">
  <button
    type="submit"
    className=" bg-slate-700 focus:outline-none duration-200 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded w-full"
  >
    Submit
  </button>
</div>
<div className="p-2 w-full">
  {productId ? (
    <button
      type="button"
      onClick={() => navigate('/MyStock')}
      className=" hover:bg-gray-700 duration-200 hover:text-white text-slate-700 border border-slate-800 font-bold py-2 px-4 rounded w-full"
    >
      Back
    </button>
  ) : null}
</div>

            </form>

          </div>
        </div>
      </div>
    </section>


  )
}

export default AddItems