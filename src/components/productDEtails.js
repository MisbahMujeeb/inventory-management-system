import React from 'react'
import { useLocation } from 'react-router-dom';

const ProductDEtails = () => {
    const location = useLocation();

    const product = location.state?.product;
console.log(product)
  return (
    <div>ProductDEtails</div>
  )
}

export default ProductDEtails