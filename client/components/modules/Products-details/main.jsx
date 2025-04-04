'use client'
import Container from '@/components/custom/Container'
import React, { useState, useEffect } from 'react'
import PaymentCard from '../home/PaymentCard'
import RelatedProducts from './ProductRelated'
import ProductDescription from './ProductDescription'
import ProductTabs from './ProductTabs'
import { fetchProductById } from '@/actions/product'
import { useParams } from 'next/navigation'
import Loading from '@/components/custom/Loading'

export default function ProductPage({ product: initialProduct }) {
  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const params = useParams()

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct)
    } else if (params?.id) {
      setLoading(true)
      fetchProductById(params.id)
        .then(data => {
          console.log('Fetched product data:', data)
          setProduct(data)
        })
        .catch(err => {
          console.error('Error fetching product:', err)
          setError(err.message || 'Failed to load product')
        })
        .finally(() => setLoading(false))
    }
  }, [initialProduct, params?.id])

  if (loading) {
    return <Loading isLoading={loading} />
  }

  if (!product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl">Product not found</h2>
        </div>
      </Container>
    )
  }

  return (
    <section>
      <Container>
        <div className="flex flex-col gap-4">
          <ProductDescription product={product} className="" />
          <ProductTabs className="my-10" product={product} />
          <RelatedProducts product={product} />
        </div>
      </Container>
    </section>
  )
}
