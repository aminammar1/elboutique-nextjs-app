'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaImage, FaUpload, FaTrash } from 'react-icons/fa'
import { Button } from '@/components/custom/Button'
import { getAllSubcategories } from '@/actions/Subcategories'
import { getCategories } from '@/actions/Categories'
import { uploadImage, createProduct } from '@/actions/product'

export default function UploadProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [previewImages, setPreviewImages] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
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
    if (selectedFiles.length === 0) return alert('Please select at least one image')

    setIsUploading(true)

    try {
      const uploadedImages = await Promise.all(
        selectedFiles.map(async (file) => {
          const result = await uploadImage(file)
          return result.imageUrl
        })
      )

      if (!uploadedImages.length) throw new Error('Image upload failed')

        console.log('Uploaded images:', uploadedImages)
      
        const productData = { 
        ...data, 
        image: uploadedImages,
        discount: data.discount ? Number(data.discount) : 0,
        stylesColors: data.stylesColors || ''
      }

      console.log('Sending product data:', productData)
      
      await createProduct(productData)

      alert('Product uploaded successfully!')
      reset()
      setPreviewImages([])
      setSelectedFiles([])
    } catch (error) {
      alert(error.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow-lg">
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
              <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 ">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Product Name</label>
              <input type="text" {...register('productName', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Product Description</label>
              <input type="text" {...register('productDescription', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Price ($)</label>
              <input type="number" {...register('price', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Discount (%)</label>
              <input type="number" {...register('discount')} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Stock Count</label>
              <input type="number" {...register('stockCount', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" />
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
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Subcategory</label>
              <select {...register('subCategory', { required: true })} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition">
                <option value="">Select subcategory</option>
                {subcategories.map((sub,idx) => (
                  <option key={idx} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Additional Info</label>
            <textarea {...register('additionalInfo')} className="w-full p-3 rounded-md border focus:ring-2 focus:ring-black outline-none transition" rows={4}></textarea>
          </div>

          <div className="pt-4 bg-white">
            <Button type="submit" className="w-full p-3 rounded-md bg-black hover:bg-gray-800 text-white font-medium flex items-center justify-center transition" >
              <FaUpload className="mr-2" /> Upload Product 
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
