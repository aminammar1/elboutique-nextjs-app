'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '@/lib/resetPasswordSchema'

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  const [successMessage, setSuccessMessage] = useState('')

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
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
