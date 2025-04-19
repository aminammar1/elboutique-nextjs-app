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
    import { updateOrderStatus } from '@/actions/order'
    
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

    // The checkout form component
    const CheckoutForm = ({ order, setLoading }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!stripe) {
        return
        }

        // Check the payment status on page load
        const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
        )

        if (!clientSecret) {
        return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
            case 'succeeded':
            setMessage('Payment succeeded!')
            handlePaymentSuccess()
            break
            case 'processing':
            setMessage('Your payment is processing.')
            break
            case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.')
            break
            default:
            setMessage('Something went wrong.')
            break
        }
        })
    }, [stripe])

    const handlePaymentSuccess = async () => {
        try {
        setLoading(true)
        // Update the order status to paid
        const result = await updateOrderStatus({
            id: order._id,
            isPaid: true,
        })

        if (result && !result.error) {
            toast.custom(
            <Toast
                message="Payment successful! Your order is confirmed."
                status="success"
            />
            )
            // Navigate to the order page
            router.push(`/order/${order._id}`)
        } else {
            toast.custom(
            <Toast
                message="Payment was successful but we couldn't update your order status."
                status="warning"
            />
            )
        }
        } catch (error) {
        console.error('Error updating order after payment:', error)
        } finally {
        setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        return
        }

        setIsLoading(true)
        setLoading(true)

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${window.location.origin}/order/${order._id}`,
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
    export default function StripePayment({ order, loading, setLoading }) {
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (order?.stripePaymentIntentId) {
        // The client secret should be returned from your server when creating the order
        setClientSecret(order.stripePaymentIntentId)
        }
    }, [order])

    return (
        <div className="w-full">
        {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm order={order} setLoading={setLoading} />
            </Elements>
        )}
        </div>
    )
    }
