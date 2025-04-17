import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Address Service API Calls
    export const createAddress = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/api/address/createAddress`, data, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }

    export const getAllAddresses = async () => {
    try {
        const res = await axios.get(`${API_URL}/api/address/allAddresses`, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }

    export const getAddressById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/api/address/allAdresses/${id}`, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }

    export const updateAddress = async (id, data) => {
    try {
        const res = await axios.put(
        `${API_URL}/api/address/updateAddress/${id}`,
        data,
        { withCredentials: true }
        )
        return res
    } catch (error) {
        return { error }
    }
    }

    export const deleteAddress = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/api/address/deleteAddress/${id}`, {
        withCredentials: true,
        })
        return res
    } catch (error) {
        return { error }
    }
    }
