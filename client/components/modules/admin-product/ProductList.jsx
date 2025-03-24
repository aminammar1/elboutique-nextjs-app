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
    const data = await fetchProducts()
    setProducts(data)
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

  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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

      <div className="grid grid-cols-5 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="border border-gray-400 rounded-lg p-4 shadow-md transition-all hover:shadow-lg bg-white"
          >
            <img
              src={product.image[0]}
              alt={product.productName}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-black truncate">{product.productName}</h3>
            <p className="text-sm text-gray-600">${product.price} - {product.stockCount} in stock</p>
            <p className="text-xs text-gray-500">Category: {product.category} - {product.subCategory}</p>
            <p className="text-xs mt-1 text-gray-700">{product.productDescription.slice(0, 50)}...</p>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-900"
                onClick={() => handleUpdateProduct(product)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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

        <span className="text-black px-4">{currentPage} / {totalPages}</span>

        <button
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

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
