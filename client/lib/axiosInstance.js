import axios from 'axios'
import Cookies from 'js-cookie'
import { refreshAccessToken, signout } from '@/actions/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Allows sending/receiving cookies
})

axiosInstance.interceptors.request.use(async (config) => {
  let token = Cookies.get('access_token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newToken = await refreshAccessToken()

        if (newToken) {
          Cookies.set('access_token', newToken, { secure: true, sameSite: 'Lax' })
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          return axiosInstance(originalRequest)
        } else {
          signout()
        }
      } catch (refreshError) {
        signout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
