'use client'

import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import Loading from '@/components/custom/Loading'
import Heading from '@/components/custom/Heading'
import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import ProductCard from '@/components/custom/ProductCard'
import { fetchProducts } from '@/actions/product'

export default function BestSale() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

        useEffect(() => {
            const getProducts = async () => {
            setLoading(true)
            try {
                const data = await fetchProducts()
                const limitedData = data.slice(0, 6)
                setProducts(limitedData)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
            }
            getProducts()
        }, [])

    return (
    <>
        {loading ? <Loading isLoading={loading} /> : ""}

        <m.section
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
            duration: 0.3,
            ease: 'easeIn',
            delay: 0.3,
            type: 'tween',
        }}
        className="mt-20 pb-10"
        >
        <Container>
            <Row className="mb-10">
            <Heading name="Our Bestseller" />
            </Row>
            <Swiper
            breakpoints={{
              // when window width is >= 340
                360: {
                slidesPerView: 1,
                spaceBetween: 40,
                },
              // when window width is >= 768
                575: {
                slidesPerView: 2,
                spaceBetween: 40,
                },

                768: {
                slidesPerView: 2,
                spaceBetween: 40,
                },
              // when window width is >= 1024
                1024: {
                slidesPerView: 3,
                spaceBetween: 40,
                },
                1280: {
                slidesPerView: 3,
                spaceBetween: 40,
                },
                1440: {
                slidesPerView: 4,
                spaceBetween: 100,
                },
                1680: {
                slidesPerView: 4,
                spaceBetween: 100,
                },
            }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            spaceBetween={50}
            slidesPerView={1}
            navigation={false}
            pagination={
                {clickable: true}
            }
            history={{
                key: 'slide',
            }}
            modules={[Autoplay, Navigation, Pagination]}
            className={cn('py-10')}
            >
            {products.map((product) => (
                <SwiperSlide
                key={product._id}
                className="relative  [&>button:block]"
                >
                <ProductCard product={product} />
                </SwiperSlide>
            ))}
            </Swiper>
        </Container>
        </m.section>
    </>
    )
}
