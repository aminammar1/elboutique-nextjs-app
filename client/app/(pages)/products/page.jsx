import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'
import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
} from '@/components/custom/costumeUI'
import Link from 'next/link'
import Store from '@/components/modules/Store'

export default function page() {
  return (
    <>
      <section className="my-10 p-3">
        <Container>
          {/* breadcrumbs  */}
          <Row>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/" className="text-xl hover:text-black">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link
                    href="/products"
                    className="text-xl font-bold text-black hover:text-gray-700"
                  >
                    Store
                  </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Row>
        </Container>
      </section>
      <Store />
    </>
  )
}
