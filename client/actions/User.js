import axios from 'axios'
import { setUserDetails } from '@/store/userSlice'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/fetch-user-details`, {
      withCredentials: true,
    })
    dispatch(setUserDetails(response.data.data)) // Update Redux
    return { success: true, user: response.data.data }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user details',
    }
  }
}

export const updateProfile = (data) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/user/update-profile`,
      data,
      {
        withCredentials: true,
      }
    )
    dispatch(setUserDetails(response.data)) // Update Redux
    return { success: true, message: response.data.message }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update profile',
    }
  }
}

// Change Password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/user/change-password`,
      { oldPassword, newPassword },
      { withCredentials: true }
    )

    return { success: true, message: response.data.message }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to change password',
    }
  }
}

// Delete User
export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${API_URL}/api/user/delete`, {
      withCredentials: true,
    })

    return { success: true, message: response.data.message }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete user',
    }
  }
}

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/user/subscribe-newsletter`,
      { email }
    )

    return { success: true, message: response.data.message }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to subscribe',
    }
  }
}
