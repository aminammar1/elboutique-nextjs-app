'use client'

import React from 'react'
import FramerMotionProvider from './FramerMotionProvider'
import ToastProvider from './ToasterProvider'
import ReduxProvider from './ReduxProvider'

export default function Providers({ children }) {
  return (
      <ReduxProvider>
        <FramerMotionProvider>
          <ToastProvider />
          {children}
        </FramerMotionProvider>
      </ReduxProvider>
  )
}
