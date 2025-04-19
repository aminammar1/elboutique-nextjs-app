'use client'
import React, { useEffect, useState } from 'react'
import OrderHeader from './OrderHeader'
import OrderProducts from './OrderProducts'
import OrderSummary from './OrderSummary'
import BillingAddress from './BillingAddress'
import Container from '@/components/custom/Container'
import Loading from '@/components/custom/Loading'
import { getOrderById } from '@/actions/order'
import toast from 'react-hot-toast'
import Toast from '@/components/custom/Toast'

export default function OrderPage({ id }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      if (!id) return

      try {
        setLoading(true)
        const result = await getOrderById(id)

        if (result && !result.error) {
          setOrder(result)
        } else {
          toast.custom(
            <Toast
              message={result.error || 'Failed to fetch order details'}
              status="error"
            />
          )
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        toast.custom(
          <Toast
            message="An error occurred while fetching order details"
            status="error"
          />
        )
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  return (
    <section className="relative pb-10">
      {loading && <Loading isLoading={loading} />}
      <Container>
        <div className="">
          <h2> Your Order details </h2>
          <div className="flex gap-8 flex-wrap lg:flex-nowrap my-12">
            <div className="flex-1">
              <OrderHeader order={order} />
              <OrderProducts order={order} />
              <OrderSummary
                order={order}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
            <BillingAddress
              order={order}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
