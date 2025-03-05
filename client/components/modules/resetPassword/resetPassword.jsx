'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '@/lib/resetPasswordSchema'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import { resetPassword } from '@/actions/auth'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import Toast from '@/components/custom/Toast'

export default function ResetPassword() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)

  const onSubmit = async (data) => {
    setLoading(true)
    const userId = localStorage.getItem('userId')
    const response = await resetPassword(userId, data.password, data.confirmPassword)
    if (response.success) {
      setToastData({
        status: 'success',
        message: response.message || 'Password reset successful',
      })
      setTimeout(() => {
      router.push('/sign-in') , 
      2000
      })

    } else {
      setToastData({
        status: 'error',
        message: response.message || 'Failed to reset password',
      })
    }
    setTimeout(() => {
      setToastData(null)
    }, 3000)

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>
       
        {/* Show Toast if there is a message */}
        {toastData && <Toast status={toastData.status} message={toastData.message} />}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <p className="text-red-500 text-xs">{errors.password?.message}</p>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <p className="text-red-500 text-xs">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" 
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
          disabled={loading}>
            {loading ? (
              <ClipLoader color="#fff" loading={loading} size={20} />
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
