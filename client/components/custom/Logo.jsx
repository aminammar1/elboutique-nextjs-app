import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo({ className }) {
  return (
    <Link href="/">
      <Image
        className={cn('w-40 h-40', className)}
        src="/assets/images/logo.svg"
        alt="logo"
        height="0"
        width="0"
        priority
      />
    </Link>
  )
}
