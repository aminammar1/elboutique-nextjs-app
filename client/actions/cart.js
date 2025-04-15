import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL
import { updateToCart } from '@/store/CartSlice'

export const fetchCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/cart/getcart`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.error('Error fetching cart items:', error)
        throw error
    }
}

export const addCartItem = async (productId, quantity) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/cart/addToCart`,
            { productId, quantity },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error('Error adding item to cart:', error)
        throw error
    }
}

export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/cart/updatecart/${cartItemId}`,
            { quantity },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error('Error updating cart item:', error)
        throw error
    }
}

export const deleteCartItem = async (cartItemId) => {
    try {
        const response = await axios.delete(`${API_URL}/api/cart/deletecart/${cartItemId}`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.error('Error deleting cart item:', error)
        throw error
    }
}

    export const loadUserCartItems = () => async (dispatch, getState) => {
        try {
        const response = await fetchCartItems() 
    
        const formatted = response.map((item) => ({
            _id: item._id,
            qty: item.quantity,
            name: item.productId.productName,
            price: item.productId.price,
            images: item.productId.image,
        }))
    
        dispatch(updateToCart(formatted))
        } catch (err) {
        console.error('Failed to load cart:', err)
        }
    }
