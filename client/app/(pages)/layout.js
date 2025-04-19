import React from 'react'
import Header from '@/components/modules/header'
import Footer from '@/components/modules/footer/Footer'
import MobileBottomNav from '@/components/modules/MobileNavBar/MobileBottomNav'
import ChatbotButton from '@/components/custom/ChatbotButton'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <MobileBottomNav />
      <Footer />
      <ChatbotButton />
    </div>
  )
}
