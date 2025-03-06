import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const uploadAvatar = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/api/user/upload-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Send cookies
    });

    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}