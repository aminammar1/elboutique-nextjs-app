// actions/user.js
import axios from 'axios'
import { setUserDetails } from '@/store/userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/fetch-user-details`, {
      withCredentials: true, // Send/receive cookies
    })

    const user = response.data
    dispatch(setUserDetails(user)) // Update Redux state
    return { success: true, user }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user details',
    }
  }
}
