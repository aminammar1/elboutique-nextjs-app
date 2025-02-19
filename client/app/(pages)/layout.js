import React from 'react'
import Header from '@/components/modules/header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
