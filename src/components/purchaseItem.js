import React from 'react'

const PurchaseItem = () => {
  return (
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-5 mx-auto">
        <div class="flex flex-col w-full text-center">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Purchase Item</h1>
        </div>
        <div className=' w-full flex row'>
          <div className='w-1/3 p-3'>
            <label>Invoice No</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3  p-3'>
            <label>Bill Date</label>
            <input type="date" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3 p-3'>
            <label>Total Stock Of Item</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className='w-full flex row'>
          <div className='w-1/3 p-3'>
            <label>Supplier Name D</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3  p-3'>
            <label>Carring Charges</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3 p-3'>
            <label>Receive Date</label>
            <input type="date" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className=' w-full flex row'>
          <div className='w-1/3 p-3'>
            <label>Item name D</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-2/3 flex row'>
          <div className='w-1/3  p-3'>
            <label>Quantity</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3 p-3'>
            <label>Price</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className='w-1/3 p-3'>
            <label>Total</label>
            <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          </div>
        </div>
        <div className='w-1/3 mx-auto my-10'>
          <h1 className='text-lg font-bold'>Total Amount</h1>
          <input type="text" id="" name="" class="w-full
             bg-gray-100 bg-opacity-50 rounded border border-gray-300
              focus:border-indigo-500 focus:bg-white focus:ring-2
               focus:ring-indigo-200 text-base outline-none
                text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <div class="p-2 w-full ">
              <button class="flex text-white mx-auto bg-slate-700 border-0 py-2 px-8
          focus:outline-none hover:bg-slate-800 rounded text-lg">Add</button>
            </div>    
                </div>
      </div>
    </section>
  )
}

export default PurchaseItem