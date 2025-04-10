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
      productData,
      { withCredentials: true }
    )
    return data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Product creation failed')
  }
}

// Fetch all products
export const fetchProducts = async () => {
  const { data } = await axios.get(`${API_URL}/api/products/all`)
  return data
}

// Delete a product
export const deleteProduct = async (id) => {
  try {
  const { data } = await axios.delete(`${API_URL}/api/products/delete/${id}`, { withCredentials: true })
  return data
  }
  catch (error) {
    throw new Error(error.response?.data?.message || 'Product deletion failed')
  }
}

// Update a product
export const updateProduct = async (id, updatedData) => {
  try {
  const { data } = await axios.put(`${API_URL}/api/products/update/${id}`, updatedData , 
    { withCredentials: true }
  )
  return data 
}
  catch (error) {
    throw new Error(error.response?.data?.message || 'Product update failed')
  }
}


// Fetch product by ID
export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/api/products/product/${id}`)
  return response.data.data  // Return just the data property
}

/** Fetch Products By Category */
export const fetchProductsByCategory = async (categoryName, excludeId = null) => {
  try {
      const response = await axios.get(`${API_URL}/api/products/category/${categoryName}`, {
          params: { exclude: excludeId }, // Only send excludeId as a query param if needed
      })
      return response.data;
  } catch (error) {
      console.error('Error fetching products by category:', error);
      return []
  }
}

/** getProductByCategoryID */

export const getProductByCategoryID = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get-product-bycategoryId/${categoryId}`, {withCredentials: true })
    
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products by category ID')
  }
}

/** Get Product By SubcategoryID */

export const getProductBySubcategoryID = async (subcategoryId) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get-product-bysubcategoryId/${subcategoryId}`, { withCredentials: true })
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products by subcategory ID')
  }
}

/** Get Product By PriceRange */


export const getProductByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/get-products-by-price-range`, {
      params: { min: minPrice, max: maxPrice },
      withCredentials: true,
    })
    return response.data.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products by price range')
  }
}


/** Add Review */
export const addProductReview = async (productId, reviewData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/products/add-review/${productId}`,
      reviewData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add review');
  }
};
