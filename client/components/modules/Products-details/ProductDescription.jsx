import React from 'react'
import ProductImage from './ProductImage'
import ProductDetails from './ProductDetails'

export default function ProductDescription({ product, className }) {
    return (
    <div className={`flex flex-col lg:flex-row gap-[60px] ${className}`}>
        <ProductImage className="" product={product} />
        <ProductDetails className="flex-1" product={product} />
    </div>
    )
}
