import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const createCategory = async (categoryName) => {
  try {
    const response = await axios.post(`${API_URL}/api/categories/create-category`, { name: categoryName }, { withCredentials: true })
    return response.data // Returns { message, success, error, data }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create category')
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/get-categories`, { withCredentials: true })
    return response.data.data 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories')
  }
}

export const updateCategory = async (categoryId, newName) => {
  try {
    const response = await axios.put(`${API_URL}/api/categories/update-category/${categoryId}`, { name: newName }, { withCredentials: true })
    return response.data 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update category')
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/categories/delete-category/${categoryId}`, { withCredentials: true })
    return response.data 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete category')
  }
}

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/categories/get-category/${categoryId}`, { withCredentials: true })
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch category')
  }
}
