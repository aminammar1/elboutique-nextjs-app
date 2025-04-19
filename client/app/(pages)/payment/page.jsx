'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getOrderById } from '@/actions/order'
import Loading from '@/components/custom/Loading'
import { Button } from '@/components/custom/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Toast from '@/components/custom/Toast'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')

  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!orderId) {
        setError('Order ID not found.')
        setLoading(false)
        return
      }

      try {
        const orderData = await getOrderById(orderId)

        if (!orderData) {
          setError('Could not find order details.')
        } else {
          setOrder(orderData)
          if (orderData.checkoutUrl) {
            window.location.href = orderData.checkoutUrl;
            return;
          } 
          
          setError('Could not initialize payment. Please try again or contact support.')
        }
      } catch (err) {
        console.error('Error fetching order:', err)
        toast.custom(
          <Toast message="Error loading order details." status="error" />
        )
        setError('Error loading order details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, router])

  if (loading) return <Loading isLoading={true} />

  if (error) {
    return (
      <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">Payment Error</h1>
          <p className="text-gray-700">{error}</p>
          <Link href="/cart">
            <Button className="flex items-center space-x-2">
              <ArrowLeft size={16} />
              <span>Return to Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Redirecting to Checkout</h1>

      {order && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <p className="text-gray-700">Order ID: {order._id}</p>
          <p className="text-gray-700">
            Total Amount: ${order.total?.toFixed(2)}
          </p>
        </div>
      )}

      <div className="border p-4 rounded-lg flex justify-center items-center">
        <Loading isLoading={true} />
        <p className="ml-3">Redirecting to Stripe checkout page...</p>
      </div>

      <div className="mt-6">
        <Link href={`/cart`}>
          <Button variant="outline" className="flex items-center space-x-2">
            <ArrowLeft size={16} />
            <span>Cancel and return to cart</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
