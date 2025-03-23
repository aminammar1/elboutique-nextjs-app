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
                className="flex group/image h-[400px] relative overflow-hidden"
            >
                    <Image
                    src={product?.image?.[0] || "/default-image.webp"}
                    alt={product?.productName || "Product image"}
                    width="300"
                    height="400"
                    className="duration-300 ease-linear group-hover/image:translate-x-full object-cover"
                />
                {product?.image?.[1] && (
                <Image
                    src={product.image[1]}
                    alt={product.productName}
                    width="300"
                    height="450"
                    className="absolute duration-300 ease top-0 -translate-x-full group-hover/image:translate-x-0"
                />
            )}
                <m.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="hidden absolute top-4 right-4 flex-col gap-4 group-hover/image:flex duration-300 ease-in"
                >
                    <Button
                        onClick={() => router.push(`/products/${product._id}`)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-black hover:text-white"
                    >
                        <Eye />
                    </Button>
                </m.div>
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
                                className="font-bold text-primary-900 text-left w-20 text-3xl"
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
                                className="font-bold text-primary-900"
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
