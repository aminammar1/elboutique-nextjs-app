'use client'

import { updateToCart } from '@/store/CartSlice'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/custom/Button'
import { updateCartItem } from '@/actions/cart'
import Toast from '@/components/custom/Toast'


export default function ProductQtyCart({ item }) {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    const [qty, setQty] = useState(1)


    const handleUpdateQty = async (item, newQty) => {
        if (newQty < 1) return
        try {
        const updatedItem = await updateCartItem(item._id, newQty)
        const updatedCart = cartItems.map((cartItem) =>
            cartItem._id === item._id ? { ...cartItem, qty: updatedItem.quantity } : cartItem
        )
        dispatch(updateToCart(updatedCart))
        toast.custom(<Toast message="Quantity updated" status="success" />)
        } catch (error) {
        console.error('Error updating quantity:', error)
        toast.custom(<Toast message="Failed to update quantity" status="error" />)
        }
    }

    useEffect(() => {
        setQty(item.qty)
    }, [item])


    return (
        <div className="inline-flex justify-center items-center gap-8 border border-border px-4 rounded-lg">
            <Button onClick={() => handleUpdateQty(item, qty - 1)} className="" variant="nostyle">
                <MinusIcon className="h-4 w-4 group-hover:text-black" />
            </Button>
            <strong className="text-center text-xl">{qty}</strong>
            <Button onClick={() => handleUpdateQty(item, qty + 1)} className="" variant="nostyle">
                <PlusIcon className="h-4 w-4 group-hover:text-black" />
            </Button>
        </div>
    )
}

