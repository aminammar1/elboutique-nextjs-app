import React, { useState } from 'react'
import ProductInfo from './ProductInfo'
import ProductIcons from './ProductIcons'
import ProductShare from './ProductShare'
import ProductStyles from './ProductStyle'

export default function ProductDetails({ product, className }) {
    const [loading, setLoading] = useState(false)
    const [qty, setQty] = useState(1)
    const [selectedStyle, setSelectedStyle] = useState(null)
    const [activeStyleIndex, setActiveStyleIndex] = useState(0)

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <ProductInfo product={product} />
            <ProductIcons
                loading={loading}
                setLoading={setLoading}
                product={product}
                qty={qty}
                setQty={setQty}
            />
                <ProductStyles 
                product={product} 
                setStyle={setSelectedStyle}
                setActive={setActiveStyleIndex}
            />
            <ProductShare product={product} />
        </div>
    )
}