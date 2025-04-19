    import axios from 'axios'

    const API_URL = process.env.NEXT_PUBLIC_API_URL
    // Create a new order
    export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/api/order/create`, orderData, {
        withCredentials: true, // Important to send auth cookies
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create order')
    }
    }

    // Get order by ID
    export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_URL}/api/order/${orderId}`, {
        withCredentials: true,
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get order')
    }
    }

    // Get current user's orders
    export const getUserOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/order/user/orders`, {
        withCredentials: true,
        })
        return response.data
    } catch (error) {
        throw new Error(
        error.response?.data?.message || 'Failed to get user orders'
        )
    }
    }

    // Update order status
    export const updateOrderStatus = async (updateData) => {
    try {
        const response = await axios.put(
        `${API_URL}/api/order/status`,
        updateData,
        {
            withCredentials: true,
        }
        )
        return response.data
    } catch (error) {
        throw new Error(
        error.response?.data?.message || 'Failed to update order status'
        )
    }
    }

    // Admin: Get all orders
    export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/order`, {
        withCredentials: true,
        })
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to get all orders')
    }
    }
