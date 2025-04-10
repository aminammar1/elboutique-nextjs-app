import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL



export const getAllSubcategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/subcategories/get-all-subcategories`);
        return response.data.data
    } catch (error) {
        return { success: false, message: "Error fetching subcategories" };
    }
}

export const createSubcategory = async (subcategoryData) => {
    try {
        const response = await axios.post(`${API_URL}/api/subcategories/create-subcategory`, subcategoryData, { withCredentials: true })
        return response.data
    } catch (error) {
        return { success: false, message: "Error creating subcategory" }
    }
}

export const updateSubcategory = async (id, subcategoryData) => {
    try {
        const response = await axios.put(`${API_URL}/api/subcategories/update-subcategory/${id}`, subcategoryData, { withCredentials: true });
        return response.data
    } catch (error) {
        return { success: false, message: "Error updating subcategory" }
    }
}

export const deleteSubcategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/subcategories/delete-subcategory/${id}`, { withCredentials: true })
        return response.data
    } catch (error) {
        return { success: false, message: "Error deleting subcategory" }
    }
}


/** GetSubcategory BY ID  */

export const getSubcategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/subcategories/get-subcategory/${id}`)
        return response.data.data
    } catch (error) {
        return { success: false, message: "Error fetching subcategory" }
    }
}