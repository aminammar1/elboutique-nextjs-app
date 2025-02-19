'use client'

import React from 'react'
import { Button } from '@mui/material'
import { CiLogin, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci'
import { useRouter } from 'next/navigation'

export default function IconsGroups({
  openSearchBar,
  openCartBar,
  setOpenSearchBar,
  setOpenCartBar,
}) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-12 relative">
        <div className="inline-flex items-center gap-1">
        <Button
            variant="nostyle"
            size='icon'
            onClick={() => setOpenSearchBar(!openSearchBar)}
            className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300"
        >
            <CiSearch size={40} className="hover:text-black" />
        </Button>
        <Button
            variant="nostyle"
            size='icon'
            onClick={() => router.push('/cart')}
            className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300"
        >
            <CiShoppingCart size={40} className="font-bold hover:text-black" />
            <span className="absolute flex items-center justify-center text-white text-base -top-1 justify-items-stretch -right-1 h-6 w-6 rounded-full bg-black">
            0
            </span>
        </Button>
        <Button
            variant="nostyle"
            size='icon'
            onClick={() => router.push('/sign-in')}
            className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300"
        >
            <CiLogin size={40} />
        </Button>

    </div>
    </div>
  )
}
