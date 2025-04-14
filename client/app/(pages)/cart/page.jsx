import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/custom/costumeUI'
import Cart from '@/components/modules/Cart/Cart'
import Container from '@/components/custom/Container'
import Link from 'next/link'



export default function CartPage() {
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
                            <Link
                                href={"/products"}
                                className="text-xl hover:text-black"
                            >
                                Store
                            </Link>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-xl font-bold hover:text-black ">
                                    Cart
                                </BreadcrumbPage>
                        </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    </Container>
                </section>
                <Cart />
            </>
        );
    }
