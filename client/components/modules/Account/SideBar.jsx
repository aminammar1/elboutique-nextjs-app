'use client'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '@/actions/auth'
import { cn } from '@/lib/utils'
import {
  BadgeDollarSign,
  LayoutDashboard,
  BookUser,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchUserDetails } from '@/actions/User'
import ProfileDropdown from './ProfileDropdown'
import ManageAccount from './manage-account/ManageAccount'

export default function SidebarAccount() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const router = useRouter()
  const [showManageAccount, setShowManageAccount] = useState(false)

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
    <>
    <div className="!z-1 flex flex-col">
      <aside
        className={cn(
          '!z-1 h-full bg-white shadow-md absolute xl:relative xl:translate-x-0 top-10 left-0 w-64 transition-transform -translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col items-start gap-4 bg-gray-50 py-4">
          <ul className="flex flex-col gap-4 w-full ps-12">
            {/* Avatar Upload */}
            <li className="flex ps-12">
            <ProfileDropdown setShowManageAccount={setShowManageAccount} />
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
