import CategoriesPage from '@/components/modules/categories/Categories'
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
import { getCategoryById } from '@/actions/Categories'

export default async function Page({ params }) {
  const { id } = await params
  const category = await getCategoryById(id)

  return (
    <>
      <section className="my-10">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="capitalize flex flex-wrap">
              <Link href="/" className="text-xl hover:text-black">Home</Link>
              <BreadcrumbSeparator />
              <Link href="/products" className="text-xl hover:text-black">Store</Link>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold hover:text-black">
                  {category.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>

      <CategoriesPage /> 
    </>
  )
}
