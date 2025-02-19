import { cn } from '@/lib/utils'
import React from 'react'

export default function Row({ className, children }) {
  return (
    <div className={cn('flex items-center h-full', className)}>{children}</div>
  )
}
