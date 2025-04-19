'use client'

import { Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/custom/Button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Toast from '@/components/custom/Toast'
import { updateOrderStatus } from '@/actions/order'
import { useSelector } from 'react-redux'

export default function BillingAddress({ order, loading, setLoading }) {
  const router = useRouter()

  const handledelivered = async () => {
    if (loading) {
      return
    }

    const data = {
      id: order?._id,
      status: order?.status,
      shippingStatus: 'delivered',
    }
    setLoading(true)

    try {
      const result = await updateOrderStatus(data)
      if (result && !result.error) {
        toast.custom(
          <Toast message="Order marked as delivered" status="success" />
        )
        router.refresh()
      } else {
        toast.custom(
          <Toast
            message={result.error || 'Failed to update order'}
            status="error"
          />
        )
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.custom(
        <Toast
          message="An error occurred while updating order"
          status="error"
        />
      )
    } finally {
      setLoading(false)
    }
  }

  const handlecompleted = async () => {
    if (loading) {
      return
    }

    const data = {
      id: order?._id,
      status: 'completed',
      shippingStatus: order?.shippingStatus,
    }
    setLoading(true)

    try {
      const result = await updateOrderStatus(data)
      if (result && !result.error) {
        toast.custom(
          <Toast message="Order marked as completed" status="success" />
        )
        router.refresh()
      } else {
        toast.custom(
          <Toast
            message={result.error || 'Failed to update order'}
            status="error"
          />
        )
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.custom(
        <Toast
          message="An error occurred while updating order"
          status="error"
        />
      )
    } finally {
      setLoading(false)
    }
  }

  const user = useSelector((state) => state.user.user)

  // Check if user data is available
  const userImage =
    user?.imageUrl ||
    user?.avatar ||
    'https://cdn-icons-png.flaticon.com/128/2202/2202112.png'
  const userName = user?.fullName || user?.name || 'User'
  const userEmail =
    user?.emailAddresses?.[0]?.emailAddress ||
    user?.email ||
    'No email available'

  return (
    <div className="w-full col-span-1 p-4 bg-neutral-100 lg:w-[320px] flex flex-col gap-8 items-flex-start pt-4 h-fit">
      <div className="flex items-center gap-4">
        <Image
          src={userImage}
          width={60}
          height={60}
          alt="user image"
          className="rounded-full object-cover h-[60px] w-[60px]"
        />
        <div className="flex flex-col">
          <h6 className="">{userName}</h6>
        </div>
      </div>
      <hr />
      <div className="inline-flex gap-4">
        <Mail />
        <span className="">{userEmail}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h6 className="">Shipping Address</h6>
        <p className="text-slate-700">{order?.shippingAddress?.address}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h6 className="">Billing Address</h6>
        <p className="text-slate-700">{order?.shippingAddress?.address}</p>
      </div>
      <div className="mt-auto gap-4 flex flex-col ">
        <Button
          disabled={
            loading ||
            order?.shippingStatus === 'delivered' ||
            order?.status === 'completed'
          }
          onClick={() => handledelivered()}
          className="font-bold w-full bg-white rounded-none border border-gray-300 text-slate-700 p-8 hover:text-white hover:bg-black"
        >
          MARKED AS DELIVERED
        </Button>

        <Button
          disabled={loading || order?.status === 'completed'}
          onClick={() => handlecompleted()}
          className="font-bold w-full bg-black border rounded-none border- text-white p-8  hover:bg-gray-800"
        >
          MARKED AS COMPLETED
        </Button>
      </div>
    </div>
  )
}
