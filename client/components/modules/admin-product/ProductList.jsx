'use client'

import { useEffect, useState } from 'react'
import { deleteProduct, fetchProducts } from '@/actions/product'
import { FaSearch, FaTimes } from 'react-icons/fa'
import UpdateProductDialog from './UpdateProductDialog'
import Toast from '@/components/custom/Toast'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [toastData, setToastData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (toastData) {
      const timer = setTimeout(() => setToastData(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastData])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data || [])
    } catch (error) {
      setToastData({ type: 'error', message: 'Failed to load products' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id)
      if (response.success) {
        setToastData({ type: 'success', message: 'Product deleted successfully' })
        loadProducts()
      }
    } catch (error) {
      setToastData({ type: 'error', message: error.message || 'Delete failed' })
    }
  }

  const handleUpdateProduct = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseDialog = () => {
    setSelectedProduct(null)
  }

  // Safe category name extraction
  const getCategoryName = (category) => {
    if (!category) return 'No category'
    if (Array.isArray(category)) {
      return category.map(c => c?.name || 'Unnamed').join(', ')
    }
    return category?.name || 'Unnamed'
  }

  // Safe subcategory name extraction
  const getSubCategoryName = (subCategory) => {
    if (!subCategory) return 'No subcategory'
    if (Array.isArray(subCategory)) {
      return subCategory.map(s => s?.name || 'Unnamed').join(', ')
    }
    return subCategory?.name || 'Unnamed'
  }

  const filteredProducts = products.filter((p) =>
    p.productName?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {toastData && <Toast status={toastData.type} message={toastData.message} />}

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all duration-200 shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {displayedProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-lg p-4 shadow-md transition-all hover:shadow-lg bg-white"
              >
                <img
                  src={product.image?.[0] || '/placeholder-product.png'}
                  alt={product.productName}
                  className="w-full h-32 object-cover rounded-md mb-3"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.png'
                  }}
                />
                <h3 className="text-lg font-semibold text-black truncate">
                  {product.productName || 'Unnamed Product'}
                </h3>
                <p className="text-sm text-gray-600">
                  ${product.price?.toFixed(2) || '0.00'} - {product.stockCount || 0} in stock
                </p>
                <p className="text-xs text-gray-500">
                  Category: {getCategoryName(product.category)} - {getSubCategoryName(product.subCategory)}
                </p>
                <p className="text-xs mt-1 text-gray-700">
                  {product.productDescription?.slice(0, 50) || 'No description'}...
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-900 transition"
                    onClick={() => handleUpdateProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-black px-4">
              {currentPage} / {totalPages || 1}
            </span>

            <button
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedProduct && (
        <UpdateProductDialog
          product={selectedProduct}
          onClose={handleCloseDialog}
          onUpdated={loadProducts}
          setToastData={setToastData}
        />
      )}
    </div>
  )
}