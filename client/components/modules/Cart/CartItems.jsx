import { Button } from '@/components/custom/Button'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateToCart } from '@/store/CartSlice'
import Toast from '@/components/custom/Toast'
import toast from 'react-hot-toast'
import ProductQtyCart from '@/components/custom/ProductQtyCart'


export default function CartItem ({item})  {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)
    
    const handleRemoveItem = async (item) => {
        try {
            const newCart = cartItems.filter((p) => p._id !== item._id)
            dispatch(updateToCart(newCart))
            toast.custom(<Toast message="Product removed from cart" status="success" />)
        } catch (error) {
            console.error('Error removing item:', error)
            toast.custom(<Toast message="Failed to remove item" status="error" />)
        }
    }

    return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                <div className="flex gap-2">
                <Image
                    src={item.images[0]}
                    width="200"
                    height="200"
                    alt="prod"
                    className="h-20 w-20 object-cover"
                />
                <div className="flex flex-col gap-2">
                    <span className="capitalize">{item.name.substring(0, 30)}</span>
                    <div className="inline-flex gap-4 font-bold">
                    <span className="font-bold">{item.qty}</span>
                    <span>X</span>
                    <span className="font-bold">${item.price}</span>
                    </div>
                </div>
                </div>
            </th>
            <td className="px-6 py-4 text-xl">${item.price.toFixed(2)}</td>
            <td className="px-6 py-4">
                <ProductQtyCart item={item} />
            </td>
            <td className="px-6 py-4 text-xl">
                ${(item.price * item.qty).toFixed(2)}
            </td>
            <td className="px-6 py-4">
                <Button
                onClick={() => handleRemoveItem(item)}
                className="hover:text-black"
                variant="nostyle"
                size="icon"
                >
                <Trash />
                </Button>
            </td>
            </tr>
        )
        }
