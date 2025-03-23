'use client'

import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import React, { useState } from 'react'
import StoreSideBar from './StoreSideBar'
import StoreMainContent from './StoreMainContent'

export default function Store() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  return (
    <section className="my-10">
      <Container>
        <Row className="mt-10 gap-12 items-start">
          
          {/* Sidebar of the Store  */}
          <StoreSideBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="hidden lg:block"
          />
          {/* Main content of the Store  */}
          <StoreMainContent
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="flex-1 lg:flex flex-col gap-4 justify-start h-full"
          />
        </Row>
      </Container>
    </section>
  )
}
