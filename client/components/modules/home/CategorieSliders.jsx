'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import { m } from 'framer-motion'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import { useRouter } from 'next/navigation'
import Heading from '@/components/custom/Heading'
import { CATEGORY_SLIDES } from '@/constants/categoriedata'
import Image from 'next/image'

export default function Categories() {
  const animation = {
    hide: { scale: 0.9, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const router = useRouter()

  const handleClick = (link) => {
    router.push(link)
  }

  return (
    <m.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-10"
    >
      <Container className="mx-auto">
        <Row className="mb-10">
          <Heading name="shop by top categories" />
        </Row>

        <Swiper
          breakpoints={{
            360: { slidesPerView: 1, spaceBetween: 40 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1440: { slidesPerView: 4, spaceBetween: 80 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={50}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {CATEGORY_SLIDES.map((item, idx) => (
            <SwiperSlide key={idx} className="relative cursor-pointer group">
              <m.div
                className="h-[600px] w-full bg-cover bg-top duration-300 ease-out hover:scale-95">
                <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                quality={75}
                loading="lazy"
              />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-md p-4 shadow-xl cursor-pointer transition-all duration-300 group-hover:bg-black">
                  <m.h6
                    initial={animation.hide}
                    whileInView={animation.show}
                    className="capitalize transition-all duration-300 group-hover:text-white text-black"
                    onClick={() => handleClick(item.link)}
                  >
                    {item.title}
                  </m.h6>
                </div>
              </m.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </m.section>
  )
}