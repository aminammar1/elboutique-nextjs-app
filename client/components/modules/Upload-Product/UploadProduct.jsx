'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaImage, FaUpload } from 'react-icons/fa'
import { Button } from '@/components/custom/Button'

export default function UploadProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [previewImage, setPreviewImage] = useState(null)

  const onSubmit = (data) => {
    console.log(data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-white-100 p-2">
      <div className=" max-w-8xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-md mb-10 overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 pb-6"
        >
          {/* Image Upload Section */}
          <div className="mb-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="productImage"
                {...register('productImage', { required: true })}
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="productImage"
                className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${
                  errors.productImage ? 'border-red-400' : 'border-gray-300'
                } rounded-lg h-60 w-full bg-gray-50 hover:bg-gray-100 transition duration-300`}
              >
                {previewImage ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <FaImage className="text-gray-400 text-5xl mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload product image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </label>
              {errors.productImage && (
                <span className="text-red-500 text-xs mt-1 block">
                  Product image is required
                </span>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <input
                {...register('productDescription', { required: true })}
                placeholder="Enter product description"
                className={`w-full p-3 rounded-md border ${
                  errors.productDescription
                    ? 'border-red-400'
                    : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              />
              {errors.productDescription && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                {...register('price', { required: true })}
                placeholder="0.00"
                className={`w-full p-3 rounded-md border ${
                  errors.price ? 'border-red-400' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              />
              {errors.price && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register('category', { required: true })}
                className={`w-full p-3 rounded-md border ${
                  errors.category ? 'border-red-400' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              >
                <option value="">Select category</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <select
                {...register('subcategory', { required: true })}
                className={`w-full p-3 rounded-md border ${
                  errors.subcategory ? 'border-red-400' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              >
                <option value="">Select subcategory</option>
              </select>
              {errors.subcategory && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Count
              </label>
              <input
                type="number"
                {...register('stockCount', { required: true })}
                placeholder="0"
                className={`w-full p-3 rounded-md border ${
                  errors.stockCount ? 'border-red-400' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              />
              {errors.stockCount && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                {...register('quantity', { required: true })}
                placeholder="0"
                className={`w-full p-3 rounded-md border ${
                  errors.quantity ? 'border-red-400' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
              />
              {errors.quantity && (
                <span className="text-red-500 text-xs mt-1 block">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                {...register('discount')}
                placeholder="0"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Styles / Colors
              </label>
              <input
                type="text"
                {...register('stylesColors')}
                placeholder="e.g. Red, Blue, Large, Small"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Info
            </label>
            <textarea
              {...register('additionalInfo')}
              placeholder="Enter any additional product information"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              rows={4}
            />
          </div>

          <div className="sticky bottom-0 pt-4 bg-white">
            <Button
              type="submit"
              className="w-full p-3 sm:p-4 rounded-md bg-black hover:bg-gray-800 text-white font-medium transition duration-300 flex items-center justify-center"
            >
              <FaUpload className="mr-2" /> Upload Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
