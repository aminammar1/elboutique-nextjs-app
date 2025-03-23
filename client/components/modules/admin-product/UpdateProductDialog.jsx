'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateProduct, uploadImage } from '@/actions/product'
import { FaTrash, FaUpload , FaTimes } from 'react-icons/fa'

export default function UpdateProductDialog({ product, onClose, onUpdated ,setToastData }) {
    const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    } = useForm({
    defaultValues: {
        productName: product?.productName || '',
        category: product?.category || '',
        subCategory: product?.subCategory || '',
        stockCount: product?.stockCount || '',
        price: product?.price || '',
        discount: product?.discount || '',
        productDescription: product?.productDescription || '',
        additionalInfo: product?.additionalInfo || '',
        stylesColors: product?.stylesColors || '',
        image: product?.image || [],
    },
    })

    const [previewImages, setPreviewImages] = useState(product?.image || [])
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])

    const uploadedImages = await Promise.all(
        files.map(async (file) => {
        const result = await uploadImage(file)
        return result.imageUrl
        })
    )

    const updatedImages = [...previewImages, ...uploadedImages]
    setPreviewImages(updatedImages)
    setValue('image', updatedImages)
    }

    const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    setValue(
        'image',
        previewImages.filter((_, i) => i !== index)
    )
    }

    const onSubmit = async (data) => {
        try {
            const response = await updateProduct(product._id, { ...data, image: previewImages })
            if (response.success) {
            setToastData({ type: 'success', message: 'Product updated successfully' })
            onUpdated()
            onClose()
            }
        } catch (error) {
            setToastData({ type: 'error', message: error.message || 'Something went wrong. Please try again' })
        }
        }

    return (
    <Dialog.Root open={!!product} onOpenChange={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black/70  z-50" />
        <Dialog.Content className="fixed p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[500px] max-h-[90vh] overflow-y-auto z-50">
        <div className="sticky top-0 bg-white pb-2 mb-2 border-b border-gray-100 flex justify-between items-center">
            <Dialog.Title className="text-black text-lg font-semibold">
            Update Product
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-black p-1">
                <FaTimes size={18} />
            </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
            <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Product Name
            </label>
            <input
                id="productName"
                {...register('productName', {
                required: 'Product name is required',
                })}
                type="text"
                placeholder="Enter product name"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
            {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
                </p>
            )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Images
            </label>
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
                className="cursor-pointer flex items-center justify-center border-2 border-dashed rounded-lg h-20 w-full bg-gray-50 hover:bg-gray-100 transition duration-300"
                >
                <div className="flex flex-col items-center">
                    <FaUpload className="text-gray-400 text-xl mb-1" />
                    <p className="text-sm text-gray-500">
                    Click to upload images
                    </p>
                </div>
                </label>
            </div>
            </div>

            {previewImages.length > 0 && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {previewImages.map((img, index) => (
                <div key={index} className="relative group">
                    <img
                    src={img}
                    alt="Preview"
                    className="h-20 w-full object-cover rounded-md border"
                    />
                    <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                    >
                    <FaTrash size={12} />
                    </button>
                </div>
                ))}
            </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
                <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Category
                </label>
                <input
                id="category"
                {...register('category')}
                type="text"
                placeholder="Category"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
            </div>
            <div>
                <label
                htmlFor="subCategory"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Subcategory
                </label>
                <input
                id="subCategory"
                {...register('subCategory')}
                type="text"
                placeholder="Subcategory"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
            </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
                <label
                htmlFor="stockCount"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Stock
                </label>
                <input
                id="stockCount"
                {...register('stockCount')}
                type="number"
                placeholder="Stock Count"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
            </div>
            <div>
                <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Price
                </label>
                <input
                id="price"
                {...register('price')}
                type="number"
                placeholder="Price"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
            </div>
            <div>
                <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Discount
                </label>
                <input
                id="discount"
                {...register('discount')}
                type="number"
                placeholder="Discount"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                />
            </div>
            </div>

            <div>
            <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Description
            </label>
            <textarea
                id="productDescription"
                {...register('productDescription')}
                placeholder="Product Description"
                rows="3"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            ></textarea>
            </div>

            <div>
            <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Additional Info
            </label>
            <textarea
                id="additionalInfo"
                {...register('additionalInfo')}
                placeholder="Additional Info"
                rows="2"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            ></textarea>
            </div>

            <div>
            <label
                htmlFor="stylesColors"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Styles & Colors
            </label>
            <input
                id="stylesColors"
                {...register('stylesColors')}
                type="text"
                placeholder="Comma separated (e.g. Red, Blue, Large, Small)"
                className="border p-2 rounded w-full bg-gray-50 text-black outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />
            </div>

            <div className="flex gap-3 mt-6 pt-3 border-t border-gray-100">
            <button
                type="submit"
                className="flex-1 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
                Save Changes
            </button>
            <button
                type="button"
                className="flex-1 bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                onClick={onClose}
            >
                Cancel
            </button>
            </div>
        </form>
        </Dialog.Content>
    </Dialog.Root>
    )
}