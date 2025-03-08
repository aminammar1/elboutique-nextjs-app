'use client'

import { useState } from 'react'

export default function ConfirmDelete({ onConfirm, onClose }) {
  const [open, setOpen] = useState(true)

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-sm font-bold text-gray-900">Are you sure?</h2>
            <p className="text-gray-600 mt-2">This action is irreversible.</p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setOpen(false)
                  onClose()
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false)
                  onConfirm()
                }}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
