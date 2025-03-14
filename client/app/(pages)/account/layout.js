import SidebarAccount from '@/components/modules/Account/SideBar'
import * as React from 'react'
import Container from '@/components/custom/Container'

export default function AccountLayout({ children }) {
  return (
    <section className="py-10 relative h-screen">
      <Container className="overflow-x-auto ">
        <div className="flex relative">
          <SidebarAccount />
          <div className="flex-1">{children}</div>
        </div>
      </Container>
    </section>
  )
}
