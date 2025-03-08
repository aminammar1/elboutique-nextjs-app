'use client'

import { useState } from 'react'
import { changePassword } from '@/actions/User'
import Toast from '@/components/custom/Toast'

export default function ChangePassword({ close }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)

  const handleChangePassword = async () => {
    try {
      const response = await changePassword(oldPassword, newPassword)

      if (response.success) {
        setToastData({
          status: 'success',
          message: response.message || 'Password changed successfully',
        })
        close() // Close the modal after successful password change
      }
    } catch (error) {
      setToastData({
        status: 'error',
        message: error.message || 'Failed to change password',
      })

      setTimeout(() => {
        setToastData(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-black mb-4">Change Password</h2>

      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}

      <label className="block text-sm font-medium text-gray-700">
        Old Password
      </label>
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full border rounded-md p-2 mt-1"
        placeholder="Enter your old password"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">
        New Password
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded-md p-2 mt-1"
        placeholder="Enter your new password"
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">
        Confirm New Password
      </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border rounded-md p-2 mt-1"
        placeholder="Confirm your new password"
      />

      <button
        onClick={handleChangePassword}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 bg-black"
      >
        {loading ? 'Changing...' : 'Confirm Change'}
      </button>

      <button
        onClick={close}
        className="mt-2 w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  )
}
