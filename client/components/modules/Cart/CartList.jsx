'use client'

import React from 'react'
import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItem from './CartItems'
import Checkout from './Checkout'
import Loading from '@/components/custom/Loading'


export default function CartList() {
    const cart = useSelector((state) => state.cart)
    const [loading, setLoading] = useState(false)
    const [total , setTotal] = useState(0)
    const shippingFee = 0
    const tax = 0
    const subtotal = cart.cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty
    }, 0)

    useEffect(() => {
        setTotal(subtotal + shippingFee + tax)
    }, [subtotal, shippingFee, tax]) 



    return(
        <section className='my-10'> 
            {loading && <Loading is loading={loading} />}
                <Container>
                <Row>
                    <h1 className="text-2xl font-bold">Shopping Cart</h1>
                </Row>
                <div className="flex flex-col gap-12 items-start mt-20 xl:flex-row">
            <div className="relative overflow-x-auto flex-1 w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 cursor-move">
                <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Subtotal
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {cart.cartItems.length > 0 && 
                    cart.cartItems.map((item, index) => (
                        <CartItem
                            key={index}
                            item={item}
                            
                        />
                    ))}
                </tbody>
            </table>
            </div> 
                    <Checkout
                        subtotal={subtotal}
                        shippingFee={shippingFee}
                        tax={tax}
                        total={total}
                        loading={loading}
                    />
                    </div>
                </Container>

            </section>
        
    )

}

