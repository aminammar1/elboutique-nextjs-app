'use client'
import React, { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { MdLocalShipping, MdCreditCard } from 'react-icons/md'
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

export default function DashboardPat() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const data = await getUserOrders()
        setOrders(data || [])
      } catch (error) {
        setOrders([])
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // Calculate counts
  const totalOrders = orders.length
  const deliveredOrders = orders.filter(
    (o) => o.shippingStatus === 'delivered'
  ).length
  const paidOrders = orders.filter((o) => o.status === 'completed').length

  return (
    <>
      <section className="my-10 p-3">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="capitalize flex flex-wrap">
              <Link href="/" className="text-xl hover:text-black">
                Home
              </Link>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold hover:text-gray-700">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>
      <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-4 items-center">
                <ShoppingBag className="font-bold h-10 w-10" />
                <span className="text-2xl text-gray-700 dark:text-gray-100">
                  {loading ? '...' : totalOrders}
                </span>
                orders
              </div>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-4 items-center">
                <MdLocalShipping className="font-bold h-10 w-10" />
                <span className="text-2xl text-gray-700 dark:text-gray-100">
                  {loading ? '...' : deliveredOrders}
                </span>
                received
              </div>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex gap-4 items-center">
                <MdCreditCard className="font-bold h-10 w-10" />
                <span className="text-2xl text-gray-700 dark:text-gray-100">
                  {loading ? '...' : paidOrders}
                </span>
                paid
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
