import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/custom/costumeUI'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import { fetchProductById } from '@/actions/product'
import ProductPage from '@/components/modules/Products-details/main'

export default async function Page({ params }) {
  const { id } = await params
  const product = await fetchProductById(id)

  return (
    <>
      <section className="my-10 p-3">
        <Container>
          {/* breadcrumbs  */}
          <Breadcrumb>
            <BreadcrumbList>
              {/* Home */}
              <BreadcrumbItem>
                <Link href="/" className="text-xl hover:text-black">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {/* Store */}
              <BreadcrumbItem>
                <Link
                  href="/products"
                  className="text-xl font-bold text-black hover:text-gray-700"
                >
                  Store
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {/* Category */}
              {product.category?.length > 0 && (
                <>
                  <BreadcrumbItem>
                    <Link
                      href={`/categories/${product.category[0]._id}/products`}
                      className="text-xl font-bold text-black hover:text-gray-700"
                    >
                      {product.category[0].name}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}

              {/* Subcategory */}
              {product.subCategory?.length > 0 && (
                <>
                  <BreadcrumbItem>
                    <Link
                      href={`/subcategory/${product.subCategory[0]._id}/products`}
                      className="text-xl font-bold text-black hover:text-gray-700"
                    >
                      {product.subCategory[0].name}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}

              {/* Product Name */}
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold hover:text-gray-700">
                  {product.productName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>
      <ProductPage product={product} />
    </>
  )
}