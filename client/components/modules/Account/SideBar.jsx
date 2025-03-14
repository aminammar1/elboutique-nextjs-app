'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '@/actions/auth'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchUserDetails } from '@/actions/User'
import ProfileDropdown from './ProfileDropdown'
import ManageAccount from './manage-account/ManageAccount'
import isAdmin from '@/lib/AdminVerify'
import { menuItems } from '@/constants/menuItems'
import { adminItems } from '@/constants/adminItems'

export default function SidebarAccount() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const user = useSelector((state) => state.user.user)
  const router = useRouter()
  const [showManageAccount, setShowManageAccount] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserDetails())
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
    <>
      <aside className="h-screen w-64 bg-white shadow-lg fixed top-0 left-0 flex flex-col p-4 transition-transform xl:relative xl:translate-x-0">
        <div className="flex justify-center">
          <ProfileDropdown setShowManageAccount={setShowManageAccount} />
        </div>
        <ul className="mt-6 space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-200 transition"
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </Link>
            </li>
          ))}

          {isAdmin(user?.role) && (
            <>
              <hr className="my-4 border-gray-300" />
              {adminItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-200 transition"
                  >
                    {item.icon}
                    <span className="ml-3 font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </>
          )}

          <hr className="my-4 border-gray-300" />
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-200 transition"
            >
              <LogOut />
              <span className="ml-3 font-medium">Sign Out</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Account Management Modal overlay */}
      {showManageAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl h-[90%] max-h-[700px] overflow-hidden">
            <ManageAccount close={() => setShowManageAccount(false)} />
          </div>
        </div>
      )}
    </>
  )
}
