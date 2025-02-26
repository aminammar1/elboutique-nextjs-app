import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL


export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, data);
    return { success: true, message: response.data.message, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Signup failed' };
  }
}
