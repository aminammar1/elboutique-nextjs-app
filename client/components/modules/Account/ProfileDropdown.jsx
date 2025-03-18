'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '@/actions/auth'
import { Cog , LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfileDropdown({setShowManageAccount}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    dispatch(signout()).then((result) => {
      if (result.success) {
        router.push('/')
      } else {
        console.error(result.message)
      }
    })
  }

  const handleManageAccount = () => {
    setShowManageAccount(true) 
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Profile Image Button */}
      <button 
        className="flex items-center justify-center rounded-full overflow-hidden"
        onClick={toggleDropdown}
      >
        <img
          src={user?.avatar || '/assets/images/default-avatar.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed mt-2 w-80 bg-white rounded-md shadow-lg z-50">
          <div className="p-2 ">
          
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || '/assets/images/default-avatar.png'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-600">{user?.email || 'user@example.com'} ({user?.role || 'user' }) </p>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-1"></div>
          <div className="p-2">
            <button
              onClick={handleManageAccount}  
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 w-full text-left"
            >
              <Cog className="w-5 h-5 text-gray-500" />
              <span>Manage account</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 w-full text-left"
            >
              <LogOut className="w-5 h-5 text-gray-500" />
              <span>Sign out</span>
            </button>
          </div>

          <div className="p-2 bg-gray-50 text-center text-sm text-gray-500 rounded-b-md">
            <span className="font-semibold">El Boutique</span>
          </div>
        </div>
      )}
    </div>
  )
}