import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

    export const verifyCoupon = async (code) => {
    try {
        const res = await axios.post(
        `${API_URL}/api/coupons/verify-coupon`,
        { code },
        { withCredentials: true }
        )
        return res
    } catch (error) {
        return { error }
    }
    }

    export const getAllCoupons = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/coupons/show-coupons`, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }

    export const generateCoupon = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/coupons/generate`, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }
