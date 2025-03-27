'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Countdown from 'react-countdown'
import { m } from 'framer-motion'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Button } from '@/components/custom/Button'
import Container from '@/components/custom/Container'

const slides = [
  {
    id: 1,
    image: '/assets/images/spring-women.jpg',
    discount: '30% OFF',
    label: '01 — Spring Sale',
  },
  {
    id: 2,
    image: '/assets/images/summer-image.jpg',
    discount: '40% OFF',
    label: '02 — Summer Collection',
  },
  {
    id: 3,
    image: '/assets/images/w1.jpg',
    discount: '50% OFF',
    label: '03 — Winter Special',
  },
]

export default function DealsOfTheMonth() {
  const router = useRouter()

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <m.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: 'tween' }}
            className="flex flex-col items-start space-y-8"
          >
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-950">
              Deals Of The Month
            </h2>
            <p className="text-gray-600 text-lg">
              Exclusive limited-time offers on our premium collection. Shop now
              and enjoy massive discounts on our most popular fashion items
              before they're gone.
            </p>
            <Button
              onClick={() => router.push('/products')}
              className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 transition-colors rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Collection
            </Button>
            <div className="text-2xl font-semibold mt-8 text-gray-800">
              Hurry, Before It's Too Late!
            </div>
            <div className="flex gap-8">
              <Countdown
                date={Date.now() + 172800000}
                renderer={({ days, hours, minutes, seconds }) => (
                  <div className="flex gap-6">
                    {[
                      { label: 'Days', value: days },
                      { label: 'Hours', value: hours },
                      { label: 'Mins', value: minutes },
                      { label: 'Sec', value: seconds },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col items-center">
                        <span className="text-3xl font-bold bg-black text-white w-16 h-16 flex items-center justify-center rounded-lg shadow-md">
                          {value}
                        </span>
                        <span className="text-gray-700 mt-2 font-medium">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </div>
          </m.div>

          {/* Right Section - Swiper Slider */}
          <m.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, type: 'tween' }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active',
                bulletClass: 'swiper-pagination-bullet',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              className="relative w-full h-[600px] deal-slider"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id} className="relative group overflow-hidden">
                <div className="relative w-full h-[600px]">
                  <Image
                    src={slide.image}
                    alt="Fashion Deal"
                    width={1200}  // Set width
                    height={600}  // Set height
                    objectFit="cover"
                    priority
                  />
                </div>
                <m.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-8 left-8"
                >
                  <span className="text-sm font-medium text-white bg-black bg-opacity-70 px-3 py-1 rounded-full">
                    {slide.label}
                  </span>
                  <div className="bg-white px-6 py-3 text-black font-bold text-xl rounded-lg mt-3 shadow-lg transform hover:scale-105 transition-transform">
                    {slide.discount}
                  </div>
                </m.div>
              </SwiperSlide>
              
              ))}
              <div className="swiper-button-prev !text-white !bg-black !w-12 !h-12 !rounded-full grid place-items-center !opacity-80 hover:!opacity-100 transition-opacity"></div>
              <div className="swiper-button-next !text-white !bg-black !w-12 !h-12 !rounded-full grid place-items-center !opacity-80 hover:!opacity-100 transition-opacity"></div>
            </Swiper>
          </m.div>
        </div>
      </Container>
    </section>
  )
}
