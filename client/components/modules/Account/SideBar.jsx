'use client'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadAvatar } from '@/actions/upload'
import { signout } from '@/actions/auth'
import { cn } from '@/lib/utils'
import {
  BadgeDollarSign,
  LayoutDashboard,
  BookUser,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { loginSuccess } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import { fetchUserDetails } from '@/actions/User'

export default function SidebarAccount() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

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
        }
      } catch (error) {
        console.error('Upload failed:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserDetails()) // Fetch user details
    }
  }, [dispatch, isAuthenticated])

  const handleLogout = () => {
    dispatch(signout()).then((result) => {
      if (result.success) {
        router.push('/')
      } else {
        console.error(result.message)
      }
    })
  }

  return (
    <div className="!z-1 flex flex-col">
      <aside
        className={cn(
          '!z-1 h-full bg-white shadow-md absolute xl:relative xl:translate-x-0 top-10 left-0 w-64 transition-transform -translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col items-start gap-4 overflow-y-auto bg-gray-50 py-4">
          <ul className="flex flex-col gap-4 w-full ps-12">
            {/* Avatar Upload */}
            <li className="flex ps-12">
              <div
                className="relative flex justify-center items-center rounded-full bg-gray-100 p-2 cursor-pointer"
                onClick={handleUploadClick}
              >
                {loading ? (
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                ) : (
                  <img
                    src={user?.avatar || '/assets/images/default-avatar.png'}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </li>

            <li>
              <Link
                href="/account/dashboard"
                className="flex items-center p-2 hover:text-black"
              >
                <LayoutDashboard />
                <h6 className="ms-3">Dashboard</h6>
              </Link>
            </li>

            <li>
              <Link
                href="/account/orders"
                className="flex items-center p-2 hover:text-black"
              >
                <BadgeDollarSign />
                <h6 className="ms-3">Your orders</h6>
              </Link>
            </li>

            <li>
              <Link
                href="/account/address"
                className="flex items-center p-2 hover:text-black"
              >
                <BookUser />
                <h6 className="ms-3">Your addresses</h6>
              </Link>
            </li>

            {/* Logout */}
            <li
              className="flex items-center p-2 cursor-pointer hover:text-black"
              onClick={handleLogout}
            >
              <LogOut />
              <h6 className="ms-3">Sign out </h6>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
