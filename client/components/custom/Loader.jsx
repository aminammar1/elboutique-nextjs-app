import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

export default function Loader() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <LoaderCircleIcon className="text-gray-950 animate-spin" size={100} />
    </div>
  )
}
