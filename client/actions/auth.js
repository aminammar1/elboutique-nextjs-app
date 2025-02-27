import axios from 'axios'
import { loginSuccess , logout } from '@/store/UserSlice'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL


export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, data);
    return { success: true, message: response.data.message, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Signup failed' };
  }
}


export const signin = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials, {
      withCredentials: true, // Allows sending/receiving cookies
    })

    const { userId } = response.data;
    dispatch(loginSuccess({ id: userId }));

    return { success: true , message: response.data.message }
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' }
  }
}


export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/refresh`, {}, {
      withCredentials: true,
    })

    return response.data.accessToken;
  } catch (error) {
    return null // Token refresh failed
  }
}

 /**Logout  */
export const signout = () => (dispatch) => {
  Cookies.remove('access_token');
  dispatch(logout())
}


