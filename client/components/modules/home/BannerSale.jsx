'use client'
import React from 'react'
import { m } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function BannerSale() {
    const router = useRouter()
    return (
    <m.section
        onClick={() => router.push('/products')}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: 'tween', delay: 0.2 }}
        className="my-10 hover:cursor-pointer"
    >
          <div
        className="flex w-full"
        style={{
          backgroundImage: "url('/assets/images/Banner.jpg')",
          height: "400px", // Match the image height
          width: "auto",
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "repeat",
          imageRendering:"high-quality",
        }}
      ></div>
    </m.section>
  );
}
