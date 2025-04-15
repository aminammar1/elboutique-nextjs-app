    import { Button } from '@/components/custom/Button'
    import React from 'react'
    import ProductQty from './ProductQty'
    import { ShoppingBag } from 'lucide-react'
    import toast from 'react-hot-toast'
    import Toast from '@/components/custom/Toast'
    import { useDispatch, useSelector } from 'react-redux'
    import { memoize } from 'proxy-memoize'
    import { addToCart, updateToCart } from '@/store/CartSlice'
    import { addCartItem } from '@/actions/cart'
    import { getBestPriceWithDiscountFromProduct } from '@/lib/utils'

    export default function ProductIcons({
    product,
    qty,
    setQty,
    setLoading,
    loading,
    }) {
    const dispatch = useDispatch()
    const cart = useSelector(memoize((state) => state.cart))

    const addToCartHandler = async () => {
        if (loading) return
        setLoading(true)
            try {
            
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
        
            const cartItem = await addCartItem(product._id, qty) 
        
            const itemForCart = {
                _id: cartItem._id,
                productId: product._id,
                name: product.productName,
                price: getBestPriceWithDiscountFromProduct(product),
                images: product?.image ?? [],
                qty: qty,
            }
        
            const _uid = `${itemForCart.productId}_${itemForCart.styleBefore}_${itemForCart.optionBefore}`
            const exist = cart.cartItems.find((item) => item._uid === _uid)
        
            if (exist) {
                const updatedCart = cart.cartItems.map((item) =>
                item._uid === _uid ? { ...item, qty: qty } : item
                )
        
                dispatch(updateToCart(updatedCart))
                toast.custom(
                <Toast message="Product updated in cart" status="success" />
                )
            } else {
                dispatch(
                addToCart({
                    ...itemForCart,
                    _uid,
                })
                )
                toast.custom(<Toast message="Product added to cart" status="success" />)
            }
        
            const element = document?.querySelector('#openCart')
            if (element) element.click()
            } catch (err) {
            toast.custom(
                <Toast
                message={err.message || 'Error adding to cart. Please login first.'}
                status="error"
                />
            )
            } finally {
            setLoading(false)
            }
        }
        

    const updateQty = (value) => {
        if (value === 'dec') setQty(qty === 1 ? qty : qty - 1)
        if (value === 'inc') setQty(qty === 9 ? qty : qty + 1)
    }

    return (
        <div className="flex items-center flex-wrap gap-12 mt-10">
        <ProductQty updateQty={updateQty} qty={qty} />
        <Button
            id="addToCart"
            onClick={addToCartHandler}
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
