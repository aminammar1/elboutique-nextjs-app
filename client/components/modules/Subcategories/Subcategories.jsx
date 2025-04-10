'use client'

import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import React, { useState, useEffect } from 'react'
import StoreSideBar from '../Store/StoreSideBar'
import StoreMainContent from '../Store/StoreMainContent'
import { useParams } from 'next/navigation'

export default function SubcategoriesPage({ subcategory }) {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [loading, setLoading] = useState(false)
  const { id: subcategoryId } = useParams()

  useEffect(() => {}, [subcategoryId])

  return (
    <section className="my-10">
      <Container>
        <Row className="mt-10 gap-12 items-start">
          <StoreSideBar
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            className="hidden lg:block"
          />
          <StoreMainContent
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            loading={loading}
            setLoading={setLoading}
            subcategoryId={subcategoryId}
            className="flex-1 lg:flex flex-col gap-4 justify-start h-full"
          />
        </Row>
      </Container>
    </section>
  )
}
