import Signin from '@/components/modules/SignIn/SignIn'
import React from 'react'

export default function SignInPage() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex bg-cover bg-center bg-[url('https://res.cloudinary.com/ammarmohamdamine/image/upload/v1739964725/gx1v5ar12jskt12ewjvr.jpg')]"></div>
        <div className="flex justify-center items-center">
            <Signin />
        </div>
    </div>
  )
}
