import React from 'react'
import Header from '@/components/modules/header'
import Footer from '@/components/modules/footer/Footer'
import MobileBottomNav from '@/components/modules/MobileNavBar/MobileBottomNav'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <MobileBottomNav />
      <Footer />
    </>
  )
}
