'use client'
import { cn } from '@/lib/utils'
import {
  BadgeDollarSign,
  LayoutDashboard,
  BookUser,
  AlignJustify,
  LogOut,
  User,
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@mui/material'


export default function SidebarAccount() {
  const [openSidebar, setSidebar] = useState(false)

  const handleSignOut = () => {
    // Handle logout logic here
    console.log('User signed out')
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
            <li className="flex ps-12">
              <div className="flex justify-center items-center">
                <User className="w-10 h-10 text-gray-600" />
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

            <li
              className="flex items-center p-2 cursor-pointer hover:text-black"
              onClick={handleSignOut}
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
