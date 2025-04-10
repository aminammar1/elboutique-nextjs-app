'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Rating } from '@mui/material'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { SendIcon, LogInIcon } from 'lucide-react'
import { Button } from '@/components/custom/Button'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Toast from '@/components/custom/Toast'
import { addProductReview } from '@/actions/product'

export default function AddReview({ product, reviews, setReviews }) {
    const [rating, setRating] = useState('')
    const [loading, setLoading] = useState(false)

    const { user, isAuthenticated } = useSelector((state) => state.user)
    const router = useRouter()

    const validationSchema = Yup.object().shape({
    review: Yup.string()
        .required('Review is required')
        .min(10, 'At least 10 characters')
        .max(250, 'Max 250 characters'),
    })

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm({
    resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (data) => {
    if (!isAuthenticated) {
        toast.custom(
        <Toast message="You need to login. Redirecting..." status="error" />
        )
        router.push('/sign-in')
        return
    }

    if (!rating) {
        toast.custom(
        <Toast message="Please give your rating ⭐⭐⭐!" status="error" />
        )
        return
    }

    const reviewPayload = {
        review: data.review,
        rating: Number(rating),
        images: [],
        likes: [],
    }

    try {
      setLoading(true)
      const { review } = await addProductReview(product._id, reviewPayload)
      toast.custom(
        <Toast message="Review added successfully!" status="success" />
      )
      setReviews([...reviews, review])
      reset()
      setRating('')
    } catch (err) {
      toast.custom(<Toast message={err.message} status="error" />)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h5>Add your Review</h5>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <textarea
          {...register('review')}
          placeholder="Put your review here"
          className={cn(
            'w-full h-20 border border-black p-4 text-black focus:outline-none',
            errors.review && 'border-red-500'
          )}
        />
        {errors.review && (
          <div className="text-red-600 font-semibold">
            {errors.review.message}
          </div>
        )}

        <div className="mt-6">
          <Rating
            name="rating"
            precision={1}
            value={Number(rating)}
            onChange={(e) => {
              // @ts-expect-error
              setRating(e.target.value)
            }}
            style={{ fontSize: '32px' }}
          />
        </div>

        <div className="flex justify-start mt-8">
          {isAuthenticated ? (
            <Button
              variant="default"
              size="lg"
              disabled={loading}
              type="submit"
              className="px-4 w-fit"
            >
              Post your review
              <SendIcon className="text-white ms-4" />
            </Button>
          ) : (
            <Link
              href="/sign-in"
              className="bg-black flex items-center justify-center gap-4 uppercase text-white p-6"
            >
              Login to post your comment
              <LogInIcon />
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}
