import SignUp from '@/components/modules/SignUp/SignUp'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex bg-cover bg-center bg-[url('/assets/images/sign-image.jpg')]"></div>
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  )
}
