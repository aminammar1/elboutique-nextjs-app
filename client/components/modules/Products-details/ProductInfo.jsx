import { Rating } from '@mui/material'
import React from 'react'
import ProductPrice from './ProductPrice'

export default function ProductInfo({ product }) {
    const rating = product.rating || 0

    return (
    <div className="flex flex-col gap-4">
        <h4 className="capitalize font-bold text-2xl text-pretty" data-cy="nameItem">
        {product.productName}
        </h4>
        <h6 className="text-balance capitalize">{product.productDescription}</h6>
      {/* Ratings  */}
        <div className="inline-flex text-slate-700 items-center gap-4">
        <Rating
            name="product rating"
            readOnly
            value={rating}
            precision={0.5}
            style={{ color: 'orange' }}
        />
        <div className="flex gap-4 text-xl text-gray-400">
            <strong>{rating}</strong> (reviews)
        </div>
        </div>

        <ProductPrice product={product} />
    </div>
    )
}
