'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '@/lib/resetPasswordSchema'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  const [showConfirmPassword , setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
    setSuccessMessage('Your password has been reset successfully.')
    // Handle password reset logic here
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Password  Field */}
            <div> 
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} {...register('password')} className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black" placeholder="Enter your password" />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? 'text' : 'password'} {...register('confirmPassword')} className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black" placeholder="Confirm your password" />
                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <p className="text-red-500 text-xs">{errors.confirmPassword?.message}</p>
            </div>
          
            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
