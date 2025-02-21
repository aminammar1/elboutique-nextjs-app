'use client'

import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { otpSchema } from '@/lib/otpSchema'

export default function VerifyOtp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  })

  const inputRefs = useRef([])

  const handleChange = (e, index) => {
    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    // Handle OTP verification logic here
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex justify-between gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  maxLength={1}
                  {...register(`otp${index + 1}`)}
                  className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
                {errors[`otp${index + 1}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`otp${index + 1}`].message}</p>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90">
            Verify OTP
          </button>
          <p className="text-sm text-gray-600 text-center mt-4">
            Didn't receive the OTP?
            <button type="button" className="text-black font-semibold hover:underline"> Resend OTP</button>
          </p>
        </form>
      </div>
    </div>
  )
}
