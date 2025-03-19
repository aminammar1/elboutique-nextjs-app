'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/actions/Categories'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/custom/table'
import { Button } from '@/components/custom/Button'
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'

export default function Category() {
  const [categories, setCategories] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)
  const { control, handleSubmit, reset, setValue } = useForm()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleAddCategory = async (data) => {
    try {
      setLoading(true)
      const response = await createCategory(data.categoryName)
      if (response.success) {
        reset({ categoryName: '' })
        loadCategories()
        setToastData({
          status: 'success',
          message: 'Category added successfully!',
        })

        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to add category',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      const response = await deleteCategory(id)
      if (response.success) {
        loadCategories()
        setToastData({
          status: 'success',
          message: 'Category deleted successfully!',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to delete category',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    }
  }

  const handleUpdateDialog = (category) => {
    setSelectedCategory(category)
    setValue('newName', category.name)
    setIsDialogOpen(true)
  }

  const handleDialogSubmit = async (data) => {
    try {
      const response = await updateCategory(selectedCategory._id, data.newName)
      if (response.success) {
        setIsDialogOpen(false)
        loadCategories()
        setToastData({
          status: 'success',
          message: 'Category updated successfully!',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to update category',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    }
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = categories.slice(indexOfFirstRow, indexOfLastRow)

  return (
    <div className="min-h-screen bg-white-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {toastData && (
            <Toast status={toastData.status} message={toastData.message} />
          )}
          <form
            onSubmit={handleSubmit(handleAddCategory)}
            className="space-y-4"
          >
            <Controller
              name="categoryName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-black"
                  placeholder="Enter category name"
                  required
                />
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : 'Add Category'}
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No categories added yet.
                  </TableCell>
                </TableRow>
              ) : (
                currentRows.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{indexOfFirstRow + index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="flex gap-2">
                      <button
                        onClick={() => handleUpdateDialog(category)}
                        className="text-black hover:text-gray-600"
                      >
                        <Pencil1Icon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label>
                Rows per page:
                <select
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  className="ml-2 p-1 border rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
            </div>
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="mx-4">
                Page {currentPage} of {Math.ceil(categories.length / rowsPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(categories.length / rowsPerPage)}
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-96">
            <Dialog.Title className="font-bold text-sm">
              Update Category
            </Dialog.Title>
            <form onSubmit={handleSubmit(handleDialogSubmit)} className="mt-4">
              <Controller
                name="newName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-black"
                    placeholder="Enter new name"
                    required
                  />
                )}
              />
              <div className="mt-4 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 text-black hover:bg-gray-200 rounded-md">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 p-1 text-gray-600 hover:text-gray-800">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}