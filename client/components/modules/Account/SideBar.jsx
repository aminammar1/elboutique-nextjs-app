'use client'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '@/actions/auth'
import { LogOut, Menu, X } from 'lucide-react'
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
  const [isMobileOpen, setIsMobileOpen] = useState(false)

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

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  // Close sidebar when clicking a link on mobile
  const handleMobileNavigation = () => {
    if (window.innerWidth < 1280) {
      // xl breakpoint in Tailwind
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md xl:hidden"
        aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen w-64 bg-white shadow-lg fixed top-0 left-0 z-30 flex flex-col p-4 transition-all duration-300 ease-in-out
                  ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                  xl:relative xl:translate-x-0`}
      >
        <div className="flex justify-center mt-10 xl:mt-0">
          <ProfileDropdown setShowManageAccount={setShowManageAccount} />
        </div>
        <ul className="mt-6 space-y-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-200 transition"
                onClick={handleMobileNavigation}
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
                    onClick={handleMobileNavigation}
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
              onClick={() => {
                handleLogout()
                handleMobileNavigation()
              }}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-200 transition"
            >
              <LogOut />
              <span className="ml-3 font-medium">Sign Out</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Overlay that closes the sidebar when clicked (mobile only) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}

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
