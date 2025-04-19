'use client'

import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/custom/Button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Toast from '@/components/custom/Toast'
import { useDispatch } from 'react-redux'
import { createOrder as createOrderAction } from '@/store/OrderSlice'

// Initialize Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// The checkout form component that will handle the payment
const CheckoutForm = ({ clientSecret, orderData, setLoading }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return
    }

    setIsLoading(true)
    setLoading(true)

    // Store order details in Redux before payment
    dispatch(createOrderAction(orderData))

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderData.order_id}`,
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
      toast.custom(<Toast message={error.message} status="error" />)
    } else {
      setMessage('An unexpected error occurred.')
      toast.custom(
        <Toast message="An unexpected error occurred" status="error" />
      )
    }

    setIsLoading(false)
    setLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        disabled={isLoading || !stripe || !elements}
        className="w-full mt-4"
        type="submit"
      >
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
      {message && (
        <div id="payment-message" className="mt-4 text-red-500">
          {message}
        </div>
      )}
    </form>
  )
}

// Main component that wraps the form with Stripe Elements
export default function StripeForm({
  clientSecret,
  orderData,
  loading,
  setLoading,
}) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  }

  return (
    <div className="w-full">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            orderData={orderData}
            setLoading={setLoading}
          />
        </Elements>
      )}
    </div>
  )
}
