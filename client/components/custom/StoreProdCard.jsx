import {
    getBestPriceWithDiscountFromProduct,
    getBestPriceWithoutDiscountFromProduct,
    getDiscountRate,
} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from './FormatCurrency'
import { Eye } from 'lucide-react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'
import { m } from 'framer-motion'

export default function StoreProdCard({ product }) {
    const bestPriceWithDiscount = getBestPriceWithDiscountFromProduct(product)
    const bestPriceWithoutDiscount = getBestPriceWithoutDiscountFromProduct(product)
    const discountRate = getDiscountRate(bestPriceWithoutDiscount, bestPriceWithDiscount)
    
    const router = useRouter()
    
    return (
        <div className="flex flex-col gap-4 items-center cursor-pointer">
            {/* Product Image */}
            <div
                role="button"
                data-cy="productItem"
                onClick={() => router.push(`/products/${product._id}`)}
                className="relative group w-full h-[500px] overflow-hidden rounded-2xl shadow-md cursor-pointer"
                >
                {/* First Image */}
                <Image
                    src={product?.image?.[0] || "/assets/images/placeholder.jpg"}
                    alt={product?.productName || "Product image"}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                />

                {/* Second Image on hover */}
                {product?.image?.[1] && (
                    <Image
                    src={product.image[1]}
                    alt={product.productName}
                    width={500}
                    height={500}
                    className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                    />
                )}

                {/* Hover Actions (like Eye icon) */}
                <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="absolute top-4 right-4 flex-col gap-4 hidden group-hover:flex"
                >
                    <Button
                    onClick={() => router.push(`/products/${product._id}`)}
                    variant="outline"
                    size="icon"
                    className="backdrop-blur-sm bg-white/70 hover:bg-black hover:text-white shadow-md transition"
                    >
                    <Eye />
                    </Button>
                </m.div>

                {/* Optional: Product Name Overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-xl font-semibold">{product?.productName}</p>
                </div>
                </div>

            
            {/* Product Content */}
            <div className="flex flex-col gap-4 items-start py-4">
            <h5 className="capitalize">
            {product?.productName ? product.productName.substring(0, 20) + ".." : "No Name"}
            </h5>
            <p className="capitalize text-sm">
            {product?.productDescription ? product.productDescription.substring(0, 30) + ".." : "No description"}
            </p>
                
                <div className="inline-flex justify-center gap-4 items-center">
                    {discountRate > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            <CurrencyFormat
                                value={bestPriceWithDiscount}
                                className="font-bold text-black text-left w-20 text-3xl"
                            />
                            <CurrencyFormat
                                value={bestPriceWithoutDiscount}
                                className="line-through w-18 text-slate-600 hidden lg:flex"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            <CurrencyFormat
                                value={bestPriceWithoutDiscount}
                                className="font-bold text-black"
                            />
                            <CurrencyFormat
                                value={bestPriceWithoutDiscount}
                                className="line-through w-18 text-sm opacity-0 hidden lg:flex"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
