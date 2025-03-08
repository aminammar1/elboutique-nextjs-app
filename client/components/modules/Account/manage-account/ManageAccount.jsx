'use client'

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserDetails, updateProfile, deleteUser } from '@/actions/User'
import { uploadAvatar } from '@/actions/upload'
import { useRouter } from 'next/navigation'
import { Shield, User, Link, X, Check, Upload, Trash2, Mail } from 'lucide-react'
import { loginSuccess, logout } from '@/store/userSlice'
import ChangePassword from './ChangePassword' 
import ConfirmDelete from '@/components/custom/DeleteDialog'
import Toast from '@/components/custom/Toast'

export default function ManageAccount({ close }) { 
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [activeTab, setActiveTab] = useState('profile')
  const router = useRouter()
  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false) 
  const fileInputRef = useRef(null)
  const [toastData, setToastData] = useState(null)

  useEffect(() => {
    dispatch(fetchUserDetails())
    if (user?.name) setName(user.name)
    if (user?.email) setEmail(user.email)
  }, [dispatch, user?.name, user?.email])

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoading(true)
      try {
        const formData = new FormData()
        formData.append('avatar', file)

        const response = await uploadAvatar(formData)
        if (response.success) {
          dispatch(loginSuccess({ ...user, avatar: response.data.avatar }))
          setToastData({
            status: 'success',
            message: response.message || 'Avatar uploaded successfully',
          })
          setTimeout(() => {
            setToastData(null)
          }, 3000)
        }
      } catch (error) {

        setToastData({
          status: 'error',
          message: error.message || 'Failed to upload avatar',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)

      } finally {
        setLoading(false)
      }
    }
  }

  const handleProfileUpdate = () => {
    dispatch(updateProfile({ name, email })).then((response) => {
        if (response.success) {
          dispatch(loginSuccess({ ...user, name, email }))
          setEditName(false)
          setEditEmail(false) 
          
          setToastData({
            status: 'success',
            message: response.message || 'Profile updated successfully',
          })
        }
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      })
      .catch((error) => {
        setToastData({
          status: 'error',
          message: error.message || 'Failed to update profile',
        })
        setTimeout(() => {
          setToastData(null)
        }, 3000)
      })
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      const response = await deleteUser()
      setLoading(false)
      setShowDeleteDialog(false)

      if (response.success) {

        setToastData({
          status: 'success',
          message: response.message || 'Account deleted successfully',
        })
        dispatch(logout())
        router.push("/")
      }
    } catch (error) {
      setLoading(false)
      setShowDeleteDialog(false)

      setToastData({
        status: 'error',
        message: error.message || 'Failed to delete account',
      })

      setTimeout(() => {
        setToastData(null)
      }, 3000)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full">
      <div className="w-64 bg-gray-50 p-6 border-r">
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-semibold text-black">Account</h2>
          <p className="text-sm text-gray-600 mt-1">Manage your account info.</p>


          {/* Show Toast if there is a message */}
          {toastData && <Toast status={toastData.status} message={toastData.message} />}

          <div className="mt-8 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full py-2 px-4 rounded-md text-black ${
                activeTab === 'profile' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <User className="w-5 h-5 text-gray-600" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 w-full py-2 px-4 rounded-md text-black ${
                activeTab === 'security' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              <Shield className="w-5 h-5 text-gray-600" />
              Security
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-semibold text-black">
              {activeTab === 'profile' ? 'Profile details' : 'Security settings'}
            </h2>
            <button onClick={close} className="p-1 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="py-4 space-y-6">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={user?.avatar || '/assets/images/default-avatar.png'}
                      alt="User Avatar"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <button 
                      onClick={handleUploadClick}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <Upload className="w-3 h-3" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  <div>
                    {editName ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <button 
                          onClick={handleProfileUpdate}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="font-medium">{user?.name || 'User'}</p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setEditName(true)} 
                  className="text-blue-600 hover:underline text-sm"
                >
                  Update profile
                </button>
              </div>

              {/* Email Section */}
              <div className="border-t border-b py-4">
                <p className="text-sm text-gray-600 mb-3">Email Address</p>
                <div className="flex items-center justify-between">
                  {editEmail ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      />
                      <button 
                        onClick={handleProfileUpdate}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-800">{user?.email || 'user@example.com'}</p>
                  )}
                  <button 
                    onClick={() => setEditEmail(true)} 
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Connected accounts */}
              <div className="py-4">
                <p className="text-sm text-gray-600 mb-3">Connected accounts</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-600" />
                    <p className="text-gray-800">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="flex items-center">
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Connected
                  </span>
                  </div>
                </div>
                <button className="mt-3 text-blue-600 flex items-center gap-2 hover:underline text-sm">
                  <Link className="w-4 h-4" /> Connect account
                </button>
              </div>
            </div>
          )}
           {/* Security content */}
            {activeTab === 'security' && (
            <div className="py-4 space-y-6">
              <div className="bg-white p-4 rounded-md border">
                <h3 className="font-medium mb-2 text-black">Password</h3>
                <p className="text-gray-600 mb-4 text-sm">Update your password to enhance account security.</p>
                <button 
                  onClick={() => setShowChangePasswordModal(true)} // Open the modal
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
                >
                  Change password
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-md border">
                <h3 className="font-medium mb-2 text-red-600">Delete Account</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button 
                  onClick={() => setShowDeleteDialog(true)} 
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ChangePassword close={() => setShowChangePasswordModal(false)} />
        </div>
      )}

      {/* Delete Dialog */}
      {showDeleteDialog && (
        <ConfirmDelete 
          onConfirm={handleDeleteAccount} 
          onClose={() => setShowDeleteDialog(false)} 
        />
      )}
    </div>
  )
}