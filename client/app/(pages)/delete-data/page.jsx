'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const DeleteDataPage = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const router = useRouter()

  const handleDeleteData = async () => {
    if (!confirmDelete) {
      setMessage('Please confirm deletion by checking the box below')
      return
    }

    try {
      setIsDeleting(true)
      setMessage('Deleting your data...')

      // Call to your API endpoint to delete user data
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete user data')
      }

      setMessage('Your data has been successfully deleted!')

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Delete Your Facebook Auth Data
        </h1>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            This page allows you to delete all your data associated with
            Facebook authentication. This action is permanent and cannot be
            undone.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
            <p className="text-yellow-800 font-medium">Warning</p>
            <p className="text-yellow-700 text-sm">
              Deleting your data will remove all your preferences, saved items,
              and account information.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              checked={confirmDelete}
              onChange={() => setConfirmDelete(!confirmDelete)}
            />
            <span className="ml-2 text-gray-700">
              I confirm I want to delete my data
            </span>
          </label>
        </div>

        {message && (
          <div
            className={`p-4 rounded mb-4 ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleDeleteData}
            disabled={isDeleting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isDeleting ? 'Processing...' : 'Delete My Data'}
          </button>

          <Link
            href="/"
            className="text-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DeleteDataPage
