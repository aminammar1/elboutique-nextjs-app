import CurrencyFormat from '@/components/custom/FormatCurrency'
import { discountPrice } from '@/lib/utils'
import React from 'react'

export default function ProductPrice({ product }) {
    return (
    <div className="flex gap-2 flex-col">
        <div className="flex items-center gap-8">
        <h2 className="text-black">
            <CurrencyFormat
            data-cy="priceItem"
            className="text-4xl text-black"
            value={
                product.discount > 0
                ? discountPrice(product.price, product.discount)
                : product.price
            }
            />
        </h2>
        {product.discount > 0 && (
            <h4 className="">
            <CurrencyFormat
                className="text-h3 line-through text-gray-400"
                value={product.price}
            />
            </h4>
        )}
        </div>

      {/* Stock display */}
        <div className="text-sm font-normal text-red-600">
        {product.stockCount > 0
            ? `${product.stockCount} left hurry up 👀`
            : 'Out of stock ❌! '}
        </div>
    </div>
    )
}
