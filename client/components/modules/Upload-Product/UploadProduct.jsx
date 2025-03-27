'use client'

import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { FaImage, FaUpload, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/custom/Button'
import { getAllSubcategories } from '@/actions/Subcategories'
import { getCategories } from '@/actions/Categories'
import { uploadImage, createProduct } from '@/actions/product'
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'

export default function UploadProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [previewImages, setPreviewImages] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [toastData, setToastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    getAllSubcategories().then(setSubcategories).catch(console.error)
    getCategories().then(setCategories).catch(console.error)
  }, [])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])
    setPreviewImages((prev) => [
      ...prev,
      ...files.map((file) => ({ url: URL.createObjectURL(file), name: file.name })),
    ])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(previewImages[index].url)
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    
    setIsUploading(true)
    setLoading(true)
    try {
      const uploadedImages = await Promise.all(
        selectedFiles.map(async (file) => {
          const result = await uploadImage(file)
          return result.imageUrl
        })
      )
      
        const productData = { 
        ...data, 
        image: uploadedImages,
        discount: data.discount ? Number(data.discount) : 0,
        stylesColors: data.stylesColors || ''
      }
      await createProduct(productData)

      setToastData({
        status: 'success',
        message: 'Product uploaded successfully!',
      })
      reset()
      setPreviewImages([])
      setSelectedFiles([])
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to upload product',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    } finally {
      setIsUploading(false)
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-0.5 bg-white p-6 rounded-lg shadow-md">
        {toastData && <Toast status={toastData.status} message={toastData.message} />}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Product Images</label>
            <div className="relative">
              <input type="file" id="productImages" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
              <label htmlFor="productImages" className="cursor-pointer flex items-center justify-center border-2 border-dashed rounded-lg h-40 w-full bg-gray-50 hover:bg-gray-100 transition duration-300">
                <div className="flex flex-col items-center">
                  <FaImage className="text-gray-400 text-3xl mb-2" />
                  <p className="text-sm text-gray-500">Click to upload product images</p>
                </div>
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img src={preview.url} alt="Preview" className="h-24 w-24 object-cover rounded-md border" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Product Name</label>
              <input type="text" {...register('productName', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
              {errors.productName && <p className="text-red-500 text-xs mt-1">Product name is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Product Description</label>
              <input type="text" {...register('productDescription', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
              {errors.productDescription && <p className="text-red-500 text-xs mt-1">Product description is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Price ($)</label>
              <input type="number" {...register('price', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
              {errors.price && <p className="text-red-500 text-xs mt-1">Price is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Discount (%)</label>
              <input type="number" {...register('discount')} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Stock Count</label>
              <input type="number" {...register('stockCount', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
              {errors.stockCount && <p className="text-red-500 text-xs mt-1">Stock count is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Styles/Colors</label>
              <input type="text" {...register('stylesColors')} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Category</label>
              <select {...register('category', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition">
                <option value="">Select category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">Category is required</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Subcategory</label>
              <select {...register('subCategory', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition">
                <option value="">Select subcategory</option>
                {subcategories.map((sub,idx) => (
                  <option key={idx} value={sub.id}>{sub.name}</option>
                ))}
              </select>
              {errors.subCategory && <p className="text-red-500 text-xs mt-1">Subcategory is required</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Additional Info</label>
            <textarea {...register('additionalInfo')} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" rows={4}></textarea>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full p-3 rounded-md bg-black hover:bg-gray-800 text-white font-medium flex items-center justify-center transition" disabled={isUploading}>
              {isUploading ? <ClipLoader color="#fff" size={20} /> : (
                <>
                  <FaUpload size={20} className="mr-2" /> 
                  Upload Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
