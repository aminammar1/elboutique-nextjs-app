import SubcategoriesPage from '@/components/modules/Subcategories/Subcategories'
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
import { getSubcategoryById } from '@/actions/Subcategories'
import { getCategoryById } from '@/actions/Categories'

export default async function Page({ params }) {
  const { id } =  await params 

  // 1. Fetch subcategory
  const subcategory = await getSubcategoryById(id)

  // 2. Fetch its parent category
  const categoryId = subcategory?.category?.[0]  // Extract the category ID from the array
  const category = categoryId ? await getCategoryById(categoryId) : null

  return (
    <>
      <section className="my-10">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="capitalize flex flex-wrap">
              {/* Home */}
              <Link href="/" className="text-xl hover:text-black">
                Home
              </Link>
              <BreadcrumbSeparator />

              {/* Store */}
              <Link href="/products" className="text-xl hover:text-black">
                Store
              </Link>
              <BreadcrumbSeparator />

              {/* Category */}
              {category && (
                <>
                  <Link
                    href={`/categories/${category._id}/products`}
                    className="text-xl hover:text-black"
                  >
                    {category.name}
                  </Link>
                  <BreadcrumbSeparator />
                </>
              )}

              {/* Subcategory */}
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold hover:text-black">
                  {subcategory.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>

      <SubcategoriesPage />
    </>
  )
}
