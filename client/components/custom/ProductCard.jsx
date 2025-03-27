import {
    getBestPriceWithDiscountFromProduct,
    getBestPriceWithoutDiscountFromProduct,
    getDiscountRate,
} from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import CurrencyFormat from './FormatCurrency'
import { Eye, Heart } from "lucide-react"
import { Button } from './Button'
import { useRouter } from 'next/navigation'
import {m} from 'framer-motion'


export default function ProductCard({ product }) {
    const active = 0
    const bestPriceWithDiscount = getBestPriceWithDiscountFromProduct(product)
    const bestPriceWithoutDiscount = getBestPriceWithoutDiscountFromProduct(product)
    const discountRate = getDiscountRate(bestPriceWithoutDiscount, bestPriceWithDiscount)
    
    const router = useRouter()

    const addToWishList = (e) => {
        e.currentTarget.setAttribute("disabled", true)
    }


    return (
        <div className='flex flex-col gap-4 items-center cursor-pointer'> 
        <div 
            role='button'
            onClick={() => router.push(`/product/${product._id}`)}
            className='flex group/image h-[500px] relative overflow-hidden'>
                <Image
                    src = {product?.image?.[0] || "/assets/images/w1.jpg" }
                    alt = {product?.productName || "Product image"}
                    width = "300"
                    height = "450"
                    className = "duration-300 ease-linear group-hover/image:translate-x-full "
                />
                    <Image
                    src={product?.image?.[1] || "/assets/images/men1.jpg"}
                    alt={product?.productName || "Product image"}
                    width="300"
                    height="400"
                    className="absolute duration-300 ease top-0 -translate-x-full group-hover/image:translate-x-0"
                    />
                    
                <m.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="hidden absolute top-4 right-4 flex-col gap-4 group-hover/image:flex duration-300 ease-in"
                >
                    <Button
                        onClick={() => router.push(`/product/${product._id}`)}
                        variant="outline"
                        size="icon"
                        className="hover:bg-black hover:text-white"
                    >
                        <Eye />
                    </Button>
                    <Button
                        onClick={addToWishList}
                        variant="outline"
                        size="icon"
                        className="hover:bg-black hover:text-white"
                    >
                        <Heart />
                    </Button>
                </m.div>
            </div>

            {/* Product Info */} 
            <div className='flex flex-col gap-4 items-start py-4'>
                <h5 className='capitalize'>
                    {product?.productName ? product.productName.substring(0, 20) + ".." : "No Name"}
                </h5>
                <p className='capitalize text-sm'>
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


