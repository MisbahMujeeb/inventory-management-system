import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDEtails = () => {
    const location = useLocation();

    const product = location.state?.product;

    const navigate = useNavigate()

    return (
      <section className="text-gray-600 body-font relative">
         <div className="container px-10 py-5 mx-auto">
        <div className="flex flex-col w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Product Detail</h1>
        </div>
        <div>
            <h1 className='my-2'><span className='text-slate-700 font-bold'>Name:</span> {product.productName}</h1>
            <h1 className='my-2'><span className='text-slate-700 font-bold'>Manufacturer:</span> {product.productManufacturer}</h1>
            <h1 className='my-2'><span className='text-slate-700 font-bold'>Quantity:</span> {product.productQuantity}</h1>
            {/* <h1 className='my-2'><span className='text-slate-700 font-bold'>Price:</span> {product.productPrice}</h1> */}
            <h1 className='my-2'><span className='text-slate-700 font-bold'>Description:</span> {product.productDescription}</h1>
            <button type='button'
            onClick={() => navigate('/MyStock')}
             className='my-2 hover:bg-slate-700 w-20 h-10 rounded hover:text-white border-2 border-slate-700'>Back</button>
        </div>
        </div>
      </section>
    )
}

export default ProductDEtails