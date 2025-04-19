'use client'

import Container from '@/components/custom/Container'
import { Button } from '@/components/custom/Button'
import { Input } from '@mui/material'
import { Separator } from '@/components/custom/separtor'
import { Loader2Icon, Mail, MapPin, MoveRight, PhoneCall } from 'lucide-react'
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
} from 'react-icons/fa6'
import Link from 'next/link'
import React, { useState } from 'react'
import { m } from 'framer-motion'
import Loading from '@/components/custom/Loading'
import { useSelector } from 'react-redux'
import { subscribeToNewsletter } from '@/actions/User'
import * as yup from 'yup'

export default function Footer() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  // YUP email validation schema
  const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  })

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await emailSchema.validate({ email })
      setSubmitting(true)
      const response = await subscribeToNewsletter(email)

      if (response.success) {
        setSuccess('Subscribed successfully!')
        setEmail('')
      } else {
        setError(response.message || 'Failed to subscribe')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {loading && <Loading isLoading={true} />}
      <m.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-black py-10 w-full relative mt-auto"
      >
        <Container>
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-slate-200 text-xl">
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
                    href={isAuthenticated ? '/account/dashboard' : '/sign-in'}
                  >
                    My Account
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
                  <form
                    onSubmit={handleSubscribe}
                    className="flex w-full bg-black border border-white rounded-xl gap-4 items-center p-3"
                  >
                    <Mail size="40" />
                    <Input
                      className="rounded-xl py-4 bg-transparent text-white text-xl"
                      placeholder="Enter your email here"
                      max="40"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                        '& .MuiInput-input::placeholder': {
                          color: 'white',
                          opacity: 0.7,
                        },
                        '&::placeholder': {
                          color: 'white',
                          opacity: 0.7,
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      size="icon"
                      className="bg-white text-black hover:bg-gray-400"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2Icon className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoveRight />
                      )}
                    </Button>
                  </form>
                </li>
                {error && <li className="text-red-500 text-sm">{error}</li>}
                {success && (
                  <li className="text-green-500 text-sm">{success}</li>
                )}
              </ul>
            </div>

            <Separator className="my-10" />

            <div className="flex my-10 flex-wrap lg:flex-nowrap gap-8 justify-between">
              <div className="inline-flex gap-4 text-white text-2xl">
                <FaCcVisa />
                <FaCcMastercard />
                <FaPaypal />
              </div>
              <div className="inline-flex gap-4 items-center text-slate-200 text-md">
                @2025 El Boutique All rights reserved
              </div>
              <div className="inline-flex gap-6 text-white text-2xl">
                <FaFacebook className="cursor-pointer hover:text-gray-400" />
                <FaInstagram className="cursor-pointer hover:text-gray-400" />
                <FaXTwitter className="cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </div>
        </Container>
      </m.footer>
    </>
  )
}
