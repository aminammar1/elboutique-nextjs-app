import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

/** Upload Image */
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)
  try {
    const response = await axios.post(
      `${API_URL}/api/upload/upload-image`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      }
    )
    return { imageUrl: response.data.imageUrl }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Image upload failed')
  }
}

/** Create Product */
export const createProduct = async (productData) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/products/create-product`,
      productData ,
      { withCredentials: true }
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Product creation failed')
  }
}
