import { Skeleton } from '@mui/material'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ProductImage({ product, className }) {
    const [loading, setLoading] = useState(true)
    const [activeImage, setActiveImage] = useState(0)
    const images = product?.image || []

    useEffect(() => {
    setLoading(!product?.image?.length)
    }, [product])

    return (
    <div className={`flex flex-col xl:flex-row gap-6 items-center ${className}`}>
      {/* Thumbnails */}
        <div className="flex xl:flex-col gap-3 cursor-pointer">
        {loading
            ? [...Array(4)].map((_, idx) => (
                <Skeleton key={idx} variant="rectangular" width={80} height={80} />
            ))
            : images.slice(0, 4).map((image, idx) => (
                <Image
                key={idx}
                src={image}
                alt="product thumbnail"
                width={80}
                height={80}
                className={`rounded-lg object-cover transition-transform duration-200 ${
                    activeImage === idx ? 'ring-2 ring-black scale-105' : 'opacity-80 hover:opacity-100'
                }`}
                onMouseEnter={() => setActiveImage(idx)}
                />
            ))}
        </div>

      {/* Main Image */}
        <div className="relative w-[400px] h-[500px] flex items-center justify-center">
        {loading ? (
            <Skeleton variant="rectangular" width={400} height={500} />
        ) : (
            <Zoom>
            <Image
                src={images[activeImage] || images[0]}
                alt="product"
                width={400}
                height={500}
                className="rounded-2xl object-cover shadow-lg transition-all duration-300 hover:scale-105"
            />
            </Zoom>
        )}
        </div>
    </div>
    )
}
