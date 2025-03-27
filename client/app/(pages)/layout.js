import React from 'react'
import Header from '@/components/modules/header'
import Footer from '@/components/modules/footer/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
