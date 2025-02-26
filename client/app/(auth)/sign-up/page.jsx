import SignUp from '@/components/modules/SignUp/SignUp'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex bg-cover bg-center bg-[url('https://res.cloudinary.com/ammarmohamdamine/image/upload/v1740597086/fiiwkmtenlxr3fsehzu4.jpg')]"></div>
      <div className="flex justify-center items-center">
        <SignUp />
      </div>
    </div>
  )
}
