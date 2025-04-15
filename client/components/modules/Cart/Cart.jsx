"use client"

import React from 'react'
import {useSelector} from 'react-redux'
import CartList from './CartList'
import Container from '@/components/custom/Container'
import EmptyCart from './EmptyCart'

export default function Cart() {
  const cart = useSelector((state) => state.cart)
  return (
      <>
        <section className="h-screen">
          <Container>
            {cart.cartItems.length === 0 ?  <EmptyCart/> : <CartList /> }
          </Container>
        </section>
      </>
  )
}
