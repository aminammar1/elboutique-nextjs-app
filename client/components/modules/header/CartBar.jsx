    'use client'

    import { Button } from '@/components/custom/Button'
    import { ShoppingBasket, Trash } from 'lucide-react'
    import Image from 'next/image'
    import React from 'react'
    import { m, AnimatePresence } from 'framer-motion'
    import { useRouter } from 'next/navigation'
    import Link from 'next/link'
    import CurrencyFormat from '@/components/custom/FormatCurrency'
    import { useDispatch, useSelector } from 'react-redux'
    import toast from 'react-hot-toast'
    import { deleteCartItem, updateCartItem } from '@/actions/cart'
    import Toast from '@/components/custom/Toast'
    import { updateToCart } from '@/store/CartSlice'

    export default function CartBar({ openCartBar, setOpenCartBar }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    const handleRemoveItem = async (item) => {
        try {
        await deleteCartItem(item._id)
        toast.custom(<Toast message="Product removed from cart" status="success" />)
        const newCart = cartItems.filter((p) => p._id !== item._id)
        dispatch(updateToCart(newCart))
        } catch (error) {
        console.error('Error removing item:', error)
        toast.custom(<Toast message="Failed to remove item" status="error" />)
        }
    }

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

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    return (
        <AnimatePresence>
        {openCartBar && (
            <m.div
            onMouseLeave={() => setOpenCartBar(false)}
            exit={{
                y: -20,
                opacity: 0,
                filter: 'blur(5px)',
                scale: 0,
                transition: { ease: 'easeIn', duration: 0.22 },
            }}
            initial={{ opacity: 0, y: -15 }}
            animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { type: 'spring', duration: 0.7 },
            }}
            className="absolute top-[54px] right-0 h-fit w-[360px] bg-white z-[9999] p-4 shadow-2xl"
            >
            <div className="flex flex-col justify-between gap-8">
                <p className="text-center font-semibold text-lg">Your Shopping Cart</p>

                <div className="flex flex-col snap-y gap-6 border-b border-gray-200 pb-4 max-h-[360px] overflow-y-auto">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between gap-4 items-center">
                        <Image
                        src={item?.images[0]}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="object-contain rounded-sm"
                        />
                        <div className="flex-1">
                        <h6 className="text-sm font-medium">{item.name}</h6>
                        <p className="text-xs text-muted-foreground mb-1">
                            <CurrencyFormat value={item.price} />
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                            <button
                            onClick={() => handleUpdateQty(item, item.qty - 1)}
                            className="px-2 py-1 border rounded disabled:opacity-50"
                            disabled={item.qty <= 1}
                            >
                            -
                            </button>
                            <span>{item.qty}</span>
                            <button
                            onClick={() => handleUpdateQty(item, item.qty + 1)}
                            className="px-2 py-1 border rounded"
                            >
                            +
                            </button>
                        </div>
                        </div>
                        <Trash
                        size={20}
                        className="cursor-pointer text-destructive"
                        onClick={() => handleRemoveItem(item)}
                        />
                    </div>
                    ))
                ) : (
                    <div className="flex flex-col gap-1 items-center py-4">
                    <ShoppingBasket className="text-black font-bold" size={100} />
                    <h5>Your cart is empty</h5>
                    <Button className="bg-black text-white border capitalize border-slate-200 mt-2">
                        <Link href="/products">shop now</Link>
                    </Button>
                    </div>
                )}
                </div>

                <div className="flex flex-col gap-6">
                <div className="flex justify-between font-bold">
                    <h6>Subtotal:</h6>
                    <strong className="text-right">
                    <CurrencyFormat value={subtotal} />
                    </strong>
                </div>
                <div className="flex flex-col gap-4">
                    <Link
                    href="/cart"
                    onClick={() => router.push('/cart')}
                    className="rounded-sm py-4 flex justify-center hover:bg-black hover:text-white capitalize text-xl border border-border"
                    >
                    view cart
                    </Link>
                    <Button
                    onClick={() => {}}
                    variant="default"
                    size="lg"
                    className="rounded-sm py-8 capitalize text-xl"
                    >
                    checkout
                    </Button>
                </div>
                </div>
            </div>
            </m.div>
        )}
        </AnimatePresence>
    )
    }
