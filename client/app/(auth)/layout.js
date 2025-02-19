'use client'

import React from 'react'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="h-screen">
      <div className="absolute top-10  left-10 flex items-center gap-4 group">
        <Button
          variant="nostyle"
          className=" text-black group-hover:text-gray-700 flex gap-8 items-center"
          onClick={() => router.back()}
        >
          <MoveLeft
            size={40}
            className=" text-black group-hover:text-black duration-100 ease-linear group-hover:translate-x-2"
          />
          Go Back
        </Button>
      </div>
      {children}
    </div>
  )
}
