'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaImage, FaUpload, FaTrash } from 'react-icons/fa'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/Button'
import { getAllSubcategories } from '@/actions/Subcategories'
import { getCategories } from '@/actions/Categories'
import { uploadImage, createProduct } from '@/actions/product'
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'

export default function ProductUploadDialog({ trigger }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [open, setOpen] = useState(false)
  const [previewImages, setPreviewImages] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [toastData, setToastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(true)

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [cats, subs] = await Promise.all([
            getCategories(),
            getAllSubcategories()
          ])
          
          // Normalize data to ensure consistent ID access
          const normalizedCategories = cats.map(cat => ({
            id: cat._id || cat.id,
            _id: cat._id || cat.id,
            name: cat.name
          }))
          
          const normalizedSubcategories = subs.map(sub => ({
            id: sub._id || sub.id,
            _id: sub._id || sub.id,
            name: sub.name
          }))
          
          setCategories(normalizedCategories)
          setSubcategories(normalizedSubcategories)
        } catch (error) {
          console.error(error)
          setToastData({
            status: 'error',
            message: 'Failed to load categories'
          })
        } finally {
          setCategoriesLoading(false)
          setSubcategoriesLoading(false)
        }
      }
      fetchData()
    }
  }, [open])

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
      // Validate category and subcategory selection
      if (!data.category || !data.subCategory) {
        throw new Error('Category and subcategory are required')
      }

      // Find the selected category and subcategory
      const selectedCategory = categories.find(cat => 
        cat.id.toString() === data.category.toString() || 
        cat._id.toString() === data.category.toString()
      )
      
      const selectedSubCategory = subcategories.find(sub => 
        sub.id.toString() === data.subCategory.toString() || 
        sub._id.toString() === data.subCategory.toString()
      )

      if (!selectedCategory || !selectedSubCategory) {
        throw new Error('Invalid category or subcategory selected')
      }

      // Upload images
      const uploadedImages = await Promise.all(
        selectedFiles.map(async (file) => {
          const result = await uploadImage(file)
          return result.imageUrl
        })
      )
      
      // Prepare product data
      const productData = { 
        ...data, 
        image: uploadedImages,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : 0,
        stockCount: Number(data.stockCount),
        stylesColors: data.stylesColors || '',
        category: [{
          _id: selectedCategory._id || selectedCategory.id,
          name: selectedCategory.name.trim()
        }],
        subCategory: [{
          _id: selectedSubCategory._id || selectedSubCategory.id,
          name: selectedSubCategory.name
        }]
      }
      
      await createProduct(productData)

      setToastData({
        status: 'success',
        message: 'Product uploaded successfully!',
      })
      reset()
      setPreviewImages([])
      setSelectedFiles([])
      setOpen(false)
    } catch (error) {
      console.error('Upload error:', error)
      setToastData({
        status: 'error',
        message: error.message || 'Failed to upload product',
      })
    } finally {
      setTimeout(() => {
        setToastData(null)
      }, 3000)
      setIsUploading(false)
      setLoading(false)
    }
  }

  const handleOpenChange = (newOpenState) => {
    if (!newOpenState) {
      // Reset form when closing
      reset()
      setPreviewImages([])
      setSelectedFiles([])
    }
    setOpen(newOpenState)
  }

  return (
    <>
      {toastData && <Toast status={toastData.status} message={toastData.message} />}
      
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>
          {trigger || (
            <Button className= "bg-black hover:bg-gray-800 text-white mx-auto rounded-md flex items-center gap-2">
              <FaUpload /> Add Product
            </Button>
          )}
        </Dialog.Trigger>
        
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[85vh] overflow-auto bg-white rounded-xl shadow-xl p-6 z-50">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Upload New Product
              </Dialog.Title>
              
              <Dialog.Close asChild>
                <button className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition">
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="relative">
                  <input 
                    type="file" 
                    id="productImages" 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                  <label 
                    htmlFor="productImages" 
                    className="cursor-pointer flex items-center justify-center border-2 border-dashed rounded-lg h-40 w-full bg-gray-50 hover:bg-gray-100 transition duration-300"
                  >
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
                        <img 
                          src={preview.url} 
                          alt="Preview" 
                          className="h-24 w-24 object-cover rounded-md border" 
                        />
                        <button 
                          type="button" 
                          onClick={() => removeImage(index)} 
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    {...register('productName', { required: true })} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                  {errors.productName && <p className="text-red-500 text-xs mt-1">Product name is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                  <input 
                    type="text" 
                    {...register('productDescription', { required: true })} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                  {errors.productDescription && <p className="text-red-500 text-xs mt-1">Product description is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    {...register('price', { required: true, min: 0 })} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">Valid price is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input 
                    type="number" 
                    {...register('discount', { min: 0, max: 100 })} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                  {errors.discount && <p className="text-red-500 text-xs mt-1">Discount must be between 0-100</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Count</label>
                  <input 
                    type="number" 
                    {...register('stockCount', { required: true, min: 0 })} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                  {errors.stockCount && <p className="text-red-500 text-xs mt-1">Stock count is required</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Styles/Colors</label>
                  <input 
                    type="text" 
                    {...register('stylesColors')} 
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    {...register('category', { required: true })} 
                    disabled={categoriesLoading}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  >
                    <option value="">Select category</option>
                    {categoriesLoading ? (
                      <option disabled>Loading categories...</option>
                    ) : (
                      categories.map((cat) => (
                        <option key={cat._id || cat.id} value={cat._id || cat.id}>
                          {cat.name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.category && <p className="text-red-500 text-xs mt-1">Category is required</p>}
                  {!categories.length && !categoriesLoading && (
                    <p className="text-red-500 text-xs mt-1">No categories available</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                  <select 
                    {...register('subCategory', { required: true })} 
                    disabled={subcategoriesLoading}
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  >
                    <option value="">Select subcategory</option>
                    {subcategoriesLoading ? (
                      <option disabled>Loading subcategories...</option>
                    ) : (
                      subcategories.map((sub) => (
                        <option key={sub._id || sub.id} value={sub._id || sub.id}>
                          {sub.name}
                        </option>
                      ))
                    )}
                  </select>
                  {errors.subCategory && <p className="text-red-500 text-xs mt-1">Subcategory is required</p>}
                  {!subcategories.length && !subcategoriesLoading && (
                    <p className="text-red-500 text-xs mt-1">No subcategories available</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Info</label>
                <textarea 
                  {...register('additionalInfo')} 
                  className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition" 
                  rows={4}
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <Dialog.Close asChild>
                  <Button 
                    type="button"
                    className="flex-1 p-3 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                
                <Button 
                  type="submit" 
                  className="flex-1 p-3 rounded-md bg-black hover:bg-gray-800 text-white font-medium flex items-center justify-center transition" 
                  disabled={isUploading || categoriesLoading || subcategoriesLoading}
                >
                  {isUploading ? (
                    <ClipLoader color="#fff" size={20} />
                  ) : (
                    <>
                      <FaUpload size={16} className="mr-2" /> 
                      Upload Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}