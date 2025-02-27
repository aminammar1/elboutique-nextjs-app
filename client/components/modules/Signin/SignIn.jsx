"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signinSchema } from "@/lib/signinSchema"
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import Link from "next/link"
import {signin} from '@/actions/auth'
import { useDispatch } from "react-redux"
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'
import { useRouter } from 'next/navigation'

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = (data) => {
    setLoading(true)
  
    dispatch(signin(data)).then((result) => {
      
      if (result.success) {
        setToastData({
          status: 'success',
          message: result.message || 'Signin successful!',
        })
  
        setTimeout(() => {
          router.push('/');
        }, 2000)
      } else {
        setToastData({
          status: 'error',
          message: result.message || 'Signin failed',
        })
      }
  
      setTimeout(() => {
        setToastData(null);
      }, 3000)
  
      setLoading(false);
    })
  }
  

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-gray-900">Sign in to EL Boutique</h2>
      <p className="text-center text-gray-500 mb-4">Welcome back! Please sign in to continue</p>


      {/* Show Toast if there is a message */}
        {toastData && (
          <Toast status={toastData.status} message={toastData.message} />
        )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email")}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800" 
        type="submit"
        disabled={loading}>
         {loading ? <ClipLoader color="#fff" size={20} /> : ' Sign in →'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Login Buttons */}
      <div className="flex gap-3">
          <button className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-gray-200">
            <FaFacebook  className="text-xl" /> Facebook
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-gray-200">
            <FaGoogle className="text-xl" /> Google
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <Link href="/sign-up" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
  )
}