import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right" 
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f1f1f',
          color: '#fff',
        },
      }}
    />
  )
}
