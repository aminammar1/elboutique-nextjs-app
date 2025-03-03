import axios from 'axios'
import { setUserDetails } from '@/store/userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/fetch-user-details`, {
      withCredentials: true,
    })

    console.log('Fetched user details:', response.data) // Debugging

    dispatch(setUserDetails(response.data)) // Update Redux
    return { success: true, user: response.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user details',
    }
  }
}
