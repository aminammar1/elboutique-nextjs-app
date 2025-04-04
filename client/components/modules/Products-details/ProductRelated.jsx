import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import { m } from 'framer-motion';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import Container from '@/components/custom/Container'
import Heading from '@/components/custom/Heading'
import Row from '@/components/custom/Row'
import ProductCard from '@/components/custom/ProductCard'
import Loading from '@/components/custom/Loading'
import { fetchProductsByCategory } from '@/actions/product'

export default function RelatedProducts({ product }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            if (!product || !product.category || !Array.isArray(product.category) || product.category.length === 0) return

            setLoading(true)
            try {
                const categoryName = product.category[0]
                
                if (!categoryName) {
                    console.error('No valid category name found')
                    return
                }

                const relatedProducts = await fetchProductsByCategory(categoryName, product._id)
                setProducts(relatedProducts.data || [])
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [product])

    return (
        <m.section
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn', delay: 0.3, type: 'tween' }}
            className="mt-0 pb-10"
        >
            <Container>
                <Row className="mb-10">
                    <Heading name="They also bought" />
                </Row>
                {loading ? (
                    <Loading isLoading={loading} />
                ) : (
                    <Swiper
                        breakpoints={{
                            360: { slidesPerView: 1, spaceBetween: 40 },
                            575: { slidesPerView: 2, spaceBetween: 40 },
                            768: { slidesPerView: 2, spaceBetween: 40 },
                            1024: { slidesPerView: 3, spaceBetween: 40 },
                            1280: { slidesPerView: 3, spaceBetween: 40 },
                            1440: { slidesPerView: 4, spaceBetween: 100 },
                            1680: { slidesPerView: 4, spaceBetween: 100 },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation={false}
                        pagination={true}
                        modules={[Autoplay, Navigation, Pagination]}
                        className={cn('swiper')}
                    >
                        {products.length > 0 ? (
                            products.map((item, idx) => (
                                <SwiperSlide key={idx} className="relative [&>button:block]">
                                    <ProductCard product={item} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="text-center py-10">No related products found</div>
                        )}
                    </Swiper>
                )}
            </Container>
        </m.section>
    )
}
