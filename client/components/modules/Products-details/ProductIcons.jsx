import { Button } from '@/components/custom/Button'
import React from 'react'
import ProductQty from './ProductQty'
import { ShoppingBag } from 'lucide-react'
//import toast from 'react-hot-toast'
//import Toast from '@/components/custom/Toast'
//import { useDispatch, useSelector } from 'react-redux'
//import { addToCart } from '@/store/cartSlice'

export default function ProductIcons({
    product,
    qty,
    setQty,
    setLoading,
    loading,
}) {
    //const dispatch = useDispatch()
    //const { cart } = useSelector((state) => state)

    /*const addToCartHandler = async () => {
    if (loading) {
        return
    }
    setLoading(true)

    try {
      // Simplified cart handling
        const cartItem = {
        _id: product._id,
        image: product.image[0],
        productName: product.productName,
        price: product.price,
        discount: product.discount,
        qty: qty,
        stockCount: product.stockCount,
        _uid: product._id, // Unique identifier for cart
        }

      // Check if we have enough stock
        if (qty > product.stockCount) {
        toast.custom(
            <Toast
            message="The stock is limited, please reduce your quantity"
            status="error"
            />
        )
        setLoading(false)
        return
        }

      // Check if item exists in cart
        const exist = cart.cartItems.find((p) => p._uid === cartItem._uid)

        if (exist) {
        // Handle updating cart item (you should define updateToCart action)
        const newCart = cart.cartItems.map((p) => {
            if (p._uid === exist._uid) {
            return { ...p, qty: qty }
            }
            return p
        })

        dispatch({ type: 'UPDATE_CART', payload: newCart })
        toast.custom(
            <Toast message="Product updated in cart" status="success" />
        )
        } else {
        // Add to cart
        dispatch(addToCart(cartItem))
        toast.custom(<Toast message="Product added to cart" status="success" />)
        }

      // Open cart drawer if you have one
        const element = document?.querySelector('#openCart')
        if (element) element.click()
    } catch (err) {
        toast.custom(
        <Toast message={err.message || 'Error adding to cart'} status="error" />
        )
    } finally {
        setLoading(false)
    }
  } */

    return (
    <div className="flex items-center flex-wrap gap-12 mt-10">
        <ProductQty
        updateQty={(value) => {
            if (value === 'dec') {
            setQty(qty === 1 ? qty : qty - 1)
            }
            if (value === 'inc') {
            setQty(qty === 9 ? qty : qty + 1)
            }
        }}
        qty={qty}
        />
        <Button
        id="addToCart"
        //onClick={addToCartHandler}
        disabled={product.stockCount <= 0 || loading}
        variant="default"
        size="lg"
        className="text-white text-2xl capitalize col-span-2 p-8 flex-1"
        //data-cy="addToCartBtn"
        >
        <ShoppingBag className="me-2" />
        add to cart
        </Button>
    </div>
    )
}
