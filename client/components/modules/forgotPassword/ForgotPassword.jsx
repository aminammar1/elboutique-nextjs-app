'use client'

import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotpassSchema } from '@/lib/forgotpassSchema'
import { requestPasswordReset } from '@/actions/auth'
import { ClipLoader } from 'react-spinners'
import Toast from '@/components/custom/Toast'

export default function ForgotPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotpassSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await requestPasswordReset(data.email)
    
    if (response.success) {
      localStorage.setItem('email', data.email)
      setToastData({
        status: 'success',
        message: response.message || ' OTP Code Sent !',
      })
      setTimeout(() => {
      router.push('/verify-otp') , 
      2000
      })


    } else {
      setToastData({
        status: 'error',
        message: response.message || 'Failed to send OTP',
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
        <h2 className="text-2xl font-bold text-center mb-4 text-black">Forgot Password </h2>
        
        {/* Show Toast if there is a message */}
          
          {toastData && (
            <Toast status={toastData.status} message={toastData.message} />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <button type="submit" 
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
            disabled={loading}>
              {loading ? <ClipLoader color="#fff" size={20} /> : 'Send OTP'}
            </button>
          </form>
      </div>
    </div>
  )
}

