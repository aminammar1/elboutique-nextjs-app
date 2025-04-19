'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/custom/costumeUI'
import { getUserOrders } from '@/actions/order'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import CurrencyFormat from '@/components/custom/FormatCurrency'
import { Button } from '@/components/custom/Button'
import { Package } from 'lucide-react'
import Loading from '@/components/custom/Loading'

export default function OrderPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await getUserOrders()
        setOrders(data) 
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      <section className="my-10 p-3">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="capitalize flex flex-wrap gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-black transition">
                Home
              </Link>
              <BreadcrumbSeparator />
              <Link
                href="/account/dashboard"
                className="hover:text-black transition"
              >
                Dashboard
              </Link>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base font-semibold text-black">
                  My Orders
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {loading ? (
            <Loading isLoading={loading} />
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-8">
                You haven't placed any orders yet.
              </p>
              <Button onClick={() => (window.location.href = '/products')}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
                Your Orders
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col"
                  >
                    {/* Order Header */}
                    <div className="bg-gray-50 p-4 flex justify-between items-start gap-4 rounded-t-2xl">
                      <div>
                        <p className="text-xs text-gray-500">
                          Placed{' '}
                          {order.createdAt
                            ? formatDistanceToNow(new Date(order.createdAt), {
                                addSuffix: true,
                              })
                            : 'recently'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Order ID #{order._id.slice(-8)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 text-xs font-medium">
                        <span
                          className={`px-2 py-1 rounded-full ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            order.shippingStatus === 'delivered'
                              ? 'bg-blue-100 text-blue-700'
                              : order.shippingStatus === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {order.shippingStatus}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 flex-1 flex flex-col gap-4">
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {order.products.map((product, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center min-w-[80px]"
                          >
                            <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={
                                  product.images ||
                                  '/assets/images/placeholder.jpg'
                                }
                                alt={product.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="text-xs text-gray-600 mt-1 truncate max-w-[70px] text-center">
                              {product.name}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              x{product.qty}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="capitalize font-medium text-gray-800">
                            {order.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>
                        {order.shippingAddress && (
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className="text-right text-gray-800">
                              {order.shippingAddress.address},{' '}
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.country}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t text-base font-semibold text-black">
                          <span>Total:</span>
                          <CurrencyFormat value={order.total} />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end p-4 bg-gray-50 rounded-b-2xl">
                      <Link href={`/order/${order._id}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded-full px-6"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
