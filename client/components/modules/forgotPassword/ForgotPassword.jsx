'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotpassSchema } from '@/lib/forgotpassSchema'

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotpassSchema),
  })

  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-1">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Forgot Passwords </h2>
        {/** Forogt Password Form  */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90">
              Send OTP
            </button>
          </form>
      </div>
    </div>
  )
}

