    import React from 'react'

    import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    } from '@/components/custom/costumeUI'
    import Container from '@/components/custom/Container'
    import Link from 'next/link'
    import CheckoutPage from '@/components/modules/Checkout/Checkout'
    import { generateCoupon } from '@/actions/coupons'

    export default async function page() {
    const res = await generateCoupon()
    const couponGenerated = res && res.data && res.data.code ? res.data.code : ''

    return (
        <>
        <section className="my-10">
            <Container>
            <Breadcrumb>
                <BreadcrumbList className="capitalize flex flex-wrap">
                <Link href="/" className="text-xl hover:text-black">
                    Home
                </Link>
                <BreadcrumbSeparator />

                <Link href={'/products'} className="text-xl hover:text-black">
                    Store
                </Link>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-xl font-bold hover:text-black ">
                    Checkout
                    </BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </Container>
        </section>
        <section>
            <Container>
            <CheckoutPage couponGenerated={couponGenerated} />
            </Container>
        </section>
        </>
    )
    }
