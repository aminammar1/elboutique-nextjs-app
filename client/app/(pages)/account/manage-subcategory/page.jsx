import Subcategories from "@/components/modules/subcateogies-manage/Subcategories";
import * as React from 'react'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbList,
    BreadcrumbPage,
} from '@/components/custom/costumeUI'

export default function ManageSubcategory() {
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
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-xl font-bold hover:text-gray-700">
                                    Manage  Subcategories
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Container>
            </section>
            <Subcategories />
        </>
    )
}