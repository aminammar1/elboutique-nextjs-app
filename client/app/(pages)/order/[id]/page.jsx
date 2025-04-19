    import React from 'react'
    import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbList,
    BreadcrumbPage,
    } from '@/components/custom/costumeUI'
    import Link from 'next/link'
    import Container from '@/components/custom/Container'
    import OrderPage from '@/components/modules/Order/main'

    export default async function Page({ params }) {
    const { id } = await params 

    return (
        <>
        <section className="my-10">
            <Container>
            <Breadcrumb>
                <BreadcrumbList className="capitalize flex flex-wrap">
                <Link
                    href="/account/dashboard"
                    className="text-xl hover:text-gray-500"
                >
                    Dashoard
                </Link>
                <BreadcrumbSeparator />
                <Link
                    href={'/account/orders'}
                    className="text-xl hover:text-gray-500"
                >
                    Orders
                </Link>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-xl font-bold hover:text-gray-500 ">
                    # {id}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </Container>
        </section>
        <OrderPage id={id} />
        </>
    )
    }
