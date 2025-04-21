'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './style.css'
import { m } from 'framer-motion'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Button } from '@/components/custom/Button'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import { slidesData } from '@/constants/sliderData'
import Image from 'next/image'

export default function HomeSlider() {
  const animation = {
    hide: { x: 60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <section className="relative overflow-hidden">
      <Container>
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="rounded-3xl shadow-xl"
        >
          {slidesData.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="relative"
              style={{
                height: '700px',
                width: '100%',
              }}
            >
              <Image
                src={item.image}
                alt={item.title || 'Slide Image'}
                layout="fill"
                objectFit="cover"
                quality={75}
                loading="lazy"
              />
              {item.title ? (
                <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                  <div className="ml-8 md:ml-20 space-y-6 max-w-xl text-white">
                    <m.h4
                      initial={animation.hide}
                      whileInView={animation.show}
                      className="text-base md:text-xl font-light tracking-wide"
                    >
                      {item.subtitle.substring(0, 65)}
                    </m.h4>
                    <m.h1
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-6xl font-bold"
                    >
                      {item.title}
                    </m.h1>
                    <m.p
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.4 }}
                      className="text-sm md:text-lg font-light leading-relaxed"
                    >
                      {item.description}
                    </m.p>
                    <m.a
                      initial={animation.hide}
                      whileInView={animation.show}
                      transition={{ delay: 0.6 }}
                      href={`/${item.link}`}
                      className="inline-block px-6 py-3 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition"
                    >
                      {item.btn}
                    </m.a>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Button
                    variant="contained"
                    size="large"
                    className="px-12 py-6 rounded-full text-black bg-white hover:bg-black hover:text-white text-xl tracking-wider"
                  >
                    <Link href={item.link}>BUY NOW</Link>
                  </Button>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  )
}
