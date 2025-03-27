'use client'

import Container from '@/components/custom/Container'
import { Button } from '@/components/custom/Button'
import { Input } from '@mui/material'
import { Separator } from '@/components/custom/separtor'
import { Loader2Icon, Mail, MapPin, MoveRight, PhoneCall } from 'lucide-react'
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
} from 'react-icons/fa'
import Link from 'next/link'
import React, { useState } from 'react'
import { m } from 'framer-motion'
import Loading from '@/components/custom/Loading'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'

export default function Footer() {
  const [loading, setLoading] = useState(false)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <>
      {loading && <Loading isLoading={true} />}
      <m.footer
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black py-10"
      >
        <Container>
          <div className="flex-col gap-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 text-slate-200 text-xl">
              <ul className="flex flex-col gap-4">
                <li className="my-10">
                  <h1 className="text-3xl font-bold text-white tracking-wider">
                    EL Boutique
                  </h1>
                </li>
                <li className="flex gap-4">
                  <PhoneCall /> (216) 123456789
                </li>
                <li className="flex gap-4">
                  <Mail /> el@boutique.store
                </li>
                <li className="flex gap-4">
                  <MapPin /> Tunisia , Monastir
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="my-10">
                  <h1 className="text-2xl font-bold text-white tracking-wider">
                    Informations
                  </h1>
                </li>
                <li className="flex gap-4">
                  <Link
                    className="flex gap-4 hover:text-gray-600"
                    href="/account/dashboard"
                  >
                    My account
                  </Link>
                </li>
                <li className="flex gap-4">
                  <Link
                    className="flex gap-4 hover:text-gray-600"
                    href={isAuthenticated ? '/account/dashboard' : '/sign-in'}
                  >
                    {isAuthenticated ? 'Dashboard' : 'Login'}
                  </Link>
                </li>
                <li className="flex gap-4 hover:text-gray-600">
                  <Link className="flex gap-4" href="/cart">
                    My cart
                  </Link>
                </li>
                <li className="flex gap-4 hover:text-gray-600">
                  <Link className="flex gap-4" href="/checkout">
                    Checkout
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li className="my-10">
                  <h1 className="text-2xl font-bold text-white tracking-wider">
                    Services
                  </h1>
                </li>
                <li className="flex gap-4">
                  <Link href="#" className="flex gap-4 hover:text-gray-600">
                    About Us
                  </Link>
                </li>
                <li className="flex gap-4">
                  <Link href="#" className="flex gap-4 hover:text-gray-600">
                    Careers
                  </Link>
                </li>
                <li className="flex gap-4">
                  <Link href="#" className="flex gap-4 hover:text-gray-600">
                    Delivery Information
                  </Link>
                </li>
                <li className="flex gap-4">
                  <Link href="#" className="flex gap-4 hover:text-gray-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>

              <ul className="flex flex-col gap-4">
                <li className="my-10">
                  <h1 className="text-2xl font-bold text-white tracking-wider">
                    Subscribe
                  </h1>
                </li>
                <li className="flex gap-4">
                  <h6>
                    Enter your email to get apps, product and latest updates.
                  </h6>
                </li>
                <li className="flex gap-4">
                  <form className="flex w-full bg-gray-800 border border-white rounded-xl gap-4 items-center p-3">
                    <Mail size="40" />
                    <Input
                      className="rounded-xl py-4 bg-transparent text-white text-xl"
                      placeholder="Enter your email here"
                      max="40"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="icon"
                      className="bg-white text-black hover:bg-gray-400"
                    >
                      <MoveRight />
                    </Button>
                  </form>
                </li>
              </ul>
            </div>

            <Separator className="my-10" />

            <div className="flex my-10 flex-wrap lg:flex-nowrap gap-8 justify-between">
              <div className="inline-flex gap-4 text-white text-2xl">
                <FaCcVisa />
                <FaCcMastercard />
                <FaPaypal />
              </div>
              <div className="inline-flex gap-4 items-center text-slate-300 text-sm">
                @2025 El Boutique All rights reserved
              </div>
              <div className="inline-flex gap-4">
                <Button variant="outline" size="icon">
                  <FaFacebook />
                </Button>
                <Button variant="outline" size="icon">
                  <FaInstagram />
                </Button>
                <Button variant="outline" size="icon">
                  <FaTwitter />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </m.footer>
    </>
  )
}
