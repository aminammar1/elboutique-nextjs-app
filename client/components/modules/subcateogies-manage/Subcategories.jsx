'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/custom/Button'
import {
  getAllSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from '@/actions/Subcategories'
import { getCategories } from '@/actions/Categories'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/custom/table'
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)
  const { control, handleSubmit, reset, setValue } = useForm()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  useEffect(() => {
    loadSubcategories()
    loadCategories()
  }, [])

  const loadSubcategories = async () => {
    try {
      const data = await getAllSubcategories()
      setSubcategories(data)
    } catch (error) {
      console.error('Error loading subcategories:', error.message)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error.message)
    }
  }

  const handleAddSubcategory = async (data) => {
    try {
      setLoading(true)
      const response = await createSubcategory({
        name: data.subcategoryName,
        category: data.category,
      })
      if (response.success) {
        reset({ subcategoryName: '', category: '' })
        loadSubcategories()
        setToastData({
          status: 'success',
          message: 'Subcategory added successfully!',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to add subcategory',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSubcategory = async (id) => {
    try {
      const response = await deleteSubcategory(id)
      if (response.success) {
        loadSubcategories()
        setToastData({
          status: 'success',
          message: 'Subcategory deleted successfully!',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to delete subcategory',
      })
      setTimeout(() => {
        setToastData(null)
      }, 3000)
    }
  }

  const handleUpdateDialog = (subcategory) => {
    setSelectedSubcategory(subcategory)
    setValue('newName', subcategory.name || '')
    setValue('newCategory', subcategory.category && subcategory.category.length > 0 ? subcategory.category[0]._id : '')
    setIsDialogOpen(true)
  }

  const handleDialogSubmit = async (data) => {
    try {
      const response = await updateSubcategory(selectedSubcategory._id, {
        name: data.newName,
        category: data.newCategory,
      })
      if (response.success) {
        setIsDialogOpen(false)
        loadSubcategories()
        setToastData({
          status: 'success',
          message: 'Subcategory updated successfully!',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: 'Failed to update subcategory',
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
  const currentRows = subcategories.slice(indexOfFirstRow, indexOfLastRow)

  return (
    <div className="min-h-screen bg-white-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {toastData && <Toast status={toastData.status} message={toastData.message} />}
          <form onSubmit={handleSubmit(handleAddSubcategory)} className="space-y-4">
            <Controller
              name="subcategoryName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input {...field} type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-black" placeholder="Enter subcategory name" required />
              )}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} className="w-full px-4 py-2  rounded-md  outline-none border text-black" required>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <Button type="submit" className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? <ClipLoader color="#fff" size={20} /> : ' Add Subcategory '}
            </Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">No subcategories added yet.</TableCell>
                </TableRow>
              ) : (
                currentRows.map((subcategory, index) => (
                  <TableRow key={subcategory._id}>
                    <TableCell>{indexOfFirstRow + index + 1}</TableCell>
                    <TableCell>{subcategory.name}</TableCell>
                    <TableCell>
                      {subcategory.category && subcategory.category.length > 0
                        ? subcategory.category[0].name
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <button
                        onClick={() => handleUpdateDialog(subcategory)}
                        className="text-black hover:text-gray-600"
                        type="button"
                      >
                        <Pencil1Icon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubcategory(subcategory._id)}
                        className="text-red-500 hover:text-red-700"
                        type="button"
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
                Page {currentPage} of {Math.ceil(subcategories.length / rowsPerPage)}
              </span>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(subcategories.length / rowsPerPage)}
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
            <Dialog.Title className="font-bold text-sm">Update Subcategory</Dialog.Title>
            <form onSubmit={handleSubmit(handleDialogSubmit)} className="mt-4">
              <Controller name="newName" control={control} defaultValue="" render={({ field }) => (
                <input {...field} type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-black mb-4" placeholder="Enter new name" required />
              )} />
              <Controller name="newCategory" control={control} defaultValue="" render={({ field }) => (
                <select {...field} className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-black text-black mb-4" required>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              )} />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Save</button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}