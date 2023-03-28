import React from 'react'

const MyStock = () => {
    return (
        <section class="text-gray-600 body-font relative">
            <div class="container px-10 py-5 mx-auto">
                <div class="flex flex-col w-full">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">My Stock</h1>
                </div>
                <table class="table-auto w-full text-center ">
                    <thead>
                        <tr className='border-b-2'>
                            <th>S.No</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-b-2'>
                            <td>1</td>
                            <td>Malcolm Lockyer</td>
                            <td>50</td>
                        </tr>
                        <tr className='border-b-2'>
                            <td>2</td>
                            <td>The Eagles</td>
                            <td>12</td>
                        </tr>
                        <tr className='border-b-2'>
                            <td>3</td>
                            <td>Earth, Wind, and Fire</td>
                            <td>19</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default MyStock