'use client'

import React from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const instagramPosts = [
  {
    id: 1,
    image: '/assets/images/insta1.jpg',
    alt: 'Fashion model',
    link: 'https://instagram.com/',
  },
  {
    id: 2,
    image: '/assets/images/insta3.jpg',
    alt: 'Model in red outfit',
    link: 'https://instagram.com/',
  },
  {
    id: 3,
    image: '/assets/images/insta7.jpg',
    alt: 'Model with sunglasses',
    link: 'https://instagram.com/',
  },
  {
    id: 4,
    image: '/assets/images/kid1.jpg',
    alt: 'Model in blazer',
    link: 'https://instagram.com/',
  },
]

export default function SocialMedia() {
    return (
    <m.section
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{
        duration: 0.6,
        ease: 'anticipate',
        delay: 0.2,
        type: 'tween',
        }}
        className="py-20 px-6 bg-white text-black text-center"
    >
        <div className="max-w-6xl mx-auto">
        {/* Instagram Header */}
        <m.div
            initial={{
            opacity: 0,
            scale: 0.8,
            }}
            whileInView={{
            opacity: 1,
            scale: 1,
            }}
            transition={{
            type: 'spring',
            stiffness: 120,
            damping: 10,
            delay: 0.3,
            }}
            className="flex items-center justify-center gap-3 mb-8"
        >
            <FaInstagram className="text-4xl text-black" />
            <div className="h-[2px] w-16 bg-black"></div>
        </m.div>

        {/* Title */}
        <m.h2
            initial={{
            opacity: 0,
            y: 50,
            }}
            whileInView={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            duration: 0.7,
            ease: 'easeOut',
            delay: 0.4,
            }}
            className="text-6xl font-bold mb-6 tracking-tight"
        >
            Our Instagram Stories
        </m.h2>

        {/* Subtitle */}
        <m.p
            initial={{
            opacity: 0,
            }}
            whileInView={{
            opacity: 1,
            }}
            transition={{
            duration: 0.5,
            delay: 0.5,
            }}
            className="text-gray-600 max-w-xl mx-auto mb-16 text-lg"
        >
            Follow us on Instagram for the latest trends and exclusive offers.
        </m.p>

        {/* Instagram Gallery */}
        <div className="w-full">
          {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {instagramPosts.map((post, index) => (
                <m.div
                key={post.id}
                initial={{
                    opacity: 0,
                    y: 60,
                    rotate: -5,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                }}
                whileHover={{
                    scale: 1.05,
                    rotate: 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.2,
                }}
                className="relative aspect-square"
                >
                <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl group relative">
                    <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Link
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                    <div className="text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <FaInstagram className="text-white text-4xl mx-auto mb-2" />
                        <span className="font-medium">View Post</span>
                    </div>
                    </Link>
                </div>
                </m.div>
            ))}
            </div>

          {/* Mobile Swiper */}
            <div className="block md:hidden">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                pagination={{
                clickable: true,
                dynamicBullets: true,
                }}
                autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                }}
                className="instagram-swiper"
            >
                {instagramPosts.map((post) => (
                <SwiperSlide
                  key={post.id}
                  className="rounded-3xl overflow-hidden"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      className="object-cover"
                    />
                    <Link
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    >
                      <div className="text-white text-center">
                        <FaInstagram className="text-white text-4xl mx-auto mb-2" />
                        <span className="font-medium">View Post</span>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Instagram Follow Button */}
        <m.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            }}
            className="mt-16"
        >
          <m.div
                whileHover={{
                scale: 1.05,
                transition: {
                duration: 0.2,
                type: 'tween',
                },
            }}
                whileTap={{
                scale: 0.95,
                transition: {
                duration: 0.1,
                type: 'tween',
                },
            }}
            >
            <Link
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-black text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:bg-gray-800 hover:shadow-2xl"
            >
                Follow Us <FaInstagram className="inline ml-2" />
            </Link>
            </m.div>
        </m.div>
        </div>
    </m.section>
    )
}
